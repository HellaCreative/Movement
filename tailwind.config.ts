import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        orange: "var(--orange)",
        "orange-dim": "var(--orange-dim)",
        "orange-mid": "var(--orange-mid)",
        white: "var(--white)",
        muted: "var(--muted)",
        sub: "var(--sub)",
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
        "ghost-border-hover": "var(--ghost-border-hover)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      transitionTimingFunction: {
        movement: "var(--ease)",
      },
      transitionDuration: {
        hover: "var(--duration-hover)",
        active: "var(--duration-active)",
      },
      borderRadius: {
        movement: "var(--radius)",
      },
    },
  },
  plugins: [],
};

export default config;
