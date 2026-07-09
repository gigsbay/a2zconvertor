import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

const latestPosts = blogPosts.slice(0, 3);

export default function LatestGuides() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-300">Latest Guides</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Learn practical file workflows</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              Learn how to convert, compress, resize and manage your files online with simple step-by-step tutorials. Explore practical guides for image conversion, PDF tools, file compression, website favicons and more.
            </p>
          </div>
          <Link href="/blog" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
            View all guides
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article key={post.slug} className="flex min-h-72 flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/30 p-6 transition hover:border-blue-500/60">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-300">
                <span>{post.category}</span>
                <span className="text-slate-600">/</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mt-4 text-2xl font-black leading-tight">{post.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex w-fit rounded-full border border-blue-400/40 px-4 py-2 text-sm font-bold text-blue-100 hover:bg-blue-400/10">
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}