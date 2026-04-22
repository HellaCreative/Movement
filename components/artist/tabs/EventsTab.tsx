"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";

import {
  getArtistEvents,
  type StageEvent,
} from "@/lib/data";

type EventsTabProps = {
  artistSlug: string;
};

function DetailChip({ detail }: { detail: string }) {
  if (detail.startsWith("$")) {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          textTransform: "uppercase",
          padding: "2px 8px",
          borderRadius: "2px",
          color: "var(--orange)",
          background: "var(--orange-dim)",
          border: "0.5px solid var(--orange-mid)",
        }}
      >
        {detail}
      </span>
    );
  }
  if (detail === "Free") {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          textTransform: "uppercase",
          padding: "2px 8px",
          borderRadius: "2px",
          color: "var(--muted)",
          background: "rgba(100,200,100,0.15)",
          border: "0.5px solid rgba(100,200,100,0.35)",
        }}
      >
        {detail}
      </span>
    );
  }
  if (detail === "Subscribers") {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          textTransform: "uppercase",
          padding: "2px 8px",
          borderRadius: "2px",
          color: "var(--muted)",
          background: "var(--surface-2)",
          border: "0.5px solid var(--border)",
        }}
      >
        {detail}
      </span>
    );
  }
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: "2px",
        color: "var(--muted)",
        background: "var(--surface-2)",
        border: "0.5px solid var(--border)",
      }}
    >
      {detail}
    </span>
  );
}

function isOnlineEventPulsing(event: StageEvent): boolean {
  const now = new Date();
  const y = now.getFullYear();
  const md = /^([A-Za-z]+)\s+(\d{1,2})$/.exec(event.date.trim());
  if (md) {
    const d = new Date(`${md[1]} ${md[2]}, ${y}`);
    if (Number.isNaN(d.getTime())) return false;
    const diff = d.getTime() - now.getTime();
    return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
  }
  if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/i.test(event.date)) {
    return true;
  }
  return false;
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0, opacity: 0.7 }}
    >
      <path
        d="M3.5 6V4.5a3.5 3.5 0 117 0V6M3 6h8a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1V7a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const sectionLabelStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--white)",
  marginBottom: "24px",
};

export function EventsTab({ artistSlug }: EventsTabProps) {
  const reduce = useReducedMotion();
  const [liveHoverId, setLiveHoverId] = useState<string | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const onlineRef = useRef<HTMLDivElement>(null);
  const liveInView = useInView(liveRef, { once: true, amount: 0.15 });
  const onlineInView = useInView(onlineRef, { once: true, amount: 0.15 });

  const events = useMemo(() => getArtistEvents(artistSlug), [artistSlug]);
  const liveEvents = useMemo(
    () => events.filter((e) => e.type === "Show"),
    [events],
  );
  const onlineEvents = useMemo(
    () => events.filter((e) => e.type === "Stream" || e.type === "Live chat"),
    [events],
  );

  const springIn = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 100, damping: 16 };

  return (
    <div style={{ padding: "48px 48px 64px" }}>
      <div
        style={{
          display: "flex",
          gap: "5%",
          alignItems: "flex-start",
        }}
      >
        {/* Left — Live */}
        <div style={{ width: "55%", flexShrink: 0 }}>
          <div style={sectionLabelStyle}>
            Live
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "var(--orange)",
                marginTop: "6px",
              }}
            />
          </div>

          {liveEvents.length === 0 ? (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--muted)",
              }}
            >
              No upcoming shows.
            </p>
          ) : (
            <div ref={liveRef} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {liveEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  animate={
                    liveInView
                      ? { opacity: 1, x: 0 }
                      : reduce
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -16 }
                  }
                  transition={{
                    ...springIn,
                    delay: reduce ? 0 : i * 0.06,
                  }}
                  onHoverStart={() => setLiveHoverId(event.id)}
                  onHoverEnd={() => setLiveHoverId(null)}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          x: 4,
                          borderColor: "var(--border-hover)",
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                          },
                        }
                  }
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "3px",
                      flexShrink: 0,
                      background:
                        liveHoverId === event.id
                          ? "var(--orange)"
                          : "var(--orange-mid)",
                      transition: "background 200ms var(--ease)",
                    }}
                  />
                  <div style={{ padding: "16px 20px", flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "12px",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "var(--white)",
                        }}
                      >
                        {event.date}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          fontWeight: 300,
                          color: "var(--muted)",
                          textAlign: "right",
                        }}
                      >
                        {event.venue}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          color: "var(--sub)",
                        }}
                      >
                        {event.city}
                      </span>
                      <DetailChip detail={event.detail} />
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        borderRadius: "2px",
                        background: "var(--orange)",
                        color: "var(--white)",
                      }}
                    >
                      Show
                    </span>
                    <motion.button
                      type="button"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "var(--orange)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      whileHover={reduce ? undefined : { x: 2 }}
                      transition={{ duration: 0.15 }}
                    >
                      Get tickets →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Online */}
        <div style={{ width: "40%", flexShrink: 0 }}>
          <div style={sectionLabelStyle}>
            Online
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "var(--orange)",
                marginTop: "6px",
              }}
            />
          </div>

          {onlineEvents.length === 0 ? (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--muted)",
              }}
            >
              No upcoming streams.
            </p>
          ) : (
            <div ref={onlineRef}>
              {onlineEvents.map((event, i) => {
                const pulse = isOnlineEventPulsing(event);
                return (
                  <motion.div
                    key={event.id}
                    initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    animate={
                      onlineInView
                        ? { opacity: 1, y: 0 }
                        : reduce
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 24 }
                    }
                    transition={{
                      duration: reduce ? 0 : 0.35,
                      delay: reduce ? 0 : i * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: -3,
                            borderColor: "var(--border-hover)",
                            transition: { duration: 0.2 },
                          }
                    }
                    style={{
                      width: "100%",
                      marginBottom: "12px",
                      background: "var(--surface)",
                      border: "0.5px solid var(--border)",
                      borderRadius: "2px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        height: "80px",
                        position: "relative",
                        overflow: "hidden",
                        background: "var(--surface-2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "32px",
                          fontWeight: 800,
                          color: "var(--white)",
                          textShadow: "0 1px 8px rgba(12,11,10,0.6)",
                          textAlign: "center",
                          padding: "0 12px",
                          lineHeight: 1.1,
                        }}
                      >
                        {event.date}
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          left: "8px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          borderRadius: "2px",
                          background: "rgba(242,237,232,0.08)",
                          color: "var(--muted)",
                          border: "0.5px solid var(--border)",
                        }}
                      >
                        {event.type}
                      </span>
                      {pulse ? (
                        <motion.span
                          aria-hidden
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--orange)",
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
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "14px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: "var(--white)",
                          }}
                        >
                          {event.venue}
                        </span>
                        <DetailChip detail={event.detail} />
                      </div>
                      {event.detail === "Subscribers" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginTop: "6px",
                          }}
                        >
                          <LockIcon />
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "11px",
                              fontWeight: 300,
                              color: "var(--muted)",
                            }}
                          >
                            Subscribe to join
                          </span>
                        </div>
                      ) : event.detail === "Free" ? (
                        <p
                          style={{
                            margin: "6px 0 0",
                            fontFamily: "var(--font-body)",
                            fontSize: "11px",
                            fontWeight: 300,
                            color: "var(--muted)",
                          }}
                        >
                          Open to all
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
