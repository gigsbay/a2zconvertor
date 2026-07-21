import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import AdSenseScript from "@/components/AdSenseScript";
import CookiePopup from "@/components/CookiePopup";
import ProductionAnalytics from "@/components/ProductionAnalytics";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GTM_ID = "GTM-MQ45H2SF";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "A2ZConvertor - Free Online Image and PDF Tools",
    template: "%s | A2ZConvertor",
  },

  description:
    "A2ZConvertor offers free online image and PDF tools including image converters, image compression, PDF merge, PDF split and PDF compression.",

  keywords: [
    "image converter",
    "online image converter",
    "jpg to png",
    "png to jpg",
    "webp to jpg",
    "webp to png",
    "compress image",
    "image compressor",
    "pdf tools",
    "compress pdf",
    "merge pdf",
    "split pdf",
    "free online tools",
    "A2ZConvertor",
  ],

  verification: {
    other: {
      "p:domain_verify": "305e567c4cf88c255291674d5e49329e",
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "A2ZConvertor - Free Online Image and PDF Tools",
    description:
      "Convert, compress and edit images and PDFs online for free with fast, browser-based tools.",
    url: SITE_URL,
    siteName: "A2ZConvertor",
    type: "website",
    locale: "en_GB",
    images: [DEFAULT_OG_IMAGE],
  },

  twitter: {
    card: "summary_large_image",
    title: "A2ZConvertor - Free Online Image and PDF Tools",
    description:
      "Convert, compress and edit images and PDFs online for free.",
    images: [DEFAULT_OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <head>
        <AdSenseScript />
      </head>
      <body className="min-h-full flex flex-col">
     <noscript>
  <iframe
    src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
    height="0"
    width="0"
    style={{ display: "none", visibility: "hidden" }}
    title="Google Tag Manager"
  />
</noscript>
<script
  dangerouslySetInnerHTML={{
    __html: `
      try {
        const theme = localStorage.getItem('a2z-theme') || 'dark';
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.toggle('dark', theme === 'dark');
      } catch {
        document.documentElement.dataset.theme = 'dark';
        document.documentElement.classList.add('dark');
      }
    `,
  }}
/>
        {children}
        <CookiePopup />
        <ProductionAnalytics />
      </body>
    </html>
  );
}