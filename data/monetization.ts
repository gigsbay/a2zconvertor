export type MonetizationPlacement = {
  id: string;
  label: "Sponsored" | "Recommended";
  title: string;
  description: string;
  href: string;
  cta: string;
  contexts: ("tool" | "category" | "resource" | "comparison")[];
};

export type AffiliatePlacement = {
  id: "pdfelement" | "pdf-password-remover" | "filmora" | "uniconverter";
  label: "Affiliate recommendation";
  title: string;
  description: string;
  primaryHref: string;
  primaryCta: string;
  secondaryHref?: string;
  secondaryCta?: string;
  context: string;
  warning?: string;
};

export const monetizationPlacements: MonetizationPlacement[] = [
  {
    id: "sponsored-tool-slot",
    label: "Sponsored",
    title: "Featured software partner",
    description:
      "A reserved placement for a relevant file, productivity or document software partner.",
    href: "/partners",
    cta: "Explore partnership options",
    contexts: ["tool", "category"],
  },
  {
    id: "recommended-software-slot",
    label: "Recommended",
    title: "Need a full desktop workflow?",
    description:
      "This space can recommend trusted software when a browser tool is not enough for a complex workflow.",
    href: "/partners",
    cta: "View partner information",
    contexts: ["resource", "comparison"],
  },
  {
    id: "affiliate-resource-slot",
    label: "Recommended",
    title: "Compare specialist software",
    description:
      "A clearly disclosed placement for useful software, hosting, privacy or storage products.",
    href: "/partners",
    cta: "See how recommendations work",
    contexts: ["resource"],
  },
];

const pdfelement: AffiliatePlacement = {
  id: "pdfelement",
  label: "Affiliate recommendation",
  title: "Wondershare PDFelement",
  description:
    "Need advanced PDF editing, conversion, signing or protection? PDFelement is a desktop PDF editor for users who need more than basic browser tools.",
  primaryHref: "https://www.jdoqocy.com/click-101806287-14507427",
  primaryCta: "Try PDFelement",
  secondaryHref: "https://www.anrdoezrs.net/click-101806287-15904302",
  secondaryCta: "View pricing",
  context:
    "Use A2ZConvertor for quick browser-based PDF tools. For advanced PDF editing, signing, conversion or larger desktop workflows, try PDFelement.",
};

export const pdfPasswordRemover: AffiliatePlacement = {
  id: "pdf-password-remover",
  label: "Affiliate recommendation",
  title: "Wondershare PDF Password Remover",
  description:
    "Need help with protected PDF workflows? Use a dedicated desktop tool when browser-based PDF tools are not enough.",
  primaryHref: "https://www.anrdoezrs.net/click-101806287-13467294",
  primaryCta: "Try PDF Password Remover",
  context:
    "Only use PDF password tools for documents you own or have permission to access.",
  warning:
    "Only use PDF password tools for documents you own or have permission to access.",
};

const filmora: AffiliatePlacement = {
  id: "filmora",
  label: "Affiliate recommendation",
  title: "Wondershare Filmora",
  description:
    "Create, edit and polish videos for YouTube, TikTok, Reels and social content with Filmora.",
  primaryHref: "https://www.anrdoezrs.net/click-101806287-17060329",
  primaryCta: "Try Filmora",
  secondaryHref: "https://www.anrdoezrs.net/click-101806287-13985389",
  secondaryCta: "View features",
  context:
    "After generating your script, hook or title, use Filmora to edit and publish your video. Results still depend on your creative work and audience fit.",
};

const uniconverter: AffiliatePlacement = {
  id: "uniconverter",
  label: "Affiliate recommendation",
  title: "Wondershare UniConverter",
  description:
    "Need desktop video, audio or batch file conversion? UniConverter is useful when browser-based tools are not enough.",
  primaryHref: "https://www.anrdoezrs.net/click-101806287-15022793",
  primaryCta: "Try UniConverter",
  context:
    "Use A2ZConvertor for quick browser-based conversions. For larger files, batch workflows or desktop video/audio conversion, UniConverter may be useful.",
};

const pdfToolSlugs = new Set([
  "compress-pdf",
  "pdf-merge",
  "pdf-split",
  "organize-pdf",
  "image-to-pdf",
  "pdf-to-image",
  "add-page-numbers-pdf",
  "watermark-pdf",
  "rotate-pdf",
  "delete-pdf-pages",
  "extract-pdf-pages",
  "crop-pdf",
]);

const uniConverterToolSlugs = new Set([
  "video-to-gif",
  "video-thumbnail-extractor",
  "mp4-to-mp3",
  "audio-converter",
  "change-audio-volume",
  "mp3-cutter",
  "video-metadata",
  "audio-metadata",
]);

const filmoraToolSlugs = new Set([
  "ai-video-script-generator",
  "youtube-title-generator",
  "ai-hook-generator",
  "content-ideas-generator",
  "ai-carousel-post-generator",
  "video-thumbnail-extractor",
]);

export function getAffiliatePlacementsForTool(slug: string) {
  return uniquePlacements([
    pdfToolSlugs.has(slug) ? pdfelement : null,
    uniConverterToolSlugs.has(slug) ? uniconverter : null,
    filmoraToolSlugs.has(slug) ? filmora : null,
  ]);
}

export function getAffiliatePlacementsForCategory(slug: string) {
  return uniquePlacements([
    slug === "pdf-tools" ? pdfelement : null,
    slug === "video-tools" || slug === "audio-tools" ? uniconverter : null,
    slug === "video-tools" || slug === "social-media-tools" ? filmora : null,
  ]);
}

export function getAffiliatePlacementsForResource(slug: string) {
  return uniquePlacements([
    ["best-free-pdf-tools", "best-pdf-compressor-tools"].includes(slug) ? pdfelement : null,
    slug === "browser-based-file-conversion" ? uniconverter : null,
    ["short-video-script-ideas", "youtube-title-ideas", "free-ai-social-media-tools", "ai-hook-ideas", "carousel-post-ideas"].includes(slug) ? filmora : null,
  ]);
}

export function getAffiliatePlacementsForComparison(slug: string) {
  return uniquePlacements([
    slug === "pdf-compressor-online-vs-desktop-software" ? pdfelement : null,
  ]);
}

export function getPlacement(
  context: MonetizationPlacement["contexts"][number],
  index = 0
) {
  const matches = monetizationPlacements.filter((placement) =>
    placement.contexts.includes(context)
  );
  return matches[index % matches.length];
}

function uniquePlacements(placements: Array<AffiliatePlacement | null>) {
  const seen = new Set<string>();
  return placements.filter((placement): placement is AffiliatePlacement => {
    if (!placement || seen.has(placement.id)) return false;
    seen.add(placement.id);
    return true;
  });
}

export const approvedWondershareAffiliateUrls = {
  pdfelementHomepage: "https://www.jdoqocy.com/click-101806287-14507427",
  pdfelementPricing: "https://www.anrdoezrs.net/click-101806287-15904302",
  pdfPasswordRemover: "https://www.anrdoezrs.net/click-101806287-13467294",
  filmoraHomepage: "https://www.anrdoezrs.net/click-101806287-17060329",
  filmoraFeatures: "https://www.anrdoezrs.net/click-101806287-13985389",
  uniconverter: "https://www.anrdoezrs.net/click-101806287-15022793",
};
