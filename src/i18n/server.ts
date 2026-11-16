import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTranslator,
  localizedPath,
  type Locale,
  type LocalePageProps,
} from "./locale";
export async function getPageLocale(
  params: LocalePageProps["params"],
): Promise<Locale> {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  return locale;
}
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const t = getTranslator(locale);
  return {
    title: `${t(title)} | VFN`,
    description: t(description),
    alternates: {
      canonical: localizedPath(locale, path),
      languages: {
        en: localizedPath("en", path),
        "es-PR": localizedPath("es", path),
        "x-default": localizedPath("en", path),
      },
    },
    openGraph: {
      title: `${t(title)} | VFN`,
      description: t(description),
      locale: locale === "es" ? "es_PR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_PR",
      type: "website",
      siteName: "Velasquez Fitness & Nutrition",
    },
    twitter: {
      card: "summary",
      title: `${t(title)} | VFN`,
      description: t(description),
    },
  };
}
