# AI Cost Control

## Recommended defaults

- Owner-funded model: `gemini-2.5-flash-lite`
- Optional OpenAI BYOK model: `gpt-5-nano`
- Alternative OpenAI BYOK model: `gpt-4o-mini`
- Free daily allowance: 3 attempts per user
- Standard maximum input: 1,200 characters
- Text Summarizer maximum input: 2,500 characters
- Provider timeout: 30 seconds

## Why the summarizer has a separate limit

Summarization input is naturally longer than a title or caption prompt, but it
also consumes more tokens and can create larger bills. The 2,500-character
limit supports useful short documents while bounding owner-funded cost. Users
should split longer material and verify summaries against the source.

## Current safeguards

- Free mode is hidden unless both its feature flag and owner Gemini key exist.
- Free mode is locked to Gemini 2.5 Flash-Lite.
- Unknown providers, models, tools and malformed inputs are rejected.
- Cross-site browser requests are rejected when Fetch Metadata identifies them.
- Request and input sizes are bounded.
- Empty or extremely short prompts are rejected.
- Requests time out after 30 seconds.
- A hashed identifier and in-memory daily counter provide basic per-isolate
  limiting without storing raw IP addresses.
- BYOK keys are never logged, returned or stored by the backend.

## Production abuse risks

The in-memory counter is not durable across Worker isolates, restarts or
regions. Attackers may also vary network identifiers. Before enabling free mode
for meaningful traffic, use a durable server-side counter such as Cloudflare KV
or D1, review concurrency behaviour, and consider Turnstile or another abuse
signal. Set budget alerts and provider-side quotas on the owner Gemini project.

No Cloudflare binding was added in this change because that would alter
deployment configuration during a launch-sensitive period.

## Emergency shutoff

Set the following Cloudflare variable and redeploy/restart the Worker as needed:

```txt
AI_FREE_TRIAL_ENABLED=false
```

The UI will stop offering free mode while Gemini and OpenAI BYOK modes remain
available.
