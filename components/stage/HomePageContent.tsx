"use client";

import { CollectiveRow } from "./CollectiveRow";
import { DiscoverRow } from "./DiscoverRow";
import { FundRow } from "./FundRow";
import { StageRow } from "./StageRow";

export function HomePageContent() {
  return (
    <>
      <DiscoverRow />
      <StageRow />
      <CollectiveRow />
      <FundRow />
    </>
  );
}
