import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const font = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I'm Done.",
  description:
    "Say goodbye in style, log off, and discover a strange new world called real life, one without notifications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        id="adsense-init"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3493162279498337"
        crossOrigin="anonymous"
      />
      <body className={`${font.className} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
