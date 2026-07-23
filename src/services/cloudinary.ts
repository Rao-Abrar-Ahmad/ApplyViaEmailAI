import type { Env } from "../types";

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createSignature(
  params: Record<string, string>,
  apiSecret: string,
) {
  const sortedKeys = Object.keys(params).sort();
  const payload =
    sortedKeys.map((key) => `${key}=${params[key]}`).join("&") + apiSecret;
  const digest = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(payload),
  );
  return bufferToHex(digest);
}

export async function uploadResumeToCloudinary(
  file: File,
  publicId: string,
  env: Env,
): Promise<{ publicId: string; secureUrl: string; bytes: number }> {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await createSignature(
    {
      public_id: publicId,
      timestamp: timestamp.toString(),
    },
    env.CLOUDINARY_API_SECRET,
  );

  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("api_key", env.CLOUDINARY_API_KEY);
  formData.append("public_id", publicId);
  formData.append("resource_type", "raw");
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const data = (await response.json()) as {
    public_id: string;
    secure_url: string;
    bytes: number;
  };
  return {
    publicId: data.public_id,
    secureUrl: data.secure_url,
    bytes: data.bytes,
  };
}

export async function deleteCloudinaryResume(publicId: string, env: Env) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = await createSignature(
    {
      public_id: publicId,
      timestamp: timestamp.toString(),
    },
    env.CLOUDINARY_API_SECRET,
  );

  const body = new URLSearchParams({
    api_key: env.CLOUDINARY_API_KEY,
    public_id: publicId,
    resource_type: "raw",
    timestamp: timestamp.toString(),
    signature,
  });

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/raw/destroy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary delete failed: ${errorText}`);
  }
}

export function buildCloudinaryResumeUrl(
  publicId: string,
  env: Env,
  format = "pdf",
) {
  return `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/raw/upload/${publicId}.${format}`;
}
