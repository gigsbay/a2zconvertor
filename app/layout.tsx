import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://a2zconvertor.co.uk"),

  title: {
    default: "A2ZConvertor - Free Online Image Conversion Tools",
    template: "%s | A2ZConvertor",
  },

  description:
    "A2ZConvertor offers free online image conversion and compression tools including JPG to PNG, PNG to JPG, WEBP converters and image compressor tools.",

  keywords: [
    "image converter",
    "online image converter",
    "jpg to png",
    "png to jpg",
    "webp to jpg",
    "webp to png",
    "compress image",
    "image compressor",
    "free online tools",
    "A2ZConvertor",
  ],

  openGraph: {
    title: "A2ZConvertor - Free Online Image Conversion Tools",
    description:
      "Convert and compress images online for free with fast, browser-based tools.",
    url: "https://a2zconvertor.co.uk",
    siteName: "A2ZConvertor",
    type: "website",
    locale: "en_GB",
  },

  twitter: {
    card: "summary_large_image",
    title: "A2ZConvertor - Free Online Image Conversion Tools",
    description:
      "Convert JPG, PNG, WEBP and compress images online for free.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
