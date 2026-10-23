import Link from "next/link";
import { Arrow, Mark } from "@/components/brand";
import { ApplyCTA } from "@/components/shared";
export default function Home() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> VELASQUEZ FITNESS & NUTRITION
          </p>
          <h1>
            Not for
            <br />
            the ordinary.
            <br />
            <span className="yellow">For the better.</span>
          </h1>
          <p className="hero-description">
            Train with intention. Move with purpose.
            <br />
            Build the discipline to become more.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/apply">
              Apply for coaching <Arrow />
            </Link>
            <Link className="text-link" href="/coaching">
              Explore the approach <Arrow />
            </Link>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Abstract panther-inspired geometric brand study"
        >
          <div className="art-cross cross-one">+</div>
          <div className="art-cross cross-two">+</div>
          <div className="art-ring" />
          <Mark className="hero-panther" />
          <span className="art-coordinate">VFN / FORM STUDY 001</span>
          <span className="art-side">FOCUS · INTENT · DISCIPLINE</span>
          <div className="art-label">
            <span>THE INSTINCT TO EVOLVE.</span>
            <strong>01 / ∞</strong>
          </div>
        </div>
        <div className="hero-bottom">
          <span>PERSONAL COACHING. HIGHER STANDARDS.</span>
          <a href="#philosophy">
            THE VFN MINDSET <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <div className="statement-strip" aria-hidden="true">
        <span>INTENTION OVER EXCUSES</span>
        <span>+</span>
        <span>CONSISTENCY OVER HYPE</span>
        <span>+</span>
        <span>1% BETTER EVERYDAY</span>
      </div>
      <section id="philosophy" className="section container philosophy">
        <div>
          <p className="eyebrow">01 / THE PHILOSOPHY</p>
          <h2>
            Small progress.
            <br />
            <span className="muted">Uncompromising</span>
            <br />
            standards.
          </h2>
        </div>
        <div className="philosophy-copy">
          <div className="one-percent">
            1<span>%</span>
            <span className="one-caption">BETTER EVERYDAY</span>
          </div>
          <p>
            Progress isn’t a single breakthrough. It’s the decision to show up,
            put in the work, and do the next thing better.
          </p>
          <p className="muted">
            VFN is built around that decision. A purposeful approach to training
            that respects where you are and challenges where you can go.
          </p>
          <Link href="/about" className="text-link">
            The mindset behind VFN <Arrow />
          </Link>
        </div>
      </section>
      <section className="section benefits">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / BUILT AROUND YOU</p>
              <h2>
                Your ambition.
                <br />A clearer direction.
              </h2>
            </div>
            <Link href="/coaching" className="text-link">
              Explore coaching <Arrow />
            </Link>
          </div>
          <div className="card-grid">
            {[
              [
                "01",
                "Train with purpose",
                "Personalized programming shaped around your goals, experience, and the demands of your everyday life.",
              ],
              [
                "02",
                "Build your capacity",
                "Develop strength, movement quality, and performance with a deliberate approach to progression.",
              ],
              [
                "03",
                "Stay accountable",
                "Turn intention into action with ongoing communication, useful feedback, and a plan that can evolve.",
              ],
            ].map(([n, title, copy]) => (
              <article className="benefit-card" key={n}>
                <span className="card-number">{n} /</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="card-line" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container standard">
        <div className="standard-art" aria-hidden="true">
          <span>VFN</span>
          <div>
            NO SHORTCUTS.
            <br />
            JUST STANDARDS.
          </div>
        </div>
        <div>
          <p className="eyebrow">03 / THE VFN STANDARD</p>
          <h2>
            Substance
            <br />
            before noise.
          </h2>
          <p className="muted">
            Your trust should be earned through clarity, not big promises. Start
            with the approach, understand the process, and decide whether it
            fits you.
          </p>
          <ul className="check-list">
            <li>Individual goals before generic plans</li>
            <li>Consistent effort before quick fixes</li>
            <li>Honest conversations before guarantees</li>
          </ul>
          <Link href="/about" className="text-link">
            Meet the philosophy <Arrow />
          </Link>
        </div>
      </section>
      <ApplyCTA />
    </main>
  );
}
