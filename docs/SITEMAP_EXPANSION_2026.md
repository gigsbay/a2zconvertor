# Sitemap Expansion - July 19, 2026

A2ZConvertor has started gaining index coverage in Google Search Console, so the production sitemap has been expanded carefully while keeping the Cloudflare Worker route surface lightweight.

## Pages Now Included

### Static Pages

- `/`
- `/tools`
- `/ai-tools`
- `/image-tools`
- `/pdf-tools`
- `/video-tools`
- `/audio-tools`
- `/resources`
- `/launch`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/cookie-policy`
- `/support`
- `/affiliate-disclosure`

### Converter And Tool Pages

The sitemap includes only tools where `isLive === true` and `indexable === true` in `data/tools.ts`.

This currently includes the priority image/PDF converter pages plus production-ready AI Creator Tools. Advanced, experimental, duplicate, redirect-only, or thin tools remain excluded until they have stable functionality and stronger page content.

### Comparison Pages

The sitemap includes the production-ready comparison pages listed in `data/comparisonIndex.ts`.

### Resource Pages

The sitemap includes resource pages listed in `data/resourceIndex.ts`. This keeps sitemap generation lightweight because it uses summary metadata rather than importing full article bodies.

## Pages Intentionally Excluded

- `/blog`
- `/blog/[slug]` pages
- Draft or placeholder resources
- Hidden compatibility URLs
- Duplicate or canonicalized URLs
- Redirect-only URLs
- Non-indexable tool pages
- Experimental audio/video/PDF tools that are not yet strong search landing pages

## Why Blog Pages Remain Excluded

The blog route exists, but blog URLs are intentionally excluded from the production sitemap for now. Previous Cloudflare Error 1102 and route stability work showed that sitemap generation must stay very small and deterministic. Blog pages should be reintroduced only after the blog index is confirmed lightweight, each article is strong enough for indexing, and route smoke tests remain clean after deployment.

## Lightweight Sitemap Rules

- No filesystem reads.
- No API calls.
- No dynamic route probing.
- No full article body imports.
- No large site-wide JSON-LD payloads.
- No runtime-heavy resource imports.
- Keep `app/sitemap.ts` static and deterministic.

## Recommended Next Sitemap Submission Date

Submit the updated sitemap once after this deployment is live. Then review Search Console coverage again on July 26, 2026 before expanding further.

## Recommended Indexing Strategy

- Submit the updated sitemap once after deployment.
- Do not request indexing for hundreds of URLs.
- Request indexing only for newly added high-value pages.
- Request indexing only for pages that changed significantly.
- Request indexing only for new resource pages with meaningful content.
- Watch `Discovered - currently not indexed` before adding another large batch.
- Keep blog pages out of the sitemap until they are ready to compete on content quality and route stability.
