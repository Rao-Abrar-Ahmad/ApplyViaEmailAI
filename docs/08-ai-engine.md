# 08 - AI Engine

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **AI Provider:** OpenRouter
> **Purpose:** Define the AI architecture, prompt workflow, supported models, structured outputs, and validation rules.

---

# Overview

The AI Engine is the core feature of ApplyViaEmailAI.

Its responsibility is to analyze a job description together with the user's profile and selected resume, then generate a professional job application email.

The AI Engine always returns **structured JSON**, never plain text.

All AI communication goes through the backend Worker.

---

# Goals

The AI Engine should:

* Generate professional emails.
* Understand job descriptions.
* Use resume context.
* Use user profile information.
* Produce deterministic structured output.
* Support multiple AI models.
* Validate every response.
* Retry invalid responses automatically.

---

# AI Provider

Version 1 supports only:

**OpenRouter**

Users must provide their own OpenRouter API key.

Benefits:

* No AI costs for the project.
* User controls model usage.
* Easy model upgrades.
* OpenAI-compatible API.

---

# Supported Models

Only approved models should be available.

## Default

* Gemini 2.5 Flash

## Additional Models

* Claude Sonnet
* GPT-4.1 Mini
* DeepSeek V3

Users cannot manually enter arbitrary model names.

Future models can be added through configuration.

---

# AI Responsibilities

The AI is responsible for:

* Reading the job description.
* Identifying the company.
* Identifying the role.
* Finding the recruitment email.
* Writing a professional email.
* Creating a subject line.

The AI is **not** responsible for:

* Selecting the resume.
* Sending emails.
* Managing Gmail.
* Accessing databases.

---

# AI Context

Every AI request should include the following information.

## User Profile

Includes:

* Name
* Headline
* Experience
* Skills
* Portfolio
* GitHub
* LinkedIn
* Achievements
* Location

---

## Resume Context

The selected resume provides:

* Parsed resume text
* Resume name

Only one resume is used per request.

---

## Conversation Context

Includes only the current session.

Conversation is cleared when the page refreshes.

No chat history is stored.

---

## Job Description

User-pasted job description.

The backend should not permanently store it.

---

## Custom Instructions

If the user has provided custom AI instructions, they are appended to the system prompt.

Example:

* Keep emails concise.
* Mention React experience first.
* Avoid mentioning salary.

---

# Prompt Architecture

The backend builds the final prompt using multiple sections.

```text
System Prompt

â†“

Application Rules

â†“

User Profile

â†“

Resume Context

â†“

Conversation

â†“

Job Description

â†“

Latest User Message
```

The prompt should be assembled on the backend.

The frontend should never construct prompts.

---

# Structured Output

The AI must always return structured JSON.

Required fields:

* company
* jobTitle
* email
* subject
* body

No additional fields are required for Version 1.

---

# Output Requirements

The generated email should:

* Be professional.
* Be concise.
* Match the job description.
* Highlight relevant experience.
* Avoid unnecessary repetition.
* End with a professional closing.

---

# Email Tone

Always:

* Professional
* Friendly
* Confident
* Respectful

Avoid:

* Informal language
* Emojis
* Generic templates
* Overly long paragraphs

---

# Company Detection

The AI should identify the company name from the job description.

If unavailable:

Return:

"Unknown"

Users can edit it manually.

---

# Job Title Detection

The AI should identify the advertised role.

Examples:

* Frontend Developer
* Shopify Developer
* Full Stack Engineer

If unavailable:

Return:

"Unknown"

---

# Email Detection

The AI should extract the recruitment email.

If no email is found:

Return an empty value.

The frontend will display an editable email field.

---

# Resume Usage

The AI receives the selected resume text.

It should:

* Highlight relevant experience.
* Mention matching technologies.
* Reference appropriate achievements.

The AI should never invent experience.

---

# Hallucination Prevention

The prompt should instruct the model to:

* Never invent company names.
* Never invent technologies.
* Never invent experience.
* Never fabricate certifications.
* Never assume missing information.

Unknown values should remain empty or use "Unknown".

---

# Validation

Every AI response must be validated.

Validation includes:

* Valid JSON
* Required fields
* Correct data types
* Non-empty email body

Invalid responses must never reach the UI.

---

# Retry Strategy

If validation fails:

```text
Generate Response

â†“

Validate

â†“

Invalid?

â†“

Retry

â†“

Still Invalid?

â†“

Retry Again

â†“

Return Error
```

Maximum retries:

2

---

# AI Errors

Possible failures:

* Invalid JSON
* Timeout
* Rate limit
* Missing required fields
* Unsupported model
* Network failure

Users should receive friendly error messages.

---

# Model Selection

Users may choose from the supported model list in Settings.

If no preference exists:

Use the default model.

The backend validates the selected model before sending requests.

---

# API Key Management

Users provide their own OpenRouter API key.

Requirements:

* Encrypt before storage.
* Never return the plaintext key.
* Decrypt only when sending AI requests.
* Allow users to replace or remove their key.

---

# AI Conversation

Conversation exists only during the active browser session.

The backend should not persist:

* User prompts
* AI replies
* Conversation history

Refreshing the page starts a new conversation.

---

# Privacy Rules

Never store:

* Job descriptions
* AI prompts
* AI responses
* Conversation history

Only metadata required for analytics should be stored.

---

# AI Workflow

```text
User Message

â†“

Backend

â†“

Build Prompt

â†“

OpenRouter

â†“

Structured JSON

â†“

Validate

â†“

Return to Frontend

â†“

Populate Email Preview
```

---

# Resume Selection

The frontend determines which resume is active.

The backend includes only that resume in the prompt.

The AI does not choose between multiple resumes.

---

# Business Rules

* Only OpenRouter is supported.
* Users provide their own API key.
* Structured output is mandatory.
* Only approved models are available.
* One active resume per request.
* Session-only conversation.
* Professional email tone.

---

# Future Enhancements (Out of Scope)

Potential additions:

* Cover letter generation
* Resume suggestions
* Resume scoring
* AI feedback
* Multi-language support
* Additional AI providers
* Streaming responses
* Prompt templates

These features are intentionally excluded from Version 1.

---

# Acceptance Criteria

The AI Engine is complete when:

* Users can connect an OpenRouter API key.
* Users can select a supported model.
* The backend constructs prompts.
* AI returns structured JSON.
* Responses are validated.
* Invalid responses are retried.
* The generated email populates the preview form.
* No AI conversations are stored.
* Job descriptions are never persisted.

---

# References

## OpenRouter

https://openrouter.ai/docs

## OpenRouter Structured Outputs

https://openrouter.ai/docs/features/structured-outputs

## OpenRouter Models

https://openrouter.ai/models

## JSON Schema

https://json-schema.org/

## Zod

https://zod.dev/

---

# Next Document

**09-gmail-integration.md**

This document defines Gmail OAuth, Gmail API integration, draft creation, email sending, attachment handling, authorization flow, and Gmail account management for ApplyViaEmailAI.
