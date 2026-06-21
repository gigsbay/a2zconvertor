import { NextResponse } from "next/server";
import { getAIRuntimeConfig, getAIUsage } from "@/utils/aiRuntime";
import {
  DEFAULT_FREE_DAILY_LIMIT,
  DEFAULT_FREE_MODEL,
} from "@/utils/aiConfig";

export async function GET(request: Request) {
  try {
    const config = await getAIRuntimeConfig();
    let used = 0;
    let remaining = config.enabled ? config.dailyLimit : 0;

    if (config.enabled && config.kv) {
      try {
        const usage = await getAIUsage(
          request,
          config.kv,
          config.salt,
          config.dailyLimit,
        );
        used = usage.used;
        remaining = usage.remaining;
      } catch {
        return statusJson({
          enabled: false,
          configured: false,
          dailyLimit: config.dailyLimit,
          used: 0,
          remaining: 0,
          model: config.model,
          reasonCode: "kv_read_failed",
          hasKvBinding: config.hasKvBinding,
          hasGeminiKey: config.hasGeminiKey,
          hasRateLimitSalt: config.hasRateLimitSalt,
        });
      }
    }

    return statusJson({
      enabled: config.enabled,
      configured: config.configured,
      dailyLimit: config.dailyLimit,
      used,
      remaining,
      model: config.model,
      reasonCode: config.reasonCode,
      hasKvBinding: config.hasKvBinding,
      hasGeminiKey: config.hasGeminiKey,
      hasRateLimitSalt: config.hasRateLimitSalt,
    });
  } catch {
    return statusJson({
      enabled: false,
      configured: false,
      dailyLimit: DEFAULT_FREE_DAILY_LIMIT,
      used: 0,
      remaining: 0,
      model: DEFAULT_FREE_MODEL,
      reasonCode: "unknown_error",
      hasKvBinding: false,
      hasGeminiKey: false,
      hasRateLimitSalt: false,
    });
  }
}

type SafeStatus = {
  enabled: boolean;
  configured: boolean;
  dailyLimit: number;
  used: number;
  remaining: number;
  model: string;
  reasonCode: string | null;
  hasKvBinding: boolean;
  hasGeminiKey: boolean;
  hasRateLimitSalt: boolean;
};

function statusJson(status: SafeStatus) {
  return NextResponse.json(status, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
