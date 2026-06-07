import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { readCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json(
      { message: "Anda harus login sebagai admin untuk download backup." },
      { status: 401 },
    );
  }

  const content = await readCmsContent();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `zimeira-tech-cms-backup-${timestamp}.json`;

  return new Response(`${JSON.stringify(content, null, 2)}\n`, {
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
