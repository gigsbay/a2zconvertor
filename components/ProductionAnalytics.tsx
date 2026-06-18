import Script from "next/script";

export default function ProductionAnalytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const clarityProjectId =
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

  if (!gaMeasurementId && !clarityProjectId) {
    return null;
  }

  return (
    <>
      {gaMeasurementId && (
        <>
          <Script
            id="google-analytics-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
              gaMeasurementId
            )}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(gaMeasurementId)});
              `,
            }}
          />
        </>
      )}

      {clarityProjectId && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", ${JSON.stringify(
                clarityProjectId
              )});
            `,
          }}
        />
      )}
    </>
  );
}
