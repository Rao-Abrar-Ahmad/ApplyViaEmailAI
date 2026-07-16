# 10 - API Design

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Backend:** Hono + Cloudflare Workers
> **API Style:** REST API
> **Purpose:** Define the API endpoints, request flow, authentication, validation, and response conventions.

---

# Overview

The frontend communicates only with the Hono backend through REST APIs.

The backend is responsible for:

* Authentication
* Validation
* Business logic
* Database operations
* AI communication
* Gmail communication

All endpoints return JSON responses.

---

# Base URL

Development

```text
/api
```

Production

```text
https://your-domain.com/api
```

---

# API Principles

* RESTful endpoints
* JSON requests and responses
* Session-based authentication
* Consistent response format
* Input validation using Zod
* Feature-based route organization

---

# Response Format

Every endpoint should return a consistent response structure.

## Success

```text
success: true
data: {}
message: "Operation completed successfully."
```

---

## Error

```text
success: false
message: "Something went wrong."
errors: []
```

---

# Authentication

Protected endpoints require an authenticated session.

Public endpoints do not.

Authentication is handled by Better Auth.

---

# Route Structure

```text
/api

/auth
/user
/settings
/resumes
/chat
/email
/analytics
/health
```

---

# Authentication Routes

Base Route

```text
/api/auth
```

Managed by Better Auth.

Responsibilities:

* Register
* Login
* Logout
* Google OAuth
* Session

Custom authentication logic should be avoided whenever possible.

---

# User Routes

Base Route

```text
/api/user
```

Endpoints

| Method | Endpoint | Description                |
| ------ | -------- | -------------------------- |
| GET    | /me      | Current authenticated user |
| DELETE | /account | Delete account *(Future)*  |

---

# Settings Routes

Base Route

```text
/api/settings
```

Endpoints

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| GET    | /        | Get settings    |
| PUT    | /        | Update settings |

---

# Resume Routes

Base Route

```text
/api/resumes
```

Endpoints

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /           | List resumes      |
| POST   | /upload     | Upload resume     |
| DELETE | /:id        | Delete resume     |
| PATCH  | /:id/select | Set active resume |

---

# Upload Rules

Supported:

* PDF

Maximum:

* 3 resumes

Validation:

* File type
* File size
* Resume limit

---

# Chat Routes

Base Route

```text
/api/chat
```

Endpoints

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| POST   | /generate | Generate application email |

The backend builds the AI prompt and returns structured output.

---

# Email Routes

Base Route

```text
/api/email
```

Endpoints

| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| POST   | /draft      | Create Gmail draft      |
| POST   | /send       | Send email              |
| GET    | /status     | Gmail connection status |
| POST   | /connect    | Connect Gmail           |
| DELETE | /disconnect | Disconnect Gmail        |

---

# Analytics Routes

Base Route

```text
/api/analytics
```

Endpoints

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| GET    | /        | Retrieve user analytics |

---

# Health Route

Base Route

```text
/api/health
```

Endpoint

| Method | Endpoint | Description  |
| ------ | -------- | ------------ |
| GET    | /        | Health check |

Useful for deployment verification and monitoring.

---

# Request Lifecycle

```text id="f4szon"
React

â†“

API Request

â†“

Authentication

â†“

Validation

â†“

Business Logic

â†“

Database / External API

â†“

Response

â†“

Frontend Update
```

---

# Authentication Flow

Protected endpoints should execute:

```text id="fhpt8n"
Validate Session

â†“

Load User

â†“

Continue

OR

Return Unauthorized
```

---

# Validation

Every request should be validated.

Validation includes:

* Route parameters
* Request body
* Query parameters
* Uploaded files
* Authentication state

---

# AI Endpoint

The AI endpoint accepts:

* Job description
* Current conversation
* Selected resume

The backend automatically appends:

* User profile
* Resume text
* Custom prompt
* System prompt

The frontend never sends complete prompts.

---

# AI Response

The backend returns:

* Company
* Job title
* Email
* Subject
* Email body

The frontend populates the Email Preview panel with these values.

---

# Gmail Endpoints

The frontend sends:

* Recipient email
* Subject
* Body
* Resume ID

The backend retrieves:

* Resume file
* Gmail credentials

Then creates the draft or sends the email.

---

# Error Responses

Common API errors include:

| Status | Meaning               |
| ------ | --------------------- |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 409    | Conflict              |
| 422    | Validation Error      |
| 429    | Too Many Requests     |
| 500    | Internal Server Error |

---

# Rate Limiting

Version 1 should apply basic rate limiting to:

* AI generation
* Resume upload
* Gmail operations

Authentication routes may also be rate limited to reduce abuse.

---

# API Versioning

Version 1 uses:

```text
/api
```

Future versions may introduce:

```text
/api/v2
```

No versioning is required for the initial release.

---

# Security

Every protected endpoint must:

* Validate the session.
* Verify resource ownership.
* Validate input.
* Return sanitized errors.

Sensitive values must never be returned in responses.

---

# Logging

Log:

* API errors
* Authentication events
* AI requests (metadata only)
* Gmail operations
* Upload events

Do not log:

* Passwords
* API keys
* Resume contents
* Email body
* Job descriptions

---

# Response Guidelines

Responses should:

* Be consistent.
* Be predictable.
* Contain meaningful messages.
* Avoid unnecessary data.

The frontend should not rely on implementation details.

---

# Future Endpoints (Out of Scope)

Potential future APIs:

* Resume analysis
* Cover letter generation
* Job scraping
* Browser extension
* Notification service
* Template management

These endpoints are intentionally excluded from Version 1.

---

# Acceptance Criteria

The API design is complete when:

* All major modules have defined endpoints.
* Protected routes require authentication.
* Request validation is documented.
* Response format is standardized.
* AI workflow is defined.
* Gmail workflow is defined.
* Error handling conventions are established.

---

# References

## Hono

https://hono.dev/

## Better Auth

https://www.better-auth.com/

## OpenRouter

https://openrouter.ai/docs

## Gmail API

https://developers.google.com/gmail/api

## Zod

https://zod.dev/

## Cloudflare Workers

https://developers.cloudflare.com/workers/

---

# Next Document

**11-ui-ux-specification.md**

This document defines the complete user interface, page layouts, component hierarchy, design system, user flows, responsiveness, and overall user experience for ApplyViaEmailAI.
