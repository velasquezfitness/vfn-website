"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Arrow, Mark } from "./brand";
const links = [
  ["/", "Home"],
  ["/coaching", "Coaching"],
  ["/about", "About"],
  ["/apply", "Apply"],
];
export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="VFN — Home"
          onClick={() => setOpen(false)}
        >
          <Mark />
          <span>
            VFN<span className="wordmark-caption">FITNESS & NUTRITION</span>
          </span>
        </Link>
        <button
          ref={button}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={open ? "nav-links is-open" : "nav-links"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              button.current?.focus();
            }
          }}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              <Arrow />
            </Link>
          ))}
        </nav>
        <Link className="button header-cta" href="/apply">
          Apply for coaching <Arrow />
        </Link>
      </div>
    </header>
  );
}
