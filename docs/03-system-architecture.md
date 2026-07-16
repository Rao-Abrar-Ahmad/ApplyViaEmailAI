# 03 - System Architecture

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Purpose:** Define the overall system architecture and how different parts of the application communicate.

---

# Overview

ApplyViaEmailAI is a full-stack web application built entirely on the **Cloudflare** ecosystem.

The application follows a simple architecture:

* React SPA for the frontend
* Hono running on Cloudflare Workers
* Better Auth for authentication
* Cloudflare D1 for relational data
* Cloudflare R2 for resume storage
* OpenRouter for AI
* Gmail API for creating drafts and sending emails

The application uses a **single Worker architecture**.

---

# High Level Architecture

```text
                        Browser
                           Ã¢â€â€š
                           Ã¢â€â€š
                    React + TypeScript
                           Ã¢â€â€š
Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¼Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
                           Ã¢â€â€š
                    Hono API (Worker)
                           Ã¢â€â€š
      Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
      Ã¢â€â€š             Ã¢â€â€š             Ã¢â€â€š             Ã¢â€â€š
 Better Auth       D1            R2       External APIs
      Ã¢â€â€š             Ã¢â€â€š             Ã¢â€â€š             Ã¢â€â€š
      Ã¢â€â€š             Ã¢â€â€š             Ã¢â€â€š      Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â´Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
      Ã¢â€â€š             Ã¢â€â€š             Ã¢â€â€š      Ã¢â€â€š             Ã¢â€â€š
      Ã¢â€â€š             Ã¢â€â€š             Ã¢â€â€š  OpenRouter   Gmail API
```

---

# Architecture Principles

The project follows these principles:

* Keep everything serverless.
* Use one Cloudflare Worker.
* Keep frontend and backend separate.
* Modular feature-based architecture.
* Strong type safety.
* Privacy-first.
* Simple deployment.
* AI-friendly codebase.

---

# Technology Stack

| Layer          | Technology                |
| -------------- | ------------------------- |
| Frontend       | React + Vite + TypeScript |
| Styling        | Tailwind CSS              |
| Backend        | Hono                      |
| Runtime        | Cloudflare Workers        |
| Authentication | Better Auth               |
| Database       | Cloudflare D1             |
| Storage        | Cloudflare R2             |
| AI             | OpenRouter                |
| Email          | Gmail API                 |
| PDF Parsing    | PDF.js                    |
| Validation     | Zod                       |

---

# Project Structure

```text
ApplyViaEmailAI/
app/          # React + Vite application
src/          # Cloudflare Worker + Hono backend
migrations/   # Cloudflare D1 migrations
wrangler.jsonc
package.json  # single project manifest
```

---

# Worker Structure

The backend should be organized by feature instead of file type.

```text
src/

src/

Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ routes/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ services/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ middleware/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ auth/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ db/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ storage/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ ai/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ gmail/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ analytics/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ settings/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ resumes/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ utils/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ constants/
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ index.ts
```

---

# Frontend Structure

```text
app/

src/

Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ layouts/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ pages/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ hooks/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ services/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ api/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ stores/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ contexts/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ utils/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ types/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ assets/
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ main.tsx
```

---

# Frontend Responsibilities

The frontend is responsible for:

* Authentication UI
* Resume uploads
* PDF parsing
* AI chat interface
* Email preview
* Dashboard
* Settings
* Form validation
* User interactions

The frontend **does not**:

* Store secrets
* Call Gmail directly
* Call OpenRouter directly

All external API communication goes through the Worker.

---

# Backend Responsibilities

The Worker is responsible for:

* Authentication
* Authorization
* Session management
* Database operations
* File uploads
* AI requests
* Gmail requests
* Encryption
* Analytics
* Validation
* Error handling

---

# Database

Cloudflare D1 stores relational data.

Tables include:

```text
users

accounts

sessions

settings

resumes

applications

analytics
```

Detailed schema is covered in `06-database-design.md`.

---

# File Storage

Cloudflare R2 stores uploaded resumes.

Example structure:

```text
users/

    user-id/

        frontend.pdf

        shopify.pdf

        fullstack.pdf
```

Maximum:

* 3 resumes per user

Supported format:

* PDF only

---

# Authentication Flow

```text
User

Ã¢â€ â€œ

Better Auth

Ã¢â€ â€œ

Google OAuth
or
Email & Password

Ã¢â€ â€œ

Session Created

Ã¢â€ â€œ

Dashboard
```

Authentication uses secure HTTP-only cookies.

No JWT tokens are stored in local storage.

---

# Resume Upload Flow

```text
Select PDF

Ã¢â€ â€œ

Browser Validation

Ã¢â€ â€œ

Parse PDF

Ã¢â€ â€œ

Extract Text

Ã¢â€ â€œ

Upload PDF Ã¢â€ â€™ R2

Ã¢â€ â€œ

Save Metadata Ã¢â€ â€™ D1

Ã¢â€ â€œ

Ready
```

---

# AI Flow

```text
User Message

Ã¢â€ â€œ

Selected Resume

Ã¢â€ â€œ

Resume Text

Ã¢â€ â€œ

User Profile

Ã¢â€ â€œ

OpenRouter

Ã¢â€ â€œ

Structured JSON

Ã¢â€ â€œ

Validation

Ã¢â€ â€œ

Preview Panel
```

Only validated AI responses should reach the UI.

---

# Gmail Flow

```text
Generate Email

Ã¢â€ â€œ

Preview

Ã¢â€ â€œ

User Edits

Ã¢â€ â€œ

Create Gmail Draft

Ã¢â€ â€œ

(Optional)

Send Email
```

Resume attachment is added automatically.

---

# Dashboard Layout

```text
--------------------------------------------------------------

 Resume Panel

 AI Chat

 Email Preview

--------------------------------------------------------------
```

---

# Resume Panel

Contains:

* Resume thumbnails
* Upload button
* Delete button
* Selected resume indicator

Maximum:

3 resumes.

---

# AI Chat

Responsible for:

* Job description input
* Follow-up prompts
* Conversation

Chat exists only during the current session.

Refreshing the page clears the conversation.

---

# Email Preview

Contains editable fields:

* Recipient Email
* Company
* Job Title
* Subject
* Email Body
* Resume Selector

Buttons:

* Create Draft
* Send Email

---

# Settings

Settings are displayed inside a modal.

Sections:

* Profile
* AI
* Gmail
* Account

---

# Security Architecture

Sensitive information:

* Passwords
* Sessions
* OpenRouter API Key

must never be exposed to the frontend.

API keys should be encrypted before storage.

---

# Validation Strategy

Frontend:

* Form validation
* File validation

Backend:

* Request validation
* Authentication
* Authorization
* AI response validation

---

# Error Handling

Every request should return a consistent response format.

Example response types:

```text
Success

Validation Error

Authentication Error

Authorization Error

External API Error

Internal Server Error
```

---

# External Services

The application communicates with:

* Better Auth
* OpenRouter
* Gmail API

No additional third-party services are required for Version 1.

---

# Environment Variables

The application requires configuration for:

* Better Auth
* D1
* R2
* Gmail OAuth
* Session Secret
* Encryption Secret

The complete environment configuration is documented in `13-deployment.md`.

---

# Scalability

Version 1 is designed for:

* Individual users
* Small infrastructure footprint
* Minimal operational cost

The architecture should support future expansion without major restructuring.

---

# Design Constraints

* Single Worker only
* Cloudflare ecosystem only
* Gmail only
* OpenRouter only
* PDF resumes only
* Maximum 3 resumes
* Session-only chat
* Structured AI responses
* Metadata-only analytics

---

# References

## Cloudflare Workers

https://developers.cloudflare.com/workers/

## Hono

https://hono.dev/

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

## PDF.js

https://mozilla.github.io/pdf.js/

## React

https://react.dev/

---

# Next Document

**04-frontend-architecture.md**

This document defines the complete React application architecture, routing, state management, UI components, layouts, reusable components, API integration, and frontend development standards.


