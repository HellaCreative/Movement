import { DiscoveryBar } from "@/components/stage/DiscoveryBar";
import { HomePageContent } from "@/components/stage/HomePageContent";
import { StageHero } from "@/components/stage/StageHero";

export default function Home() {
  return (
    <>
      <StageHero />
      <div
        id="hero-sentinel"
        aria-hidden
        className="pointer-events-none h-px w-full"
      />
      <DiscoveryBar />
      <HomePageContent />
    </>
  );
}
