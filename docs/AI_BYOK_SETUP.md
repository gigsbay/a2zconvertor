# AI BYOK Setup

BYOK means "bring your own key". A2ZConvertor does not provide a shared paid
AI account. Users choose OpenAI or Google Gemini and supply their own API key.

## Why a separate key is required

ChatGPT subscriptions and OpenAI API usage are separate products. A ChatGPT
Plus login does not supply API credit. Gemini web-app access likewise does not
replace a Gemini API key.

## Getting a key

- OpenAI: visit https://platform.openai.com/api-keys and create a secret key.
- Gemini: visit https://aistudio.google.com/app/apikey and create a key in
  Google AI Studio.

The provider may require billing or impose quotas and rate limits. Review the
provider's current terms before use.

## Local storage

The key stays in page memory by default. It is written to localStorage only
when "Remember my API key on this browser" is selected. Provider and model
preferences may be stored without the key.

Use "Clear saved AI settings" in any AI generator to remove the saved settings.

## Security

- Keys are sent to the A2ZConvertor proxy only for the active generation call.
- The proxy forwards the key to the selected provider.
- Keys are not logged, echoed in responses or stored in a database.
- Do not save a key on a shared or public device.
- Revoke a key in the provider dashboard if it may have been exposed.
