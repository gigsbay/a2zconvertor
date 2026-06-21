import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import RequestToolForm from "@/components/RequestToolForm";
import { absoluteUrl } from "@/data/site";
import SupportCTA from "@/components/SupportCTA";
import ToolVoting from "@/components/ToolVoting";

export const metadata: Metadata = {
  title: "Request a Tool",
  description:
    "Request a new A2ZConvertor tool or suggest improvements to existing online file tools.",
  alternates: {
    canonical: absoluteUrl("/request-tool"),
  },
  openGraph: {
    title: "Request a Tool | A2ZConvertor",
    description:
      "Request a new A2ZConvertor tool or suggest an improvement.",
    url: absoluteUrl("/request-tool"),
  },
};

export default function RequestToolPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl font-black tracking-tight">
            Request a Tool
          </h1>

          <p className="mb-8 text-lg leading-8 text-slate-400">
            Need a converter, editor or workflow that is not available yet?
            Request a new tool or suggest improvements to an existing
            A2ZConvertor tool.
          </p>

          <RequestToolForm />
        </div>
      </section>

      <ToolVoting />
      <SupportCTA />
      <Footer />
    </main>
  );
}
