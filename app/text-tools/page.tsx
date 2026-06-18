import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { getCategoryPage } from "@/data/categoryLandingPages";
import { absoluteUrl } from "@/data/site";

const config = getCategoryPage("text-tools")!;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: absoluteUrl("/text-tools") },
  openGraph: { title: config.title, description: config.description, url: absoluteUrl("/text-tools") },
};

export default function TextToolsPage() {
  return <CategoryLandingPage config={config} />;
}
