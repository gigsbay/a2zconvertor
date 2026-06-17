import Link from "next/link";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";

const popularFooterSlugs = [
  "jpg-to-png",
  "compress-image",
  "pdf-merge",
  "compress-pdf",
];

const popularFooterTools = popularFooterSlugs
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter((tool): tool is (typeof tools)[number] => Boolean(tool));

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-2xl font-black">
            A2Z<span className="text-blue-500">Convertor</span>
          </h3>

          <p className="text-slate-400">
            Free online tools to convert, compress and edit files quickly.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-bold">Categories</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/tools" className="transition hover:text-white">
                All Tools
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={`/tools?category=${encodeURIComponent(category.name)}`}
                  className="transition hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold">Popular Tools</h4>
          <ul className="space-y-2 text-slate-400">
            {popularFooterTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/convert/${tool.slug}`}
                  className="transition hover:text-white"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/request-tool" className="transition hover:text-white">
                Request a Tool
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-500">
            Email:{" "}
            <a
              href="mailto:support@a2zconvertor.co.uk"
              className="text-slate-400 transition hover:text-white"
            >
              support@a2zconvertor.co.uk
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-8 text-sm text-slate-500">
        &copy; 2026 A2ZConvertor. All rights reserved.
      </div>
    </footer>
  );
}
