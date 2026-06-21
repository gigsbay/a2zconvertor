import { NextResponse } from "next/server";
import { getAIRuntimeConfig, getAIUsage } from "@/utils/aiRuntime";

export const runtime = "edge";

export async function GET(request: Request) {
  const config = await getAIRuntimeConfig();
  let used = 0;
  let remaining = config.enabled ? config.dailyLimit : 0;
  let reasonCode = config.reasonCode;

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
      reasonCode = "RUNTIME_UNAVAILABLE";
      remaining = 0;
    }
  }

  return NextResponse.json(
    {
      enabled: config.enabled && reasonCode === null,
      configured: config.configured,
      dailyLimit: config.dailyLimit,
      used,
      remaining,
      model: config.model,
      reasonCode,
      hasKvBinding: config.hasKvBinding,
      hasGeminiKey: config.hasGeminiKey,
      hasRateLimitSalt: config.hasRateLimitSalt,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
