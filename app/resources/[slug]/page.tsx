import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliatePlacementBlock from "@/components/AffiliatePlacementBlock";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import NewsletterSignup from "@/components/NewsletterSignup";
import RecommendedSoftwareCard from "@/components/RecommendedSoftwareCard";
import { getPlacement } from "@/data/monetization";
import { getResourcePage, resourcePages } from "@/data/resourcePages";
import { absoluteUrl } from "@/data/site";
import { tools } from "@/data/tools";

export function generateStaticParams() {
  return resourcePages.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourcePage(slug);
  if (!resource) return { title: "Resource Not Found" };
  const url = absoluteUrl(`/resources/${resource.slug}`);
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: url },
    openGraph: {
      title: resource.title,
      description: resource.description,
      url,
      type: "article",
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourcePage(slug);
  if (!resource) notFound();

  const relevantTools = resource.toolSlugs
    .map((toolSlug) => tools.find((tool) => tool.slug === toolSlug))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));
  const primaryPlacement = getPlacement("resource", 0);
  const secondaryPlacement = getPlacement("resource", 1);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <article className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase text-blue-300">
            A2ZConvertor resource
          </p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black tracking-tight">
            {resource.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {resource.intro}
          </p>

          <div className="mt-12 grid gap-6">
            {resource.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-7"
              >
                <h2 className="text-2xl font-black">{section.heading}</h2>
                <p className="mt-4 leading-7 text-slate-400">{section.body}</p>
                <ul className="mt-5 grid gap-3 text-slate-300 sm:grid-cols-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-xl border border-white/10 bg-slate-950/60 p-4"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="mt-16">
            <h2 className="text-3xl font-black">Related tools</h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Try these free browser-based tools for the workflows covered in
              this guide.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {relevantTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/convert/${tool.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:border-blue-500/60"
                >
                  <p className="text-xs font-semibold uppercase text-blue-300">
                    {tool.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{tool.name}</h3>
                  <p className="mt-3 leading-6 text-slate-400">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {secondaryPlacement && (
            <div className="mt-12">
              <RecommendedSoftwareCard placement={secondaryPlacement} />
            </div>
          )}

          <section className="mt-16">
            <h2 className="text-3xl font-black">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {resource.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
                >
                  <h3 className="font-bold">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
      {primaryPlacement && (
        <AffiliatePlacementBlock placement={primaryPlacement} />
      )}
      <NewsletterSignup />
      <Footer />
    </main>
  );
}
