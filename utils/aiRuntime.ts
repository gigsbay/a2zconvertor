import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  ALLOWED_FREE_MODELS,
  DEFAULT_FREE_DAILY_LIMIT,
  DEFAULT_FREE_MODEL,
} from "@/utils/aiConfig";

export const RATE_LIMIT_TTL_SECONDS = 48 * 60 * 60;

type AIRuntimeEnv = CloudflareEnv & {
  AI_RATE_LIMIT_KV?: KVNamespace;
  GEMINI_API_KEY?: string;
  AI_RATE_LIMIT_SALT?: string;
  AI_FREE_TRIAL_ENABLED?: string;
  AI_FREE_DAILY_LIMIT?: string;
  AI_FREE_MODEL?: string;
};

export type AIReasonCode =
  | "TRIAL_DISABLED"
  | "MISSING_GEMINI_KEY"
  | "MISSING_RATE_LIMIT_SALT"
  | "MISSING_KV_BINDING"
  | "RUNTIME_UNAVAILABLE"
  | null;

export type AIRuntimeConfig = {
  enabled: boolean;
  configured: boolean;
  dailyLimit: number;
  model: string;
  apiKey: string;
  salt: string;
  kv?: KVNamespace;
  hasKvBinding: boolean;
  hasGeminiKey: boolean;
  hasRateLimitSalt: boolean;
  reasonCode: AIReasonCode;
};

export async function getAIRuntimeConfig(): Promise<AIRuntimeConfig> {
  let runtimeEnv: AIRuntimeEnv | undefined;
  let runtimeAvailable = true;

  try {
    runtimeEnv = (await getCloudflareContext({ async: true })).env as AIRuntimeEnv;
  } catch {
    runtimeAvailable = false;
  }

  const apiKey = readEnv(runtimeEnv, "GEMINI_API_KEY");
  const salt = readEnv(runtimeEnv, "AI_RATE_LIMIT_SALT");
  const trialEnabled = readEnv(runtimeEnv, "AI_FREE_TRIAL_ENABLED") === "true";
  const dailyLimit = parseDailyLimit(readEnv(runtimeEnv, "AI_FREE_DAILY_LIMIT"));
  const requestedModel = readEnv(runtimeEnv, "AI_FREE_MODEL") || DEFAULT_FREE_MODEL;
  const model = ALLOWED_FREE_MODELS.includes(
    requestedModel as (typeof ALLOWED_FREE_MODELS)[number],
  )
    ? requestedModel
    : DEFAULT_FREE_MODEL;
  const kv = runtimeEnv?.AI_RATE_LIMIT_KV;
  const hasKvBinding = Boolean(kv);
  const hasGeminiKey = Boolean(apiKey);
  const hasRateLimitSalt = Boolean(salt);
  const configured = hasKvBinding && hasGeminiKey && hasRateLimitSalt;

  let reasonCode: AIReasonCode = null;
  if (!trialEnabled) reasonCode = "TRIAL_DISABLED";
  else if (!hasGeminiKey) reasonCode = "MISSING_GEMINI_KEY";
  else if (!hasRateLimitSalt) reasonCode = "MISSING_RATE_LIMIT_SALT";
  else if (!hasKvBinding) {
    reasonCode = runtimeAvailable ? "MISSING_KV_BINDING" : "RUNTIME_UNAVAILABLE";
  }

  return {
    enabled: trialEnabled && configured,
    configured,
    dailyLimit,
    model,
    apiKey,
    salt,
    kv,
    hasKvBinding,
    hasGeminiKey,
    hasRateLimitSalt,
    reasonCode,
  };
}

export async function getAIUsage(
  request: Request,
  kv: KVNamespace,
  salt: string,
  dailyLimit: number,
) {
  const date = new Date().toISOString().slice(0, 10);
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${salt}:${ip}:${userAgent}:${date}`),
  );
  const hash = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const key = `ai:${date}:${hash}`;
  const rawValue = await kv.get(key);
  const parsedValue = rawValue === null ? 0 : Number.parseInt(rawValue, 10);
  const used = Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0;

  return {
    key,
    used,
    remaining: Math.max(0, dailyLimit - used),
  };
}

export function parseDailyLimit(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0
    ? Math.min(parsed, 20)
    : DEFAULT_FREE_DAILY_LIMIT;
}

function readEnv(env: AIRuntimeEnv | undefined, name: keyof AIRuntimeEnv) {
  const runtimeValue = env?.[name];
  if (typeof runtimeValue === "string") return runtimeValue.trim();
  return process.env[String(name)]?.trim() || "";
}
