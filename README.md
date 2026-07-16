# ApplyViaEmailAI

> **An AI-powered, privacy-first email application assistant that helps job seekers generate professional job application emails and Gmail drafts in seconds.**

---

# Overview

**ApplyViaEmailAI** is an open-source web application that streamlines the process of applying to jobs via email.

Instead of switching between job boards, ChatGPT, Gmail, and local files, users can complete the entire workflow from a single interface.

The application allows users to:

* Authenticate securely.
* Connect their Gmail account.
* Upload and manage resumes.
* Bring their own OpenRouter API key.
* Paste a job description.
* Chat with AI to refine the application.
* Generate a professional email.
* Review and edit the generated content.
* Create a Gmail draft or send the email directly.

The project is designed with privacy, simplicity, and developer experience as first-class priorities.

---

# Vision

Applying to jobs should take **seconds, not minutes**.

The application removes repetitive tasks while keeping users fully in control of the final email.

Unlike browser extensions or automation bots, ApplyViaEmailAI focuses exclusively on email-based job applications with transparent AI assistance and user-owned credentials.

---

# Problem Statement

Today's workflow typically looks like this:

1. Find a job posting.
2. Copy the job description.
3. Open ChatGPT.
4. Generate an email.
5. Copy the generated content.
6. Open Gmail.
7. Create a new email.
8. Paste the generated content.
9. Attach the correct resume.
10. Send the email.

This repetitive workflow becomes time-consuming when applying to dozens of jobs.

ApplyViaEmailAI consolidates this entire workflow into a single application.

---

# Goals

## Primary Goals

* Reduce job application time from several minutes to under one minute.
* Allow users to bring their own AI provider credentials.
* Generate professional emails using structured AI output.
* Maintain a privacy-first architecture.
* Create Gmail drafts with resume attachments.
* Keep the interface simple and focused.
* Build entirely on the Cloudflare ecosystem.
* Release the project as open source.

---

## Secondary Goals

* Maintain an intuitive user experience.
* Provide reliable structured AI responses.
* Minimize infrastructure costs.
* Support AI-assisted development.
* Produce maintainable documentation for contributors.

---

# Non-Goals

The following features are intentionally excluded from Version 1.

* LinkedIn Easy Apply
* Job scraping
* Browser extension
* Resume generation
* Cover letter generation
* ATS scoring
* Multi-language support
* Team collaboration
* Public resume hosting
* AI interview preparation
* Job recommendation engine
* Resume optimization
* CRM functionality

These features may be considered in future releases.

---

# Core Features

## Landing Page

* Product introduction
* Hero section
* Feature highlights
* Technology stack
* FAQ
* Call-to-action
* Open-source information

---

## Authentication

* Google OAuth
* Email and password authentication
* Secure session management
* User profile management

---

## Dashboard

Single-page dashboard with three primary sections.

### Resume Panel

* Upload PDF resumes
* Maximum of three resumes
* Resume thumbnails
* Resume deletion
* Resume selection

---

### AI Chat

* Chat interface
* Paste job description
* Ask follow-up questions
* AI generates structured output
* Session-only conversations

---

### Email Preview

Editable email form containing:

* Recipient email
* Company name
* Job title
* Subject
* Email body
* Resume selector
* Create Gmail Draft
* Send Email

---

## Settings

Users can configure:

* Personal profile
* LinkedIn
* Portfolio
* GitHub
* Experience
* Skills
* OpenRouter API Key
* Gmail Connection
* Preferred AI Model
* Custom AI Instructions

---

# Product Principles

## Privacy First

The application should never permanently store:

* Job descriptions
* AI conversations
* AI responses

Only metadata required for analytics and application history will be stored.

---

## User-Owned AI

Every user supplies their own OpenRouter API key.

Benefits:

* No inference costs for the project.
* User controls model selection.
* No shared API quotas.
* Better scalability.

---

## Human in Control

AI assists the user.

AI never sends emails without explicit user action.

Every generated email remains editable before drafting or sending.

---

## Open Source

The entire project will be publicly available.

Objectives:

* Transparency
* Community contributions
* Self-hosting
* Educational value

---

# User Workflow

```text
Visit Website

Ã¢â€ â€œ

Create Account

Ã¢â€ â€œ

Connect Gmail

Ã¢â€ â€œ

Add OpenRouter API Key

Ã¢â€ â€œ

Upload Resume(s)

Ã¢â€ â€œ

Paste Job Description

Ã¢â€ â€œ

Chat with AI

Ã¢â€ â€œ

Generate Email

Ã¢â€ â€œ

Review Output

Ã¢â€ â€œ

Edit Email

Ã¢â€ â€œ

Create Gmail Draft

Ã¢â€ â€œ

Send Email
```

---

# Technology Stack

## Frontend

* React
* Vite
* TypeScript
* Tailwind CSS

---

## Backend

* Hono
* Cloudflare Workers
* Better Auth

---

## Database

Cloudflare D1 with Kysely

---

## Storage

Cloudflare R2

---

## Authentication

Better Auth

---

## AI

OpenRouter

Supported models will be limited to a curated whitelist to ensure reliable structured output.

---

## Email

Gmail API

---

## Resume Parsing

Browser-side PDF parsing using PDF.js.

---

# High-Level Architecture

```text
React SPA
        Ã¢â€â€š
        Ã¢â€“Â¼
Cloudflare Worker (Hono)
        Ã¢â€â€š
 Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¼Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â
 Ã¢â€â€š      Ã¢â€â€š         Ã¢â€â€š
 Ã¢â€“Â¼      Ã¢â€“Â¼         Ã¢â€“Â¼
D1      R2   Better Auth
 Ã¢â€â€š
 Ã¢â€“Â¼
OpenRouter
 Ã¢â€â€š
 Ã¢â€“Â¼
Gmail API
```

---

# Project Structure

```text
ApplyViaEmailAI/
app/          # React + Vite application
src/          # Cloudflare Worker + Hono backend
migrations/   # Cloudflare D1 migrations
wrangler.jsonc
package.json  # single project manifest for frontend and backend
README.md
```

Detailed project structure will be documented separately.

---

# Documentation Structure

This repository contains a complete technical specification.

| File                        | Description              |
| --------------------------- | ------------------------ |
| README.md                   | Project overview         |
| 01-project-overview.md      | Product vision and goals |
| 02-product-requirements.md  | Functional requirements  |
| 03-system-architecture.md   | Overall architecture     |
| 04-frontend-architecture.md | React application        |
| 04-backend-architecture.md  | Hono services            |
| 06-database-design.md       | D1 schema                |
| 07-authentication.md        | Better Auth integration  |
| 08-ai-engine.md             | OpenRouter integration   |
| 09-gmail-integration.md     | Gmail workflow           |
| 11-ux-ui-specifications.md | Interface specification  |
| 10-api-design.md           | REST API contracts       |
| 12-security-and-privacy.md  | Security design          |
| 13-deployment.md            | Cloudflare deployment    |
| 14-development-roadmap.md   | Milestones               |

---

# Design Philosophy

The project follows several core principles.

* Simplicity over complexity.
* Privacy over unnecessary data collection.
* User ownership over vendor lock-in.
* AI assistance rather than AI automation.
* Modular architecture.
* Strong separation of concerns.
* Maintainability.
* Scalability.
* Open-source friendliness.

---

# Success Metrics

Version 1 will be considered successful if users can:

* Register an account.
* Connect Gmail.
* Save an OpenRouter API key.
* Upload up to three resumes.
* Parse resumes successfully.
* Chat with AI.
* Generate professional application emails.
* Edit generated emails.
* Create Gmail drafts.
* Send emails.
* View basic application analytics.

---

# References

## Cloudflare

* https://developers.cloudflare.com/workers/
* https://developers.cloudflare.com/d1/
* https://developers.cloudflare.com/r2/

## Hono

* https://hono.dev/

## Better Auth

* https://www.better-auth.com/

## OpenRouter

* https://openrouter.ai/docs

## Gmail API

* https://developers.google.com/gmail/api

## React

* https://react.dev/

## Tailwind CSS

* https://tailwindcss.com/

## PDF.js

* https://mozilla.github.io/pdf.js/

---

# License

The project is intended to be released under the MIT License.

---

# Document Status

**Version:** 1.0 (Draft)

This README serves as the master index for the complete technical specification. Subsequent documents expand each section in detail and together form the authoritative blueprint for implementing ApplyViaEmailAI.

