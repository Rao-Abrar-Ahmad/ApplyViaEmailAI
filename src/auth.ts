import { betterAuth } from "better-auth";
import { kyselyAdapter } from "@better-auth/kysely-adapter";
import { createDb } from "./db";
import { Env } from "./types";

export const getAuth = (env: Env) => {
  return betterAuth({
    database: kyselyAdapter(createDb(env), {
      type: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: env.APP_URL
      ? [env.APP_URL, env.BETTER_AUTH_URL]
      : [env.BETTER_AUTH_URL],
  });
};
