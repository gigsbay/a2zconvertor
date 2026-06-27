import Script from "next/script";

export default function AdSenseScript() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

  if (!clientId) {
    return null;
  }

  return (
    <Script
      id="google-adsense-loader"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}