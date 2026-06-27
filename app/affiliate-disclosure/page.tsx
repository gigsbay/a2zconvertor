import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { absoluteUrl } from "@/data/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How A2ZConvertor uses affiliate links to support free browser-based tools.",
  alternates: { canonical: absoluteUrl("/affiliate-disclosure") },
  openGraph: {
    title: "Affiliate Disclosure | A2ZConvertor",
    description:
      "How A2ZConvertor uses affiliate links to support free browser-based tools.",
    url: absoluteUrl("/affiliate-disclosure"),
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase text-blue-300">
            Transparency
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Affiliate Disclosure
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A2ZConvertor may earn commissions from qualifying purchases made
            through affiliate links. These commissions help support free tools,
            AI usage, hosting and ongoing development. Affiliate links do not
            increase the price you pay.
          </p>
          <div className="mt-10 grid gap-5">
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-7">
              <h2 className="text-2xl font-black">How recommendations work</h2>
              <p className="mt-4 leading-7 text-slate-400">
                A2ZConvertor keeps free browser tools as the primary action.
                Affiliate recommendations are shown only where a desktop or
                specialist workflow may be useful, such as advanced PDF editing,
                video editing or larger batch conversion tasks.
              </p>
            </section>
            <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-7">
              <h2 className="text-2xl font-black">Sponsored link labels</h2>
              <p className="mt-4 leading-7 text-slate-400">
                Affiliate cards are labelled as affiliate recommendations and
                external affiliate links use sponsored and nofollow link
                attributes. A recommendation does not mean a company is an
                official sponsor of A2ZConvertor.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
