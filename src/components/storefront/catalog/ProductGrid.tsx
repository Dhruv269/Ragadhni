/**
 * ==============================================================================
 * Ragadhni — Product Listing Catalog Grid (`ProductGrid.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders the main product display grid on all Category and Collection pages.
 * It manages:
 * 1. Rendering a 2 to 3 column responsive grid of `<ProductCard />` components.
 * 2. An empty state view ("No garments match your filters") with a 1-click reset button.
 * 3. Product count banner.
 *
 * WHY IT EXISTS:
 * Keeping the catalog grid modular ensures that all collection pages (`/women`,
 * `/collections/ethnic-wear`, etc.) look completely unified and handle edge cases
 * (like zero search results) consistently.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Accepts an array of `products: Product[]` and an optional `onResetFilters` callback.
 * - Renders `<ProductCard />` for each clothing item.
 * - Used inside `/women/page.tsx`, `/women/[category]/page.tsx`, and `/collections/[slug]/page.tsx`.
 */

"use client";

import React from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/storefront/product/ProductCard";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export function ProductGrid({ products, onResetFilters }: ProductGridProps) {
  /*
   * ============================================================================
   * 1. EMPTY STATE HANDLING:
   * If filters are too restrictive and no garments match, show a graceful
   * reassurance message instead of a blank white screen.
   * ============================================================================
   */
  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-4 bg-editorial-ivory/50 border border-editorial-gold/25 space-y-4">
        <h3 className="font-serif text-2xl text-editorial-charcoal font-normal">
          No Garments Match Your Selection
        </h3>
        <p className="text-xs text-editorial-slate max-w-md mx-auto leading-relaxed">
          We could not find any outfits matching all of your active filter criteria.
          Try clearing some filters or exploring another silhouette.
        </p>
        {onResetFilters && (
          <div className="pt-2">
            <Button variant="secondary" size="sm" onClick={onResetFilters}>
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              <span>Reset All Filters</span>
            </Button>
          </div>
        )}
      </div>
    );
  }

  /*
   * ============================================================================
   * 2. MAIN PRODUCT GRID:
   * Responsive columns:
   * - 1 column on mobile screens (< 640px)
   * - 2 columns on small tablets (>= 640px)
   * - 3 columns on desktop (>= 1024px)
   * ============================================================================
   */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {/*
       * Loop through the products array and render one ProductCard for each item.
       * `key={product.id}` guarantees React identifies which card to update efficiently.
       */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

