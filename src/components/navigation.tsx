"use client";
import Link from "next/link";
import { Emblem } from "./emblem";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Arrow } from "./brand";
import { getTranslator, localizedPath, type Locale } from "@/i18n/locale";
const links = [
  ["/", "Home"],
  ["/coaching", "Coaching"],
  ["/about", "About"],
  ["/apply", "Apply"],
];
export function Navigation({ locale }: { locale: Locale }) {
  const path = usePathname();
  const t = getTranslator(locale);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href={localizedPath(locale, "/")}
          className="header-brand"
          aria-label={t("VFN — Home")}
          onClick={() => setOpen(false)}
        >
          <Emblem placement="header" locale={locale} />
        </Link>
        <button
          ref={button}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {t(open ? "Close −" : "Menu +")}
        </button>
        <nav
          id="primary-navigation"
          aria-label={t("Main navigation")}
          className={`nav-links ${open ? "is-open" : ""}`}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              button.current?.focus();
            }
          }}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={localizedPath(locale, href)}
              aria-current={
                localizedPath(locale, path) === localizedPath(locale, href)
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {t(label)}
              <Arrow />
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <nav className="language-switcher" aria-label={t("Language")}>
            {(["en", "es"] as const).map((target, i) => (
              <span key={target}>
                {i === 1 && (
                  <span className="language-divider" aria-hidden="true">
                    /
                  </span>
                )}
                <a
                  href={localizedPath(target, path)}
                  hrefLang={target === "es" ? "es-PR" : "en"}
                  lang={target}
                  aria-label={target === "en" ? "English" : "Español"}
                  aria-current={target === locale ? "true" : undefined}
                  onClick={(event) => {
                    const url = new URL(event.currentTarget.href);
                    url.search = window.location.search;
                    url.hash = window.location.hash;
                    event.currentTarget.href = url.href;
                  }}
                >
                  {target.toUpperCase()}
                </a>
              </span>
            ))}
          </nav>
          <Link href={localizedPath(locale, "/apply")} className="header-cta">
            {t("Apply for coaching")}
            <Arrow />
          </Link>
        </div>
      </div>
    </header>
  );
}
