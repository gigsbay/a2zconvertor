import Link from "next/link";
import { MonetizationPlacement } from "@/data/monetization";

export default function AffiliatePlacementBlock({
  placement,
}: {
  placement: MonetizationPlacement;
}) {
  return (
    <aside className="border-y border-white/10 bg-slate-900/40 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-blue-300">
            {placement.label} placement
          </p>
          <h2 className="mt-2 text-2xl font-black">{placement.title}</h2>
          <p className="mt-2 max-w-2xl text-slate-400">{placement.description}</p>
        </div>
        <Link
          href={placement.href}
          className="shrink-0 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
        >
          {placement.cta}
        </Link>
      </div>
    </aside>
  );
}
