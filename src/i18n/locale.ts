import spanish from "./es.json";
export type Locale = "en" | "es";
export type LocalePageProps = { params: Promise<{ locale: string }> };
export function getTranslator(locale: Locale) {
  return (text: string): string =>
    locale === "es"
      ? ((spanish as Record<string, string>)[text] ?? text)
      : text;
}
export function localizedPath(locale: Locale, pathname: string) {
  const base = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  return locale === "es" ? `/es${base === "/" ? "" : base}` : base;
}
