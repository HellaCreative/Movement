"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { tierFilters } from "@/lib/data";

import { useFilterMenu } from "./FilterMenuContext";
import { useHomeFilters } from "./HomeFiltersContext";
import { ActiveFilterPills } from "./ActiveFilterPills";

export function DiscoveryBar() {
  const [stuck, setStuck] = useState(false);
  const { isOpen, toggle } = useFilterMenu();
  const {
    derivedGenres,
    activeGenre,
    locationQuery,
    activeTier,
    searchQuery,
    setSearchQuery,
  } = useHomeFilters();
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = document.getElementById("hero-sentinel");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting);
      },
      { threshold: 0, root: null },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (activeGenre !== derivedGenres[0]) n += 1;
    if (locationQuery.trim() !== "") n += 1;
    if (activeTier !== tierFilters[0]) n += 1;
    return n;
  }, [activeGenre, activeTier, derivedGenres, locationQuery]);

  return (
    <div
      className={stuck ? "is-sticky" : undefined}
      style={{
        position: "sticky",
        top: "52px",
        zIndex: 90,
        minHeight: "56px",
        background: "rgba(12,11,10,0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "0.5px solid var(--border)",
        padding: "0 48px",
        boxShadow: stuck ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
        transition: "box-shadow 300ms ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          minHeight: "56px",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            maxWidth: "480px",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              pointerEvents: "none",
              color: "var(--sub)",
            }}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <title>Search</title>
              <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
                fill="currentColor"
              />
              <path
                d="M15.446 15.854 20.2 20.6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artists, genres, cities..."
            aria-label="Search artists, genres, cities"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--orange)";
              e.currentTarget.style.background = "var(--surface-2)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "var(--surface)";
            }}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "20px",
              padding: "8px 16px 8px 38px",
              paddingRight: searchQuery ? "38px" : "16px",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--white)",
              outline: "none",
              transition:
                "border-color 200ms var(--ease), background 200ms var(--ease)",
            }}
            className="placeholder:text-[var(--sub)]"
          />
          {searchQuery ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "var(--sub)",
                cursor: "pointer",
                padding: "0 4px",
                lineHeight: 1,
              }}
              className="hover:!text-[var(--white)]"
            >
              ×
            </button>
          ) : null}
        </div>

        <motion.button
          type="button"
          data-filter-trigger
          className="btn-ghost"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={() => toggle()}
          whileHover={reduce ? undefined : { scale: 1.02 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            position: "relative",
            flexShrink: 0,
            background: isOpen ? "var(--orange-dim)" : undefined,
            borderColor: isOpen ? "var(--orange-mid)" : undefined,
            transition: "background 200ms ease, border-color 200ms ease",
          }}
        >
          Filters
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
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 20 }
            }
          >
            ▾
          </motion.span>
        </motion.button>
      </div>

      <ActiveFilterPills variant="embedded" />
    </div>
  );
}
