import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/data/site";
import { categoryLandingPages } from "@/data/categoryLandingPages";

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

  return [...staticPages, ...categoryPages, ...toolPages];
}
