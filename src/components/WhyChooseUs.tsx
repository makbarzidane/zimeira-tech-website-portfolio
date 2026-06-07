import { CheckCircle2 } from "lucide-react";
import { whyChooseUs, type WhyChooseUsItem } from "@/data/company";

export function WhyChooseUs({
  items = whyChooseUs,
}: {
  items?: WhyChooseUsItem[];
}) {
  return (
    <section
      id="why-choose-us"
      className="bg-[linear-gradient(180deg,#F8FAFC_0%,#ECFDF5_100%)] py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Why choose us
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Kenapa memilih ZIMEIRA TECH?
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Kami ingin membuat layanan teknologi terasa lebih dekat, jelas, dan
            bisa dipakai oleh siapa saja, baik untuk kebutuhan pribadi, tugas,
            pekerjaan, maupun pengembangan usaha.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/70 bg-white/85 p-6 shadow-sm ring-1 ring-slate-950/[0.03] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/60"
            >
              <CheckCircle2 className="size-7 text-emerald-600" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
