import {
  getTranslator,
  localizedPath,
  type LocalePageProps,
} from "@/i18n/locale";
import { getPageLocale, pageMetadata } from "@/i18n/server";
import Link from "next/link";
import { Arrow } from "@/components/brand";
import { BrandPhoto } from "@/components/brand-photo";
import { ApplyCTA } from "@/components/shared";
import { founder, method } from "@/content/site";
export default async function Home({ params }: LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = getTranslator(locale);
  return (
    <main id="main">
      <section className="editorial-hero">
        <BrandPhoto
          locale={locale}
          kind="portrait"
          priority
          className="hero-photo"
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">{t("THE 1% METHOD™")}</p>
            <h1>
              {t("Self-Mastery Is")} <br />
              {t("the Destination.")}{" "}
            </h1>
            <p className="hero-subtitle">
              {t("1% Better Every Day")} <br />
              {t("is the process.")}{" "}
            </p>
            <div className="hero-actions">
              <Link href={localizedPath(locale, "/apply")} className="button">
                {t("Apply for coaching")} <Arrow />
              </Link>
              <a href="#method" className="text-link">
                {t("Explore the method")} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-footnote">
            <span>{t("SEBASTIAN VELASQUEZ / PERSONAL COACHING")}</span>
            <span>{t("STRENGTH. PERFORMANCE. SELF-MASTERY.")}</span>
          </div>
        </div>
      </section>
      <section className="section container belief">
        <p className="eyebrow section-label">{t("01 / THE BELIEF")}</p>
        <div>
          <h2>
            {t("Progress is built through")} <br />
            <em>{t("what you choose to repeat.")}</em>
          </h2>
          <div className="belief-copy">
            <p>
              {t(
                "Meaningful change starts with understanding the individual. Your experience, your circumstances, and the goals that matter to you.",
              )}{" "}
            </p>
            <p>
              {t(
                "VFN brings structure to that starting point: deliberate training, personal accountability, and the space to keep improving.",
              )}{" "}
            </p>
          </div>
        </div>
      </section>
      <section id="method" className="method-section">
        <div className="method-visual">
          <BrandPhoto locale={locale} kind="panther" />
          <div className="method-image-caption">
            <span>
              {t("QUIET CONFIDENCE.")} <br />
              {t("DELIBERATE ACTION.")}{" "}
            </span>
            <span>{t("THE VFN PHILOSOPHY")}</span>
          </div>
        </div>
        <div className="method-content">
          <p className="eyebrow">{t("02 / THE 1% METHOD")}</p>
          <h2>
            {t("A Process.")} <br />
            <em>{t("Not a Shortcut.")}</em>
          </h2>
          <p className="section-description">
            {t(
              "Five stages. One individual. A framework for turning effort into intentional, lasting development.",
            )}{" "}
          </p>
          <ol className="method-list">
            {method.map((stage, i) => (
              <li key={t(stage.name)}>
                <span className="index">0{i + 1}</span>
                <div>
                  <h3>{t(stage.name)}</h3>
                  <p>{t(stage.copy)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="practice-section">
        <div className="container practice-inner">
          <div>
            <p className="eyebrow">{t("03 / THE PRACTICE")}</p>
            <h2>
              {t("Personal coaching.")} <br />
              <em>{t("In every sense.")}</em>
            </h2>
            <Link
              href={localizedPath(locale, "/coaching")}
              className="text-link"
            >
              {t("Explore coaching")} <Arrow />
            </Link>
          </div>
          <div className="practice-list">
            <article>
              <span className="index">{t("I.")}</span>
              <div>
                <h3>{t("A plan with purpose.")}</h3>
                <p>
                  {t(
                    "Personalized programming that connects your training to your goals, available time, and experience.",
                  )}{" "}
                </p>
              </div>
            </article>
            <article>
              <span className="index">{t("II.")}</span>
              <div>
                <h3>{t("A clear perspective.")}</h3>
                <p>
                  {t(
                    "Structured accountability, progress tracking, and ongoing communication with your coach.",
                  )}{" "}
                </p>
              </div>
            </article>
            <article>
              <span className="index">{t("III.")}</span>
              <div>
                <h3>{t("Room to evolve.")}</h3>
                <p>
                  {t(
                    "Thoughtful program adjustments as your strength, performance, and circumstances develop.",
                  )}{" "}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section container founder-section">
        <BrandPhoto locale={locale} kind="kettlebells" />
        <div className="founder-copy">
          <p className="eyebrow">{t("04 / MEET THE FOUNDER")}</p>
          <h2>
            {t("Serious about training.")} <br />
            <em>{t("Personal about coaching.")}</em>
          </h2>
          <p className="founder-name">
            {founder.name}
            <span>{t("FOUNDER & COACH")}</span>
          </p>
          <p>{t(founder.biography)}</p>
          <Link href={localizedPath(locale, "/about")} className="text-link">
            {t("Meet your coach")} <Arrow />
          </Link>
        </div>
      </section>
      <ApplyCTA locale={locale} />
    </main>
  );
}

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(
    await getPageLocale(params),
    "/",
    "The 1% Method",
    "Personalized, evidence-informed coaching with Sebastian Velasquez. Strength, performance, and long-term development. 1% Better Everyday.",
  );
}
