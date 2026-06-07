export const siteConfig = {
  name: "ZIMEIRA TECH",
  productionUrl: "https://zimeira.duazreklame.my.id",
  title: "ZIMEIRA TECH | Jasa Komputer, Desain, dan Website Pagaralam",
  description:
    "ZIMEIRA TECH menyediakan jasa instalasi Windows resmi, perawatan laptop/PC, rakit PC, desain promosi, dan pembuatan website untuk Pagaralam dan sekitarnya.",
  locale: "id_ID",
  areaServed: "Kota Pagaralam dan sekitarnya, Indonesia",
  keywords: [
    "ZIMEIRA TECH",
    "jasa komputer Pagaralam",
    "instalasi Windows Pagaralam",
    "cleaning laptop Pagaralam",
    "rakit PC Pagaralam",
    "jasa website Pagaralam",
    "website company profile Pagaralam",
    "landing page Pagaralam",
    "desain logo Pagaralam",
    "desain banner Pagaralam",
  ],
};

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.productionUrl).replace(
    /\/$/,
    "",
  );
}
