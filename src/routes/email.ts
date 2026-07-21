import { Hono, type Context } from "hono";
import { z } from "zod";
import { getAuth } from "../auth";
import { requireAuth } from "../middleware/auth";
import { incrementAnalytics } from "../repositories/analytics";
import { getResume } from "../repositories/resumes";
import { getSettings, saveGmailTokens } from "../repositories/settings";
import { decrypt, encrypt } from "../services/encryption";
import {
  createGmailDraft,
  exchangeCodeForTokens,
  getGoogleAuthUrl,
  GmailTokens,
  refreshGmailAccessToken,
  sendGmailEmail,
} from "../services/gmail";
import { buildCloudinaryResumeUrl } from "../services/cloudinary";
import type { AppContext, Env } from "../types";
import { fail, message, normalizeError, ok } from "../utils/http";

const mailActionSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  emailBody: z.string().min(1),
  resumeId: z.string().optional().nullable(),
  company: z.string().optional().default("Unknown"),
  jobTitle: z.string().optional().default("Unknown"),
});

export const emailRoutes = new Hono<AppContext>();

emailRoutes.post("/connect", requireAuth, (c) => {
  return ok(c, { url: getGoogleAuthUrl(c.env) });
});

emailRoutes.get("/callback", async (c) => {
  const code = c.req.query("code");
  if (!code) {
    return c.text("Google Authorization Code is missing", 400);
  }

  const session = await getAuth(c.env).api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session?.user) {
    return c.text("Unauthorized callback context", 401);
  }

  try {
    const tokens = await exchangeCodeForTokens(code, c.env);
    const encryptedTokens = await encrypt(JSON.stringify(tokens), c.env.ENCRYPTION_SECRET);
    await saveGmailTokens(c.env, session.user.id, encryptedTokens);
    return c.redirect(`${c.env.APP_URL}/dashboard?tab=settings&gmailConnected=true`);
  } catch (error) {
    return c.text(`Gmail connection failed: ${normalizeError(error)}`, 500);
  }
});

emailRoutes.delete("/disconnect", requireAuth, async (c) => {
  await c.env.DB.prepare(
    `UPDATE settings SET
      gmailConnected = 0,
      gmailTokens = NULL,
      updatedAt = ?
     WHERE userId = ?`
  )
    .bind(Date.now(), c.get("user").id)
    .run();

  return message(c, "Gmail connection disconnected successfully");
});

emailRoutes.get("/status", requireAuth, async (c) => {
  const settings = await getSettings(c.env, c.get("user").id);
  return ok(c, { gmailConnected: settings?.gmailConnected === 1 });
});

emailRoutes.post("/draft", requireAuth, async (c) => handleMailAction(c, "draft"));
emailRoutes.post("/send", requireAuth, async (c) => handleMailAction(c, "send"));

async function getFreshGmailAccessToken(userId: string, env: Env): Promise<string> {
  const settings = await getSettings(env, userId);
  if (!settings?.gmailTokens) {
    throw new Error("Gmail is not connected");
  }

  const tokens: GmailTokens = JSON.parse(
    await decrypt(settings.gmailTokens, env.ENCRYPTION_SECRET)
  );

  if (tokens.expiresAt - 300000 < Date.now() && tokens.refreshToken) {
    const refreshed = await refreshGmailAccessToken(tokens.refreshToken, env);
    const encrypted = await encrypt(JSON.stringify(refreshed), env.ENCRYPTION_SECRET);

    await env.DB.prepare("UPDATE settings SET gmailTokens = ?, updatedAt = ? WHERE userId = ?")
      .bind(encrypted, Date.now(), userId)
      .run();

    return refreshed.accessToken;
  }

  return tokens.accessToken;
}

async function handleMailAction(c: Context<AppContext>, action: "draft" | "send") {
  const parsed = mailActionSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return fail(c, "Recipient email, subject, and body are required", 400);
  }

  const user = c.get("user");

  try {
    const accessToken = await getFreshGmailAccessToken(user.id, c.env);
    let attachment: { name: string; buffer: ArrayBuffer } | undefined;

    if (parsed.data.resumeId) {
      const resume = await getResume(c.env, user.id, parsed.data.resumeId);
      if (!resume) {
        return fail(c, "Selected resume not found or unauthorized");
      }

      const resumeUrl = buildCloudinaryResumeUrl(resume.r2Key, c.env);
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        return fail(c, "Failed to retrieve resume from storage", 500);
      }

      attachment = {
        name: resume.name,
        buffer: await response.arrayBuffer(),
      };
    }

    const result =
      action === "draft"
        ? await createGmailDraft({
            accessToken,
            to: parsed.data.to,
            subject: parsed.data.subject,
            body: parsed.data.emailBody,
            attachment,
          })
        : await sendGmailEmail({
            accessToken,
            to: parsed.data.to,
            subject: parsed.data.subject,
            body: parsed.data.emailBody,
            attachment,
          });

    const now = Date.now();
    await c.env.DB.prepare(
      `INSERT INTO applications (id, userId, company, jobTitle, recipientEmail, subject, resumeId, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        user.id,
        parsed.data.company,
        parsed.data.jobTitle,
        parsed.data.to,
        parsed.data.subject,
        parsed.data.resumeId || null,
        action === "draft" ? "Draft" : "Sent",
        now
      )
      .run();

    await incrementAnalytics(c.env, user.id, action === "draft" ? "draftsCreated" : "emailsSent");
    await incrementAnalytics(c.env, user.id, "applicationsCreated");

    return ok(
      c,
      result,
      action === "draft" ? "Gmail draft created successfully" : "Email sent successfully"
    );
  } catch (error) {
    return fail(c, normalizeError(error), 500);
  }
}
