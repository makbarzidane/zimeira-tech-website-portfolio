import Image from "next/image";
import Link from "next/link";
import { Camera, MessageCircle, Music2 } from "lucide-react";
import { company, navLinks, type CompanyInfo } from "@/data/company";
import { getCompanyLogoUrl } from "@/lib/branding";
import {
  createConsultationMessage,
  createInstagramUrl,
  createTiktokUrl,
  createWhatsAppUrl,
} from "@/lib/contact";

const legalLinks = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat Layanan", href: "/syarat-layanan" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer({
  companyInfo = company,
}: {
  companyInfo?: CompanyInfo;
}) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={getCompanyLogoUrl(companyInfo)}
              alt="Logo ZIMEIRA TECH"
              width={40}
              height={40}
              className="size-10 rounded-xl"
            />
            <span className="text-base font-semibold tracking-tight text-white">
              {companyInfo.name}
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            {companyInfo.tagline}
          </p>
          <p className="mt-3 text-sm text-slate-500">
            {companyInfo.businessHours}
          </p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-400 transition duration-300 hover:text-emerald-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-slate-500 transition duration-300 hover:text-emerald-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={createWhatsAppUrl(
              companyInfo.phone,
              createConsultationMessage("layanan ZIMEIRA TECH"),
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
          <div className="flex items-center gap-3">
            <a
              href={createInstagramUrl(companyInfo.instagram)}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram ZIMEIRA TECH"
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-slate-300 transition hover:border-emerald-300/40 hover:text-emerald-300"
            >
              <Camera className="size-4" aria-hidden="true" />
            </a>
            <a
              href={createTiktokUrl(companyInfo.tiktok)}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok ZIMEIRA TECH"
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-slate-300 transition hover:border-emerald-300/40 hover:text-emerald-300"
            >
              <Music2 className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-400">
        &copy; 2026 {companyInfo.name}. Melayani kebutuhan komputer, desain, dan website.
      </div>
    </footer>
  );
}
