# AdSense Readiness

## Before Applying

- Confirm the site is live on `https://a2zconvertor.co.uk` and not returning intermittent errors.
- Confirm `/about`, `/privacy-policy`, `/terms`, `/cookie-policy`, `/contact`, `/support` and `/affiliate-disclosure` are linked from the footer.
- Confirm the sitemap is submitted in Google Search Console.
- Confirm key pages have useful original copy, not thin duplicate content.
- Confirm affiliate recommendations are clearly labelled and not overwhelming the page.
- Confirm no fake reviews, fake ratings, fake testimonials or fake sponsorship claims exist.
- Confirm file tools and AI tools explain important limitations honestly.

## Trust Pages Required

- About
- Privacy Policy
- Terms of Service
- Cookie Policy
- Contact
- Affiliate Disclosure
- Support

## Content Depth Checklist

- Page has a unique title and meta description.
- Page has a clear first paragraph explaining the user benefit.
- Resource pages include practical examples, internal links and FAQs.
- Tool pages have useful FAQs and related tools.
- AI pages explain that output needs human review.
- Affiliate pages keep A2ZConvertor's free action primary.

## Pages To Avoid Showing Ads On Initially

- `/privacy-policy`
- `/terms`
- `/cookie-policy`
- `/contact`
- `/affiliate-disclosure`
- `/support`
- AI generation result areas until click/download UX is stable
- Any page where ads could sit too close to copy, download or generation buttons

## Affiliate And Ad Balance

AdSense approval is not guaranteed. Keep affiliate cards restrained, relevant and clearly disclosed. Do not place ads and affiliate recommendations so densely that the page feels built primarily for monetization rather than helping the user.

## Adding AdSense Later

The app supports optional script loading through:

`NEXT_PUBLIC_ADSENSE_CLIENT_ID`

If this environment variable is missing, no AdSense script loads and no ads are shown. Do not add live ad units until Google provides approved publisher and slot details.

## ads.txt Later

After Google provides the publisher ID, add an `ads.txt` file only with the exact line Google gives. Do not guess publisher IDs.

## Testing After Approval

- Confirm the AdSense script loads only in production.
- Confirm pages still pass build and lint.
- Check mobile layout for overlap.
- Avoid ads above main tool forms.
- Test download/copy/generate buttons so ads do not interfere.

## Reminder

AdSense approval is not guaranteed. Improve content quality, trust pages, indexing, user experience and site stability before applying.