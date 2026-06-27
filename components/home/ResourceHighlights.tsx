import Link from "next/link";
import { resourcePages } from "@/data/resourcePages";

const highlightedSlugs = [
  "free-ai-social-media-tools",
  "free-ai-writing-tools",
  "best-free-pdf-tools",
  "best-pdf-compressor-tools",
  "how-to-compress-pdf-for-email",
  "best-free-online-file-converters",
];

const highlightedResources = highlightedSlugs
  .map((slug) => resourcePages.find((resource) => resource.slug === slug))
  .filter((resource): resource is (typeof resourcePages)[number] => Boolean(resource));

export default function ResourceHighlights() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
              Guides for better tool choices
            </h2>
            <p className="max-w-2xl text-lg text-slate-400">
              Learn when free browser tools are enough, when desktop software is
              better, and how to get more from AI Creator Tools.
            </p>
          </div>
          <Link href="/resources" className="font-semibold text-blue-400">
            View all resources &rarr;
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {highlightedResources.map((resource) => (
            <Link key={resource.slug} href={`/resources/${resource.slug}`} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:border-blue-500/60">
              <p className="text-xs font-semibold uppercase text-blue-300">Resource guide</p>
              <h3 className="mt-3 text-xl font-bold">{resource.title}</h3>
              <p className="mt-3 leading-6 text-slate-400">{resource.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}