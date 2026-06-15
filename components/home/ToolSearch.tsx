"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";

export default function ToolSearch() {
  const [query, setQuery] = useState("");

  const filteredTools = useMemo(() => {
    const search = query.toLowerCase().trim();

    if (!search) return tools;

    return tools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(search) ||
        tool.title.toLowerCase().includes(search) ||
        tool.description.toLowerCase().includes(search) ||
        tool.category.toLowerCase().includes(search) ||
        tool.slug.toLowerCase().includes(search)
      );
    });
  }, [query]);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-4xl font-black">
          Find a Tool
        </h2>

        <p className="mb-8 text-center text-slate-400">
          Search image, PDF and conversion tools instantly.
        </p>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools, e.g. compress, resize, PDF, WEBP..."
          className="mb-8 w-full rounded-2xl border border-white/10 bg-slate-900 p-5 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/convert/${tool.slug}`}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60"
            >
              <p className="mb-2 text-sm text-blue-400">
                {tool.category}
              </p>

              <h3 className="mb-2 text-xl font-bold">
                {tool.name}
              </h3>

              <p className="text-sm text-slate-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p className="mt-8 text-center text-slate-400">
            No tools found. Try another search.
          </p>
        )}
      </div>
    </section>
  );
}