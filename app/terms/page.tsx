import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for A2ZConvertor's free browser-based file conversion tools.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl font-black tracking-tight">
            Terms of Service
          </h1>

          <div className="space-y-6 text-slate-300">
            <p>
              By using A2ZConvertor, you agree to use the site responsibly and
              only with files you have the right to process.
            </p>

            <p>
              A2ZConvertor is provided as a free online service. No account is
              required, and many tools run directly in your browser where
              possible.
            </p>

            <p>
              We aim to provide accurate and useful conversion results, but
              tools are provided as-is. Always review downloaded files before
              relying on them for important work.
            </p>

            <p>
              You may not use A2ZConvertor to process illegal, harmful or
              unauthorized content, or to interfere with the site or other
              users.
            </p>

            <p>
              Questions about these terms can be sent to{" "}
              <a
                href="mailto:contact@example.com"
                className="font-semibold text-blue-300 hover:text-blue-200"
              >
                contact@example.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
