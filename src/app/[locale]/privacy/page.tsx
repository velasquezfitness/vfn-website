import { getTranslator, type LocalePageProps } from "@/i18n/locale";
import { getPageLocale, pageMetadata } from "@/i18n/server";

import { PageIntro } from "@/components/shared";

export default async function Privacy({ params }: LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = getTranslator(locale);
  return (
    <main id="main">
      <PageIntro
        label={t("PRIVACY NOTICE")}
        title={t("Clarity about")}
        accent={t("your information.")}
        description={t(
          "Learn how your coaching application information is handled.",
        )}
      />
      <section className="container privacy-copy">
        <h2>{t("Coaching applications")}</h2>
        <p>
          {t(
            "When you submit the coaching application, the details you enter are sent through Formspree, a third-party form processing service, so VFN can review your request and contact you at the email address you provide. Formspree processes and may retain submissions according to its own policies. Please review",
          )}{" "}
          <a
            href="https://formspree.io/legal/privacy-policy/"
            className="text-link"
          >
            {t("Formspree’s privacy policy")}
          </a>
          .
        </p>
        <p>
          {t(
            "VFN uses application information to evaluate coaching fit and follow up about coaching services. For questions about your application or to request deletion, contact",
          )}{" "}
          <a className="text-link" href="mailto:velasquezfitnesspr@gmail.com">
            {t("velasquezfitnesspr@gmail.com")}
          </a>
          .
        </p>
        <h2>{t("Information to leave out")}</h2>
        <p>
          {t(
            "Please do not enter medical records, diagnoses, financial details, or other sensitive personal information. A coaching inquiry should focus on your training goals and preferences.",
          )}{" "}
        </p>
        <h2>{t("Website hosting")}</h2>
        <p>
          {t(
            "The service used to access or host a website may process technical request information, such as an IP address. Hosting arrangements and their applicable privacy terms must be confirmed before public launch.",
          )}{" "}
        </p>
      </section>
    </main>
  );
}

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(
    await getPageLocale(params),
    "/privacy",
    "Privacy Notice",
    "How VFN coaching applications are submitted and handled.",
  );
}
