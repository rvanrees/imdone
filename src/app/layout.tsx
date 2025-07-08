import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import Head from "next/head";
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
      <Head>
        <meta name="google-adsense-account" content="ca-pub-3493162279498337" />
      </Head>
      <body className={`${font.className} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
