import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolRenderer from "@/components/converters/ToolRenderer";
import { getToolBySlug, tools } from "@/data/tools";
import { getToolFaqs } from "@/data/toolFaqs";
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
  const canonicalUrl = `https://a2zconvertor.co.uk${canonicalPath}`;

  return {
    title: `${tool.title} - Free Online Tool | A2ZConvertor`,
    description: tool.description,
    alternates: {
      canonical: canonicalPath,
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

  const relatedTools = tools
    .filter(
      (item) =>
        item.category === tool.category &&
        item.slug !== tool.slug
    )
    .slice(0, 3);
  const faqs = getToolFaqs(tool.slug, tool);

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
      url: `https://a2zconvertor.co.uk/convert/${tool.slug}`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
      },
      publisher: {
        "@type": "Organization",
        name: "A2ZConvertor",
        url: "https://a2zconvertor.co.uk",
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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="mb-2 font-bold">1. Upload</h3>
              <p className="text-slate-400">
                Select your {tool.inputLabel} file from your computer.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="mb-2 font-bold">2. Convert</h3>
              <p className="text-slate-400">
                A2ZConvertor processes your file in your browser where
                possible.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="mb-2 font-bold">3. Download</h3>
              <p className="text-slate-400">
                Download your new {tool.outputLabel} file instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="mb-4 text-3xl font-black">
            Why use this {tool.title}?
          </h2>

          <p className="mb-4 text-slate-400">
            This free online converter helps you change {tool.inputLabel} files
            into {tool.outputLabel} format quickly without installing software.
          </p>

          <p className="text-slate-400">
            Your file is processed directly in your browser where possible,
            making the conversion fast and private.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-black">
            Frequently Asked Questions
          </h2>

          <div className="mb-16 space-y-4">
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

          <h2 className="mb-8 text-3xl font-black">
            Related Tools
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedTools.map((related) => (
              <Link
                key={related.slug}
                href={`/convert/${related.slug}`}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60"
              >
                <h3 className="mb-2 text-xl font-bold">
                  {related.name}
                </h3>

                <p className="text-slate-400">
                  {related.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
