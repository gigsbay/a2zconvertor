import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/data/site";
import { categoryLandingPages } from "@/data/categoryLandingPages";
import { comparisonPages } from "@/data/comparisonPages";
import { resourcePages } from "@/data/resourcePages";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/tools"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/request-tool"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: absoluteUrl("/ai-tools"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/support"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    {
      url: absoluteUrl("/resources"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: absoluteUrl("/advertise"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/partners"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: absoluteUrl(`/convert/${tool.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categoryLandingPages.map(
    (category) => ({
      url: absoluteUrl(`/${category.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  const resources: MetadataRoute.Sitemap = resourcePages.map((page) => ({
    url: absoluteUrl(`/resources/${page.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisons: MetadataRoute.Sitemap = comparisonPages.map((page) => ({
    url: absoluteUrl(`/compare/${page.slug}`),
    lastModified: new Date(),
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
