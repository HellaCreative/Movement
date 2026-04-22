"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { tierFilters } from "@/lib/data";

import { useFilterMenu } from "@/components/stage/FilterMenuContext";
import { useHomeFilters } from "@/components/stage/HomeFiltersContext";

const MotionLink = motion(Link);

const NAV_ITEMS = [
  {
    href: "/",
    label: "Discover",
    match: (pathname: string) => pathname === "/",
  },
  {
    href: "/stage",
    label: "The Stage",
    match: (pathname: string) => pathname.startsWith("/stage"),
  },
  {
    href: "/collective",
    label: "The Collective",
    match: (pathname: string) => pathname.startsWith("/collective"),
  },
  {
    href: "/fund",
    label: "The Fund",
    match: (pathname: string) => pathname.startsWith("/fund"),
  },
] as const;

const linkHoverVariants = {
  rest: {},
  hover: {},
} as const;

const underlineHoverVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const dividerStyle = {
  width: "1px",
  height: "16px",
  background: "var(--border)",
  flexShrink: 0,
} as const;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { isOpen, toggle } = useFilterMenu();
  const {
    derivedGenres,
    activeGenre,
    locationQuery,
    activeTier,
  } = useHomeFilters();

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (activeGenre !== derivedGenres[0]) n += 1;
    if (locationQuery.trim() !== "") n += 1;
    if (activeTier !== tierFilters[0]) n += 1;
    return n;
  }, [activeGenre, activeTier, derivedGenres, locationQuery]);

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
        <motion.div
          initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }
          }
        >
          <Link className="nav-logo" href="/">
            Band as One
          </Link>
        </motion.div>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {NAV_ITEMS.map(({ href, label, match }) => {
              const active = match(pathname);
              return (
                <li key={href}>
                  <MotionLink
                    className={`nav-link${active ? " nav-link--active" : ""}`}
                    href={href}
                    style={{ position: "relative", display: "inline-block" }}
                    variants={linkHoverVariants}
                    initial="rest"
                    whileHover={active || reduce ? undefined : "hover"}
                  >
                    {label}
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="pointer-events-none absolute bottom-[-2px] left-0 right-0 h-[1px]"
                        style={{
                          backgroundColor: "var(--orange)",
                          transformOrigin: "left center",
                        }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.25, ease: "easeOut" }
                        }
                      />
                    ) : (
                      <motion.span
                        className="pointer-events-none absolute bottom-[-2px] left-0 h-[1px] w-full origin-left"
                        style={{ backgroundColor: "var(--orange)" }}
                        variants={underlineHoverVariants}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                  </MotionLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <span style={dividerStyle} aria-hidden />
        <button
          type="button"
          data-filter-trigger
          className="btn-ghost"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={() => toggle()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            position: "relative",
          }}
        >
          Filter
          {activeFilterCount > 0 ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "18px",
                height: "18px",
                padding: "0 5px",
                borderRadius: "9px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--white)",
                background: "var(--orange)",
              }}
              aria-hidden
            >
              ({activeFilterCount})
            </span>
          ) : null}
          <motion.span
            style={{ display: "inline-block", fontSize: "10px", lineHeight: 1 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }
            }
          >
            ▾
          </motion.span>
        </button>
        <span style={dividerStyle} aria-hidden />
      </div>

      <motion.div
        className="nav-actions"
        initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.4, delay: 0.1 }
        }
      >
        <Link className="btn-ghost" href="/sign-in">
          Sign in
        </Link>
        <Link className="btn-primary" href="/join">
          Join Free
        </Link>
      </motion.div>
    </header>
  );
}
