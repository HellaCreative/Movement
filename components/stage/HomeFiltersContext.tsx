"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getDerivedGenres, tierFilters } from "@/lib/data";

type HomeFiltersContextValue = {
  derivedGenres: string[];
  activeGenre: string;
  setActiveGenre: (v: string) => void;
  locationQuery: string;
  setLocationQuery: (v: string) => void;
  activeTier: string;
  setActiveTier: (v: string) => void;
};

const HomeFiltersContext = createContext<HomeFiltersContextValue | null>(null);

export function HomeFiltersProvider({ children }: { children: ReactNode }) {
  const derivedGenres = useMemo(() => getDerivedGenres(), []);
  const [activeGenre, setActiveGenre] = useState<string>(derivedGenres[0]!);
  const [locationQuery, setLocationQuery] = useState("");
  const [activeTier, setActiveTier] = useState<string>(tierFilters[0]);

  const value = useMemo(
    () => ({
      derivedGenres,
      activeGenre,
      setActiveGenre,
      locationQuery,
      setLocationQuery,
      activeTier,
      setActiveTier,
    }),
    [derivedGenres, activeGenre, locationQuery, activeTier],
  );

  return (
    <HomeFiltersContext.Provider value={value}>
      {children}
    </HomeFiltersContext.Provider>
  );
}

export function useHomeFilters() {
  const ctx = useContext(HomeFiltersContext);
  if (!ctx) {
    throw new Error("useHomeFilters must be used within HomeFiltersProvider");
  }
  return ctx;
}
