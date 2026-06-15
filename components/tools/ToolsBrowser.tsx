"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";

const categories = ["All", ...Array.from(new Set(tools.map((tool) => tool.category)))];

export default function ToolsBrowser() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = useMemo(() => {
    const search = query.toLowerCase().trim();

    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;

      const matchesSearch =
        !search ||
        tool.name.toLowerCase().includes(search) ||
        tool.title.toLowerCase().includes(search) ||
        tool.description.toLowerCase().includes(search) ||
        tool.slug.toLowerCase().includes(search) ||
        tool.category.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [query, activeCategory]);

  return (
    <>
      <div className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full rounded-2xl border border-white/10 bg-slate-900 p-5 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              activeCategory === category
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-white/10 bg-slate-900 text-slate-300 hover:border-blue-500/60"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/convert/${tool.slug}`}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60 hover:bg-slate-900"
          >
            <div className="mb-3 text-sm font-semibold text-blue-400">
              {tool.category}
            </div>

            <h2 className="mb-2 text-2xl font-bold">{tool.name}</h2>

            <p className="text-slate-400">{tool.description}</p>
          </Link>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <p className="mt-10 text-center text-slate-400">
          No tools found. Try another search.
        </p>
      )}
    </>
  );
}