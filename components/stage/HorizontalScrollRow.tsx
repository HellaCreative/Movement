import type { CSSProperties, ReactNode } from "react";

const outerStyle: CSSProperties = {
  position: "relative",
  padding: "0 48px 32px",
};

const scrollStyle: CSSProperties = {
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  scrollBehavior: "smooth",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const fadeStyle: CSSProperties = {
  position: "absolute",
  right: "48px",
  top: 0,
  bottom: "32px",
  width: "80px",
  pointerEvents: "none",
  background:
    "linear-gradient(to left, var(--black), rgba(12, 11, 10, 0))",
};

export function HorizontalScrollRow({ children }: { children: ReactNode }) {
  return (
    <div style={outerStyle}>
      <div
        style={scrollStyle}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div style={fadeStyle} aria-hidden />
    </div>
  );
}
