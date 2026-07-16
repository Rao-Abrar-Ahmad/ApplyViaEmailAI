import type { MiddlewareHandler } from "hono";
import { getAuth } from "../auth";
import type { AppContext } from "../types";

export const requireAuth: MiddlewareHandler<AppContext> = async (c, next) => {
  const auth = getAuth(c.env);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ success: false, message: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
};
