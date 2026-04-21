"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { artists, getArtistPortrait } from "@/lib/data";

import { ArtistAvatar } from "@/components/stage/ArtistAvatar";

/** Six muted dark swatches derived from --surface-2 family (#1c1a17); no orange. */
const ARTIST_SWATCHES: readonly string[] = [
  "#1a1816",
  "#1f1d1a",
  "#23211e",
  "#252220",
  "#201c19",
  "#2a2623",
];

const AUTO_SCROLL_MS = 60_000;

const stripStyle: CSSProperties = {
  height: "64px",
  backgroundColor: "var(--surface)",
  borderBottom: "var(--border-width) solid var(--border)",
  overflow: "hidden",
};

/** No gap between duplicate copies — loop length equals first copy width. Card gaps live inside each copy. */
const scrollRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: "100%",
  overflowX: "auto",
  overflowY: "hidden",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  cursor: "grab",
  WebkitOverflowScrolling: "touch",
};

const copyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "4px",
  flexShrink: 0,
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0] ?? "";
    const b = parts[1][0] ?? "";
    return `${a}${b}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function TickerStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const copyWidthRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  /** True while cursor is over the strip (pause auto-scroll on hover). */
  const hoverStripRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const rafStoppedRef = useRef(false);

  const [dragging, setDragging] = useState(false);

  const measureCopy = useCallback(() => {
    const el = firstCopyRef.current;
    if (!el) return;
    copyWidthRef.current = el.offsetWidth;
  }, []);

  useLayoutEffect(() => {
    measureCopy();
  }, [measureCopy]);

  useEffect(() => {
    const el = firstCopyRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measureCopy());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureCopy]);

  useEffect(() => {
    rafStoppedRef.current = false;
    lastTickRef.current = null;

    const tick = (now: number) => {
      if (rafStoppedRef.current) return;

      const sc = scrollRef.current;
      const cw = copyWidthRef.current;
      if (lastTickRef.current === null) lastTickRef.current = now;
      const dt = now - lastTickRef.current;
      lastTickRef.current = now;

      if (sc && cw > 0 && !hoverStripRef.current && !draggingRef.current) {
        sc.scrollLeft += (cw / AUTO_SCROLL_MS) * dt;
        if (sc.scrollLeft >= cw - 0.5) {
          sc.scrollLeft -= cw;
        }
      }

      if (!rafStoppedRef.current) {
        requestAnimationFrame(tick);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => {
      rafStoppedRef.current = true;
      cancelAnimationFrame(id);
    };
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const sc = scrollRef.current;
    if (!sc) return;
    const dx = e.clientX - dragStartXRef.current;
    sc.scrollLeft = dragStartScrollRef.current - dx;
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) {
      draggingRef.current = false;
      setDragging(false);
      const sc = scrollRef.current;
      const cw = copyWidthRef.current;
      if (sc && cw > 0) {
        while (sc.scrollLeft >= cw) sc.scrollLeft -= cw;
        while (sc.scrollLeft < 0) sc.scrollLeft += cw;
      }
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const onMouseEnterStrip = useCallback(() => {
    hoverStripRef.current = true;
  }, []);

  const onMouseLeaveStrip = useCallback(() => {
    hoverStripRef.current = false;
  }, []);

  const cursorStyle: CSSProperties = dragging
    ? { ...scrollRowStyle, cursor: "grabbing", userSelect: "none" }
    : scrollRowStyle;

  return (
    <div
      style={stripStyle}
      onMouseEnter={onMouseEnterStrip}
      onMouseLeave={onMouseLeaveStrip}
      role="region"
      aria-label="Artists on the move"
    >
      <div
        ref={scrollRef}
        className="[&::-webkit-scrollbar]:hidden"
        style={cursorStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={firstCopyRef} style={copyStyle}>
          {artists.map((artist, i) => (
            <ArtistCard
              key={artist.slug}
              artist={artist}
              portraitSrc={getArtistPortrait(artist.slug)}
              swatch={ARTIST_SWATCHES[i % ARTIST_SWATCHES.length]!}
            />
          ))}
        </div>
        <div style={copyStyle} aria-hidden>
          {artists.map((artist, i) => (
            <ArtistCard
              key={`dup-${artist.slug}`}
              artist={artist}
              portraitSrc={getArtistPortrait(artist.slug)}
              swatch={ARTIST_SWATCHES[i % ARTIST_SWATCHES.length]!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtistCard({
  artist,
  portraitSrc,
  swatch,
}: {
  artist: (typeof artists)[number];
  portraitSrc?: string;
  swatch: string;
}) {
  const [hover, setHover] = useState(false);

  const cardOuter: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
    gap: "10px",
    padding: "8px 16px 8px 8px",
    borderRadius: "var(--radius)",
    cursor: "pointer",
    backgroundColor: hover ? "rgba(255, 255, 255, 0.05)" : "transparent",
    transition:
      "background-color var(--duration-hover) var(--ease)",
  };

  const textCol: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: 0,
    maxWidth: "240px",
  };

  const nameLine: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "14px",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "var(--white)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const pulseLine: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "12px",
    fontWeight: 300,
    color: "var(--muted)",
    textTransform: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <div
      style={cardOuter}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ArtistAvatar
        name={artist.name}
        portraitSrc={portraitSrc}
        swatch={swatch}
        initials={initialsFromName(artist.name)}
        sizePx={40}
        initialsSizePx={14}
      />
      <div style={textCol}>
        <span style={nameLine}>{artist.name}</span>
        <span style={pulseLine}>{artist.pulseActivity}</span>
      </div>
    </div>
  );
}
