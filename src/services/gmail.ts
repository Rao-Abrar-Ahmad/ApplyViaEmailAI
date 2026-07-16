export interface GmailTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number; // timestamp in ms
}

export function getGoogleAuthUrl(env: { GOOGLE_CLIENT_ID: string; APP_URL: string }): string {
  const redirectUri = `${env.APP_URL}/api/email/callback`;
  const scopes = [
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send"
  ];
  
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline",
    prompt: "consent"
  });
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForTokens(
  code: string,
  env: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string; APP_URL: string }
): Promise<GmailTokens> {
  const redirectUri = `${env.APP_URL}/api/email/callback`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    })
  });
  
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google token exchange failed: ${errText}`);
  }
  
  const data: any = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + (data.expires_in * 1000)
  };
}

export async function refreshGmailAccessToken(
  refreshToken: string,
  env: { GOOGLE_CLIENT_ID: string; GOOGLE_CLIENT_SECRET: string }
): Promise<GmailTokens> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token"
    })
  });
  
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google token refresh failed: ${errText}`);
  }
  
  const data: any = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || refreshToken, // Google might not return a new refresh token if it is still valid
    expiresAt: Date.now() + (data.expires_in * 1000)
  };
}

// Convert ArrayBuffer to Base64 (safe for Cloudflare Worker runtime)
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}


// Construct RFC 2822 email message with optional PDF attachment
function buildMimeMessage(params: {
  to: string;
  subject: string;
  body: string;
  attachment?: {
    name: string;
    buffer: ArrayBuffer;
  };
}): string {
  const boundary = "boundary_applyviaemail_ai_v1";
  
  // Encode subject line in UTF-8
  const base64Subject = btoa(unescape(encodeURIComponent(params.subject)));
  const encodedSubject = `=?utf-8?B?${base64Subject}?=`;
  
  const headers = [
    `To: ${params.to}`,
    `Subject: ${encodedSubject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    params.body,
    ""
  ];
  
  if (params.attachment) {
    const base64File = arrayBufferToBase64(params.attachment.buffer);
    // Break base64 content into lines of 76 characters (MIME standard compliance)
    const formattedBase64File = base64File.match(/.{1,76}/g)?.join("\r\n") || base64File;
    
    headers.push(
      `--${boundary}`,
      `Content-Type: application/pdf; name="${params.attachment.name}"`,
      `Content-Disposition: attachment; filename="${params.attachment.name}"`,
      "Content-Transfer-Encoding: base64",
      "",
      formattedBase64File,
      ""
    );
  }
  
  headers.push(`--${boundary}--`);
  
  // Base64url encode the final RFC 2822 raw text message
  const rawMime = headers.join("\r\n");
  
  // Convert full binary string to base64url directly to handle arbitrary characters
  const binaryString = unescape(encodeURIComponent(rawMime));
  return btoa(binaryString)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

interface SendEmailParams {
  accessToken: string;
  to: string;
  subject: string;
  body: string;
  attachment?: {
    name: string;
    buffer: ArrayBuffer;
  };
}

export async function createGmailDraft(params: SendEmailParams): Promise<{ id: string }> {
  const rawMessage = buildMimeMessage(params);
  
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/drafts", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${params.accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: {
        raw: rawMessage
      }
    })
  });
  
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gmail API Draft creation failed: ${errText}`);
  }
  
  const data: any = await response.json();
  return { id: data.id };
}

export async function sendGmailEmail(params: SendEmailParams): Promise<{ id: string }> {
  const rawMessage = buildMimeMessage(params);
  
  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${params.accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      raw: rawMessage
    })
  });
  
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gmail API Send failed: ${errText}`);
  }
  
  const data: any = await response.json();
  return { id: data.id };
}
