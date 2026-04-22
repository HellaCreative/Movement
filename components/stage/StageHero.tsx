"use client";

import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import {
  artistPortraitBySlug,
  artists,
  formatHypeCoinsUsdShort,
  platformStats,
  platformStatsHero,
  stageHeroCopy,
} from "@/lib/data";

const CAROUSEL_MS = 5000;
const FADE_MS = 800;

const BAND_HEADLINE = "BAND.";

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
    linear-gradient(to right, rgba(12,11,10,0.96) 0%, rgba(12,11,10,0.92) 30%, rgba(12,11,10,0.6) 55%, rgba(12,11,10,0.1) 80%, transparent 100%),
    linear-gradient(to top, rgba(12,11,10,0.9) 0%, rgba(12,11,10,0.4) 30%, transparent 60%)
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
  maxWidth: "640px",
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

/** Line 1 — eyebrow */
const heroEyebrowStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--orange)",
  marginBottom: "12px",
  marginTop: 0,
};

/** Line 2 — dominant name */
const heroBrandStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "220px",
  fontWeight: 800,
  fontStyle: "italic",
  color: "var(--orange)",
  lineHeight: 0.85,
  marginBottom: "8px",
  marginTop: 0,
};

/** Line 3 — supporting line */
const heroSupportingStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "44px",
  fontWeight: 700,
  textTransform: "uppercase",
  color: "var(--white)",
  lineHeight: 1,
  marginBottom: 0,
  marginTop: 0,
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
  flexDirection: "row",
  flexWrap: "nowrap",
  gap: "32px",
  paddingTop: "24px",
  borderTop: "0.5px solid var(--border)",
  marginTop: "calc(var(--space-base) * 3)",
  width: "100%",
};

const statBlockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flexShrink: 0,
};

const statNumberStyle: CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: 1,
  display: "block",
  color: "var(--orange)",
  fontFamily: "var(--font-display)",
  textShadow: "0 1px 8px rgba(12,11,10,0.6)",
};

const statLabelStyle: CSSProperties = {
  fontSize: "9px",
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--muted)",
  marginTop: "4px",
  display: "block",
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

const STAT_TARGETS = [
  platformStats.artistsOnStage,
  80,
  platformStats.hypeCoinsInCirculation / 1_000_000,
] as const;

function formatStatText(index: number, value: number): string {
  if (index === 0) return Math.round(value).toLocaleString("en-US");
  if (index === 1) return `${Math.round(value)}%`;
  return formatHypeCoinsUsdShort(value * 1_000_000);
}

function HeroStatBlock({
  statIndex,
  label,
}: {
  statIndex: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const finalText = platformStatsHero[statIndex]!.value;
  const [display, setDisplay] = useState(() =>
    reduce ? finalText : "0",
  );

  useEffect(() => {
    if (reduce) {
      setDisplay(finalText);
      return;
    }
    if (!inView) return;

    const target = STAT_TARGETS[statIndex]!;
    const controls = animate(0, 1, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (progress) => {
        const v = progress * target;
        setDisplay(formatStatText(statIndex, v));
      },
    });

    return () => controls.stop();
  }, [inView, reduce, statIndex, finalText]);

  return (
    <motion.div
      ref={ref}
      style={statBlockStyle}
      initial={
        reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.4,
              delay: 0.9 + statIndex * 0.1,
              ease: "easeOut",
            }
      }
    >
      <span style={statNumberStyle}>{display}</span>
      <span style={statLabelStyle}>{label}</span>
    </motion.div>
  );
}

export function StageHero() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const reduce = useReducedMotion();

  const featured = artists[slideIndex]!;
  const featuredPortrait = artistPortraitBySlug[featured.slug];

  useEffect(() => {
    if (carouselPaused) return;
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % artists.length);
    }, CAROUSEL_MS);
    return () => window.clearInterval(id);
  }, [carouselPaused]);

  const letters = BAND_HEADLINE.split("");

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
          <motion.p
            style={heroEyebrowStyle}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.4, ease: "easeOut", delay: 0.1 }
            }
          >
            Not a platform. A scene.
          </motion.p>
          <h1 id="stage-hero-heading" style={heroBrandStyle}>
            {letters.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                style={{ display: "inline-block" }}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 120,
                        damping: 14,
                        delay: 0.2 + i * 0.04,
                      }
                }
              >
                {ch}
              </motion.span>
            ))}
          </h1>
          <motion.p
            style={heroSupportingStyle}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.5, ease: "easeOut", delay: 0.6 }
            }
          >
            Artist-owned. Fan-driven.
          </motion.p>

          <motion.p
            style={subtextStyle}
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.6, delay: 0.8 }
            }
          >
            {stageHeroCopy.subtext}
          </motion.p>

          <div style={statsRowStyle}>
            {platformStatsHero.map((stat, i) => (
              <HeroStatBlock key={stat.label} statIndex={i} label={stat.label} />
            ))}
          </div>

          <motion.div
            style={ctaRowStyle}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.4, delay: 1.2 }
            }
          >
            <a className="btn-primary" href="#">
              {stageHeroCopy.primaryCta}
            </a>
            <a className="btn-ghost" href="#">
              {stageHeroCopy.secondaryCta}
            </a>
          </motion.div>
        </div>

        <motion.div
          style={rightZoneStyle}
          initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.6, ease: "easeOut", delay: 0.5 }
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.slug}
              initial={
                reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.4, ease: "easeOut" }
              }
              exit={
                reduce
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: 0,
                      x: -20,
                      transition: { duration: 0.3 },
                    }
              }
            >
              <div style={featuredTagTextStyle}>{stageHeroCopy.featuredArtistTag}</div>
              <h2 style={rightNameStyle}>{featured.name}</h2>
              <p style={rightGenreStyle}>
                {featured.genre} · {featured.city}
              </p>
              <p style={rightPulseStyle}>{featured.pulseActivity}</p>
              <motion.a
                className="btn-ghost"
                style={followBtnOverrides}
                href="#"
                whileHover={reduce ? undefined : { scale: 1.05 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                Follow
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
