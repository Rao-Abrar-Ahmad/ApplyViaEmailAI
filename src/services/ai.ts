import { z } from "zod";

// Whitelisted models
export const SUPPORTED_MODELS = [
  "google/gemini-2.5-flash",
  "anthropic/claude-3-5-sonnet",
  "openai/gpt-4o-mini",
  "deepseek/deepseek-chat"
] as const;

export type SupportedModel = typeof SUPPORTED_MODELS[number];

// Schema for structured output
export const emailGenerationSchema = z.object({
  company: z.string().default("Unknown"),
  jobTitle: z.string().default("Unknown"),
  email: z.string().email().or(z.literal("")),
  subject: z.string().min(1, "Subject cannot be empty"),
  body: z.string().min(1, "Body cannot be empty")
});

export type GeneratedEmail = z.infer<typeof emailGenerationSchema>;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface GenerateParams {
  apiKey: string;
  model: string;
  profile: {
    name: string;
    headline?: string;
    experience?: number;
    location?: string;
    skills?: string;
    achievements?: string;
    portfolio?: string;
    github?: string;
    linkedin?: string;
    customPrompt?: string;
  };
  resumeText?: string;
  messages: ChatMessage[];
}

export async function generateEmailWithAI({
  apiKey,
  model,
  profile,
  resumeText = "",
  messages
}: GenerateParams): Promise<GeneratedEmail> {
  const modelToUse = SUPPORTED_MODELS.includes(model as SupportedModel)
    ? model
    : "google/gemini-2.5-flash";

  // Build System Prompt
  let systemPrompt = `You are a professional AI job application assistant. Your goal is to write a highly professional, concise, and custom job application email on behalf of the user.
You must respond ONLY with a raw JSON object. Do not include markdown code block formatting (e.g. do NOT wrap with \`\`\`json ... \`\`\`).
The JSON object must contain the following keys exactly:
{
  "company": "Detected company name or 'Unknown'",
  "jobTitle": "Detected job title or 'Unknown'",
  "email": "Detected contact email/recruitment email in the job description, or empty string if not found",
  "subject": "Professional email subject line (e.g. 'Job Application: [Job Title] - [User Name]')",
  "body": "The complete professional, friendly, and tailored email body. Tailor it to the job description using details from the user's resume/profile. Do not use placeholders like '[Company]' or '[My Name]' - fill them in. End with a professional closing signature using the user's name."
}

Rules:
1. Never fabricate or invent achievements, skills, or experience not present in the user profile or resume text.
2. Highlight the user's matching skills for the job description.
3. Keep the tone professional, friendly, and confident.
4. Do not use emojis or informal text.
5. If some information is unknown, return "Unknown" for company/jobTitle, and an empty string "" for email.`;

  if (profile.customPrompt) {
    systemPrompt += `\n\nCustom User Instructions:\n${profile.customPrompt}`;
  }

  // Build context info to help the AI
  const contextMessage = `User Profile:
Name: ${profile.name}
${profile.headline ? `Headline: ${profile.headline}` : ""}
${profile.experience ? `Experience: ${profile.experience} years` : ""}
${profile.location ? `Location: ${profile.location}` : ""}
${profile.skills ? `Skills: ${profile.skills}` : ""}
${profile.achievements ? `Achievements: ${profile.achievements}` : ""}
${profile.portfolio ? `Portfolio: ${profile.portfolio}` : ""}
${profile.github ? `GitHub: ${profile.github}` : ""}
${profile.linkedin ? `LinkedIn: ${profile.linkedin}` : ""}

Resume Text:
${resumeText || "No resume uploaded."}`;

  // Build message chain for completion endpoint
  const openRouterMessages = [
    { role: "system", content: systemPrompt },
    { role: "system", content: `Here is the applicant's resume and profile context:\n\n${contextMessage}` },
    ...messages.map(msg => ({ role: msg.role, content: msg.content }))
  ];

  let lastError: Error | null = null;
  const attempts = 3;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://applyviaemail.ai",
          "X-Title": "ApplyViaEmailAI"
        },
        body: JSON.stringify({
          model: modelToUse,
          messages: openRouterMessages,
          response_format: { type: "json_object" },
          temperature: 0.3
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
      }

      const json: any = await response.json();
      const content = json?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response content from OpenRouter");
      }

      // Parse JSON
      let parsed: any;
      try {
        parsed = JSON.parse(content.trim());
      } catch {
        // Strip markdown backticks if any model returned them anyway
        const stripped = content.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        parsed = JSON.parse(stripped);
      }

      // Validate schema
      const validated = emailGenerationSchema.parse(parsed);
      return validated;

    } catch (err: any) {
      lastError = err;
      console.warn(`AI generation attempt ${attempt} failed: ${err.message}`);
      // Fallback: modify system prompt on retry to reinforce JSON formatting
      if (attempt < attempts) {
        openRouterMessages.push({
          role: "system",
          content: "ERROR: The previous response did not match the required JSON schema. You MUST output ONLY valid JSON matching the schema, with no markdown tags or trailing text."
        });
      }
    }
  }

  throw new Error(`Failed to generate email after ${attempts} attempts. Last error: ${lastError?.message}`);
}

