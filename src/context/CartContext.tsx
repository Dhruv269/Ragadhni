/**
 * ==============================================================================
 * Ragadhni — Centralized Shopping Cart Context (`src/context/CartContext.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file provides the central state management for Ragadhni's shopping cart.
 * Grounded in "The Contemporary Indian Fashion Editorial" creative direction,
 * it delivers:
 * 1. Global cart state accessible from any component via `useCart()`.
 * 2. Complete item lifecycle: adding, quantity updates, removal, and clearing.
 * 3. Automatic synchronization and persistence with `localStorage`.
 * 4. Free express shipping threshold calculation (₹1,499 benchmark).
 * 5. Global slide-out drawer visibility control (`isOpen`, `openCart`, `closeCart`).
 * 6. Multi-tab synchronization via native `storage` events.
 *
 * PREVENTS:
 * - Duplicate cart states scattered across isolated components.
 * - Cart loss upon browser refresh.
 * - Desynchronization between floating header badge, mobile drawer, and PDP actions.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { CartItem, Product, ProductVariant } from "@/types";

const LOCAL_STORAGE_KEY = "ragadhni_cart_v1";
const FREE_SHIPPING_THRESHOLD = 1499;

export interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  isFreeShipping: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // ----------------------------------------------------------------------------
  // 1. HYDRATION & LOCAL STORAGE PERSISTENCE
  // ----------------------------------------------------------------------------
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Unable to load cart from localStorage", e);
    } finally {
      setIsHydrated(true);
    }

    // Synchronize across multiple open browser tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated)) {
            setItems(updated);
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Unable to persist cart to localStorage", e);
    }
  }, [items, isHydrated]);

  // ----------------------------------------------------------------------------
  // 2. DRAWER CONTROLS
  // ----------------------------------------------------------------------------
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  // ----------------------------------------------------------------------------
  // 3. CART MUTATION ACTIONS
  // ----------------------------------------------------------------------------
  /**
   * Adds an item to the cart. If the same product and variant already exist,
   * updates the quantity rather than creating a duplicate entry.
   * Automatically opens the cart drawer for seamless customer feedback.
   */
  const addItem = useCallback(
    (product: Product, variant: ProductVariant, quantity: number = 1) => {
      if (!variant) return;

      const safeQuantity = Math.max(1, quantity);
      const lineItemId = `${product.id}-${variant.id || variant.size}`;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === lineItemId);

        if (existingIndex > -1) {
          // Update existing item quantity up to max stock limit
          const updated = [...prevItems];
          const existing = updated[existingIndex];
          const maxAllowed = variant.stockQuantity || existing.maxStock || 10;
          const nextQty = Math.min(existing.quantity + safeQuantity, maxAllowed);

          updated[existingIndex] = {
            ...existing,
            quantity: nextQty,
            price: variant.price || product.basePrice,
          };
          return updated;
        }

        // Create new line item
        const newItem: CartItem = {
          id: lineItemId,
          productId: product.id,
          variantId: variant.id,
          title: product.title,
          slug: product.slug,
          image: product.images[0]?.url || "",
          size: variant.size,
          color: variant.color || product.fabric,
          price: variant.price || product.basePrice,
          quantity: safeQuantity,
          maxStock: variant.stockQuantity || 10,
        };

        return [newItem, ...prevItems];
      });

      // Provide immediate visual feedback by opening the cart drawer
      setIsOpen(true);
    },
    []
  );

  /**
   * Removes an item entirely from the cart by its line item ID.
   */
  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  }, []);

  /**
   * Updates an item's quantity. If set to 0 or less, removes the item.
   */
  const updateQuantity = useCallback((cartItemId: string, newQuantity: number) => {
    setItems((prev) => {
      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== cartItemId);
      }
      return prev.map((item) => {
        if (item.id === cartItemId) {
          const clamped = Math.min(newQuantity, item.maxStock || 10);
          return { ...item, quantity: clamped };
        }
        return item;
      });
    });
  }, []);

  /**
   * Empties the entire cart.
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // ----------------------------------------------------------------------------
  // 4. COMPUTED TOTALS & DERIVED VALUES
  // ----------------------------------------------------------------------------
  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      totalItems,
      subtotal,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      freeShippingRemaining,
      isFreeShipping,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      isOpen,
      totalItems,
      subtotal,
      freeShippingRemaining,
      isFreeShipping,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return context;
}

