export type CmsStorageMode = "blob" | "local";

export function isBlobStorageConfigured() {
  const hasReadWriteToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const hasOidcStore =
    Boolean(process.env.VERCEL_OIDC_TOKEN) &&
    Boolean(process.env.BLOB_STORE_ID);

  return hasReadWriteToken || hasOidcStore;
}

export function getCmsStorageMode(): CmsStorageMode {
  return isBlobStorageConfigured() ? "blob" : "local";
}

export function getAdminStorageNotice() {
  if (getCmsStorageMode() === "blob") {
    return "Mode Vercel Blob aktif. Konten CMS dan upload portfolio akan disimpan ke storage permanen, bukan hanya ke folder lokal project.";
  }

  if (process.env.VERCEL === "1") {
    return "Mode Vercel terdeteksi, tetapi Vercel Blob belum dikonfigurasi. CMS file JSON dan upload gambar lokal tidak permanen di serverless; buat Blob Store dan set BLOB_READ_WRITE_TOKEN agar perubahan konten production tersimpan.";
  }

  return "";
}
