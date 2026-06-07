import { Building2, Handshake, Wrench } from "lucide-react";
import {
  company,
  stats,
  type CompanyInfo,
  type CompanyStat,
} from "@/data/company";

const values = [
  {
    title: "Solusi dekat dan praktis",
    description:
      "Kami membantu kebutuhan teknologi harian dengan cara yang mudah dipahami dan tidak berbelit-belit.",
    icon: Handshake,
  },
  {
    title: "Teknis sekaligus kreatif",
    description:
      "Layanan mencakup perangkat komputer, desain promosi, dan website sehingga kebutuhan Anda bisa lebih terarah.",
    icon: Wrench,
  },
  {
    title: "Mendukung usaha lokal",
    description:
      "ZIMEIRA TECH hadir untuk membantu UMKM, pelajar, pekerja, dan masyarakat Pagaralam tampil lebih siap secara digital.",
    icon: Building2,
  },
];

export function About({
  companyInfo = company,
  statsItems = stats,
}: {
  companyInfo?: CompanyInfo;
  statsItems?: CompanyStat[];
}) {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F0FDF4_0%,#F8FAFC_100%)] py-28 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(20,184,166,0.14),transparent_28%),radial-gradient(circle_at_86%_80%,rgba(16,185,129,0.12),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Tentang kami
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Tentang ZIMEIRA TECH
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-600">
              Berdiri sejak {companyInfo.founded}, {companyInfo.name} hadir sebagai layanan
              teknologi untuk masyarakat Kota Pagaralam dan sekitarnya. Kami
              membantu kebutuhan komputer seperti instalasi Windows resmi,
              instalasi aplikasi, cleaning, repasta, rakit PC, penggantian part,
              sampai kebutuhan digital seperti website usaha, portofolio online,
              logo, banner, poster, dan flyer.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {statsItems.map((stat) => (
                <div key={stat.label} className="border-l-2 border-emerald-500 pl-5">
                  <p className="text-3xl font-semibold text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-sm ring-1 ring-slate-950/[0.03] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/50"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{value.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{value.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
