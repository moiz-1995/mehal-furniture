import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * One owner, one password. Set ADMIN_PASSWORD in .env.local; without it the
 * dev fallback below is used and the admin screen shows a warning.
 */
export const DEV_PASSWORD = "mehal-admin";
const COOKIE = "mehal_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || DEV_PASSWORD;
}

export function usingDevPassword() {
  return !process.env.ADMIN_PASSWORD;
}

function token() {
  return crypto.createHmac("sha256", adminPassword()).update("mehal-owner").digest("hex");
}

export function passwordMatches(input: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(adminPassword());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function signIn() {
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function signOut() {
  (await cookies()).delete(COOKIE);
}

export async function isOwner() {
  const v = (await cookies()).get(COOKIE)?.value;
  if (!v) return false;
  const a = Buffer.from(v);
  const b = Buffer.from(token());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
