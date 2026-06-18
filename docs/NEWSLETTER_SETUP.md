# Newsletter Signup Setup

The reusable newsletter form reads this public build-time variable:

```text
NEXT_PUBLIC_NEWSLETTER_FORM_ACTION=https://provider.example/form-endpoint
```

When the variable exists, the form posts the `email` and `source` fields to the
configured endpoint. When it is absent, submitting opens an email addressed to
`contact@a2zconvertor.co.uk`. The fallback does not pretend the address was
stored.

Because this is a `NEXT_PUBLIC_*` value, set it in the environment that runs
the production Next.js/OpenNext build and redeploy after changing it.

## MailerLite

1. Create an embedded signup form in MailerLite.
2. Inspect the generated form code and copy its form `action` URL.
3. Confirm the endpoint accepts a field named `email`. If MailerLite uses a
   different field name, adapt `NewsletterSignup.tsx` before enabling it.
4. Set the action URL as `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION`.

## ConvertKit / Kit

1. Create a form in Kit.
2. Open the HTML embed option.
3. Copy the form action endpoint.
4. Verify the expected email field name and spam-protection requirements.
5. Configure the environment variable and test a real subscription.

## Buttondown

1. Create a Buttondown account and publication.
2. Use its hosted form or subscription endpoint from the Buttondown form
   documentation.
3. Confirm whether extra hidden fields are required.
4. Set the endpoint and test confirmation-email delivery.

## Formspree

1. Create a Formspree form.
2. Copy the endpoint, such as `https://formspree.io/f/FORM_ID`.
3. Set it as `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION`.
4. Configure notifications or an integration that moves submitted addresses
   into the chosen email platform.

Formspree collects submissions but is not itself a full newsletter publisher.

## Cloudflare Build Environment

Add `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` to the Cloudflare or CI environment
that runs `npm run deploy`, then trigger a fresh build. Dashboard labels vary,
but the value must be available during `next build`.

For a local production test in PowerShell:

```powershell
$env:NEXT_PUBLIC_NEWSLETTER_FORM_ACTION="https://provider.example/form-endpoint"
npm run build
npm run start
```

## Launch Checklist

1. Submit a real test address.
2. Confirm the provider receives it.
3. Confirm any double-opt-in email arrives.
4. Check the provider's consent text and privacy settings.
5. Update the privacy policy if the selected provider processes additional
   personal data or sets cookies.
