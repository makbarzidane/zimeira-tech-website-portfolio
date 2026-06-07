import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company, navLinks, type CompanyInfo } from "@/data/company";
import { getCompanyLogoUrl } from "@/lib/branding";
import { createConsultationMessage, createWhatsAppUrl } from "@/lib/contact";

export function Navbar({
  companyInfo = company,
}: {
  companyInfo?: CompanyInfo;
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#061826] px-3 py-2 shadow-[0_1px_0_rgba(255,255,255,0.06)] sm:py-3">
      <nav className="mx-0 flex h-14 w-full max-w-[21.5rem] items-center justify-between gap-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 px-3 shadow-2xl shadow-slate-950/20 ring-1 ring-white/10 backdrop-blur-xl sm:mx-auto sm:h-16 sm:max-w-[calc(100vw-1.5rem)] sm:gap-3 sm:px-4 lg:max-w-7xl lg:px-6">
        <Link href="#" className="group flex min-w-0 items-center gap-3">
          <Image
            src={getCompanyLogoUrl(companyInfo)}
            alt="Logo ZIMEIRA TECH"
            width={40}
            height={40}
            className="size-9 shrink-0 rounded-xl shadow-lg shadow-emerald-950/30 transition duration-300 group-hover:scale-105 sm:size-10"
          />
          <span className="max-w-[118px] truncate text-xs font-bold tracking-tight text-white sm:max-w-none sm:text-base">
            {companyInfo.name}
          </span>
        </Link>

        <div className="hidden items-center rounded-full bg-white/[0.06] p-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition duration-300 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href={createWhatsAppUrl(
            companyInfo.phone,
            createConsultationMessage("layanan komputer, desain, atau website"),
          )}
          target="_blank"
          rel="noreferrer"
          aria-label="Konsultasi gratis"
          className="inline-flex size-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-emerald-600/35 sm:h-11 sm:w-auto sm:px-4"
        >
          <span className="hidden sm:inline">Konsultasi</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
