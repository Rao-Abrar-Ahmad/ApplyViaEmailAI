import { Hono } from "hono";
import { requireAuth } from "../middleware/auth";
import { incrementAnalytics } from "../repositories/analytics";
import { countResumes, getResume, listResumes } from "../repositories/resumes";
import type { AppContext } from "../types";
import { fail, message, ok } from "../utils/http";
import {
  uploadResumeToCloudinary,
  deleteCloudinaryResume,
} from "../services/cloudinary";

const MAX_RESUMES = 3;
const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export const resumeRoutes = new Hono<AppContext>();

resumeRoutes.get("/", requireAuth, async (c) => {
  return ok(c, await listResumes(c.env, c.get("user").id));
});

resumeRoutes.post("/upload", requireAuth, async (c) => {
  const user = c.get("user");
  const formData = await c.req.formData();
  const file = formData.get("file");
  const extractedText = formData.get("extractedText");

  if (!(file instanceof File) || typeof extractedText !== "string" || !extractedText.trim()) {
    return fail(c, "Missing file or extracted plain text");
  }

  if (!file.name.toLowerCase().endsWith(".pdf") || file.type !== "application/pdf") {
    return fail(c, "Only PDF files are supported");
  }

  if (file.size > MAX_RESUME_SIZE) {
    return fail(c, "Resume file must be 5 MB or smaller");
  }

  const resumeCount = await countResumes(c.env, user.id);
  if (resumeCount >= MAX_RESUMES) {
    return fail(c, "Maximum limit of 3 resumes reached");
  }

  const resumeId = crypto.randomUUID();
  const publicId = `resumes/${user.id}/${resumeId}`;
  await uploadResumeToCloudinary(file, publicId, c.env);

  const now = Date.now();
  const activeVal = resumeCount === 0 ? 1 : 0;
  await c.env.DB.prepare(
    `INSERT INTO resumes (id, userId, name, r2Key, extractedText, fileSize, active, uploadedAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(resumeId, user.id, file.name, publicId, extractedText, file.size, activeVal, now, now)
    .run();

  await incrementAnalytics(c.env, user.id, "resumesUploaded");

  return ok(
    c,
    { id: resumeId, name: file.name, active: activeVal === 1 },
    "Resume uploaded and saved successfully"
  );
});

resumeRoutes.delete("/:id", requireAuth, async (c) => {
  const user = c.get("user");
  const resume = await getResume(c.env, user.id, c.req.param("id"));

  if (!resume) {
    return fail(c, "Resume not found", 404);
  }

  await deleteCloudinaryResume(resume.r2Key, c.env);
  await c.env.DB.prepare("DELETE FROM resumes WHERE id = ? AND userId = ?")
    .bind(resume.id, user.id)
    .run();

  if (resume.active === 1) {
    const nextResume = await c.env.DB.prepare(
      "SELECT id FROM resumes WHERE userId = ? ORDER BY uploadedAt DESC LIMIT 1"
    )
      .bind(user.id)
      .first<{ id: string }>();

    if (nextResume) {
      await c.env.DB.prepare("UPDATE resumes SET active = 1 WHERE id = ? AND userId = ?")
        .bind(nextResume.id, user.id)
        .run();
    }
  }

  return message(c, "Resume deleted successfully");
});

resumeRoutes.patch("/:id/select", requireAuth, async (c) => {
  const user = c.get("user");
  const resume = await getResume(c.env, user.id, c.req.param("id"));

  if (!resume) {
    return fail(c, "Resume not found", 404);
  }

  await c.env.DB.batch([
    c.env.DB.prepare("UPDATE resumes SET active = 0 WHERE userId = ?").bind(user.id),
    c.env.DB.prepare("UPDATE resumes SET active = 1 WHERE id = ? AND userId = ?").bind(
      resume.id,
      user.id
    ),
  ]);

  return message(c, "Active resume selected successfully");
});
