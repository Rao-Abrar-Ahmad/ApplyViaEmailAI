import { betterAuth } from "better-auth";
import { kyselyAdapter } from "@better-auth/kysely-adapter";
import { createDb } from "./db";
import { Env } from "./types";

export const getAuth = (env: Env) =>
  betterAuth({
    database: kyselyAdapter(createDb(env), { type: "sqlite" }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
    },
    // Google sign-in is intentionally disabled until its OAuth consent screen and redirect URLs are configured.
    // socialProviders: { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET } },
    secret: env.BETTER_AUTH_SECRET || "default_better_auth_secret_apply_via_email_ai_2026",
    baseURL: env.BETTER_AUTH_URL || env.APP_URL || "http://localhost:5173",
    trustedOrigins: Array.from(
      new Set(
        [
          env.APP_URL,
          env.BETTER_AUTH_URL,
          "http://localhost:5173",
          "http://127.0.0.1:5173",
        ].filter((origin): origin is string => Boolean(origin))
      )
    ),
  });
