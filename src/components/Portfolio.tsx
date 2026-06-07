"use client";

import Image from "next/image";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolio, type PortfolioItem } from "@/data/company";

const portfolioImages = [
  "/images/service-website.svg",
  "/images/service-design.svg",
  "/images/service-computer.svg",
];

function getPortfolioImage(item: PortfolioItem, index: number) {
  return item.image.trim() || portfolioImages[index % portfolioImages.length];
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function Portfolio({ items = portfolio }: { items?: PortfolioItem[] }) {
  const [previewItem, setPreviewItem] = useState<{
    item: PortfolioItem;
    image: string;
  } | null>(null);

  useEffect(() => {
    if (!previewItem) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPreviewItem(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewItem]);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-slate-950 py-28 text-white lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Portfolio
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Contoh pekerjaan yang bisa dikerjakan ZIMEIRA TECH.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Berikut portfolio dummy untuk menggambarkan jenis layanan yang
              dapat dikembangkan, mulai dari website, desain, sampai perawatan
              perangkat.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-100"
          >
            Bahas project Anda
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((item, index) => {
            const image = getPortfolioImage(item, index);

            return (
              <article
                key={item.client}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-emerald-300/40 hover:bg-white/[0.09]"
              >
                <button
                  type="button"
                  onClick={() => setPreviewItem({ item, image })}
                  className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-left outline-none transition focus-visible:ring-4 focus-visible:ring-emerald-300/40"
                  aria-label={`Lihat preview gambar portfolio ${item.project}`}
                >
                  {isRemoteImage(image) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={`Gambar portfolio ${item.project}`}
                      className="size-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={image}
                      alt={`Gambar portfolio ${item.project}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-slate-950/0 transition duration-300 group-hover:bg-slate-950/15" />
                  <div className="absolute right-3 top-3 grid size-10 place-items-center rounded-xl border border-white/10 bg-slate-950/70 text-emerald-100 opacity-0 shadow-lg shadow-black/20 backdrop-blur transition duration-300 group-hover:opacity-100">
                    <Maximize2 className="size-4" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-semibold text-emerald-100 backdrop-blur">
                    Klik untuk lihat penuh
                  </div>
                </button>
                <div className="p-2 pt-6">
                  <p className="w-fit rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    {item.client}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold">{item.project}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
                  <div className="mt-6 border-t border-white/10 pt-5 transition duration-300 group-hover:border-emerald-300/30">
                    <p className="text-sm font-semibold text-white">{item.result}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {previewItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview portfolio ${previewItem.item.project}`}
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  {previewItem.item.client}
                </p>
                <h3 className="mt-1 truncate text-lg font-semibold text-white sm:text-xl">
                  {previewItem.item.project}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/15"
                aria-label="Tutup preview portfolio"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative h-[72vh] min-h-[280px] w-full bg-slate-900">
              {isRemoteImage(previewItem.image) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewItem.image}
                  alt={`Preview portfolio ${previewItem.item.project}`}
                  className="size-full object-contain"
                />
              ) : (
                <Image
                  src={previewItem.image}
                  alt={`Preview portfolio ${previewItem.item.project}`}
                  fill
                  sizes="100vw"
                  unoptimized
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
