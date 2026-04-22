import { Barlow, Barlow_Condensed, DM_Mono } from "next/font/google";

/** Self-hosted via `next/font` — avoids `@import` to fonts.googleapis.com (blocked by some extensions / networks). */
export const fontDisplay = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});
