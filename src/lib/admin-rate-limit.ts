import { headers } from "next/headers";

type LoginAttempt = {
  count: number;
  resetAt: number;
};

const loginAttempts = new Map<string, LoginAttempt>();
const loginWindowMs = 10 * 60 * 1000;
const maxLoginAttempts = 5;

function getAttempt(identifier: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(identifier);

  if (!attempt || attempt.resetAt <= now) {
    return { count: 0, resetAt: now + loginWindowMs };
  }

  return attempt;
}

export async function getAdminLoginIdentifier() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    forwardedIp ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") ||
    headersList.get("user-agent") ||
    "local-admin"
  );
}

export function getAdminLoginRateLimit(identifier: string) {
  const attempt = getAttempt(identifier);
  const retryAfterSeconds = Math.max(
    0,
    Math.ceil((attempt.resetAt - Date.now()) / 1000),
  );

  return {
    isLimited: attempt.count >= maxLoginAttempts,
    retryAfterSeconds,
  };
}

export function recordFailedAdminLogin(identifier: string) {
  const attempt = getAttempt(identifier);

  loginAttempts.set(identifier, {
    count: attempt.count + 1,
    resetAt: attempt.resetAt,
  });
}

export function clearAdminLoginAttempts(identifier: string) {
  loginAttempts.delete(identifier);
}
