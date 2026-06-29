import Link from "next/link";
import { tools } from "@/data/tools";
import { QQTUBE_AFFILIATE_URL, SPONSORED_LINK_REL } from "@/utils/affiliate";
import { getToolActionLabel } from "@/utils/toolActions";

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

function isAiTool(tool: Tool) {
  return (
    tool.category === "AI Tools" ||
    tool.category === "AI Creator Tools" ||
    tool.slug.includes("ai") ||
    tool.name.toLowerCase().includes("ai") ||
    tool.title.toLowerCase().includes("ai")
  );
}
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
            <article
              key={tool.slug}
              className="flex min-h-64 flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60 hover:bg-slate-900"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-300">
                {tool.category}
              </p>

              <h3 className="mb-2 text-xl font-bold">{tool.name}</h3>

              <p className="text-sm leading-6 text-slate-400">
                {tool.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-5">
                <Link
                  href={`/convert/${tool.slug}`}
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500"
                >
                  {isAiTool(tool) ? getToolActionLabel(tool) : "Open tool"}
                </Link>
                {isAiTool(tool) && (
                  <a
                    href={QQTUBE_AFFILIATE_URL}
                    target="_blank"
                    rel={SPONSORED_LINK_REL}
                    className="rounded-full border border-purple-400/40 px-3 py-2 text-xs font-bold text-purple-200 hover:bg-purple-500/10"
                  >
                    Grow Social Media
                  </a>
                )}
              </div>
            </article>
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
