# Cloudflare AI Setup

## Runtime configuration split

The AI runtime configuration is intentionally split between committed non-secret variables and dashboard-managed secrets.

### Non-secret runtime variables

These values are stored in `wrangler.jsonc` so Wrangler/OpenNext deployments continue to apply them:

```txt
AI_FREE_TRIAL_ENABLED=true
AI_FREE_DAILY_LIMIT=10
AI_FREE_MODEL=gemini-2.5-flash-lite
NEXT_PUBLIC_BUYMEACOFFEE_URL=https://buymeacoffee.com/a2zconvertor
```

Dashboard plaintext variables can be overwritten during a deployment when they are not represented in the Wrangler configuration. Keep these non-secret values in `wrangler.jsonc` as the deployment source of truth.

### Secrets

Add these encrypted secrets to the deployed `a2zconvertor` Worker in the Cloudflare dashboard:

```txt
GEMINI_API_KEY=<server-only secret>
AI_RATE_LIMIT_SALT=<long random server-only secret>
```

Never put either secret in `wrangler.jsonc`, never use `NEXT_PUBLIC_GEMINI_API_KEY`, and never commit secret values.

The application reads Worker variables and secrets from the Cloudflare/OpenNext runtime environment. `process.env` is used only as a local-development fallback.

## KV binding

The Worker requires a KV binding named exactly:

```txt
AI_RATE_LIMIT_KV
```

The KV namespace stores only salted SHA-256 identifiers and numeric daily usage counters. It does not store raw IP addresses or API keys. Missing or invalid counter values are treated as zero, and successful generations overwrite the counter with a valid value. Records expire after 48 hours.

`wrangler.jsonc` declares the binding name but does not guess or commit a namespace ID. In Cloudflare Dashboard, confirm the deployed `a2zconvertor` Worker has the real KV namespace attached with the exact binding name `AI_RATE_LIMIT_KV`. If the binding disappears after deployment, restore that dashboard binding using the existing production namespace.

## Deploying configuration changes

After changing Worker variables, secrets or bindings, trigger a fresh deployment through the connected GitHub/Cloudflare auto-deploy workflow. Variables and bindings apply to a deployed Worker version; changing dashboard configuration without deploying the intended commit can leave production on an older implementation.

Do not run `npm run deploy` manually from a local checkout unless its branch, `wrangler.jsonc`, secrets and Cloudflare account configuration are fully synchronized with the intended production release.

After deployment, confirm the four non-secret variables still appear in the Worker settings, confirm both encrypted secrets remain configured, and check `/api/ai/status`.

## Safe status endpoint

This is the first diagnostic URL to check after every AI-related deployment:

```txt
https://a2zconvertor.co.uk/api/ai/status
```

A correctly configured new user/day should receive values equivalent to:

```json
{
  "enabled": true,
  "configured": true,
  "dailyLimit": 10,
  "used": 0,
  "remaining": 10,
  "model": "gemini-2.5-flash-lite",
  "reasonCode": null,
  "hasKvBinding": true,
  "hasGeminiKey": true,
  "hasRateLimitSalt": true
}
```

The endpoint never returns secret values, API keys, the rate-limit salt, raw IP addresses or KV keys. `reasonCode` identifies missing runtime configuration safely.

The endpoint is designed to return HTTP 200 JSON even when configuration is missing or a KV read fails. Its safe `reasonCode` values are:

| reasonCode | Meaning |
| --- | --- |
| `free_trial_disabled` | `AI_FREE_TRIAL_ENABLED` is not `true`. |
| `missing_gemini_key` | The runtime cannot see `GEMINI_API_KEY`. |
| `missing_rate_limit_salt` | The runtime cannot see `AI_RATE_LIMIT_SALT`. |
| `missing_kv_binding` | The Worker has no `AI_RATE_LIMIT_KV` binding. |
| `kv_read_failed` | The binding exists, but the current KV read failed. |
| `invalid_daily_limit` | The daily limit was invalid, so the app safely defaulted to 10. |
| `unknown_error` | An unexpected runtime error was caught safely. |

## Build-time and runtime configuration

`NEXT_PUBLIC_*` values can be embedded during the Next.js build. The AI key, rate-limit salt, free-trial settings and KV namespace are server-side runtime configuration and must be attached to the deployed Cloudflare Worker. A successful build does not prove that runtime secrets or bindings are present.

The KV binding name must be exactly `AI_RATE_LIMIT_KV`. After changing runtime variables, secrets or bindings, deploy the merged GitHub commit through the normal Cloudflare auto-deploy workflow before checking `/api/ai/status`.

## Post-deploy verification

1. Confirm `/api/ai/status` reports `configured: true`, `enabled: true` and `remaining: 10` for a new daily identity.
2. Open an AI tool and confirm it first shows `Checking free AI allowance...`, then `You have 10 free AI generations left today.`
3. Complete one successful generation and confirm `remaining` becomes 9.
4. Confirm a failed Gemini request does not reduce the counter.
5. Complete the daily allowance and confirm the next request is blocked with the support message.
