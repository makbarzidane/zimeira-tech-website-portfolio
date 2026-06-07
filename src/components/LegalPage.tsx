import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { company } from "@/data/company";
import { getCompanyLogoUrl } from "@/lib/branding";

export type LegalSection = {
  title: string;
  body: string[];
};

export function LegalPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ECFEFF_0%,#F8FAFC_42%,#FFFFFF_100%)] text-slate-950">
      <div className="mx-auto w-full max-w-4xl px-6 py-10 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke website
        </Link>

        <header className="mt-8 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3">
            <Image
              src={getCompanyLogoUrl(company)}
              alt="Logo ZIMEIRA TECH"
              width={44}
              height={44}
              unoptimized
              className="size-11 rounded-xl"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {company.name}
              </p>
              <p className="text-sm text-slate-500">{company.businessHours}</p>
            </div>
          </div>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Terakhir diperbarui: 3 Juni 2026
          </p>
        </header>

        <div className="mt-10 grid gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-4 text-base leading-8 text-slate-600">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">
          Untuk pertanyaan terkait halaman ini, hubungi {company.email} atau
          WhatsApp {company.phone}.
        </footer>
      </div>
    </main>
  );
}
