import Image from "next/image";
import type { CSSProperties } from "react";

type ArtistAvatarProps = {
  name: string;
  portraitSrc?: string;
  swatch: string;
  initials: string;
  /** Square edge length in CSS pixels (e.g. 40 for ticker). */
  sizePx: number;
  /** Initials font size when no photo (defaults scaled from size). */
  initialsSizePx?: number;
  priority?: boolean;
};

export function ArtistAvatar({
  name,
  portraitSrc,
  swatch,
  initials,
  sizePx,
  initialsSizePx = Math.max(11, Math.round(sizePx * 0.35)),
  priority = false,
}: ArtistAvatarProps) {
  const box: CSSProperties = {
    position: "relative",
    width: sizePx,
    height: sizePx,
    borderRadius: "var(--radius)",
    overflow: "hidden",
    backgroundColor: swatch,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const initialsStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: `${initialsSizePx}px`,
    color: "var(--white)",
    lineHeight: 1,
    userSelect: "none",
  };

  if (portraitSrc) {
    return (
      <div style={box}>
        <Image
          src={portraitSrc}
          alt={name}
          width={sizePx}
          height={sizePx}
          className="h-full w-full object-cover"
          sizes={`${sizePx}px`}
          quality={80}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div style={box} role="img" aria-label={name}>
      <span style={initialsStyle} aria-hidden>
        {initials}
      </span>
    </div>
  );
}
