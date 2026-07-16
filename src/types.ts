export interface Env {
  DB: D1Database;
  RESUMES: R2Bucket;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  ENCRYPTION_SECRET: string;
  APP_URL: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
}

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date | number;
}

export type AppVariables = {
  user: AuthUser;
  session: AuthSession;
};

export type AppContext = {
  Bindings: Env;
  Variables: AppVariables;
};
