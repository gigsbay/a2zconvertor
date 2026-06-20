# AI Tools QA

Live provider testing requires real user-provided API keys. Do not commit keys
or add fake production responses.

## Provider checklist

- No key: Generate shows a clear key-required message.
- OpenAI valid key: result matches the required JSON structure.
- Gemini valid key: result matches the required JSON structure.
- Invalid key: shows the provider-key rejection message.
- Rate limit: shows a retry-later message.
- Billing or quota issue: identifies quota/billing without exposing raw data.
- Safety refusal: reports that the provider declined the request.
- Timeout/network failure: shows a bounded error and keeps the form usable.
- Remember unchecked: refreshing does not restore the key.
- Remember checked: refreshing restores the key on that browser.
- Clear settings: removes provider, model and any saved key.

## Tool prompts

| Tool | Test input | Expected structure |
| --- | --- | --- |
| Hashtag Generator | sustainable gardening for renters | broad, niche, intent, branded |
| Blog Title Generator | first-time home budgeting | 10 varied titles |
| Email Template Generator | invoice follow-up for a client | subjects, body, shorter version, follow-up |
| Text Summarizer | multi-paragraph factual article | short summary, bullets, takeaways |
| Instagram Caption Generator | handmade ceramic launch | 5 captions, 5 short captions, 5 CTAs |
| TikTok Hashtag Generator | beginner strength training | four deduplicated hashtag groups |
| YouTube Title Generator | repairing a bicycle chain | 10 titles with character counts |
| Social Media Bio Generator | a local bakery on LinkedIn | five requested bio formats |
| Content Ideas Generator | bookkeeping for freelancers | 20 ideas in four groups |

## UI and theme

- Results are hidden before Generate.
- Loading, error, Regenerate, Copy and Copy all states work.
- API-key instruction button opens provider-specific steps and official links.
- Forms and results fit mobile width without horizontal overflow.
- Homepage, directories, categories, resources, comparisons and request page
  remain readable in dark and light themes.
