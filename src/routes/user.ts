import { Hono } from "hono";
import { requireAuth } from "../middleware/auth";
import type { AppContext } from "../types";
import { ok } from "../utils/http";

export const userRoutes = new Hono<AppContext>();

userRoutes.get("/me", requireAuth, (c) => {
  return ok(c, c.get("user"));
});
