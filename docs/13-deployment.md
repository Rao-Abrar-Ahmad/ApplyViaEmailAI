# 13 - Deployment

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Platform:** Cloudflare
> **Purpose:** Define the deployment architecture, environment configuration, production setup, and deployment process.

---

# Overview

ApplyViaEmailAI is deployed entirely on the **Cloudflare** ecosystem.

Version 1 uses a **single Cloudflare Worker** that serves both:

* React Frontend
* Hono Backend API

This keeps deployment simple, fast, and cost-effective.

---

# Deployment Architecture

```text id="u6mtv4"
                User

                  Ã¢â€â€š

                  Ã¢â€“Â¼

      Cloudflare Workers

                  Ã¢â€â€š

      Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â´Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â

      Ã¢â€â€š                       Ã¢â€â€š

 React Assets            Hono API

      Ã¢â€â€š                       Ã¢â€â€š

      Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Ëœ

                  Ã¢â€â€š

        Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â´Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â

        Ã¢â€â€š         Ã¢â€â€š          Ã¢â€â€š

       D1         R2     Better Auth

                  Ã¢â€â€š

        Ã¢â€Å’Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â´Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€Â

        Ã¢â€â€š                    Ã¢â€â€š

   OpenRouter          Gmail API
```

---

# Cloudflare Services

Version 1 uses the following services.

| Service         | Purpose                  |
| --------------- | ------------------------ |
| Workers         | Backend + Static Hosting |
| Workers Assets  | React Application        |
| D1              | Database                 |
| R2              | Resume Storage           |
| Workers Secrets | Environment Variables    |

---

# Runtime

Application Runtime:

* Cloudflare Workers

Framework:

* Hono

Frontend:

* React + Vite

---

# Build Process

Frontend:

```text id="lww1gc"
React

Ã¢â€ â€œ

Build

Ã¢â€ â€œ

Static Assets

Ã¢â€ â€œ

Workers Assets
```

Backend:

```text id="v56q39"
TypeScript

Ã¢â€ â€œ

Build

Ã¢â€ â€œ

Worker Bundle

Ã¢â€ â€œ

Cloudflare Worker
```

Deployment publishes both together.

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

# Wrangler Configuration

The project should contain:

* Worker configuration
* D1 binding
* R2 binding
* Assets configuration
* Environment bindings

The complete configuration should remain version controlled except for secrets.

---

# Environment Variables

Required environment variables include:

### Better Auth

* BETTER_AUTH_SECRET
* BETTER_AUTH_URL

---

### Encryption

* ENCRYPTION_SECRET

---

### Gmail

* GOOGLE_CLIENT_ID
* GOOGLE_CLIENT_SECRET

---

### Cloudflare

* D1 Database Binding
* R2 Bucket Binding

---

### Application

* APP_NAME
* APP_URL
* NODE_ENV

---

# Secrets

Store sensitive values using **Cloudflare Worker Secrets**.

Never commit secrets to source control.

Examples:

* Better Auth Secret
* Encryption Secret
* Google Client Secret

User-provided OpenRouter API keys are stored in D1 after encryption and are **not** deployment secrets.

---

# Assets

React build output should be served through Workers Assets.

Benefits:

* Single deployment
* Fast global delivery
* Simple routing

---

# Routing

Public Routes:

```text id="s7c0s4"
/

login

register
```

Protected Route:

```text id="h2t67i"
/dashboard
```

API Routes:

```text id="jlwmij"
/api/*
```

All non-API routes should serve the React application.

---

# Database Deployment

Cloudflare D1 is responsible for:

* User data
* Settings
* Resume metadata
* Analytics
* Application metadata

Database migrations should run during deployment.

---

# Storage Deployment

Cloudflare R2 stores:

* Uploaded resumes

No other files are stored in R2.

---

# External Services

Production integrates with:

* Better Auth
* Gmail API
* OpenRouter

No additional infrastructure is required.

---

# Domain

Example production URL:

```text id="isjv1b"
https://applyviaemail.ai
```

Example API:

```text id="x4zl34"
https://applyviaemail.ai/api
```

---

# HTTPS

Production must use HTTPS.

All authentication and API communication should occur over secure connections.

---

# Build Commands

Frontend:

* Install dependencies
* Build React application

Backend:

* Build Worker
* Publish Worker

The exact commands depend on the package manager used by the project.

---

# Deployment Flow

```text id="gztfb4"
Push Code

Ã¢â€ â€œ

Build

Ã¢â€ â€œ

Run Migrations

Ã¢â€ â€œ

Upload Assets

Ã¢â€ â€œ

Deploy Worker

Ã¢â€ â€œ

Production Ready
```

---

# CI/CD

Recommended workflow:

```text id="mxzrwo"
Git Push

Ã¢â€ â€œ

GitHub Actions

Ã¢â€ â€œ

Build

Ã¢â€ â€œ

Tests

Ã¢â€ â€œ

Deploy
```

Automated deployment is recommended after successful validation.

---

# Logging

Production logs should include:

* Authentication events
* Upload events
* AI request status
* Gmail operations
* Application errors

Avoid logging sensitive data.

---

# Monitoring

Monitor:

* Worker errors
* API failures
* AI failures
* Gmail failures
* Upload failures

Future monitoring tools may be added as needed.

---

# Production Checklist

Before deployment, verify:

* Environment variables configured
* Worker secrets configured
* D1 database created
* R2 bucket created
* Better Auth configured
* Google OAuth configured
* Gmail API enabled
* HTTPS enabled
* Migrations executed
* React assets built

---

# Local Development

Recommended local environment:

* Node.js (LTS)
* Wrangler
* D1 Local
* React Development Server

Developers should be able to run the application locally before deployment.

---

# Versioning

Use semantic versioning.

Examples:

* v1.0.0
* v1.1.0
* v2.0.0

---

# Backup Strategy

Rely on Cloudflare's platform capabilities for:

* D1 backups
* R2 durability

No custom backup system is required for Version 1.

---

# Disaster Recovery

If deployment fails:

* Roll back to the previous stable deployment.
* Re-run migrations only if safe.
* Restore configuration if required.

---

# Cost Considerations

Version 1 is designed to stay within Cloudflare's free tier where possible.

Users provide their own:

* OpenRouter API key
* Gmail account

This minimizes operational costs.

---

# Acceptance Criteria

Deployment is complete when:

* React is served by Workers Assets.
* Hono API is deployed as a Worker.
* D1 is connected.
* R2 is connected.
* Better Auth is configured.
* Gmail OAuth is configured.
* Secrets are stored securely.
* Production routing works.
* HTTPS is enabled.

---

# References

## Cloudflare Workers

https://developers.cloudflare.com/workers/

## Workers Assets

https://developers.cloudflare.com/workers/static-assets/

## Wrangler

https://developers.cloudflare.com/workers/wrangler/

## Cloudflare D1

https://developers.cloudflare.com/d1/

## Cloudflare R2

https://developers.cloudflare.com/r2/

## Better Auth

https://www.better-auth.com/

## Gmail API

https://developers.google.com/gmail/api

---

# Next Document

**14-development-roadmap.md**

This document defines the implementation phases, milestones, development priorities, recommended build order, testing checkpoints, and Version 1 release plan for ApplyViaEmailAI.


