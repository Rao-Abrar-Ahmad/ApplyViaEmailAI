# 01 - Project Overview

> **Document Version:** 1.0 (Draft)
> **Project:** ApplyViaEmailAI
> **Status:** Planning & Architecture

---

# Purpose

This document defines the overall vision, scope, business goals, user experience, and product direction for **ApplyViaEmailAI**.

It serves as the foundation for every other technical document in this specification.

This document intentionally avoids implementation details. Those are covered in later documentation.

---

# Project Summary

ApplyViaEmailAI is an AI-powered web application that simplifies the process of applying for jobs through email.

The application combines:

* AI-assisted email writing
* Resume management
* Gmail draft creation
* Resume context understanding
* User-owned AI providers

into a single workflow.

Instead of manually switching between ChatGPT, Gmail, local files, and job websites, users complete the entire application process from one interface.

---

# Vision Statement

> **Enable job seekers to create professional job application emails in less than one minute while maintaining complete ownership of their data, AI provider, and email account.**

---

# Mission

Reduce repetitive work involved in job applications while ensuring:

* Privacy
* Transparency
* User control
* Open-source accessibility

---

# Problem Statement

Email-based job applications remain one of the most common hiring methods.

A typical workflow requires users to:

* Find a job
* Read the description
* Copy the job description
* Open an AI assistant
* Generate an email
* Copy the email
* Open Gmail
* Create a new email
* Attach a resume
* Send the email

Repeating this workflow dozens of times each week wastes time and interrupts focus.

There is currently no simple web application that centralizes this process while allowing users to use their own AI provider and Gmail account.

---

# Proposed Solution

ApplyViaEmailAI combines all required steps into a single application.

The workflow becomes:

```text
Paste Job Description

â†“

AI understands the job

â†“

AI generates application email

â†“

User reviews

â†“

User edits

â†“

Create Gmail Draft

â†“

Send
```

No copy-pasting between applications.

---

# Objectives

## Primary Objectives

* Simplify email-based job applications.
* Minimize repetitive manual work.
* Keep users in control.
* Maintain professional-quality AI output.
* Build an entirely serverless application.
* Release as open source.

---

## Technical Objectives

* Cloud-native architecture.
* Fast response times.
* Minimal operational cost.
* Simple deployment.
* Modular codebase.
* Easy contribution from the community.

---

## User Experience Objectives

Users should never need to:

* Open ChatGPT.
* Copy AI responses.
* Manually type email subjects.
* Search for resumes.
* Repeatedly enter personal information.

---

# Target Audience

## Primary Users

### Frontend Developers

Developers applying for:

* React
* Vue
* Angular
* Next.js
* TypeScript
* JavaScript

roles.

---

### Full Stack Developers

Developers applying for:

* MERN
* Node.js
* Laravel
* .NET
* Python
* Java

positions.

---

### Shopify Developers

Developers applying for:

* Shopify
* Liquid
* Hydrogen
* Shopify Plus

roles.

---

### Software Engineers

Professionals applying through direct email rather than ATS systems.

---

## Secondary Users

The platform is flexible enough for:

* Designers
* Product Managers
* QA Engineers
* DevOps Engineers
* Students
* Freelancers

---

# User Personas

## Persona 1

### Experienced Developer

Characteristics

* Applies to many jobs weekly.
* Has multiple resumes.
* Uses ChatGPT frequently.
* Wants to reduce repetitive work.

Goals

* Save time.
* Keep emails professional.
* Avoid repetitive copy-paste.

---

## Persona 2

### Fresh Graduate

Characteristics

* Limited interview experience.
* Unsure how to write application emails.

Goals

* Generate professional emails.
* Learn best practices.
* Improve confidence.

---

## Persona 3

### Freelancer

Characteristics

* Frequently sends proposals.
* Uses different resumes for different opportunities.

Goals

* Organize resumes.
* Generate better emails quickly.

---

# Value Proposition

ApplyViaEmailAI provides:

* One interface.
* One workflow.
* One AI conversation.
* One Gmail integration.

instead of several disconnected tools.

---

# Core Principles

## Simplicity

The application should feel lightweight.

Every screen should have a clear purpose.

---

## Privacy

Users own their:

* Gmail account
* AI API key
* Resume

Sensitive information should never be collected unnecessarily.

---

## Transparency

AI-generated content should always remain editable.

Users approve every outgoing email.

---

## Reliability

AI responses should follow a strict schema.

Invalid responses should never reach the interface.

---

## Open Source

Every architectural decision should favor maintainability and community contribution.

---

# Product Scope

## Included in Version 1

### Landing Page

* Hero section
* Features
* Technology stack
* FAQ
* Call-to-action

---

### Authentication

* Google OAuth
* Email/password
* Session management

---

### Dashboard

Single-page interface.

Three-column layout.

---

### Resume Management

* Upload PDF
* Delete PDF
* Replace PDF
* Maximum three resumes

---

### Resume Parsing

* Browser-side parsing
* Extract text
* Store parsed text

---

### AI Chat

* Session-based conversation
* Paste job description
* Ask follow-up questions

---

### AI Email Generation

Generate:

* Company
* Job title
* Email
* Subject
* Email body

---

### Email Preview

Editable fields.

Users can modify every generated value.

---

### Gmail Integration

* Connect Gmail
* Create Draft
* Send Email

---

### Settings

Store:

* Profile
* Links
* AI Key
* Gmail Connection
* Preferred Model
* Custom Instructions

---

### Analytics

Track

* Applications created
* Drafts created
* Emails sent
* Resume usage

---

# Out of Scope

The following features are intentionally excluded.

## Job Scraping

No LinkedIn scraping.

No Indeed scraping.

No Greenhouse integration.

No Lever integration.

---

## Browser Extensions

No Chrome extension.

---

## Cover Letters

Not included.

---

## Resume Builder

Not included.

---

## Resume Optimization

Not included.

---

## ATS Analysis

Not included.

---

## Interview Preparation

Not included.

---

## CRM

Not included.

---

## Job Tracking

Beyond basic metadata, no advanced pipeline management.

---

# Product Workflow

## First-Time User

```text
Landing Page

â†“

Create Account

â†“

Verify Account

â†“

Dashboard

â†“

Settings

â†“

Connect Gmail

â†“

Add OpenRouter API Key

â†“

Upload Resume(s)

â†“

Ready
```

---

## Returning User

```text
Login

â†“

Dashboard

â†“

Paste Job Description

â†“

Chat

â†“

Generate Email

â†“

Review

â†“

Create Draft

â†“

Send
```

---

# Success Criteria

The project succeeds if users can:

* Complete onboarding in a few minutes.
* Generate a professional email in under one minute.
* Avoid leaving the application during the workflow.
* Use their own AI provider.
* Use their own Gmail account.
* Manage multiple resumes easily.

---

# Constraints

The project intentionally follows these constraints.

## Technical

* Cloudflare-only infrastructure.
* Single Worker architecture.
* Browser-based PDF parsing.
* Structured AI responses only.
* Limited AI model support.

---

## Business

* Free and open source.
* Users provide AI credentials.
* No paid subscriptions.
* No proprietary backend services.

---

## UX

* Minimal clicks.
* No unnecessary pages.
* Dashboard-first design.
* Editable AI output.

---

# Assumptions

The project assumes:

* Users have a Gmail account.
* Users possess an OpenRouter API key.
* Users have PDF resumes.
* Job descriptions contain an email address or users will manually provide one.
* Users review generated emails before sending.

---

# Risks

| Risk                              | Mitigation                                     |
| --------------------------------- | ---------------------------------------------- |
| AI returns invalid JSON           | Strict schema validation with retries          |
| No email found in job description | Manual email input                             |
| Poor AI output                    | User editing before draft creation             |
| Gmail authorization expires       | Reconnect workflow                             |
| Unsupported PDF                   | Client-side validation and upload restrictions |

---

# Design Decisions

| Decision                 | Reason                                                     |
| ------------------------ | ---------------------------------------------------------- |
| Cloudflare Workers       | Serverless deployment and global edge network              |
| Hono                     | Lightweight framework optimized for Workers                |
| Better Auth              | Secure authentication with Google OAuth and email/password |
| D1                       | Relational data storage                                    |
| R2                       | Resume storage                                             |
| Browser-side PDF parsing | Lower server load and better UX                            |
| OpenRouter               | User-owned AI provider with model flexibility              |
| Structured AI responses  | Reliable UI and predictable data                           |
| Gmail Draft workflow     | Safer than immediate sending                               |
| Three-resume limit       | Simple UI and focused workflow                             |
| Session-only chat        | Better privacy and reduced storage                         |

---

# Acceptance Criteria

The project overview is considered complete when:

* The product vision is clearly defined.
* Scope and non-scope are documented.
* Target users are identified.
* Product goals are established.
* User workflows are documented.
* Core principles are agreed upon.
* Project constraints are defined.
* Major architectural decisions are recorded.

---

# References

## Cloudflare

https://developers.cloudflare.com/

## Hono

https://hono.dev/

## Better Auth

https://www.better-auth.com/

## OpenRouter

https://openrouter.ai/docs

## Gmail API

https://developers.google.com/gmail/api

## React

https://react.dev/

---

# Next Document

**02-product-requirements.md**

The next document defines the complete functional and non-functional requirements, user stories, feature specifications, acceptance criteria, and business rules that drive the implementation of ApplyViaEmailAI.
