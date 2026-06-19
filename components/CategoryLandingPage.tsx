import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { categoryLandingPages, CategoryPageConfig } from "@/data/categoryLandingPages";
import { tools } from "@/data/tools";
import NewsletterSignup from "@/components/NewsletterSignup";
import SponsoredToolCard from "@/components/SponsoredToolCard";
import { getPlacement } from "@/data/monetization";

export default function CategoryLandingPage({
  config,
}: {
  config: CategoryPageConfig;
}) {
  const categoryTools = tools.filter((tool) => tool.category === config.category);
  const relatedCategories = categoryLandingPages.filter(
    (page) => page.slug !== config.slug
  );
  const placement = getPlacement("category");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 pb-16 pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase text-blue-300">
            {categoryTools.length} browser-based tools
          </p>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-6xl">
            {config.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {config.intro}
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/convert/${tool.slug}`}
              className="group flex min-h-56 flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60 hover:bg-slate-900"
            >
              <p className="mb-3 text-xs font-semibold uppercase text-blue-300">
                {tool.category}
              </p>
              <h2 className="text-xl font-bold">{tool.name}</h2>
              <p className="mt-3 text-slate-400">{tool.description}</p>
              <span className="mt-auto pt-5 text-sm font-semibold text-blue-300">
                Open tool
              </span>
            </Link>
          ))}
        </div>
      </section>

      {placement && (
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <SponsoredToolCard placement={placement} />
          </div>
        </section>
      )}

      <section className="border-y border-white/10 bg-slate-900/40 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black">Why use these tools?</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {config.why.map((reason) => (
              <p
                key={reason}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 leading-7 text-slate-300"
              >
                {reason}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black">Frequently asked questions</h2>
          <div className="mt-8 space-y-4">
            {config.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
              >
                <h3 className="font-bold">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-black">Explore other categories</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-blue-500/60"
              >
                {category.category}
              </Link>
            ))}
            <Link
              href="/tools"
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </main>
  );
}
