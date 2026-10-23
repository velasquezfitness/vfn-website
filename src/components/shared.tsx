import Link from "next/link";
import { Arrow, Mark } from "./brand";
export function ApplyCTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">THE NEXT REP IS YOURS</p>
          <h2>
            Make better
            <br />
            your standard.
          </h2>
        </div>
        <div>
          <p>
            You don’t need a perfect starting point.
            <br />
            You need a decision to move forward.
          </p>
          <Link className="button button-dark" href="/apply">
            Apply for coaching <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link href="/" className="wordmark" aria-label="VFN — Home">
          <Mark />
          <span>
            VFN<span className="wordmark-caption">FITNESS & NUTRITION</span>
          </span>
        </Link>
        <p>
          Quiet focus. Relentless intent.
          <br />
          <span className="muted">1% Better Everyday.</span>
        </p>
        <nav aria-label="Footer navigation">
          <Link href="/coaching">
            Coaching <Arrow />
          </Link>
          <Link href="/about">
            About VFN <Arrow />
          </Link>
          <Link href="/apply">
            Apply for coaching <Arrow />
          </Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Velasquez Fitness & Nutrition</span>
        <span>BUILT ON INTENTION. NOT HYPE.</span>
      </div>
    </footer>
  );
}
export function PageIntro({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">{label}</p>
      <h1>
        {title}
        <br />
        <span className="yellow">{accent}</span>
      </h1>
      <p className="intro-copy">{description}</p>
    </section>
  );
}
