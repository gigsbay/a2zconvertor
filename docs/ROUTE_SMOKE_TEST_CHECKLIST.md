# Route Smoke Test Checklist

Run this checklist before merging or deploying routing, sitemap, SEO, resource or Cloudflare Worker changes.

## Mandatory Live Checks

Open each URL in production after deployment:

- `/`
- `/tools`
- `/ai-tools`
- `/resources`
- `/pdf-tools`
- `/image-tools`
- `/convert/png-to-jpg`
- `/convert/jpg-to-png`
- `/convert/hashtag-generator`
- `/convert/ai-hook-generator`
- `/convert/ai-video-script-generator`
- `/resources/how-to-compress-pdf-for-email`
- `/resources/ai-ad-copy-examples`
- `/affiliate-disclosure`
- `/api/ai/status`
- `/sitemap.xml`

## Expected Results

- No 404 responses.
- No Cloudflare Error 1102.
- `/api/ai/status` returns JSON.
- `/api/ai/status` shows `dailyLimit: 10`.
- Tool pages render their tool UI.
- Resource pages render their article content.
- Sitemap loads XML successfully.
- Footer links work.

## Notes

- Do not request Search Console indexing while any mandatory URL is returning 404 or Cloudflare Error 1102.
- Keep `/api/ai/status` and `/api/ai/generate` dynamic because they depend on runtime Cloudflare environment variables and KV.
- Do not force `/convert/[slug]` to static generation unless production smoke tests confirm every existing tool URL still resolves.
