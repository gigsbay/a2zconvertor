import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { getCategoryPage } from "@/data/categoryLandingPages";
import { absoluteUrl } from "@/data/site";

const config = getCategoryPage("image-tools")!;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: absoluteUrl("/image-tools") },
  openGraph: { title: config.title, description: config.description, url: absoluteUrl("/image-tools") },
};

export default function ImageToolsPage() {
  return <CategoryLandingPage config={config} />;
}
