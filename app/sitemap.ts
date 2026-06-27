import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/data/site";
import { categoryLandingPages } from "@/data/categoryLandingPages";
import { comparisonPages } from "@/data/comparisonPages";
import { resourceSummaries } from "@/data/resourceIndex";

const LAST_MODIFIED = new Date("2026-06-28T00:00:00.000Z");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/tools"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/cookie-policy"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/request-tool"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: absoluteUrl("/ai-tools"), lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/support"), lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/affiliate-disclosure"), lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
    {
      url: absoluteUrl("/resources"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: absoluteUrl("/advertise"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/partners"),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: absoluteUrl(`/convert/${tool.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categoryLandingPages.map(
    (category) => ({
      url: absoluteUrl(`/${category.slug}`),
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  const resources: MetadataRoute.Sitemap = resourceSummaries.map((page) => ({
    url: absoluteUrl(`/resources/${page.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisons: MetadataRoute.Sitemap = comparisonPages.map((page) => ({
    url: absoluteUrl(`/compare/${page.slug}`),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...resources,
    ...comparisons,
    ...toolPages,
  ];
}
