import ToolBadge from "@/components/ToolBadge";
import { QQTUBE_AFFILIATE_URL, SPONSORED_LINK_REL } from "@/utils/affiliate";

type QQTubeAffiliateBannerVariant = "social" | "youtube" | "creator" | "compact";

const variantCopy: Record<
  QQTubeAffiliateBannerVariant,
  {
    title: string;
    description: string;
    cta: string;
  }
> = {
  social: {
    title: "Social Media Growth Tools",
    description:
      "Explore creator-friendly tools for promoting your content and improving your online visibility across social platforms.",
    cta: "Explore Creator Growth Tools",
  },
  youtube: {
    title: "Grow Your YouTube Channel",
    description:
      "Discover tools that can support your video promotion workflow and help more people find your content.",
    cta: "Grow Social Media",
  },
  creator: {
    title: "Boost Your Creator Journey",
    description:
      "Pair AI drafts from A2ZConvertor with creator growth tools designed for content promotion and visibility.",
    cta: "Improve Your Online Visibility",
  },
  compact: {
    title: "Promote Your Content",
    description:
      "Explore social media growth tools for creators after generating your next idea or draft.",
    cta: "Grow Social Media",
  },
};

export default function QQTubeAffiliateBanner({
  variant = "creator",
  className = "",
}: {
  variant?: QQTubeAffiliateBannerVariant;
  className?: string;
}) {
  const copy = variantCopy[variant];
  const isCompact = variant === "compact";

  return (
    <aside
      className={`rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-900 p-6 shadow-lg shadow-amber-950/10 ${className}`}
    >
      <div
        className={
          isCompact
            ? "flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            : "grid gap-5 md:grid-cols-[1fr_auto] md:items-center"
        }
      >
        <div>
          <ToolBadge kind="affiliate" />
          <h2 className={isCompact ? "mt-3 text-2xl font-black text-white" : "mt-4 text-3xl font-black text-white"}>
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            {copy.description}
          </p>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Affiliate disclosure: we may earn a commission if you purchase via
            this link.
          </p>
        </div>

        <a
          href={QQTUBE_AFFILIATE_URL}
          target="_blank"
          rel={SPONSORED_LINK_REL}
          className="inline-flex justify-center rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
        >
          {copy.cta}
        </a>
      </div>
    </aside>
  );
}