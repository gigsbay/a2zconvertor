import type { MetadataRoute } from "next";
import { comparisonSummaries } from "@/data/comparisonIndex";
import { resourceSummaries } from "@/data/resourceIndex";
import { absoluteUrl } from "@/data/site";
import { tools } from "@/data/tools";

const LAST_MODIFIED = new Date("2026-07-19T00:00:00.000Z");

export const dynamic = "force-static";

const indexableStaticPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ai-tools", changeFrequency: "weekly", priority: 0.9 },
  { path: "/image-tools", changeFrequency: "weekly", priority: 0.85 },
  { path: "/pdf-tools", changeFrequency: "weekly", priority: 0.85 },
  { path: "/video-tools", changeFrequency: "weekly", priority: 0.7 },
  { path: "/audio-tools", changeFrequency: "weekly", priority: 0.7 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.75 },
  { path: "/launch", changeFrequency: "monthly", priority: 0.65 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/support", changeFrequency: "monthly", priority: 0.45 },
  { path: "/affiliate-disclosure", changeFrequency: "yearly", priority: 0.25 },
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
      priority: tool.category === "AI Creator Tools" ? 0.85 : 0.8,
    }));

  const comparisonPages: MetadataRoute.Sitemap = comparisonSummaries.map((page) => ({
    url: absoluteUrl(`/compare/${page.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const resourcePages: MetadataRoute.Sitemap = resourceSummaries.map((page) => ({
    url: absoluteUrl(`/resources/${page.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  return [...staticPages, ...toolPages, ...comparisonPages, ...resourcePages];
}
