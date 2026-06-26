import type { Metadata } from "next";
import CategoryLandingPage from "@/components/CategoryLandingPage";
import { getCategoryPage } from "@/data/categoryLandingPages";
import { absoluteUrl } from "@/data/site";

const config = getCategoryPage("video-tools")!;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: absoluteUrl("/video-tools") },
  openGraph: { title: config.title, description: config.description, url: absoluteUrl("/video-tools") },
  twitter: { card: "summary_large_image", title: config.title, description: config.description },
};

export default function VideoToolsPage() {
  return <CategoryLandingPage config={config} />;
}
