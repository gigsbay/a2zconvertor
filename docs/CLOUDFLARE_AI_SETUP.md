# Cloudflare AI Setup

## Required Worker secrets and variables

Configure these on the `a2zconvertor` Worker:

```txt
GEMINI_API_KEY=<server-only secret>
AI_FREE_TRIAL_ENABLED=true
AI_FREE_DAILY_LIMIT=3
AI_FREE_MODEL=gemini-2.5-flash-lite
AI_RATE_LIMIT_SALT=<long random server-only secret>
NEXT_PUBLIC_BUYMEACOFFEE_URL=https://buymeacoffee.com/a2zconvertor
```

Never use `NEXT_PUBLIC_GEMINI_API_KEY`. Never commit the Gemini key or rate-limit salt.

Set secrets interactively:

```bash
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put AI_RATE_LIMIT_SALT
```

Add the non-secret variables in Cloudflare Dashboard under Workers & Pages, `a2zconvertor`, Settings, Variables and Secrets. `NEXT_PUBLIC_BUYMEACOFFEE_URL` is public and is included in the browser bundle at build time, so also provide it in the build/deployment environment when overriding the default URL.

## KV binding

The Worker requires a KV binding named exactly:

```txt
AI_RATE_LIMIT_KV
```

`wrangler.jsonc` declares the binding without an ID so current Wrangler automatic provisioning can create or attach the resource during deployment. If your Cloudflare account requires manual setup, create the namespace:

```bash
npx wrangler kv namespace create AI_RATE_LIMIT_KV
```

Then add the returned namespace ID to the existing `AI_RATE_LIMIT_KV` entry in `wrangler.jsonc` or attach it in the Cloudflare dashboard using the same binding name.

Deploy only through the project command:

```bash
npm run deploy
```

## Verification

After deployment, open an AI tool and confirm the GET request to `/api/ai/generate` reports enabled with three remaining generations. Complete successful generations and verify the remaining count decreases. Confirm a fourth successful request is blocked and links to `/support`.
