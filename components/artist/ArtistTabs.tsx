"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import type { Artist, ArtistProfile } from "@/lib/data";
import { backedArtists } from "@/lib/data";

import { EventsTab } from "./tabs/EventsTab";
import { ExclusiveTab } from "./tabs/ExclusiveTab";
import { StudioTab } from "./tabs/StudioTab";

type ArtistTabsProps = {
  artist: Artist;
  profile: ArtistProfile | undefined;
  portrait: string | undefined;
};

type TabDef = { id: string; label: string };

function buildTabs(artist: Artist, profile: ArtistProfile | undefined): TabDef[] {
  const base: TabDef[] = [
    { id: "studio", label: "The Studio" },
    { id: "events", label: "Events" },
    { id: "exclusive", label: "Exclusive" },
    { id: "merch", label: "Merch" },
    { id: "music", label: "Music" },
  ];
  const inCollective = backedArtists.some((b) => b.slug === artist.slug);
  const showCollective =
    profile != null &&
    (profile.backedByCount > 0 || inCollective);
  if (!showCollective) return base;
  const next = [...base];
  next.splice(next.length - 1, 0, { id: "collective", label: "Collective" });
  return next;
}

const tabContentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, delay: 0.05, ease: [0, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as const },
  },
};

function TabPlaceholder({ label }: { label: string }) {
  return (
    <div style={{ padding: "48px 48px 64px" }}>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 300,
          color: "var(--muted)",
        }}
      >
        {label} — coming soon.
      </p>
    </div>
  );
}

export function ArtistTabs({ artist, profile, portrait }: ArtistTabsProps) {
  const tabs = useMemo(() => buildTabs(artist, profile), [artist, profile]);
  const [activeTab, setActiveTab] = useState("studio");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: "52px",
          zIndex: 80,
          background: "rgba(12,11,10,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "0.5px solid var(--border)",
          padding: "0 48px",
          display: "flex",
          alignItems: "flex-end",
          gap: 0,
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                position: "relative",
                padding: "16px 24px 14px",
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isActive ? "var(--white)" : "var(--muted)",
                transition: "color 200ms var(--ease)",
              }}
              className={
                !isActive ? "hover:!text-[rgba(242,237,232,0.7)]" : undefined
              }
            >
              {tab.label}
              {isActive ? (
                <motion.div
                  layoutId="artist-tab-underline"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "var(--orange)",
                  }}
                />
              ) : null}
              {!isActive && hoveredTab === tab.id ? (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    left: "50%",
                    width: "4px",
                    height: "4px",
                    marginLeft: "-2px",
                    borderRadius: "50%",
                    background: "var(--orange)",
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          role="tabpanel"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={tabContentVariants}
          style={{ background: "var(--black)" }}
        >
          {activeTab === "studio" ? (
            <StudioTab
              artist={artist}
              profile={profile}
              portrait={portrait}
            />
          ) : null}
          {activeTab === "events" ? (
            <EventsTab artistSlug={artist.slug} />
          ) : null}
          {activeTab === "exclusive" ? (
            <ExclusiveTab artistSlug={artist.slug} isSubscribed={false} />
          ) : null}
          {activeTab === "merch" ? <TabPlaceholder label="Merch" /> : null}
          {activeTab === "music" ? <TabPlaceholder label="Music" /> : null}
          {activeTab === "collective" ? (
            <TabPlaceholder label="Collective" />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
