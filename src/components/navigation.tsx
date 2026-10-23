"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Arrow } from "./brand";
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
          VFN<span>VELASQUEZ FITNESS & NUTRITION</span>
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
          className={`nav-links ${open ? "is-open" : ""}`}
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
        <Link href="/apply" className="header-cta">
          Apply for coaching <Arrow />
        </Link>
      </div>
    </header>
  );
}
