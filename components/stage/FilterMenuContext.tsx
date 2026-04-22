"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FilterMenuContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
};

const FilterMenuContext = createContext<FilterMenuContextValue | null>(null);

export function FilterMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((o) => !o);
  }, []);

  const value = useMemo(
    () => ({ isOpen, setIsOpen, toggle }),
    [isOpen, toggle],
  );

  return (
    <FilterMenuContext.Provider value={value}>
      {children}
    </FilterMenuContext.Provider>
  );
}

export function useFilterMenu() {
  const ctx = useContext(FilterMenuContext);
  if (!ctx) {
    throw new Error("useFilterMenu must be used within FilterMenuProvider");
  }
  return ctx;
}
