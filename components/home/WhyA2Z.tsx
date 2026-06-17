import { categories } from "@/data/categories";
import { tools } from "@/data/tools";

const reasons = [
  {
    title: "Browser-first processing",
    description:
      "Many tools run directly in your browser, keeping everyday file tasks fast and private where possible.",
  },
  {
    title: "No account required",
    description:
      "Open a tool, process your file and download the result without creating an account.",
  },
  {
    title: "Built for launch workflows",
    description:
      "Use focused converters, compressors and editors for images, PDFs, audio and video from one searchable place.",
  },
];

export default function WhyA2Z() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
            Why use A2ZConvertor?
          </h2>
          <p className="text-lg text-slate-400">
            A2ZConvertor brings {tools.length} tools across {categories.length}{" "}
            categories into one clean, fast file workflow.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
            >
              <h3 className="mb-3 text-xl font-bold">{reason.title}</h3>
              <p className="leading-7 text-slate-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
