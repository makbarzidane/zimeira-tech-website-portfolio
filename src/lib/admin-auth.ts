import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adminSessionCookie = "zimeira_admin_session";
const sessionMaxAge = 60 * 60 * 8;

function getAuthSecret() {
  if (process.env.CMS_AUTH_SECRET) {
    return process.env.CMS_AUTH_SECRET;
  }

  if (process.env.CMS_ADMIN_PASSCODE) {
    return process.env.CMS_ADMIN_PASSCODE;
  }

  return process.env.NODE_ENV === "production" ? "" : "zimeira-dev-secret";
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(value: string) {
  const secret = getAuthSecret();

  if (!secret) {
    return "";
  }

  return createHmac("sha256", secret).update(value).digest("base64url");
}

function createSessionValue() {
  const expiresAt = Date.now() + sessionMaxAge * 1000;
  const payload = String(expiresAt);
  const signature = sign(payload);

  return `${payload}.${signature}`;
}

export function getCmsAdminPasscode() {
  if (process.env.CMS_ADMIN_PASSCODE) {
    return process.env.CMS_ADMIN_PASSCODE;
  }

  return process.env.NODE_ENV === "production" ? "" : "zimeira-admin";
}

export function getCmsAdminUsername() {
  if (process.env.CMS_ADMIN_USERNAME) {
    return process.env.CMS_ADMIN_USERNAME;
  }

  return process.env.NODE_ENV === "production" ? "" : "admin";
}

export function isValidAdminPasscode(passcode: string) {
  const expectedPasscode = getCmsAdminPasscode();

  if (!expectedPasscode || !passcode) {
    return false;
  }

  return safeCompare(passcode, expectedPasscode);
}

export function isValidAdminCredentials(username: string, passcode: string) {
  const expectedUsername = getCmsAdminUsername();

  if (!expectedUsername || !username) {
    return false;
  }

  return (
    safeCompare(username.trim(), expectedUsername) &&
    isValidAdminPasscode(passcode)
  );
}

export function isValidAdminSession(value: string | undefined) {
  if (!value) {
    return false;
  }

  const [expiresAt, signature] = value.split(".");
  const expiresAtNumber = Number(expiresAt);

  if (!expiresAt || !signature || Number.isNaN(expiresAtNumber)) {
    return false;
  }

  if (expiresAtNumber < Date.now()) {
    return false;
  }

  return safeCompare(signature, sign(expiresAt));
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(adminSessionCookie)?.value);
}

export async function setAdminSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.set(adminSessionCookie, createSessionValue(), {
    httpOnly: true,
    maxAge: sessionMaxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookie);
}

export async function requireAdminSession() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }
}
