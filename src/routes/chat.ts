import { Hono } from "hono";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import { getActiveResume } from "../repositories/resumes";
import { getSettings } from "../repositories/settings";
import { generateEmailWithAI } from "../services/ai";
import { decrypt } from "../services/encryption";
import type { AppContext } from "../types";
import { fail, normalizeError, ok } from "../utils/http";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1),
      })
    )
    .default([]),
});

export const chatRoutes = new Hono<AppContext>();

chatRoutes.post("/generate", requireAuth, async (c) => {
  const parsed = chatSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return fail(c, "Invalid chat payload", 422);
  }

  const user = c.get("user");
  const [resume, settings] = await Promise.all([
    getActiveResume(c.env, user.id),
    getSettings(c.env, user.id),
  ]);

  if (!settings?.openRouterKey) {
    return fail(c, "Please configure your OpenRouter API Key in Settings first.");
  }

  try {
    const aiResponse = await generateEmailWithAI({
      apiKey: await decrypt(settings.openRouterKey, c.env.ENCRYPTION_SECRET),
      model: settings.preferredModel || "google/gemini-2.5-flash",
      profile: {
        name: user.name,
        headline: settings.headline || "",
        experience: settings.experience || 0,
        location: settings.location || "",
        skills: settings.skills || "",
        achievements: settings.achievements || "",
        portfolio: settings.portfolio || "",
        github: settings.github || "",
        linkedin: settings.linkedin || "",
        customPrompt: settings.customPrompt || "",
      },
      resumeText: resume?.extractedText || "",
      messages: parsed.data.messages,
    });

    return ok(c, aiResponse);
  } catch (error) {
    return fail(c, normalizeError(error), 500);
  }
});
