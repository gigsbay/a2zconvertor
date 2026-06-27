export const AI_TOOL_SLUGS = [
  "hashtag-generator", "blog-title-generator", "email-template-generator", "text-summarizer",
  "instagram-caption-generator", "tiktok-hashtag-generator", "youtube-title-generator",
  "social-media-bio-generator", "content-ideas-generator", "ai-hook-generator",
  "ai-carousel-post-generator", "ai-linkedin-post-generator", "ai-video-script-generator",
  "ai-product-description-generator", "ai-ad-copy-generator",
] as const;
export type AIToolSlug = (typeof AI_TOOL_SLUGS)[number];
export const DEFAULT_FREE_MODEL = "gemini-2.5-flash-lite";
export const ALLOWED_FREE_MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash"] as const;
export const DEFAULT_FREE_DAILY_LIMIT = 10;
export const DEFAULT_AI_INPUT_LIMIT = 1200;
export const SUMMARIZER_INPUT_LIMIT = 2500;
