import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SupportCTA from "@/components/SupportCTA";
import { AI_TOOL_SLUGS } from "@/utils/aiConfig";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/data/site";

export const metadata: Metadata = { title: "Free AI Tools", description: "Free Gemini-powered AI tools for captions, hashtags, titles, emails, summaries, bios and content ideas. Three free generations per day.", alternates: { canonical: absoluteUrl("/ai-tools") }, openGraph: { title: "Free AI Tools | A2ZConvertor", description: "Use free Gemini-powered creator and writing tools with no account required.", url: absoluteUrl("/ai-tools") } };
const aiTools = AI_TOOL_SLUGS.map((slug) => tools.find((tool) => tool.slug === slug)).filter((tool): tool is (typeof tools)[number] => Boolean(tool));
const faqs = [
  ["Are these AI tools free?","Yes. A2ZConvertor currently provides limited owner-funded Gemini generations at no charge."],
  ["How many free generations do I get?","The default allowance is three successful AI generations per day."],
  ["Do I need to create an account?","No account or API key is required."],
  ["What happens when I reach the daily limit?","Try again the next day. You can also support A2ZConvertor to help fund higher free limits."],
  ["How can I support A2ZConvertor?","Visit the Support page or use the Buy Me a Coffee link."],
];
export default function AIToolsPage() { return <main className="min-h-screen bg-slate-950 text-white"><Navbar/><section className="px-6 pb-14 pt-20"><div className="mx-auto max-w-6xl"><span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300">Free AI {"\u00b7"} 3/day</span><h1 className="mt-5 text-5xl font-black md:text-6xl">Free AI Tools</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Create captions, hashtags, titles, emails, summaries, bios and content ideas with Gemini. You receive three free generations per day, with no account or API key required.</p></div></section><section className="px-6 pb-20"><div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">{aiTools.map((tool)=><Link key={tool.slug} href={`/convert/${tool.slug}`} className="flex min-h-56 flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:border-blue-500/60"><p className="text-xs font-bold uppercase text-blue-300">{tool.category}</p><h2 className="mt-3 text-xl font-bold">{tool.name}</h2><p className="mt-3 text-slate-400">{tool.description}</p><span className="mt-auto pt-5 font-semibold text-blue-300">Try free AI tool</span></Link>)}</div></section><section className="px-6 py-20"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black">Frequently asked questions</h2><div className="mt-7 space-y-4">{faqs.map(([q,a])=><div key={q} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"><h3 className="font-bold">{q}</h3><p className="mt-2 text-slate-400">{a}</p></div>)}</div><div className="mt-10 flex flex-wrap gap-3"><Link href="/social-media-tools" className="rounded-xl border border-white/10 px-4 py-3 font-semibold">Social Media Tools</Link><Link href="/text-tools" className="rounded-xl border border-white/10 px-4 py-3 font-semibold">Text Tools</Link><Link href="/resources" className="rounded-xl border border-white/10 px-4 py-3 font-semibold">AI guides</Link></div></div></section><SupportCTA/><Footer/></main>; }
