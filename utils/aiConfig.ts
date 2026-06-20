export type AIProvider = "openai" | "gemini";

export type AISettings = {
  provider: AIProvider;
  model: string;
  apiKey: string;
  remember: boolean;
};

export const providerModels: Record<AIProvider, string[]> = {
  openai: ["gpt-4.1-mini", "gpt-4.1", "gpt-4o-mini"],
  gemini: ["gemini-2.5-flash", "gemini-2.5-pro"],
};

export const defaultAISettings: AISettings = {
  provider: "openai",
  model: "gpt-4.1-mini",
  apiKey: "",
  remember: false,
};

export const AI_SETTINGS_KEY = "a2z-ai-settings";
