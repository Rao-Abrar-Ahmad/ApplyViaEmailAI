import { Hono } from "hono";
import { cors } from "hono/cors";
import { getAuth } from "./auth";
import { analyticsRoutes } from "./routes/analytics";
import { chatRoutes } from "./routes/chat";
import { emailRoutes } from "./routes/email";
import { resumeRoutes } from "./routes/resumes";
import { settingsRoutes } from "./routes/settings";
import { userRoutes } from "./routes/user";
import type { AppContext } from "./types";

const app = new Hono<AppContext>();

app.use(
  "/api/*",
  cors({
    origin: (origin, c) => {
      if (origin) return origin;
      return c.env.APP_URL || "*";
    },
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api/health", (c) => {
  return c.json({ success: true, status: "ok", timestamp: Date.now() });
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return getAuth(c.env).handler(c.req.raw);
});

app.route("/api/user", userRoutes);
app.route("/api/settings", settingsRoutes);
app.route("/api/resumes", resumeRoutes);
app.route("/api/chat", chatRoutes);
app.route("/api/email", emailRoutes);
app.route("/api/analytics", analyticsRoutes);

export default app;
