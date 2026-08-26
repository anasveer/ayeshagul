import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "ag_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export async function createSession(
  userId: string,
  remember: boolean
): Promise<void> {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${userId}.${expiresAt}`;
  const token = `${payload}.${sign(payload)}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(remember ? { maxAge: SESSION_MAX_AGE } : {}),
  });
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [userId, expiresAt, signature] = parts;
  const expected = sign(`${userId}.${expiresAt}`);

  const provided = Buffer.from(signature, "hex");
  const trusted = Buffer.from(expected, "hex");
  if (provided.length !== trusted.length || !timingSafeEqual(provided, trusted)) {
    return null;
  }

  if (Date.now() > Number(expiresAt)) return null;

  return userId;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
