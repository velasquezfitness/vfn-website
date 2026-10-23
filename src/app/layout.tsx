import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shared";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "VFN | Velasquez Fitness & Nutrition",
    template: "%s | VFN",
  },
  description:
    "Intentional training. Personal coaching. A stronger standard. Discover Velasquez Fitness & Nutrition and the philosophy of 1% Better Everyday.",
  openGraph: {
    type: "website",
    siteName: "Velasquez Fitness & Nutrition",
    title: "VFN — 1% Better Everyday",
    description:
      "Quiet focus. Relentless intent. Personalized coaching with Velasquez Fitness & Nutrition.",
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
