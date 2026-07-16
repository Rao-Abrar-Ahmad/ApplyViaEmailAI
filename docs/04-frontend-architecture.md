# 04 - Frontend Architecture

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Purpose:** Define the frontend architecture, application structure, UI layout, state management, and frontend responsibilities.

---

# Overview

The frontend is a **Single Page Application (SPA)** built with React and served through Cloudflare Workers Assets.

The frontend is responsible for:

* User Interface
* User Experience
* Form Validation
* Resume Upload
* Browser-side PDF Parsing
* AI Chat Interface
* Email Preview
* Dashboard
* Settings
* API Communication

The frontend does **not** communicate directly with Gmail or OpenRouter. All requests go through the backend Worker.

---

# Technology Stack

| Purpose          | Technology      |
| ---------------- | --------------- |
| Framework        | React           |
| Build Tool       | Vite            |
| Language         | TypeScript      |
| Styling          | Tailwind CSS    |
| Routing          | React Router    |
| State Management | Zustand         |
| Data Fetching    | TanStack Query  |
| Forms            | React Hook Form |
| Validation       | Zod             |
| Icons            | Lucide React    |
| PDF Parsing      | PDF.js          |

---

# Application Structure

```text
app/

src/

â”œâ”€â”€ api/
â”œâ”€â”€ assets/
â”œâ”€â”€ components/
â”œâ”€â”€ contexts/
â”œâ”€â”€ features/
â”œâ”€â”€ hooks/
â”œâ”€â”€ layouts/
â”œâ”€â”€ pages/
â”œâ”€â”€ routes/
â”œâ”€â”€ services/
â”œâ”€â”€ stores/
â”œâ”€â”€ types/
â”œâ”€â”€ utils/
â”œâ”€â”€ App.tsx
â””â”€â”€ main.tsx
```

---

# Feature Structure

Each feature should be self-contained.

```text
features/

auth/

dashboard/

chat/

email-preview/

resume/

settings/

landing/
```

Each feature may contain:

* Components
* Hooks
* Types
* Validation
* API calls

---

# Routing

The application uses React Router.

## Public Routes

```text
/

Login

Register
```

---

## Protected Routes

```text
/ dashboard
```

All protected routes require authentication.

---

# Application Layout

## Landing Layout

```text
--------------------------------------------------

Navigation

Hero

Features

Technology

FAQ

Footer

--------------------------------------------------
```

---

## Dashboard Layout

```text
---------------------------------------------------------------

Header

---------------------------------------------------------------

Resume Panel

AI Chat

Email Preview

---------------------------------------------------------------
```

The dashboard is a single-page workspace.

---

# Component Hierarchy

```text
App

â”œâ”€â”€ Router

â”‚

â”œâ”€â”€ Landing

â”‚

â””â”€â”€ Dashboard

     â”œâ”€â”€ Header

     â”œâ”€â”€ Resume Panel

     â”œâ”€â”€ AI Chat

     â”œâ”€â”€ Email Preview

     â””â”€â”€ Settings Dialog
```

---

# Pages

## Landing Page

Responsibilities:

* Product introduction
* Marketing content
* Authentication links

---

## Login

Responsibilities:

* Email login
* Google login

---

## Register

Responsibilities:

* Account creation

---

## Dashboard

Responsibilities:

* Resume management
* AI chat
* Email preview
* Settings

---

# Shared Components

Examples:

```text
Button

Input

Textarea

Dialog

Dropdown

Card

Badge

Avatar

Loader

Toast

Modal

Tooltip
```

Shared components should remain generic and reusable.

---

# Resume Panel

## Responsibilities

* Display uploaded resumes
* Upload new resume
* Delete resume
* Select active resume
* Show upload progress
* Show parsing progress

---

## Resume Limit

Maximum:

3 PDFs

---

## Resume Card

Displays:

* File name
* Upload date
* Active indicator
* Delete button

---

# PDF Parsing

The browser is responsible for parsing uploaded PDFs.

Flow:

```text
Select PDF

â†“

Validate File

â†“

Extract Text

â†“

Show Progress

â†“

Preview Success

â†“

Upload PDF

â†“

Continue
```

Users should receive visual feedback during parsing.

---

# AI Chat

## Responsibilities

* Conversation
* Job description input
* Follow-up prompts
* Loading state
* Error state

---

## Chat Behavior

Conversation exists only during the current session.

Refreshing the page clears the conversation.

No chat history is stored.

---

## AI Messages

Support:

* User messages
* Assistant messages
* Loading indicator
* Retry option

---

# Email Preview

Displays editable form fields.

## Fields

* Recipient Email
* Company
* Job Title
* Subject
* Email Body
* Resume Selector

---

## Buttons

* Create Draft
* Send Email

All generated values remain editable.

---

# Settings Dialog

The settings page should open as a large modal.

Sections:

```text
Profile

AI Settings

Gmail

Account
```

---

# Profile Section

Fields include:

* Full Name
* Headline
* Experience
* Skills
* Portfolio
* GitHub
* LinkedIn
* Location

---

# AI Section

Fields include:

* OpenRouter API Key
* Preferred Model
* Custom Instructions

---

# Gmail Section

Displays:

* Connection status
* Connect button
* Disconnect button

---

# Account Section

Displays:

* User information
* Logout
* Delete account (future)

---

# State Management

Use Zustand for global UI state.

Recommended stores:

```text
auth

user

resume

chat

email

settings

ui
```

Each store should manage only its own feature.

---

# Server State

Use TanStack Query for:

* User profile
* Resume list
* Settings
* Analytics

Benefits:

* Caching
* Refetching
* Loading states
* Error handling

---

# Local State

Use React state for:

* Form inputs
* Dialog visibility
* Loading indicators
* Temporary UI state

Avoid storing server data in local component state.

---

# Form Management

Use React Hook Form.

Validation should use Zod schemas shared with the backend whenever possible.

---

# API Communication

The frontend communicates only with the backend Worker.

Flow:

```text
React

â†“

API Service

â†“

Worker

â†“

Response

â†“

Update UI
```

External services are never called directly.

---

# Loading States

Every async operation should provide feedback.

Examples:

* Login
* Upload
* PDF Parsing
* AI Generation
* Draft Creation
* Sending Email

Buttons should be disabled while requests are active.

---

# Error Handling

Display user-friendly messages for:

* Network errors
* Validation errors
* Upload failures
* AI failures
* Gmail failures

Never expose raw server errors.

---

# Notifications

Use toast notifications for:

* Resume uploaded
* Resume deleted
* Settings saved
* Draft created
* Email sent
* AI generation failed

---

# Accessibility

The frontend should support:

* Keyboard navigation
* Screen readers
* Focus management
* Semantic HTML
* Accessible dialogs
* Accessible forms

---

# Responsive Design

Support:

* Desktop
* Laptop
* Tablet
* Mobile

Dashboard should adapt without hiding critical functionality.

---

# Performance Guidelines

* Lazy load routes where appropriate.
* Optimize bundle size.
* Avoid unnecessary re-renders.
* Reuse components.
* Minimize API requests.

---

# Design Guidelines

The interface should be:

* Clean
* Modern
* Minimal
* Fast
* Professional

Focus on productivity over decoration.

---

# Frontend Responsibilities Summary

The frontend is responsible for:

* Rendering UI
* Managing forms
* Parsing PDFs
* Displaying AI responses
* Managing local state
* Sending API requests
* Displaying notifications

The frontend is **not** responsible for:

* Authentication logic
* AI processing
* Gmail API
* Encryption
* Database access

---

# Acceptance Criteria

The frontend architecture is complete when:

* All pages are defined.
* Layouts are documented.
* Component responsibilities are clear.
* State management strategy is defined.
* Routing is finalized.
* Resume workflow is documented.
* AI workflow is documented.
* Email preview workflow is documented.
* Settings structure is defined.

---

# References

## React

https://react.dev/

## Vite

https://vitejs.dev/

## React Router

https://reactrouter.com/

## Zustand

https://zustand-demo.pmnd.rs/

## TanStack Query

https://tanstack.com/query/latest

## React Hook Form

https://react-hook-form.com/

## Zod

https://zod.dev/

## Tailwind CSS

https://tailwindcss.com/

## Lucide React

https://lucide.dev/

## PDF.js

https://mozilla.github.io/pdf.js/

---

# Next Document

**05-backend-architecture.md**

This document defines the Hono backend architecture, API modules, service layer, middleware, validation, external integrations, and backend responsibilities.

