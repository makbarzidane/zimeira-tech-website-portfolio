import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { getCompanyLogoUrl, resolveSiteAssetUrl } from "@/lib/branding";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        resolveSiteAssetUrl(siteUrl, getCompanyLogoUrl(company)),
        `${siteUrl}/images/zimeira-hero-workspace.svg`,
      ],
    },
    {
      url: `${siteUrl}/kebijakan-privasi`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/syarat-layanan`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/disclaimer`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
