# Monetization Tracking

## Where Wondershare Affiliate Cards Appear

PDFelement appears on:

- `/pdf-tools`
- PDF tool pages such as `/convert/compress-pdf`, `/convert/pdf-merge`, `/convert/pdf-split`, `/convert/organize-pdf`, `/convert/image-to-pdf`, `/convert/pdf-to-image`, `/convert/add-page-numbers-pdf`, `/convert/watermark-pdf`, `/convert/rotate-pdf`, `/convert/delete-pdf-pages`, `/convert/extract-pdf-pages`, and `/convert/crop-pdf`
- `/resources/best-free-pdf-tools`
- `/resources/best-pdf-compressor-tools`
- `/compare/pdf-compressor-online-vs-desktop-software`

Filmora appears on:

- `/ai-tools`
- `/video-tools`
- `/social-media-tools` when category pages are live
- AI/video creator tools such as `/convert/ai-video-script-generator`, `/convert/youtube-title-generator`, `/convert/ai-hook-generator`, `/convert/content-ideas-generator`, `/convert/ai-carousel-post-generator`, and `/convert/video-thumbnail-extractor`
- AI/video resource pages such as `/resources/short-video-script-ideas`, `/resources/youtube-title-ideas`, `/resources/free-ai-social-media-tools`, `/resources/ai-hook-ideas`, and `/resources/carousel-post-ideas`

UniConverter appears on:

- `/video-tools`
- `/audio-tools`
- `/resources/browser-based-file-conversion`
- Video/audio utility pages such as `/convert/video-to-gif`, `/convert/video-thumbnail-extractor`, `/convert/mp4-to-mp3`, `/convert/audio-converter`, `/convert/change-audio-volume`, `/convert/mp3-cutter`, `/convert/video-metadata`, and `/convert/audio-metadata`

PDF Password Remover is approved and documented but should only be placed on genuinely relevant password/protected PDF pages or security resources.

## How To Check CJ Clicks And Conversions

1. Open CJ Publisher dashboard.
2. Check click reports by advertiser and link ID.
3. Compare clicks by day with site deployments and traffic spikes.
4. Review conversion reports weekly, not hourly.
5. Check whether clicks are coming from relevant pages before adding more placements.
6. Keep a weekly note of clicks, conversions, EPC and any approved/declined transactions.

## How To Track Formspree Newsletter Signups

1. Confirm `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` points to the approved Formspree form.
2. Open the Formspree dashboard.
3. Track submissions by day and source page if Formspree metadata is available.
4. Compare signup spikes with launches, resource posts and homepage changes.
5. Export contacts regularly once the newsletter process is stable.

## How To Track Buy Me A Coffee Clicks

1. Confirm support links use `NEXT_PUBLIC_BUYMEACOFFEE_URL` or the configured fallback.
2. Check Buy Me a Coffee dashboard for visits, supporters and conversion rate.
3. Compare support clicks with AI limit messaging and `/support` page visits.
4. Monitor whether the `Support Us` navbar button increases support page sessions.

## GA4 Events To Add Later

Add only after the basic launch is stable:

- `tool_start` with tool slug and category
- `tool_complete` with tool slug and category
- `ai_generation_success` with tool slug, not prompt text
- `affiliate_click` with product ID and page path
- `newsletter_submit` with form location
- `support_click` with source page
- `request_tool_submit` with category, not user email or private description

Do not log uploaded file names, raw prompts, API keys, email addresses or raw IPs in analytics events.

## Pages To Monitor Weekly

- `/`
- `/tools`
- `/ai-tools`
- `/pdf-tools`
- `/image-tools`
- `/video-tools`
- `/audio-tools`
- `/resources`
- `/resources/free-ai-social-media-tools`
- `/resources/free-ai-writing-tools`
- `/resources/best-free-pdf-tools`
- `/resources/best-pdf-compressor-tools`
- `/resources/ai-hook-ideas`
- `/resources/short-video-script-ideas`
- `/convert/hashtag-generator`
- `/convert/ai-hook-generator`
- `/convert/ai-video-script-generator`
- `/convert/ai-ad-copy-generator`
- `/support`
- `/affiliate-disclosure`

## Weekly Review Questions

- Which pages are gaining impressions but not clicks?
- Which pages receive affiliate clicks but no conversions?
- Which AI tools hit usage limits most often?
- Which resource pages drive newsletter signups?
- Which pages should be improved before adding more monetization blocks?