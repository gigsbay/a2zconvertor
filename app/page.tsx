import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PopularTools from "@/components/home/PopularTools";
import AIHomeCTA from "@/components/home/AIHomeCTA";
import ResourceHighlights from "@/components/home/ResourceHighlights";
import WhyA2Z from "@/components/home/WhyA2Z";
import HomeFAQ from "@/components/home/HomeFAQ";
import Footer from "@/components/layout/Footer";
import SupportCTA from "@/components/SupportCTA";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "A2ZConvertor - Free Online File, PDF, Image and AI Tools",
  description:
    "Use free browser-based file converters, PDF tools, image tools and Gemini-powered AI Creator Tools with no account required.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "A2ZConvertor - Free Online File, PDF, Image and AI Tools",
    description:
      "Free browser-based converters, PDF tools, image tools and AI Creator Tools for everyday productivity.",
    url: SITE_URL,
    siteName: "A2ZConvertor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A2ZConvertor - Free Online File, PDF, Image and AI Tools",
    description:
      "Free browser-based converters, PDF tools, image tools and AI Creator Tools.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "A2ZConvertor",
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${absoluteUrl("/tools")}?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "A2ZConvertor",
            url: SITE_URL,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            description:
              "A free browser-based toolkit with file converters, PDF tools, image tools and AI Creator Tools.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "A2ZConvertor",
            url: SITE_URL,
            contactPoint: {
              "@type": "ContactPoint",
              email: "support@a2zconvertor.co.uk",
              contactType: "customer support",
            },
          },
        ]}
      />
      <Hero />
      <PopularTools />
      <AIHomeCTA />
      <ResourceHighlights />
      <WhyA2Z />
      <HomeFAQ />
      <SupportCTA />
      <Footer />
    </main>
  );
}