/**
 * Prototype seed data — matches `first-files/cursor-build-brief.md` sample tables and placeholders.
 */

export type ArtistTier = "Up & coming" | "Ready to break" | "Established";

export type Artist = {
  slug: string;
  name: string;
  genre: string;
  city: string;
  tier: ArtistTier;
  pulseActivity: string;
  claims: number;
};

export const artists: Artist[] = [
  {
    slug: "maren-fold",
    name: "Maren Fold",
    genre: "Indie Folk",
    city: "Halifax, NS",
    tier: "Ready to break",
    pulseActivity: "New vault track dropped — subscribers only",
    claims: 2140,
  },
  {
    slug: "pale-wire",
    name: "Pale Wire",
    genre: "Post-punk",
    city: "Toronto, ON",
    tier: "Up & coming",
    pulseActivity: "Merch vote open — choose the next shirt",
    claims: 318,
  },
  {
    slug: "velvet-static",
    name: "Velvet Static",
    genre: "Alt-rock",
    city: "Vancouver, BC",
    tier: "Established",
    pulseActivity: "Writing session Thursday, subscribers first",
    claims: 18900,
  },
  {
    slug: "gravel-hours",
    name: "Gravel Hours",
    genre: "Country",
    city: "Calgary, AB",
    tier: "Up & coming",
    pulseActivity: "New single — early access before platforms",
    claims: 84,
  },
  {
    slug: "otis-brook",
    name: "Otis Brook",
    genre: "Acoustic",
    city: "Memphis, TN",
    tier: "Ready to break",
    pulseActivity: "Acoustic set recorded last night",
    claims: 4210,
  },
  {
    slug: "tender-iron",
    name: "Tender Iron",
    genre: "Americana",
    city: "Nashville, TN",
    tier: "Established",
    pulseActivity: "Radio show live this Friday",
    claims: 22400,
  },
];

/**
 * Local photos under `public/images_tmp/` — mapped 1:1 to prototype artists.
 * Next.js serves these as `/images_tmp/<filename>`.
 */
export const artistPortraitBySlug: Record<string, string> = {
  "maren-fold": "/images_tmp/chris-zhang-uGh-hHVPRYI-unsplash.jpg",
  "pale-wire": "/images_tmp/glenn-van-de-wiel-DWHSc8o8K9Y-unsplash.jpg",
  "velvet-static": "/images_tmp/music-hq-1s9TY8FRBNs-unsplash.jpg",
  "gravel-hours": "/images_tmp/pexels-a-darmel-7715760.jpg",
  "otis-brook": "/images_tmp/pexels-amaria-22604951.jpg",
  "tender-iron": "/images_tmp/pexels-anna-pou-8132808.jpg",
};

export function getArtistPortrait(slug: string): string | undefined {
  return artistPortraitBySlug[slug];
}

export type Show = {
  /** ISO date string (local prototype; show times not specified). */
  dateIso: string;
  month: string;
  day: number;
  artistName: string;
  venue: string;
  genre: string;
  priceDisplay: string;
};

export const showsNearHalifax: Show[] = [
  {
    dateIso: "2026-05-03",
    month: "May",
    day: 3,
    artistName: "Maren Fold",
    venue: "The Seahorse Tavern",
    genre: "Folk",
    priceDisplay: "$15",
  },
  {
    dateIso: "2026-05-09",
    month: "May",
    day: 9,
    artistName: "Pale Wire",
    venue: "The Marquee Club",
    genre: "Punk",
    priceDisplay: "$12",
  },
  {
    dateIso: "2026-05-17",
    month: "May",
    day: 17,
    artistName: "Velvet Static",
    venue: "Casino Nova Scotia Stage",
    genre: "Alt-rock",
    priceDisplay: "$28",
  },
];

export type Label = {
  founderName: string;
  labelName: string;
  backing: string;
  genre: string;
};

export const labels: Label[] = [
  {
    founderName: "Velvet Static",
    labelName: "Backcountry Records",
    backing: "Maren Fold, Gravel Hours + 2 others",
    genre: "Alt-rock",
  },
  {
    founderName: "River Kite",
    labelName: "Midnight Faction",
    backing: "Pale Wire, The Lowland Set",
    genre: "Punk",
  },
  {
    founderName: "Dusk Harbor",
    labelName: "Open Water",
    backing: "Gravel Hours + 3 emerging artists",
    genre: "Country",
  },
];

export type BackedArtistEntry = {
  slug: string;
  backedBy: string;
  labelName: string;
};

export const backedArtists: BackedArtistEntry[] = [
  {
    slug: "maren-fold",
    backedBy: "Velvet Static",
    labelName: "Backcountry Records",
  },
  {
    slug: "gravel-hours",
    backedBy: "Velvet Static",
    labelName: "Backcountry Records",
  },
  {
    slug: "pale-wire",
    backedBy: "River Kite",
    labelName: "Midnight Faction",
  },
];

export type StageEvent = {
  id: string;
  artistSlug: string;
  artistName: string;
  type: "Show" | "Stream" | "Live chat";
  date: string;
  venue: string;
  city: string;
  genre: string;
  detail: string;
};

export const stageEvents: StageEvent[] = [
  {
    id: "1",
    artistSlug: "maren-fold",
    artistName: "Maren Fold",
    type: "Show",
    date: "May 3",
    venue: "Seahorse Tavern",
    city: "Halifax, NS",
    genre: "Folk",
    detail: "$15",
  },
  {
    id: "2",
    artistSlug: "velvet-static",
    artistName: "Velvet Static",
    type: "Stream",
    date: "Thu 8pm",
    venue: "Live session",
    city: "Vancouver, BC",
    genre: "Alt-rock",
    detail: "Subscribers",
  },
  {
    id: "3",
    artistSlug: "pale-wire",
    artistName: "Pale Wire",
    type: "Show",
    date: "May 9",
    venue: "Marquee Club",
    city: "Halifax, NS",
    genre: "Punk",
    detail: "$12",
  },
  {
    id: "4",
    artistSlug: "tender-iron",
    artistName: "Tender Iron",
    type: "Live chat",
    date: "Fri 9pm",
    venue: "Band chat",
    city: "Nashville, TN",
    genre: "Americana",
    detail: "Free",
  },
  {
    id: "5",
    artistSlug: "gravel-hours",
    artistName: "Gravel Hours",
    type: "Stream",
    date: "Sat 7pm",
    venue: "Writing session",
    city: "Calgary, AB",
    genre: "Country",
    detail: "Subscribers",
  },
  {
    id: "6",
    artistSlug: "otis-brook",
    artistName: "Otis Brook",
    type: "Show",
    date: "May 17",
    venue: "Casino NS Stage",
    city: "Halifax, NS",
    genre: "Acoustic",
    detail: "$28",
  },
];

/** Prototype: logged-in fan coin balance (brief). */
export const prototypeCoinBalance = 240 as const;

/** Prototype: shows / copy use this location (brief). */
export const prototypeLocationLabel = "Halifax" as const;
export const prototypeLocationPhrase = "Shows near Halifax" as const;

/** Hero / platform stats — single source for Stage hero and Fund copy. */
export const platformStats = {
  artistsOnStage: 4812,
  percentToArtist: 87,
  hypeCoinsInCirculation: 2_100_000,
} as const;

export function formatHypeCoinsUsdShort(usd: number): string {
  return `$${(usd / 1_000_000).toFixed(1)}M`;
}

/** Three stats for the Stage hero — labels and display values derived from `platformStats`. */
export const platformStatsHero = [
  {
    label: "Artists",
    value: platformStats.artistsOnStage.toLocaleString("en-US"),
  },
  {
    label: "Goes to the artist",
    value: "80%",
  },
  {
    label: "Hype Coins earned",
    value: formatHypeCoinsUsdShort(platformStats.hypeCoinsInCirculation),
  },
] as const;

/** Stage hero marketing copy. */
export const stageHeroCopy = {
  eyebrow: "Not a platform. A scene.",
  headlineLine1: "Artist-owned.",
  headlineLine2: "Fan-driven.",
  headlineLine3: "Band.",
  subtext:
    "The show ends. The connection doesn't. Band as One is where artists own the room — and fans finally belong to it.",
  primaryCta: "Own your stage →",
  secondaryCta: "Read the manifesto",
  featuredArtistTag: "Featured artist",
  claimsLabel: "claims",
} as const;

/** Fund page — reuse hero coin total. */
export const fundPlatformStats = {
  totalHypeCoinsInCirculation: platformStats.hypeCoinsInCirculation,
} as const;

/** Tier filter tabs — The Stage controls (brief). */
export const tierFilters = [
  "All",
  "Up & coming",
  "Ready to break",
  "Established",
] as const;

export function getDerivedGenres(): string[] {
  const genres = artists.map((a) => a.genre);
  const unique = Array.from(new Set(genres)).sort();
  return ["All genres", ...unique];
}

/** Full-width ticker: `name / city — pulse` (brief: real names and pulse lines). */
export const tickerItems: string[] = artists.map(
  (a) => `${a.name} / ${a.city} — ${a.pulseActivity}`,
);

/** Look up artist by slug for `/artist/[slug]`. */
export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}
