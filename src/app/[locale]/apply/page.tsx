import { getTranslator, type LocalePageProps } from "@/i18n/locale";
import { getPageLocale, pageMetadata } from "@/i18n/server";

import { PageIntro } from "@/components/shared";
import { ApplicationForm } from "@/components/application-form";

export default async function Apply({ params }: LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = getTranslator(locale);
  return (
    <main id="main">
      <PageIntro
        label={t("A CONVERSATION ABOUT WHAT COMES NEXT")}
        title={t("Your goals.")}
        accent={t("Your starting point.")}
        description={t(
          "Tell us where you are, what you’re working toward, and what you’d value in a coach.",
        )}
      />
      <section className="container application-layout">
        <aside>
          <p className="eyebrow">{t("PERSONAL FROM THE START")}</p>
          <h2>
            {t("Let’s understand")} <br />
            <em>{t("the individual.")}</em>
          </h2>
          <p>
            {t(
              "For VFN Coaching or VFN Performance, this is a starting point for a coaching conversation, not a commitment to a package or a payment.",
            )}{" "}
          </p>
          <p>
            {t(
              "After you apply, the next step is to discuss your goals, coaching fit, support expectations, and availability.",
            )}{" "}
          </p>
          <p className="small">
            {t(
              "Please share only what’s relevant to your training. Medical records and sensitive health information aren’t needed here.",
            )}{" "}
          </p>
        </aside>
        <ApplicationForm locale={locale} />
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(
    await getPageLocale(params),
    "/apply",
    "Apply for Coaching",
    "Start with your goals. Apply for individualized coaching with Velasquez Fitness & Nutrition.",
  );
}
