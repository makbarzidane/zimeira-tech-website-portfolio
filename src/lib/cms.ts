import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import {
  defaultCmsContent,
  type CmsContent,
  type CompanyInfo,
  type CompanyStat,
  type FAQItem,
  type PortfolioItem,
  type Service,
  type ServicePolicy,
  type Testimonial,
  type WhyChooseUsItem,
} from "@/data/company";
import { isBlobStorageConfigured } from "@/lib/storage";

const cmsFilePath = path.join(process.cwd(), "src", "data", "cms-content.json");
const cmsBlobPathname = "cms/cms-content.json";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function sanitizeCompany(value: unknown): CompanyInfo {
  const source = isRecord(value) ? value : {};
  return {
    name: asString(source.name, defaultCmsContent.company.name),
    logoUrl: asString(source.logoUrl, defaultCmsContent.company.logoUrl),
    tagline: asString(source.tagline, defaultCmsContent.company.tagline),
    description: asString(
      source.description,
      defaultCmsContent.company.description,
    ),
    email: asString(source.email, defaultCmsContent.company.email),
    phone: asString(source.phone, defaultCmsContent.company.phone),
    address: asString(source.address, defaultCmsContent.company.address),
    founded: asString(source.founded, defaultCmsContent.company.founded),
    businessHours: asString(
      source.businessHours,
      defaultCmsContent.company.businessHours,
    ),
    instagram: asString(source.instagram, defaultCmsContent.company.instagram),
    tiktok: asString(source.tiktok, defaultCmsContent.company.tiktok),
    plannedDomain: asString(
      source.plannedDomain,
      defaultCmsContent.company.plannedDomain,
    ),
    mapsEmbedUrl: asString(
      source.mapsEmbedUrl,
      defaultCmsContent.company.mapsEmbedUrl,
    ),
  };
}

function sanitizeStat(value: unknown): CompanyStat {
  const source = isRecord(value) ? value : {};
  return {
    value: asString(source.value),
    label: asString(source.label),
  };
}

function sanitizeService(value: unknown): Service {
  const source = isRecord(value) ? value : {};
  return {
    title: asString(source.title),
    category: asString(source.category),
    description: asString(source.description),
  };
}

function sanitizePortfolioItem(value: unknown): PortfolioItem {
  const source = isRecord(value) ? value : {};
  return {
    client: asString(source.client),
    project: asString(source.project),
    image: asString(source.image),
    description: asString(source.description),
    result: asString(source.result),
  };
}

function sanitizeWhyChooseUsItem(value: unknown): WhyChooseUsItem {
  const source = isRecord(value) ? value : {};
  return {
    title: asString(source.title),
    description: asString(source.description),
  };
}

function sanitizeTestimonial(value: unknown): Testimonial {
  const source = isRecord(value) ? value : {};
  return {
    quote: asString(source.quote),
    name: asString(source.name),
    role: asString(source.role),
  };
}

function sanitizeFaq(value: unknown): FAQItem {
  const source = isRecord(value) ? value : {};
  return {
    question: asString(source.question),
    answer: asString(source.answer),
  };
}

function sanitizeServicePolicy(value: unknown): ServicePolicy {
  const source = isRecord(value) ? value : {};
  return {
    title: asString(source.title),
    description: asString(source.description),
  };
}

function sanitizeList<T>(
  value: unknown,
  fallback: T[],
  sanitizeItem: (item: unknown) => T,
) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.map(sanitizeItem);
}

export function normalizeCmsContent(value: unknown): CmsContent {
  const source = isRecord(value) ? value : {};

  return {
    company: sanitizeCompany(source.company),
    stats: sanitizeList(source.stats, defaultCmsContent.stats, sanitizeStat),
    services: sanitizeList(
      source.services,
      defaultCmsContent.services,
      sanitizeService,
    ),
    portfolio: sanitizeList(
      source.portfolio,
      defaultCmsContent.portfolio,
      sanitizePortfolioItem,
    ),
    whyChooseUs: sanitizeList(
      source.whyChooseUs,
      defaultCmsContent.whyChooseUs,
      sanitizeWhyChooseUsItem,
    ),
    policies: sanitizeList(
      source.policies,
      defaultCmsContent.policies,
      sanitizeServicePolicy,
    ),
    testimonials: sanitizeList(
      source.testimonials,
      defaultCmsContent.testimonials,
      sanitizeTestimonial,
    ),
    faqs: sanitizeList(source.faqs, defaultCmsContent.faqs, sanitizeFaq),
  };
}

async function readLocalCmsContent() {
  try {
    const file = await fs.readFile(cmsFilePath, "utf8");
    return normalizeCmsContent(JSON.parse(file));
  } catch (error) {
    if (
      isRecord(error) &&
      (error.code === "ENOENT" || error.name === "SyntaxError")
    ) {
      return defaultCmsContent;
    }

    throw error;
  }
}

async function readBlobCmsContent() {
  try {
    const { get } = await import("@vercel/blob");
    const result = await get(cmsBlobPathname, { access: "public" });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return defaultCmsContent;
    }

    const file = await new Response(result.stream).text();
    return normalizeCmsContent(JSON.parse(file));
  } catch {
    return defaultCmsContent;
  }
}

export async function readCmsContent() {
  if (isBlobStorageConfigured()) {
    return readBlobCmsContent();
  }

  return readLocalCmsContent();
}

async function writeLocalCmsContent(content: CmsContent) {
  await fs.mkdir(path.dirname(cmsFilePath), { recursive: true });
  await fs.writeFile(cmsFilePath, `${JSON.stringify(content, null, 2)}\n`);

  return content;
}

async function writeBlobCmsContent(content: CmsContent) {
  const { put } = await import("@vercel/blob");

  await put(cmsBlobPathname, `${JSON.stringify(content, null, 2)}\n`, {
    access: "public",
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json; charset=utf-8",
  });

  return content;
}

export async function writeCmsContent(value: unknown) {
  const content = normalizeCmsContent(value);

  if (isBlobStorageConfigured()) {
    await writeBlobCmsContent(content);
  } else {
    await writeLocalCmsContent(content);
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return content;
}
