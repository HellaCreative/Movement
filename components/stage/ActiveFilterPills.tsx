"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

import { tierFilters } from "@/lib/data";

import { useHomeFilters } from "./HomeFiltersContext";

const wrapStyleDefault: CSSProperties = {
  padding: "12px 48px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "8px",
};

const wrapStyleEmbedded: CSSProperties = {
  padding: "12px 0 0",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "8px",
};

const pillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--orange)",
  background: "var(--orange-dim)",
  border: "0.5px solid var(--orange-mid)",
  borderRadius: "20px",
  padding: "3px 10px",
};

const clearLinkStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  textTransform: "uppercase",
  color: "var(--sub)",
  background: "none",
  border: "none",
  cursor: "pointer",
  textDecoration: "underline",
  padding: "0 4px",
};

type ActiveFilterPillsProps = {
  variant?: "default" | "embedded";
};

export function ActiveFilterPills({
  variant = "default",
}: ActiveFilterPillsProps) {
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

  const defaultGenre = derivedGenres[0]!;
  const defaultTier = tierFilters[0];

  type Pill = { id: string; label: string; onRemove: () => void };
  const pills: Pill[] = [];

  if (activeGenre !== defaultGenre) {
    pills.push({
      id: "genre",
      label: activeGenre,
      onRemove: () => setActiveGenre(defaultGenre),
    });
  }
  if (locationQuery.trim()) {
    pills.push({
      id: "location",
      label: locationQuery.trim(),
      onRemove: () => setLocationQuery(""),
    });
  }
  if (activeTier !== defaultTier) {
    pills.push({
      id: "tier",
      label: activeTier,
      onRemove: () => setActiveTier(defaultTier),
    });
  }

  if (pills.length === 0) return null;

  const wrapStyle =
    variant === "embedded" ? wrapStyleEmbedded : wrapStyleDefault;

  return (
    <div style={wrapStyle}>
      <AnimatePresence mode="popLayout">
        {pills.map((pill) => (
          <motion.div
            key={pill.id}
            layout
            initial={
              reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 400, damping: 28 }
            }
            style={pillStyle}
          >
            <span>{pill.label}</span>
            <button
              type="button"
              aria-label={`Remove ${pill.label}`}
              onClick={pill.onRemove}
              style={{
                border: "none",
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
                fontSize: "12px",
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      {pills.length > 1 ? (
        <button
          type="button"
          style={clearLinkStyle}
          className="hover:!text-[var(--orange)]"
          onClick={() => {
            setActiveGenre(defaultGenre);
            setLocationQuery("");
            setActiveTier(defaultTier);
          }}
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}
