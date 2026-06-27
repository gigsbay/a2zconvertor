import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { absoluteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact A2ZConvertor for support, feedback, privacy questions or launch issues.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact | A2ZConvertor",
    description:
      "Contact A2ZConvertor for support, feedback and privacy questions.",
    url: absoluteUrl("/contact"),
  },
};

const contacts = [
  {
    label: "General questions",
    email: "info@a2zconvertor.co.uk",
  },
  {
    label: "Contact and partnerships",
    email: "contact@a2zconvertor.co.uk",
  },
  {
    label: "Tool support",
    email: "support@a2zconvertor.co.uk",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <p className="mb-3 text-sm font-semibold uppercase text-blue-300">
              Last updated: June 17, 2026
            </p>
            <h1 className="mb-4 text-5xl font-black tracking-tight">Contact</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Reach A2ZConvertor for tool support, privacy questions, feedback
              and launch issues.
            </p>
          </div>

          <div className="grid gap-5 text-slate-300">
            <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h2 className="mb-3 text-2xl font-bold text-white">
                How to get help
              </h2>
              <p className="leading-7">
              Need help with A2ZConvertor, want to report an issue, or have a
              launch-related question? Send an email and include the tool name,
              browser, device and a short description of what happened.
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {contacts.map((contact) => (
                <div
                  key={contact.email}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                >
                  <p className="mb-2 text-sm font-semibold text-slate-400">
                    {contact.label}
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-lg font-bold text-blue-300 hover:text-blue-200"
                  >
                    {contact.email}
                  </a>
                </div>
              ))}
            </section>


            <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h2 className="mb-3 text-2xl font-bold text-white">
                Response expectation
              </h2>
              <p className="leading-7">
                We aim to review genuine support, privacy, partnership and
                project messages within a few business days. For new feature
                ideas, use the Request a Tool page so the request is easier to
                track.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="mailto:support@a2zconvertor.co.uk" className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500">Email support</a>
                <a href="/request-tool" className="rounded-xl border border-white/10 px-4 py-3 font-semibold text-slate-200 hover:border-blue-500/60">Request a tool</a>
                <a href="/support" className="rounded-xl border border-white/10 px-4 py-3 font-semibold text-slate-200 hover:border-blue-500/60">Support the project</a>
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h2 className="mb-3 text-2xl font-bold text-white">
                Browser-based tools
              </h2>
              <p className="leading-7">
                A2ZConvertor does not require accounts. Many file tools run in
                your browser, so avoid attaching sensitive files unless support
                specifically asks for a sample you are comfortable sharing.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
