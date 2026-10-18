import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "addis-eats-session";
const secret = () => process.env.SESSION_SECRET || "development-only-change-this-secret";
const sign = (value) => createHmac("sha256", secret()).update(value).digest("hex");

export function makeSessionToken(userId) {
  const payload = Buffer.from(JSON.stringify({ userId, exp: Date.now() + 1000 * 60 * 60 * 8 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  const expected = sign(payload);
  try {
    if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (!data.userId || data.exp < Date.now()) return null;
    return { id: data.userId };
  } catch { return null; }
}

export async function getSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  return verifyToken(token);
}

export async function setSession(userId) {
  const secure = process.env.NODE_ENV === "production";
  (await cookies()).set(COOKIE, makeSessionToken(userId), { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}
