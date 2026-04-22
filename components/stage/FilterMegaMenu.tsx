"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import { tierFilters } from "@/lib/data";

import { useFilterMenu } from "./FilterMenuContext";
import { useHomeFilters } from "./HomeFiltersContext";

const LOCATION_SUGGESTIONS = [
  "Halifax",
  "Toronto",
  "Vancouver",
  "Calgary",
  "Nashville",
  "New York",
  "London",
  "Berlin",
  "Melbourne",
] as const;

const TIER_COPY: Record<string, { title: string; desc: string }> = {
  All: {
    title: "All",
    desc: "Show all tiers",
  },
  "Up & coming": {
    title: "Up & coming",
    desc: "New to the platform, momentum building",
  },
  "Ready to break": {
    title: "Ready to break",
    desc: "Claims accelerating fast",
  },
  Established: {
    title: "Established",
    desc: "Sustained high claim count",
  },
};

const chipBase: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  padding: "6px 10px",
  borderRadius: "20px",
  border: "0.5px solid var(--border)",
  background: "none",
  color: "var(--muted)",
  cursor: "pointer",
  textAlign: "center" as const,
};

function closeAfterSelect(
  setIsOpen: (v: boolean) => void,
  reduce: boolean | null,
) {
  window.setTimeout(() => setIsOpen(false), reduce ? 0 : 200);
}

export function FilterMegaMenu() {
  const [pulseGenre, setPulseGenre] = useState<string | null>(null);
  const { isOpen, setIsOpen } = useFilterMenu();
  const {
    derivedGenres,
    activeGenre,
    setActiveGenre,
    locationQuery,
    setLocationQuery,
    activeTier,
    setActiveTier,
  } = useHomeFilters();
  const reduce = useReducedMotion();

  const locationInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => {
      locationInputRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setPulseGenre(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-filter-trigger]")) return;
      if (panelRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isOpen, setIsOpen]);

  const defaultGenre = derivedGenres[0]!;
  const defaultTier = tierFilters[0];

  const summaryParts: string[] = [];
  if (activeGenre !== defaultGenre) summaryParts.push(activeGenre);
  if (locationQuery.trim()) summaryParts.push(locationQuery.trim());
  if (activeTier !== defaultTier) summaryParts.push(activeTier);
  const summaryText =
    summaryParts.length === 0
      ? "Showing all artists"
      : `Showing: ${summaryParts.join(" · ")}`;

  function clearAll() {
    setActiveGenre(defaultGenre);
    setLocationQuery("");
    setActiveTier(defaultTier);
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="filter-backdrop"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, transition: { duration: 0.15 } }
            }
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 149,
              background: "rgba(0,0,0,0.4)",
            }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            key="filter-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={
              reduce
                ? { y: 0, opacity: 1, scaleY: 1 }
                : {
                    y: -40,
                    opacity: 0,
                    scaleY: 0.92,
                  }
            }
            animate={{ y: 0, opacity: 1, scaleY: 1 }}
            exit={
              reduce
                ? { y: 0, opacity: 1, scaleY: 1 }
                : {
                    y: -20,
                    opacity: 0,
                    scaleY: 0.96,
                    transition: { duration: 0.2, ease: "easeIn" },
                  }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 280,
                    damping: 26,
                    mass: 0.8,
                  }
            }
            style={{
              position: "fixed",
              top: "52px",
              left: 0,
              right: 0,
              zIndex: 150,
              maxHeight: "400px",
              overflowY: "auto",
              background: "rgba(12,11,10,0.98)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderBottom: "0.5px solid var(--border)",
              padding: "32px 48px 40px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "48px",
              transformOrigin: "top center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--sub)",
                  marginBottom: "14px",
                }}
              >
                Genre
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                  gap: "8px",
                }}
              >
                {derivedGenres.map((g, genreIndex) => {
                  const active = activeGenre === g;
                  const isPulsing = pulseGenre === g;
                  return (
                    <motion.button
                      key={g}
                      type="button"
                      initial={
                        reduce
                          ? false
                          : { opacity: 0, y: 8, scale: 0.95 }
                      }
                      animate={
                        isPulsing
                          ? {
                              opacity: 1,
                              y: 0,
                              scale: [1, 1.08, 1],
                            }
                          : { opacity: 1, y: 0, scale: 1 }
                      }
                      transition={
                        reduce
                          ? { duration: 0 }
                          : isPulsing
                            ? { duration: 0.25 }
                            : {
                                type: "spring",
                                stiffness: 300,
                                damping: 22,
                                delay: 0.12 + genreIndex * 0.025,
                              }
                      }
                      onAnimationComplete={() => {
                        if (!isPulsing) return;
                        setPulseGenre(null);
                        setIsOpen(false);
                      }}
                      onClick={() => {
                        setActiveGenre(g);
                        if (reduce) {
                          closeAfterSelect(setIsOpen, reduce);
                          return;
                        }
                        setPulseGenre(g);
                      }}
                      style={{
                        ...chipBase,
                        position: "relative",
                        overflow: "hidden",
                        borderColor: active
                          ? "transparent"
                          : "var(--border)",
                        color: active ? "var(--orange)" : undefined,
                      }}
                      className={
                        active
                          ? undefined
                          : "hover:!border-[var(--border-hover)] hover:!text-[var(--white)]"
                      }
                    >
                      {active ? (
                        <motion.div
                          layout
                          layoutId="mega-genre-pill"
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "20px",
                            border: "0.5px solid var(--orange)",
                            background: "var(--orange-dim)",
                            zIndex: 0,
                          }}
                        />
                      ) : null}
                      <span style={{ position: "relative", zIndex: 1 }}>{g}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.08,
                    }
              }
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--sub)",
                  marginBottom: "14px",
                }}
              >
                Location
              </div>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  ref={locationInputRef}
                  type="search"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Search city or country..."
                  aria-label="Search location"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "4px",
                    padding: "10px 16px",
                    paddingRight: locationQuery ? "36px" : "16px",
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "var(--white)",
                    outline: "none",
                    transition: "border-color 150ms ease",
                  }}
                  className="focus:border-[var(--orange)] placeholder:text-[var(--sub)]"
                />
                {locationQuery ? (
                  <button
                    type="button"
                    aria-label="Clear location"
                    onClick={() => setLocationQuery("")}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      color: "var(--sub)",
                      cursor: "pointer",
                      fontSize: "18px",
                      lineHeight: 1,
                      padding: "0 4px",
                    }}
                  >
                    ×
                  </button>
                ) : null}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "12px",
                }}
              >
                {LOCATION_SUGGESTIONS.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setLocationQuery(city);
                      closeAfterSelect(setIsOpen, reduce);
                    }}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "var(--sub)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "16px",
                      padding: "4px 10px",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                    className="hover:!border-[var(--border-hover)] hover:!text-[var(--white)]"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </motion.div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--sub)",
                  marginBottom: "14px",
                }}
              >
                Tier
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {tierFilters.map((t, tierIndex) => {
                  const active = activeTier === t;
                  const copy = TIER_COPY[t] ?? {
                    title: t,
                    desc: "",
                  };
                  return (
                    <motion.div
                      key={t}
                      initial={
                        reduce
                          ? false
                          : { opacity: 0, y: 8, scale: 0.95 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 300,
                              damping: 22,
                              delay: 0.1 + tierIndex * 0.04,
                            }
                      }
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTier(t);
                          closeAfterSelect(setIsOpen, reduce);
                        }}
                        style={{
                          textAlign: "left",
                          width: "100%",
                          background: active ? "var(--orange-dim)" : "var(--surface)",
                          border: active
                            ? "0.5px solid var(--orange)"
                            : "0.5px solid var(--border)",
                          borderRadius: "2px",
                          padding: "10px 14px",
                          cursor: "pointer",
                        }}
                        className="hover:!border-[var(--border-hover)]"
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "14px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: "var(--white)",
                          }}
                        >
                          {copy.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "11px",
                            fontWeight: 300,
                            color: "var(--muted)",
                            marginTop: "2px",
                          }}
                        >
                          {copy.desc}
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                gridColumn: "1 / -1",
                paddingTop: "20px",
                borderTop: "0.5px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "var(--muted)",
                  flex: "1 1 200px",
                }}
              >
                {summaryText}
              </p>
              <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                <button
                  type="button"
                  className="btn-ghost"
                  style={{ fontSize: "12px", padding: "6px 14px" }}
                  onClick={() => {
                    clearAll();
                  }}
                >
                  Clear all
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ fontSize: "12px", padding: "6px 14px" }}
                  onClick={() => setIsOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
