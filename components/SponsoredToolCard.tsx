import Link from "next/link";
import ToolBadge from "@/components/ToolBadge";
import { MonetizationPlacement } from "@/data/monetization";

export default function SponsoredToolCard({
  placement,
}: {
  placement: MonetizationPlacement;
}) {
  return (
    <aside className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-6">
      <ToolBadge kind="affiliate" />
      <h3 className="mt-2 text-xl font-bold text-white">{placement.title}</h3>
      <p className="mt-3 leading-7 text-slate-400">{placement.description}</p>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        Affiliate disclosure: this may be a paid or affiliate partner placement.
      </p>
      <Link
        href={placement.href}
        className="mt-5 inline-flex text-sm font-semibold text-amber-200 hover:text-amber-100"
      >
        {placement.cta}
      </Link>
    </aside>
  );
}