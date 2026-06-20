"use client";

export default function GeneratorResultSection({
  title,
  items,
  copied,
  onCopy,
  metadata,
}: {
  title: string;
  items: string[];
  copied: string;
  onCopy: (value: string) => void;
  metadata?: (item: string) => string;
}) {
  const all = items.join("\n");
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <button type="button" onClick={() => onCopy(all)} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-blue-500/60">
          {copied === all ? "Copied" : "Copy all"}
        </button>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <p className="whitespace-pre-wrap leading-7 text-slate-200">{item}</p>
              <button type="button" onClick={() => onCopy(item)} className="shrink-0 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-blue-500/60">
                {copied === item ? "Copied" : "Copy"}
              </button>
            </div>
            {metadata && <p className="mt-2 text-xs text-slate-500">{metadata(item)}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
