import { popularTools } from "@/data/tools";

export default function PopularTools() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
              Popular Tools
            </h2>

            <p className="max-w-2xl text-lg text-slate-400">
              Start with the most commonly used file conversion and editing
              tools.
            </p>
          </div>

          <a href="#all-tools" className="font-semibold text-blue-400">
            View all tools →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60 hover:bg-slate-900"
            >
              <h3 className="mb-2 text-xl font-bold">{tool.name}</h3>

              <p className="text-slate-400">{tool.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}