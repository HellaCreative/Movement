"use client";

import type { ReactNode } from "react";

import { FilterMenuProvider } from "@/components/stage/FilterMenuContext";
import { HomeFiltersProvider } from "@/components/stage/HomeFiltersContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <HomeFiltersProvider>
      <FilterMenuProvider>{children}</FilterMenuProvider>
    </HomeFiltersProvider>
  );
}
