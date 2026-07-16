import { Hono } from "hono";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { ensureSettings, getSettings, updateSettings } from "../repositories/settings";
import { encrypt } from "../services/encryption";
import type { AppContext } from "../types";
import { fail, message, ok } from "../utils/http";

const settingsUpdateSchema = z.object({
  headline: z.string().optional().default(""),
  experience: z.coerce.number().int().min(0).optional().default(0),
  location: z.string().optional().default(""),
  portfolio: z.string().optional().default(""),
  github: z.string().optional().default(""),
  linkedin: z.string().optional().default(""),
  skills: z.string().optional().default(""),
  achievements: z.string().optional().default(""),
  openRouterKey: z.string().optional(),
  preferredModel: z.string().optional().default("google/gemini-2.5-flash"),
  customPrompt: z.string().optional().default(""),
});

export const settingsRoutes = new Hono<AppContext>();

settingsRoutes.get("/", requireAuth, async (c) => {
  const settings = await ensureSettings(c.env, c.get("user").id);
  const responseData = {
    ...settings,
    openRouterKey: settings.openRouterKey ? "******" : "",
    gmailConnected: settings.gmailConnected === 1,
  };
  delete (responseData as { gmailTokens?: string | null }).gmailTokens;

  return ok(c, responseData);
});

settingsRoutes.put("/", requireAuth, async (c) => {
  const parsed = settingsUpdateSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return fail(c, "Invalid settings payload", 422);
  }

  const user = c.get("user");
  await ensureSettings(c.env, user.id);
  const existing = await getSettings(c.env, user.id);
  let encryptedKey = existing?.openRouterKey ?? null;

  if (parsed.data.openRouterKey !== undefined) {
    if (parsed.data.openRouterKey === "") {
      encryptedKey = null;
    } else if (parsed.data.openRouterKey !== "******") {
      encryptedKey = await encrypt(parsed.data.openRouterKey, c.env.ENCRYPTION_SECRET);
    }
  }

  await updateSettings(c.env, user.id, {
    ...parsed.data,
    openRouterKey: encryptedKey,
  });

  return message(c, "Settings updated successfully");
});
