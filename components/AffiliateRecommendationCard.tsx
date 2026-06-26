import { AffiliatePlacement } from "@/data/monetization";

const affiliateRel = "sponsored nofollow noopener noreferrer";

export default function AffiliateRecommendationCard({
  placement,
}: {
  placement: AffiliatePlacement;
}) {
  return (
    <aside className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-6">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-200">
        {placement.label}
      </p>
      <h3 className="mt-2 text-2xl font-black text-white">{placement.title}</h3>
      <p className="mt-3 leading-7 text-slate-300">{placement.context}</p>
      <p className="mt-3 leading-7 text-slate-400">{placement.description}</p>
      {placement.warning && (
        <p className="mt-3 rounded-xl border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-300">
          {placement.warning}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={placement.primaryHref}
          target="_blank"
          rel={affiliateRel}
          className="rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-200"
        >
          {placement.primaryCta}
        </a>
        {placement.secondaryHref && placement.secondaryCta && (
          <a
            href={placement.secondaryHref}
            target="_blank"
            rel={affiliateRel}
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            {placement.secondaryCta}
          </a>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        This page may contain affiliate links. If you buy through these links,
        A2ZConvertor may earn a commission at no extra cost to you.
      </p>
    </aside>
  );
}
