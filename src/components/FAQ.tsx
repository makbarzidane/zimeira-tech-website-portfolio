import { faqs, type FAQItem } from "@/data/company";

export function FAQ({ items = faqs }: { items?: FAQItem[] }) {
  return (
    <section
      id="faq"
      className="bg-[linear-gradient(180deg,#ECFDF5_0%,#F8FAFC_100%)] py-28 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Pertanyaan yang sering ditanyakan sebelum menggunakan layanan.
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/70 bg-white/85 p-6 shadow-sm ring-1 ring-slate-950/[0.03] backdrop-blur transition duration-300 open:border-emerald-200 open:bg-white open:shadow-xl open:shadow-emerald-100/50 hover:border-emerald-200"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                <span className="flex items-center justify-between gap-6">
                  {faq.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-xl leading-none text-emerald-600 transition duration-300 group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
