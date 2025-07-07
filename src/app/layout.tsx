import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import "./globals.css";

const font = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I'm Done.",
  description:
    "Say goodbye in style, log off, and discover a strange new world called real life. One without notifications. ❤️",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
