/**
 * ==============================================================================
 * Ragadhni — Faceted Filter & Sort Sidebar (`FilterSidebar.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component provides the product filtering and sorting controls on Category
 * and Collection pages. It allows shoppers to:
 * 1. Filter by Indian Fabric (Chanderi Silk, Mulmul Cotton, Khadi, Tussar Silk).
 * 2. Filter by Apparel Size (XS, S, M, L, XL, XXL, Free Size).
 * 3. Filter by Price Range (Under ₹2,000, ₹2,000 - ₹3,500, Above ₹3,500).
 * 4. Sort by: Featured, Price (Low to High, High to Low), Rating, and Newest.
 * 5. Clear all active filters with one click.
 *
 * WHY IT EXISTS:
 * In clothing e-commerce, shoppers rarely browse through hundreds of unsorted items.
 * Customers usually have a specific size in mind (e.g. "Size M") or fabric preference
 * (e.g. "Pure Chanderi Silk"). Fast, intuitive faceted filtering makes product discovery
 * effortless and directly increases sales conversion.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Rendered on Category Listing Pages (`/women`, `/men`, `/collections/*`).
 * - Passes selected filter criteria up to the parent catalog page to filter the product list.
 * - Works both as a desktop sidebar and as a slide-over drawer on mobile devices.
 */

"use client";

import React, { useState } from "react";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";

/**
 * FilterState:
 * Defines the shape of active filter selections.
 */
export interface FilterState {
  selectedFabrics: string[];
  selectedSizes: string[];
  priceRange: "all" | "under-2000" | "2000-3500" | "above-3500";
  sortBy: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  availableFabrics: string[];
  availableSizes: string[];
  totalProductCount: number;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  availableFabrics,
  availableSizes,
  totalProductCount,
}: FilterSidebarProps) {
  // Mobile drawer visibility state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /**
   * Toggles a fabric filter on or off:
   * If already selected, it removes it from the array; otherwise, it appends it.
   */
  const toggleFabric = (fabric: string) => {
    const updated = filters.selectedFabrics.includes(fabric)
      ? filters.selectedFabrics.filter((f) => f !== fabric)
      : [...filters.selectedFabrics, fabric];

    onFilterChange({ ...filters, selectedFabrics: updated });
  };

  /**
   * Toggles a size filter on or off.
   */
  const toggleSize = (size: string) => {
    const updated = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];

    onFilterChange({ ...filters, selectedSizes: updated });
  };

  /**
   * Resets all filters back to their default empty states.
   */
  const resetFilters = () => {
    onFilterChange({
      selectedFabrics: [],
      selectedSizes: [],
      priceRange: "all",
      sortBy: "featured",
    });
  };

  const hasActiveFilters =
    filters.selectedFabrics.length > 0 ||
    filters.selectedSizes.length > 0 ||
    filters.priceRange !== "all";

  /*
   * Filter Controls Content:
   * Reused in both the desktop sidebar and the mobile drawer.
   */
  const filterContent = (
    <div className="space-y-8 text-xs text-heritage-charcoal">
      {/* 1. Header & Reset Button */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
        <span className="font-serif text-sm font-semibold uppercase tracking-wider text-heritage-charcoal">
          Filters & Refinements
        </span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 text-heritage-terracotta hover:underline font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 2. Sort By Dropdown */}
      <div className="space-y-2">
        <label htmlFor="sort-select" className="font-semibold uppercase tracking-wider text-[11px] text-heritage-earth">
          Sort Products By
        </label>
        <select
          id="sort-select"
          value={filters.sortBy}
          onChange={(e) =>
            onFilterChange({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
          }
          className="w-full bg-heritage-ivory border border-[#D5C9B5] px-3 py-2 text-xs text-heritage-charcoal focus:outline-none focus:border-heritage-terracotta"
        >
          <option value="featured">Featured Curations</option>
          <option value="newest">Newest Arrivals First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Customer Rating</option>
        </select>
      </div>

      {/* 3. Apparel Size Chips */}
      <div className="space-y-3">
        <h4 className="font-semibold uppercase tracking-wider text-[11px] text-heritage-earth">
          Size
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {availableSizes.map((size) => {
            const isSelected = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`py-2 px-1 text-center font-medium border transition-colors ${
                  isSelected
                    ? "bg-heritage-terracotta text-heritage-ivory border-heritage-terracotta"
                    : "bg-heritage-ivory text-heritage-charcoal border-[#D5C9B5] hover:border-heritage-terracotta"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Fabric Types Checkboxes */}
      <div className="space-y-3">
        <h4 className="font-semibold uppercase tracking-wider text-[11px] text-heritage-earth">
          Authentic Fabric & Weave
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableFabrics.map((fabric) => {
            const isSelected = filters.selectedFabrics.includes(fabric);
            return (
              <label
                key={fabric}
                className="flex items-center space-x-2.5 cursor-pointer hover:text-heritage-terracotta transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleFabric(fabric)}
                  className="rounded-none border-[#D5C9B5] text-heritage-terracotta focus:ring-heritage-terracotta w-3.5 h-3.5"
                />
                <span className="text-xs leading-tight">{fabric}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Price Range Radio Options */}
      <div className="space-y-3">
        <h4 className="font-semibold uppercase tracking-wider text-[11px] text-heritage-earth">
          Price Range (INR)
        </h4>
        <div className="space-y-2">
          {[
            { id: "all", label: "All Prices" },
            { id: "under-2000", label: "Under ₹2,000" },
            { id: "2000-3500", label: "₹2,000 to ₹3,500" },
            { id: "above-3500", label: "Above ₹3,500" },
          ].map((range) => (
            <label
              key={range.id}
              className="flex items-center space-x-2.5 cursor-pointer hover:text-heritage-terracotta transition-colors"
            >
              <input
                type="radio"
                name="priceRange"
                value={range.id}
                checked={filters.priceRange === range.id}
                onChange={() =>
                  onFilterChange({
                    ...filters,
                    priceRange: range.id as FilterState["priceRange"],
                  })
                }
                className="text-heritage-terracotta focus:ring-heritage-terracotta w-3.5 h-3.5"
              />
              <span className="text-xs">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/*
       * MOBILE FILTER TRIGGER BAR:
       * Shown only on screens below 1024px (`lg:hidden`).
       * Lets shoppers open the mobile filter drawer and see the current product count.
       */}
      <div className="lg:hidden flex items-center justify-between py-3 px-4 bg-heritage-sand/40 border border-[#E8DFD0] mb-6">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center space-x-2 text-xs font-medium uppercase tracking-wider text-heritage-charcoal hover:text-heritage-terracotta"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter & Sort {hasActiveFilters && "(Active)"}</span>
        </button>

        <span className="text-xs text-heritage-earth">
          Showing {totalProductCount} {totalProductCount === 1 ? "design" : "designs"}
        </span>
      </div>

      {/* DESKTOP SIDEBAR: Fixed in the left column on desktop screens (`hidden lg:block`) */}
      <aside className="hidden lg:block w-64 shrink-0 bg-heritage-ivory border border-[#E8DFD0] p-6 h-fit sticky top-28">
        {filterContent}
      </aside>

      {/*
       * MOBILE FILTER SLIDE-OVER DRAWER:
       * Appears when `mobileFilterOpen` is true on smaller screens.
       */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Dark backdrop */}
          <div
            className="fixed inset-0 bg-heritage-charcoal/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-heritage-ivory p-6 shadow-2xl flex flex-col z-50 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0] mb-6">
              <span className="font-serif text-base uppercase tracking-wider font-semibold text-heritage-charcoal">
                Filters
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-heritage-earth hover:text-heritage-charcoal"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">{filterContent}</div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mt-6 w-full bg-heritage-terracotta text-heritage-ivory py-3 text-xs uppercase tracking-widest font-medium hover:bg-heritage-rosewood transition-colors"
            >
              Apply Filters ({totalProductCount} Items)
            </button>
          </div>
        </div>
      )}
    </>
  );
}

