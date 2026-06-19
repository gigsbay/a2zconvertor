import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { resourcePages } from "@/data/resourcePages";
import { absoluteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Free File Tools, Guides and Resources",
  description:
    "Practical guides for choosing browser-based PDF, image, audio and productivity tools.",
  alternates: { canonical: absoluteUrl("/resources") },
  openGraph: {
    title: "Free File Tools, Guides and Resources | A2ZConvertor",
    description:
      "Practical guides for choosing browser-based PDF, image, audio and productivity tools.",
    url: absoluteUrl("/resources"),
  },
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="px-6 pb-16 pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase text-blue-300">
            Guides and resources
          </p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black tracking-tight md:text-6xl">
            Make better choices about file tools
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Straightforward guides to browser-based conversion, compression,
            privacy and practical file workflows.
          </p>
        </div>
      </section>
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {resourcePages.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="group rounded-2xl border border-white/10 bg-slate-900/70 p-7 transition hover:border-blue-500/60"
            >
              <p className="text-xs font-semibold uppercase text-blue-300">
                Practical guide
              </p>
              <h2 className="mt-3 text-2xl font-black">{resource.title}</h2>
              <p className="mt-3 leading-7 text-slate-400">
                {resource.description}
              </p>
              <span className="mt-6 inline-flex text-sm font-semibold text-blue-300">
                Read guide
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
