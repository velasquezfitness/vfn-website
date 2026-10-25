import Link from "next/link";
import { Emblem } from "./emblem";
import { Arrow } from "./brand";
export function ApplyCTA() {
  return (
    <section className="closing-section">
      <div className="container closing-inner">
        <p className="eyebrow">YOUR NEXT CHAPTER</p>
        <h2>
          Built around you.
          <br />
          <em>Designed for progress.</em>
        </h2>
        <div className="closing-bottom">
          <p>
            A thoughtful approach to training.
            <br />A conversation about what comes next.
          </p>
          <Link className="button" href="/apply">
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
        <Link href="/" className="footer-brand" aria-label="VFN — Home">
          <Emblem placement="footer" />
        </Link>
        <p className="footer-philosophy">1% Better Everyday.</p>
        <nav aria-label="Footer navigation">
          <Link href="/coaching">Coaching</Link>
          <Link href="/about">About</Link>
          <Link href="/apply">Apply</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Velasquez Fitness & Nutrition</span>
        <span>INDIVIDUAL BY DESIGN.</span>
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
        <em>{accent}</em>
      </h1>
      <p className="intro-copy">{description}</p>
    </section>
  );
}
