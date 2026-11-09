import { BrandCopy } from "@/components/brand-copy";
import { getTranslator, localizedPath, type Locale } from "@/i18n/locale";
import Link from "next/link";
import { Emblem } from "./emblem";
import { Arrow } from "./brand";
export function ApplyCTA({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <section className="closing-section">
      <div className="container closing-inner">
        <p className="eyebrow">{t("YOUR NEXT CHAPTER")}</p>
        <h2>
          {t("Built around you.")} <br />
          <em>{t("Designed for progress.")}</em>
        </h2>
        <div className="closing-bottom">
          <p>
            {t("A thoughtful approach to training.")} <br />
            {t("A conversation about what comes next.")}{" "}
          </p>
          <Link className="button" href={localizedPath(locale, "/apply")}>
            {t("Apply for coaching")} <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link
          href={localizedPath(locale, "/")}
          className="footer-brand"
          aria-label={t("VFN — Home")}
        >
          <Emblem placement="footer" locale={locale} />
        </Link>
        <p className="footer-philosophy">
          <BrandCopy locale={locale} source={"1% Better Everyday."} />
        </p>
        <nav aria-label={t("Footer navigation")}>
          <Link href={localizedPath(locale, "/coaching")}>{t("Coaching")}</Link>
          <Link href={localizedPath(locale, "/about")}>{t("About")}</Link>
          <Link href={localizedPath(locale, "/apply")}>{t("Apply")}</Link>
          <Link href={localizedPath(locale, "/privacy")}>{t("Privacy")}</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {t("Velasquez Fitness & Nutrition")}
        </span>
        <span>{t("INDIVIDUAL BY DESIGN.")}</span>
      </div>
    </footer>
  );
}
export function PageIntro({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">{label}</p>
      <h1>
        {title}
        <br />
        <em>{accent}</em>
      </h1>
      <p className="intro-copy">{description}</p>
    </section>
  );
}
