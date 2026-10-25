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
      <section
        id="offerings"
        className="container offerings-section"
        aria-labelledby="offerings-title"
      >
        <div className="offerings-heading">
          <div>
            <p className="eyebrow">FIND YOUR APPROACH</p>
            <h2 id="offerings-title">
              The right level
              <br />
              <em>of support.</em>
            </h2>
          </div>
          <p>
            Independent programming or an ongoing coaching relationship. Choose
            the structure that fits the way you want to train.
          </p>
        </div>
        <div className="package-grid">
          <article className="package-card" aria-labelledby="method-title">
            <p className="eyebrow">INDEPENDENT TRAINING</p>
            <h3 id="method-title">VFN Method</h3>
            <p className="package-model">Eight weeks · one-time purchase</p>
            <p className="package-audience">
              For self-directed training with a clear, goal-specific plan.
            </p>
            <ul>
              <li>Prebuilt, goal-specific training program</li>
              <li>Limited customization</li>
              <li>PDF delivery</li>
              <li>No ongoing coaching or check-ins</li>
            </ul>
            <p className="package-difference">
              The plan, without an ongoing coaching relationship.
            </p>
            <Link className="button" href="#method-program">
              View program details <Arrow />
            </Link>
          </article>
          <article className="package-card" aria-labelledby="coaching-title">
            <p className="eyebrow">ONGOING ONLINE COACHING</p>
            <h3 id="coaching-title">VFN Coaching</h3>
            <p className="package-model">Individualized · ongoing</p>
            <p className="package-audience">
              For people who value an individual plan and structured
              accountability.
            </p>
            <ul>
              <li>Individualized programming</li>
              <li>Progress tracking</li>
              <li>Biweekly check-ins (every two weeks)</li>
              <li>Defined communication and support</li>
            </ul>
            <p className="package-difference">
              Personal direction, with a regular coaching rhythm.
            </p>
            <Link className="button" href="/apply">
              Apply for Coaching <Arrow />
            </Link>
          </article>
          <article className="package-card" aria-labelledby="performance-title">
            <p className="eyebrow">PREMIUM INDIVIDUAL COACHING</p>
            <h3 id="performance-title">VFN Performance</h3>
            <p className="package-model">Individualized · higher-touch</p>
            <p className="package-audience">
              For people seeking closer feedback and a performance-oriented
              approach.
            </p>
            <ul>
              <li>
                Individualized, performance-oriented programming when
                appropriate
              </li>
              <li>Weekly check-ins and more frequent adjustments</li>
              <li>Technique video reviews</li>
              <li>Priority support</li>
            </ul>
            <p className="package-difference">
              More frequent feedback and a closer view of your training.
            </p>
            <Link className="button" href="/apply">
              Apply for Performance <Arrow />
            </Link>
          </article>
        </div>
        <p className="offerings-note">
          Prices are not yet confirmed. No purchase or subscription is available
          on this website. Ongoing coaching applications remain a preview until
          secure delivery is enabled.
        </p>
      </section>
      <section
        id="method-program"
        className="container method-program"
        aria-labelledby="program-title"
      >
        <p className="eyebrow">VFN METHOD / PROGRAM DETAILS</p>
        <div>
          <h2 id="program-title">
            A plan to follow.
            <br />
            <em>Independently.</em>
          </h2>
          <p>
            An eight-week, prebuilt training program focused on a specific goal,
            with limited customization and PDF delivery. It is a one-time
            purchase offering, not a coaching subscription.
          </p>
          <p>
            Ongoing coaching, check-ins, technique reviews, and continued
            support are not included. Pricing and purchase availability will be
            confirmed before this program can be purchased.
          </p>
          <Link href="#offerings" className="text-link">
            Compare the approaches <Arrow />
          </Link>
        </div>
      </section>
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
        <p className="eyebrow">THE ONGOING COACHING EXPERIENCE</p>
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
          <p className="eyebrow">BEFORE ONGOING COACHING BEGINS</p>
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
