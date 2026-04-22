"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";

import type { Artist, ArtistProfile } from "@/lib/data";

import { ShareButton } from "./ShareButton";

type ArtistHeaderProps = {
  artist: Artist;
  profile: ArtistProfile | undefined;
  portrait: string | undefined;
};

function TierBadge({ tier }: { tier: Artist["tier"] }) {
  const base: CSSProperties = {
    position: "absolute",
    bottom: "24px",
    left: "48px",
    zIndex: 10,
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    padding: "4px 12px",
    borderRadius: "2px",
  };

  if (tier === "Ready to break") {
    return (
      <div style={{ ...base, background: "var(--orange)", color: "var(--white)" }}>
        {tier}
      </div>
    );
  }
  if (tier === "Established") {
    return (
      <div
        style={{
          ...base,
          background: "rgba(242,237,232,0.12)",
          color: "var(--white)",
          border: "0.5px solid rgba(242,237,232,0.2)",
        }}
      >
        {tier}
      </div>
    );
  }
  return (
    <div
      style={{
        ...base,
        background: "rgba(12,11,10,0.7)",
        color: "var(--muted)",
        border: "0.5px solid var(--border)",
      }}
    >
      {tier}
    </div>
  );
}

const dotSepStyle: CSSProperties = {
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  background: "var(--border)",
  flexShrink: 0,
};

export function ArtistHeader({ artist, profile, portrait }: ArtistHeaderProps) {
  const reduce = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.25 });

  const [claimed, setClaimed] = useState(false);
  const [claimPulse, setClaimPulse] = useState(false);

  const nameChars = Array.from(artist.name);

  const subscribeLabel =
    profile != null
      ? `Subscribe · $${profile.subscriberPrice}/mo`
      : "Subscribe";

  const statSpring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 80, damping: 16 };

  const buttonSpring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 120, damping: 16 };

  const actionButtons = [
    { key: "follow", el: "follow" as const },
    { key: "subscribe", el: "subscribe" as const },
    { key: "tip", el: "tip" as const },
    { key: "share", el: "share" as const },
    { key: "claim", el: "claim" as const },
  ];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        background: "var(--black)",
        overflow: "visible",
      }}
    >
      {/* Zone 1 — photo */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "max(68vh, 480px)",
          overflow: "hidden",
          background: portrait ? undefined : "var(--surface-2)",
          paddingBottom: "8px",
        }}
      >
        {portrait ? (
          <Image
            src={portrait}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 20%",
            }}
          />
        ) : null}

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: [
              "linear-gradient(to top, rgba(12,11,10,1) 0%, rgba(12,11,10,0.7) 25%, transparent 60%)",
              "linear-gradient(to right, rgba(12,11,10,0.5) 0%, transparent 50%)",
            ].join(", "),
          }}
        />

        <Link
          href="/"
          style={{
            position: "absolute",
            top: "24px",
            left: "48px",
            zIndex: 10,
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(242,237,232,0.6)",
            textDecoration: "none",
          }}
          className="hover:!text-[var(--white)]"
        >
          <motion.span
            style={{ display: "inline-block" }}
            whileHover={reduce ? undefined : { x: -3 }}
            transition={{ duration: 0.15 }}
          >
            ← Discover
          </motion.span>
        </Link>

        <div
          style={{
            position: "absolute",
            top: "24px",
            right: "48px",
            zIndex: 10,
          }}
        >
          <ShareButton size="large" artistName={artist.name} />
        </div>

        <TierBadge tier={artist.tier} />
      </div>

      {/* Zone 2 — name */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          marginTop: "-0.28em",
          padding: "0 48px",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            pointerEvents: "auto",
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 0.85,
            fontSize: "clamp(100px, 13vw, 180px)",
            color: "var(--white)",
            letterSpacing: "0.01em",
            display: "block",
            textShadow: "0 2px 32px rgba(12,11,10,0.8)",
            perspective: "800px",
          }}
        >
          <span style={{ display: "inline-block", transformStyle: "preserve-3d" }}>
            {nameChars.map((ch, i) => (
              <motion.span
                key={`${i}-${ch}`}
                style={{
                  display: "inline-block",
                  transformOrigin: "center bottom",
                }}
                initial={
                  reduce
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : { opacity: 0, y: -48, rotateX: -20 }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 100,
                        damping: 14,
                        delay: 0.1 + i * 0.03,
                      }
                }
              >
                {ch === " " ? "\u00a0" : ch}
              </motion.span>
            ))}
          </span>
        </h1>
      </div>

      {/* Zone 3 */}
      <div style={{ background: "var(--black)", padding: "16px 48px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            marginTop: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              padding: "4px 14px",
              borderRadius: "20px",
              color: "var(--white)",
            }}
          >
            {artist.genre}
          </span>
          <span style={dotSepStyle} aria-hidden />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--muted)",
            }}
          >
            {artist.city}
          </span>
          <span style={dotSepStyle} aria-hidden />
          {profile ? (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--muted)",
                lineHeight: 1.5,
                maxWidth: "420px",
              }}
            >
              {profile.bio}
            </p>
          ) : null}
        </div>

        <div
          ref={statsRef}
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "0.5px solid var(--border)",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: "subscribers",
              valueNode:
                profile != null ? (
                  <span style={{ color: "var(--white)" }}>
                    {profile.subscriberCount.toLocaleString("en-US")}
                  </span>
                ) : (
                  <span style={{ color: "var(--white)" }}>—</span>
                ),
            },
            {
              label: "backed by fans",
              valueNode: (
                <span style={{ color: "var(--orange)" }}>
                  {artist.claims.toLocaleString("en-US")}
                </span>
              ),
            },
            {
              label: "collective backing",
              valueNode: (
                <span style={{ color: "var(--white)" }}>
                  {profile?.backedByCount && profile.backedByCount > 0
                    ? profile.backedByCount.toLocaleString("en-US")
                    : "—"}
                </span>
              ),
            },
            {
              label: "per month",
              valueNode: (
                <span style={{ color: "var(--orange)" }}>
                  {profile?.subscriberPrice != null
                    ? `$${profile.subscriberPrice}`
                    : "Free"}
                </span>
              ),
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={
                reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              animate={
                statsInView
                  ? { opacity: 1, y: 0 }
                  : reduce
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
              }
              transition={{
                ...statSpring,
                delay: reduce ? 0 : i * 0.08,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {stat.valueNode}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--sub)",
                  marginTop: "3px",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "24px",
            flexWrap: "wrap",
            paddingBottom: "32px",
          }}
        >
          {actionButtons.map((item, i) => {
            const delay = reduce ? 0 : 0.4 + i * 0.05;
            if (item.el === "follow") {
              return (
                <motion.button
                  key={item.key}
                  type="button"
                  className="btn-ghost"
                  initial={
                    reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...buttonSpring, delay }}
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  Follow
                </motion.button>
              );
            }
            if (item.el === "subscribe") {
              return (
                <motion.button
                  key={item.key}
                  type="button"
                  className="btn-primary"
                  initial={
                    reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...buttonSpring, delay }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          boxShadow: "0 0 20px rgba(224,92,32,0.3)",
                          opacity: 1,
                        }
                  }
                  whileTap={
                    reduce
                      ? undefined
                      : {
                          scale: 0.97,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }
                  }
                  style={{ padding: "8px 28px" }}
                >
                  {subscribeLabel}
                </motion.button>
              );
            }
            if (item.el === "tip") {
              return (
                <motion.button
                  key={item.key}
                  type="button"
                  className="btn-ghost"
                  initial={
                    reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...buttonSpring, delay }}
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  Tip
                </motion.button>
              );
            }
            if (item.el === "share") {
              return (
                <motion.div
                  key={item.key}
                  initial={
                    reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...buttonSpring, delay }}
                  style={{ display: "inline-flex" }}
                >
                  <ShareButton size="medium" artistName={artist.name} />
                </motion.div>
              );
            }
            /* claim */
            return (
              <motion.div
                key={item.key}
                initial={
                  reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...buttonSpring, delay }}
                style={{ display: "inline-flex" }}
              >
                <motion.button
                  type="button"
                  disabled={claimed}
                  animate={
                    claimPulse
                      ? {
                          scale: [1, 1.06, 1],
                          borderColor: [
                            "var(--orange-mid)",
                            "var(--orange)",
                            "var(--orange-mid)",
                          ],
                        }
                      : { scale: 1 }
                  }
                  transition={
                    claimPulse ? { duration: 0.35 } : { duration: 0 }
                  }
                  onAnimationComplete={() => {
                    if (claimPulse) {
                      setClaimPulse(false);
                      setClaimed(true);
                    }
                  }}
                  onClick={() => {
                    if (claimed) return;
                    setClaimPulse(true);
                  }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "13px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "7px 20px",
                    borderRadius: "2px",
                    cursor: claimed ? "default" : "pointer",
                    background: claimed ? "var(--orange-dim)" : "transparent",
                    border: "0.5px solid var(--orange-mid)",
                    color: "var(--orange)",
                  }}
                >
                  {claimed ? "Backed ✓" : "Back this artist"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
