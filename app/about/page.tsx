import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { absoluteUrl } from "@/data/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About A2ZConvertor",
  description:
    "Learn what A2ZConvertor is, how its browser-first file tools and AI Creator Tools work, and how the project is funded.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: "About A2ZConvertor",
    description:
      "Browser-first file tools, PDF tools, image utilities and AI Creator Tools built for practical everyday workflows.",
    url: absoluteUrl("/about"),
  },
  twitter: {
    card: "summary_large_image",
    title: "About A2ZConvertor",
    description:
      "Learn about A2ZConvertor's browser-first tools, AI Creator Tools and funding model.",
  },
};

const sections = [
  {
    title: "What A2ZConvertor is",
    body:
      "A2ZConvertor is a free online toolkit for quick file, PDF, image, audio, video and creator tasks. The aim is to make common workflows easier without forcing users to create an account or install heavy desktop software.",
  },
  {
    title: "Project story and mission",
    body:
      "The project is built around a simple idea: useful tools should be fast, honest about their limits and easy to reach from one searchable directory. A2ZConvertor focuses on practical launch-ready workflows for students, creators, small businesses and everyday file tasks.",
  },
  {
    title: "Browser-first and privacy-friendly approach",
    body:
      "Many file tools run directly in your browser after the page loads. That means selected files can often stay on your device for conversion, compression or editing. Some features depend on browser support and large files may still be limited by device memory.",
  },
  {
    title: "How AI Creator Tools work",
    body:
      "AI Creator Tools use A2ZConvertor's configured Gemini connection to generate editable drafts such as hooks, captions, titles, scripts, emails and summaries. You get 10 free AI generations per day. AI output should be reviewed, edited and fact-checked before publishing.",
  },
  {
    title: "How the site is funded",
    body:
      "A2ZConvertor may be funded by affiliate recommendations, voluntary Buy Me a Coffee support, future newsletter sponsorships and possible advertising if approved. Recommendations are labelled and free tools remain the primary action.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase text-blue-300">
            About the project
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">
            About A2ZConvertor
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A practical browser-first toolkit for file conversion, PDF work,
            image utilities and AI-assisted creator drafts.
          </p>

          <div className="mt-10 grid gap-5">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-7">
                <h2 className="text-2xl font-black">{section.title}</h2>
                <p className="mt-4 leading-7 text-slate-300">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/tools" className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500">Browse tools</Link>
            <Link href="/ai-tools" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-blue-500/60">Explore AI Creator Tools</Link>
            <a href="mailto:contact@a2zconvertor.co.uk" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-blue-500/60">contact@a2zconvertor.co.uk</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}