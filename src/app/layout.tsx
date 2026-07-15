import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

/** Display / heading face. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Body / default face. */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

/** Mono face for eyebrows, labels and data. */
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ABC Group — Thoughtful mobile products",
  description:
    "ABC Group is a lean product company building thoughtful mobile apps with care — from design and development to publishing, ASO and long-term support.",
  keywords: [
    "ABC Group",
    "mobile app development",
    "Android",
    "Flutter",
    "app publishing",
    "app acquisition",
  ],
  openGraph: {
    title: "ABC Group — Thoughtful mobile products",
    description:
      "A small product company building thoughtful mobile apps with care, one release at a time.",
    siteName: "ABC Group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABC Group — Thoughtful mobile products",
    description:
      "A small product company building thoughtful mobile apps with care, one release at a time.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
