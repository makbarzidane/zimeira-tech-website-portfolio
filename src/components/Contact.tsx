import {
  Camera,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { company, services, type CompanyInfo, type Service } from "@/data/company";
import {
  createConsultationMessage,
  createInstagramUrl,
  createTiktokUrl,
  createWhatsAppUrl,
} from "@/lib/contact";

export function Contact({
  companyInfo = company,
  serviceItems = services,
}: {
  companyInfo?: CompanyInfo;
  serviceItems?: Service[];
}) {
  const serviceOptions = serviceItems.map((service) => service.title);

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-28 text-white lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_88%_84%,rgba(14,165,233,0.16),transparent_30%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Kontak
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Butuh bantuan komputer, desain, atau website? Konsultasi dulu gratis.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Kirim pesan singkat tentang kebutuhan Anda. Kami akan membantu
            memberi arahan layanan, estimasi, dan langkah pengerjaan yang paling
            sesuai.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={createWhatsAppUrl(
                companyInfo.phone,
                createConsultationMessage("layanan ZIMEIRA TECH"),
              )}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-emerald-100 backdrop-blur transition duration-300 hover:border-emerald-300/50 hover:bg-emerald-300/15"
            >
              <MessageCircle className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
              Konsultasi via WhatsApp
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-slate-200 backdrop-blur transition duration-300 hover:border-emerald-300/35 hover:bg-white/[0.11]"
            >
              <Mail className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
              {companyInfo.email}
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-slate-200 backdrop-blur transition duration-300 hover:border-emerald-300/35 hover:bg-white/[0.11]"
            >
              <Phone className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
              {companyInfo.phone}
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-slate-200 backdrop-blur">
              <Clock className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
              {companyInfo.businessHours}
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-slate-200 backdrop-blur">
              <MapPin className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
              {companyInfo.address}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={createInstagramUrl(companyInfo.instagram)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-slate-200 backdrop-blur transition duration-300 hover:border-emerald-300/35 hover:bg-white/[0.11]"
              >
                <Camera className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
                @{companyInfo.instagram}
              </a>
              <a
                href={createTiktokUrl(companyInfo.tiktok)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-slate-200 backdrop-blur transition duration-300 hover:border-emerald-300/35 hover:bg-white/[0.11]"
              >
                <Music2 className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
                @{companyInfo.tiktok}
              </a>
            </div>
          </div>
        </div>

        <ContactForm phone={companyInfo.phone} services={serviceOptions} />

        {companyInfo.mapsEmbedUrl ? (
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] shadow-2xl shadow-black/25 backdrop-blur lg:col-span-2">
            <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Lokasi
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Temukan lokasi layanan ZIMEIRA TECH.
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-300">
                Gunakan peta ini sebagai referensi lokasi. Untuk antar jemput
                perangkat, biaya ongkir akan dikonfirmasi melalui WhatsApp.
              </p>
            </div>
            <iframe
              src={companyInfo.mapsEmbedUrl}
              title={`Peta lokasi ${companyInfo.name}`}
              className="h-[360px] w-full border-0 sm:h-[430px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
