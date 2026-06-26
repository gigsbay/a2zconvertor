import type { AIToolSlug } from "@/utils/aiConfig";

type AIResult = Record<string, unknown>;
type ParseSuccess = { ok: true; result: AIResult };
type ParseFailure = { ok: false; reason: string };

type FieldKind = "string" | "stringArray" | "titleArray" | "slideArray";

type ToolSchema = {
  fields: Record<string, FieldKind>;
  aliases?: Record<string, string>;
};

const toolSchemas: Record<AIToolSlug, ToolSchema> = {
  "hashtag-generator": {
    fields: {
      bestSet: "stringArray",
      nicheHashtags: "stringArray",
      broadHashtags: "stringArray",
      specificHashtags: "stringArray",
    },
    aliases: { bestHashtagSet: "bestSet", best: "bestSet" },
  },
  "blog-title-generator": { fields: { titles: "stringArray" } },
  "email-template-generator": {
    fields: {
      subjectLine: "string",
      emailBody: "string",
      shorterVersion: "string",
      followUpLine: "string",
    },
    aliases: { body: "emailBody", subject: "subjectLine", followUp: "followUpLine" },
  },
  "text-summarizer": {
    fields: {
      summary: "string",
      bulletPoints: "stringArray",
      keyTakeaways: "stringArray",
    },
    aliases: { shortSummary: "summary", bulletSummary: "bulletPoints" },
  },
  "instagram-caption-generator": {
    fields: {
      mainCaptions: "stringArray",
      shortCaptions: "stringArray",
      ctaLines: "stringArray",
    },
    aliases: { captions: "mainCaptions", ctas: "ctaLines" },
  },
  "tiktok-hashtag-generator": {
    fields: {
      broadHashtags: "stringArray",
      nicheHashtags: "stringArray",
      viralStyleHashtags: "stringArray",
    },
    aliases: { viralHashtags: "viralStyleHashtags", contentStyle: "viralStyleHashtags", audience: "nicheHashtags" },
  },
  "youtube-title-generator": { fields: { titles: "titleArray" } },
  "social-media-bio-generator": {
    fields: {
      bioOptions: "stringArray",
      shortBio: "string",
      professionalBio: "string",
      ctaLine: "string",
    },
    aliases: { bios: "bioOptions", creatorBio: "bioOptions", punchyBio: "bioOptions", cta: "ctaLine" },
  },
  "content-ideas-generator": {
    fields: {
      educational: "stringArray",
      entertaining: "stringArray",
      promotional: "stringArray",
      personalBehindTheScenes: "stringArray",
    },
    aliases: { personal: "personalBehindTheScenes", behindTheScenes: "personalBehindTheScenes" },
  },
  "ai-hook-generator": {
    fields: {
      shortHooks: "stringArray",
      curiosityHooks: "stringArray",
      problemSolutionHooks: "stringArray",
    },
  },
  "ai-carousel-post-generator": {
    fields: {
      slides: "slideArray",
      caption: "string",
      cta: "string",
    },
    aliases: { captionSuggestion: "caption", finalCta: "cta", finalCTA: "cta" },
  },
  "ai-linkedin-post-generator": {
    fields: {
      shortPost: "string",
      storyPost: "string",
      professionalPost: "string",
      hooks: "stringArray",
      ctas: "stringArray",
    },
    aliases: { storyStylePost: "storyPost", ctaLines: "ctas", cta: "ctas" },
  },
  "ai-video-script-generator": {
    fields: {
      hook: "string",
      script: "string",
      onScreenText: "stringArray",
      cta: "string",
      titleIdeas: "stringArray",
    },
    aliases: { mainScript: "script", onScreenTextIdeas: "onScreenText" },
  },
  "ai-product-description-generator": {
    fields: {
      shortDescription: "string",
      longDescription: "string",
      featureBullets: "stringArray",
      seoTitle: "string",
      metaDescription: "string",
    },
  },
  "ai-ad-copy-generator": {
    fields: {
      headlines: "stringArray",
      primaryTexts: "stringArray",
      ctaLines: "stringArray",
      adAngles: "stringArray",
    },
    aliases: { shortAdHeadlines: "headlines", primaryTextOptions: "primaryTexts", ctas: "ctaLines" },
  },
};

export function parseAIResponse(toolSlug: AIToolSlug, rawText: string): ParseSuccess | ParseFailure {
  const parsed = parseJsonLenient(rawText);
  if (!parsed.ok) return parsed;
  if (!isRecord(parsed.value)) return { ok: false, reason: "json_not_object" };

  const schema = toolSchemas[toolSlug];
  const normalizedInput = applyAliases(parsed.value, schema.aliases ?? {});
  const result: AIResult = {};

  for (const [key, kind] of Object.entries(schema.fields)) {
    const value = normalizedInput[key];
    if (kind === "string") result[key] = normalizeString(value);
    if (kind === "stringArray") result[key] = normalizeStringArray(value);
    if (kind === "titleArray") result[key] = normalizeTitleArray(value);
    if (kind === "slideArray") result[key] = normalizeSlideArray(value);
  }

  if (!hasUsefulContent(result)) return { ok: false, reason: "no_useful_content" };
  return { ok: true, result: removeEmptyFields(result) };
}

function parseJsonLenient(rawText: string): { ok: true; value: unknown } | ParseFailure {
  const candidates = collectJsonCandidates(rawText);
  for (const candidate of candidates) {
    try {
      return { ok: true, value: JSON.parse(candidate) };
    } catch {
      // Try the next candidate.
    }
  }
  return { ok: false, reason: "json_parse_failed" };
}

function collectJsonCandidates(rawText: string) {
  const trimmed = rawText.trim();
  const candidates = new Set<string>();
  if (trimmed) candidates.add(trimmed);

  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fenceMatch?.[1]) candidates.add(fenceMatch[1].trim());

  const fencedBlocks = Array.from(trimmed.matchAll(/```(?:json)?\s*([\s\S]*?)\s*```/gi));
  for (const match of fencedBlocks) {
    if (match[1]) candidates.add(match[1].trim());
  }

  const extracted = extractFirstJsonValue(trimmed);
  if (extracted) candidates.add(extracted);

  return Array.from(candidates).filter(Boolean);
}

function extractFirstJsonValue(text: string) {
  for (let start = 0; start < text.length; start += 1) {
    const opener = text[start];
    if (opener !== "{" && opener !== "[") continue;
    const closer = opener === "{" ? "}" : "]";
    const stack = [closer];
    let inString = false;
    let escaped = false;

    for (let index = start + 1; index < text.length; index += 1) {
      const char = text[index];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = inString;
        continue;
      }
      if (char === '"') {
        inString = !inString;
        continue;
      }
      if (inString) continue;
      if (char === "{") stack.push("}");
      if (char === "[") stack.push("]");
      if (char === stack[stack.length - 1]) {
        stack.pop();
        if (stack.length === 0) return text.slice(start, index + 1).trim();
      }
    }
  }
  return "";
}

function applyAliases(value: Record<string, unknown>, aliases: Record<string, string>) {
  const output: Record<string, unknown> = { ...value };
  for (const [from, to] of Object.entries(aliases)) {
    if (output[to] === undefined && output[from] !== undefined) output[to] = output[from];
  }
  return output;
}

function normalizeString(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function normalizeStringArray(value: unknown) {
  const rawItems = Array.isArray(value) ? value : typeof value === "string" ? value.split(/\r?\n|,/g) : [];
  return uniqueStrings(rawItems.map((item) => normalizeString(item)).filter(Boolean));
}

function normalizeTitleArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const titles: Array<string | { title: string; characterCount?: number }> = [];

  for (const item of value) {
    if (typeof item === "string") {
      const title = item.trim();
      const key = title.toLowerCase();
      if (title && !seen.has(key)) {
        seen.add(key);
        titles.push(title);
      }
      continue;
    }
    if (!isRecord(item)) continue;
    const title = normalizeString(item.title);
    const key = title.toLowerCase();
    if (!title || seen.has(key)) continue;
    seen.add(key);
    const characterCount = Number(item.characterCount);
    titles.push(Number.isFinite(characterCount) && characterCount > 0 ? { title, characterCount } : { title });
  }
  return titles;
}

function normalizeSlideArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => {
    if (typeof item === "string") return { title: `Slide ${index + 1}`, text: item.trim() };
    if (!isRecord(item)) return null;
    const title = normalizeString(item.title) || normalizeString(item.headline) || `Slide ${normalizeString(item.slide) || index + 1}`;
    const text = normalizeString(item.text) || normalizeString(item.body) || normalizeString(item.copy);
    return text ? { title, text } : null;
  }).filter((item): item is { title: string; text: string } => Boolean(item));
}

function uniqueStrings(items: string[]) {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const item of items) {
    const normalized = item.replace(/\s+/g, " ").trim();
    const key = normalized.toLowerCase();
    if (!normalized || seen.has(key)) continue;
    seen.add(key);
    unique.push(normalized);
  }
  return unique;
}

function removeEmptyFields(result: AIResult) {
  return Object.fromEntries(Object.entries(result).filter(([, value]) => {
    if (typeof value === "string") return value.length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  }));
}

function hasUsefulContent(result: AIResult) {
  return Object.values(result).some((value) => {
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return false;
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
