import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { getCategoryPage } from "@/data/categoryLandingPages";
import { absoluteUrl } from "@/data/site";

const config = getCategoryPage("audio-tools")!;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: absoluteUrl("/audio-tools") },
  openGraph: { title: config.title, description: config.description, url: absoluteUrl("/audio-tools") },
  twitter: { card: "summary_large_image", title: config.title, description: config.description },
};

export default function AudioToolsPage() {
  return <CategoryLandingPage config={config} />;
}
