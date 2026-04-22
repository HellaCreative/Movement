"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { tierFilters } from "@/lib/data";

import { useHomeFilters } from "./HomeFiltersContext";

const barStyle: CSSProperties = {
  position: "sticky",
  top: "52px",
  zIndex: 100,
  background: "rgba(12,11,10,0.96)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderBottom: "0.5px solid var(--border)",
  padding: "12px 48px",
};

const rowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "center",
  gap: "12px",
};

const labelStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--sub)",
  flexShrink: 0,
};

const chipBase: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  padding: "4px 12px",
  borderRadius: "20px",
  border: "0.5px solid var(--border)",
  background: "none",
  color: "var(--muted)",
  cursor: "pointer",
};

const dividerStyle: CSSProperties = {
  width: "1px",
  height: "16px",
  background: "var(--border)",
  flexShrink: 0,
  alignSelf: "center",
};

const inputBaseStyle: CSSProperties = {
  background: "var(--surface)",
  borderRadius: "20px",
  padding: "4px 16px",
  paddingRight: "28px",
  fontFamily: "var(--font-body)",
  fontSize: "12px",
  color: "var(--white)",
  width: "180px",
  outline: "none",
};

const dropdownPanelStyle: CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  marginTop: "8px",
  zIndex: 200,
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  padding: "12px",
  background: "rgba(12,11,10,0.96)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "0.5px solid var(--border)",
  borderRadius: "2px",
  minWidth: "200px",
  maxWidth: "min(480px, 90vw)",
};

function GenreFilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{
        ...chipBase,
        position: "relative",
        overflow: "hidden",
        ...(active
          ? {
              borderColor: "transparent",
              color: "var(--orange)",
            }
          : {}),
      }}
      className={
        active
          ? undefined
          : "hover:!border-[var(--border-hover)] hover:!text-[var(--white)]"
      }
      transition={
        reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }
      }
    >
      {active ? (
        <motion.div
          layout
          layoutId="genre-filter-pill"
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
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}

function TierFilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{
        ...chipBase,
        position: "relative",
        overflow: "hidden",
        ...(active
          ? {
              borderColor: "transparent",
              color: "var(--orange)",
            }
          : {}),
      }}
      className={
        active
          ? undefined
          : "hover:!border-[var(--border-hover)] hover:!text-[var(--white)]"
      }
      transition={
        reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }
      }
    >
      {active ? (
        <motion.div
          layout
          layoutId="tier-filter-pill"
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
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}

export function GlobalFilterBar() {
  const {
    derivedGenres,
    activeGenre,
    setActiveGenre,
    locationQuery,
    setLocationQuery,
    activeTier,
    setActiveTier,
  } = useHomeFilters();

  const [moreOpen, setMoreOpen] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const genreRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { staggerVariants, chipChildVariants } = useMemo(() => {
    if (reduce) {
      return {
        staggerVariants: {
          show: { transition: { duration: 0 } },
        },
        chipChildVariants: {
          hidden: { opacity: 1, scale: 1 },
          show: { opacity: 1, scale: 1, transition: { duration: 0 } },
        },
      };
    }
    return {
      staggerVariants: {
        show: {
          transition: { staggerChildren: 0.03 },
        },
      },
      chipChildVariants: {
        hidden: { opacity: 0, scale: 0.9 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring" as const, stiffness: 200, damping: 20 },
        },
      },
    };
  }, [reduce]);

  const mainVisible = derivedGenres.slice(0, 6);
  const overflow = derivedGenres.slice(6);
  const hasOverflow = overflow.length > 0;
  const moreActive =
    moreOpen || overflow.some((g) => g === activeGenre);

  useEffect(() => {
    if (!moreOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (
        genreRef.current &&
        !genreRef.current.contains(e.target as Node)
      ) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [moreOpen]);

  return (
    <div style={barStyle}>
      <div style={rowStyle}>
        <div
          ref={genreRef}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <span style={labelStyle}>Genre</span>
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={staggerVariants}
          >
            {mainVisible.map((g) => (
              <motion.div key={g} variants={chipChildVariants}>
                <GenreFilterChip
                  active={activeGenre === g}
                  onClick={() => {
                    setActiveGenre(g);
                    setMoreOpen(false);
                  }}
                >
                  {g}
                </GenreFilterChip>
              </motion.div>
            ))}
            {hasOverflow ? (
              <motion.div variants={chipChildVariants}>
                <GenreFilterChip
                  active={moreActive}
                  onClick={() => setMoreOpen((o) => !o)}
                >
                  + More
                </GenreFilterChip>
              </motion.div>
            ) : null}
          </motion.div>

          {moreOpen && hasOverflow ? (
            <div style={dropdownPanelStyle} role="listbox">
              {overflow.map((g) => (
                <GenreFilterChip
                  key={g}
                  active={activeGenre === g}
                  onClick={() => {
                    setActiveGenre(g);
                    setMoreOpen(false);
                  }}
                >
                  {g}
                </GenreFilterChip>
              ))}
            </div>
          ) : null}
        </div>

        <span style={dividerStyle} aria-hidden />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <span style={labelStyle}>Location</span>
          <div style={{ position: "relative", width: "180px" }}>
            <input
              type="search"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onFocus={() => setLocationFocused(true)}
              onBlur={() => setLocationFocused(false)}
              placeholder="Search city or country..."
              aria-label="Search location"
              style={{
                ...inputBaseStyle,
                border: locationFocused
                  ? "0.5px solid var(--border-hover)"
                  : "0.5px solid var(--border)",
              }}
              className="placeholder:text-[var(--sub)]"
            />
            {locationQuery ? (
              <button
                type="button"
                aria-label="Clear location search"
                onClick={() => setLocationQuery("")}
                style={{
                  position: "absolute",
                  right: "6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "2px 6px",
                  border: "none",
                  background: "transparent",
                  color: "var(--sub)",
                  cursor: "pointer",
                  fontSize: "16px",
                  lineHeight: 1,
                }}
                className="hover:!text-[var(--white)]"
              >
                ×
              </button>
            ) : null}
          </div>
        </div>

        <span style={dividerStyle} aria-hidden />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <span style={labelStyle}>Tier</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {tierFilters.map((t) => (
              <TierFilterChip
                key={t}
                active={activeTier === t}
                onClick={() => setActiveTier(t)}
              >
                {t}
              </TierFilterChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
