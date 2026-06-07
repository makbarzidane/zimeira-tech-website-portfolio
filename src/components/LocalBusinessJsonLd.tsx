import type { CmsContent } from "@/data/company";
import { getCompanyLogoUrl, resolveSiteAssetUrl } from "@/lib/branding";
import { createInstagramUrl, createTiktokUrl } from "@/lib/contact";
import { getSiteUrl, siteConfig } from "@/lib/site";

export function LocalBusinessJsonLd({ content }: { content: CmsContent }) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: content.company.name,
    url: siteUrl,
    logo: resolveSiteAssetUrl(siteUrl, getCompanyLogoUrl(content.company)),
    image: `${siteUrl}/images/zimeira-hero-workspace.svg`,
    hasMap: content.company.mapsEmbedUrl,
    description: content.company.description,
    email: content.company.email,
    telephone: content.company.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pagaralam",
      addressCountry: "ID",
      streetAddress: content.company.address,
    },
    openingHours: "Mo-Su 07:00-20:00",
    areaServed: siteConfig.areaServed,
    priceRange: "$$",
    sameAs: [
      createInstagramUrl(content.company.instagram),
      createTiktokUrl(content.company.tiktok),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan ZIMEIRA TECH",
      itemListElement: content.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          serviceType: service.category,
          description: service.description,
          areaServed: siteConfig.areaServed,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
