import { categories } from "@/data/categories";

const icons: Record<string, string> = {
  "Image Tools": "🖼️",
  "PDF Tools": "📄",
  "Video Tools": "🎬",
  "Audio Tools": "🎧",
  "Document Tools": "📝",
  "AI Tools": "✨",
};

export default function Categories() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
            Browse Tools By Category
          </h2>

          <p className="text-lg text-slate-400">
            Everything you need to convert, compress, edit and optimize files
            from one simple place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <a
              key={category.name}
              href="/tools"
              className="group rounded-3xl border border-white/10 bg-slate-900/70 p-8 transition hover:-translate-y-2 hover:border-blue-500/60 hover:bg-slate-900"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-3xl">
                {icons[category.name]}
              </div>

              <h3 className="mb-3 text-2xl font-bold">
                {category.name}
              </h3>

              <p className="mb-6 text-slate-400">
                {category.tools}+ fast online tools for everyday file tasks.
              </p>

              <span className="font-semibold text-blue-400">
                Explore tools →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}