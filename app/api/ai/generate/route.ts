import { NextResponse } from "next/server";
import { buildAIPrompt } from "@/utils/aiPromptBuilders";
import { AIProvider, providerModels } from "@/utils/aiConfig";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, model, apiKey, toolSlug, inputs } = body ?? {};
    if (!apiKey || typeof apiKey !== "string") return error("API key is required.", 400);
    if (provider !== "openai" && provider !== "gemini") return error("Unknown AI provider.", 400);
    const validProvider = provider as AIProvider;
    if (typeof model !== "string" || !providerModels[validProvider].includes(model)) return error("Unsupported model.", 400);
    if (!toolSlug || !inputs || typeof inputs !== "object") return error("Tool inputs are required.", 400);
    const serialized = JSON.stringify(inputs);
    if (serialized.length > 20000) return error("Input is too long.", 413);
    const prompt = buildAIPrompt(toolSlug, inputs);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = validProvider === "openai"
        ? await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({ model, input: prompt }),
            signal: controller.signal,
          })
        : await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            signal: controller.signal,
          });
      const data = await response.json();
      if (!response.ok) return providerError(response.status, data);
      const text = validProvider === "openai"
        ? data.output_text ?? data.output?.flatMap((item: { content?: { text?: string }[] }) => item.content ?? []).map((item: { text?: string }) => item.text ?? "").join("")
        : data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("");
      if (!text) return error("The provider returned no usable text.", 502);
      const clean = text.replace(/^```json\s*|\s*```$/g, "").trim();
      let result: unknown;
      try { result = JSON.parse(clean); } catch { return error("The provider returned invalid JSON. Please regenerate.", 502); }
      return NextResponse.json({ result, provider, model });
    } finally {
      clearTimeout(timeout);
    }
  } catch (cause) {
    if (cause instanceof Error && cause.name === "AbortError") return error("The provider request timed out.", 504);
    return error("Unable to contact the AI provider.", 502);
  }
}

function providerError(status: number, data: unknown) {
  const raw = JSON.stringify(data).toLowerCase();
  if (status === 401 || status === 403) return error("The API key was rejected. Check the key and provider.", 401);
  if (status === 429 && (raw.includes("quota") || raw.includes("billing"))) return error("The provider reports a billing or quota issue.", 429);
  if (status === 429) return error("The provider rate limit was reached. Try again later.", 429);
  if (raw.includes("safety") || raw.includes("blocked")) return error("The provider declined this request for safety reasons.", 400);
  return error("The AI provider could not complete the request.", 502);
}

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
