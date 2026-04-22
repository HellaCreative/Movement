import type { CSSProperties } from "react";

import type { ArtistTier } from "@/lib/data";

const base: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
  fontFamily: "var(--font-mono)",
  fontSize: "9px",
  fontWeight: 400,
  textTransform: "uppercase",
  padding: "3px 8px",
};

export function DiscoverTierFlag({ tier }: { tier: ArtistTier }) {
  if (tier === "Up & coming") {
    return (
      <div
        style={{
          ...base,
          background: "rgba(12,11,10,0.8)",
          color: "var(--sub)",
        }}
      >
        {tier}
      </div>
    );
  }
  if (tier === "Ready to break") {
    return (
      <div
        style={{
          ...base,
          background: "var(--orange)",
          color: "var(--white)",
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
        background: "rgba(242,237,232,0.08)",
        color: "var(--muted)",
      }}
    >
      {tier}
    </div>
  );
}
