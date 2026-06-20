# AI BYOK and Free Trial Setup

A2ZConvertor supports two ways to use its AI text and social tools:

1. Free limited AI generation funded by the site owner and powered by Gemini.
2. Bring your own key (BYOK) using a Gemini or OpenAI API key.

The tools never silently replace a failed AI request with template or rule-based output.

## What BYOK means

BYOK means the user supplies an API key from their own provider account. Provider
usage, billing, quotas and rate limits apply to that account. A2ZConvertor sends
the key through its backend proxy only for the active generation request.

## Required Cloudflare environment variables

Owner-funded free mode uses server-only variables:

```txt
GEMINI_API_KEY=your-owner-gemini-key
AI_FREE_TRIAL_ENABLED=false
AI_FREE_DAILY_LIMIT=3
```

Keep `AI_FREE_TRIAL_ENABLED=false` until you have reviewed the cost and abuse
controls. Free mode appears in the UI only when the flag is exactly `true` and
`GEMINI_API_KEY` is present.

Do not prefix the owner key with `NEXT_PUBLIC_`. Next.js exposes
`NEXT_PUBLIC_` values to browser code, which would reveal the private key.
Never commit API keys to Git or documentation.

In Cloudflare, add these as Worker variables/secrets for the production
environment. Store `GEMINI_API_KEY` as a secret. The feature flag and daily
limit may be ordinary variables.

## Free limited AI mode

Free mode always uses `gemini-2.5-flash-lite`. The default allowance is three
attempts per user per UTC day. Standard tools accept up to 1,200 input
characters; Text Summarizer accepts up to 2,500.

The current implementation uses a hashed request identifier and an in-memory
per-isolate counter. It adds useful basic protection without changing
Cloudflare deployment configuration, but it is not a globally durable limit.
Worker restarts and separate isolates can reset or split counters. Before
promoting free mode broadly, add a durable Cloudflare KV/D1-backed limiter or a
dedicated rate-limit service, and consider Turnstile for suspicious traffic.

Disable owner-funded generation immediately by setting:

```txt
AI_FREE_TRIAL_ENABLED=false
```

BYOK mode continues to work when free mode is disabled.

## Getting an API key

- Gemini: https://aistudio.google.com/app/apikey
- OpenAI: https://platform.openai.com/api-keys

Each AI tool includes a **How to find your API key** button beside the provider
settings with these official links.

ChatGPT Plus and OpenAI API usage are separate products. A ChatGPT subscription
does not automatically provide API credit or an API key.

## Browser storage

A BYOK key stays in component memory by default. It is written to localStorage
only when the user selects **Remember my key on this browser**. A2ZConvertor
does not store user keys in a database and the backend route does not log or
echo them.

Use **Clear saved AI settings** in any AI tool to remove saved provider, model
and key data from that browser. Do not save keys on shared or public devices.
Revoke a key in the provider dashboard if it may have been exposed.
