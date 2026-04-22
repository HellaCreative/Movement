"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

function ShareGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 1v8M4 4l3-3 3 3M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 7.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type ShareButtonProps = {
  size: "large" | "medium" | "icon";
  artistName: string;
  className?: string;
};

export function ShareButton({ size, artistName, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const runShare = useCallback(async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;

    let usedNativeShare = false;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: artistName, url });
        usedNativeShare = true;
      }
    } catch {
      usedNativeShare = false;
    }

    if (usedNativeShare) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [artistName]);

  const iconSize = size === "large" ? 16 : 14;
  const showLabel = size !== "icon";

  if (size === "icon") {
    return (
      <motion.button
        type="button"
        aria-label={copied ? "Link copied" : "Share"}
        className={className}
        onClick={runShare}
        whileHover={reduce ? undefined : { scale: 1.03 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        style={{
          width: "36px",
          height: "36px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(12,11,10,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "0.5px solid rgba(242,237,232,0.2)",
          borderRadius: "2px",
          color: "var(--white)",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {copied ? <CheckGlyph size={iconSize} /> : <ShareGlyph size={iconSize} />}
      </motion.button>
    );
  }

  if (size === "large") {
    return (
      <motion.button
        type="button"
        aria-label={copied ? "Link copied" : "Share"}
        className={className}
        onClick={runShare}
        whileHover={
          reduce
            ? undefined
            : {
                background: "rgba(224,92,32,0.3)",
                borderColor: "var(--orange-mid)",
              }
        }
        whileTap={reduce ? undefined : { scale: 0.97 }}
        transition={
          reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }
        }
        style={{
          width: "120px",
          height: "44px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: "rgba(12,11,10,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "0.5px solid rgba(242,237,232,0.2)",
          borderRadius: "2px",
          color: "var(--white)",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          padding: 0,
        }}
      >
        {copied ? <CheckGlyph size={iconSize} /> : <ShareGlyph size={iconSize} />}
        {showLabel ? (
          <span>{copied ? "Copied!" : "Share"}</span>
        ) : null}
      </motion.button>
    );
  }

  /* medium */
  return (
    <motion.button
      type="button"
      aria-label={copied ? "Link copied" : "Share"}
      className={`btn-ghost ${className ?? ""}`}
      onClick={runShare}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={
        reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }
      }
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.08em",
      }}
    >
      {copied ? <CheckGlyph size={iconSize} /> : <ShareGlyph size={iconSize} />}
      {showLabel ? (
        <span>{copied ? "Copied!" : "Share"}</span>
      ) : null}
    </motion.button>
  );
}
