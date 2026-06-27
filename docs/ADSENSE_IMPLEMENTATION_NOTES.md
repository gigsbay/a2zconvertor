# AdSense Implementation Notes

## Publisher ID Location

Set the approved Google AdSense publisher/client ID in Cloudflare as:

`NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx`

Do not hardcode the publisher ID in source code unless there is a deliberate reason later.

## Cloudflare Configuration

Add the public build/runtime variable in Cloudflare project settings after AdSense approval. Redeploy through the normal GitHub/Cloudflare pipeline. Do not change the deployment command.

## Current Code Behaviour

- `components/AdSenseScript.tsx` checks `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.
- It returns `null` in development.
- It returns `null` when the env var is missing.
- It loads the AdSense script only when the env var exists in production.
- No visible ad units are placed yet.

## ads.txt

After Google provides the publisher ID, add `app/ads.txt/route.ts` or an equivalent static file with the exact `ads.txt` content Google supplies. Do not guess the value.

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