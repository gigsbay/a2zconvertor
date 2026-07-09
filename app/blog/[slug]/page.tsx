import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/layout/Navbar";
import { blogPosts, getBlogPost, getRelatedBlogPosts } from "@/data/blogPosts";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from "@/data/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Guide Not Found | A2ZConvertor" };
  }

  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: `${post.title} | A2ZConvertor Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: "A2ZConvertor",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post);
  const toolLinks = post.toolLinks ?? (post.toolUrl && post.toolName ? [{ href: post.toolUrl, label: post.toolName }] : []);
  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            mainEntityOfPage: canonicalUrl,
            author: { "@type": "Organization", name: "A2ZConvertor" },
            publisher: { "@type": "Organization", name: "A2ZConvertor", url: SITE_URL },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
              { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
            ],
          },
          ...(post.content.faq
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: post.content.faq.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: { "@type": "Answer", text: faq.answer },
                  })),
                },
              ]
            : []),
        ]}
      />

      <article>
        <header className="px-6 pb-12 pt-20">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-300">
              <span>{post.category}</span>
              <span className="text-slate-600">/</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="text-slate-600">/</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-6xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">{post.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {toolLinks.map((tool) => (
                <Link key={tool.href} href={tool.href} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">
                  Try {tool.label}
                </Link>
              ))}
              <Link href="/tools" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-blue-500/60">
                Browse all tools
              </Link>
            </div>
          </div>
        </header>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/70 p-7 md:p-9">
            <p className="text-lg leading-8 text-slate-300">{post.content.intro}</p>
            <div className="mt-10 space-y-10">
              {post.content.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl font-black">{section.heading}</h2>
                  <div className="mt-4 space-y-4 leading-8 text-slate-300">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </article>

      {post.content.faq && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {post.content.faq.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                  <h3 className="font-bold">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-white/10 bg-slate-900/40 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">Related tools</h2>
            <div className="mt-5 grid gap-3">
              {toolLinks.map((tool) => (
                <Link key={tool.href} href={tool.href} className="rounded-2xl border border-blue-400/30 bg-blue-400/5 p-5 font-semibold text-blue-100 hover:bg-blue-400/10">
                  {tool.label}
                </Link>
              ))}
              <Link href="/tools" className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 font-semibold text-slate-200 hover:border-blue-500/60">
                Browse all A2ZConvertor tools
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black">Related guides</h2>
            <div className="mt-5 grid gap-3">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 hover:border-purple-400/50">
                  <p className="text-sm font-bold uppercase text-purple-300">{related.category}</p>
                  <h3 className="mt-2 font-bold text-white">{related.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
}