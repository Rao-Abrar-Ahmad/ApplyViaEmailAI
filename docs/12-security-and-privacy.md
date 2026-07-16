# 12 - Security and Privacy

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Purpose:** Define the application's security practices, privacy principles, encryption strategy, and data protection guidelines.

---

# Overview

ApplyViaEmailAI is built with a **privacy-first** approach.

Users provide their own:

* Gmail account
* OpenRouter API key
* Resume

The application should only store the minimum amount of information required for functionality.

---

# Security Goals

The application should:

* Protect user accounts.
* Protect uploaded resumes.
* Protect API keys.
* Protect Gmail credentials.
* Prevent unauthorized access.
* Validate all requests.
* Minimize stored sensitive data.

---

# Security Principles

* Least privilege
* Secure by default
* Server-side validation
* Encrypted secrets
* Session-based authentication
* Minimal data retention
* Principle of ownership

---

# Authentication Security

Authentication is handled by Better Auth.

Requirements:

* HTTP-only cookies
* Secure cookies in production
* Session validation on every protected request
* Automatic session expiration

The frontend should never manage authentication tokens directly.

---

# Authorization

Every protected request must verify:

* User session
* Resource ownership

Users must never be able to access:

* Another user's resumes
* Another user's settings
* Another user's analytics
* Another user's Gmail connection

---

# API Security

Every API endpoint should:

* Validate authentication
* Validate request body
* Validate uploaded files
* Validate query parameters
* Return sanitized errors

Never trust data coming from the client.

---

# Input Validation

Validate all user input including:

* Forms
* Job descriptions
* File uploads
* Settings
* API requests

Validation should be performed on both:

* Frontend
* Backend

---

# File Upload Security

Supported format:

* PDF only

The backend should verify:

* MIME type
* File extension
* Maximum file size

Reject:

* DOC
* DOCX
* ZIP
* EXE
* Images
* Scripts

---

# Resume Security

Uploaded resumes are stored in Cloudflare R2.

Rules:

* Only the authenticated owner can access their resumes.
* Resume URLs should never be publicly accessible.
* Resume files should only be retrieved by the backend.

---

# Parsed Resume Text

Parsed resume text is stored to avoid repeated parsing.

Rules:

* Store only extracted text.
* Associate it with the owning user.
* Delete it when the resume is deleted.

---

# OpenRouter API Key

Users provide their own OpenRouter API key.

Requirements:

* Encrypt before storage.
* Never expose plaintext to the frontend.
* Decrypt only when making AI requests.
* Allow users to update or remove the key.

---

# Gmail Credentials

Gmail authorization is managed securely.

Requirements:

* Store only what is required.
* Never expose credentials to the frontend.
* Allow users to disconnect Gmail at any time.

---

# Sensitive Data

Sensitive information includes:

* Passwords
* Session cookies
* OpenRouter API keys
* Gmail credentials

Sensitive data must never appear in:

* API responses
* Browser storage
* Client-side logs
* Error messages

---

# Browser Storage

Do not store sensitive information in:

* Local Storage
* Session Storage
* IndexedDB

Only non-sensitive UI preferences may be stored locally if needed.

---

# Data Encryption

Encrypted fields include:

* OpenRouter API key

Passwords and authentication data are managed by Better Auth.

Encryption should occur before writing sensitive values to D1.

---

# Privacy Policy

The application should clearly communicate:

* What data is stored.
* Why it is stored.
* What data is never stored.
* How users can remove their data.

---

# Data Retention

## Stored

* User profile
* Resume metadata
* Parsed resume text
* Settings
* Application metadata
* Analytics

---

## Never Stored

* Job descriptions
* AI conversations
* AI prompts
* AI responses
* Email body
* Gmail messages

---

# Logging

Log only operational information.

Examples:

* Login events
* Upload events
* Draft creation
* Email sending
* AI request status

Do not log:

* Passwords
* API keys
* Resume contents
* Email bodies
* Job descriptions
* AI responses

---

# Error Handling

Error messages should:

* Be clear
* Be user-friendly
* Avoid exposing implementation details

Internal errors should be logged only on the server.

---

# CORS

Allow requests only from approved frontend origins.

Disallow requests from unknown origins in production.

---

# Rate Limiting

Apply rate limits to:

* Login attempts
* Resume uploads
* AI generation
* Gmail operations

This helps reduce abuse and accidental excessive usage.

---

# Request Validation

Every request should be validated before processing.

Validation includes:

* Authentication
* Authorization
* Request schema
* Business rules

Invalid requests should be rejected immediately.

---

# Account Ownership

Users own:

* Their profile
* Their resumes
* Their Gmail connection
* Their API key
* Their analytics

The application must enforce ownership checks on every protected operation.

---

# Account Deletion

When account deletion is implemented, the application should remove:

* User record
* Settings
* Resume metadata
* Parsed resume text
* Resume files from R2
* Analytics
* Applications
* Stored API key
* Gmail authorization

Deletion should be permanent.

---

# Third-Party Services

Version 1 communicates only with:

* Better Auth
* OpenRouter
* Gmail API
* Cloudflare D1
* Cloudflare R2

No unnecessary third-party services should receive user data.

---

# Security Checklist

Before deployment, verify:

* Authentication enabled
* HTTPS enabled
* Cookies secured
* API key encryption enabled
* File validation enabled
* Authorization checks implemented
* Sensitive logs removed
* Environment variables configured

---

# User Responsibilities

Users are responsible for:

* Keeping their OpenRouter API key secure.
* Connecting the correct Gmail account.
* Uploading only their own resumes.
* Reviewing AI-generated content before sending.

---

# Compliance Goals

The application should aim to follow common privacy best practices by:

* Collecting minimal data.
* Giving users control over their data.
* Avoiding unnecessary retention.
* Supporting account deletion.
* Keeping processing transparent.

Formal regulatory compliance (such as GDPR) is outside the scope of Version 1 but should be considered in future releases.

---

# Acceptance Criteria

Security and privacy requirements are complete when:

* Sensitive data is encrypted.
* Sessions are protected.
* Resource ownership is enforced.
* API validation is implemented.
* Resume access is restricted.
* Job descriptions are never stored.
* AI conversations are never stored.
* Sensitive information is excluded from logs.
* Users can remove their stored credentials.

---

# References

## Better Auth

https://www.better-auth.com/

## Cloudflare Workers Security

https://developers.cloudflare.com/workers/

## Cloudflare D1

https://developers.cloudflare.com/d1/

## Cloudflare R2

https://developers.cloudflare.com/r2/

## OpenRouter

https://openrouter.ai/docs

## Gmail API

https://developers.google.com/gmail/api

## OWASP Top 10

https://owasp.org/www-project-top-ten/

---

# Next Document

**13-deployment.md**

This document defines the Cloudflare deployment architecture, environment variables, project configuration, build process, CI/CD recommendations, domain configuration, and production deployment checklist for ApplyViaEmailAI.
