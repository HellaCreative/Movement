import Link from "next/link";
import type { ReactNode } from "react";

type PlaceholderShellProps = {
  title: string;
  children?: ReactNode;
};

/**
 * Minimal dark-theme placeholder for routes that are not built yet.
 */
export function PlaceholderShell({ title, children }: PlaceholderShellProps) {
  return (
    <main
      style={{
        minHeight: "60vh",
        padding: "48px",
        background: "var(--black)",
        color: "var(--muted)",
      }}
    >
      <p style={{ margin: "0 0 24px" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--orange)",
            textDecoration: "none",
          }}
        >
          ← The Stage
        </Link>
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "32px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "var(--white)",
          lineHeight: 1.1,
          margin: "0 0 16px",
        }}
      >
        {title}
      </h1>
      {children ?? (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: "var(--leading-body)",
            maxWidth: "480px",
            margin: 0,
          }}
        >
          Placeholder — content coming soon.
        </p>
      )}
    </main>
  );
}
