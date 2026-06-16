import Link from "next/link";

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
            <li>Image Tools</li>
            <li>PDF Tools</li>
            <li>Video Tools</li>
            <li>Audio Tools</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold">Popular Tools</h4>
          <ul className="space-y-2 text-slate-400">
            <li>JPG to PNG</li>
            <li>Compress PDF</li>
            <li>PDF to Word</li>
            <li>MP4 to GIF</li>
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
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-8 text-sm text-slate-500">
        &copy; 2026 A2ZConvertor. All rights reserved.
      </div>
    </footer>
  );
}
