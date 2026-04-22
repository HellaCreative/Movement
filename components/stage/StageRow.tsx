"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useRef } from "react";

import {
  artistPortraitBySlug,
  stageEvents,
  type StageEvent,
} from "@/lib/data";

import { ScrollReveal } from "@/components/motion/ScrollReveal";

import {
  matchesGenre,
  matchesLocationQuery,
  matchesSearch,
} from "./filterUtils";
import { HorizontalScrollRow } from "./HorizontalScrollRow";
import { useHomeFilters } from "./HomeFiltersContext";

const MotionLink = motion(Link);

function filterEvents(
  events: StageEvent[],
  activeGenre: string,
  locationQuery: string,
  searchQuery: string,
): StageEvent[] {
  return events.filter(
    (e) =>
      matchesSearch(
        { name: e.artistName, genre: e.genre, city: e.city },
        searchQuery,
      ) &&
      matchesGenre(e.genre, activeGenre) &&
      matchesLocationQuery(e.city, locationQuery),
  );
}

function parseStageDate(dateStr: string): Date | null {
  const m = /^([A-Za-z]+)\s+(\d{1,2})$/.exec(dateStr.trim());
  if (!m) return null;
  const y = new Date().getFullYear();
  const d = new Date(`${m[1]} ${m[2]}, ${y}`);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function isShowWithin7Days(event: StageEvent): boolean {
  if (event.type !== "Show") return false;
  const d = parseStageDate(event.date);
  if (!d) return false;
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  const seven = 7 * 24 * 60 * 60 * 1000;
  return diff >= 0 && diff <= seven;
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

function TypeBadge({
  type,
  cardIndex,
}: {
  type: StageEvent["type"];
  cardIndex: number;
}) {
  const reduce = useReducedMotion();
  const base: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    textTransform: "uppercase",
    padding: "3px 8px",
  };
  if (type === "Show") {
    return (
      <motion.div
        style={{ ...base, background: "var(--orange)", color: "var(--white)" }}
        initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 0.3, delay: 0.15 * cardIndex }
        }
      >
        {type}
      </motion.div>
    );
  }
  return (
    <motion.div
      style={{
        ...base,
        background: "rgba(242,237,232,0.08)",
        color: "var(--muted)",
        border: "0.5px solid var(--border)",
      }}
      initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.3, delay: 0.15 * cardIndex }
      }
    >
      {type}
    </motion.div>
  );
}

function StageEventCard({
  event,
  cardIndex,
  itemVariants,
}: {
  event: StageEvent;
  cardIndex: number;
  itemVariants: {
    hidden: { opacity: number; y: number };
    show: {
      opacity: number;
      y: number;
      transition?: Record<string, unknown>;
    };
  };
}) {
  const portrait = artistPortraitBySlug[event.artistSlug];
  const reduce = useReducedMotion();
  const pulseSoon = isShowWithin7Days(event);

  return (
    <motion.div variants={itemVariants} style={{ flexShrink: 0 }}>
      <MotionLink
        href={`/artist/${event.artistSlug}`}
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
        <div className="relative h-[100px] overflow-hidden rounded-t-[2px] border-[0.5px] border-transparent bg-surface-2 transition-colors duration-150 ease-movement group-hover:border-border-hover">
          {portrait ? (
            <>
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
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "rgba(12,11,10,0.65)" }}
                aria-hidden
              />
            </>
          ) : null}
          <div className="relative z-[1] flex h-full flex-col">
            <TypeBadge type={event.type} cardIndex={cardIndex} />
            <motion.div
              className="flex flex-1 items-center justify-center gap-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "36px",
                fontWeight: 800,
                color: "var(--white)",
                lineHeight: 1,
              }}
              initial={
                reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                      delay: 0.1 * cardIndex,
                    }
              }
            >
              {pulseSoon ? (
                <motion.span
                  aria-hidden
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--orange)",
                    flexShrink: 0,
                  }}
                  animate={
                    reduce
                      ? { scale: 1, opacity: 1 }
                      : {
                          scale: [1, 1.4, 1],
                          opacity: [1, 0.4, 1],
                        }
                  }
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                />
              ) : null}
              <span>{event.date}</span>
            </motion.div>
          </div>
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
              lineHeight: 1,
            }}
          >
            {event.artistName}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 300,
              color: "var(--muted)",
              marginTop: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {event.venue}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--sub)",
              marginTop: "6px",
            }}
          >
            {event.genre} · {event.detail}
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
}

export function StageRow() {
  const { activeGenre, locationQuery, searchQuery } = useHomeFilters();
  const filtered = filterEvents(
    stageEvents,
    activeGenre,
    locationQuery,
    searchQuery,
  );
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
          transition: { staggerChildren: 0.07 },
        },
      },
      itemVariants: {
        hidden: { opacity: 0, y: 32 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring" as const, stiffness: 100, damping: 16 },
        },
      },
    };
  }, [reduce]);

  return (
    <section ref={sectionRef} style={sectionStyle} aria-labelledby="stage-row-heading">
      <ScrollReveal direction="left" distance={20}>
        <div style={headerStyle}>
          <h2 id="stage-row-heading" style={titleStyle}>
            The Stage
          </h2>
          <a href="#" style={seeAllStyle} className="hover:!text-[var(--orange)]">
            See all →
          </a>
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
            {shown.map((event, index) => (
              <StageEventCard
                key={event.id}
                event={event}
                cardIndex={index}
                itemVariants={itemVariants}
              />
            ))}
          </motion.div>
        </HorizontalScrollRow>
      )}
    </section>
  );
}
