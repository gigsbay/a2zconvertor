import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { tools } from "@/data/tools";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl">
              All Tools
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-slate-400">
              Browse all available A2ZConvertor tools. More converters are
              being added regularly.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <a
                key={tool.slug}
href={`/convert/${tool.slug}`}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-blue-500/60 hover:bg-slate-900"
              >
                <div className="mb-3 text-sm font-semibold text-blue-400">
                  {tool.category}
                </div>

                <h2 className="mb-2 text-2xl font-bold">
                  {tool.name}
                </h2>

                <p className="text-slate-400">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}