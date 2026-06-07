import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { hasAdminSession, isValidAdminPasscode } from "@/lib/admin-auth";
import { isBlobStorageConfigured } from "@/lib/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const uploadDirectory = join(process.cwd(), "public", "uploads", "brand");
const mimeExtensionAliases: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
  "image/tiff": "tiff",
};
const fallbackImageExtensions = new Set([
  "avif",
  "bmp",
  "gif",
  "heic",
  "heif",
  "ico",
  "jpeg",
  "jpg",
  "png",
  "svg",
  "tif",
  "tiff",
  "webp",
]);

async function isAuthorized(request: Request) {
  const headerPasscode = request.headers.get("x-admin-passcode") ?? "";

  return isValidAdminPasscode(headerPasscode) || (await hasAdminSession());
}

function createSafeFilename(originalName: string, extension: string) {
  const baseName =
    originalName
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "logo";

  return `${baseName}-${randomUUID()}.${extension}`;
}

function getOriginalExtension(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";

  return extension.replace(/[^a-z0-9]/g, "");
}

function getImageExtension(file: File) {
  if (file.type.startsWith("image/")) {
    const mimeExtension =
      mimeExtensionAliases[file.type] ??
      file.type.replace("image/", "").replace("+xml", "");

    return mimeExtension.replace(/[^a-z0-9]/g, "") || "img";
  }

  const extension = getOriginalExtension(file.name);

  return fallbackImageExtensions.has(extension) ? extension : "";
}

async function saveBrandImage(file: File, filename: string, buffer: Buffer) {
  if (isBlobStorageConfigured()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`brand/${filename}`, buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      cacheControlMaxAge: 31536000,
      contentType: file.type || undefined,
    });

    return blob.url;
  }

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(join(uploadDirectory, filename), buffer);

  return `/uploads/brand/${filename}`;
}

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json(
      { message: "Anda harus login sebagai admin untuk upload logo." },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { message: "File logo belum dipilih." },
        { status: 400 },
      );
    }

    const extension = getImageExtension(file);

    if (!file.type.startsWith("image/") && !extension) {
      return NextResponse.json(
        {
          message:
            "File belum terbaca sebagai gambar. Pilih file logo seperti SVG, JPG, PNG, WebP, AVIF, dan format gambar lain.",
        },
        { status: 400 },
      );
    }

    const filename = createSafeFilename(file.name, extension);
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await saveBrandImage(file, filename, buffer);

    return NextResponse.json({
      url,
      message: "Logo website berhasil diupload.",
    });
  } catch {
    return NextResponse.json(
      { message: "Logo gagal diupload. Coba pilih file lain." },
      { status: 400 },
    );
  }
}
