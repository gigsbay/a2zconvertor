# Analytics Review Notes

Review analytics weekly while traffic is still small. Early data is noisy, so look for repeated patterns rather than one-off spikes.

## Pages To Watch

- `/ai-tools`
- `/tools`
- `/resources`
- `/convert/hashtag-generator`
- `/convert/ai-hook-generator`
- `/convert/ai-video-script-generator`
- `/resources/free-ai-social-media-tools`
- `/resources/best-free-pdf-tools`
- `/support`
- `/affiliate-disclosure`

## Metrics

- Landing page sessions
- Organic search clicks and impressions
- Tool page engagement
- Newsletter form clicks or submits
- Buy Me a Coffee clicks
- Affiliate placement clicks
- 404 hits and unexpected referrers

## Later GA4 Events To Add

Only add these once the core deployment is stable:

- `tool_started`
- `tool_completed`
- `ai_generation_started`
- `ai_generation_completed`
- `newsletter_signup_click`
- `support_click`
- `affiliate_click`

Do not log uploaded file names, raw prompts, API keys, user IP addresses or sensitive document content.