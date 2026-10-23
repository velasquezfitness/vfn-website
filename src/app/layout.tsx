import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shared";
import "./globals.css";
const editorial = localFont({
  src: "./fonts/cormorant-garamond-latin-400-normal.woff2",
  variable: "--font-editorial",
  weight: "400",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/manrope-latin-400-normal.woff2",
  variable: "--font-body",
  weight: "400",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "VFN — The 1% Method | Velasquez Fitness & Nutrition",
    template: "%s | VFN",
  },
  description:
    "Personalized, evidence-informed coaching with Sebastian Velasquez. Strength, performance, and long-term development. 1% Better Everyday.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Velasquez Fitness & Nutrition",
    title: "VFN — The 1% Method",
    description:
      "Self-Mastery is the destination. 1% Better Every Day is the process.",
  },
  twitter: {
    card: "summary",
    title: "VFN — The 1% Method",
    description:
      "Individual coaching. Intentional progress. With Sebastian Velasquez.",
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${editorial.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
