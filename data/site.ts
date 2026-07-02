export const SITE_URL = "https://a2zconvertor.co.uk";

export function absoluteUrl(path = "") {
  return new URL(path, SITE_URL).toString();
}

export const DEFAULT_OG_IMAGE = absoluteUrl("/og-default.svg");
