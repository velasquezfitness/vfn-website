import type { Metadata } from "next";
import { founder } from "@/content/site";
import { ApplyCTA, PageIntro } from "@/components/shared";
import { Mark } from "@/components/brand";
export const metadata: Metadata = {
  title: "About VFN",
  description:
    "Discover the philosophy behind Velasquez Fitness & Nutrition: quiet focus, intentional training, and 1% Better Everyday.",
};
export default function About() {
  return (
    <main id="main">
      <PageIntro
        label="BEHIND THE STANDARD"
        title="An instinct"
        accent="for better."
        description="VFN is a commitment to continuous improvement. A place for purposeful work, honest effort, and the discipline to keep evolving."
      />
      <section className="container about-story">
        <div className="founder-art">
          <Mark />
          <span>IDENTITY STUDY / VFN</span>
          <p>
            Founder portrait to be added.
            <br />
            Temporary brand artwork.
          </p>
        </div>
        <div>
          <p className="eyebrow">THE PERSON BEHIND THE PURPOSE</p>
          <h2>{founder.name}</h2>
          <p className="muted">{founder.biography}</p>
          <div className="editorial-note">
            <span className="eyebrow">CREDENTIALS / TO BE CONFIRMED</span>
            <p>{founder.credentials}</p>
          </div>
          <p className="small muted">
            Founder details are intentionally left unverified. No qualifications
            or personal history are implied by this placeholder.
          </p>
        </div>
      </section>
      <section className="section container">
        <p className="eyebrow">WHAT WE STAND FOR</p>
        <h2>Earn the next level.</h2>
        <div className="card-grid process">
          {[
            [
              "Focus",
              "Give the work your attention. Progress starts with knowing what matters and showing up for it.",
            ],
            [
              "Discipline",
              "Build repeatable habits. The ordinary days are where the foundation is made.",
            ],
            [
              "Evolution",
              "Stay open to learning. Adjust with intention and keep raising your own standard.",
            ],
          ].map(([t, c], i) => (
            <article key={t}>
              <span className="card-number">0{i + 1} /</span>
              <h3>{t}</h3>
              <p className="muted">{c}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="manifesto container">
        <p className="eyebrow">THE VFN MINDSET</p>
        <blockquote>
          “The goal isn’t perfect.
          <br />
          The goal is <span className="yellow">better.</span>”
        </blockquote>
        <p className="muted">1% Better Everyday.</p>
      </section>
      <ApplyCTA />
    </main>
  );
}
