/**
 * ==============================================================================
 * Ragadhni — Centralized Wishlist Context (`src/context/WishlistContext.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * Provides global state management and persistent storage for customer-saved
 * handcrafted garments across the storefront.
 *
 * FEATURES:
 * 1. Synchronized state between Product Cards, Product Detail Pages, Header Wishlist Popover,
 *    and Mobile Navigation Drawer.
 * 2. Instant toggle with localStorage persistence (`ragadhni_wishlist_v1`).
 * 3. Multi-tab synchronization via native storage events.
 * 4. Safe hydration preventing SSR mismatch errors.
 * 5. Pre-seeded with "rag-001" (Pure Chanderi Silk Anarkali Set) for seamless demo continuity.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const LOCAL_STORAGE_KEY = "ragadhni_wishlist_v1";
const DEFAULT_WISHLIST = ["rag-001"];

export interface WishlistContextValue {
  wishlistIds: string[];
  wishlistCount: number;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>(DEFAULT_WISHLIST);
  const [isHydrated, setIsHydrated] = useState(false);

  // ----------------------------------------------------------------------------
  // 1. HYDRATION & LOCAL STORAGE SYNCHRONIZATION
  // ----------------------------------------------------------------------------
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_WISHLIST));
      }
    } catch (e) {
      console.warn("Unable to read wishlist from localStorage", e);
    } finally {
      setIsHydrated(true);
    }

    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated)) {
            setWishlistIds(updated);
          }
        } catch {
          // Ignore parse errors from concurrent tabs
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save changes to localStorage after initial hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn("Unable to persist wishlist to localStorage", e);
    }
  }, [wishlistIds, isHydrated]);

  // ----------------------------------------------------------------------------
  // 2. MUTATION ACTIONS
  // ----------------------------------------------------------------------------
  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const addToWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  const wishlistCount = useMemo(() => wishlistIds.length, [wishlistIds]);

  const value = useMemo(
    () => ({
      wishlistIds,
      wishlistCount,
      isWishlisted,
      toggleWishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [wishlistIds, wishlistCount, isWishlisted, toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

