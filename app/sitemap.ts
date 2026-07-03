import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/data/site";

const LAST_MODIFIED = new Date("2026-06-28T00:00:00.000Z");

export const dynamic = "force-static";

const indexableStaticPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
  { path: "/image-tools", changeFrequency: "weekly", priority: 0.85 },
  { path: "/pdf-tools", changeFrequency: "weekly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = indexableStaticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: LAST_MODIFIED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const toolPages: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.isLive === true && tool.indexable === true)
    .map((tool) => ({
      url: absoluteUrl(`/convert/${tool.slug}`),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...toolPages];
}