import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { absoluteUrl } from "@/data/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for A2ZConvertor, including analytics, functional storage, AI quota identifiers, affiliate tracking and newsletter forms.",
  alternates: { canonical: absoluteUrl("/cookie-policy") },
  openGraph: {
    title: "Cookie Policy | A2ZConvertor",
    description:
      "How A2ZConvertor uses cookies, local storage and similar technologies.",
    url: absoluteUrl("/cookie-policy"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | A2ZConvertor",
    description:
      "How A2ZConvertor uses cookies, local storage and similar technologies.",
  },
};

const sections = [
  ["Functional storage", "A2ZConvertor may use local storage for preferences such as theme choice and temporary browser UI state. These settings help the site work consistently without requiring an account."],
  ["Analytics", "If configured, Google Analytics and Microsoft Clarity may use cookies or similar identifiers to understand site usage, performance issues and interactions. These tools help improve pages and workflows."],
  ["Newsletter forms", "If a newsletter provider such as Formspree is configured, form submissions may be processed by that provider. Do not submit sensitive information through newsletter forms."],
  ["AI quota and abuse prevention", "AI tools use rate limiting to manage the daily free allowance. A2ZConvertor should not store raw IP addresses for quota records; identifiers are designed to be hashed with a server-side salt before storage."],
  ["Affiliate links", "Affiliate networks may use tracking parameters, cookies or redirects when you click an external affiliate recommendation. Affiliate links are labelled and open on third-party websites."],
  ["Managing cookies", "You can control cookies and site storage through your browser settings. Blocking some storage may affect preferences, analytics opt-outs or third-party form behaviour."],
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase text-blue-300">
            Last updated: June 27, 2026
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">Cookie Policy</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            This page explains how A2ZConvertor may use cookies, local storage
            and similar technologies for functionality, analytics, AI quota
            protection and affiliate tracking.
          </p>
          <div className="mt-10 grid gap-5">
            {sections.map(([title, body]) => (
              <section key={title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-7">
                <h2 className="text-2xl font-black">{title}</h2>
                <p className="mt-4 leading-7 text-slate-300">{body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}