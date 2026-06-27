"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";

export default function Hero() {
  const [query, setQuery] = useState("");
  const toolCount = tools.length;

  const filteredTools = useMemo(() => {
    const search = query.toLowerCase().trim();

    if (!search) return [];

    return tools
      .filter((tool) => {
        return (
          tool.name.toLowerCase().includes(search) ||
          tool.title.toLowerCase().includes(search) ||
          tool.description.toLowerCase().includes(search) ||
          tool.slug.toLowerCase().includes(search) ||
          tool.category.toLowerCase().includes(search)
        );
      })
      .slice(0, 6);
  }, [query]);

  return (
    <section className="px-6 py-28 text-center">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          {toolCount}+ free tools plus 10/day AI Creator Tools
        </div>

        <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
          Free File Tools and AI Creator Tools
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-lg text-slate-400 md:text-xl">
          A browser-first toolkit for PDFs, images, video/audio utilities and Gemini-powered creator drafts with 10 free AI generations per day.
        </p>

        <div className="relative mx-auto max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3 shadow-2xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search JPG to PNG, Compress Image, Resize Image..."
              className="w-full rounded-xl bg-slate-950 px-6 py-5 text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {filteredTools.length > 0 && (
            <div className="absolute left-0 right-0 z-20 mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-left shadow-2xl">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/convert/${tool.slug}`}
                  className="block border-b border-white/10 p-4 transition last:border-b-0 hover:bg-white/5"
                >
                  <div className="font-bold text-white">{tool.name}</div>
                  <div className="text-sm text-slate-400">
                    {tool.description}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/ai-tools" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">Try AI Creator Tools</Link>
          <Link href="/tools" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-blue-500/60">Browse all tools</Link>
          <Link href="/pdf-tools" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-blue-500/60">Open PDF tools</Link>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
          <Link
            href="/convert/jpg-to-png"
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-blue-500/60"
          >
            JPG to PNG
          </Link>

          <Link
            href="/convert/compress-image"
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-blue-500/60"
          >
            Compress Image
          </Link>

          <Link
            href="/convert/image-to-pdf"
            className="rounded-full border border-white/10 px-4 py-2 transition hover:border-blue-500/60"
          >
            Image to PDF
          </Link>
        </div>
      </div>
    </section>
  );
}
