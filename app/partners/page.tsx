import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { absoluteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Software and Affiliate Partnerships",
  description:
    "Partner with A2ZConvertor through relevant software recommendations, affiliate relationships and useful content.",
  alternates: { canonical: absoluteUrl("/partners") },
};

const partnershipTypes = [
  "Software partnership enquiries",
  "Affiliate partnership enquiries",
  "Sponsored tool and resource placements",
  "Newsletter sponsorship opportunities",
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase text-blue-300">
            Partnerships
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Build a useful partnership with A2ZConvertor
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            We welcome relevant products that help people edit, manage,
            protect, store or share their files. Recommendations and sponsored
            placements will always be clearly labelled.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {partnershipTypes.map((type) => (
              <div
                key={type}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 font-semibold"
              >
                {type}
              </div>
            ))}
          </div>
          <section className="mt-12 rounded-2xl border border-white/10 bg-slate-900/70 p-7">
            <h2 className="text-2xl font-black">Start a conversation</h2>
            <p className="mt-4 leading-7 text-slate-400">
              Partnership proposals:{" "}
              <a
                className="text-blue-300"
                href="mailto:partners@a2zconvertor.co.uk"
              >
                partners@a2zconvertor.co.uk
              </a>
            </p>
            <p className="mt-2 leading-7 text-slate-400">
              General enquiries:{" "}
              <a
                className="text-blue-300"
                href="mailto:contact@a2zconvertor.co.uk"
              >
                contact@a2zconvertor.co.uk
              </a>
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
