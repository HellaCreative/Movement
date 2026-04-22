import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const footerStyle: CSSProperties = {
  width: "100%",
  padding: "48px 48px 32px",
  background: "var(--surface)",
  borderTop: "0.5px solid var(--border)",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "48px",
};

const headingStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--sub)",
  marginBottom: "16px",
};

const linkStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  color: "var(--muted)",
  textDecoration: "none",
  transition: "color 150ms ease",
};

const linkStackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const bottomBarStyle: CSSProperties = {
  marginTop: "48px",
  paddingTop: "24px",
  borderTop: "0.5px solid var(--border)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
};

function FooterLink({ children }: { children: ReactNode }) {
  return (
    <Link href="#" style={linkStyle} className="hover:!text-[var(--white)]">
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={gridStyle}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "var(--white)",
            }}
          >
            Band as One
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--orange)",
              marginTop: "8px",
            }}
          >
            Not a platform. A scene.
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 300,
              color: "var(--muted)",
              lineHeight: 1.6,
              marginTop: "12px",
              marginBottom: 0,
              maxWidth: "220px",
            }}
          >
            Artist-owned. Fan-driven. Built for the music and the people who
            love it.
          </p>
        </div>

        <div>
          <div style={headingStyle}>Explore</div>
          <div style={linkStackStyle}>
            <FooterLink>Discover</FooterLink>
            <FooterLink>The Stage</FooterLink>
            <FooterLink>The Collective</FooterLink>
            <FooterLink>The Fund</FooterLink>
          </div>
        </div>

        <div>
          <div style={headingStyle}>For Artists</div>
          <div style={linkStackStyle}>
            <FooterLink>Own your stage</FooterLink>
            <FooterLink>How it works</FooterLink>
            <FooterLink>Artist pricing</FooterLink>
            <FooterLink>The Vault</FooterLink>
            <FooterLink>Read the manifesto</FooterLink>
          </div>
        </div>

        <div>
          <div style={headingStyle}>For Fans</div>
          <div style={linkStackStyle}>
            <FooterLink>How Hype Coins work</FooterLink>
            <FooterLink>Find shows near you</FooterLink>
            <FooterLink>Browse The Collective</FooterLink>
            <FooterLink>Download the app</FooterLink>
          </div>
        </div>
      </div>

      <div style={bottomBarStyle}>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--sub)",
          }}
        >
          © 2026 Band as One. All rights reserved.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <FooterLink>Privacy</FooterLink>
          <FooterLink>Terms</FooterLink>
          <FooterLink>Contact</FooterLink>
        </div>
      </div>
    </footer>
  );
}
