import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { buildEmailSystemPrompt } from "./prompts";
import { Env } from "../types";

export const emailGenerationSchema = z.object({
  company: z.string().default("Unknown"),
  jobTitle: z.string().default("Unknown"),
  email: z.string().email().or(z.literal("")),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export type GeneratedEmail = z.infer<typeof emailGenerationSchema>;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface GenerateParams {
  ai: Env["AI"];
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

const MODEL = "@cf/openai/gpt-oss-120b";

export async function generateEmailWithAI({
  ai,
  profile,
  resumeText = "",
  messages,
}: GenerateParams): Promise<GeneratedEmail> {
  const context = `Applicant Profile

Name: ${profile.name}
Headline: ${profile.headline ?? ""}
Experience: ${profile.experience ?? 0} years
Location: ${profile.location ?? ""}
Skills: ${profile.skills ?? ""}
Achievements: ${profile.achievements ?? ""}
Portfolio: ${profile.portfolio ?? ""}
GitHub: ${profile.github ?? ""}
LinkedIn: ${profile.linkedin ?? ""}

Resume

${resumeText || "No resume uploaded."}`;

  const chatMessages = [
    {
      role: "system" as const,
      content: buildEmailSystemPrompt(profile.customPrompt),
    },
    {
      role: "system" as const,
      content: context,
    },
    ...messages,
  ];

  const response: any = await ai.run(MODEL, {
    messages: chatMessages,
    temperature: 0.3,

    response_format: {
      type: "json_schema",

      json_schema: {
        name: "generated_email",

        schema: zodToJsonSchema(emailGenerationSchema as any),
      },
    },
  });

  const result =
    response?.response ??
    response?.result?.response ??
    response?.output ??
    response;

  return emailGenerationSchema.parse(result);
}
