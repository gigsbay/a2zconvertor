import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookiePopup from "@/components/CookiePopup";
import ProductionAnalytics from "@/components/ProductionAnalytics";
import { SITE_URL } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  },

  twitter: {
    card: "summary_large_image",
    title: "A2ZConvertor - Free Online Image and PDF Tools",
    description:
      "Convert, compress and edit images and PDFs online for free.",
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
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem("a2z-theme")||"dark"}catch{}` }} />
        {children}
        <CookiePopup />
        <ProductionAnalytics />
      </body>
    </html>
  );
}
