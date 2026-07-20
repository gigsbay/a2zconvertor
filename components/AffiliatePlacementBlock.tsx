import Link from "next/link";
import ToolBadge from "@/components/ToolBadge";
import { MonetizationPlacement } from "@/data/monetization";

export default function AffiliatePlacementBlock({
  placement,
}: {
  placement: MonetizationPlacement;
}) {
  return (
    <aside className="border-y border-amber-300/20 bg-amber-300/5 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <ToolBadge kind="affiliate" />
          <h2 className="mt-2 text-2xl font-black">{placement.title}</h2>
          <p className="mt-2 max-w-2xl text-slate-400">{placement.description}</p>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Affiliate disclosure: A2ZConvertor may earn a commission from
            recommended partner links.
          </p>
        </div>
        <Link
          href={placement.href}
          className="shrink-0 rounded-xl border border-amber-300/25 px-5 py-3 text-sm font-semibold text-amber-100 hover:bg-amber-300/10"
        >
          {placement.cta}
        </Link>
      </div>
    </aside>
  );
}