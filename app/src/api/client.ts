import { createAuthClient } from "better-auth/react";

export type ApiEnvelope<T> = { success: boolean; data: T; message?: string };
export type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};
export type Resume = {
  id: string;
  name: string;
  fileSize: number;
  active: number;
  r2Key: string;
  uploadedAt: number;
};
export type GeneratedEmail = {
  company: string;
  jobTitle: string;
  email: string;
  subject: string;
  body: string;
};

export const authClient = createAuthClient();

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${path}`, {
    credentials: "include",
    headers: {
      ...(init.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...init.headers,
    },
    ...init,
  });
  const payload = (await response.json().catch(() => ({
    success: false,
    message: "The server returned an invalid response.",
  }))) as ApiEnvelope<T>;
  if (!response.ok || !payload.success)
    throw new Error(
      payload.message || "Something went wrong. Please try again.",
    );
  return payload.data;
}

export const api = {
  signIn: async (email: string, password: string) => {
    const res = await authClient.signIn.email({ email, password });
    if (res.error) {
      throw new Error(res.error.message || "Unable to log in.");
    }
    return res.data;
  },
  signUp: async (name: string, email: string, password: string) => {
    const res = await authClient.signUp.email({ name, email, password });
    if (res.error) {
      throw new Error(res.error.message || "Unable to create your account.");
    }
    return res.data;
  },
  signOut: async () => {
    const res = await authClient.signOut();
    if (res.error) {
      throw new Error(res.error.message || "Unable to sign out.");
    }
    return res.data;
  },
  user: () => request<User>("/user/me"),
  resumes: () => request<Resume[]>("/resumes"),
  selectResume: (id: string) =>
    request<unknown>(`/resumes/${id}/select`, { method: "PATCH" }),
  deleteResume: (id: string) =>
    request<unknown>(`/resumes/${id}`, { method: "DELETE" }),
  generate: (messages: { role: "user" | "assistant"; content: string }[]) =>
    request<GeneratedEmail>("/chat/generate", {
      method: "POST",
      body: JSON.stringify({ messages }),
    }),
  uploadResume: async (file: File, extractedText: string) => {
    const form = new FormData();

    form.append("file", file);
    form.append("extractedText", extractedText);

    return request<Resume>("/resumes/upload", {
      method: "POST",
      body: form,
    });
  },
};
