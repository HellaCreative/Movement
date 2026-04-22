"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useRef } from "react";

import {
  artistPortraitBySlug,
  artists,
  backedArtists,
  type BackedArtistEntry,
} from "@/lib/data";

import { ScrollReveal } from "@/components/motion/ScrollReveal";

import { matchesGenre, matchesLocationQuery } from "./filterUtils";
import { HorizontalScrollRow } from "./HorizontalScrollRow";
import { useHomeFilters } from "./HomeFiltersContext";

const MotionLink = motion(Link);

const SWATCH = [
  "#8a8278",
  "#7a7369",
  "#6b6560",
  "#5d5852",
  "#504c47",
  "#45423e",
] as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]!.charAt(0)}${parts[1]!.charAt(0)}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function filterBacked(
  list: BackedArtistEntry[],
  activeGenre: string,
  locationQuery: string,
): BackedArtistEntry[] {
  return list.filter((entry) => {
    const artist = artists.find((a) => a.slug === entry.slug);
    if (!artist) return false;
    return (
      matchesGenre(artist.genre, activeGenre) &&
      matchesLocationQuery(artist.city, locationQuery)
    );
  });
}

const sectionStyle: CSSProperties = {
  padding: "32px 0 0",
  borderBottom: "0.5px solid var(--border)",
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

const emptyStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  color: "var(--muted)",
  padding: "0 48px",
  margin: 0,
};

function BackedArtistCard({
  entry,
  index,
  itemVariants,
}: {
  entry: BackedArtistEntry;
  index: number;
  itemVariants: {
    hidden: { opacity: number; y: number };
    show: {
      opacity: number;
      y: number;
      transition?: Record<string, unknown>;
    };
  };
}) {
  const reduce = useReducedMotion();
  const artist = artists.find((a) => a.slug === entry.slug);
  if (!artist) return null;

  const portrait = artistPortraitBySlug[entry.slug];
  const initials = getInitials(artist.name);
  const swatch = SWATCH[index % SWATCH.length]!;

  return (
    <motion.div variants={itemVariants} style={{ flexShrink: 0 }}>
      <MotionLink
        href={`/artist/${entry.slug}`}
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
        <div className="relative aspect-square w-full overflow-hidden rounded-[2px] border-[0.5px] border-transparent transition-colors duration-150 ease-movement group-hover:border-border-hover">
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
            <div
              className="absolute inset-0 flex items-center justify-center bg-surface-2"
              aria-hidden
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "48px",
                  fontWeight: 800,
                  color: swatch,
                  opacity: 0.15,
                  lineHeight: 1,
                }}
              >
                {initials}
              </span>
            </div>
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
            {artist.name}
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
            {artist.genre} · {artist.city}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--orange)",
              marginTop: "6px",
            }}
          >
            Backed by {entry.backedBy}
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
}

export function CollectiveRow() {
  const { activeGenre, locationQuery } = useHomeFilters();
  const filtered = filterBacked(backedArtists, activeGenre, locationQuery);
  const shown = filtered.slice(0, 10);

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
      itemVariants: {
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring" as const, stiffness: 100, damping: 18 },
        },
      },
    };
  }, [reduce]);

  return (
    <section ref={sectionRef} style={sectionStyle} aria-labelledby="collective-row-heading">
      <ScrollReveal direction="left" distance={20}>
        <div style={headerStyle}>
          <h2 id="collective-row-heading" style={titleStyle}>
            The Collective
          </h2>
          <Link
            href="/collective"
            style={seeAllStyle}
            className="hover:!text-[var(--orange)]"
          >
            See all →
          </Link>
        </div>
      </ScrollReveal>
      {shown.length === 0 ? (
        <p style={emptyStyle}>Nothing matches your filters yet.</p>
      ) : (
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
            {shown.map((entry, index) => (
              <BackedArtistCard
                key={entry.slug}
                entry={entry}
                index={index}
                itemVariants={itemVariants}
              />
            ))}
          </motion.div>
        </HorizontalScrollRow>
      )}
    </section>
  );
}
