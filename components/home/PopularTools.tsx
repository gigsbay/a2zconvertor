import Link from "next/link";
import { tools } from "@/data/tools";

const popularImageTools = tools
  .filter((tool) => tool.category === "Image Tools")
  .slice(0, 6);

const popularPdfTools = tools
  .filter((tool) => tool.category === "PDF Tools")
  .slice(0, 6);

function ToolSection({
  title,
  description,
  tools,
}: {
  title: string;
  description: string;
  tools: typeof popularImageTools;
}) {
  return (
    <div>
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

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/convert/${tool.slug}`}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60 hover:bg-slate-900"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-300">
              {tool.inputLabel} to {tool.outputLabel}
            </p>

            <h3 className="mb-2 text-xl font-bold">{tool.name}</h3>

            <p className="text-sm leading-6 text-slate-400">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function PopularTools() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl space-y-20">
        <ToolSection
          title="Popular Image Tools"
          description="Quick browser-based tools for converting, resizing, compressing and editing everyday image files."
          tools={popularImageTools}
        />

        <ToolSection
          title="Popular PDF Tools"
          description="Useful PDF workflows for merging, splitting, compressing, rotating and editing documents online."
          tools={popularPdfTools}
        />
      </div>
    </section>
  );
}
