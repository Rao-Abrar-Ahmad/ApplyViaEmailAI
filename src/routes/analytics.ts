import { Hono } from "hono";
import { requireAuth } from "../middleware/auth";
import { ensureAnalytics } from "../repositories/analytics";
import type { AppContext } from "../types";
import { ok } from "../utils/http";

export const analyticsRoutes = new Hono<AppContext>();

analyticsRoutes.get("/", requireAuth, async (c) => {
  return ok(c, await ensureAnalytics(c.env, c.get("user").id));
});
