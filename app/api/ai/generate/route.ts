import { NextResponse } from "next/server";
import { buildAIPrompt } from "@/utils/aiPromptBuilders";
import {
  AI_TOOL_SLUGS,
  AIToolSlug,
  AIProvider,
  DEFAULT_AI_INPUT_LIMIT,
  DEFAULT_FREE_DAILY_LIMIT,
  DEFAULT_FREE_MODEL,
  providerModels,
  SUMMARIZER_INPUT_LIMIT,
} from "@/utils/aiConfig";

export const runtime = "edge";

const freeUsage = new Map<string, { day: string; count: number }>();

export async function GET() {
  return NextResponse.json({
    freeTrialEnabled: isFreeTrialEnabled(),
    freeDailyLimit: getFreeDailyLimit(),
    freeModel: DEFAULT_FREE_MODEL,
  });
}

export async function POST(request: Request) {
  try {
    if (request.headers.get("sec-fetch-site") === "cross-site") {
      return error("Cross-site AI requests are not allowed.", 403);
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12000) return error("Request is too large.", 413);

    const body = await request.json();
    const { mode, provider, model, apiKey, toolSlug, inputs } = body ?? {};

    if (mode !== "free" && mode !== "byok") return error("Choose a valid AI usage mode.", 400);
    if (provider !== "openai" && provider !== "gemini") return error("Unknown AI provider.", 400);
    if (typeof toolSlug !== "string" || !AI_TOOL_SLUGS.includes(toolSlug as AIToolSlug)) {
      return error("Unknown AI tool.", 400);
    }
    if (!inputs || typeof inputs !== "object" || Array.isArray(inputs)) {
      return error("Tool inputs are required.", 400);
    }

    const cleanInputs = validateInputs(inputs as Record<string, unknown>);
    if (!cleanInputs.ok) return error(cleanInputs.message, cleanInputs.status);

    const limit = toolSlug === "text-summarizer" ? SUMMARIZER_INPUT_LIMIT : DEFAULT_AI_INPUT_LIMIT;
    if (cleanInputs.length > limit) {
      return error(`Input is too long. This tool accepts up to ${limit} characters.`, 413);
    }
    if (cleanInputs.meaningfulLength < 3) return error("Add a little more detail before generating.", 400);

    const selectedProvider = provider as AIProvider;
    const selectedModel = model;
    let selectedKey = typeof apiKey === "string" ? apiKey.trim() : "";
    let freeLimit: { remaining: number } | null = null;

    if (mode === "free") {
      if (!isFreeTrialEnabled()) return error("Free limited AI generation is not currently available.", 403);
      if (selectedProvider !== "gemini" || selectedModel !== DEFAULT_FREE_MODEL) {
        return error("Free limited AI generation uses Gemini 2.5 Flash-Lite.", 400);
      }
      selectedKey = process.env.GEMINI_API_KEY?.trim() || "";
      freeLimit = await consumeFreeGeneration(request);
      if (freeLimit.remaining < 0) {
        return NextResponse.json(
          { error: "Your free AI generation limit has been reached for today. Use your own API key or try again tomorrow." },
          { status: 429, headers: { "Retry-After": secondsUntilUtcMidnight().toString() } },
        );
      }
    } else {
      if (!selectedKey) return error("API key is required for bring-your-own-key mode.", 400);
      if (typeof selectedModel !== "string" || !providerModels[selectedProvider].includes(selectedModel)) {
        return error("Unsupported model for the selected provider.", 400);
      }
    }

    const prompt = buildAIPrompt(toolSlug as AIToolSlug, cleanInputs.inputs);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = selectedProvider === "openai"
        ? await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${selectedKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ model: selectedModel, input: prompt }),
            signal: controller.signal,
          })
        : await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(selectedModel)}:generateContent`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": selectedKey,
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json" },
            }),
            signal: controller.signal,
          });

      const data = await response.json();
      if (!response.ok) return providerError(response.status, data);

      const text = selectedProvider === "openai"
        ? data.output_text ?? data.output?.flatMap((item: { content?: { text?: string }[] }) => item.content ?? []).map((item: { text?: string }) => item.text ?? "").join("")
        : data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("");

      if (!text) return error("The provider returned no usable text.", 502);
      const clean = text.replace(/^```json\s*|\s*```$/g, "").trim();
      let result: unknown;
      try {
        result = JSON.parse(clean);
      } catch {
        return error("The provider returned invalid JSON. Please regenerate.", 502);
      }

      return NextResponse.json({
        result,
        mode,
        provider: selectedProvider,
        model: selectedModel,
        freeGenerationsRemaining: freeLimit?.remaining,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (cause) {
    if (cause instanceof Error && cause.name === "AbortError") return error("The provider request timed out.", 504);
    if (cause instanceof SyntaxError) return error("Request body must be valid JSON.", 400);
    return error("Unable to contact the AI provider.", 502);
  }
}

function validateInputs(values: Record<string, unknown>) {
  const entries = Object.entries(values);
  if (entries.length === 0 || entries.length > 12) {
    return { ok: false as const, message: "Tool inputs are required.", status: 400 };
  }

  const inputs: Record<string, string | boolean> = {};
  let length = 0;
  let meaningfulLength = 0;
  for (const [key, value] of entries) {
    if (!/^[a-zA-Z][a-zA-Z0-9]{0,39}$/.test(key) || (typeof value !== "string" && typeof value !== "boolean")) {
      return { ok: false as const, message: "One or more tool inputs are invalid.", status: 400 };
    }
    inputs[key] = value;
    if (typeof value === "string") {
      const trimmed = value.trim();
      length += trimmed.length;
      meaningfulLength = Math.max(meaningfulLength, trimmed.length);
    }
  }
  return { ok: true as const, inputs, length, meaningfulLength };
}

function isFreeTrialEnabled() {
  return process.env.AI_FREE_TRIAL_ENABLED === "true" && Boolean(process.env.GEMINI_API_KEY?.trim());
}

function getFreeDailyLimit() {
  const configured = Number.parseInt(process.env.AI_FREE_DAILY_LIMIT || "", 10);
  return Number.isFinite(configured) ? Math.min(Math.max(configured, 1), 20) : DEFAULT_FREE_DAILY_LIMIT;
}

async function consumeFreeGeneration(request: Request) {
  const day = new Date().toISOString().slice(0, 10);
  const identifier = request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || `${request.headers.get("user-agent") || "unknown"}:${request.headers.get("accept-language") || "unknown"}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(identifier));
  const key = Array.from(new Uint8Array(digest)).slice(0, 12).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const current = freeUsage.get(key);
  const count = current?.day === day ? current.count : 0;
  const limit = getFreeDailyLimit();
  if (count >= limit) return { remaining: -1 };
  freeUsage.set(key, { day, count: count + 1 });

  if (freeUsage.size > 5000) {
    for (const [entryKey, entry] of freeUsage) {
      if (entry.day !== day) freeUsage.delete(entryKey);
    }
  }
  return { remaining: limit - count - 1 };
}

function secondsUntilUtcMidnight() {
  const now = new Date();
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.max(1, Math.ceil((midnight - now.getTime()) / 1000));
}

function providerError(status: number, data: unknown) {
  const raw = JSON.stringify(data).toLowerCase();
  if (status === 400 && (raw.includes("api key") || raw.includes("api_key"))) return error("The API key was rejected. Check the key and provider.", 401);
  if (status === 401 || status === 403) return error("The API key was rejected. Check the key and provider.", 401);
  if (status === 429 && (raw.includes("quota") || raw.includes("billing"))) return error("The provider reports a billing or quota issue.", 429);
  if (status === 429) return error("The provider rate limit was reached. Try again later.", 429);
  if (raw.includes("safety") || raw.includes("blocked")) return error("The provider declined this request for safety reasons.", 400);
  return error("The AI provider could not complete the request.", 502);
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
