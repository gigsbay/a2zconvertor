import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for A2ZConvertor's browser-based file conversion and editing tools.",
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

          <div className="space-y-8 text-slate-300">
            <p className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
              This page is provided for launch transparency and is not legal
              advice. You should review it with a qualified legal professional
              for your specific business and compliance needs.
            </p>

            <TermsSection title="Using A2ZConvertor">
              <p>
                A2ZConvertor provides free online tools for file conversion,
                compression, editing and inspection. No account is required.
                Many tools run directly in your browser where possible.
              </p>
            </TermsSection>

            <TermsSection title="Acceptable use">
              <p>
                You agree to use A2ZConvertor lawfully and responsibly. You may
                not use the site to upload, process, create or distribute
                illegal, harmful, abusive, infringing or unauthorized content, or
                to interfere with the site, its security or other users.
              </p>
            </TermsSection>

            <TermsSection title="Your responsibility for files">
              <p>
                You are responsible for the files you choose, the rights you
                have to use them and the results you download. Do not process
                files that you are not allowed to use or that contain sensitive
                information you are not comfortable handling in a browser tool.
              </p>
            </TermsSection>

            <TermsSection title="No illegal content">
              <p>
                A2ZConvertor must not be used for unlawful purposes, including
                copyright infringement, privacy violations, malware, harassment
                or processing content that violates applicable laws.
              </p>
            </TermsSection>

            <TermsSection title="No warranty">
              <p>
                A2ZConvertor is provided as-is and as available. We aim to keep
                tools useful and accurate, but we do not guarantee that any tool
                will be error-free, uninterrupted, secure or suitable for a
                particular purpose. Always review output files before relying on
                them.
              </p>
            </TermsSection>

            <TermsSection title="Limitation of liability">
              <p>
                To the fullest extent permitted by law, A2ZConvertor will not be
                liable for indirect, incidental, consequential or special
                damages, loss of data, loss of profits or issues caused by your
                use of downloaded files or third-party services.
              </p>
            </TermsSection>

            <TermsSection title="Service availability">
              <p>
                We may change, suspend or discontinue parts of the site at any
                time. Some tools depend on browser support and may not work with
                every file, codec or device.
              </p>
            </TermsSection>

            <TermsSection title="Intellectual property">
              <p>
                The A2ZConvertor site design, branding and original content
                belong to A2ZConvertor or its licensors. You keep whatever
                rights you already have in the files you process with the tools.
              </p>
            </TermsSection>

            <TermsSection title="Changes to the service or terms">
              <p>
                We may update tools, pages and these terms as the service
                evolves. Continued use of the site after changes means you
                accept the updated terms.
              </p>
            </TermsSection>

            <TermsSection title="Contact">
              <p>
                General questions: <EmailLink email="info@a2zconvertor.co.uk" />
                <br />
                Support: <EmailLink email="support@a2zconvertor.co.uk" />
                <br />
                Contact: <EmailLink email="contact@a2zconvertor.co.uk" />
              </p>
            </TermsSection>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold text-white">{title}</h2>
      <div className="space-y-4 leading-7">{children}</div>
    </section>
  );
}

function EmailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="font-semibold text-blue-300 hover:text-blue-200"
    >
      {email}
    </a>
  );
}
