"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "The Stage", match: (pathname: string) => pathname === "/" || pathname.startsWith("/artist") },
  { href: "/vault", label: "The Vault", match: (pathname: string) => pathname.startsWith("/vault") },
  { href: "/collective", label: "The Collective", match: (pathname: string) => pathname.startsWith("/collective") },
  { href: "/fund", label: "The Fund", match: (pathname: string) => pathname.startsWith("/fund") },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`nav-root${scrolled ? " nav-root--scrolled" : ""}`}
    >
      <div className="nav-brand">
        <Link className="nav-logo" href="/">
          Band as One
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {NAV_ITEMS.map(({ href, label, match }) => (
              <li key={href}>
                <Link
                  className={`nav-link${match(pathname) ? " nav-link--active" : ""}`}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="nav-actions">
        <a className="btn-ghost" href="#">
          Sign in
        </a>
        <a className="btn-primary" href="#">
          Join Free
        </a>
      </div>
    </header>
  );
}
