export type AIProvider = "openai" | "gemini";
export type AIMode = "free" | "byok";

export type AISettings = {
  mode: AIMode | "";
  provider: AIProvider;
  model: string;
  apiKey: string;
  remember: boolean;
};

export const providerModels: Record<AIProvider, string[]> = {
  openai: ["gpt-5-nano", "gpt-4o-mini"],
  gemini: ["gemini-2.5-flash-lite", "gemini-2.5-flash"],
};

export const defaultAISettings: AISettings = {
  mode: "",
  provider: "gemini",
  model: "gemini-2.5-flash-lite",
  apiKey: "",
  remember: false,
};

export const AI_SETTINGS_KEY = "a2z-ai-settings";

export const AI_TOOL_SLUGS = [
  "hashtag-generator",
  "blog-title-generator",
  "email-template-generator",
  "text-summarizer",
  "instagram-caption-generator",
  "tiktok-hashtag-generator",
  "youtube-title-generator",
  "social-media-bio-generator",
  "content-ideas-generator",
] as const;

export type AIToolSlug = (typeof AI_TOOL_SLUGS)[number];

export const DEFAULT_FREE_MODEL = "gemini-2.5-flash-lite";
export const DEFAULT_FREE_DAILY_LIMIT = 3;
export const DEFAULT_AI_INPUT_LIMIT = 1200;
export const SUMMARIZER_INPUT_LIMIT = 2500;
