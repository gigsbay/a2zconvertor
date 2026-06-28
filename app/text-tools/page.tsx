import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { getCategoryPage } from "@/data/categoryLandingPages";
import { absoluteUrl } from "@/data/site";

const config = getCategoryPage("text-tools")!;

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: absoluteUrl("/text-tools") },
  openGraph: { title: config.title, description: config.description, url: absoluteUrl("/text-tools") },
  twitter: { card: "summary_large_image", title: config.title, description: config.description },
};

export default function TextToolsPage() {
  return <CategoryLandingPage config={config} />;
}
