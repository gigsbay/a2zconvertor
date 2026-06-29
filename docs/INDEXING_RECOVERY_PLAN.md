# Indexing Recovery Plan

Use this after a rollback, routing fix or Cloudflare Worker stability issue.

## First 24 Hours

1. Confirm production returns 200 for `/`, `/tools`, `/ai-tools`, priority tool pages and `/sitemap.xml`.
2. Open `/api/ai/status` and confirm it returns JSON instead of a Worker error.
3. Submit `https://a2zconvertor.co.uk/sitemap.xml` in Google Search Console.
4. Use URL Inspection for the highest-value pages first:
   - `https://a2zconvertor.co.uk/ai-tools`
   - `https://a2zconvertor.co.uk/convert/ai-hook-generator`
   - `https://a2zconvertor.co.uk/convert/hashtag-generator`
   - `https://a2zconvertor.co.uk/resources/free-ai-social-media-tools`
   - `https://a2zconvertor.co.uk/resources/best-free-pdf-tools`
5. Do not request indexing for pages that return 404, 500 or Cloudflare Error 1102.

## Days 2-7

- Check Coverage and Page Indexing daily for `Not found`, `Server error` and `Crawled - currently not indexed` changes.
- Re-inspect fixed URLs after each successful deployment.
- Improve pages with impressions but low CTR by tightening titles and first-paragraph copy.
- Keep resource and comparison pages internally linked from `/resources`, category pages and relevant tool pages.

## If Google Shows Discovered But Not Indexed

- Add a stronger internal link from a category, resource hub or relevant tool page.
- Make sure the page has unique copy and a clear title.
- Wait at least 48 hours before repeatedly requesting indexing.

## If Google Shows Crawled But Not Indexed

- Expand the useful content on the page.
- Reduce repeated FAQ language.
- Add clearer links to related tools and resources.
- Check that the canonical URL points to `https://a2zconvertor.co.uk`.