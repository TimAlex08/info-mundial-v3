"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface LayoutState {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isFlyoutOpen: boolean;
  setFlyoutOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const LayoutStateContext = createContext<LayoutState | null>(null);

export function useLayoutState() {
  const ctx = useContext(LayoutStateContext);
  if (!ctx) throw new Error("useLayoutState must be used within LayoutStateProvider");
  return ctx;
}

export function LayoutStateProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFlyoutOpen, setFlyoutOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <LayoutStateContext.Provider
      value={{ isMenuOpen, setMenuOpen, isFlyoutOpen, setFlyoutOpen, isSearchOpen, setSearchOpen }}
    >
      {children}
    </LayoutStateContext.Provider>
  );
}
