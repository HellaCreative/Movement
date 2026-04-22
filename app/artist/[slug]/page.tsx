import { PlaceholderShell } from "@/components/PlaceholderShell";
import { getArtistBySlug } from "@/lib/data";
import { notFound } from "next/navigation";

type PageProps = {
  params: { slug: string };
};

export default function ArtistProfilePage({ params }: PageProps) {
  const artist = getArtistBySlug(params.slug);
  if (!artist) notFound();

  return (
    <PlaceholderShell title={artist.name}>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          fontWeight: 300,
          lineHeight: "var(--leading-body)",
          maxWidth: "480px",
          margin: 0,
        }}
      >
        Artist profile placeholder — content coming soon.
      </p>
    </PlaceholderShell>
  );
}
