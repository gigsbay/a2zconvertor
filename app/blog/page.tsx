import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/layout/Navbar";
import { blogSummaries } from "@/data/blogIndex";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from "@/data/site";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "A2ZConvertor Blog - File Conversion Guides and Online Tool Tips",
  description:
    "Simple guides for image conversion, PDF tools, file compression, resizing, favicons and online productivity.",
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: "A2ZConvertor Blog - File Conversion Guides and Online Tool Tips",
    description:
      "Simple guides for image conversion, PDF tools, file compression, resizing, favicons and online productivity.",
    url: absoluteUrl("/blog"),
    siteName: "A2ZConvertor",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "A2ZConvertor Blog - File Conversion Guides and Online Tool Tips",
    description:
      "Simple guides for image conversion, PDF tools, file compression, resizing, favicons and online productivity.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "A2ZConvertor Blog - File Conversion Guides and Online Tool Tips",
          description: metadata.description,
          url: absoluteUrl("/blog"),
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            ],
          },
        }}
      />
      <section className="px-6 pb-12 pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-300">File guides and tutorials</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">A2ZConvertor Blog</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Simple guides for everyday file tasks. Learn how to convert images, compress files, resize photos, create favicons, turn PDFs into images and choose the right file format for your needs.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogSummaries.map((post) => (
            <article key={post.slug} className="flex min-h-80 flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 p-6 transition hover:border-blue-500/60">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-300">
                <span>{post.category}</span>
                <span className="text-slate-600">/</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <h2 className="mt-4 text-2xl font-black leading-tight">{post.title}</h2>
              <p className="mt-3 leading-7 text-slate-400">{post.description}</p>
              <p className="mt-4 text-sm font-semibold text-purple-200">{post.readingTime}</p>
              <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex w-fit rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500">
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
}