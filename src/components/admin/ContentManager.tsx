"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type ChangeEvent } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  CircleHelp,
  Database,
  Download,
  FileText,
  ImagePlus,
  Layers3,
  LogOut,
  MessageSquareQuote,
  MonitorCog,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import type { CmsContent } from "@/data/company";

type EditableCollection =
  | "stats"
  | "services"
  | "portfolio"
  | "whyChooseUs"
  | "policies"
  | "testimonials"
  | "faqs";

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "image";
  helper?: string;
};

type CollectionConfig = {
  title: string;
  description: string;
  empty: Record<string, string>;
  fields: FieldConfig[];
};

type StatusState = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

const collectionConfigs = {
  stats: {
    title: "Statistik",
    description: "Angka singkat yang tampil di hero dan about section.",
    empty: { value: "", label: "" },
    fields: [
      { name: "value", label: "Nilai" },
      { name: "label", label: "Label" },
    ],
  },
  services: {
    title: "Layanan",
    description: "Daftar layanan utama yang ditampilkan di section services.",
    empty: { title: "", category: "", description: "" },
    fields: [
      { name: "title", label: "Nama layanan" },
      { name: "category", label: "Kategori" },
      { name: "description", label: "Deskripsi", type: "textarea" },
    ],
  },
  portfolio: {
    title: "Portfolio",
    description: "Contoh project atau pekerjaan yang ditampilkan beserta gambar buktinya.",
    empty: { client: "", project: "", image: "", description: "", result: "" },
    fields: [
      { name: "client", label: "Client" },
      { name: "project", label: "Nama project" },
      {
        name: "image",
        label: "Gambar portfolio",
        type: "image",
        helper:
          "Pilih file gambar dari perangkat. Gambar akan tampil sebagai preview setelah berhasil upload.",
      },
      { name: "description", label: "Deskripsi", type: "textarea" },
      { name: "result", label: "Hasil" },
    ],
  },
  whyChooseUs: {
    title: "Keunggulan",
    description: "Alasan pelanggan memilih ZIMEIRA TECH.",
    empty: { title: "", description: "" },
    fields: [
      { name: "title", label: "Judul" },
      { name: "description", label: "Deskripsi", type: "textarea" },
    ],
  },
  policies: {
    title: "Info Layanan",
    description: "Aturan operasional, DP, ongkir, dan catatan pengerjaan.",
    empty: { title: "", description: "" },
    fields: [
      { name: "title", label: "Judul" },
      { name: "description", label: "Deskripsi", type: "textarea" },
    ],
  },
  testimonials: {
    title: "Testimoni",
    description: "Testimoni dummy atau testimoni pelanggan.",
    empty: { quote: "", name: "", role: "" },
    fields: [
      { name: "quote", label: "Testimoni", type: "textarea" },
      { name: "name", label: "Nama" },
      { name: "role", label: "Peran" },
    ],
  },
  faqs: {
    title: "FAQ",
    description: "Pertanyaan dan jawaban yang tampil di section FAQ.",
    empty: { question: "", answer: "" },
    fields: [
      { name: "question", label: "Pertanyaan" },
      { name: "answer", label: "Jawaban", type: "textarea" },
    ],
  },
} satisfies Record<EditableCollection, CollectionConfig>;

const collectionKeys = Object.keys(collectionConfigs) as EditableCollection[];

const collectionVisuals = {
  stats: {
    icon: BarChart3,
    tone: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  },
  services: {
    icon: MonitorCog,
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  portfolio: {
    icon: BriefcaseBusiness,
    tone: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  whyChooseUs: {
    icon: ShieldCheck,
    tone: "bg-blue-50 text-blue-700 ring-blue-100",
  },
  policies: {
    icon: FileText,
    tone: "bg-violet-50 text-violet-700 ring-violet-100",
  },
  testimonials: {
    icon: MessageSquareQuote,
    tone: "bg-rose-50 text-rose-700 ring-rose-100",
  },
  faqs: {
    icon: CircleHelp,
    tone: "bg-slate-100 text-slate-700 ring-slate-200",
  },
} satisfies Record<
  EditableCollection,
  { icon: LucideIcon; tone: string }
>;

const companyFields = [
  { name: "name", label: "Nama bisnis" },
  {
    name: "logoUrl",
    label: "Logo website",
    type: "image",
    helper:
      "Upload logo dari perangkat. Logo ini dipakai di navbar, footer, halaman legal, dan metadata website.",
  },
  { name: "tagline", label: "Tagline" },
  { name: "description", label: "Deskripsi", type: "textarea" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Nomor telepon" },
  { name: "address", label: "Alamat" },
  { name: "founded", label: "Tahun berdiri" },
  { name: "businessHours", label: "Jam operasional" },
  { name: "instagram", label: "Username Instagram" },
  { name: "tiktok", label: "Username TikTok" },
  { name: "plannedDomain", label: "Domain utama" },
  {
    name: "mapsEmbedUrl",
    label: "Google Maps embed URL",
    type: "textarea",
  },
] satisfies FieldConfig[];

function statusClassName(type: StatusState["type"]) {
  if (type === "success") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800 shadow-emerald-100/70";
  }

  if (type === "error") {
    return "border-red-200 bg-red-50 text-red-800 shadow-red-100/70";
  }

  if (type === "loading") {
    return "border-cyan-200 bg-cyan-50 text-cyan-800 shadow-cyan-100/70";
  }

  return "border-slate-200 bg-white text-slate-600 shadow-slate-100/70";
}

function Field({
  field,
  value,
  onChange,
  onUpload,
  isUploading = false,
}: {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  onUpload?: (file: File) => Promise<void>;
  isUploading?: boolean;
}) {
  const fileInputId = useId();
  const baseClassName =
    "w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none shadow-sm shadow-slate-200/40 transition placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100";
  const isImageField = field.type === "image";
  const imageLabel = field.label.toLowerCase();

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !onUpload) {
      return;
    }

    await onUpload(selectedFile);
    event.target.value = "";
  }

  return (
    <div className="group grid gap-2 text-sm font-semibold text-slate-700">
      <span className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-emerald-400 opacity-70 transition group-focus-within:scale-125 group-focus-within:bg-emerald-600" />
        {field.label}
      </span>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className={`${baseClassName} resize-y leading-7`}
        />
      ) : isImageField ? (
        <div className="grid gap-3">
          <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/70 p-4 shadow-sm shadow-emerald-100/60 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50">
            <input
              id={fileInputId}
              type="file"
              accept="image/*,.svg"
              onChange={handleFileChange}
              disabled={isUploading}
              className="sr-only"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-950 text-emerald-300">
                  <ImagePlus className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {value ? `Ganti ${imageLabel}` : `Upload ${imageLabel}`}
                  </p>
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                    Semua format gambar didukung, termasuk SVG.
                  </p>
                </div>
              </div>
              <label
                htmlFor={isUploading ? undefined : fileInputId}
                className={`inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${
                  isUploading
                    ? "bg-slate-200 text-slate-500"
                    : "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 hover:bg-emerald-500"
                }`}
              >
                <Upload className="size-4" aria-hidden="true" />
                {isUploading ? "Mengupload..." : "Pilih file"}
              </label>
            </div>
            {value ? (
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium text-slate-500">
                  {field.label} sudah terpasang.
                </p>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="w-fit rounded-lg border border-red-100 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Hapus gambar
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={isImageField ? "/images/service-website.svg" : undefined}
          className={baseClassName}
        />
      )}
      {field.helper ? (
        <span className="text-xs font-medium leading-5 text-slate-500">
          {field.helper}
        </span>
      ) : null}
      {isImageField && value ? (
        <span className="relative mt-1 block aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="size-full object-cover"
            loading="lazy"
          />
        </span>
      ) : null}
    </div>
  );
}

export function ContentManager({
  deploymentNotice,
  initialContent,
}: {
  deploymentNotice?: string;
  initialContent: CmsContent;
}) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [activeCollection, setActiveCollection] =
    useState<EditableCollection>("services");
  const [status, setStatus] = useState<StatusState>({
    type: "idle",
    message: "Login aktif. Siap mengelola konten.",
  });
  const [uploadingImageKey, setUploadingImageKey] = useState<string | null>(
    null,
  );

  const activeConfig = collectionConfigs[activeCollection];
  const activeItems = content[activeCollection] as Array<Record<string, string>>;
  const totalCollectionItems = collectionKeys.reduce(
    (total, collection) => total + content[collection].length,
    0,
  );
  const quickStats = [
    {
      label: "Bagian aktif",
      value: activeConfig.title,
      icon: collectionVisuals[activeCollection].icon,
    },
    {
      label: "Total item CMS",
      value: String(totalCollectionItems),
      icon: Layers3,
    },
    {
      label: "Nomor WhatsApp",
      value: content.company.phone,
      icon: CheckCircle2,
    },
  ];

  function updateCompany(fieldName: keyof CmsContent["company"], value: string) {
    setContent((current) => ({
      ...current,
      company: {
        ...current.company,
        [fieldName]: value,
      },
    }));
  }

  function updateItem(
    collection: EditableCollection,
    index: number,
    fieldName: string,
    value: string,
  ) {
    setContent((current) => {
      const currentItems = current[collection] as Array<Record<string, string>>;

      return {
        ...current,
        [collection]: currentItems.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [fieldName]: value } : item,
        ),
      } as CmsContent;
    });
  }

  function addItem(collection: EditableCollection) {
    setContent((current) => {
      const currentItems = current[collection] as Array<Record<string, string>>;
      return {
        ...current,
        [collection]: [...currentItems, { ...collectionConfigs[collection].empty }],
      } as CmsContent;
    });
  }

  function deleteItem(collection: EditableCollection, index: number) {
    setContent((current) => {
      const currentItems = current[collection] as Array<Record<string, string>>;
      return {
        ...current,
        [collection]: currentItems.filter((_, itemIndex) => itemIndex !== index),
      } as CmsContent;
    });
  }

  async function uploadPortfolioImage(index: number, file: File) {
    const uploadKey = `portfolio-${index}-image`;
    setUploadingImageKey(uploadKey);
    setStatus({ type: "loading", message: "Mengupload gambar portfolio..." });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads/portfolio", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        url?: string;
        message?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(data.message ?? "Gambar gagal diupload.");
      }

      updateItem("portfolio", index, "image", data.url);
      setStatus({
        type: "success",
        message:
          "Gambar berhasil diupload. Klik Simpan agar perubahan portfolio tersimpan.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Gambar gagal diupload.",
      });
    } finally {
      setUploadingImageKey(null);
    }
  }

  async function uploadCompanyLogo(file: File) {
    const uploadKey = "company-logoUrl";
    setUploadingImageKey(uploadKey);
    setStatus({ type: "loading", message: "Mengupload logo website..." });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads/brand", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        url?: string;
        message?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(data.message ?? "Logo gagal diupload.");
      }

      updateCompany("logoUrl", data.url);
      setStatus({
        type: "success",
        message:
          "Logo berhasil diupload. Klik Simpan agar logo website tersimpan.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Logo gagal diupload.",
      });
    } finally {
      setUploadingImageKey(null);
    }
  }

  async function reloadContent() {
    setStatus({ type: "loading", message: "Memuat ulang konten..." });

    try {
      const response = await fetch("/api/admin/content", { cache: "no-store" });
      const data = (await response.json()) as CmsContent;
      setContent(data);
      setStatus({ type: "success", message: "Konten berhasil dimuat ulang." });
    } catch {
      setStatus({
        type: "error",
        message: "Konten gagal dimuat ulang. Pastikan dev server berjalan.",
      });
    }
  }

  async function saveContent() {
    setStatus({ type: "loading", message: "Menyimpan konten..." });

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
      const data = (await response.json()) as {
        content?: CmsContent;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message ?? "Konten gagal disimpan.");
      }

      if (data.content) {
        setContent(data.content);
      }

      setStatus({
        type: "success",
        message: data.message ?? "Konten berhasil disimpan.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Konten gagal disimpan.",
      });
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin/login");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#F0FDF4_0%,#F8FAFC_42%,#ECFEFF_100%)] text-slate-950">
      <div className="pointer-events-none absolute left-[-8rem] top-[-8rem] size-80 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-64 size-96 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="animate-fade-up relative overflow-hidden rounded-3xl border border-white/70 bg-white/88 p-5 shadow-2xl shadow-emerald-100/70 ring-1 ring-slate-950/[0.03] backdrop-blur sm:p-6">
          <div className="absolute right-14 top-14 hidden h-10 w-10 rounded-full bg-emerald-300/25 blur-xl lg:block" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Kembali ke website
              </Link>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-emerald-300 shadow-xl shadow-slate-950/20">
                  <Database className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    <Sparkles className="size-4" aria-hidden="true" />
                    Admin CMS
                  </p>
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Kelola konten ZIMEIRA TECH
                  </h1>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[auto_auto] xl:grid-cols-[auto_auto_auto_auto]">
              <a
                href="/api/admin/content/export"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100/50"
              >
                <Download className="size-4" aria-hidden="true" />
                Backup
              </a>
              <button
                type="button"
                onClick={reloadContent}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                Muat ulang
              </button>
              <button
                type="button"
                onClick={saveContent}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 hover:bg-emerald-500"
              >
                <Save className="size-4" aria-hidden="true" />
                Simpan
              </button>
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-4 text-sm font-semibold text-red-600 transition hover:-translate-y-0.5 hover:bg-red-50"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div
          className={`animate-fade-up mt-5 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-lg ${statusClassName(status.type)}`}
          style={{ animationDelay: "80ms" }}
        >
          {status.type === "loading" ? (
            <RefreshCw
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          )}
          {status.message}
        </div>

        {deploymentNotice ? (
          <div className="animate-fade-up mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-900 shadow-lg shadow-amber-100/70">
            <AlertTriangle
              className="mt-0.5 size-5 shrink-0"
              aria-hidden="true"
            />
            <p>{deploymentNotice}</p>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="animate-fade-up rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-emerald-100/30 ring-1 ring-slate-950/[0.03] backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-100/60"
                style={{ animationDelay: `${120 + index * 70}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {stat.label}
                    </p>
                    <p className="mt-2 truncate text-lg font-semibold text-slate-950">
                      {stat.value}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-emerald-300">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <section className="animate-fade-up mt-8 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-xl shadow-emerald-100/40 ring-1 ring-slate-950/[0.03] backdrop-blur sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Profil bisnis
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Data utama perusahaan
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Perubahan di bagian ini akan memengaruhi hero, about, contact, dan
              footer.
            </p>
          </div>

          <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
            {companyFields.map((field) => (
              <Field
                key={field.name}
                field={field}
                value={content.company[field.name as keyof CmsContent["company"]]}
                onChange={(value) =>
                  updateCompany(field.name as keyof CmsContent["company"], value)
                }
                onUpload={
                  field.name === "logoUrl" ? uploadCompanyLogo : undefined
                }
                isUploading={uploadingImageKey === `company-${field.name}`}
              />
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded-3xl border border-white/70 bg-white/85 p-3 shadow-xl shadow-emerald-100/30 ring-1 ring-slate-950/[0.03] backdrop-blur lg:sticky lg:top-6">
            <div className="mb-3 flex items-center gap-2 px-2 pt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              <WandSparkles className="size-4" aria-hidden="true" />
              Navigasi konten
            </div>
            <div className="grid gap-2">
              {collectionKeys.map((collection) => {
                const isActive = collection === activeCollection;
                const Icon = collectionVisuals[collection].icon;

                return (
                  <button
                    key={collection}
                    type="button"
                    onClick={() => setActiveCollection(collection)}
                    className={`group rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                      isActive
                        ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15"
                        : "text-slate-600 hover:-translate-y-0.5 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-xl ring-1 transition ${
                          isActive
                            ? "bg-white/10 text-emerald-200 ring-white/10"
                            : collectionVisuals[collection].tone
                        }`}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block">
                          {collectionConfigs[collection].title}
                        </span>
                        <span
                          className={`mt-1 block text-xs ${
                            isActive ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          {content[collection].length} item
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-xl shadow-emerald-100/40 ring-1 ring-slate-950/[0.03] backdrop-blur sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  CRUD konten
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {activeConfig.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  {activeConfig.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => addItem(activeCollection)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-emerald-600/25"
              >
                <Plus className="size-4" aria-hidden="true" />
                Tambah item
              </button>
            </div>

            <div className="mt-6 grid gap-5">
              {activeItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="font-semibold text-slate-800">
                    Belum ada item di bagian ini.
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Klik Tambah item untuk membuat data baru.
                  </p>
                </div>
              ) : (
                activeItems.map((item, index) => (
                  <article
                    key={`${activeCollection}-${index}`}
                    className="animate-fade-up rounded-2xl border border-slate-200 bg-slate-50/90 p-4 shadow-sm shadow-slate-200/50 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/60 sm:p-5"
                    style={{ animationDelay: `${Math.min(index * 55, 275)}ms` }}
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-xl bg-white text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                            Item {index + 1}
                          </p>
                          <p className="mt-1 text-xs font-medium text-slate-400">
                            Edit data, lalu klik Simpan.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteItem(activeCollection, index)}
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-red-100 bg-white text-red-600 transition hover:bg-red-50"
                        aria-label={`Hapus item ${index + 1}`}
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
                      {activeConfig.fields.map((field) => (
                        <Field
                          key={field.name}
                          field={field}
                          value={item[field.name] ?? ""}
                          onChange={(value) =>
                            updateItem(
                              activeCollection,
                              index,
                              field.name,
                              value,
                            )
                          }
                          onUpload={
                            activeCollection === "portfolio" &&
                            field.name === "image"
                              ? (file) => uploadPortfolioImage(index, file)
                              : undefined
                          }
                          isUploading={
                            uploadingImageKey ===
                            `${activeCollection}-${index}-${field.name}`
                          }
                        />
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
