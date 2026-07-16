-- Create Better Auth Tables
CREATE TABLE IF NOT EXISTS "user" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "emailVerified" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "token" TEXT NOT NULL UNIQUE,
    "expiresAt" INTEGER NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "account" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "expiresAt" INTEGER,
    "password" TEXT,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "verification" (
    "id" TEXT PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" INTEGER NOT NULL,
    "createdAt" INTEGER,
    "updatedAt" INTEGER
);

-- Create Application Tables
CREATE TABLE IF NOT EXISTS "settings" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE REFERENCES "user"("id") ON DELETE CASCADE,
    "headline" TEXT,
    "experience" INTEGER,
    "location" TEXT,
    "portfolio" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "skills" TEXT,
    "achievements" TEXT,
    "openRouterKey" TEXT, -- Encrypted
    "preferredModel" TEXT DEFAULT 'google/gemini-2.5-flash',
    "customPrompt" TEXT,
    "gmailConnected" INTEGER NOT NULL DEFAULT 0,
    "gmailTokens" TEXT, -- Encrypted
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "resumes" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "r2Key" TEXT NOT NULL,
    "extractedText" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "active" INTEGER NOT NULL DEFAULT 0,
    "uploadedAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "applications" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "company" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "recipientEmail" TEXT,
    "subject" TEXT NOT NULL,
    "resumeId" TEXT REFERENCES "resumes"("id") ON DELETE SET NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft', -- 'Draft' or 'Sent'
    "createdAt" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "analytics" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE REFERENCES "user"("id") ON DELETE CASCADE,
    "applicationsCreated" INTEGER NOT NULL DEFAULT 0,
    "draftsCreated" INTEGER NOT NULL DEFAULT 0,
    "emailsSent" INTEGER NOT NULL DEFAULT 0,
    "resumesUploaded" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" INTEGER NOT NULL
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS "idx_user_email" ON "user"("email");
CREATE INDEX IF NOT EXISTS "idx_settings_userId" ON "settings"("userId");
CREATE INDEX IF NOT EXISTS "idx_resumes_userId" ON "resumes"("userId");
CREATE INDEX IF NOT EXISTS "idx_applications_userId" ON "applications"("userId");
CREATE INDEX IF NOT EXISTS "idx_applications_createdAt" ON "applications"("createdAt");
CREATE INDEX IF NOT EXISTS "idx_analytics_userId" ON "analytics"("userId");
