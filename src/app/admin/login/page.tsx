import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { company } from "@/data/company";
import { hasAdminSession } from "@/lib/admin-auth";
import { getCompanyLogoUrl } from "@/lib/branding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login Admin | ZIMEIRA TECH",
  description: "Masuk ke admin CMS lokal ZIMEIRA TECH.",
};

export default async function AdminLoginPage() {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(16,185,129,0.24),transparent_32%),radial-gradient(circle_at_86%_78%,rgba(14,165,233,0.14),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <section>
          <Image
            src={getCompanyLogoUrl(company)}
            alt="Logo ZIMEIRA TECH"
            width={64}
            height={64}
            unoptimized
            className="size-16 rounded-2xl shadow-2xl shadow-emerald-950/40"
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Admin CMS Lokal
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Login untuk mengelola konten ZIMEIRA TECH.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            Setelah login, Anda bisa mengubah data perusahaan, layanan,
            portfolio, testimoni, FAQ, dan konten lain tanpa membuka komponen
            satu per satu.
          </p>
        </section>

        <LoginForm />
      </div>
    </main>
  );
}
