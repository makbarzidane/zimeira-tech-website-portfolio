import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  company,
  stats,
  type CompanyInfo,
  type CompanyStat,
} from "@/data/company";
import { createConsultationMessage, createWhatsAppUrl } from "@/lib/contact";

const highlights = [
  "Konsultasi gratis",
  "Layanan komputer & website",
  "Untuk Pagaralam dan sekitarnya",
];

export function Hero({
  companyInfo = company,
  statsItems = stats,
}: {
  companyInfo?: CompanyInfo;
  statsItems?: CompanyStat[];
}) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-[#061826] pt-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(16,185,129,0.32),transparent_30%),radial-gradient(circle_at_86%_20%,rgba(14,165,233,0.2),transparent_32%),linear-gradient(180deg,#061826_0%,#082F2A_58%,#F0FDF4_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-56px)] w-full max-w-7xl min-w-0 items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[0.98fr_1.02fr] lg:px-8 lg:pb-32 lg:pt-24">
        <div className="w-full min-w-0 max-w-[21.5rem] animate-fade-up sm:max-w-none">
          <p className="mb-5 inline-block max-w-full rounded-full border border-emerald-300/30 bg-white/10 px-4 py-2 text-[0.66rem] font-bold uppercase leading-5 tracking-[0.12em] text-emerald-100 shadow-sm backdrop-blur sm:text-xs sm:tracking-[0.18em]">
            Jasa teknologi lokal yang siap membantu
          </p>
          <h1 className="max-w-full break-words text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:max-w-3xl sm:text-5xl sm:leading-[1.04] lg:text-7xl">
            {companyInfo.tagline}
          </h1>
          <p className="mt-6 max-w-full text-base leading-8 text-emerald-50/80 sm:max-w-2xl sm:text-lg">
            {companyInfo.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={createWhatsAppUrl(
                companyInfo.phone,
                createConsultationMessage("layanan ZIMEIRA TECH"),
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300 sm:w-auto"
            >
              Konsultasi via WhatsApp
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-semibold text-white shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/60 hover:bg-white/15 sm:w-auto"
            >
              Lihat Layanan
            </a>
          </div>

          <div className="mt-8 flex max-w-full flex-wrap gap-3 sm:max-w-none">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex max-w-full min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-emerald-50/80 shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="size-4 text-emerald-300" aria-hidden="true" />
                <span className="min-w-0 break-words">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full min-w-0 max-w-[21.5rem] animate-float-soft sm:max-w-none">
          <div className="relative z-10 min-w-0 rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-slate-950/30 ring-1 ring-white/10 backdrop-blur sm:p-5">
            <div className="relative mb-5 overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/30">
              <Image
                src="/images/zimeira-hero-workspace.svg"
                alt="Ilustrasi dummy workspace teknisi ZIMEIRA TECH"
                width={960}
                height={720}
                preload
                unoptimized
                className="h-auto w-full"
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-emerald-100 backdrop-blur">
                Visual layanan
              </div>
            </div>

            <div className="mb-5 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-lg shadow-slate-950/20 backdrop-blur">
              <p className="text-sm font-semibold text-white">Komputer, website, dan desain</p>
              <p className="mt-1 text-xs text-emerald-100/80">
                Satu tempat untuk kebutuhan teknologi harian dan usaha lokal.
              </p>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  ZIMEIRA TECH Service Desk
                </p>
                <p className="text-xs text-emerald-50/70">
                  Kebutuhan komputer, desain, dan website
                </p>
              </div>
              <span className="rounded-md bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                Siap bantu
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {statsItems.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.13]"
                >
                  <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-emerald-50/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-white p-5 text-slate-950 shadow-xl shadow-slate-950/20">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Alur layanan</p>
                <p className="text-sm text-emerald-700">Mudah</p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-3/4 rounded-full bg-emerald-500" />
              </div>
              <div className="mt-5 grid gap-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Ceritakan kebutuhan</span>
                  <span className="font-semibold text-slate-950">Gratis</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Terima rekomendasi</span>
                  <span className="font-semibold text-slate-950">Jelas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Proses pengerjaan</span>
                  <span className="font-semibold text-emerald-700">Rapi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
