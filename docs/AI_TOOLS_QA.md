# AI Tools QA

## Configuration tests

- With `AI_FREE_TRIAL_ENABLED=false`, confirm Generate is disabled and the API returns a temporary-unavailable error.
- With the flag enabled but `GEMINI_API_KEY`, `AI_RATE_LIMIT_SALT` or `AI_RATE_LIMIT_KV` missing, confirm AI remains unavailable.
- With all settings configured, confirm Gemini returns a real structured result.
- With an invalid Gemini key, confirm a clear configuration error appears and no fake output is shown.

## Daily limit tests

- Set `AI_FREE_DAILY_LIMIT=3`.
- Confirm the UI initially reports the remaining allowance.
- Complete three successful generations from the same browser/network identity.
- Confirm KV stores only a hashed key and numeric counter with a 48-hour TTL.
- Confirm the fourth request returns `DAILY_LIMIT_REACHED`, zero remaining and the Support link.
- Confirm failed Gemini requests do not increment the counter.

## Tool tests

Test all nine AI tools: hashtag, blog title, email template, summarizer, Instagram caption, TikTok hashtag, YouTube title, social bio and content ideas.

For each tool confirm:

- no result before Generate
- no provider, model or API-key controls
- Free AI 3/day badge
- useful loading and error states
- Copy, Copy All and Regenerate behaviour
- Regenerate disables when no allowance remains
- no promises of virality, followers, ranking, sales or engagement

## Input and layout tests

- General input over 1,200 characters shows the free-limit shortening message.
- Summarizer input over 2,500 characters is rejected.
- Empty and very short input is rejected.
- Support CTA, newsletter and internal resource links work.
- Test mobile widths and keyboard navigation.
- Test dark and light themes on the homepage, `/tools`, `/ai-tools`, `/social-media-tools`, `/resources`, `/support`, `/request-tool` and every AI generator.
