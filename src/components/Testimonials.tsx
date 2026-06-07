import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/company";

export function Testimonials({
  items = testimonials,
}: {
  items?: Testimonial[];
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,0.22),transparent_32%),radial-gradient(circle_at_88%_78%,rgba(14,165,233,0.16),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Testimoni
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Cerita pelanggan yang terbantu oleh layanan ZIMEIRA TECH.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35 hover:bg-white/[0.1]"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-300">
                <Quote className="size-6" aria-hidden="true" />
              </div>
              <p className="mt-5 leading-7 text-slate-200">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="mt-1 text-sm text-emerald-100/70">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
