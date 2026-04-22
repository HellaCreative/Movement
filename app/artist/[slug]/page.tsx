import {
  artistPortraitBySlug,
  getArtistBySlug,
  getArtistProfile,
} from "@/lib/data";
import { ArtistHeader } from "@/components/artist/ArtistHeader";
import { ArtistTabs } from "@/components/artist/ArtistTabs";
import { notFound } from "next/navigation";

type PageProps = {
  params: { slug: string };
};

export default function ArtistProfilePage({ params }: PageProps) {
  const artist = getArtistBySlug(params.slug);
  if (!artist) notFound();

  const profile = getArtistProfile(params.slug);
  const portrait = artistPortraitBySlug[params.slug];

  return (
    <main>
      <ArtistHeader artist={artist} profile={profile} portrait={portrait} />
      <ArtistTabs artist={artist} profile={profile} portrait={portrait} />
    </main>
  );
}
