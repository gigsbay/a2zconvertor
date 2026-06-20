# AI Tools QA

Never commit real provider keys. Run live-provider checks with temporary test
keys and revoke them afterward if appropriate.

## Common checks for every AI tool

- No generated results appear before Generate.
- Provider settings appear when no mode has been selected.
- Free mode appears only when `AI_FREE_TRIAL_ENABLED=true` and `GEMINI_API_KEY`
  is configured.
- Free mode uses Gemini 2.5 Flash-Lite and never exposes the owner key.
- Gemini BYOK succeeds with a valid key.
- OpenAI BYOK succeeds with a valid key.
- Missing or invalid keys show a useful error with no fake result.
- Unknown provider/model/tool requests are rejected.
- Empty, very short and over-limit inputs are rejected.
- Loading, Regenerate, individual Copy and Copy all results work.
- Remember unchecked does not restore the key after refresh.
- Remember checked restores the key only in that browser.
- Clear saved AI settings removes saved data and generated results.
- Provider quota, rate-limit, safety, invalid JSON, timeout and network errors
  leave the form usable.
- Dark and light themes are readable at desktop and mobile widths.

## Tool output checklist

| Tool | Test input | Expected output |
| --- | --- | --- |
| Hashtag Generator | sustainable gardening for renters | 20-30 unique tags grouped as broad, niche, intent and branded |
| Blog Title Generator | first-time home budgeting | 10 varied titles using the requested formats |
| Email Template Generator | invoice follow-up for a client | 5 subjects, full email, shorter version and follow-up |
| Text Summarizer | 3-5 paragraphs of factual source text | short summary, bullets and key takeaways with no added facts |
| Instagram Caption Generator | handmade ceramic launch | 5 main captions, 5 short captions, 5 CTAs and optional hashtags |
| TikTok Hashtag Generator | beginner strength training | broad, niche, content-style and audience tags without viral guarantees |
| YouTube Title Generator | repairing a bicycle chain | 10 accurate titles with approximate character counts |
| Social Media Bio Generator | local bakery for LinkedIn | short, professional, creator, punchy and CTA variants |
| Content Ideas Generator | bookkeeping for freelancers | 20 ideas split across four groups |

## Free mode checks

1. Leave `AI_FREE_TRIAL_ENABLED=false`; confirm the free option is hidden.
2. Set the flag to `true` without `GEMINI_API_KEY`; confirm it remains hidden.
3. Add the owner Gemini key and set the daily limit to 3; confirm free mode works.
4. Generate three times from the same test client; confirm the next attempt is
   rejected by the current isolate and includes a clear limit message.
5. Set the feature flag back to `false`; confirm BYOK still works.

The in-memory limit is not a global production guarantee. Repeat limit testing
after any future KV/D1 rate-limit implementation.

## Theme pages

Check both themes on:

- `/`
- `/tools`
- `/image-tools`
- `/pdf-tools`
- `/social-media-tools`
- `/resources`
- `/resources/best-free-pdf-tools`
- `/compare/jpg-vs-png`
- `/request-tool`
- all nine AI generator pages
