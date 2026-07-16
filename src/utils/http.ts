import type { Context } from "hono";

export function ok<T>(c: Context, data: T, message?: string): Response {
  return c.json({
    success: true,
    ...(message ? { message } : {}),
    data,
  });
}

export function message(c: Context, text: string): Response {
  return c.json({ success: true, message: text });
}

export function fail(c: Context, text: string, status = 400): Response {
  return c.json({ success: false, message: text }, status as never);
}

export function normalizeError(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected error";
}

