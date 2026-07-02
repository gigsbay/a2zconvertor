export type AiClickContent = {
  primaryCta: string;
  useCases: string[];
  tryIf: string[];
  relatedAiSlugs: string[];
  resourceLinks: { href: string; label: string }[];
};

export const priorityAiToolSlugs = [
  "hashtag-generator",
  "instagram-caption-generator",
  "ai-hook-generator",
  "ai-video-script-generator",
  "ai-linkedin-post-generator",
  "content-ideas-generator",
] as const;

export const aiClickContent: Record<string, AiClickContent> = {
  "hashtag-generator": {
    primaryCta: "Generate hashtags",
    useCases: [
      "Build grouped hashtag sets for Instagram, TikTok, LinkedIn or X.",
      "Turn a product, niche or campaign topic into editable hashtag ideas.",
      "Create a quick starting point before scheduling a social post.",
    ],
    tryIf: [
      "You know the topic but keep reusing the same tags.",
      "You want broad, niche and content-specific hashtag ideas together.",
      "You need hashtags without claims about guaranteed reach.",
    ],
    relatedAiSlugs: ["instagram-caption-generator", "tiktok-hashtag-generator", "content-ideas-generator", "ai-hook-generator"],
    resourceLinks: [
      { href: "/resources/free-ai-social-media-tools", label: "Free AI social media tools" },
      { href: "/resources/free-ai-writing-tools", label: "Free AI writing tools" },
    ],
  },
  "instagram-caption-generator": {
    primaryCta: "Generate captions",
    useCases: [
      "Draft caption options for product launches, updates and behind-the-scenes posts.",
      "Create short captions, CTA lines and longer caption starters from one topic.",
      "Match your caption tone to friendly, funny, professional, aesthetic or bold posts.",
    ],
    tryIf: [
      "You have an image ready but the caption is slowing you down.",
      "You want several caption angles before choosing one.",
      "You need editable Instagram copy without guaranteed growth claims.",
    ],
    relatedAiSlugs: ["hashtag-generator", "content-ideas-generator", "social-media-bio-generator", "ai-hook-generator"],
    resourceLinks: [
      { href: "/resources/instagram-caption-ideas", label: "Instagram caption ideas" },
      { href: "/resources/free-ai-social-media-tools", label: "Free AI social media tools" },
    ],
  },
  "ai-hook-generator": {
    primaryCta: "Generate hooks",
    useCases: [
      "Create opening lines for posts, videos, emails and short articles.",
      "Explore problem-led, curiosity-led and benefit-led hook angles.",
      "Rewrite a weak opening into options that are clearer and more specific.",
    ],
    tryIf: [
      "Your content idea is useful but the first line feels flat.",
      "You want several hooks before writing the full post.",
      "You need punchy ideas without fake urgency or unsupported promises.",
    ],
    relatedAiSlugs: ["ai-video-script-generator", "instagram-caption-generator", "ai-linkedin-post-generator", "ai-ad-copy-generator"],
    resourceLinks: [
      { href: "/resources/ai-hook-ideas", label: "AI hook ideas guide" },
      { href: "/resources/free-ai-writing-tools", label: "Free AI writing tools" },
    ],
  },
  "ai-video-script-generator": {
    primaryCta: "Generate script",
    useCases: [
      "Plan short-form scripts for TikTok, Reels, Shorts or LinkedIn video.",
      "Turn a topic into hook, main points, on-screen text and CTA ideas.",
      "Create a rough script before recording a quick screen demo or talking-head clip.",
    ],
    tryIf: [
      "You know the video topic but need a simple structure.",
      "You want to record faster with a clear opening and ending.",
      "You need editable script ideas, not guaranteed viral claims.",
    ],
    relatedAiSlugs: ["ai-hook-generator", "youtube-title-generator", "content-ideas-generator", "instagram-caption-generator"],
    resourceLinks: [
      { href: "/resources/short-video-script-ideas", label: "Short video script ideas" },
      { href: "/resources/free-ai-social-media-tools", label: "Free AI social media tools" },
    ],
  },
  "ai-linkedin-post-generator": {
    primaryCta: "Generate LinkedIn post",
    useCases: [
      "Draft professional LinkedIn posts from lessons, launches or useful observations.",
      "Create founder-style, helpful or story-led post options from one topic.",
      "Turn a rough note into a clearer post structure with CTA ideas.",
    ],
    tryIf: [
      "You want to post on LinkedIn but need a cleaner first draft.",
      "You have the point but need better structure and flow.",
      "You want editable copy that still needs your real examples and judgement.",
    ],
    relatedAiSlugs: ["ai-hook-generator", "content-ideas-generator", "email-template-generator", "ai-ad-copy-generator"],
    resourceLinks: [
      { href: "/resources/linkedin-post-ideas", label: "LinkedIn post ideas" },
      { href: "/resources/free-ai-writing-tools", label: "Free AI writing tools" },
    ],
  },
  "content-ideas-generator": {
    primaryCta: "Generate content ideas",
    useCases: [
      "Plan educational, entertaining, promotional and personal post ideas.",
      "Create a list of ideas for a niche, platform and content goal.",
      "Build a starter content calendar before writing captions or scripts.",
    ],
    tryIf: [
      "You are stuck deciding what to post next.",
      "You want ideas grouped by content type instead of one long list.",
      "You need a quick planning prompt before using caption or hook tools.",
    ],
    relatedAiSlugs: ["instagram-caption-generator", "ai-video-script-generator", "hashtag-generator", "ai-hook-generator"],
    resourceLinks: [
      { href: "/resources/free-ai-social-media-tools", label: "Free AI social media tools" },
      { href: "/resources/content-ideas-for-small-businesses", label: "Content ideas for small businesses" },
    ],
  },
};

export function getAiClickContent(slug: string) {
  return aiClickContent[slug] ?? null;
}