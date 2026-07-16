import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import type { Env } from "./types";

export interface Database {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: number;
    image: string | null;
    createdAt: number;
    updatedAt: number;
  };
  session: {
    id: string;
    userId: string;
    token: string;
    expiresAt: number;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: number;
    updatedAt: number;
  };
  account: {
    id: string;
    userId: string;
    accountId: string;
    providerId: string;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    expiresAt: number | null;
    password: string | null;
    createdAt: number;
    updatedAt: number;
  };
  verification: {
    id: string;
    identifier: string;
    value: string;
    expiresAt: number;
    createdAt: number | null;
    updatedAt: number | null;
  };
  settings: {
    id: string;
    userId: string;
    headline: string | null;
    experience: number | null;
    location: string | null;
    portfolio: string | null;
    github: string | null;
    linkedin: string | null;
    skills: string | null;
    achievements: string | null;
    openRouterKey: string | null;
    preferredModel: string | null;
    customPrompt: string | null;
    gmailConnected: number;
    gmailTokens: string | null;
    createdAt: number;
    updatedAt: number;
  };
  resumes: {
    id: string;
    userId: string;
    name: string;
    r2Key: string;
    extractedText: string;
    fileSize: number;
    active: number;
    uploadedAt: number;
    updatedAt: number;
  };
  applications: {
    id: string;
    userId: string;
    company: string;
    jobTitle: string;
    recipientEmail: string | null;
    subject: string;
    resumeId: string | null;
    status: "Draft" | "Sent";
    createdAt: number;
  };
  analytics: {
    id: string;
    userId: string;
    applicationsCreated: number;
    draftsCreated: number;
    emailsSent: number;
    resumesUploaded: number;
    updatedAt: number;
  };
}

export function createDb(env: Env): Kysely<Database> {
  return new Kysely<Database>({
    dialect: new D1Dialect({
      database: env.DB,
    }),
  });
}
