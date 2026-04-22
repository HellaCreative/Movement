import type { ArtistTier } from "@/lib/data";

export function matchesSearch(
  artist: { name: string; genre: string; city: string },
  query: string,
): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    artist.name.toLowerCase().includes(q) ||
    artist.genre.toLowerCase().includes(q) ||
    artist.city.toLowerCase().includes(q)
  );
}

export function matchesGenre(value: string, activeGenre: string): boolean {
  if (activeGenre === "All genres") return true;
  return value.toLowerCase().includes(activeGenre.toLowerCase());
}

/** Live text search against city strings (e.g. "Halifax, NS"). */
export function matchesLocationQuery(
  city: string,
  locationQuery: string,
): boolean {
  return (
    locationQuery === "" ||
    city.toLowerCase().includes(locationQuery.toLowerCase())
  );
}

export function matchesTier(tier: ArtistTier, activeTier: string): boolean {
  if (activeTier === "All") return true;
  return tier === activeTier;
}
