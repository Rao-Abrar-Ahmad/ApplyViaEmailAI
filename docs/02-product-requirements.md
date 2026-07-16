# 02 - Product Requirements

> **Document Version:** 1.0 (Draft)
> **Project:** ApplyViaEmailAI
> **Status:** Functional & Non-Functional Requirements Specification

---

# Purpose

This document defines the complete product requirements for ApplyViaEmailAI.

It serves as the primary requirements document for implementation and should be used by developers, designers, QA engineers, and AI coding agents to understand exactly what the application must do.

This document intentionally focuses on **requirements**, not implementation.

---

# Requirement Definitions

| Priority    | Description                |
| ----------- | -------------------------- |
| Must Have   | Required for Version 1     |
| Should Have | Important but not critical |
| Could Have  | Future enhancement         |
| Won't Have  | Explicitly excluded        |

---

# Product Modules

Version 1 consists of the following modules.

| Module              | Priority  |
| ------------------- | --------- |
| Landing Page        | Must Have |
| Authentication      | Must Have |
| Dashboard           | Must Have |
| Resume Management   | Must Have |
| AI Chat             | Must Have |
| AI Email Generation | Must Have |
| Email Preview       | Must Have |
| Gmail Integration   | Must Have |
| User Settings       | Must Have |
| Analytics           | Must Have |

---

# Functional Requirements

---

# Landing Page

## Objective

Introduce the application and encourage users to create an account.

---

## Requirements

The landing page shall include:

* Hero section
* Product introduction
* Features section
* Technology stack
* How it works
* Frequently Asked Questions
* Open Source section
* Footer
* Sign Up button
* Login button

---

## Hero Section

Must contain:

* Product name
* Short tagline
* Brief description
* Primary CTA
* Secondary CTA
* Product illustration

---

## Features Section

Must describe:

* AI Email Generation
* Resume Management
* Gmail Integration
* Privacy First
* Bring Your Own AI
* Open Source

---

## Technology Stack

Display logos for:

* React
* Hono
* Cloudflare Workers
* D1
* R2
* Better Auth
* OpenRouter
* Gmail API

---

## Acceptance Criteria

* Landing page loads successfully.
* CTA buttons navigate correctly.
* Mobile responsive.
* Accessible.
* SEO friendly.

---

# Authentication

## Objective

Provide secure user authentication.

---

## Supported Methods

* Google OAuth
* Email & Password

---

## User Registration

User must be able to:

* Register
* Login
* Logout

---

## Sessions

The application shall use secure HTTP-only session cookies.

---

## Requirements

Users must remain logged in until:

* Logout
* Session expiration
* Session revocation

---

## Acceptance Criteria

* Login succeeds.
* Logout succeeds.
* Sessions persist.
* Protected routes require authentication.

---

# Dashboard

## Objective

Provide a single-page workspace.

---

## Layout

Three-column layout.

```text
--------------------------------------------------------
Resume Panel | AI Chat | Email Preview
--------------------------------------------------------
```

---

## Requirements

Dashboard shall include:

* Sidebar
* Resume Manager
* Chat
* Email Preview
* Header
* Settings button

---

## Acceptance Criteria

* Dashboard loads after login.
* Responsive layout.
* Smooth scrolling.
* Keyboard accessible.

---

# Resume Management

## Objective

Manage resumes.

---

## Upload

Requirements:

* PDF only
* Maximum three resumes
* Drag & Drop
* File picker
* Upload progress

---

## Validation

Reject:

* DOC
* DOCX
* Images
* ZIP
* Executables

---

## Browser Parsing

Resume must be parsed inside the browser.

Extract:

* Plain text

Show:

* Parsing progress

---

## Storage

Store:

* Original PDF
* Parsed text
* Metadata

---

## Delete

Users may remove resumes.

Deletion removes:

* PDF
* Parsed text
* Metadata

---

## Acceptance Criteria

* Upload succeeds.
* Invalid files rejected.
* Parsing succeeds.
* Resume available immediately.

---

# AI Chat

## Objective

Generate email content.

---

## Requirements

User can:

* Paste job description
* Ask follow-up questions
* Modify requests
* Continue conversation

Conversation exists only during current session.

---

## AI Context

Every request shall include:

* User profile
* Selected resume
* Parsed resume text
* Current conversation
* System prompt
* User instructions

---

## Conversation

Not persisted.

Refresh clears conversation.

---

## Acceptance Criteria

* AI responds.
* Conversation updates.
* Refresh clears chat.

---

# AI Email Generation

## Objective

Generate structured application data.

---

## Required Output

* Company
* Job Title
* Email
* Subject
* Email Body

---

## Response Format

AI must return structured JSON.

---

## Validation

Response must pass schema validation.

If invalid:

* Retry
* Retry
* Show error

---

## Requirements

AI shall never return free-form text.

---

## Acceptance Criteria

* Schema validated.
* Invalid responses rejected.
* User notified on failure.

---

# Email Preview

## Objective

Allow review before drafting.

---

## Editable Fields

* Recipient Email
* Company
* Job Title
* Subject
* Email Body
* Resume Selector

---

## Actions

* Create Draft
* Send Email

---

## Requirements

All generated fields remain editable.

---

## Acceptance Criteria

* Fields editable.
* Resume selectable.
* Draft button functional.

---

# Gmail Integration

## Objective

Connect Gmail.

---

## Requirements

Users shall:

* Connect Gmail
* Reconnect Gmail
* Disconnect Gmail

---

## Draft

Application creates Gmail Draft.

---

## Send

Optional direct send.

---

## Attachments

Selected resume attached automatically.

---

## Acceptance Criteria

* Gmail connects.
* Draft created.
* Resume attached.

---

# User Settings

## Objective

Store reusable information.

---

## Profile

Fields:

* Full Name
* Headline
* Years Experience
* Portfolio
* GitHub
* LinkedIn
* Location
* Skills
* Achievements

---

## AI

Store:

* OpenRouter API Key
* Preferred Model
* Custom Prompt

---

## Gmail

Display:

* Connection Status

---

## Acceptance Criteria

* Settings saved.
* Editable.
* Persist across sessions.

---

# Analytics

## Objective

Provide lightweight usage statistics.

---

## Track

* Applications
* Drafts
* Emails Sent
* Resume Usage

---

## Do Not Track

* Job descriptions
* AI conversations
* AI output
* Resume contents

---

## Acceptance Criteria

* Analytics update automatically.
* Privacy preserved.

---

# Error Handling

Application shall gracefully handle:

* Invalid login
* Upload failures
* PDF parsing errors
* AI failures
* Gmail failures
* Network failures
* Rate limits

Users shall receive clear, actionable error messages.

---

# Security Requirements

Must:

* Encrypt OpenRouter API keys.
* Use secure sessions.
* Validate every request.
* Restrict file uploads.
* Sanitize user input.

Must not:

* Store plaintext API keys.
* Store passwords in plaintext.
* Expose secrets to clients.

---

# Privacy Requirements

Must not permanently store:

* Job descriptions
* AI prompts
* AI responses
* Chat history

May store:

* Application metadata
* Resume metadata
* Analytics

---

# Performance Requirements

| Requirement    | Target      |
| -------------- | ----------- |
| Landing Page   | <2 seconds  |
| Dashboard      | <2 seconds  |
| Resume Parsing | <10 seconds |
| AI Response    | <15 seconds |
| Draft Creation | <5 seconds  |

---

# Accessibility Requirements

Application shall:

* Support keyboard navigation.
* Maintain focus order.
* Use semantic HTML.
* Support screen readers.
* Meet WCAG AA where practical.

---

# Browser Support

Support latest versions of:

* Chrome
* Edge
* Firefox
* Safari

---

# Mobile Support

Supported:

* Responsive layout
* Tablet
* Mobile

Not optimized for:

* Very small screens (<320px)

---

# Business Rules

## Resume Limit

Maximum:

3 resumes.

---

## Supported File Type

Only:

PDF

---

## AI Provider

Only:

OpenRouter

---

## Email Provider

Only:

Gmail

---

## Authentication

Supported:

* Google
* Email/Password

---

## Chat

Session only.

---

## Storage

Metadata only for applications.

---

# Out of Scope

Version 1 excludes:

* Browser Extension
* Job Scraping
* Cover Letters
* Resume Builder
* Resume Optimizer
* Interview Preparation
* ATS Analysis
* Multiple AI Providers
* Multiple Email Providers
* Teams
* Organizations
* Payments

---

# User Stories

### Authentication

* As a user, I want to register so I can access the application.
* As a user, I want to login securely.
* As a user, I want to logout safely.

---

### Resume Management

* As a user, I want to upload my resume.
* As a user, I want to replace my resume.
* As a user, I want to delete my resume.

---

### AI

* As a user, I want AI to understand my resume.
* As a user, I want AI to understand the job description.
* As a user, I want to edit AI output before sending.

---

### Gmail

* As a user, I want Gmail drafts.
* As a user, I want my resume attached automatically.
* As a user, I want to send the email without leaving the application.

---

### Settings

* As a user, I want to configure my profile once.
* As a user, I want AI to reuse my profile.

---

# Acceptance Criteria

Version 1 is complete when:

* Users can authenticate.
* Gmail connects successfully.
* OpenRouter API key can be saved securely.
* PDF resumes upload and parse successfully.
* Users can chat with AI.
* AI returns valid structured output.
* Users can edit generated emails.
* Gmail drafts are created with attachments.
* Application metadata is stored.
* Privacy requirements are met.
* All major workflows are functional.

---

# References

## Better Auth

https://www.better-auth.com/

## Cloudflare Workers

https://developers.cloudflare.com/workers/

## Cloudflare D1

https://developers.cloudflare.com/d1/

## Cloudflare R2

https://developers.cloudflare.com/r2/

## Hono

https://hono.dev/

## OpenRouter

https://openrouter.ai/docs

## Gmail API

https://developers.google.com/gmail/api

## React

https://react.dev/

## PDF.js

https://mozilla.github.io/pdf.js/

---

# Next Document

**03-system-architecture.md**

This document will define the complete software architecture, Cloudflare infrastructure, component interactions, service boundaries, data flow, system diagrams, and architectural decisions for ApplyViaEmailAI.
