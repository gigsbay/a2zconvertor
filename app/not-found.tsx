import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const helpfulLinks = [
  { href: "/tools", label: "Browse all tools" },
  { href: "/ai-tools", label: "AI Creator Tools" },
  { href: "/resources", label: "Resource guides" },
  { href: "/support", label: "Support A2ZConvertor" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-300">404</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            This link may have moved, or the address may be mistyped. You can jump back into the current A2ZConvertor tools and guides below.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Go home
            </Link>
            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-blue-500/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}