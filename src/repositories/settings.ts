import type { Env } from "../types";

export type SettingsRecord = {
  id: string;
  userId: string;
  headline: string | null;
  experience: number | null;
  location: string | null;
  portfolio: string | null;
  github: string | null;
  linkedin: string | null;
  skills: string | null;
  achievements: string | null;
  customPrompt: string | null;
  gmailConnected: number;
  gmailTokens: string | null;
  createdAt: number;
  updatedAt: number;
};

export async function getSettings(env: Env, userId: string) {
  return env.DB.prepare("SELECT * FROM settings WHERE userId = ?")
    .bind(userId)
    .first<SettingsRecord>();
}

export async function ensureSettings(env: Env, userId: string) {
  const existing = await getSettings(env, userId);
  if (existing) return existing;

  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO settings (id, userId, preferredModel, gmailConnected, createdAt, updatedAt)
     VALUES (?, ?, ?, 0, ?, ?)`,
  )
    .bind(id, userId, "google/gemini-2.5-flash", now, now)
    .run();

  return {
    id,
    userId,
    headline: "",
    experience: 0,
    location: "",
    portfolio: "",
    github: "",
    linkedin: "",
    skills: "",
    achievements: "",
    customPrompt: "",
    gmailConnected: 0,
    gmailTokens: null,
    createdAt: now,
    updatedAt: now,
  };
}

export async function updateSettings(
  env: Env,
  userId: string,
  input: {
    headline: string | null;
    experience: number | null;
    location: string | null;
    portfolio: string | null;
    github: string | null;
    linkedin: string | null;
    skills: string | null;
    achievements: string | null;
    customPrompt: string | null;
  },
) {
  await env.DB.prepare(
    `UPDATE settings SET
      headline = ?,
      experience = ?,
      location = ?,
      portfolio = ?,
      github = ?,
      linkedin = ?,
      skills = ?,
      achievements = ?,
      customPrompt = ?,
      updatedAt = ?
     WHERE userId = ?`,
  )
    .bind(
      input.headline,
      input.experience,
      input.location,
      input.portfolio,
      input.github,
      input.linkedin,
      input.skills,
      input.achievements,
      input.customPrompt,
      Date.now(),
      userId,
    )
    .run();
}

export async function saveGmailTokens(
  env: Env,
  userId: string,
  encryptedTokens: string,
) {
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO settings (id, userId, gmailConnected, gmailTokens, createdAt, updatedAt)
     VALUES (?, ?, 1, ?, ?, ?)
     ON CONFLICT(userId) DO UPDATE SET
       gmailConnected = 1,
       gmailTokens = excluded.gmailTokens,
       updatedAt = excluded.updatedAt`,
  )
    .bind(crypto.randomUUID(), userId, encryptedTokens, now, now)
    .run();
}
