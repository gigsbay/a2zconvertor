import Link from "next/link";

export default function RequestToolCTA() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-black tracking-tight md:text-4xl">
              Need another file tool?
            </h2>
            <p className="max-w-2xl text-slate-400">
              Request new converters, editors or improvements and help shape
              the next A2ZConvertor tools.
            </p>
          </div>

          <Link
            href="/request-tool"
            className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-black"
          >
            Request a Tool
          </Link>
        </div>
      </div>
    </section>
  );
}
