# AI Cost Control

A2ZConvertor exposes owner-funded Gemini generation only. The public UI does not offer BYOK, provider selection, model selection or API-key fields.

## Required configuration

- `GEMINI_API_KEY`: server-only Gemini key. Never use a `NEXT_PUBLIC_` prefix.
- `AI_FREE_TRIAL_ENABLED=true`: enables the public AI route only when every required setting is available.
- `AI_FREE_DAILY_LIMIT=5`: successful generations allowed per hashed user identifier per UTC day.
- `AI_FREE_MODEL=gemini-2.5-flash-lite`: approved low-cost model.
- `AI_RATE_LIMIT_SALT`: long random server-only value used before hashing request identifiers.
- `AI_RATE_LIMIT_KV`: Cloudflare KV binding used for durable counters.

## Limits

General AI tools accept up to 1,200 input characters. Text Summarizer accepts up to 2,500. Requests are size-limited, short inputs are rejected and Gemini calls time out after 30 seconds.

The counter combines the current date, `CF-Connecting-IP`, user agent and the private salt, then stores only a SHA-256 hash. Raw IP addresses and API keys are never stored or logged. A counter is written only after Gemini returns a successful JSON result and expires after 48 hours.

Cloudflare KV is durable but eventually consistent. Simultaneous requests from the same user can briefly exceed the intended allowance. Provider-side quotas and budget alerts remain essential.

## Emergency disable

Set `AI_FREE_TRIAL_ENABLED=false`. The public generator will stop making Gemini calls without requiring a code change.

## Cost risks

Traffic spikes, automated abuse, prompt length and provider pricing can change cost. Keep the default limit at five, monitor Gemini usage, set provider quotas and disable the feature immediately if usage is unexpected.
