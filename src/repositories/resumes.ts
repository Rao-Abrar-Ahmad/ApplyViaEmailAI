import type { Env } from "../types";

export type ResumeRecord = {
  id: string;
  userId: string;
  name: string;
  r2Key: string;
  extractedText: string;
  fileSize: number;
  active: number;
  uploadedAt: number;
  updatedAt: number;
};

export async function countResumes(env: Env, userId: string) {
  const result = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM resumes WHERE userId = ?",
  )
    .bind(userId)
    .first<{ count: number }>();
  return result?.count ?? 0;
}

export async function listResumes(env: Env, userId: string) {
  const resumes = await env.DB.prepare(
    "SELECT id, name, fileSize, r2Key, active, uploadedAt, updatedAt FROM resumes WHERE userId = ? ORDER BY uploadedAt DESC",
  )
    .bind(userId)
    .all();
  return resumes.results;
}

export async function getResume(env: Env, userId: string, resumeId: string) {
  return env.DB.prepare("SELECT * FROM resumes WHERE id = ? AND userId = ?")
    .bind(resumeId, userId)
    .first<ResumeRecord>();
}

export async function getActiveResume(env: Env, userId: string) {
  return env.DB.prepare(
    "SELECT extractedText FROM resumes WHERE userId = ? AND active = 1",
  )
    .bind(userId)
    .first<{ extractedText: string }>();
}
