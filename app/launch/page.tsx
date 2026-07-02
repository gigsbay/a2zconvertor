import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import NewsletterSignup from "@/components/NewsletterSignup";
import SupportCTA from "@/components/SupportCTA";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from "@/data/site";

const launchDescription =
  "A2ZConvertor is a free browser-based toolkit for file conversion, PDF tools, image utilities and AI creator tools for captions, hashtags, hooks and scripts.";

const priorityLinks = [
  { href: "/ai-tools", label: "AI Creator Tools" },
  { href: "/convert/hashtag-generator", label: "Hashtag Generator" },
  { href: "/convert/instagram-caption-generator", label: "Instagram Caption Generator" },
  { href: "/convert/ai-hook-generator", label: "AI Hook Generator" },
  { href: "/convert/ai-video-script-generator", label: "AI Video Script Generator" },
  { href: "/pdf-tools", label: "PDF Tools" },
  { href: "/image-tools", label: "Image Tools" },
  { href: "/tools", label: "All Tools" },
];

const toolGroups = [
  {
    title: "AI Creator Tools",
    copy: "Generate editable captions, hooks, scripts, hashtags, LinkedIn posts and content ideas with daily free usage available.",
    links: ["/ai-tools", "/convert/ai-hook-generator", "/convert/ai-video-script-generator"],
  },
  {
    title: "PDF and Image Tools",
    copy: "Compress, merge, split, crop, convert and prepare everyday files from focused browser-based tools.",
    links: ["/pdf-tools", "/image-tools", "/convert/png-to-jpg"],
  },
  {
    title: "Resources and Guides",
    copy: "Use practical guides for PDF compression, AI creator workflows and browser-based file conversion.",
    links: ["/resources", "/resources/best-free-pdf-tools", "/resources/free-ai-social-media-tools"],
  },
];

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "A2ZConvertor Launch - Free File, PDF and AI Creator Tools",
  description: launchDescription,
  alternates: { canonical: absoluteUrl("/launch") },
  openGraph: {
    title: "A2ZConvertor Launch - Free File, PDF and AI Creator Tools",
    description: launchDescription,
    url: absoluteUrl("/launch"),
    siteName: "A2ZConvertor",
    type: "website",
    locale: "en_GB",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "A2ZConvertor Launch - Free File, PDF and AI Creator Tools",
    description: launchDescription,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function LaunchPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "A2ZConvertor Launch",
            description: launchDescription,
            url: absoluteUrl("/launch"),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Launch", item: absoluteUrl("/launch") },
            ],
          },
        ]}
      />
      <section className="px-6 pb-16 pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-300">A2ZConvertor launch</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight md:text-6xl">
            Free file, PDF and AI creator tools in one browser-based toolkit.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            A2ZConvertor helps creators, students, small businesses and everyday users finish small file and content tasks without installing heavy software or creating an account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/ai-tools" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">Try Free AI Creator Tools</Link>
            <Link href="/tools" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-blue-500/60">Browse All Tools</Link>
            <Link href="/contact" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-blue-500/60">Send Feedback</Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {toolGroups.map((group) => (
            <article key={group.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h2 className="text-2xl font-black">{group.title}</h2>
              <p className="mt-3 leading-7 text-slate-400">{group.copy}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.links.map((href) => (
                  <Link key={href} href={href} className="rounded-full border border-blue-400/30 px-3 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-400/10">
                    {priorityLinks.find((link) => link.href === href)?.label ?? href.replace("/", "")}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/40 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">Who it is for</h2>
            <p className="mt-4 leading-7 text-slate-300">
              A2ZConvertor is built for people who need quick practical tools: creators making posts, students preparing documents, marketers drafting ideas and small businesses handling everyday files.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-black">Privacy and browser-first approach</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Many file tools run directly in your browser where supported. AI tools use A2ZConvertor&apos;s configured Gemini connection and should be treated as editable drafts, not guaranteed outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black">Best tools to try first</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {priorityLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 font-semibold text-slate-200 hover:border-blue-500/60">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-900/70 p-7">
          <h2 className="text-3xl font-black">Founder note</h2>
          <p className="mt-4 leading-7 text-slate-300">
            The goal is simple: keep useful online tools fast, honest and easy to reach. Feedback is welcome, especially on which workflows should be clearer before launch promotion ramps up.
          </p>
          <Link href="/contact" className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">Send Feedback</Link>
        </div>
      </section>

      <NewsletterSignup />
      <SupportCTA />
      <Footer />
    </main>
  );
}