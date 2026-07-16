/**
 * Encryption service using Web Crypto API (AES-GCM 256)
 */

async function getKey(secretText: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const rawKey = enc.encode(secretText);
  
  // Hash the secret to get a consistent 256-bit key
  const hashedKey = await crypto.subtle.digest("SHA-256", rawKey);
  
  return crypto.subtle.importKey(
    "raw",
    hashedKey,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(text: string, secretText: string): Promise<string> {
  if (!text) return "";
  const key = await getKey(secretText);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedText = new TextEncoder().encode(text);
  
  const ciphertextBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    encodedText
  );
  
  const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, "0")).join("");
  const ciphertextHex = Array.from(new Uint8Array(ciphertextBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
  
  return `${ivHex}:${ciphertextHex}`;
}

export async function decrypt(encryptedText: string, secretText: string): Promise<string> {
  if (!encryptedText) return "";
  const parts = encryptedText.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid encrypted text format");
  }
  
  const [ivHex, ciphertextHex] = parts;
  const key = await getKey(secretText);
  
  // Convert hex back to bytes
  const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const ciphertext = new Uint8Array(ciphertextHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    ciphertext
  );
  
  return new TextDecoder().decode(decryptedBuffer);
}
