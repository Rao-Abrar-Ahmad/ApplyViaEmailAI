# 06 - Database Design

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Database:** Cloudflare D1 (SQLite)
> **Purpose:** Define the database structure, relationships, and storage strategy.

---

# Overview

ApplyViaEmailAI uses **Cloudflare D1** as its primary relational database. Better Auth is connected through Kysely because this project should not use a direct Cloudflare D1 adapter.

The database stores only the data required for application functionality.

The application follows a **privacy-first** approach.

---

# Database Principles

* Normalize data where practical.
* Store only required information.
* Never store AI conversations.
* Never store job descriptions.
* Never store resume contents unless required for AI context.
* Encrypt sensitive values.
* Use UUIDs for primary keys.
* Store timestamps for all records.

---

# Database Tables

Version 1 includes the following tables.

| Table        | Purpose                 |
| ------------ | ----------------------- |
| users        | User profile            |
| sessions     | Authentication sessions |
| accounts     | OAuth provider accounts |
| settings     | User preferences        |
| resumes      | Uploaded resumes        |
| applications | Application history     |
| analytics    | Usage statistics        |

---

# Entity Relationship Diagram

```text
users
 â”‚
 â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
 â”‚              â”‚
 â–¼              â–¼
settings     resumes
 â”‚              â”‚
 â”‚              â–¼
 â”‚         applications
 â”‚
 â–¼
analytics

users
 â”‚
 â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º sessions
 â”‚
 â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º accounts
```

---

# users

## Purpose

Stores the main user profile.

---

## Fields

| Field         | Type      | Notes           |
| ------------- | --------- | --------------- |
| id            | UUID      | Primary Key     |
| name          | Text      | Full Name       |
| email         | Text      | Unique          |
| image         | Text      | Optional Avatar |
| emailVerified | Boolean   | Default False   |
| createdAt     | Timestamp |                 |
| updatedAt     | Timestamp |                 |

---

## Notes

Managed primarily by Better Auth.

Do not duplicate profile information unnecessarily.

---

# sessions

## Purpose

Stores authenticated user sessions.

---

## Managed By

Better Auth

---

## Required Fields

Handled automatically by Better Auth.

No custom fields required.

---

# accounts

## Purpose

Stores OAuth provider information.

---

## Managed By

Better Auth

---

## Providers

Supported providers:

* Google

Future:

* GitHub
* Microsoft

---

# settings

## Purpose

Stores user preferences and reusable information.

---

## Fields

| Field          | Type           |
| -------------- | -------------- |
| id             | UUID           |
| userId         | UUID           |
| headline       | Text           |
| experience     | Integer        |
| location       | Text           |
| portfolio      | Text           |
| github         | Text           |
| linkedin       | Text           |
| skills         | Text           |
| achievements   | Text           |
| openRouterKey  | Encrypted Text |
| preferredModel | Text           |
| customPrompt   | Text           |
| gmailConnected | Boolean        |
| createdAt      | Timestamp      |
| updatedAt      | Timestamp      |

---

## Notes

One settings record per user.

---

# resumes

## Purpose

Stores uploaded resume metadata.

---

## Fields

| Field         | Type      |
| ------------- | --------- |
| id            | UUID      |
| userId        | UUID      |
| name          | Text      |
| r2Key         | Text      |
| extractedText | Text      |
| fileSize      | Integer   |
| uploadedAt    | Timestamp |
| updatedAt     | Timestamp |

---

## Business Rules

Maximum:

3 resumes per user.

Only:

PDF

---

## extractedText

Stores browser-parsed text used as AI context.

This avoids parsing the PDF on every request.

---

# applications

## Purpose

Stores metadata about generated applications.

---

## Fields

| Field          | Type      |
| -------------- | --------- |
| id             | UUID      |
| userId         | UUID      |
| company        | Text      |
| jobTitle       | Text      |
| recipientEmail | Text      |
| subject        | Text      |
| resumeId       | UUID      |
| status         | Text      |
| createdAt      | Timestamp |

---

## Status

Possible values:

* Draft
* Sent

---

## Notes

Do not store:

* Job Description
* Email Body
* AI Prompt
* AI Response

---

# analytics

## Purpose

Stores lightweight usage metrics.

---

## Fields

| Field               | Type      |
| ------------------- | --------- |
| id                  | UUID      |
| userId              | UUID      |
| applicationsCreated | Integer   |
| draftsCreated       | Integer   |
| emailsSent          | Integer   |
| resumesUploaded     | Integer   |
| updatedAt           | Timestamp |

---

## Notes

This table should contain aggregate counters only.

---

# Relationships

## User â†’ Settings

One-to-One

---

## User â†’ Resume

One-to-Many

---

## User â†’ Applications

One-to-Many

---

## User â†’ Analytics

One-to-One

---

## Resume â†’ Applications

One-to-Many

---

# Resume Lifecycle

```text
Upload PDF

â†“

Browser Parsing

â†“

Upload PDF â†’ R2

â†“

Save Metadata â†’ D1

â†“

Ready
```

---

# Application Lifecycle

```text
Paste Job Description

â†“

Generate AI Response

â†“

User Reviews

â†“

Create Draft

â†“

Save Metadata

â†“

(Optional)

Send Email

â†“

Update Status
```

---

# Data Retention

## Stored

* User profile
* Resume metadata
* Parsed resume text
* Settings
* Analytics
* Application metadata

---

## Never Stored

* AI conversations
* Job descriptions
* Email body
* AI prompts
* AI responses

---

# Index Recommendations

Indexes should exist on:

## users

* email

---

## settings

* userId

---

## resumes

* userId

---

## applications

* userId
* createdAt

---

## analytics

* userId

---

# Constraints

## User

One settings record.

---

## Resume

Maximum:

3 resumes.

---

## Applications

Unlimited.

---

## Emails

Stored as metadata only.

---

# Soft Delete vs Hard Delete

Version 1 uses **hard deletes**.

Deleting a resume removes:

* R2 object
* Metadata
* Parsed text

Deleting an account removes:

* Settings
* Resumes
* Analytics
* Applications

---

# Encryption

Encrypted fields:

| Field         | Reason                   |
| ------------- | ------------------------ |
| openRouterKey | Sensitive API credential |

Encryption should occur before writing to D1.

---

# Migration Strategy

Use versioned migrations.

Each schema update should:

* Create migration file
* Preserve existing data
* Support rollback where possible

---

# Backup Strategy

Cloudflare D1 backup strategy should follow the platform's recommended practices.

No custom backup implementation is required for Version 1.

---

# Performance Guidelines

* Query only required columns.
* Avoid storing duplicate data.
* Keep tables normalized.
* Minimize joins where possible.
* Index frequently queried fields.

---

# Future Tables (Out of Scope)

Potential future additions:

* cover_letters
* jobs
* organizations
* ai_history
* browser_extension
* notifications
* templates

These are intentionally excluded from Version 1.

---

# Acceptance Criteria

The database design is complete when:

* All tables are defined.
* Relationships are documented.
* Required fields are identified.
* Sensitive fields are encrypted.
* Storage limits are documented.
* Data retention policy is defined.
* Index strategy is documented.
* Privacy requirements are met.

---

# References

## Cloudflare D1

https://developers.cloudflare.com/d1/

## Better Auth

https://www.better-auth.com/

## SQLite

https://www.sqlite.org/

---

# Next Document

**07-authentication.md**

This document defines the authentication system, Better Auth configuration, Google OAuth flow, email/password authentication, session management, route protection, and account lifecycle.

