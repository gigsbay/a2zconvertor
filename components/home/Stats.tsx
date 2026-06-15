import { tools } from "@/data/tools";

export default function Stats() {
  const stats = [
    {
      value: `${tools.length}+`,
      label: "Free Tools",
    },
    {
      value: "100%",
      label: "Browser Based",
    },
    {
      value: "0",
      label: "Upload Limits",
    },
    {
      value: "Fast",
      label: "Processing",
    },
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center"
            >
              <div className="mb-2 text-4xl font-black">
                {stat.value}
              </div>

              <div className="text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
