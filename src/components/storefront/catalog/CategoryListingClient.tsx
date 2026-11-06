/**
 * ==============================================================================
 * Ragadhni — Interactive Category Listing Client (`CategoryListingClient.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component orchestrates the complete shopping experience on Category and
 * Collection Product Listing Pages (PLPs).
 * It manages:
 * 1. Filtering logic: Checks which garments match selected fabrics, sizes, and prices.
 * 2. Sorting logic: Sorts matching garments by price, date, rating, or featured status.
 * 3. Dynamic facet extraction: Automatically calculates which fabrics and sizes exist
 *    in the current collection so the filter sidebar only shows relevant options.
 * 4. Rendering the breadcrumb trail, collection header, `<FilterSidebar />`, and `<ProductGrid />`.
 *
 * WHY IT EXISTS:
 * By keeping filtering and sorting calculations in this client component, the user gets
 * instantaneous updates (under 50ms) when clicking a filter checkbox without needing
 * a slow server round-trip or page reload.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Used by `/women/page.tsx`, `/men/page.tsx`, `/women/[category]/page.tsx`, and `/collections/[slug]/page.tsx`.
 * - Imports `<FilterSidebar>` from `FilterSidebar.tsx`.
 * - Imports `<ProductGrid>` from `ProductGrid.tsx`.
 * - Uses `<Container>` from `src/components/ui/Container.tsx`.
 */

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { FilterSidebar, FilterState } from "./FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { ChevronRight } from "lucide-react";

interface CategoryListingClientProps {
  initialProducts: Product[];
  pageTitle: string;
  pageDescription?: string;
  categoryBadge?: string;
  breadcrumbParent?: { label: string; href: string };
}

export function CategoryListingClient({
  initialProducts,
  pageTitle,
  pageDescription,
  categoryBadge,
  breadcrumbParent,
}: CategoryListingClientProps) {
  // Current active filter and sort state
  const [filters, setFilters] = useState<FilterState>({
    selectedFabrics: [],
    selectedSizes: [],
    priceRange: "all",
    sortBy: "featured",
  });

  /**
   * 1. EXTRACT AVAILABLE FABRICS & SIZES:
   * Dynamically scans `initialProducts` to find all unique fabrics and sizes
   * that exist in this specific category.
   */
  const availableFabrics = useMemo(() => {
    const fabrics = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.fabric) fabrics.add(p.fabric);
    });
    return Array.from(fabrics).sort();
  }, [initialProducts]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    initialProducts.forEach((p) => {
      p.variants.forEach((v) => {
        if (v.size) sizes.add(v.size);
      });
    });
    // Standard size ordering
    const order = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "Custom"];
    return Array.from(sizes).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [initialProducts]);

  /**
   * 2. FILTER & SORT COMPUTATION (`useMemo`):
   * Applies active filter checkboxes and sorting rules to `initialProducts`.
   * Re-computes only when `filters` or `initialProducts` change.
   */
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by Fabric
    if (filters.selectedFabrics.length > 0) {
      result = result.filter((p) => filters.selectedFabrics.includes(p.fabric));
    }

    // Filter by Size
    if (filters.selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => filters.selectedSizes.includes(v.size) && v.stockQuantity > 0)
      );
    }

    // Filter by Price Range
    if (filters.priceRange === "under-2000") {
      result = result.filter((p) => p.basePrice < 2000);
    } else if (filters.priceRange === "2000-3500") {
      result = result.filter((p) => p.basePrice >= 2000 && p.basePrice <= 3500);
    } else if (filters.priceRange === "above-3500") {
      result = result.filter((p) => p.basePrice > 3500);
    }

    // Apply Sorting
    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (filters.sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sortBy === "newest") {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [initialProducts, filters]);

  return (
    <div className="py-6 sm:py-10">
      <Container>
        {/*
         * ========================================================================
         * 1. BREADCRUMBS:
         * ========================================================================
         */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-heritage-earth mb-6"
        >
          <Link href="/" className="hover:text-heritage-terracotta transition-colors">
            Home
          </Link>
          {breadcrumbParent && (
            <>
              <ChevronRight className="w-3 h-3 text-heritage-sand" />
              <Link
                href={breadcrumbParent.href}
                className="hover:text-heritage-terracotta transition-colors"
              >
                {breadcrumbParent.label}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-heritage-sand" />
          <span className="text-heritage-charcoal font-medium">{pageTitle}</span>
        </nav>

        {/*
         * ========================================================================
         * 2. CATEGORY EDITORIAL BANNER:
         * ========================================================================
         */}
        <div className="mb-10 pb-6 border-b border-[#E3D8C6] space-y-2">
          {categoryBadge && (
            <span className="text-[10px] uppercase tracking-[0.25em] text-heritage-terracotta font-semibold">
              {categoryBadge}
            </span>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-normal">
            {pageTitle}
          </h1>
          {pageDescription && (
            <p className="text-xs sm:text-sm text-heritage-earth max-w-2xl font-light leading-relaxed">
              {pageDescription}
            </p>
          )}
        </div>

        {/*
         * ========================================================================
         * 3. CATALOG LAYOUT: SIDEBAR + PRODUCT GRID:
         * ========================================================================
         */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Faceted Filter Controls (Sidebar on desktop, drawer on mobile) */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            availableFabrics={availableFabrics}
            availableSizes={availableSizes}
            totalProductCount={filteredProducts.length}
          />

          {/* Product Grid Area */}
          <main className="flex-1 w-full">
            {/* Desktop Count Banner */}
            <div className="hidden lg:flex items-center justify-between pb-4 mb-6 border-b border-[#EFE7D8] text-xs text-heritage-earth">
              <span>
                Showing <strong>{filteredProducts.length}</strong> handcrafted {filteredProducts.length === 1 ? "design" : "designs"}
              </span>
              <span>Sorted by {filters.sortBy.replace("-", " ")}</span>
            </div>

            {/* The Catalog Cards Grid */}
            <ProductGrid
              products={filteredProducts}
              onResetFilters={() =>
                setFilters({
                  selectedFabrics: [],
                  selectedSizes: [],
                  priceRange: "all",
                  sortBy: "featured",
                })
              }
            />
          </main>
        </div>
      </Container>
    </div>
  );
}

