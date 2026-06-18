# Production Analytics Setup

A2ZConvertor supports Google Analytics 4 and Microsoft Clarity without
hardcoded project IDs. Analytics scripts load only in a production build and
only when the corresponding environment variable exists.

## Environment Variables

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
```

Either service can be enabled independently. Leave its variable unset to keep
that service disabled.

These values are public browser identifiers, not secret API keys. Do not commit
real IDs to the repository.

## Get a GA4 Measurement ID

1. Open [Google Analytics](https://analytics.google.com/).
2. Create or select a GA4 property.
3. Open **Admin**, then **Data streams**.
4. Create or select the web data stream for `a2zconvertor.co.uk`.
5. Copy the Measurement ID shown in the stream details. It starts with `G-`.
6. Set it as `NEXT_PUBLIC_GA_MEASUREMENT_ID` before the production build.

## Get a Microsoft Clarity Project ID

1. Open [Microsoft Clarity](https://clarity.microsoft.com/).
2. Create or select the project for `a2zconvertor.co.uk`.
3. Open **Settings**, then **Setup**.
4. Copy the Project ID from the tracking-code details.
5. Set it as `NEXT_PUBLIC_CLARITY_PROJECT_ID` before the production build.

## Configure Cloudflare Builds

Next.js embeds `NEXT_PUBLIC_*` variables into browser code during
`next build`. The variables must therefore exist in the environment that runs
the OpenNext production build. Adding them only after the build will not update
the analytics scripts.

### Cloudflare Dashboard or CI Build

1. Open the Cloudflare project or deployment pipeline that builds
   A2ZConvertor.
2. Open **Settings** and find **Variables and Secrets** or the build
   environment-variable section.
3. Add:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_CLARITY_PROJECT_ID`
4. Apply them to the production build environment.
5. Trigger a fresh production build and deployment.

Cloudflare dashboard labels can vary between Workers, Pages and CI-based
deployments. The requirement is the same: the values must be available to the
process running `npm run deploy`.

### Local PowerShell Deployment

Set the values in the same terminal before building and deploying:

```powershell
$env:NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
$env:NEXT_PUBLIC_CLARITY_PROJECT_ID="xxxxxxxxxx"
npm run deploy
```

For a local production test:

```powershell
$env:NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
$env:NEXT_PUBLIC_CLARITY_PROJECT_ID="xxxxxxxxxx"
npm run build
npm run start
```

The scripts intentionally do not load under `npm run dev`.

## Verify After Deployment

1. Open the production website in a private browser window.
2. Confirm requests appear for:
   - `www.googletagmanager.com/gtag/js` when GA4 is enabled.
   - `www.clarity.ms/tag/` when Clarity is enabled.
3. Check Google Analytics Realtime and the Clarity dashboard for the visit.
4. Confirm no analytics requests appear when the corresponding environment
   variable is absent.

Before enabling analytics for public visitors, review consent and disclosure
requirements for the countries where the site operates.

## Official References

- [Google Analytics: find a GA4 Measurement ID](https://support.google.com/analytics/answer/12270356)
- [Microsoft Clarity manual setup](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup)
- [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables)
- [Cloudflare Workers environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/)
