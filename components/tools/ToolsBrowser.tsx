"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { tools } from "@/data/tools";

const preferredCategories = [
  "All",
  "Image Tools",
  "PDF Tools",
  "Video Tools",
  "Audio Tools",
  "Text Tools",
];

const discoveredCategories = Array.from(
  new Set(tools.map((tool) => tool.category))
).filter((category) => !preferredCategories.includes(category));

const categories = [...preferredCategories, ...discoveredCategories];

export default function ToolsBrowser() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [query, setQuery] = useState("");
  const activeCategory =
    categoryParam && categories.includes(categoryParam) ? categoryParam : "All";

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

  const hasCategoryFilter = activeCategory !== "All";
  const emptyCategory = hasCategoryFilter && !query.trim();

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
          <Link
            key={category}
            href={
              category === "All"
                ? "/tools"
                : `/tools?category=${encodeURIComponent(category)}`
            }
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              activeCategory === category
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-white/10 bg-slate-900 text-slate-300 hover:border-blue-500/60"
            }`}
          >
            {category}
          </Link>
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
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-center">
          <p className="text-slate-300">
            {emptyCategory
              ? "Tools in this category are coming soon. You can request one."
              : "No tools found. Try another search or request a new tool."}
          </p>
          <Link
            href="/request-tool"
            className="mt-4 inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Request a Tool
          </Link>
        </div>
      )}
    </>
  );
}
