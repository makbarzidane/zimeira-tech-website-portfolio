"use client";

import { Send } from "lucide-react";
import { type FormEvent } from "react";
import { createWhatsAppUrl } from "@/lib/contact";

export function ContactForm({
  phone,
  services,
}: {
  phone: string;
  services: string[];
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const contact = String(formData.get("contact") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const whatsappMessage = [
      "Halo ZIMEIRA TECH, saya ingin konsultasi.",
      "",
      `Nama: ${name || "-"}`,
      `Kontak: ${contact || "-"}`,
      `Kebutuhan: ${service || "-"}`,
      "",
      `Pesan: ${message || "-"}`,
    ].join("\n");

    window.open(createWhatsAppUrl(phone, whatsappMessage), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/20 bg-white p-5 text-slate-950 shadow-2xl shadow-black/30 sm:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Nama
          <input
            type="text"
            name="name"
            placeholder="Nama Anda"
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Nomor WhatsApp
          <input
            type="tel"
            name="contact"
            placeholder="08xx xxxx xxxx"
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">
        Kebutuhan
        <select
          name="service"
          className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        >
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>

      <label className="mt-5 grid gap-2 text-sm font-medium text-slate-700">
        Pesan
        <textarea
          name="message"
          rows={5}
          placeholder="Ceritakan singkat tentang kebutuhan Anda"
          className="resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />
      </label>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500"
      >
        Kirim via WhatsApp
        <Send className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
}
