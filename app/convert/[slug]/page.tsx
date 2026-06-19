import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolRenderer from "@/components/converters/ToolRenderer";
import { getToolBySlug } from "@/data/tools";
import { getToolFaqs } from "@/data/toolFaqs";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { absoluteUrl, SITE_URL } from "@/data/site";
import { getRelatedTools } from "@/data/relatedTools";
import AffiliatePlacementBlock from "@/components/AffiliatePlacementBlock";
import { getPlacement } from "@/data/monetization";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    return {
      title: "Tool Not Found | A2ZConvertor",
    };
  }

  const canonicalPath = `/convert/${tool.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  return {
    title: `${tool.title} - Free Online Tool | A2ZConvertor`,
    description: tool.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.title} - Free Online Tool`,
      description: tool.description,
      url: canonicalUrl,
      siteName: "A2ZConvertor",
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} - Free Online Tool`,
      description: tool.description,
    },
  };
}
export default async function ConvertPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool);
  const faqs = getToolFaqs(tool.slug, tool);
  const seoContent = getToolSeoContent(tool);
  const placement = getPlacement("tool");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.title,
      applicationCategory: "WebApplication",
      operatingSystem: "Any",
      description: tool.description,
      url: absoluteUrl(`/convert/${tool.slug}`),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
      },
      publisher: {
        "@type": "Organization",
        name: "A2ZConvertor",
        url: SITE_URL,
      },
    }),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
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
    }),
  }}
/>
      <section className="px-6 py-24">
  <div className="mx-auto max-w-4xl">
    <ToolRenderer tool={tool} />
  </div>
</section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-black">
            How to use this tool
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {seoContent.howToSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-slate-900 p-6"
              >
                <h3 className="mb-2 font-bold">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="mb-4 text-3xl font-black">
            Why use this {tool.title}?
          </h2>

          <div className="space-y-4 text-slate-400">
            {seoContent.whyUse.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-black">Related Tools</h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Continue with tools that match this format, category or workflow.
            </p>
          </div>

          <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((related) => (
              <Link
                key={related.slug}
                href={`/convert/${related.slug}`}
                className="group flex min-h-56 flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60 hover:bg-slate-900"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-300">
                  {related.category}
                </p>
                <h3 className="mb-2 text-xl font-bold">
                  {related.name}
                </h3>

                <p className="line-clamp-3 text-slate-400">
                  {related.description}
                </p>
                <span className="mt-auto pt-5 text-sm font-semibold text-blue-300 transition group-hover:text-blue-200">
                  Open {related.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-black">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
                >
                  <h3 className="mb-2 font-bold">{faq.question}</h3>
                  <p className="text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {placement && <AffiliatePlacementBlock placement={placement} />}

      <Footer />
    </main>
  );
}
