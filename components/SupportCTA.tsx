import Link from "next/link";

export const BUY_ME_A_COFFEE_URL = process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL?.trim() || "https://buymeacoffee.com/a2zconvertor";

export default function SupportCTA({ compact = false }: { compact?: boolean }) {
  return <section className={compact ? "rounded-2xl border border-amber-300/20 bg-amber-300/5 p-6" : "border-y border-white/10 bg-amber-300/5 px-6 py-14"}>
    <div className={compact ? "" : "mx-auto max-w-5xl"}>
      <p className="text-sm font-bold uppercase text-amber-200">Keep free tools growing</p>
      <h2 className="mt-2 text-2xl font-black">Support A2ZConvertor</h2>
      <p className="mt-3 max-w-2xl leading-7 text-slate-300">AI generations, hosting, development and new tools cost money. Your support helps us keep useful tools free and improve daily limits.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={BUY_ME_A_COFFEE_URL} target="_blank" rel="noreferrer" className="rounded-xl bg-amber-300 px-5 py-3 font-bold text-slate-950 hover:bg-amber-200">Buy Me a Coffee</a>
        <Link href="/support" className="rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:border-amber-300/50">Learn more</Link>
      </div>
    </div>
  </section>;
}
