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
  | "free_trial_disabled"
  | "missing_gemini_key"
  | "missing_rate_limit_salt"
  | "missing_kv_binding"
  | "invalid_daily_limit"
  | "unknown_error"
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
  try {
    let runtimeEnv: AIRuntimeEnv | undefined;
    try {
      runtimeEnv = (await getCloudflareContext({ async: true }))
        .env as AIRuntimeEnv;
    } catch {
      runtimeEnv = undefined;
    }

    const apiKey = readEnv(runtimeEnv, "GEMINI_API_KEY");
    const salt = readEnv(runtimeEnv, "AI_RATE_LIMIT_SALT");
    const trialEnabled =
      readEnv(runtimeEnv, "AI_FREE_TRIAL_ENABLED") === "true";
    const dailyLimitValue = readEnv(runtimeEnv, "AI_FREE_DAILY_LIMIT");
    const { dailyLimit, invalid: invalidDailyLimit } =
      parseDailyLimitDetails(dailyLimitValue);
    const requestedModel =
      readEnv(runtimeEnv, "AI_FREE_MODEL") || DEFAULT_FREE_MODEL;
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
    if (!trialEnabled) reasonCode = "free_trial_disabled";
    else if (!hasGeminiKey) reasonCode = "missing_gemini_key";
    else if (!hasRateLimitSalt) reasonCode = "missing_rate_limit_salt";
    else if (!hasKvBinding) reasonCode = "missing_kv_binding";
    else if (invalidDailyLimit) reasonCode = "invalid_daily_limit";

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
  } catch {
    return unavailableRuntimeConfig();
  }
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
  return parseDailyLimitDetails(value).dailyLimit;
}

function parseDailyLimitDetails(value: string) {
  const valid = /^\d+$/.test(value) && Number(value) > 0;
  const parsed = valid ? Number(value) : Number.NaN;
  return {
    dailyLimit: valid ? Math.min(parsed, 20) : DEFAULT_FREE_DAILY_LIMIT,
    invalid: value.length > 0 && !valid,
  };
}

function readEnv(env: AIRuntimeEnv | undefined, name: keyof AIRuntimeEnv) {
  const runtimeValue = env?.[name];
  if (typeof runtimeValue === "string") return runtimeValue.trim();
  if (typeof process === "undefined") return "";
  return process.env[String(name)]?.trim() || "";
}

function unavailableRuntimeConfig(): AIRuntimeConfig {
  return {
    enabled: false,
    configured: false,
    dailyLimit: DEFAULT_FREE_DAILY_LIMIT,
    model: DEFAULT_FREE_MODEL,
    apiKey: "",
    salt: "",
    hasKvBinding: false,
    hasGeminiKey: false,
    hasRateLimitSalt: false,
    reasonCode: "unknown_error",
  };
}
