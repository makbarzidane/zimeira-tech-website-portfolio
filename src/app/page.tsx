import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { ServiceInfo } from "@/components/ServiceInfo";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { readCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await readCmsContent();

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950"
      suppressHydrationWarning
    >
      <LocalBusinessJsonLd content={content} />
      <Navbar companyInfo={content.company} />
      <main>
        <Hero companyInfo={content.company} statsItems={content.stats} />
        <About companyInfo={content.company} statsItems={content.stats} />
        <Services items={content.services} />
        <Portfolio items={content.portfolio} />
        <WhyChooseUs items={content.whyChooseUs} />
        <Testimonials items={content.testimonials} />
        <FAQ items={content.faqs} />
        <ServiceInfo
          companyInfo={content.company}
          items={content.policies}
        />
        <Contact
          companyInfo={content.company}
          serviceItems={content.services}
        />
      </main>
      <Footer companyInfo={content.company} />
      <FloatingWhatsAppButton companyInfo={content.company} />
    </div>
  );
}
