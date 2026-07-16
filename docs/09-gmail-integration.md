# 09 - Gmail Integration

> **Project:** ApplyViaEmailAI
> **Version:** 1.0
> **Email Provider:** Gmail API
> **Purpose:** Define Gmail authentication, account connection, draft creation, email sending, and attachment handling.

---

# Overview

ApplyViaEmailAI uses the **Gmail API** to allow users to create email drafts and send job application emails directly from the application.

Each user connects **their own Gmail account**.

The application never sends emails from a shared account.

---

# Goals

The Gmail integration should:

* Connect a Gmail account.
* Create email drafts.
* Send emails.
* Attach the selected resume.
* Keep users in control.
* Require minimal setup.

---

# Gmail Workflow

```text id="8e6nha"
User

â†“

Connect Gmail

â†“

Google Consent

â†“

Authorization Granted

â†“

Save Credentials

â†“

Ready
```

After connecting Gmail, users can create drafts or send emails.

---

# Gmail Authorization

Gmail authorization is separate from application authentication.

A user can:

* Login with Google
* Login with Email & Password

Regardless of the login method, Gmail must be connected separately before emails can be sent.

---

# Connection Flow

```text id="1dhg9y"
Settings

â†“

Connect Gmail

â†“

Google OAuth Consent

â†“

Grant Permissions

â†“

Save Credentials

â†“

Connected
```

---

# Required Permissions

The application should request only the minimum required Gmail scopes.

Version 1 requires permission to:

* Create drafts
* Send emails

No additional Gmail data should be accessed.

---

# Gmail Status

The Settings page should display:

* Connected
* Not Connected
* Connection Error

Users should also have options to:

* Connect
* Disconnect
* Reconnect

---

# Email Workflow

```text id="imj2ls"
Generate Email

â†“

Review

â†“

Edit

â†“

Select Resume

â†“

Create Draft

â†“

(Optional)

Send Email
```

The email is always editable before sending.

---

# Draft Creation

When the user clicks **Create Draft**, the backend should:

1. Validate the request.
2. Retrieve Gmail credentials.
3. Build the email.
4. Attach the selected resume.
5. Create a Gmail draft.
6. Return success.

The application should also update analytics after a successful draft.

---

# Send Email

When the user clicks **Send Email**, the backend should:

1. Validate the request.
2. Build the email.
3. Attach the selected resume.
4. Send through Gmail API.
5. Update application status.
6. Update analytics.

---

# Email Fields

The frontend sends the following values:

* Recipient Email
* Subject
* Email Body
* Selected Resume

The backend generates the Gmail message from these values.

---

# Resume Attachment

The selected resume should automatically be attached to:

* Drafts
* Sent emails

Only one resume can be attached.

---

# Attachment Rules

Supported:

* PDF

Maximum:

* One attachment

The backend retrieves the PDF from Cloudflare R2 before creating the Gmail message.

---

# Missing Recipient Email

If AI cannot find an email address:

* Leave the field empty.
* Display an editable input.
* Require the user to enter an email before creating a draft or sending.

---

# Validation

Before creating a draft or sending an email, validate:

* Gmail connection
* Recipient email
* Subject
* Email body
* Selected resume

Requests with invalid or missing required fields should be rejected.

---

# Gmail Credentials

The application should securely store the Gmail authorization required for API access.

Credentials should:

* Be stored securely.
* Be associated with the authenticated user.
* Never be exposed to the frontend.
* Be removable by the user.

---

# Disconnect Gmail

Users should be able to disconnect Gmail at any time.

Disconnecting Gmail should:

* Remove stored authorization.
* Prevent new drafts.
* Prevent sending emails.

Existing application data should remain unchanged.

---

# Reconnect Gmail

Users should be able to reconnect if:

* Authorization expires.
* Permissions are revoked.
* Another Gmail account is preferred.

---

# Error Handling

Possible Gmail errors include:

* Gmail not connected
* Authorization expired
* Invalid recipient
* Attachment missing
* Gmail API failure
* Rate limit exceeded
* Network failure

Display clear and actionable messages to the user.

---

# Analytics

After successful actions:

## Draft

Increment:

* Drafts Created

---

## Send

Increment:

* Emails Sent

No email content should be stored.

---

# Privacy Rules

Do not store:

* Email body
* Draft content
* Attachments
* Recipient messages

Only store metadata such as:

* Company
* Job title
* Recipient email
* Status
* Timestamp

---

# Security Guidelines

The backend must:

* Validate every request.
* Verify authenticated user.
* Verify Gmail connection.
* Never expose Gmail credentials.
* Never expose authorization tokens.
* Never allow access to another user's Gmail account.

---

# User Experience

Users should always know:

* Whether Gmail is connected.
* Whether a draft was created.
* Whether an email was sent.
* Whether an action failed.

Buttons should display loading states while requests are in progress.

---

# Business Rules

* Gmail is the only supported email provider.
* Gmail connection is optional until the user wants to send emails.
* A resume must be selected before creating a draft or sending.
* Recipient email is required.
* Email fields remain editable before submission.

---

# Future Enhancements (Out of Scope)

Potential additions:

* Outlook support
* SMTP support
* Multiple Gmail accounts
* Scheduled emails
* CC and BCC
* Multiple attachments
* Email templates

These features are intentionally excluded from Version 1.

---

# Acceptance Criteria

The Gmail integration is complete when:

* Users can connect Gmail.
* Users can disconnect Gmail.
* Users can reconnect Gmail.
* Drafts can be created successfully.
* Emails can be sent successfully.
* The selected resume is attached.
* Analytics are updated.
* Metadata is stored.
* Email content is never persisted.

---

# References

## Gmail API

https://developers.google.com/gmail/api

## Gmail API Guides

https://developers.google.com/workspace/gmail/api/guides

## Google OAuth

https://developers.google.com/identity

## Google API Console

https://console.cloud.google.com/

---

# Next Document

**10-api-design.md**

This document defines the REST API structure, endpoint organization, request and response formats, authentication requirements, validation strategy, and API conventions for ApplyViaEmailAI.
