"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  isValidAdminCredentials,
  setAdminSessionCookie,
} from "@/lib/admin-auth";
import {
  clearAdminLoginAttempts,
  getAdminLoginIdentifier,
  getAdminLoginRateLimit,
  recordFailedAdminLogin,
} from "@/lib/admin-rate-limit";

export type LoginState = {
  message: string;
};

export async function loginAdmin(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const passcode = String(formData.get("passcode") ?? "");
  const identifier = await getAdminLoginIdentifier();
  const rateLimit = getAdminLoginRateLimit(identifier);

  if (rateLimit.isLimited) {
    return {
      message: `Terlalu banyak percobaan login. Coba lagi sekitar ${rateLimit.retryAfterSeconds} detik lagi.`,
    };
  }

  if (!isValidAdminCredentials(username, passcode)) {
    recordFailedAdminLogin(identifier);

    return {
      message:
        "ID admin atau password tidak sesuai. Periksa kembali data login Anda.",
    };
  }

  clearAdminLoginAttempts(identifier);
  await setAdminSessionCookie();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
