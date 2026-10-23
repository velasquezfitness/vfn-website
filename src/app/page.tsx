import Link from "next/link";
import { Arrow } from "@/components/brand";
import { BrandPhoto } from "@/components/brand-photo";
import { ApplyCTA } from "@/components/shared";
import { founder, method } from "@/content/site";
export default function Home() {
  return (
    <main id="main">
      <section className="editorial-hero">
        <BrandPhoto
          kind="kettlebells"
          priority
          className="hero-photo"
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">THE 1% METHOD™</p>
            <h1>
              Self-Mastery is
              <br />
              the destination.
            </h1>
            <p className="hero-subtitle">
              1% Better Every Day
              <br />
              is the process.
            </p>
            <div className="hero-actions">
              <Link href="/apply" className="button">
                Apply for coaching <Arrow />
              </Link>
              <a href="#method" className="text-link">
                Explore the method <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-footnote">
            <span>SEBASTIAN VELASQUEZ / PERSONAL COACHING</span>
            <span>STRENGTH. PERFORMANCE. SELF-MASTERY.</span>
          </div>
        </div>
      </section>
      <section className="section container belief">
        <p className="eyebrow section-label">01 / THE BELIEF</p>
        <div>
          <h2>
            Progress is built through
            <br />
            <em>what you choose to repeat.</em>
          </h2>
          <div className="belief-copy">
            <p>
              Meaningful change starts with understanding the individual. Your
              experience, your circumstances, and the goals that matter to you.
            </p>
            <p>
              VFN brings structure to that starting point: deliberate training,
              personal accountability, and the space to keep improving.
            </p>
          </div>
        </div>
      </section>
      <section id="method" className="method-section">
        <div className="method-visual">
          <BrandPhoto kind="panther" />
          <div className="method-image-caption">
            <span>
              QUIET CONFIDENCE.
              <br />
              DELIBERATE ACTION.
            </span>
            <span>THE VFN PHILOSOPHY</span>
          </div>
        </div>
        <div className="method-content">
          <p className="eyebrow">02 / THE 1% METHOD</p>
          <h2>
            A process.
            <br />
            <em>Not a shortcut.</em>
          </h2>
          <p className="section-description">
            Five stages. One individual. A framework for turning effort into
            intentional, lasting development.
          </p>
          <ol className="method-list">
            {method.map((stage, i) => (
              <li key={stage.name}>
                <span className="index">0{i + 1}</span>
                <div>
                  <h3>{stage.name}</h3>
                  <p>{stage.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section container results">
        <div className="section-heading">
          <p className="eyebrow">03 / THE WORK, IN PRACTICE</p>
          <h2>
            Progress has
            <br />
            <em>a personal definition.</em>
          </h2>
        </div>
        <div className="results-placeholder">
          <span className="eyebrow">CLIENT JOURNAL / FORTHCOMING</span>
          <p>
            A space for real stories.
            <br />
            <em>Shared with permission.</em>
          </p>
          <div>
            <span>
              Approved client results and stories have not yet been supplied.
            </span>
            <span>
              No testimonials or performance claims are represented here.
            </span>
          </div>
        </div>
      </section>
      <section className="practice-section">
        <div className="container practice-inner">
          <div>
            <p className="eyebrow">04 / THE PRACTICE</p>
            <h2>
              Personal coaching.
              <br />
              <em>In every sense.</em>
            </h2>
            <Link href="/coaching" className="text-link">
              Explore coaching <Arrow />
            </Link>
          </div>
          <div className="practice-list">
            <article>
              <span className="index">I.</span>
              <div>
                <h3>A plan with purpose.</h3>
                <p>
                  Personalized programming that connects your training to your
                  goals, available time, and experience.
                </p>
              </div>
            </article>
            <article>
              <span className="index">II.</span>
              <div>
                <h3>A clear perspective.</h3>
                <p>
                  Structured accountability, progress tracking, and ongoing
                  communication with your coach.
                </p>
              </div>
            </article>
            <article>
              <span className="index">III.</span>
              <div>
                <h3>Room to evolve.</h3>
                <p>
                  Thoughtful program adjustments as your strength, performance,
                  and circumstances develop.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section container founder-section">
        <BrandPhoto kind="portrait" />
        <div className="founder-copy">
          <p className="eyebrow">05 / MEET THE FOUNDER</p>
          <h2>
            Serious about training.
            <br />
            <em>Personal about coaching.</em>
          </h2>
          <p className="founder-name">
            {founder.name}
            <span>FOUNDER & COACH</span>
          </p>
          <p>{founder.biography}</p>
          <Link href="/about" className="text-link">
            Meet your coach <Arrow />
          </Link>
        </div>
      </section>
      <ApplyCTA />
    </main>
  );
}
