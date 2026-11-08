/**
 * ==============================================================================
 * Ragadhni — Centralized Search Context (`src/context/SearchContext.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * Provides global state management for Ragadhni's Live Product Search experience.
 * Grounded in "The Contemporary Indian Fashion Editorial" creative direction, it:
 * 1. Coordinates search overlay visibility across the storefront (`isSearchOpen`, `openSearch`, `closeSearch`).
 * 2. Manages the active search query state (`searchQuery`, `setSearchQuery`, `clearSearch`).
 * 3. Prevents state conflicts between the shopping bag drawer and the search overlay.
 * 4. Enables any component (Header, Mobile Drawer, CTA banners) to trigger search with optional preset queries.
 */

"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useCart } from "@/context/CartContext";

export interface SearchContextValue {
  isSearchOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { closeCart } = useCart();

  const openSearch = useCallback(
    (initialQuery?: string) => {
      // Ensure cart drawer is closed when opening search
      closeCart();
      if (typeof initialQuery === "string") {
        setSearchQuery(initialQuery);
      }
      setIsSearchOpen(true);
    },
    [closeCart]
  );

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => {
      if (!prev) {
        closeCart();
      }
      return !prev;
    });
  }, [closeCart]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const value = useMemo<SearchContextValue>(
    () => ({
      isSearchOpen,
      searchQuery,
      setSearchQuery,
      openSearch,
      closeSearch,
      toggleSearch,
      clearSearch,
    }),
    [isSearchOpen, searchQuery, openSearch, closeSearch, toggleSearch, clearSearch]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a <SearchProvider>");
  }
  return context;
}

