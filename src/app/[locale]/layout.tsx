import { getTranslator, type LocalePageProps } from "@/i18n/locale";
import { getPageLocale, pageMetadata } from "@/i18n/server";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/shared";
import "../globals.css";
const editorial = localFont({
  src: "../fonts/cormorant-garamond-latin-400-normal.woff2",
  variable: "--font-editorial",
  weight: "400",
  display: "swap",
});
const sans = localFont({
  src: "../fonts/manrope-latin-400-normal.woff2",
  variable: "--font-body",
  weight: "400",
  display: "swap",
});
export default async function RootLayout({
  children,
  params,
}: { children: ReactNode } & LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = getTranslator(locale);
  return (
    <html
      lang={locale === "es" ? "es-PR" : "en"}
      className={`${editorial.variable} ${sans.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          {t("Skip to content")}
        </a>
        <Navigation locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}
export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(
    await getPageLocale(params),
    "/",
    "The 1% Method",
    "Personalized, evidence-informed coaching with Sebastian Velasquez. Strength, performance, and long-term development. 1% Better Everyday.",
  );
}
