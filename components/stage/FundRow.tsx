"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useRef } from "react";

import {
  artistPortraitBySlug,
  artists,
  prototypeCoinBalance,
} from "@/lib/data";

import { ScrollReveal } from "@/components/motion/ScrollReveal";

import { DiscoverTierFlag } from "./discoverTierFlag";
import { HorizontalScrollRow } from "./HorizontalScrollRow";

const MotionLink = motion(Link);

const sectionStyle: CSSProperties = {
  padding: "32px 0 0",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 48px",
  marginBottom: "16px",
};

const titleStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "18px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--white)",
  margin: 0,
};

const seeAllStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  textTransform: "uppercase",
  color: "var(--sub)",
  cursor: "pointer",
  textDecoration: "none",
};

const cardItemVariantsBase = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
};

export function FundRow() {
  const featured = artists[0]!;
  const portrait = artistPortraitBySlug[featured.slug];

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const { containerVariants, itemVariants } = useMemo(() => {
    if (reduce) {
      return {
        containerVariants: {
          hidden: {},
          show: { transition: { duration: 0 } },
        },
        itemVariants: {
          hidden: { opacity: 1, y: 0 },
          show: { opacity: 1, y: 0, transition: { duration: 0 } },
        },
      };
    }
    return {
      containerVariants: {
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08 },
        },
      },
      itemVariants: cardItemVariantsBase,
    };
  }, [reduce]);

  return (
    <section ref={sectionRef} style={sectionStyle} aria-labelledby="fund-row-heading">
      <ScrollReveal direction="left" distance={20}>
        <div style={headerStyle}>
          <h2 id="fund-row-heading" style={titleStyle}>
            The Fund
          </h2>
          <Link
            href="/fund"
            style={seeAllStyle}
            className="hover:!text-[var(--orange)]"
          >
            See all →
          </Link>
        </div>
      </ScrollReveal>
      <HorizontalScrollRow>
        <motion.div
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
          }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={itemVariants} className="flex w-[200px] flex-shrink-0 flex-col">
            <div
              className="flex h-[80px] items-center justify-center rounded-t-[2px] border-[0.5px] border-[var(--orange-mid)] bg-orange-dim"
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "var(--orange)",
                  lineHeight: 1,
                }}
              >
                {prototypeCoinBalance}
              </span>
            </div>
            <div
              style={{
                padding: "10px 12px 12px",
                background: "var(--surface)",
                borderWidth: "0 0.5px 0.5px 0.5px",
                borderStyle: "solid",
                borderColor: "var(--border)",
                borderRadius: "0 0 2px 2px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "var(--white)",
                  lineHeight: 1.2,
                }}
              >
                Your Hype Coins
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 300,
                  color: "var(--muted)",
                  marginTop: "4px",
                }}
              >
                Share clips to earn more
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex w-[200px] flex-shrink-0 flex-col">
            <div className="flex h-[80px] items-center justify-center rounded-t-[2px] bg-surface-2">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "var(--white)",
                  opacity: 0.2,
                  lineHeight: 1,
                }}
              >
                #1
              </span>
            </div>
            <div
              style={{
                padding: "10px 12px 12px",
                background: "var(--surface)",
                borderWidth: "0 0.5px 0.5px 0.5px",
                borderStyle: "solid",
                borderColor: "var(--border)",
                borderRadius: "0 0 2px 2px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "var(--white)",
                  lineHeight: 1.2,
                }}
              >
                Top hyper this week
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--orange)",
                  marginTop: "4px",
                }}
              >
                @jakefromhalifax
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--sub)",
                  marginTop: "4px",
                }}
              >
                1,840 coins
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-shrink-0">
            <MotionLink
              href={`/artist/${featured.slug}`}
              className="group flex w-[200px] flex-shrink-0 cursor-pointer flex-col"
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.02,
                      y: -4,
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    }
              }
              style={{ transformOrigin: "center bottom" }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-t-[2px] border-[0.5px] border-transparent transition-colors group-hover:border-border-hover">
                <DiscoverTierFlag tier={featured.tier} />
                {portrait ? (
                  <motion.div
                    className="absolute inset-0"
                    whileHover={
                      reduce ? undefined : { scale: 1.06 }
                    }
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={portrait}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                      quality={85}
                    />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 bg-surface-2" />
                )}
              </div>
              <div
                style={{
                  padding: "10px 12px 12px",
                  background: "var(--surface)",
                  borderWidth: "0 0.5px 0.5px 0.5px",
                  borderStyle: "solid",
                  borderColor: "var(--border)",
                  borderRadius: "0 0 2px 2px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: "var(--white)",
                    lineHeight: 1,
                  }}
                >
                  {featured.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    textTransform: "uppercase",
                    color: "var(--orange)",
                    marginTop: "2px",
                  }}
                >
                  {featured.genre} · {featured.city}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--sub)",
                    marginTop: "6px",
                  }}
                >
                  340 shares this week
                </div>
              </div>
            </MotionLink>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              width: "260px",
              flexShrink: 0,
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              borderRadius: "2px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "var(--white)",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Two ways to subscribe.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "var(--muted)",
                lineHeight: 1.6,
                margin: "12px 0 0",
              }}
            >
              Pay for a subscription directly. Or hype your favourite bands —
              share their clips, drive new fans to their page, and earn Hype
              Coins. The more you hype, the more coin you make. Spend your coins
              to subscribe to any artist on the platform.
            </p>
            <Link
              className="btn-primary"
              href="/fund"
              style={{ display: "inline-flex", marginTop: "14px" }}
            >
              Start hyping →
            </Link>
          </motion.div>
        </motion.div>
      </HorizontalScrollRow>
    </section>
  );
}
