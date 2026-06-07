import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { company } from "@/data/company";

function createWhatsAppLink() {
  const phone = company.phone.replace(/\D/g, "");
  const message = encodeURIComponent(
    "Halo ZIMEIRA TECH, saya ingin konsultasi layanan.",
  );

  return `https://wa.me/${phone}?text=${message}`;
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#D1FAE5_0%,transparent_34%),linear-gradient(135deg,#F8FAFC_0%,#ECFEFF_52%,#F0FDF4_100%)] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-5 py-16 sm:px-6 lg:px-8">
        <section className="w-full rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-emerald-100/60 ring-1 ring-slate-950/[0.03] backdrop-blur sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            ZIMEIRA TECH
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">
                404
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Halaman yang Anda cari belum tersedia.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                Link mungkin berubah atau halaman belum dibuat. Anda bisa
                kembali ke website utama atau langsung konsultasi kebutuhan
                komputer, desain, dan website.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Kembali ke beranda
                </Link>
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Konsultasi via WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/20">
              <p className="text-sm font-semibold text-emerald-300">
                Kontak aktif
              </p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
                <p>{company.phone}</p>
                <p>{company.email}</p>
                <p>{company.businessHours}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
