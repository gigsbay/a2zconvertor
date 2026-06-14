import Link from "next/link";

const featuredTools = [
  {
    name: "Compress Image",
    slug: "compress-image",
    description: "Reduce image file size without noticeable quality loss.",
  },
  {
    name: "JPG to PNG",
    slug: "jpg-to-png",
    description: "Convert JPG images to PNG format.",
  },
  {
    name: "PNG to JPG",
    slug: "png-to-jpg",
    description: "Convert PNG images to JPG format.",
  },
  {
    name: "WEBP to PNG",
    slug: "webp-to-png",
    description: "Convert WEBP images to PNG format.",
  },
];

export default function FeaturedTools() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-4xl font-black">
          Featured Tools
        </h2>

        <p className="mb-12 text-center text-slate-400">
          Most popular image conversion and optimization tools.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/convert/${tool.slug}`}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:border-blue-500/60"
            >
              <h3 className="mb-3 text-xl font-bold">
                {tool.name}
              </h3>

              <p className="text-sm text-slate-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}