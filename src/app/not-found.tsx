import Link from "next/link";
import { Arrow } from "@/components/brand";
export default function NotFound() {
  return (
    <main id="main" className="container page-intro">
      <p className="eyebrow">404 / OFF THE PATH</p>
      <h1>
        Reset.
        <br />
        <span className="yellow">Refocus.</span>
      </h1>
      <p className="intro-copy">
        This page doesn’t exist. Let’s get you back to the starting point.
      </p>
      <Link className="button" href="/">
        Back to home <Arrow />
      </Link>
    </main>
  );
}
