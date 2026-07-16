import type { Env } from "../types";

type AnalyticsColumn =
  | "applicationsCreated"
  | "draftsCreated"
  | "emailsSent"
  | "resumesUploaded";

export async function incrementAnalytics(env: Env, userId: string, column: AnalyticsColumn) {
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO analytics (id, userId, ${column}, updatedAt)
     VALUES (?, ?, 1, ?)
     ON CONFLICT(userId) DO UPDATE SET
       ${column} = ${column} + 1,
       updatedAt = excluded.updatedAt`
  )
    .bind(crypto.randomUUID(), userId, now)
    .run();
}

export async function ensureAnalytics(env: Env, userId: string) {
  let stats = await env.DB.prepare("SELECT * FROM analytics WHERE userId = ?")
    .bind(userId)
    .first();

  if (stats) return stats;

  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO analytics (id, userId, applicationsCreated, draftsCreated, emailsSent, resumesUploaded, updatedAt)
     VALUES (?, ?, 0, 0, 0, 0, ?)`
  )
    .bind(id, userId, now)
    .run();

  stats = {
    id,
    userId,
    applicationsCreated: 0,
    draftsCreated: 0,
    emailsSent: 0,
    resumesUploaded: 0,
    updatedAt: now,
  };

  return stats;
}
