const ADSENSE_SCRIPT_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3170454283323014";

export default function AdSenseScript() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <link rel="preload" href={ADSENSE_SCRIPT_SRC} as="script" crossOrigin="anonymous" />
      <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />
    </>
  );
}
