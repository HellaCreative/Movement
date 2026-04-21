"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import {
  artistPortraitBySlug,
  artists,
  platformStatsHero,
  stageHeroCopy,
} from "@/lib/data";

const HERO_SUBTEXT =
  "The show ends. The connection doesn't. Band as One is where artists own the room — and fans finally belong to it.";

const CAROUSEL_MS = 5000;
const FADE_MS = 800;

const sectionStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "600px",
  overflow: "hidden",
  borderBottom: "var(--border-default)",
  /** Base layer so we never flash white before images or overlays paint. */
  backgroundColor: "var(--black)",
};

const bgLayerStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  transition: `opacity ${FADE_MS}ms ease-in-out`,
  /** Avoid bright/empty frames while `next/image` decodes. */
  backgroundColor: "var(--surface-2)",
};

const bgFallbackStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundColor: "var(--surface-2)",
};

const overlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
  background: `
    linear-gradient(to right, rgba(12,11,10,0.92) 0%, rgba(12,11,10,0.75) 40%, rgba(12,11,10,0.2) 65%, transparent 100%),
    linear-gradient(to top, rgba(12,11,10,0.85) 0%, transparent 45%)
  `,
};

/**
 * Use inset (not padding) so absolutely positioned zones honor the same margins —
 * padding does not inset `position: absolute` children.
 */
const contentShellStyle: CSSProperties = {
  position: "absolute",
  top: "56px",
  right: "48px",
  bottom: "48px",
  left: "48px",
  zIndex: 2,
  boxSizing: "border-box",
  pointerEvents: "none",
};

/** Inset within content shell (shell inset 56px 48px 48px 48px). */
const leftZoneStyle: CSSProperties = {
  position: "absolute",
  left: "0",
  bottom: "0",
  maxWidth: "560px",
  pointerEvents: "auto",
};

const rightZoneStyle: CSSProperties = {
  position: "absolute",
  right: "0",
  bottom: "0",
  textAlign: "right",
  maxWidth: "min(360px, 42vw)",
  pointerEvents: "auto",
  background: "rgba(12,11,10,0.55)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(242,237,232,0.14)",
  borderRadius: "4px",
  padding: "18px 22px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
};

const eyebrowRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "calc(var(--space-base) * 1.25)",
  marginBottom: "calc(var(--space-base) * 2)",
};

const eyebrowTextStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-eyebrow)",
  fontWeight: 500,
  letterSpacing: "var(--tracking-eyebrow)",
  textTransform: "uppercase",
  color: "var(--orange)",
};

const eyebrowRuleStyle: CSSProperties = {
  display: "inline-block",
  width: "var(--eyebrow-rule-width)",
  height: "var(--eyebrow-rule-height)",
  backgroundColor: "var(--orange)",
  opacity: "var(--eyebrow-rule-opacity)",
  flexShrink: 0,
};

const headlineBase: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-hero)",
  fontWeight: 800,
  textTransform: "uppercase",
  lineHeight: "var(--leading-hero-block)",
  margin: 0,
};

const headlineLine1Style: CSSProperties = {
  ...headlineBase,
  display: "block",
  color: "var(--white)",
};

const headlineLine2Style: CSSProperties = {
  ...headlineBase,
  display: "block",
  color: "var(--orange)",
  fontStyle: "italic",
};

const subtextStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-subhero)",
  fontWeight: 300,
  color: "var(--muted)",
  lineHeight: "var(--leading-body)",
  marginTop: "calc(var(--space-base) * 2)",
  marginBottom: 0,
};

const statsRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "var(--gap-hero-stats)",
  paddingTop: "var(--stats-row-padding-top)",
  borderTop: "var(--border-default)",
  marginTop: "calc(var(--space-base) * 3)",
};

const statBlockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const statNumberStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "28px",
  lineHeight: "1",
  display: "block",
  fontWeight: 700,
  color: "var(--orange)",
};

const statLabelStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-ui-label-min)",
  fontWeight: 400,
  letterSpacing: "var(--tracking-ui-label)",
  textTransform: "uppercase",
  color: "var(--sub)",
  marginTop: "4px",
  lineHeight: "var(--leading-stat-label)",
};

const ctaRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "var(--gap-hero-ctas)",
  marginTop: "calc(var(--space-base) * 3)",
};

const featuredTagTextStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-featured-tag)",
  fontWeight: 500,
  letterSpacing: "var(--tracking-ui-label)",
  textTransform: "uppercase",
  color: "var(--orange)",
  marginBottom: "10px",
};

const rightNameStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "32px",
  fontWeight: 800,
  textTransform: "uppercase",
  color: "var(--white)",
  lineHeight: 1.1,
  margin: 0,
};

const rightGenreStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-genre-city-max)",
  fontWeight: 400,
  letterSpacing: "var(--tracking-ui-label)",
  textTransform: "uppercase",
  color: "var(--orange)",
  marginTop: "8px",
};

const rightPulseStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  fontWeight: 400,
  color: "var(--muted)",
  lineHeight: "var(--leading-body)",
  marginTop: "10px",
  marginBottom: 0,
};

const followBtnOverrides: CSSProperties = {
  fontSize: "var(--text-follow-sm)",
  padding: "var(--padding-follow-sm-y) var(--padding-follow-sm-x)",
  marginTop: "14px",
};

export function StageHero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const featured = artists[slideIndex]!;
  const featuredPortrait = artistPortraitBySlug[featured.slug];

  useEffect(() => {
    if (carouselPaused) return;
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % artists.length);
    }, CAROUSEL_MS);
    return () => window.clearInterval(id);
  }, [carouselPaused]);

  return (
    <section
      style={sectionStyle}
      aria-labelledby="stage-hero-heading"
      onMouseEnter={() => setCarouselPaused(true)}
      onMouseLeave={() => setCarouselPaused(false)}
    >
      {artists.map((artist, i) => {
        const portrait = artistPortraitBySlug[artist.slug];
        const active = i === slideIndex;
        return (
          <div
            key={artist.slug}
            style={{
              ...bgLayerStyle,
              opacity: active ? 1 : 0,
              pointerEvents: "none",
            }}
            aria-hidden={!active}
          >
            {portrait ? (
              <Image
                src={portrait}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                quality={85}
                priority={i === 0}
              />
            ) : (
              <div style={bgFallbackStyle} aria-hidden />
            )}
          </div>
        );
      })}

      <div style={overlayStyle} aria-hidden />

      <div style={contentShellStyle}>
        <div style={leftZoneStyle}>
          <div style={eyebrowRowStyle}>
            <span style={eyebrowTextStyle}>{stageHeroCopy.eyebrow}</span>
            <span style={eyebrowRuleStyle} aria-hidden />
          </div>

          <h1 id="stage-hero-heading" style={{ margin: 0 }}>
            <span style={headlineLine1Style}>{stageHeroCopy.headlineLine1}</span>
            <span style={headlineLine2Style}>{stageHeroCopy.headlineLine2}</span>
          </h1>

          <p style={subtextStyle}>{HERO_SUBTEXT}</p>

          <div style={statsRowStyle}>
            {platformStatsHero.map((stat) => (
              <div key={stat.label} style={statBlockStyle}>
                <span style={statNumberStyle}>{stat.value}</span>
                <span style={statLabelStyle}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div style={ctaRowStyle}>
            <a className="btn-primary" href="#">
              {stageHeroCopy.primaryCta}
            </a>
            <a className="btn-ghost" href="#">
              {stageHeroCopy.secondaryCta}
            </a>
          </div>
        </div>

        <div style={rightZoneStyle}>
          <div style={featuredTagTextStyle}>{stageHeroCopy.featuredArtistTag}</div>
          <h2 style={rightNameStyle}>{featured.name}</h2>
          <p style={rightGenreStyle}>
            {featured.genre} · {featured.city}
          </p>
          <p style={rightPulseStyle}>{featured.pulseActivity}</p>
          <a className="btn-ghost" style={followBtnOverrides} href="#">
            Follow
          </a>
        </div>
      </div>
    </section>
  );
}
