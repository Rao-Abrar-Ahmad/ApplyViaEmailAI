import { Hono } from "hono";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import {
  ensureSettings,
  getSettings,
  updateSettings,
} from "../repositories/settings";
import { encrypt } from "../services/encryption";
import type { AppContext } from "../types";
import { fail, message, ok } from "../utils/http";

const settingsUpdateSchema = z.object({
  headline: z.string().nullable().default(""),
  experience: z.coerce.number().int().min(0).nullable().default(0),
  location: z.string().nullable().default(""),
  portfolio: z.string().nullable().default(""),
  github: z.string().nullable().default(""),
  linkedin: z.string().nullable().default(""),
  skills: z.string().nullable().default(""),
  achievements: z.string().nullable().default(""),
  customPrompt: z.string().nullable().default(""),
});

export const settingsRoutes = new Hono<AppContext>();

settingsRoutes.get("/", requireAuth, async (c) => {
  const settings = await ensureSettings(c.env, c.get("user").id);
  const responseData = {
    ...settings,
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
  await updateSettings(c.env, user.id, parsed.data);

  return message(c, "Settings updated successfully");
});
