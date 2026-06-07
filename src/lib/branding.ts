import type { CompanyInfo } from "@/data/company";

export const defaultLogoUrl = "/images/zimeira-logo.svg";

export function getCompanyLogoUrl(
  companyInfo?: Pick<CompanyInfo, "logoUrl">,
) {
  return companyInfo?.logoUrl?.trim() || defaultLogoUrl;
}

export function resolveSiteAssetUrl(siteUrl: string, assetUrl: string) {
  if (assetUrl.startsWith("http://") || assetUrl.startsWith("https://")) {
    return assetUrl;
  }

  return `${siteUrl}${assetUrl.startsWith("/") ? assetUrl : `/${assetUrl}`}`;
}
