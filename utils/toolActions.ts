type ToolLike = {
  name: string;
  slug: string;
};

const actionLabels: Record<string, string> = {
  "hashtag-generator": "Generate hashtags",
  "blog-title-generator": "Generate titles",
  "email-template-generator": "Generate email",
  "text-summarizer": "Summarize text",
  "instagram-caption-generator": "Generate captions",
  "tiktok-hashtag-generator": "Generate hashtags",
  "youtube-title-generator": "Generate titles",
  "social-media-bio-generator": "Generate bios",
  "content-ideas-generator": "Generate ideas",
  "ai-hook-generator": "Generate hooks",
  "ai-carousel-post-generator": "Generate carousel",
  "ai-linkedin-post-generator": "Generate post",
  "ai-video-script-generator": "Generate script",
  "ai-product-description-generator": "Generate descriptions",
  "ai-ad-copy-generator": "Generate ad copy",
};

export function getToolActionLabel(tool: ToolLike) {
  if (actionLabels[tool.slug]) return actionLabels[tool.slug];

  const cleaned = tool.name
    .replace(/^AI\s+/i, "")
    .replace(/\s+Generator$/i, "")
    .trim()
    .toLowerCase();

  return cleaned ? `Open ${cleaned}` : "Open tool";
}
