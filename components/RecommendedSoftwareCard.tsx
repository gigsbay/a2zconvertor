import Link from "next/link";
import { MonetizationPlacement } from "@/data/monetization";

export default function RecommendedSoftwareCard({
  placement,
}: {
  placement: MonetizationPlacement;
}) {
  return (
    <aside className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-6">
      <p className="text-xs font-bold uppercase text-blue-300">
        {placement.label}
      </p>
      <h3 className="mt-2 text-xl font-bold">{placement.title}</h3>
      <p className="mt-3 leading-7 text-slate-400">{placement.description}</p>
      <Link
        href={placement.href}
        className="mt-5 inline-flex text-sm font-semibold text-blue-300 hover:text-blue-200"
      >
        {placement.cta}
      </Link>
    </aside>
  );
}
