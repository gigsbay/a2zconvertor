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
const aiResourceLinks: Record<string, { href: string; label: string }[]> = {
  "instagram-caption-generator": [{ href: "/resources/instagram-caption-ideas", label: "Instagram caption ideas guide" }],
  "tiktok-hashtag-generator": [{ href: "/resources/tiktok-hashtag-ideas", label: "TikTok hashtag ideas guide" }],
  "youtube-title-generator": [{ href: "/resources/youtube-title-ideas", label: "YouTube title ideas guide" }],
  "content-ideas-generator": [{ href: "/resources/content-ideas-for-small-businesses", label: "Content ideas for small businesses" }],
  "social-media-bio-generator": [{ href: "/resources/free-ai-social-media-tools", label: "Free AI social media tools guide" }],
  "hashtag-generator": [{ href: "/resources/free-ai-writing-tools", label: "Free AI writing tools guide" }],
  "blog-title-generator": [{ href: "/resources/free-ai-writing-tools", label: "Free AI writing tools guide" }],
  "email-template-generator": [{ href: "/resources/free-ai-writing-tools", label: "Free AI writing tools guide" }],
  "text-summarizer": [{ href: "/resources/free-ai-writing-tools", label: "Free AI writing tools guide" }],
  "ai-hook-generator": [{ href: "/resources/ai-hook-ideas", label: "AI hook ideas guide" }],
  "ai-carousel-post-generator": [{ href: "/resources/carousel-post-ideas", label: "Carousel post ideas guide" }],
  "ai-linkedin-post-generator": [{ href: "/resources/linkedin-post-ideas", label: "LinkedIn post ideas guide" }],
  "ai-video-script-generator": [{ href: "/resources/short-video-script-ideas", label: "Short video script ideas guide" }],
  "ai-product-description-generator": [{ href: "/resources/free-ai-writing-tools", label: "Free AI writing tools guide" }],
  "ai-ad-copy-generator": [{ href: "/resources/ai-hook-ideas", label: "AI hook ideas guide" }],
};
const socialMediaBridgeSlugs = new Set([
  "meme-generator",
  "video-thumbnail-extractor",
  "hashtag-generator",
  "blog-title-generator",
  "resize-image",
  "ai-hook-generator",
  "ai-carousel-post-generator",
  "ai-linkedin-post-generator",
  "ai-video-script-generator",
]);export async function generateMetadata({
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
  const resourceLinks = aiResourceLinks[tool.slug] ?? [];

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

      {resourceLinks.length > 0 && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-900/70 p-7">
            <h2 className="text-2xl font-black">Helpful AI guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">{resourceLinks.map((resource) => <Link key={resource.href} href={resource.href} className="rounded-xl border border-blue-400/30 px-4 py-3 font-semibold text-blue-200 hover:bg-blue-400/10">{resource.label}</Link>)}</div>
          </div>
        </section>
      )}
      {placement && <AffiliatePlacementBlock placement={placement} />}

      {socialMediaBridgeSlugs.has(tool.slug) && (
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl border-l-4 border-blue-400 bg-blue-400/5 p-7">
            <p className="text-sm font-semibold uppercase text-blue-300">
              Creator workflow
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Plan the post around this asset
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Use free Gemini-powered tools for captions, hashtags, video
              titles, bios and content ideas with five free generations per day.
            </p>
            <Link
              href="/ai-tools"
              className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Explore Free AI Creator Tools
            </Link>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
