"use client";

export default function SocialOutputSection({
  title,
  items,
  copied,
  onCopy,
}: {
  title: string;
  items: string[];
  copied: string;
  onCopy: (value: string) => void;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          type="button"
          onClick={() => onCopy(items.join("\n"))}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-blue-500/60"
        >
          {copied === items.join("\n") ? "Copied all" : "Copy all"}
        </button>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="leading-7 text-slate-200">{item}</p>
            <button
              type="button"
              onClick={() => onCopy(item)}
              className="shrink-0 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500/60"
            >
              {copied === item ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
