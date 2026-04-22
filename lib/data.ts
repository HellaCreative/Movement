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

// --- Artist page: rich profile, exclusives, merch (append-only) ---

export type ExclusiveContent = {
  id: string;
  artistSlug: string;
  title: string;
  type:
    | "Demo"
    | "Early Access"
    | "Live Recording"
    | "Studio Session"
    | "Behind the Scenes"
    | "Fan Chat";
  date: string;
  description: string;
  duration: string;
  thumbnailImage: string;
  videoFile?: string;
  subscribersOnly: boolean;
  isNew: boolean;
};

export type MerchItem = {
  id: string;
  artistSlug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Apparel" | "Vinyl" | "Accessories" | "Limited";
  sizes?: string[];
  inStock: boolean;
  soldOut: boolean;
  showSpecific?: string;
  isNew: boolean;
};

export type MusicSource = {
  platform: "Spotify" | "SoundCloud" | "YouTube" | "Apple Music" | "Bandcamp";
  url: string;
  embedUrl: string;
  available: boolean;
};

export type ArtistProfile = {
  slug: string;
  bio: string;
  longBio: string;
  subscriberCount: number;
  backedByCount: number;
  subscriberPrice: number;
  location: {
    city: string;
    province: string;
    country: string;
  };
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    spotify?: string;
    soundcloud?: string;
    bandcamp?: string;
  };
  musicSources: MusicSource[];
  heroImages: string[];
  galleryImages: string[];
  /** Studio gatefold — optional pinned note above long bio */
  pinnedNote?: string;
  /** Studio gatefold — pull quote below gallery */
  pullQuote?: string;
  pullQuoteContext?: string;
};

export const marenFoldProfile: ArtistProfile = {
  slug: "maren-fold",
  bio: "Indie folk from Halifax. Writing songs about the coast, the cold, and the people who stay.",
  longBio:
    "Maren Fold is a Halifax-based singer-songwriter whose music sits at the intersection of coastal folk and raw electric intimacy. Her songs are built from the kind of details most people walk past — a tide chart on a kitchen wall, a voice on a ferry intercom, the particular silence of a Maritime winter. She has been performing since 2019, releasing two EPs independently and building a fiercely loyal following across Atlantic Canada. Her live shows are known for their stillness: just her, a guitar, and a room that stops talking.",
  subscriberCount: 847,
  backedByCount: 1,
  subscriberPrice: 8,
  location: {
    city: "Halifax",
    province: "Nova Scotia",
    country: "Canada",
  },
  socialLinks: {
    instagram: "https://instagram.com/marenfold",
    tiktok: "https://tiktok.com/@marenfold",
    spotify: "https://open.spotify.com/artist/marenfold",
    soundcloud: "https://soundcloud.com/marenfold",
    bandcamp: "https://marenfold.bandcamp.com",
  },
  musicSources: [
    {
      platform: "Spotify",
      url: "https://open.spotify.com/artist/marenfold",
      embedUrl: "https://open.spotify.com/embed/artist/marenfold",
      available: true,
    },
    {
      platform: "SoundCloud",
      url: "https://soundcloud.com/marenfold",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https://soundcloud.com/marenfold",
      available: true,
    },
    {
      platform: "Bandcamp",
      url: "https://marenfold.bandcamp.com",
      embedUrl: "https://bandcamp.com/EmbeddedPlayer/album=marenfold",
      available: true,
    },
  ],
  heroImages: [
    "/images_tmp/Maren_Fold/pexels-shelaghmurphy-1666816.jpg",
    "/images_tmp/Maren_Fold/pexels-thibault-trillet-44912-167579.jpg",
    "/images_tmp/Maren_Fold/pexels-cottonbro-5650693.jpg",
  ],
  galleryImages: [
    "/images_tmp/Maren_Fold/pexels-cottonbro-5650948.jpg",
  ],
  pinnedNote:
    "If you're here, you're early. I'm still figuring out how much of the process to show — but I'd rather show too much than hide the wrong thing.",
};

export const marenFoldExclusiveContent: ExclusiveContent[] = [
  {
    id: "mf-ec-1",
    artistSlug: "maren-fold",
    title: "Tundra EP — Demo Sessions",
    type: "Demo",
    date: "Apr 18, 2026",
    description:
      "Raw demos from the Tundra EP sessions. Four songs before the production touched them.",
    duration: "18:42",
    thumbnailImage: "/images_tmp/Maren_Fold/pexels-cottonbro-5650693.jpg",
    videoFile: "/videos/maren-fold/studio-session-tundra-ep.mp4",
    subscribersOnly: true,
    isNew: true,
  },
  {
    id: "mf-ec-2",
    artistSlug: "maren-fold",
    title: "Live at the Seahorse — Full Set",
    type: "Live Recording",
    date: "Apr 12, 2026",
    description:
      "Complete recording from the April Seahorse show. 45 minutes, no cuts.",
    duration: "44:55",
    thumbnailImage: "/images_tmp/Maren_Fold/pexels-thibault-trillet-44912-167579.jpg",
    videoFile: "/videos/maren-fold/performance-live-seahorse.mp4",
    subscribersOnly: true,
    isNew: true,
  },
  {
    id: "mf-ec-3",
    artistSlug: "maren-fold",
    title: "Writing Session — April",
    type: "Studio Session",
    date: "Apr 8, 2026",
    description:
      "Two hours in the room. Watch a song get written from a single line.",
    duration: "1:52:14",
    thumbnailImage: "/images_tmp/Maren_Fold/pexels-cottonbro-5650948.jpg",
    videoFile: "/videos/maren-fold/writing-session-april.mp4",
    subscribersOnly: true,
    isNew: false,
  },
  {
    id: "mf-ec-4",
    artistSlug: "maren-fold",
    title: "New Single — Early Access",
    type: "Early Access",
    date: "Apr 5, 2026",
    description:
      "The new single before it hits any platform. Subscribers get it three weeks early.",
    duration: "3:47",
    thumbnailImage: "/images_tmp/Maren_Fold/pexels-melvin-buezo-1253763-2529174.jpg",
    videoFile: "/videos/maren-fold/early-access-new-single.mp4",
    subscribersOnly: true,
    isNew: false,
  },
  {
    id: "mf-ec-5",
    artistSlug: "maren-fold",
    title: "Acoustic Set — Backstage at Ship",
    type: "Behind the Scenes",
    date: "Mar 28, 2026",
    description:
      "Three songs on a phone camera backstage at The Ship. Unplanned. Real.",
    duration: "11:20",
    thumbnailImage: "/images_tmp/Maren_Fold/pexels-sam-hofman-817359426-29872936.jpg",
    videoFile: "/videos/maren-fold/acoustic-set-backstage.mp4",
    subscribersOnly: false,
    isNew: false,
  },
  {
    id: "mf-ec-6",
    artistSlug: "maren-fold",
    title: "Fan Chat — March",
    type: "Fan Chat",
    date: "Mar 15, 2026",
    description:
      "One hour open chat. Questions about the EP, touring, and why she hates reverb.",
    duration: "58:03",
    thumbnailImage: "/images_tmp/Maren_Fold/pexels-pavel-danilyuk-7802615.jpg",
    videoFile: "/videos/maren-fold/fan-chat-march.mp4",
    subscribersOnly: true,
    isNew: false,
  },
];

export const marenFoldEvents: StageEvent[] = [
  {
    id: "mf-ev-1",
    artistSlug: "maren-fold",
    artistName: "Maren Fold",
    type: "Show",
    date: "May 3",
    venue: "The Seahorse Tavern",
    city: "Halifax, NS",
    genre: "Indie Folk",
    detail: "$15",
  },
  {
    id: "mf-ev-2",
    artistSlug: "maren-fold",
    artistName: "Maren Fold",
    type: "Show",
    date: "May 14",
    venue: "The Carleton",
    city: "Halifax, NS",
    genre: "Indie Folk",
    detail: "$12",
  },
  {
    id: "mf-ev-3",
    artistSlug: "maren-fold",
    artistName: "Maren Fold",
    type: "Show",
    date: "Jun 7",
    venue: "The Marquee Club",
    city: "Halifax, NS",
    genre: "Indie Folk",
    detail: "$18",
  },
  {
    id: "mf-ev-4",
    artistSlug: "maren-fold",
    artistName: "Maren Fold",
    type: "Stream",
    date: "Thu 8pm",
    venue: "Live writing session",
    city: "Online",
    genre: "Indie Folk",
    detail: "Subscribers",
  },
  {
    id: "mf-ev-5",
    artistSlug: "maren-fold",
    artistName: "Maren Fold",
    type: "Stream",
    date: "Sat 7pm",
    venue: "Album playback stream",
    city: "Online",
    genre: "Indie Folk",
    detail: "Free",
  },
  {
    id: "mf-ev-6",
    artistSlug: "maren-fold",
    artistName: "Maren Fold",
    type: "Live chat",
    date: "Fri 9pm",
    venue: "Subscriber Q&A",
    city: "Online",
    genre: "Indie Folk",
    detail: "Subscribers",
  },
];

export const marenFoldMerch: MerchItem[] = [
  {
    id: "mf-m-1",
    artistSlug: "maren-fold",
    name: "Tundra EP — Vinyl",
    description:
      "Limited pressing. 180g black vinyl, printed inner sleeve, hand-numbered.",
    price: 34,
    image: "/images_tmp/Maren_Fold/pexels-cottonbro-5650693.jpg",
    category: "Vinyl",
    inStock: true,
    soldOut: false,
    isNew: true,
  },
  {
    id: "mf-m-2",
    artistSlug: "maren-fold",
    name: "Seahorse May 3 — Tour Tee",
    description:
      "Show-specific shirt. Black heavyweight cotton, show date and venue on the back.",
    price: 38,
    image: "/images_tmp/Maren_Fold/pexels-shelaghmurphy-1666816.jpg",
    category: "Apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    soldOut: false,
    showSpecific: "Seahorse Tavern — May 3, 2026",
    isNew: true,
  },
  {
    id: "mf-m-3",
    artistSlug: "maren-fold",
    name: "Tide Chart Tee",
    description:
      "The coast design. Sand coloured with a hand-drawn tide chart graphic.",
    price: 35,
    image: "/images_tmp/Maren_Fold/pexels-thibault-trillet-44912-167579.jpg",
    category: "Apparel",
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    soldOut: false,
    isNew: false,
  },
  {
    id: "mf-m-4",
    artistSlug: "maren-fold",
    name: "Embroidered Cap",
    description:
      "Six-panel, unstructured. Maren Fold script embroidered in cream.",
    price: 28,
    image: "/images_tmp/Maren_Fold/pexels-cottonbro-5650948.jpg",
    category: "Accessories",
    inStock: true,
    soldOut: false,
    isNew: false,
  },
  {
    id: "mf-m-5",
    artistSlug: "maren-fold",
    name: "Signed Lyric Sheet — Cold Harbour",
    description:
      "Handwritten lyrics to Cold Harbour. Signed, numbered edition of 50.",
    price: 45,
    image: "/images_tmp/Maren_Fold/pexels-pavel-danilyuk-7802615.jpg",
    category: "Limited",
    inStock: true,
    soldOut: false,
    isNew: false,
  },
  {
    id: "mf-m-6",
    artistSlug: "maren-fold",
    name: "First EP — Cassette",
    description:
      "The 2021 debut EP on cassette. Limited to original 200 run — 14 left.",
    price: 16,
    image: "/images_tmp/Maren_Fold/pexels-melvin-buezo-1253763-2529174.jpg",
    category: "Limited",
    inStock: true,
    soldOut: false,
    isNew: false,
  },
  {
    id: "mf-m-7",
    artistSlug: "maren-fold",
    name: "Tundra Hoodie",
    description:
      "Heavyweight pullover. Tundra EP artwork on the back, small logo front.",
    price: 68,
    image: "/images_tmp/Maren_Fold/pexels-sam-hofman-817359426-29872936.jpg",
    category: "Apparel",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: false,
    soldOut: true,
    isNew: false,
  },
];

export function getArtistProfile(slug: string): ArtistProfile | undefined {
  const profiles: Record<string, ArtistProfile> = {
    "maren-fold": marenFoldProfile,
  };
  return profiles[slug];
}

export function getArtistExclusiveContent(slug: string): ExclusiveContent[] {
  const allContent: Record<string, ExclusiveContent[]> = {
    "maren-fold": marenFoldExclusiveContent,
  };
  return allContent[slug] ?? [];
}

export function getArtistEvents(slug: string): StageEvent[] {
  return stageEvents
    .filter((e) => e.artistSlug === slug)
    .concat(
      slug === "maren-fold"
        ? marenFoldEvents.filter(
            (e) => !stageEvents.find((s) => s.id === e.id),
          )
        : [],
    );
}

export function getArtistMerch(slug: string): MerchItem[] {
  const allMerch: Record<string, MerchItem[]> = {
    "maren-fold": marenFoldMerch,
  };
  return allMerch[slug] ?? [];
}

export type StudioPost = {
  id: string;
  artistSlug: string;
  date: string;
  type: "text" | "image" | "video" | "quote" | "clip";
  body?: string;
  image?: string;
  videoFile?: string;
  caption?: string;
  isNew?: boolean;
};

export const marenFoldStudioPosts: StudioPost[] = [
  {
    id: "mf-sp-1",
    artistSlug: "maren-fold",
    date: "Apr 21, 2026",
    type: "text",
    body: "Had macaroni and cheese before the Seahorse show last week. Not even a little bit sorry. The show was good. The mac was better.",
    isNew: true,
  },
  {
    id: "mf-sp-2",
    artistSlug: "maren-fold",
    date: "Apr 19, 2026",
    type: "image",
    image: "/images_tmp/Maren_Fold/pexels-cottonbro-5650948.jpg",
    caption: "Writing room. 11pm. The song is almost there.",
    isNew: true,
  },
  {
    id: "mf-sp-3",
    artistSlug: "maren-fold",
    date: "Apr 17, 2026",
    type: "quote",
    body: "The second verse is always where the song decides what it actually wants to be.",
  },
  {
    id: "mf-sp-4",
    artistSlug: "maren-fold",
    date: "Apr 14, 2026",
    type: "image",
    image: "/images_tmp/Maren_Fold/pexels-pavel-danilyuk-7802615.jpg",
    caption: "Soundcheck. Empty rooms are my favourite rooms.",
  },
  {
    id: "mf-sp-5",
    artistSlug: "maren-fold",
    date: "Apr 12, 2026",
    type: "text",
    body: "The Tundra EP demos are done. Four songs. I cried a little bit. Subscribers get them first — dropping Thursday.",
  },
  {
    id: "mf-sp-6",
    artistSlug: "maren-fold",
    date: "Apr 9, 2026",
    type: "clip",
    videoFile: "/videos/maren-fold/acoustic-set-backstage.mp4",
    image: "/images_tmp/Maren_Fold/pexels-sam-hofman-817359426-29872936.jpg",
    caption:
      "Three songs backstage at The Ship. Unplanned. My hands were shaking.",
  },
  {
    id: "mf-sp-7",
    artistSlug: "maren-fold",
    date: "Apr 7, 2026",
    type: "text",
    body: "Someone asked me last night why all my songs are about leaving. I said they're not about leaving. They're about the moment before you decide.",
  },
  {
    id: "mf-sp-8",
    artistSlug: "maren-fold",
    date: "Apr 3, 2026",
    type: "image",
    image: "/images_tmp/Maren_Fold/pexels-shelaghmurphy-1666816.jpg",
    caption: "Last night. Halifax. This city.",
  },
  {
    id: "mf-sp-9",
    artistSlug: "maren-fold",
    date: "Mar 31, 2026",
    type: "quote",
    body: "I write songs about the coast because the coast doesn't lie to you.",
  },
  {
    id: "mf-sp-10",
    artistSlug: "maren-fold",
    date: "Mar 28, 2026",
    type: "text",
    body: "New single is mixed. Mastered Tuesday. Subscribers get it three weeks before it hits anywhere else. That's the deal I want to keep making.",
  },
];

export function getArtistStudioPosts(slug: string): StudioPost[] {
  const all: Record<string, StudioPost[]> = {
    "maren-fold": marenFoldStudioPosts,
  };
  return all[slug] ?? [];
}
