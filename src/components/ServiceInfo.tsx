import {
  Clock,
  FileCheck2,
  Palette,
  Truck,
  WalletCards,
} from "lucide-react";
import {
  company,
  policies,
  type CompanyInfo,
  type ServicePolicy,
} from "@/data/company";

const policyIcons = [Clock, Truck, WalletCards, Palette, FileCheck2];

export function ServiceInfo({
  companyInfo = company,
  items = policies,
}: {
  companyInfo?: CompanyInfo;
  items?: ServicePolicy[];
}) {
  return (
    <section
      id="service-info"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F8FAFC_0%,#ECFEFF_100%)] py-24 text-slate-950 lg:py-28"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Info layanan
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Aturan layanan dibuat jelas sejak awal.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            ZIMEIRA TECH memakai alur kerja yang sederhana: konsultasi dulu,
            kebutuhan disepakati, lalu pengerjaan dimulai dengan biaya dan
            jadwal yang transparan.
          </p>

          <div className="mt-8 rounded-2xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-100/40">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Jam operasional
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {companyInfo.businessHours}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Pesan WhatsApp tetap bisa dikirim kapan saja dan akan dibalas
              sesuai antrean layanan.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => {
            const Icon = policyIcons[index % policyIcons.length];

            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-emerald-100"
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-emerald-300 transition duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
