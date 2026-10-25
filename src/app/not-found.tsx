import Link from "next/link";
import { Arrow } from "@/components/brand";
export default function NotFound() {
  return (
    <main id="main" className="container page-intro">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>
        A different
        <br />
        <em>starting point.</em>
      </h1>
      <p className="intro-copy">The page you’re looking for isn’t here.</p>
      <Link className="button" href="/">
        Back to home <Arrow />
      </Link>
    </main>
  );
}
