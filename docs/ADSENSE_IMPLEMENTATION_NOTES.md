# AdSense Implementation Notes

## Publisher ID Location

The approved Google AdSense publisher/client ID is loaded globally from `components/AdSenseScript.tsx`:

`ca-pub-3170454283323014`

This ID is public in the official AdSense verification snippet. Do not add private credentials or unrelated ad platform secrets to source control.

## Global Verification Script

The global layout renders `AdSenseScript` once inside the document `<head>`. The component emits server-rendered verification markup with:

- `<link rel="preload" ... as="script">`
- `<script async ... crossorigin="anonymous"></script>`

The script is production-only and does not render during local development. It is intentionally server-rendered so Google AdSense can see the real script tag in View Source.

## Cloudflare Configuration

No deployment command or Cloudflare deployment configuration change is required for the verification script. Redeploy through the normal GitHub/Cloudflare pipeline after merging.

## Current Code Behaviour

- `components/AdSenseScript.tsx` loads the official AdSense script with the approved publisher ID.
- It returns `null` in development.
- It loads globally from `app/layout.tsx` only once.
- The actual AdSense `<script async ...>` tag appears in production page source.
- No visible ad units are placed yet.

## ads.txt

After Google provides the publisher ID entry, add `app/ads.txt/route.ts` or an equivalent static file with the exact `ads.txt` content Google supplies. Do not guess the value.

## Recommended Initial Placements After Approval

- Below tool results, never above the upload/form area.
- Between related tools and resource links.
- Near the bottom of resource pages after useful content.
- Avoid legal, contact, support and affiliate disclosure pages initially.

## UX Safety

- Do not place ads too close to download, copy, upload or AI generation buttons.
- Do not create popups or interstitials.
- Keep mobile spacing generous.
- Keep affiliate cards and ads balanced so the page remains useful.
