import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import MoneyPageSections from "@/components/MoneyPageSections";
import Navbar from "@/components/layout/Navbar";
import { comparisonPages, getComparisonPage } from "@/data/comparisonPages";
import { getMoneyPageContent } from "@/data/moneyPageContent";
import { absoluteUrl } from "@/data/site";
import { tools } from "@/data/tools";
import AffiliateRecommendationCard from "@/components/AffiliateRecommendationCard";
import { getAffiliatePlacementsForComparison } from "@/data/monetization";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonPage(slug);
  if (!comparison) return { title: "Comparison Not Found" };

  const url = absoluteUrl(`/compare/${comparison.slug}`);
  return {
    title: comparison.title,
    description: comparison.description,
    alternates: { canonical: url },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url,
      type: "article",
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonPage(slug);
  if (!comparison) notFound();

  const relevantTools = comparison.toolSlugs
    .map((toolSlug) => tools.find((tool) => tool.slug === toolSlug))
    .filter((tool): tool is (typeof tools)[number] => Boolean(tool));
  const affiliatePlacements = getAffiliatePlacementsForComparison(comparison.slug);
  const moneyContent = getMoneyPageContent(comparison.slug);
  const faqs = moneyContent?.faqs ?? comparison.faqs;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <article className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase text-blue-300">
            {moneyContent ? "Independent comparison" : "Format comparison"}
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">
            {comparison.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {comparison.explanation}
          </p>

          {moneyContent ? (
            <MoneyPageSections content={moneyContent} />
          ) : (
            <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="p-4 text-slate-400">Feature</th>
                    <th className="p-4 text-xl">{comparison.left}</th>
                    <th className="p-4 text-xl">{comparison.right}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row) => (
                    <tr key={row.feature} className="border-t border-white/10">
                      <th className="p-4 font-semibold text-slate-300">
                        {row.feature}
                      </th>
                      <td className="p-4 text-slate-400">{row.left}</td>
                      <td className="p-4 text-slate-400">{row.right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <section className="mt-16">
            <h2 className="text-3xl font-black">Which should you use?</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {comparison.recommendation.map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 leading-7 text-slate-300"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-black">Try a relevant tool</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
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
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
          {affiliatePlacements.length > 0 && (
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {affiliatePlacements.map((placement) => (
                <AffiliateRecommendationCard key={placement.id} placement={placement} />
              ))}
            </div>
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

      <Footer />
    </main>
  );
}
