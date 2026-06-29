import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolsBrowser from "@/components/tools/ToolsBrowser";
import JsonLd from "@/components/JsonLd";
import { tools } from "@/data/tools";
import { absoluteUrl, SITE_URL } from "@/data/site";
import { QQTUBE_AFFILIATE_URL, SPONSORED_LINK_REL } from "@/utils/affiliate";
import { getToolActionLabel } from "@/utils/toolActions";

const categories = Array.from(new Set(tools.map((tool) => tool.category)));

function isAiTool(tool: (typeof tools)[number]) {
  return (
    tool.category === "AI Tools" ||
    tool.category === "AI Creator Tools" ||
    tool.slug.includes("ai") ||
    tool.name.toLowerCase().includes("ai") ||
    tool.title.toLowerCase().includes("ai")
  );
}

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "All Online Tools",
  description:
    "Browse A2ZConvertor image, PDF, video, audio, text, social media and AI creator tools.",
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  openGraph: {
    title: "All Online Tools | A2ZConvertor",
    description:
      "Browse A2ZConvertor image, PDF, video, audio, text, social media and AI creator tools.",
    url: absoluteUrl("/tools"),
  },
  twitter: {
    card: "summary_large_image",
    title: "All Online Tools | A2ZConvertor",
    description:
      "Browse A2ZConvertor image, PDF, video, audio, text, social media and AI creator tools.",
  },
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "All Online Tools",
          description: metadata.description,
          url: absoluteUrl("/tools"),
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "All Tools", item: absoluteUrl("/tools") },
            ],
          },
        }}
      />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl">
              All Tools
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-slate-400">
              Browse all available A2ZConvertor tools. Search by format,
              category or task.
            </p>
          </div>

          <Suspense
            fallback={
              <StaticToolsFallback />
            }
          >
            <ToolsBrowser />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StaticToolsFallback() {
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href="/tools"
          className="rounded-full border border-blue-500 bg-blue-500 px-5 py-2 text-sm font-semibold text-white"
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/tools?category=${encodeURIComponent(category)}`}
            className="rounded-full border border-white/10 bg-slate-900 px-5 py-2 text-sm font-semibold text-slate-300"
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <article
            key={tool.slug}
            className="flex min-h-56 flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-6"
          >
            <div className="mb-3 text-sm font-semibold text-blue-400">
              {tool.category}
            </div>
            <h2 className="mb-2 text-2xl font-bold">{tool.name}</h2>
            <p className="text-slate-400">{tool.description}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-5">
              <Link href={`/convert/${tool.slug}`} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500">{isAiTool(tool) ? getToolActionLabel(tool) : "Open tool"}</Link>
              {isAiTool(tool) && (
                <a href={QQTUBE_AFFILIATE_URL} target="_blank" rel={SPONSORED_LINK_REL} className="rounded-full border border-purple-400/40 px-3 py-1 text-xs font-bold text-purple-200 hover:bg-purple-500/10">Grow Social Media</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
