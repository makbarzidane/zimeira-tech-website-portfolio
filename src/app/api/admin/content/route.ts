import { NextResponse } from "next/server";
import { hasAdminSession, isValidAdminPasscode } from "@/lib/admin-auth";
import { readCmsContent, writeCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

async function isAuthorized(request: Request) {
  const headerPasscode = request.headers.get("x-admin-passcode") ?? "";

  return isValidAdminPasscode(headerPasscode) || (await hasAdminSession());
}

export async function GET() {
  const content = await readCmsContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json(
      {
        message: "Anda harus login sebagai admin untuk menyimpan konten.",
      },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const content = await writeCmsContent(body);

    return NextResponse.json({
      content,
      message: "Konten berhasil disimpan.",
    });
  } catch {
    return NextResponse.json(
      { message: "Konten gagal disimpan. Periksa format data." },
      { status: 400 },
    );
  }
}
