import type { Metadata } from "next";
import { Arrow } from "@/components/brand";
import Link from "next/link";
import { ApplyCTA, PageIntro } from "@/components/shared";
export const metadata: Metadata = {
  title: "Personalized Coaching",
  description:
    "Explore VFN’s approach to personalized training, performance development, accountability, programming, and ongoing coaching support.",
};
const services = [
  [
    "01",
    "Personalized training",
    "A plan with your name on it.",
    "Your starting point matters. Programming is shaped around your experience, goals, available equipment, and training schedule.",
  ],
  [
    "02",
    "Performance development",
    "Build more than a routine.",
    "Develop strength, movement quality, and physical capacity through purposeful sessions and sensible progression.",
  ],
  [
    "03",
    "Accountability",
    "Keep the promise to yourself.",
    "Regular communication and feedback help you reflect on your effort, navigate obstacles, and stay connected to the bigger picture.",
  ],
  [
    "04",
    "Programming & support",
    "A direction that can evolve.",
    "Your training should move with you. Review what’s working, discuss what isn’t, and adjust the approach as your circumstances change.",
  ],
];
export default function Coaching() {
  return (
    <main id="main">
      <PageIntro
        label="THE COACHING APPROACH"
        title="Intentional work."
        accent="Individual direction."
        description="You bring the ambition. We build a purposeful approach around your life, your starting point, and what you want to become."
      />
      <section
        className="container service-list"
        aria-label="Coaching focus areas"
      >
        {services.map(([n, title, heading, copy]) => (
          <article className="service-row" key={n}>
            <span className="eyebrow">
              {n} / {title}
            </span>
            <div>
              <h2>{heading}</h2>
              <p>{copy}</p>
            </div>
            <span className="service-arrow" aria-hidden="true">
              <Arrow />
            </span>
          </article>
        ))}
      </section>
      <section className="section container">
        <p className="eyebrow">FROM INTENTION TO ACTION</p>
        <h2>A clear starting line.</h2>
        <div className="card-grid process">
          {[
            [
              "01",
              "Tell your story",
              "Share your goals, training background, and what you need help with.",
            ],
            [
              "02",
              "Find the fit",
              "Discuss your priorities and the coaching approach before making a commitment.",
            ],
            [
              "03",
              "Get to work",
              "Agree on a direction, establish your starting point, and build consistency.",
            ],
          ].map(([n, t, c]) => (
            <article key={n}>
              <span className="card-number">{n}</span>
              <h3>{t}</h3>
              <p className="muted">{c}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section container faq">
        <p className="eyebrow">BEFORE YOU BEGIN</p>
        <h2>A few things to know.</h2>
        {[
          [
            "Do I need to be experienced?",
            "Your experience is part of the conversation, not a barrier to having one. Share where you are today so the right starting point can be discussed.",
          ],
          [
            "What equipment do I need?",
            "Tell us what you have access to in your application. Equipment and scheduling needs should be agreed before coaching begins.",
          ],
          [
            "Is there a fixed package or price?",
            "Coaching details, availability, and fees have not been published. These should be confirmed directly before any commitment.",
          ],
          [
            "Does coaching include medical or dietary treatment?",
            "This website does not offer medical advice or clinical nutrition services. Discuss health conditions and dietary treatment with an appropriately qualified healthcare professional.",
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
        <Link href="/apply" className="text-link">
          Start with your goals <Arrow />
        </Link>
      </section>
      <ApplyCTA />
    </main>
  );
}
