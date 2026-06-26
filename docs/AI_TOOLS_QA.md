# AI Creator Tools QA

## Configuration tests

- With `AI_FREE_TRIAL_ENABLED=false`, confirm Generate is disabled and the API returns a temporary-unavailable error.
- With the flag enabled but `GEMINI_API_KEY`, `AI_RATE_LIMIT_SALT` or `AI_RATE_LIMIT_KV` missing, confirm AI remains unavailable.
- With all settings configured, confirm Gemini returns a real structured result.
- With an invalid Gemini key, confirm a clear configuration error appears and no fake output is shown.

## Daily limit tests

- Set `AI_FREE_DAILY_LIMIT=5`.
- Confirm the UI initially reports the remaining allowance.
- Complete five successful generations from the same browser/network identity.
- Confirm KV stores only a hashed key and numeric counter with a 48-hour TTL.
- Confirm the sixth request returns `DAILY_LIMIT_REACHED`, zero remaining and the Support link.
- Confirm failed Gemini requests do not increment the counter.

## Tool tests

Test all AI Creator Tools: hashtag, blog title, email template, summarizer, Instagram caption, TikTok hashtag, YouTube title, social bio, content ideas, hook, carousel post, LinkedIn post, video script, product description and ad copy.

For each tool confirm:

- no result before Generate
- no provider, model or API-key controls
- Free AI 5/day badge
- useful loading and error states
- Copy, Copy All and Regenerate behaviour
- Regenerate disables when no allowance remains
- no promises of virality, followers, ranking, sales or engagement


## Gemini response parser tests

- Confirm Gemini JSON wrapped in ```json code fences still renders successfully.
- Confirm Gemini JSON wrapped in plain ``` fences still renders successfully.
- Confirm a response with small text before or after the first JSON object still renders successfully.
- Confirm duplicate strings in returned arrays are removed where appropriate.
- Confirm missing optional arrays become empty sections and are not shown as broken blank cards.
- Confirm a completely invalid Gemini response shows `AI response could not be formatted. Please try again.`
- Confirm failed parsing does not write or increment the KV quota counter.

## Live-style generation checks

Use the configured production model and confirm each case returns visible copy-ready sections, copy buttons work and remaining allowance decreases only after success:

- AI Hashtag Generator: `London coffee shop`, platform `Instagram`, niche `General`.
- AI Hook Generator: `London coffee shop`.
- AI Carousel Post Generator: `5 tips for new freelancers`.
- AI LinkedIn Post Generator: `starting a small business`.
- AI Video Script Generator: `how to compress pdf online`.
- AI Product Description Generator: `handmade soy candle`.
- AI Ad Copy Generator: `local plumbing service`.
- Instagram Caption Generator: `new gym launch`.
- Content Ideas Generator: `plumber business`.
## Input and layout tests

- General input over 1,200 characters shows the free-limit shortening message.
- Summarizer input over 2,500 characters is rejected.
- Empty and very short input is rejected.
- Support CTA, newsletter and internal resource links work.
- Test mobile widths and keyboard navigation.
- Test dark and light themes on the homepage, `/tools`, `/ai-tools`, `/social-media-tools`, `/resources`, `/support`, `/request-tool` and every AI generator.
