export interface Env {
  DB: D1Database;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  ENCRYPTION_SECRET: string;
  APP_URL: string;
  AI: Ai;
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
