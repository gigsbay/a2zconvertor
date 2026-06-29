import { NextResponse } from "next/server";
import { buildAIPrompt } from "@/utils/aiPromptBuilders";
import { parseAIResponse } from "@/utils/aiResponseParser";
import {
  AI_TOOL_SLUGS,
  AIToolSlug,
  DEFAULT_AI_INPUT_LIMIT,
  DEFAULT_FREE_DAILY_LIMIT,
  SUMMARIZER_INPUT_LIMIT,
} from "@/utils/aiConfig";
import {
  getAIRuntimeConfig,
  getAIUsage,
  RATE_LIMIT_TTL_SECONDS,
} from "@/utils/aiRuntime";

export async function GET(request: Request) {
  try {
    const config = await getAIRuntimeConfig();
    if (!config.enabled || !config.kv) {
      return NextResponse.json({
        freeTrialEnabled: false,
        freeDailyLimit: config.dailyLimit,
        freeGenerationsRemaining: 0,
      });
    }

    const usage = await getAIUsage(
      request,
      config.kv,
      config.salt,
      config.dailyLimit,
    );
    return NextResponse.json({
      freeTrialEnabled: true,
      freeDailyLimit: config.dailyLimit,
      freeGenerationsRemaining: usage.remaining,
    });
  } catch {
    return NextResponse.json({
      freeTrialEnabled: false,
      freeDailyLimit: DEFAULT_FREE_DAILY_LIMIT,
      freeGenerationsRemaining: 0,
    });
  }
}

export async function POST(request: Request) {
  try {
    if (request.headers.get("sec-fetch-site") === "cross-site") {
      return error("Cross-site AI requests are not allowed.", 403);
    }
    if (Number(request.headers.get("content-length") || 0) > 12000) {
      return error("Request is too large.", 413);
    }

    const config = await getAIRuntimeConfig();
    if (!config.enabled || !config.kv) {
      return error(
        "Free AI generation is temporarily unavailable. Please try again later.",
        503,
      );
    }

    const body = (await request.json()) as {
      toolSlug?: unknown;
      inputs?: unknown;
    };
    const { toolSlug, inputs } = body;
    if (
      typeof toolSlug !== "string" ||
      !AI_TOOL_SLUGS.includes(toolSlug as AIToolSlug)
    ) {
      return error("Unknown AI tool.", 400);
    }
    if (!inputs || typeof inputs !== "object" || Array.isArray(inputs)) {
      return error("Tool inputs are required.", 400);
    }

    const cleanInputs = validateInputs(inputs as Record<string, unknown>);
    if (!cleanInputs.ok) return error(cleanInputs.message, cleanInputs.status);
    const inputLimit =
      toolSlug === "text-summarizer"
        ? SUMMARIZER_INPUT_LIMIT
        : DEFAULT_AI_INPUT_LIMIT;
    if (cleanInputs.length > inputLimit) {
      return error(
        "Please shorten your input to stay within the free AI limit.",
        413,
      );
    }
    if (cleanInputs.meaningfulLength < 3) {
      return error("Add a little more detail before generating.", 400);
    }

    const usage = await getAIUsage(
      request,
      config.kv,
      config.salt,
      config.dailyLimit,
    );
    if (usage.used >= config.dailyLimit) return dailyLimitError();

    const prompt = buildAIPrompt(toolSlug as AIToolSlug, cleanInputs.inputs);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": config.apiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.6,
            },
          }),
          signal: controller.signal,
        },
      );
      const data = await response.json();
      if (!response.ok) return providerError(response.status, data);

      const text = data.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("");
      if (!text) return error("Gemini returned no usable text.", 502);

      const parsed = parseAIResponse(toolSlug as AIToolSlug, text);
      if (!parsed.ok) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Gemini response parse failed", {
            toolSlug,
            provider: "gemini",
            model: config.model,
            parserReason: parsed.reason,
            responseTextLength: text.length,
          });
        }
        return error("AI response could not be formatted. Please try again.", 502);
      }
      const result = parsed.result;
      const nextCount = usage.used + 1;
      await config.kv.put(usage.key, String(nextCount), {
        expirationTtl: RATE_LIMIT_TTL_SECONDS,
      });
      return NextResponse.json({
        result,
        provider: "gemini",
        model: config.model,
        freeGenerationsRemaining: Math.max(
          0,
          config.dailyLimit - nextCount,
        ),
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (cause) {
    if (cause instanceof Error && cause.name === "AbortError") {
      return error("Gemini took too long to respond. Please try again.", 504);
    }
    if (cause instanceof SyntaxError) {
      return error("Request body must be valid JSON.", 400);
    }
    return error(
      "Free AI generation is temporarily unavailable. Please try again later.",
      503,
    );
  }
}

function validateInputs(values: Record<string, unknown>) {
  const entries = Object.entries(values);
  if (entries.length === 0 || entries.length > 12) {
    return {
      ok: false as const,
      message: "Tool inputs are required.",
      status: 400,
    };
  }

  const inputs: Record<string, string | boolean> = {};
  let length = 0;
  let meaningfulLength = 0;
  for (const [key, value] of entries) {
    if (
      !/^[a-zA-Z][a-zA-Z0-9]{0,39}$/.test(key) ||
      (typeof value !== "string" && typeof value !== "boolean")
    ) {
      return {
        ok: false as const,
        message: "One or more tool inputs are invalid.",
        status: 400,
      };
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

function dailyLimitError() {
  return NextResponse.json(
    {
      error:
        "Daily free AI limit reached. Please try again tomorrow or support A2ZConvertor to help keep AI tools free.",
      code: "DAILY_LIMIT_REACHED",
      supportUrl: "/support",
      freeGenerationsRemaining: 0,
    },
    {
      status: 429,
      headers: { "Retry-After": secondsUntilUtcMidnight().toString() },
    },
  );
}

function secondsUntilUtcMidnight() {
  const now = new Date();
  return Math.max(
    1,
    Math.ceil(
      (Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
      ) -
        now.getTime()) /
        1000,
    ),
  );
}

function providerError(status: number, data: unknown) {
  const raw = JSON.stringify(data).toLowerCase();
  if (
    (status === 400 &&
      (raw.includes("api key") || raw.includes("api_key"))) ||
    status === 401 ||
    status === 403
  ) {
    return error(
      "Free AI is temporarily unavailable because its provider configuration needs attention.",
      503,
    );
  }
  if (status === 429) {
    return error("Gemini is busy right now. Please try again shortly.", 429);
  }
  if (raw.includes("safety") || raw.includes("blocked")) {
    return error(
      "Gemini could not complete this request. Try revising the input.",
      400,
    );
  }
  return error("Gemini could not complete the request. Please try again.", 502);
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
