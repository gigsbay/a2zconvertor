import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for A2ZConvertor, including browser-based file processing, Cloudflare hosting, cookies and GDPR-style rights.",
};

const rights = [
  "Access the personal data we hold about you.",
  "Ask us to correct inaccurate personal data.",
  "Ask us to delete personal data where applicable.",
  "Object to certain processing.",
  "Ask us to restrict certain processing.",
  "Request data portability where applicable.",
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <p className="mb-3 text-sm font-semibold uppercase text-blue-300">
              Last updated: June 17, 2026
            </p>
            <h1 className="mb-4 text-5xl font-black tracking-tight">
              Privacy Policy
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              A2ZConvertor is designed around browser-based file tools where
              possible, no account requirement, and clear contact options for
              privacy and support questions.
            </p>
          </div>

          <div className="grid gap-5 text-slate-300">

            <PolicySection title="Who operates A2ZConvertor">
              <p>
                A2ZConvertor is an online file conversion and editing website
                available at a2zconvertor.co.uk. For privacy questions, contact{" "}
                <EmailLink email="contact@a2zconvertor.co.uk" /> or{" "}
                <EmailLink email="support@a2zconvertor.co.uk" />.
              </p>
            </PolicySection>

            <PolicySection title="What data is processed">
              <p>
                A2ZConvertor does not require an account. When you use the site,
                we may process basic technical information such as page
                requests, browser type, device type, approximate location,
                referrer, error logs and security events. If you email us, we
                process the contact details and message content you provide.
              </p>
            </PolicySection>

            <PolicySection title="Browser-based file processing">
              <p>
                Many tools process files directly in your browser. In those
                cases, your selected files stay on your device for the
                conversion or editing workflow and do not need to be uploaded to
                our server. Some browser features may create temporary local
                object URLs while the page is open.
              </p>
            </PolicySection>

            <PolicySection title="Hosting and security">
              <p>
                A2ZConvertor may use Cloudflare for hosting, performance and
                security. Cloudflare may process technical request data such as
                IP addresses, request headers and security signals to deliver
                the site and protect it from abuse.
              </p>
            </PolicySection>

            <PolicySection title="Cookies and local storage">
              <p>
                The site may use cookies or local storage for essential
                functionality, preferences, performance and security. We do not
                require an account to use the tools. If analytics are added
                later, this policy should be updated to explain what analytics
                service is used and how users can control it.
              </p>
            </PolicySection>

            <PolicySection title="Future analytics">
              <p>
                A2ZConvertor may add privacy-conscious analytics in the future
                to understand page usage and improve tools. If added, we will
                update this policy with the provider name, data collected and
                any available opt-out controls.
              </p>
            </PolicySection>

            <PolicySection title="GDPR-style rights">
              <p>
                Depending on where you live and the data involved, you may have
                rights under privacy laws, including the right to:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {rights.map((right) => (
                  <li key={right}>{right}</li>
                ))}
              </ul>
              <p className="mt-4">
                To make a request, email{" "}
                <EmailLink email="contact@a2zconvertor.co.uk" />.
              </p>
            </PolicySection>

            <PolicySection title="Data retention">
              <p>
                Browser-processed files are not intentionally retained by
                A2ZConvertor because they are processed on your device. Contact
                messages may be retained for support and record keeping. Hosting
                and security logs may be retained for a limited period needed
                for operations, security and troubleshooting.
              </p>
            </PolicySection>

            <PolicySection title="Children's privacy">
              <p>
                A2ZConvertor is not directed to children. If you believe a child
                has provided personal data to us, contact{" "}
                <EmailLink email="support@a2zconvertor.co.uk" /> so we can
                review and delete it where appropriate.
              </p>
            </PolicySection>

            <PolicySection title="International transfers">
              <p>
                Because the site may use global hosting, security and email
                providers, technical data and support messages may be processed
                in countries outside your own. We aim to use reputable providers
                with appropriate safeguards.
              </p>
            </PolicySection>

            <PolicySection title="Contact">
              <p>
                General questions: <EmailLink email="info@a2zconvertor.co.uk" />
                <br />
                Support: <EmailLink email="support@a2zconvertor.co.uk" />
                <br />
                Privacy requests: <EmailLink email="contact@a2zconvertor.co.uk" />
              </p>
            </PolicySection>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <h2 className="mb-3 text-2xl font-bold text-white">{title}</h2>
      <div className="space-y-4 leading-7 text-slate-300">{children}</div>
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
