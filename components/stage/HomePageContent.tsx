"use client";

import { ActiveFilterPills } from "./ActiveFilterPills";
import { CollectiveRow } from "./CollectiveRow";
import { DiscoverRow } from "./DiscoverRow";
import { FundRow } from "./FundRow";
import { StageRow } from "./StageRow";

export function HomePageContent() {
  return (
    <>
      <ActiveFilterPills />
      <DiscoverRow />
      <StageRow />
      <CollectiveRow />
      <FundRow />
    </>
  );
}
