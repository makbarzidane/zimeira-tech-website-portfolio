import { MessageCircle } from "lucide-react";
import { company, type CompanyInfo } from "@/data/company";
import { createConsultationMessage, createWhatsAppUrl } from "@/lib/contact";

export function FloatingWhatsAppButton({
  companyInfo = company,
}: {
  companyInfo?: CompanyInfo;
}) {
  return (
    <a
      href={createWhatsAppUrl(
        companyInfo.phone,
        createConsultationMessage("layanan ZIMEIRA TECH"),
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Konsultasi via WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-950/25 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/40"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
