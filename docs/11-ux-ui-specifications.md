# 11 - UI/UX Specification

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Purpose:** Define the application's user interface, layouts, design system, user flows, and user experience guidelines.

---

# Overview

ApplyViaEmailAI is designed to be a **fast, minimal, and productivity-focused** application.

The interface should allow users to generate and send professional job application emails with the fewest possible steps.

Primary design goals:

* Simple
* Clean
* Professional
* Responsive
* Fast
* Accessible

---

# Design Principles

* Minimize clicks.
* Keep users on a single page whenever possible.
* Show progress during long-running tasks.
* Provide clear feedback.
* Keep important actions visible.
* Avoid unnecessary animations.

---

# Theme

Version 1 supports:

* Light Mode
* Dark Mode

Theme should follow the user's system preference by default.

---

# Color Palette

Use a minimal neutral palette.

Primary accent color should be configurable later.

Avoid excessive gradients or visual clutter.

---

# Typography

Use a clean, modern sans-serif font.

Recommended:

* Inter
* Geist
* Manrope

Maintain consistent spacing and typography throughout the application.

---

# Icons

Use **Lucide React** for all icons.

Examples:

* Upload
* Trash
* Settings
* Send
* Mail
* File
* User
* Check
* Alert
* Loader

---

# Application Pages

Version 1 includes:

* Landing Page
* Login
* Register
* Dashboard

No additional pages are required.

---

# Landing Page

Purpose:

* Explain the product.
* Encourage sign-up.
* Showcase features.

---

## Layout

```text id="5b6nax"
Navigation

â†“

Hero

â†“

Features

â†“

How It Works

â†“

Technology Stack

â†“

FAQ

â†“

Open Source

â†“

Footer
```

---

# Hero Section

Contains:

* Product name
* Tagline
* Short description
* Primary CTA
* Secondary CTA
* Hero illustration

---

# Features Section

Display feature cards for:

* AI Email Generation
* Resume Management
* Gmail Integration
* Bring Your Own API Key
* Privacy First
* Open Source

---

# How It Works

Simple four-step flow:

```text id="6qm9go"
1. Upload Resume

â†“

2. Paste Job Description

â†“

3. AI Generates Email

â†“

4. Send with Gmail
```

---

# Technology Stack Section

Display technology logos for:

* React
* Hono
* Cloudflare Workers
* Better Auth
* D1
* R2
* OpenRouter
* Gmail API

---

# Dashboard

The dashboard is the primary workspace.

Everything should be accessible from a single screen.

---

# Dashboard Layout

```text id="jg8r0r"
---------------------------------------------------------------

Header

---------------------------------------------------------------

Resume Panel

AI Chat

Email Preview

---------------------------------------------------------------
```

---

# Header

Contains:

* Logo
* Application Name
* Settings Button
* User Avatar

---

# Resume Panel

Position:

Left Sidebar

---

## Responsibilities

* Upload resumes
* Display uploaded resumes
* Select active resume
* Delete resumes

---

## Resume Card

Display:

* PDF icon
* File name
* Upload date
* Active indicator
* Delete button

Maximum:

3 resume cards

---

# Upload Experience

```text id="dw0xkx"
Select PDF

â†“

Validate

â†“

Parsing Progress

â†“

Upload Progress

â†“

Success
```

Progress should be visible throughout the process.

---

# AI Chat

Position:

Center Panel

---

## Components

* Conversation
* Message List
* Text Area
* Send Button
* Loading Indicator

---

## Behavior

Users can:

* Paste job descriptions
* Ask follow-up questions
* Refine generated emails

Conversation exists only for the current session.

---

# AI Message Types

Support:

* User Message
* Assistant Message
* Loading State
* Error State

---

# Email Preview

Position:

Right Sidebar

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

Users should always be able to edit AI-generated values.

---

# Settings Dialog

Open as a large modal.

---

## Sections

* Profile
* AI Settings
* Gmail
* Account

---

# Profile Section

Fields:

* Full Name
* Headline
* Experience
* Skills
* Portfolio
* GitHub
* LinkedIn
* Location

---

# AI Settings

Fields:

* OpenRouter API Key
* Preferred AI Model
* Custom Instructions

---

# Gmail Section

Display:

* Connection Status
* Connect Button
* Disconnect Button

---

# Account Section

Display:

* User Information
* Logout

Future:

* Delete Account

---

# User Flow

## First-Time User

```text id="d44i1h"
Landing Page

â†“

Register

â†“

Dashboard

â†“

Upload Resume

â†“

Complete Profile

â†“

Connect Gmail

â†“

Add OpenRouter Key

â†“

Ready
```

---

## Returning User

```text id="7qcsz8"
Login

â†“

Dashboard

â†“

Paste Job Description

â†“

Generate Email

â†“

Review

â†“

Create Draft / Send
```

---

# Empty States

Provide friendly empty states for:

* No resumes
* No Gmail connection
* Missing API key
* No AI conversation
* No generated email

Guide the user toward the next action.

---

# Loading States

Show loading indicators for:

* Login
* Resume upload
* PDF parsing
* AI generation
* Draft creation
* Email sending
* Settings update

Buttons should be disabled during active requests.

---

# Error States

Display user-friendly messages for:

* Upload failure
* AI failure
* Gmail failure
* Authentication failure
* Network failure

Avoid technical jargon.

---

# Notifications

Use toast notifications for:

* Resume uploaded
* Resume deleted
* Settings saved
* Gmail connected
* Draft created
* Email sent
* AI generation completed

---

# Responsive Design

Support:

* Desktop
* Laptop
* Tablet
* Mobile

---

## Desktop

Three-column layout.

---

## Tablet

Resizable columns or stacked side panels.

---

## Mobile

Panels should stack vertically:

```text id="z0pmvh"
Resume

â†“

Chat

â†“

Email Preview
```

---

# Accessibility

Support:

* Keyboard navigation
* Screen readers
* Focus indicators
* Semantic HTML
* Accessible dialogs
* Accessible forms

Aim for WCAG AA compliance where practical.

---

# Performance Guidelines

* Lazy load large components.
* Keep animations lightweight.
* Avoid unnecessary re-renders.
* Show immediate UI feedback.
* Optimize image and asset loading.

---

# Design Constraints

* Minimal interface.
* Productivity-focused.
* No unnecessary pages.
* No dashboard complexity.
* Single-page workflow.
* Consistent spacing.
* Professional appearance.

---

# Acceptance Criteria

The UI/UX specification is complete when:

* All pages are defined.
* Dashboard layout is documented.
* User flows are established.
* Component responsibilities are clear.
* Responsive behavior is documented.
* Empty, loading, and error states are defined.
* Settings dialog structure is finalized.

---

# References

## Tailwind CSS

https://tailwindcss.com/

## React

https://react.dev/

## Lucide React

https://lucide.dev/

## shadcn/ui

https://ui.shadcn.com/

## Radix UI

https://www.radix-ui.com/

---

# Next Document

**12-security-and-privacy.md**

This document defines security practices, encryption strategy, authentication security, API protection, privacy rules, sensitive data handling, and compliance guidelines for ApplyViaEmailAI.
