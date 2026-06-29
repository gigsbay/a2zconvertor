# Route Smoke Test Checklist

Run this checklist before merging or deploying routing, sitemap, SEO, resource or Cloudflare Worker changes.

## Mandatory Live Checks

Core pages:

- `/`
- `/tools`
- `/ai-tools`
- `/resources`
- `/pdf-tools`
- `/image-tools`
- `/video-tools`
- `/audio-tools`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/support`
- `/affiliate-disclosure`
- `/sitemap.xml`

Tool pages:

- `/convert/png-to-jpg`
- `/convert/jpg-to-png`
- `/convert/webp-to-jpg`
- `/convert/compress-image`
- `/convert/resize-image`
- `/convert/compress-pdf`
- `/convert/hashtag-generator`
- `/convert/instagram-caption-generator`
- `/convert/ai-hook-generator`
- `/convert/ai-video-script-generator`
- `/convert/ai-ad-copy-generator`

Resource pages:

- `/resources/how-to-compress-pdf-for-email`
- `/resources/ai-ad-copy-examples`
- `/resources/free-ai-social-media-tools`
- `/resources/free-ai-writing-tools`
- `/resources/best-free-pdf-tools`
- `/resources/best-pdf-compressor-tools`
- `/resources/ai-hook-ideas`
- `/resources/short-video-script-ideas`

API:

- `/api/ai/status`

## Expected Results

- No 404 responses.
- No Cloudflare Error 1102.
- `/api/ai/status` returns JSON.
- `/api/ai/status` keeps the backend `dailyLimit` at `10`.
- Tool pages render their tool UI.
- AI pages use nonnumeric public daily-limit copy.
- Resource pages render their article content.
- Sitemap loads XML successfully.
- Footer links work.

## Local Pre-Merge Check

Run this local inventory check before build when routing or indexes change:

```bash
npm run check:routes
```

## Notes

- Do not request Search Console indexing while any mandatory URL is returning 404 or Cloudflare Error 1102.
- Keep `/api/ai/status` and `/api/ai/generate` dynamic because they depend on runtime Cloudflare environment variables and KV.
- Do not force `/convert/[slug]` to static generation unless production smoke tests confirm every existing tool URL still resolves.
- Keep sitemap generation lightweight by using slug/index metadata, not full resource body content.