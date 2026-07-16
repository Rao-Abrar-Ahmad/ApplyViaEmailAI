# 07 - Authentication

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Authentication Provider:** Better Auth
> **Purpose:** Define the authentication system, session management, authorization rules, and account lifecycle.

---

# Overview

ApplyViaEmailAI uses **Better Auth** for authentication.

Authentication should be simple, secure, and require minimal custom implementation.

The application supports:

* Google OAuth
* Email & Password

Authentication is required before accessing the dashboard.

---

# Goals

The authentication system should:

* Be secure by default
* Support multiple login methods
* Use session-based authentication
* Protect all private routes
* Keep implementation simple
* Integrate seamlessly with Cloudflare Workers

---

# Authentication Methods

## Google OAuth

Recommended login method.

Benefits:

* Fast onboarding
* No password management
* Trusted authentication
* Better user experience

---

## Email & Password

Supported for users who prefer traditional authentication.

Features:

* Register
* Login
* Logout

Password reset can be added in a future release.

---

# Authentication Flow

## Google Login

```text
Landing Page

â†“

Continue with Google

â†“

Google Consent Screen

â†“

Better Auth

â†“

Create User (if new)

â†“

Create Session

â†“

Dashboard
```

---

## Email Registration

```text
Landing Page

â†“

Register

â†“

Name

â†“

Email

â†“

Password

â†“

Create Account

â†“

Create Session

â†“

Dashboard
```

---

## Email Login

```text
Login

â†“

Email

â†“

Password

â†“

Validate

â†“

Create Session

â†“

Dashboard
```

---

# Session Management

The application uses **HTTP-only session cookies**.

The frontend never stores:

* Access Tokens
* Refresh Tokens
* JWT Tokens

Authentication state is managed entirely by Better Auth.

---

# Session Rules

Sessions should:

* Be automatically created after login.
* Persist across browser refreshes.
* Expire after inactivity based on Better Auth configuration.
* Be invalidated after logout.

---

# Authorization

Only authenticated users can access:

```text
/dashboard

/api/chat

/api/resumes

/api/settings

/api/email

/api/analytics
```

Public routes remain accessible without authentication.

---

# Public Routes

```text
/

login

register
```

---

# Protected Routes

```text
/dashboard
```

All API routes that handle user data must require authentication.

---

# User Lifecycle

## New User

```text
Visit Website

â†“

Create Account

â†“

Session Created

â†“

Dashboard

â†“

Complete Profile

â†“

Ready
```

---

## Returning User

```text
Login

â†“

Validate Session

â†“

Dashboard
```

---

## Logout

```text
Click Logout

â†“

Destroy Session

â†“

Redirect to Landing Page
```

---

# Account Creation

When a user registers, the application should automatically create:

* User record
* Settings record
* Analytics record

This ensures all required data structures exist before the user starts using the application.

---

# Google OAuth

Google OAuth should request only the permissions required for authentication.

Required information:

* Name
* Email
* Profile Image

No Gmail permissions are requested during login.

Gmail access is connected separately from the Settings page.

---

# Gmail Connection

Authentication and Gmail authorization are separate features.

Authentication identifies the user.

Gmail authorization allows sending emails.

Users can:

* Connect Gmail
* Disconnect Gmail
* Reconnect Gmail

without affecting their login session.

---

# Password Requirements

Minimum requirements:

* At least 8 characters
* Uppercase letter
* Lowercase letter
* Number

Strong passwords are encouraged.

---

# Email Verification

Version 1 may operate without mandatory email verification to simplify onboarding.

Future versions may require email verification before accessing the dashboard.

---

# Forgot Password

Out of scope for Version 1.

Future support may include:

* Password reset email
* Reset token
* Password update flow

---

# User Profile

Basic profile information is managed by Better Auth.

Additional application-specific information is stored in the **settings** table.

---

# Authentication Middleware

Every protected request should:

1. Validate session.
2. Load authenticated user.
3. Reject unauthorized access.
4. Continue request processing.

Routes should never trust user identifiers sent from the frontend.

---

# Session Security

Sessions should use:

* HTTP-only cookies
* Secure cookies in production
* SameSite protection
* Automatic expiration

Sensitive session data should never be accessible from JavaScript.

---

# Login Persistence

Users should remain logged in after:

* Browser refresh
* Opening a new tab
* Short periods of inactivity

Until:

* Logout
* Session expiration
* Session revocation

---

# Authorization Rules

A user may only access:

* Their own settings
* Their own resumes
* Their own analytics
* Their own applications

Every database query must be scoped to the authenticated user.

---

# Account Deletion

Future feature.

Deleting an account should remove:

* User profile
* Settings
* Resumes
* Parsed resume text
* Analytics
* Applications
* Gmail connection
* Stored API key

Deletion should also remove associated files from R2.

---

# Error Handling

Authentication errors should include:

* Invalid credentials
* Session expired
* Unauthorized access
* Google login failure
* Account already exists
* Email already registered

Messages should be user-friendly and never expose internal details.

---

# Frontend Responsibilities

The frontend is responsible for:

* Displaying login forms
* Displaying registration forms
* Showing authentication errors
* Redirecting authenticated users
* Logging out users

The frontend is **not** responsible for validating authentication tokens.

---

# Backend Responsibilities

The backend is responsible for:

* Creating sessions
* Validating sessions
* Destroying sessions
* Protecting routes
* Managing OAuth
* Managing user records

---

# Security Guidelines

The authentication system must:

* Never expose passwords.
* Never expose session identifiers.
* Never expose API keys.
* Never trust client-side authentication state.
* Validate every protected request.

---

# Business Rules

* Every user must have exactly one account.
* Every user must have one settings record.
* Every user must have one analytics record.
* Authentication is required before accessing the dashboard.
* Gmail connection is optional but required before sending emails.

---

# Acceptance Criteria

Authentication is considered complete when:

* Users can register with email and password.
* Users can sign in with Google.
* Sessions persist correctly.
* Protected routes require authentication.
* Users can log out successfully.
* Unauthorized users cannot access protected resources.
* User records are created automatically.
* Authentication and Gmail authorization remain independent.

---

# References

## Better Auth

https://www.better-auth.com/

## Better Auth Documentation

https://www.better-auth.com/docs

## Google OAuth

https://developers.google.com/identity

## Cloudflare Workers

https://developers.cloudflare.com/workers/

---

# Next Document

**08-ai-engine.md**

This document defines the AI engine, OpenRouter integration, supported models, prompt architecture, structured output schema, validation strategy, retry logic, resume context handling, and AI workflow for ApplyViaEmailAI.

