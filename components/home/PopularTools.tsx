import Link from "next/link";
import { tools } from "@/data/tools";

type Tool = (typeof tools)[number];

const imageTools = tools.filter((tool) => tool.category === "Image Tools");
const pdfTools = tools.filter((tool) => tool.category === "PDF Tools");

const popularTools = [
  ...imageTools.slice(0, 3),
  ...pdfTools.slice(0, 3),
  ...tools.filter((tool) => tool.category === "Video Tools").slice(0, 1),
  ...tools.filter((tool) => tool.category === "Audio Tools").slice(0, 1),
].filter(Boolean);

const recentlyAddedTools = tools.slice(-8).reverse();

function ToolSection({
  title,
  description,
  tools,
}: {
  title: string;
  description: string;
  tools: Tool[];
}) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
              {title}
            </h2>

            <p className="max-w-2xl text-lg text-slate-400">{description}</p>
          </div>

          <Link href="/tools" className="font-semibold text-blue-400">
            View all tools &rarr;
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/convert/${tool.slug}`}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60 hover:bg-slate-900"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-300">
                {tool.category}
              </p>

              <h3 className="mb-2 text-xl font-bold">{tool.name}</h3>

              <p className="text-sm leading-6 text-slate-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PopularTools() {
  return (
    <>
      <ToolSection
        title="Popular Tools"
        description="Start with commonly used converters, compressors and file editing tools across the current A2ZConvertor library."
        tools={popularTools}
      />

      <ToolSection
        title="Popular Image Tools"
        description="Quick browser-based tools for converting, resizing, compressing and editing everyday image files."
        tools={imageTools.slice(0, 8)}
      />

      <ToolSection
        title="Popular PDF Tools"
        description="Useful PDF workflows for merging, splitting, compressing, rotating and editing documents online."
        tools={pdfTools.slice(0, 8)}
      />

      <ToolSection
        title="Recently Added Tools"
        description="Explore the newest additions to A2ZConvertor, pulled directly from the current tool directory."
        tools={recentlyAddedTools}
      />
    </>
  );
}
