# 05 - Backend Architecture

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Purpose:** Define the backend architecture, service structure, API organization, and responsibilities of the Cloudflare Worker.

---

# Overview

The backend is built using **Hono** running on **Cloudflare Workers**.

A **single Worker architecture** is used for Version 1 to keep deployment and maintenance simple.

The backend acts as the central gateway between the frontend and all external services.

It is responsible for:

* Authentication
* Authorization
* Database operations
* File management
* AI requests
* Gmail integration
* Analytics
* Encryption
* Validation

---

# Technology Stack

| Purpose        | Technology         |
| -------------- | ------------------ |
| Runtime        | Cloudflare Workers |
| Framework      | Hono               |
| Authentication | Better Auth        |
| Database       | Cloudflare D1      |
| Storage        | Cloudflare R2      |
| AI             | OpenRouter         |
| Email          | Gmail API          |
| Validation     | Zod                |

---

# Backend Responsibilities

The backend is responsible for:

* Validating requests
* Authenticating users
* Managing sessions
* Uploading resumes
* Saving metadata
* Encrypting API keys
* Calling OpenRouter
* Calling Gmail API
* Returning structured responses
* Logging analytics

The backend should never expose sensitive information to the frontend.

---

# Project Structure

```text
src/

src/

â”œâ”€â”€ ai/
â”œâ”€â”€ analytics/
â”œâ”€â”€ auth/
â”œâ”€â”€ config/
â”œâ”€â”€ constants/
â”œâ”€â”€ db/
â”œâ”€â”€ gmail/
â”œâ”€â”€ middleware/
â”œâ”€â”€ resumes/
â”œâ”€â”€ routes/
â”œâ”€â”€ services/
â”œâ”€â”€ settings/
â”œâ”€â”€ storage/
â”œâ”€â”€ types/
â”œâ”€â”€ utils/
â”œâ”€â”€ validators/
â””â”€â”€ index.ts
```

Each folder represents one feature or responsibility.

---

# Route Organization

Routes should be grouped by feature.

```text
/api

/auth

/resumes

/chat

/email

/settings

/analytics

/user
```

Each route should remain focused and only delegate work to service modules.

---

# Service Layer

Business logic should never live directly inside route handlers.

Recommended services:

```text
AuthService

ResumeService

StorageService

AIService

EmailService

SettingsService

AnalyticsService

EncryptionService

UserService
```

Each service should have a single responsibility.

---

# Middleware

Global middleware should handle common functionality.

Recommended middleware:

* Authentication
* Request validation
* Error handling
* Logging
* CORS
* Security headers

---

# API Response Format

All endpoints should return a consistent response structure.

Every response should include:

* Success status
* Data (if available)
* Error message (if applicable)

Avoid returning inconsistent response shapes.

---

# Validation Strategy

Every incoming request must be validated.

Validation should cover:

* Request body
* Query parameters
* Route parameters
* Uploaded files
* Authentication state

Shared validation schemas should be reused between frontend and backend.

---

# Authentication

Authentication is handled by **Better Auth**.

Supported methods:

* Google OAuth
* Email & Password

Protected endpoints require a valid authenticated session.

The backend should never trust client-provided user identifiers.

---

# Session Management

Authentication uses secure HTTP-only cookies.

The frontend never stores:

* Access tokens
* Refresh tokens
* Session identifiers

All session validation occurs on the backend.

---

# Resume Module

Responsibilities:

* Upload PDF
* Delete PDF
* Retrieve resume list
* Store metadata
* Upload to R2

Business rules:

* Maximum 3 resumes
* PDF only
* Reject invalid files
* Store parsed text

---

# File Storage

PDF files are stored in Cloudflare R2.

The backend manages:

* Upload
* Delete
* Retrieval
* Metadata synchronization

R2 object keys should follow a predictable structure.

---

# AI Module

The AI module communicates with OpenRouter.

Responsibilities:

* Build AI context
* Send prompt
* Validate response
* Retry invalid responses
* Return structured output

The backend controls which AI models are available.

---

# AI Context

Every AI request includes:

* User profile
* Parsed resume text
* Current conversation
* Job description
* User custom instructions

The backend assembles the final prompt.

---

# Supported Models

Only a curated whitelist should be available.

Recommended models:

* Gemini 2.5 Flash (Default)
* Claude Sonnet
* GPT-4.1 Mini
* DeepSeek V3

Users cannot enter arbitrary model names.

---

# AI Response Validation

Every AI response must:

* Parse successfully
* Match the required schema
* Contain required fields

If validation fails:

1. Retry
2. Retry again
3. Return a structured error

Invalid responses must never reach the frontend.

---

# Gmail Module

Responsibilities:

* Connect Gmail
* Refresh credentials
* Create drafts
* Send emails
* Attach resumes

The backend manages all Gmail API communication.

---

# Email Workflow

```text
Frontend

â†“

Backend

â†“

Gmail API

â†“

Draft Created

â†“

Response
```

The frontend never communicates directly with Gmail.

---

# Settings Module

Responsible for:

* Profile
* AI settings
* Gmail status
* User preferences

Sensitive values should be encrypted before storage.

---

# Encryption

Sensitive values include:

* OpenRouter API Key

Requirements:

* Encrypt before saving
* Decrypt only when required
* Never expose plaintext values to the frontend

---

# Analytics Module

Track only metadata.

Examples:

* Applications created
* Drafts created
* Emails sent
* Resume usage

Do not store:

* Job descriptions
* Chat history
* AI responses

---

# Error Handling

The backend should return meaningful errors for:

* Authentication failures
* Validation failures
* File upload failures
* AI failures
* Gmail failures
* Database failures
* External API failures

Internal errors should be logged but not exposed to users.

---

# Logging

Log:

* Authentication events
* Upload events
* AI requests (metadata only)
* Gmail operations
* System errors

Do not log:

* Passwords
* API keys
* Resume contents
* Email bodies
* Job descriptions

---

# Database Access

All database operations should be isolated inside dedicated services.

Routes should never access D1 directly.

This keeps the architecture modular and easier to maintain.

---

# External Services

The backend integrates with:

| Service     | Purpose        |
| ----------- | -------------- |
| Better Auth | Authentication |
| OpenRouter  | AI             |
| Gmail API   | Email          |
| D1          | Database       |
| R2          | File Storage   |

No other third-party services are required for Version 1.

---

# Security Guidelines

The backend must:

* Authenticate every protected request
* Authorize every user action
* Validate all inputs
* Restrict uploads to PDF
* Encrypt sensitive values
* Use secure session cookies
* Return sanitized error messages

---

# Performance Guidelines

The backend should:

* Minimize database queries
* Avoid duplicate AI requests
* Keep Worker execution lightweight
* Reuse shared utilities
* Return responses quickly

---

# Future Scalability

The backend should be organized so additional modules can be added without restructuring the application.

Possible future modules:

* Job Scraping
* Resume Analysis
* Cover Letters
* Browser Extension API
* Additional AI Providers
* Additional Email Providers

These are out of scope for Version 1.

---

# Acceptance Criteria

The backend architecture is complete when:

* Feature-based folder structure is defined.
* Routes are organized by feature.
* Services own all business logic.
* Middleware handles common concerns.
* AI requests are validated.
* Gmail integration is isolated.
* Database access is modular.
* Security responsibilities are clearly defined.
* External service boundaries are documented.

---

# References

## Hono

https://hono.dev/

## Cloudflare Workers

https://developers.cloudflare.com/workers/

## Better Auth

https://www.better-auth.com/

## Cloudflare D1

https://developers.cloudflare.com/d1/

## Cloudflare R2

https://developers.cloudflare.com/r2/

## OpenRouter

https://openrouter.ai/docs

## Gmail API

https://developers.google.com/gmail/api

## Zod

https://zod.dev/

---

# Next Document

**06-database-design.md**

This document defines the complete Cloudflare D1 database schema, table structures, relationships, indexes, constraints, data lifecycle, and storage strategy for ApplyViaEmailAI.

