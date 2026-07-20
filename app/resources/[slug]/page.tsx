import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import MoneyPageSections from "@/components/MoneyPageSections";
import NewsletterSignup from "@/components/NewsletterSignup";
import QQTubeAffiliateBanner from "@/components/QQTubeAffiliateBanner";
import ToolBadge from "@/components/ToolBadge";
import Navbar from "@/components/layout/Navbar";
import SupportCTA from "@/components/SupportCTA";
import AffiliateRecommendationCard from "@/components/AffiliateRecommendationCard";
import { getMoneyPageContent } from "@/data/moneyPageContent";
import { getAffiliatePlacementsForResource } from "@/data/monetization";
import { getResourcePage, resourcePages } from "@/data/resourcePages";
import { absoluteUrl, SITE_URL } from "@/data/site";
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
    twitter: {
      card: "summary_large_image",
      title: resource.title,
      description: resource.description,
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
  const affiliatePlacements = getAffiliatePlacementsForResource(resource.slug);
  const moneyContent = getMoneyPageContent(resource.slug);
  const faqs = moneyContent?.faqs ?? resource.faqs;
  const relatedResources = resourcePages
    .filter((candidate) => candidate.slug !== resource.slug)
    .filter((candidate) => candidate.toolSlugs.some((toolSlug) => resource.toolSlugs.includes(toolSlug)))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: resource.title,
            description: resource.description,
            url: absoluteUrl(`/resources/${resource.slug}`),
            mainEntityOfPage: absoluteUrl(`/resources/${resource.slug}`),
            publisher: {
              "@type": "Organization",
              name: "A2ZConvertor",
              url: SITE_URL,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Resources",
                item: absoluteUrl("/resources"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: resource.title,
                item: absoluteUrl(`/resources/${resource.slug}`),
              },
            ],
          },
        ]}
      />
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
          {relevantTools[0] && (
            <Link href={`/convert/${relevantTools[0].slug}`} className="mt-7 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">
              Try the free tool: {relevantTools[0].name}
            </Link>
          )}

          {moneyContent ? (
            <MoneyPageSections content={moneyContent} />
          ) : (
            <div className="mt-12 grid gap-6">
              {resource.sections.map((section) => (
                <section
                  key={section.heading}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-7"
                >
                  <h2 className="text-2xl font-black">{section.heading}</h2>
                  <p className="mt-4 leading-7 text-slate-400">
                    {section.body}
                  </p>
                  <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-300">
                    Key points
                  </h3>
                  <ul className="mt-3 grid gap-3 text-slate-300 sm:grid-cols-3">
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
          )}

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
                  <ToolBadge kind={tool.category === "AI Creator Tools" ? "ai" : "free"} />
                  <h3 className="mt-2 text-xl font-bold">{tool.name}</h3>
                  <p className="mt-3 leading-6 text-slate-400">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
          <section className="mt-16">
            <QQTubeAffiliateBanner variant="creator" />
          </section>


          {relatedResources.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-black">Related articles</h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Keep learning with nearby guides that use similar tools or file
                workflows.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {relatedResources.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/resources/${related.slug}`}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:border-purple-400/50"
                  >
                    <p className="text-sm font-bold uppercase text-purple-300">
                      Resource guide
                    </p>
                    <h3 className="mt-2 font-bold text-white">{related.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          <section className="mt-16">
            <h2 className="text-3xl font-black">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((faq) => (
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
      <NewsletterSignup />
      {affiliatePlacements.length > 0 && (
        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
            {affiliatePlacements.map((placement) => (
              <AffiliateRecommendationCard
                key={placement.id}
                placement={placement}
              />
            ))}
          </div>
        </section>
      )}
      <SupportCTA />
      <Footer />
    </main>
  );
}
