import type { Metadata } from "next";
import { BrandPhoto } from "@/components/brand-photo";
import { ApplyCTA } from "@/components/shared";
import { founder } from "@/content/site";
export const metadata: Metadata = {
  title: "Meet Sebastian Velasquez",
  description:
    "Meet Sebastian Velasquez: personal trainer, Senior Fitness Specialist, endurance athlete, HYROX competitor, and founder of VFN.",
};
export default function About() {
  return (
    <main id="main">
      <section className="container about-intro">
        <div>
          <p className="eyebrow">THE PERSON BEHIND THE METHOD</p>
          <h1>
            Sebastian
            <br />
            <em>Velasquez.</em>
          </h1>
          <p className="intro-copy">
            A coach. An athlete.
            <br />A belief in individual progress.
          </p>
          <p className="about-intro-detail">
            FOUNDER / VELASQUEZ FITNESS & NUTRITION
          </p>
        </div>
        <BrandPhoto kind="portrait" priority />
      </section>
      <section className="section container editorial-story">
        <p className="eyebrow">A HUMAN APPROACH</p>
        <div>
          <h2>
            Performance matters.
            <br />
            <em>So does the person.</em>
          </h2>
          <p>{founder.biography}</p>
          <p>
            VFN’s philosophy puts that individual perspective at the center of
            the coaching process. Understanding the person comes before writing
            the program.
          </p>
          <ul
            className="credential-list"
            aria-label="Professional and athletic background"
          >
            {founder.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="about-philosophy">
        <div className="container">
          <p className="eyebrow">1% BETTER EVERYDAY</p>
          <h2>
            Not a demand for perfection.
            <br />
            <em>A practice of paying attention.</em>
          </h2>
          <div className="belief-copy">
            <p>
              As a framework for training, the 1% Method brings together
              understanding, structure, consistent execution, and thoughtful
              feedback.
            </p>
            <p>
              The aim is lasting ownership: learning what works for you,
              adapting as you develop, and making progress that belongs to you.
            </p>
          </div>
        </div>
      </section>
      <ApplyCTA />
    </main>
  );
}
