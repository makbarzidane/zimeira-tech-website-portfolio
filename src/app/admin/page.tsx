import type { Metadata } from "next";
import { ContentManager } from "@/components/admin/ContentManager";
import { requireAdminSession } from "@/lib/admin-auth";
import { readCmsContent } from "@/lib/cms";
import { getAdminStorageNotice } from "@/lib/storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Konten | ZIMEIRA TECH",
  description: "Kelola konten company profile ZIMEIRA TECH.",
};

export default async function AdminPage() {
  await requireAdminSession();

  const content = await readCmsContent();
  const deploymentNotice = getAdminStorageNotice();

  return (
    <ContentManager
      deploymentNotice={deploymentNotice}
      initialContent={content}
    />
  );
}
