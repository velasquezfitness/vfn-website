"use client";
import { usePathname } from "next/navigation";
import { getTranslator, localizedPath } from "@/i18n/locale";
import Link from "next/link";
import { Arrow } from "@/components/brand";
export default function NotFound() {
  const locale = usePathname().startsWith("/es") ? "es" : "en";
  const t = getTranslator(locale);
  return (
    <main id="main" className="container page-intro">
      <p className="eyebrow">{t("404 / PAGE NOT FOUND")}</p>
      <h1>
        {t("A different")} <br />
        <em>{t("starting point.")}</em>
      </h1>
      <p className="intro-copy">
        {t("The page you’re looking for isn’t here.")}
      </p>
      <Link className="button" href={localizedPath(locale, "/")}>
        {t("Back to home")} <Arrow />
      </Link>
    </main>
  );
}
