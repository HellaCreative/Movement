"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";

import {
  getArtistExclusiveContent,
  getArtistProfile,
  type ExclusiveContent,
} from "@/lib/data";

type ExclusiveTabProps = {
  artistSlug: string;
  isSubscribed: boolean;
};

function sortByDateDesc(a: ExclusiveContent, b: ExclusiveContent): number {
  const ta = Date.parse(a.date);
  const tb = Date.parse(b.date);
  if (Number.isNaN(ta) || Number.isNaN(tb)) return 0;
  return tb - ta;
}

function partitionExclusive(items: ExclusiveContent[]): {
  featured: ExclusiveContent | null;
  small: ExclusiveContent[];
  wide: ExclusiveContent | null;
} {
  if (items.length === 0) {
    return { featured: null, small: [], wide: null };
  }
  const newItems = items.filter((i) => i.isNew);
  const pool = newItems.length ? [...newItems].sort(sortByDateDesc) : [...items].sort(sortByDateDesc);
  const featured = pool[0]!;
  const rest = items
    .filter((i) => i.id !== featured.id)
    .sort(sortByDateDesc);
  const small = rest.slice(0, 4);
  const wide = rest[4] ?? null;
  return { featured, small, wide };
}

function ExclusiveTypeBadge({ type }: { type: ExclusiveContent["type"] }) {
  const base: CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: "2px",
    display: "inline-block",
  };
  if (type === "Early Access") {
    return (
      <span style={{ ...base, background: "var(--orange)", color: "var(--white)" }}>
        {type}
      </span>
    );
  }
  if (type === "Demo") {
    return (
      <span
        style={{
          ...base,
          background: "var(--surface)",
          color: "var(--muted)",
          border: "0.5px solid var(--border)",
        }}
      >
        {type}
      </span>
    );
  }
  return (
    <span
      style={{
        ...base,
        background: "rgba(242,237,232,0.08)",
        color: "var(--muted)",
        border: "0.5px solid var(--border)",
      }}
    >
      {type}
    </span>
  );
}

function LockIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 11V8a5 5 0 0110 0v3M6 11h12a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayTriangle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 5v14l11-7-11-7z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayCircleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6 4.5v5l3.5-2.5L6 4.5z"
        fill="currentColor"
      />
    </svg>
  );
}

type FeaturedCardProps = {
  item: ExclusiveContent;
  locked: boolean;
  subscriberPrice: number;
  inView: boolean;
};

function FeaturedCard({
  item,
  locked,
  subscriberPrice,
  inView,
}: FeaturedCardProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
      animate={
        inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }
      }
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 80, damping: 16, delay: 0.1 }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        gridColumn: "1",
        gridRow: "1 / 3",
        minHeight: "400px",
        borderRadius: "2px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Image
        src={item.thumbnailImage}
        alt=""
        fill
        sizes="(max-width: 1200px) 100vw, 50vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(12,11,10,0.95) 0%, rgba(12,11,10,0.3) 50%, transparent 100%)",
        }}
      />
      {locked ? (
        <>
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              backdropFilter: hovered ? "blur(8px)" : "blur(12px)",
              WebkitBackdropFilter: hovered ? "blur(8px)" : "blur(12px)",
              background: "rgba(12,11,10,0.4)",
              boxShadow: hovered
                ? "inset 0 0 60px rgba(224,92,32,0.15)"
                : "none",
              transition: reduce ? undefined : "box-shadow 0.3s var(--ease)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
              textAlign: "center",
              color: "rgba(242,237,232,0.4)",
            }}
          >
            <motion.div
              animate={
                reduce ? { scale: 1 } : { scale: hovered ? 1.1 : 1 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 200, damping: 20 }
              }
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <LockIcon size={32} />
            </motion.div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--white)",
              }}
            >
              Subscribe to unlock
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--orange)",
                marginTop: "4px",
              }}
            >
              ${subscriberPrice}/mo
            </div>
          </div>
        </>
      ) : null}

      {item.isNew ? (
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            zIndex: 5,
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            textTransform: "uppercase",
            color: "var(--orange)",
            background: "var(--orange-dim)",
            border: "0.5px solid var(--orange-mid)",
            padding: "3px 8px",
            borderRadius: "2px",
          }}
        >
          NEW
        </div>
      ) : null}

      {!locked && hovered ? (
        <motion.div
          key="play-featured"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 20 }
          }
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(224,92,32,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--white)",
              paddingLeft: "4px",
            }}
          >
            <PlayTriangle size={20} />
          </div>
        </motion.div>
      ) : null}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <ExclusiveTypeBadge type={item.type} />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 800,
            textTransform: "uppercase",
            color: "var(--white)",
            lineHeight: 1.1,
            margin: "0 0 6px",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 300,
            color: "var(--muted)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.description}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--sub)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <PlayCircleIcon size={12} />
            {item.duration}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--sub)",
            }}
          >
            {item.date}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

type SmallCardProps = {
  item: ExclusiveContent;
  index: number;
  locked: boolean;
  inView: boolean;
};

function SmallExclusiveCard({
  item,
  index,
  locked,
  inView,
}: SmallCardProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const unlocked = !locked;

  return (
    <motion.article
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 90,
              damping: 16,
              delay: index * 0.07,
            }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={
        reduce
          ? undefined
          : unlocked
            ? { y: -3, borderColor: "var(--border-hover)" }
            : undefined
      }
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "2px",
        overflow: "hidden",
        cursor: "pointer",
        border: "0.5px solid var(--border)",
      }}
    >
      <div
        style={{
          height: "120px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={unlocked && hovered ? { scale: 1.04 } : { scale: 1 }}
          transition={
            reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 24 }
          }
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <Image
            src={item.thumbnailImage}
            alt=""
            fill
            sizes="200px"
            style={{
              objectFit: "cover",
              filter: locked
                ? hovered
                  ? "blur(4px)"
                  : "blur(8px)"
                : undefined,
              transition: "filter 0.3s var(--ease)",
            }}
          />
        </motion.div>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(12,11,10,0.4)",
            boxShadow:
              locked && hovered
                ? "inset 0 0 30px rgba(224,92,32,0.12)"
                : "none",
            transition: "box-shadow 0.3s var(--ease)",
          }}
        />
        {locked ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(242,237,232,0.5)",
            }}
          >
            <LockIcon size={16} />
          </div>
        ) : null}
        {item.isNew ? (
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              textTransform: "uppercase",
              color: "var(--orange)",
              background: "var(--orange-dim)",
              border: "0.5px solid var(--orange-mid)",
              padding: "3px 8px",
              borderRadius: "2px",
            }}
          >
            NEW
          </div>
        ) : null}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
          }}
        >
          <ExclusiveTypeBadge type={item.type} />
        </div>
        {unlocked && hovered ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 20 }
            }
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(224,92,32,0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--white)",
                paddingLeft: "3px",
              }}
            >
              <PlayTriangle size={14} />
            </div>
          </motion.div>
        ) : null}
      </div>
      <div
        style={{
          background: "var(--surface)",
          borderWidth: "0 0.5px 0.5px 0.5px",
          borderStyle: "solid",
          borderColor: "var(--border)",
          borderRadius: "0 0 2px 2px",
          padding: "10px 12px",
          flex: 1,
        }}
      >
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--white)",
            lineHeight: 1.1,
            margin: "0 0 4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </h4>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "var(--sub)",
          }}
        >
          {item.duration}
        </div>
        {locked ? (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--orange)",
              marginTop: "4px",
            }}
          >
            Subscribers only
          </div>
        ) : (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--sub)",
              marginTop: "4px",
            }}
          >
            {item.date}
          </div>
        )}
      </div>
    </motion.article>
  );
}

type WideCardProps = {
  item: ExclusiveContent;
  locked: boolean;
  inView: boolean;
};

function WideExclusiveCard({
  item,
  locked,
  inView,
}: WideCardProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const unlocked = !locked;

  return (
    <motion.article
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 90, damping: 16, delay: 4 * 0.07 }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={
        reduce
          ? undefined
          : unlocked
            ? { y: -3, borderColor: "var(--border-hover)" }
            : undefined
      }
      style={{
        gridColumn: "2 / 4",
        gridRow: "3",
        display: "flex",
        flexDirection: "row",
        borderRadius: "2px",
        overflow: "hidden",
        cursor: "pointer",
        border: "0.5px solid var(--border)",
        minHeight: "140px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "35%",
          flexShrink: 0,
          minHeight: "100%",
        }}
      >
        <Image
          src={item.thumbnailImage}
          alt=""
          fill
          sizes="200px"
          style={{
            objectFit: "cover",
            filter: locked
              ? hovered
                ? "blur(4px)"
                : "blur(8px)"
              : undefined,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(12,11,10,0.4)",
            boxShadow:
              locked && hovered
                ? "inset 0 0 30px rgba(224,92,32,0.12)"
                : "none",
            transition: "box-shadow 0.3s var(--ease)",
          }}
        />
        {locked ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(242,237,232,0.5)",
            }}
          >
            <LockIcon size={16} />
          </div>
        ) : null}
      </div>
      <div
        style={{
          flex: 1,
          padding: "20px 24px",
          background: "var(--surface)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <ExclusiveTypeBadge type={item.type} />
        </div>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "16px",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--white)",
            margin: "0 0 8px",
          }}
        >
          {item.title}
        </h4>
        <p
          style={{
            margin: "0 0 8px",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 300,
            color: "var(--muted)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.description}
        </p>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--sub)",
          }}
        >
          {item.duration} · {item.date}
        </div>
      </div>
    </motion.article>
  );
}

export function ExclusiveTab({ artistSlug, isSubscribed }: ExclusiveTabProps) {
  const reduce = useReducedMotion();
  const profile = getArtistProfile(artistSlug);
  const items = useMemo(
    () => getArtistExclusiveContent(artistSlug),
    [artistSlug],
  );
  const { featured, small, wide } = useMemo(
    () => partitionExclusive(items),
    [items],
  );

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.08 });

  const subCount = profile?.subscriberCount ?? 847;
  const price = profile?.subscriberPrice ?? 8;

  if (items.length === 0) {
    return (
      <div style={{ padding: "48px 48px 64px" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          No exclusive content yet.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "48px 48px 64px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--muted)",
            }}
          >
            Exclusive content
          </div>
          <p
            style={{
              margin: "4px 0 0",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 300,
              color: "var(--sub)",
            }}
          >
            {subCount.toLocaleString("en-US")} subscribers have access
          </p>
        </div>
        {!isSubscribed ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                color: "var(--muted)",
                marginRight: "16px",
              }}
            >
              Subscribe for ${price}/mo to unlock everything
            </span>
            <motion.button
              type="button"
              className="btn-primary"
              whileHover={
                reduce
                  ? undefined
                  : { boxShadow: "0 0 20px rgba(224,92,32,0.3)" }
              }
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 20 }
              }
            >
              Subscribe · ${price}/mo
            </motion.button>
          </div>
        ) : null}
      </div>

      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: wide ? "auto auto auto" : "auto auto",
          gap: "12px",
        }}
      >
        {featured ? (
          <FeaturedCard
            item={featured}
            locked={featured.subscribersOnly && !isSubscribed}
            subscriberPrice={price}
            inView={gridInView}
          />
        ) : null}
        {small.map((item, i) => (
          <div
            key={item.id}
            style={{
              gridColumn: i % 2 === 0 ? 2 : 3,
              gridRow: i < 2 ? 1 : 2,
            }}
          >
            <SmallExclusiveCard
              item={item}
              index={i}
              locked={item.subscribersOnly && !isSubscribed}
              inView={gridInView}
            />
          </div>
        ))}
        {wide ? (
          <WideExclusiveCard
            item={wide}
            locked={wide.subscribersOnly && !isSubscribed}
            inView={gridInView}
          />
        ) : null}
      </div>
    </div>
  );
}
