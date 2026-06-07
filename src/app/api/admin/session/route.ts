import { NextResponse } from "next/server";
import { clearAdminSessionCookie, hasAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ authenticated: await hasAdminSession() });
}

export async function DELETE() {
  await clearAdminSessionCookie();
  return NextResponse.json({ message: "Logout berhasil." });
}
