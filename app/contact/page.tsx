import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact A2ZConvertor for support, feedback, privacy questions or launch issues.",
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

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl font-black tracking-tight">Contact</h1>

          <div className="space-y-8 text-slate-300">
            <p>
              Need help with A2ZConvertor, want to report an issue, or have a
              launch-related question? Send an email and include the tool name,
              browser, device and a short description of what happened.
            </p>

            <div className="grid gap-4">
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
            </div>

            <p>
              A2ZConvertor does not require accounts. Many file tools run in
              your browser, so avoid attaching sensitive files unless support
              specifically asks for a sample you are comfortable sharing.
            </p>

            <p className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
              The legal and privacy pages are provided for launch transparency
              and are not legal advice.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
