import Image from "next/image";
import {
  Code2,
  Cpu,
  Download,
  Globe2,
  HardDrive,
  MonitorCog,
  Paintbrush,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { services, type Service } from "@/data/company";

const icons = [
  ShieldCheck,
  Download,
  Sparkles,
  Wrench,
  Cpu,
  HardDrive,
  Printer,
  Globe2,
  Code2,
  Search,
  MonitorCog,
  Paintbrush,
];

const serviceVisuals = [
  {
    title: "Komputer & Laptop",
    description: "Instalasi, cleaning, repasta, rakit PC, dan penggantian part.",
    image: "/images/service-computer.svg",
  },
  {
    title: "Website & SEO",
    description: "Company profile, landing page, portfolio, maintenance, dan SEO dasar.",
    image: "/images/service-website.svg",
  },
  {
    title: "Desain Promosi",
    description: "Logo, banner, poster, flyer, dan kebutuhan visual usaha.",
    image: "/images/service-design.svg",
  },
];

export function Services({ items = services }: { items?: Service[] }) {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F0FDF4_0%,#F8FAFC_52%,#ECFEFF_100%)] py-28 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_85%_6%,rgba(14,165,233,0.12),transparent_26%)]" />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Layanan
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Layanan lengkap untuk komputer, desain, dan website.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Anda bisa memilih satu layanan sesuai kebutuhan, atau konsultasi dulu
            agar kami bantu arahkan solusi yang paling tepat dan sesuai budget.
          </p>
        </div>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
          {serviceVisuals.map((visual) => (
            <article
              key={visual.title}
              className="group overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-xl shadow-emerald-100/50 ring-1 ring-slate-950/[0.03] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-200/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <Image
                  src={visual.image}
                  alt={`Ilustrasi dummy ${visual.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-950">{visual.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{visual.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((service, index) => {
            const Icon = icons[index] ?? Code2;

            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm ring-1 ring-slate-950/[0.03] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100/70 sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-slate-900 opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition duration-300 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  {service.category}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-slate-950 sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
