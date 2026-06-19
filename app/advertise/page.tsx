import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { absoluteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Advertise with A2ZConvertor",
  description:
    "Explore clearly labelled sponsorship opportunities across A2ZConvertor tools, guides and newsletters.",
  alternates: { canonical: absoluteUrl("/advertise") },
};

const opportunities = [
  {
    title: "Sponsored tool placements",
    copy: "Reach visitors while they are actively solving a relevant file or productivity task.",
  },
  {
    title: "Sponsored resource pages",
    copy: "Support useful educational content with a clearly disclosed, contextually relevant placement.",
  },
  {
    title: "Newsletter sponsorship",
    copy: "Introduce a useful product to subscribers interested in new converters and productivity tools.",
  },
];

export default function AdvertisePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase text-blue-300">
            Advertising
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Trusted, clearly labelled placements
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            A2ZConvertor is preparing selective sponsorship opportunities for
            software and services that genuinely fit our visitors&apos; needs.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {opportunities.map((item) => (
              <section
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
              >
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-400">{item.copy}</p>
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-blue-400/20 bg-blue-400/5 p-7">
            <h2 className="text-2xl font-black">Discuss a placement</h2>
            <p className="mt-3 text-slate-300">
              Email{" "}
              <a
                className="font-semibold text-blue-300"
                href="mailto:partners@a2zconvertor.co.uk"
              >
                partners@a2zconvertor.co.uk
              </a>{" "}
              with your product, audience fit and preferred placement.
            </p>
            <Link
              href="/partners"
              className="mt-5 inline-flex text-sm font-semibold text-blue-300"
            >
              View partnership options
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
