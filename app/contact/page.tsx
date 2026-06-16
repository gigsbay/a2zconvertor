import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact A2ZConvertor for support, feedback or launch questions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl font-black tracking-tight">Contact</h1>

          <div className="space-y-6 text-slate-300">
            <p>
              Need help with A2ZConvertor, want to report an issue, or have a
              launch-related question? Send us an email and include the tool
              name, browser and a short description of what happened.
            </p>

            <p>
              Contact email:{" "}
              <a
                href="mailto:contact@example.com"
                className="font-semibold text-blue-300 hover:text-blue-200"
              >
                contact@example.com
              </a>
            </p>

            <p>
              A2ZConvertor does not require accounts. Many file tools run in
              your browser, so avoid attaching sensitive files unless support
              specifically asks for a sample you are comfortable sharing.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
