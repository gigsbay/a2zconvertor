# 404 Monitoring

Use this checklist after each deployment and during the first two weeks after launch.

## What To Check

- Cloudflare Worker error logs for 404, 500 and Error 1102 patterns.
- Google Search Console `Not found (404)` examples.
- Analytics landing pages with `/convert/`, `/resources/` or `/compare/` paths that do not exist.
- Sitemap URLs after every route/index change.

## Fix Order

1. Fix broken internal links first.
2. Restore accidentally broken historical URLs when possible.
3. Add redirects only when a page was intentionally renamed.
4. Leave truly invalid spam URLs as normal 404s.

## Required Smoke URLs

Keep `docs/ROUTE_SMOKE_TEST_CHECKLIST.md` as the source of truth for mandatory live checks.

## Useful 404 Page Behavior

The not-found page should link back to:

- Home
- All Tools
- AI Tools
- Resources
- Support

This keeps users moving even when an old or mistyped URL is requested.