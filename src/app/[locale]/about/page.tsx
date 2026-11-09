import { BrandCopy } from "@/components/brand-copy";
import { getTranslator, type LocalePageProps } from "@/i18n/locale";
import { getPageLocale, pageMetadata } from "@/i18n/server";

import { BrandPhoto } from "@/components/brand-photo";
import { ApplyCTA } from "@/components/shared";
import { founder } from "@/content/site";

export default async function About({ params }: LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = getTranslator(locale);
  return (
    <main id="main">
      <section className="container about-intro">
        <div>
          <p className="eyebrow">{t("THE PERSON BEHIND THE METHOD")}</p>
          <h1>
            {t("Sebastian")} <br />
            <em>{t("Velasquez.")}</em>
          </h1>
          <p className="intro-copy">
            {t("A coach. An athlete.")} <br />
            {t("A belief in individual progress.")}{" "}
          </p>
          <p className="about-intro-detail">
            {t("FOUNDER / VELASQUEZ FITNESS & NUTRITION")}{" "}
          </p>
        </div>
        <BrandPhoto locale={locale} kind="portrait" priority />
      </section>
      <section className="section container editorial-story">
        <p className="eyebrow">{t("A HUMAN APPROACH")}</p>
        <div>
          <h2>
            {t("Performance matters.")} <br />
            <em>{t("So does the person.")}</em>
          </h2>
          <p>{t(founder.biography)}</p>
          <p>
            {t(
              "VFN’s philosophy puts that individual perspective at the center of the coaching process. Understanding the person comes before writing the program.",
            )}{" "}
          </p>
          <ul
            className="credential-list"
            aria-label={t("Professional and athletic background")}
          >
            {founder.credentials.map((c) => (
              <li key={t(c)}>{t(c)}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="about-philosophy">
        <div className="container">
          <p className="eyebrow">
            <BrandCopy locale={locale} source={"1% BETTER EVERYDAY"} />
          </p>
          <h2>
            {t("Not a demand for perfection.")} <br />
            <em>{t("A practice of paying attention.")}</em>
          </h2>
          <div className="belief-copy">
            <p>
              <BrandCopy
                locale={locale}
                source={
                  "As a framework for training, the 1% Method brings together understanding, structure, consistent execution, and thoughtful feedback."
                }
              />{" "}
            </p>
            <p>
              {t(
                "The aim is lasting ownership: learning what works for you, adapting as you develop, and making progress that belongs to you.",
              )}{" "}
            </p>
          </div>
        </div>
      </section>
      <ApplyCTA locale={locale} />
    </main>
  );
}

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(
    await getPageLocale(params),
    "/about",
    "Meet Sebastian Velasquez",
    "Meet Sebastian Velasquez: personal trainer, Senior Fitness Specialist, endurance athlete, HYROX competitor, and founder of VFN.",
  );
}
