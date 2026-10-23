import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/brand";
import { BrandPhoto } from "@/components/brand-photo";
import { ApplyCTA, PageIntro } from "@/components/shared";
export const metadata: Metadata = {
  title: "Personalized Coaching",
  description:
    "Personalized training, structured accountability, and ongoing coaching designed to help you build strength, improve performance, and make lasting progress.",
};
export default function Coaching() {
  return (
    <main id="main">
      <PageIntro
        label="PERSONAL COACHING / VFN"
        title="Built around you."
        accent="Designed for progress."
        description="Personalized training, structured accountability, and ongoing coaching designed to help you build strength, improve performance, and make lasting progress."
      />
      <section className="container coaching-intro">
        <div className="coaching-intro-copy">
          <p className="eyebrow">FOR THE INDIVIDUAL</p>
          <h2>
            Where you are.
            <br />
            <em>Where you want to go.</em>
          </h2>
          <p>
            For people seeking a more intentional approach to strength and
            performance—whether you’re building a foundation, returning to
            training, or refining an established practice.
          </p>
          <p>
            The starting point is a conversation about your goals, your
            experience, and how training fits into your life.
          </p>
          <Link className="text-link" href="/apply">
            Find your starting point <Arrow />
          </Link>
        </div>
        <BrandPhoto kind="kettlebells" />
      </section>
      <section className="section container editorial-story">
        <p className="eyebrow">THE COACHING EXPERIENCE</p>
        <div>
          <h2>
            A structure to work within.
            <br />
            <em>A coach to work with.</em>
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
            ].map(([t, c]) => (
              <article key={t}>
                <h3>{t}</h3>
                <p>{c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="coaching-process">
        <div className="container">
          <p className="eyebrow">BEFORE THE FIRST SESSION</p>
          <h2>A considered beginning.</h2>
          <ol className="process-list">
            {[
              [
                "Share your starting point",
                "When applications open, tell us what you hope to achieve and what training looks like today.",
              ],
              [
                "Explore the fit",
                "Discuss the approach, format, availability, and fees before making a commitment.",
              ],
              [
                "Agree on a direction",
                "Clarify expectations and establish the right starting point for your training.",
              ],
            ].map(([t, c], i) => (
              <li key={t}>
                <span className="index">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{c}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section container faq">
        <p className="eyebrow">A LITTLE MORE CLARITY</p>
        <h2>Before you apply.</h2>
        {[
          [
            "Do I need to be experienced?",
            "No particular experience level is needed to start a conversation. Your background helps establish an appropriate starting point and whether coaching is a good fit.",
          ],
          [
            "How does communication work?",
            "Ongoing communication and accountability are part of the approach. The specific channel, frequency, and scope should be agreed directly before coaching begins.",
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
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <ApplyCTA />
    </main>
  );
}
