import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolsBrowser from "@/components/tools/ToolsBrowser";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/data/site";

const categories = Array.from(new Set(tools.map((tool) => tool.category)));

export const metadata: Metadata = {
  title: "All Online Tools",
  description:
    "Browse A2ZConvertor image, PDF, video, audio and text tools.",
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  openGraph: {
    title: "All Online Tools | A2ZConvertor",
    description:
      "Browse A2ZConvertor image, PDF, video, audio and text tools.",
    url: absoluteUrl("/tools"),
  },
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

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
          <Link
            key={tool.slug}
            href={`/convert/${tool.slug}`}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
          >
            <div className="mb-3 text-sm font-semibold text-blue-400">
              {tool.category}
            </div>
            <h2 className="mb-2 text-2xl font-bold">{tool.name}</h2>
            <p className="text-slate-400">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
