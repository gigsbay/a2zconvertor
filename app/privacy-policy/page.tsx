import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for A2ZConvertor, including browser-based file processing and basic site usage information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-5xl font-black tracking-tight">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-slate-300">
            <p>
              A2ZConvertor provides free online tools for file conversion,
              compression and editing. No account is required to use the site.
            </p>

            <p>
              Many tools process files directly in your browser. When a tool is
              browser-based, your selected files are handled on your device for
              that workflow and do not need to be uploaded to our server for
              processing.
            </p>

            <p>
              We may collect basic technical information that browsers and
              hosting services normally provide, such as page requests, device
              type, approximate location and error logs. This information helps
              us keep the site stable and improve the service.
            </p>

            <p>
              Do not upload or process files you are not allowed to use. You are
              responsible for the files you choose and the results you download.
            </p>

            <p>
              For privacy questions, contact us at{" "}
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
