import {
  getTranslator,
  localizedPath,
  type LocalePageProps,
} from "@/i18n/locale";
import { getPageLocale, pageMetadata } from "@/i18n/server";

import Link from "next/link";
import { Arrow } from "@/components/brand";
import { BrandPhoto } from "@/components/brand-photo";
import { ApplyCTA, PageIntro } from "@/components/shared";

export default async function Coaching({ params }: LocalePageProps) {
  const locale = await getPageLocale(params);
  const t = getTranslator(locale);
  return (
    <main id="main">
      <PageIntro
        label={t("PERSONAL COACHING / VFN")}
        title={t("Built around you.")}
        accent={t("Designed for progress.")}
        description={t(
          "Personalized training, structured accountability, and ongoing coaching designed to help you build strength, improve performance, and make lasting progress.",
        )}
      />
      <section
        id="offerings"
        className="container offerings-section"
        aria-labelledby="offerings-title"
      >
        <div className="offerings-heading">
          <div>
            <p className="eyebrow">{t("FIND YOUR APPROACH")}</p>
            <h2 id="offerings-title">
              {t("The right level")} <br />
              <em>{t("of support.")}</em>
            </h2>
          </div>
          <p>
            {t(
              "Independent programming or an ongoing coaching relationship. Choose the structure that fits the way you want to train.",
            )}{" "}
          </p>
        </div>
        <div className="package-grid">
          <article className="package-card" aria-labelledby="method-title">
            <p className="eyebrow">{t("INDEPENDENT TRAINING")}</p>
            <h3 id="method-title">{t("VFN Method")}</h3>
            <p className="package-model">
              {t("Eight weeks · one-time purchase")}
            </p>
            <p className="package-audience">
              {t(
                "For self-directed training with a clear, goal-specific plan.",
              )}{" "}
            </p>
            <ul>
              <li>{t("Prebuilt, goal-specific training program")}</li>
              <li>{t("Limited customization")}</li>
              <li>{t("PDF delivery")}</li>
              <li>{t("No ongoing coaching or check-ins")}</li>
            </ul>
            <p className="package-difference">
              {t("The plan, without an ongoing coaching relationship.")}{" "}
            </p>
            <Link className="button" href="#method-program">
              {t("View program details")} <Arrow />
            </Link>
          </article>
          <article className="package-card" aria-labelledby="coaching-title">
            <p className="eyebrow">{t("ONGOING ONLINE COACHING")}</p>
            <h3 id="coaching-title">{t("VFN Coaching")}</h3>
            <p className="package-model">{t("Individualized · ongoing")}</p>
            <p className="package-audience">
              {t(
                "For people who value an individual plan and structured accountability.",
              )}{" "}
            </p>
            <ul>
              <li>{t("Individualized programming")}</li>
              <li>{t("Progress tracking")}</li>
              <li>{t("Biweekly check-ins (every two weeks)")}</li>
              <li>{t("Defined communication and support")}</li>
            </ul>
            <p className="package-difference">
              {t("Personal direction, with a regular coaching rhythm.")}{" "}
            </p>
            <Link className="button" href={localizedPath(locale, "/apply")}>
              {t("Apply for Coaching")} <Arrow />
            </Link>
          </article>
          <article className="package-card" aria-labelledby="performance-title">
            <p className="eyebrow">{t("PREMIUM INDIVIDUAL COACHING")}</p>
            <h3 id="performance-title">{t("VFN Performance")}</h3>
            <p className="package-model">
              {t("Individualized · higher-touch")}
            </p>
            <p className="package-audience">
              {t(
                "For people seeking closer feedback and a performance-oriented approach.",
              )}{" "}
            </p>
            <ul>
              <li>
                {t(
                  "Individualized, performance-oriented programming when appropriate",
                )}{" "}
              </li>
              <li>{t("Weekly check-ins and more frequent adjustments")}</li>
              <li>{t("Technique video reviews")}</li>
              <li>{t("Priority support")}</li>
            </ul>
            <p className="package-difference">
              {t(
                "More frequent feedback and a closer view of your training.",
              )}{" "}
            </p>
            <Link className="button" href={localizedPath(locale, "/apply")}>
              {t("Apply for Performance")} <Arrow />
            </Link>
          </article>
        </div>
        <p className="offerings-note">
          {t(
            "Prices are not yet confirmed. No purchase or subscription is available on this website. Apply for ongoing coaching using the application form.",
          )}{" "}
        </p>
      </section>
      <section
        id="method-program"
        className="container method-program"
        aria-labelledby="program-title"
      >
        <p className="eyebrow">{t("VFN METHOD / PROGRAM DETAILS")}</p>
        <div>
          <h2 id="program-title">
            {t("A plan to follow.")} <br />
            <em>{t("Independently.")}</em>
          </h2>
          <p>
            {t(
              "An eight-week, prebuilt training program focused on a specific goal, with limited customization and PDF delivery. It is a one-time purchase offering, not a coaching subscription.",
            )}{" "}
          </p>
          <p>
            {t(
              "Ongoing coaching, check-ins, technique reviews, and continued support are not included. Pricing and purchase availability will be confirmed before this program can be purchased.",
            )}{" "}
          </p>
          <Link href="#offerings" className="text-link">
            {t("Compare the approaches")} <Arrow />
          </Link>
        </div>
      </section>
      <section className="container coaching-intro">
        <div className="coaching-intro-copy">
          <p className="eyebrow">{t("FOR THE INDIVIDUAL")}</p>
          <h2>
            {t("Where you are.")} <br />
            <em>{t("Where you want to go.")}</em>
          </h2>
          <p>
            {t(
              "For people seeking a more intentional approach to strength and performance—whether you’re building a foundation, returning to training, or refining an established practice.",
            )}{" "}
          </p>
          <p>
            {t(
              "The starting point is a conversation about your goals, your experience, and how training fits into your life.",
            )}{" "}
          </p>
          <Link className="text-link" href={localizedPath(locale, "/apply")}>
            {t("Find your starting point")} <Arrow />
          </Link>
        </div>
        <BrandPhoto locale={locale} kind="kettlebells" />
      </section>
      <section className="section container editorial-story">
        <p className="eyebrow">{t("THE ONGOING COACHING EXPERIENCE")}</p>
        <div>
          <h2>
            {t("A structure to work within.")} <br />
            <em>{t("A coach to work with.")}</em>
          </h2>
          <div className="offering-list">
            {[
              [
                "Personalized programming",
                "Training shaped around your goals, experience, equipment, and schedule.",
              ],
              [
                "Accountability & communication",
                "Ongoing coaching conversations to reflect on your effort, understand obstacles, and keep your priorities clear.",
              ],
              [
                "Progress tracking",
                "Use your training feedback and performance to understand how the plan is working.",
              ],
              [
                "Thoughtful adjustments",
                "Evolve your programming as your abilities and circumstances change.",
              ],
            ].map(([heading, c]) => (
              <article key={t(heading)}>
                <h3>{t(heading)}</h3>
                <p>{t(c)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="coaching-process">
        <div className="container">
          <p className="eyebrow">{t("BEFORE ONGOING COACHING BEGINS")}</p>
          <h2>{t("A considered beginning.")}</h2>
          <ol className="process-list">
            {[
              [
                "Share your starting point",
                "Tell us what you hope to achieve and what training looks like today.",
              ],
              [
                "Explore the fit",
                "Discuss the approach, format, availability, and fees before making a commitment.",
              ],
              [
                "Agree on a direction",
                "Clarify expectations and establish the right starting point for your training.",
              ],
            ].map(([heading, c], i) => (
              <li key={t(heading)}>
                <span className="index">0{i + 1}</span>
                <h3>{t(heading)}</h3>
                <p>{t(c)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section container faq">
        <p className="eyebrow">{t("A LITTLE MORE CLARITY")}</p>
        <h2>{t("Before you apply.")}</h2>
        {[
          [
            "Do I need to be experienced?",
            "No particular experience level is needed to start a conversation. Your background helps establish an appropriate starting point and whether coaching is a good fit.",
          ],
          [
            "How does communication work?",
            "VFN Coaching includes check-ins every two weeks. VFN Performance includes weekly check-ins and priority support. Communication channels, support boundaries, and expectations are agreed before starting. VFN Method does not include ongoing support.",
          ],
          [
            "Is coaching online or in person?",
            "VFN is an online-first coaching business. Share your preference in the application; any in-person availability must be confirmed directly.",
          ],
          [
            "What does coaching cost?",
            "No package prices are published here. Format, availability, scope, and fees must be confirmed before you commit.",
          ],
          [
            "Does coaching include medical treatment?",
            "No. This website does not offer medical treatment or clinical nutrition services. Please do not include sensitive medical information in your application.",
          ],
        ].map(([q, a]) => (
          <details key={t(q)}>
            <summary>
              {t(q)}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{t(a)}</p>
          </details>
        ))}
      </section>
      <ApplyCTA locale={locale} />
    </main>
  );
}

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(
    await getPageLocale(params),
    "/coaching",
    "Personalized Coaching",
    "Personalized training, structured accountability, and ongoing coaching designed to help you build strength, improve performance, and make lasting progress.",
  );
}
