/**
 * ==============================================================================
 * Ragadhni — Live Product Search Overlay (`src/components/storefront/search/SearchOverlay.tsx`)
 * ==============================================================================
 *
 * WHAT THIS COMPONENT DOES:
 * This component provides an editorial search overlay for Ragadhni.
 * Grounded in "The Contemporary Indian Fashion Editorial" creative direction
 * (70% modern luxury editorial, 30% traditional Indian heritage), it provides:
 * 1. An expansive, high-contrast modal canvas with frosted Deep Emerald backdrop.
 * 2. Instant, real-time product search matching across titles, categories, fabrics,
 *    weaves, surface ornamentation, tags, and garment descriptions.
 * 3. Curated discovery initial state with popular Indian ethnic keyword chips and
 *    trending collection edits.
 * 4. High-fidelity results presentation with photo thumbnails, fabrics, and pricing.
 * 5. Full keyboard accessibility: Escape to close, Arrow Up/Down navigation, and Enter to open.
 * 6. Polished zero-results fallback with search reset and recommended queries.
 * 7. Background body scroll locking and responsive desktop/mobile layouts.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Powered by `useSearch()` from `src/context/SearchContext.tsx`.
 * - Reads product catalog from `mockProducts` in `src/lib/mockData.ts`.
 * - Navigates to existing product detail pages (`/product/[slug]`).
 * - Mounted in `src/app/layout.tsx` and triggered by `Header.tsx` and `MobileDrawer.tsx`.
 */

"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Tag,
  ArrowUpRight,
  CornerDownLeft,
} from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { mockProducts } from "@/lib/mockData";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

// Curated high-intent Indian ethnic search keywords
const POPULAR_SEARCH_TERMS = [
  "Chanderi Silk",
  "Organic Mulmul",
  "Handloom Saree",
  "Festive Anarkali",
  "Banarasi Lehenga",
  "Salwar Suit",
  "Kundan Jewellery",
  "Flared Palazzo",
];

// Curated collection shortcuts
const CURATED_SHORTCUTS = [
  { label: "Handcrafted Sarees", href: "/women/sarees", note: "Pure Chanderi & Banarasi" },
  { label: "Kurtas & Kurta Sets", href: "/women/kurtis", note: "Everyday Mulmul & Silk" },
  { label: "Festive Occasion Wear", href: "/collections/festive-wear", note: "Zari, Gota & Brocades" },
  { label: "New Season Drops", href: "/collections/new-arrivals", note: "Fresh Artisan Weaves" },
];

export function SearchOverlay() {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery, clearSearch } = useSearch();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Active keyboard selection index (-1 means search input is focused)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // ----------------------------------------------------------------------------
  // 1. DYNAMIC SEARCH MATCHING ALGORITHM
  // ----------------------------------------------------------------------------
  const filteredProducts = useMemo<Product[]>(() => {
    const clean = searchQuery.trim().toLowerCase();
    if (!clean) return [];

    const tokens = clean.split(/\s+/).filter(Boolean);

    return mockProducts
      .map((product) => {
        // Build combined search surface string
        const titleLower = product.title.toLowerCase();
        const categoryLower = (product.categoryName || "").toLowerCase();
        const fabricLower = (product.fabric || "").toLowerCase();
        const weaveLower = (product.weave || "").toLowerCase();
        const workLower = (product.work || "").toLowerCase();
        const descLower = (product.description || "").toLowerCase();
        const tagsJoined = (product.tags || []).join(" ").toLowerCase();
        const colorsJoined = product.variants.map((v) => v.color).join(" ").toLowerCase();

        const fullSearchable = `${titleLower} ${categoryLower} ${fabricLower} ${weaveLower} ${workLower} ${descLower} ${tagsJoined} ${colorsJoined}`;

        // Verify all query tokens exist in the searchable corpus
        const matchesAll = tokens.every((token) => fullSearchable.includes(token));
        if (!matchesAll) return { product, score: 0 };

        // Calculate relevance score
        let score = 10;
        if (titleLower === clean) score += 100;
        else if (titleLower.includes(clean)) score += 60;
        else if (tokens.some((t) => titleLower.includes(t))) score += 40;

        if (tagsJoined.includes(clean)) score += 30;
        if (categoryLower.includes(clean)) score += 25;
        if (fabricLower.includes(clean)) score += 20;

        return { product, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product);
  }, [searchQuery]);

  // Reset keyboard selection whenever search query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  // ----------------------------------------------------------------------------
  // 2. FOCUS & BODY SCROLL LOCK
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      // Auto-focus search input with micro-delay for smooth animation
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isSearchOpen]);

  // ----------------------------------------------------------------------------
  // 3. KEYBOARD ACCESSIBILITY (ESCAPE, ARROWS, ENTER)
  // ----------------------------------------------------------------------------
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
        return;
      }

      if (!filteredProducts.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev < filteredProducts.length - 1 ? prev + 1 : 0;
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : filteredProducts.length - 1;
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && filteredProducts[selectedIndex]) {
          const target = filteredProducts[selectedIndex];
          closeSearch();
          router.push(`/product/${target.slug}`);
        } else if (filteredProducts.length > 0) {
          // Default to first match on Enter if none specifically selected
          const target = filteredProducts[0];
          closeSearch();
          router.push(`/product/${target.slug}`);
        }
      }
    },
    [filteredProducts, selectedIndex, closeSearch, router]
  );

  // Scroll active item into view when navigating via keyboard
  useEffect(() => {
    if (selectedIndex >= 0 && resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search Collection"
      onKeyDown={handleKeyDown}
    >
      {/* ---------------------------------------------------------------------- */}
      {/* BACKDROP OVERLAY                                                       */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="fixed inset-0 bg-[#0B2620]/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* ---------------------------------------------------------------------- */}
      {/* SEARCH MODAL CONTAINER                                                 */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative min-h-screen sm:min-h-0 flex items-start justify-center p-0 sm:p-4 sm:pt-10 lg:pt-14 z-10">
        <div
          className="w-full sm:max-w-4xl min-h-screen sm:min-h-0 sm:rounded-2xl bg-[#FAF6EE] border-0 sm:border border-editorial-gold/35 shadow-editorial-float flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
          style={{ backgroundColor: "#FAF6EE" }}
        >
          {/* ================================================================== */}
          {/* A. SEARCH INPUT HEADER                                             */}
          {/* ================================================================== */}
          <div className="p-4 sm:p-6 border-b border-editorial-gold/30 bg-editorial-ivory/80 flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-editorial-emerald/10 text-editorial-emerald shrink-0">
              <Search className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search handcrafted sarees, kurtas, anarkalis, silk weaves, fabrics..."
                className="w-full bg-transparent font-serif text-lg sm:text-2xl text-editorial-charcoal placeholder:font-sans placeholder:text-xs sm:placeholder:text-sm placeholder:text-editorial-slate/60 focus:outline-none tracking-wide"
                aria-label="Search inquiry"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {/* Clear Query Button */}
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1.5 rounded-full text-editorial-slate hover:text-editorial-charcoal hover:bg-editorial-paper transition-colors shrink-0"
                aria-label="Clear search inquiry"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Close Overlay Button */}
            <button
              type="button"
              onClick={closeSearch}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-editorial-gold/35 text-xs text-editorial-charcoal hover:bg-editorial-paper hover:text-editorial-terracotta transition-colors shrink-0 flex items-center space-x-1 font-medium"
              aria-label="Close search overlay"
            >
              <span className="hidden sm:inline">Close</span>
              <kbd className="hidden sm:inline text-[9px] bg-editorial-ivory px-1.5 py-0.5 rounded-xs border border-editorial-gold/30 text-editorial-slate font-sans">
                ESC
              </kbd>
              <X className="w-4 h-4 sm:hidden" />
            </button>
          </div>

          {/* ================================================================== */}
          {/* B. SEARCH BODY: RESULTS, INITIAL DISCOVERY, OR EMPTY STATE         */}
          {/* ================================================================== */}
          <div
            ref={resultsContainerRef}
            className="flex-1 overflow-y-auto max-h-[calc(85vh-90px)] p-4 sm:p-6 space-y-6"
          >
            {/* ---------------------------------------------------------------- */}
            {/* STATE 1: INITIAL DISCOVERY STATE (Query is empty)                */}
            {/* ---------------------------------------------------------------- */}
            {!searchQuery.trim() ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Popular Indian Fashion Keyword Chips */}
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-3.5 h-3.5 text-editorial-gold" />
                    <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-editorial-charcoal">
                      Popular Search Inquiries
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCH_TERMS.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                          inputRef.current?.focus();
                        }}
                        className="text-xs px-3 py-1.5 rounded-full bg-editorial-ivory/80 border border-editorial-gold/30 text-editorial-charcoal hover:border-editorial-terracotta hover:text-editorial-terracotta hover:bg-white transition-all shadow-2xs font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Curated Collection Shortcuts */}
                <div className="space-y-2.5 pt-2 border-t border-editorial-gold/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-editorial-charcoal flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-editorial-gold" />
                      <span>Curated Wardrobe Edits</span>
                    </span>
                    <span className="text-[10px] text-editorial-slate">Direct Navigation</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CURATED_SHORTCUTS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeSearch}
                        className="group p-3 rounded-xl bg-editorial-ivory/50 border border-editorial-gold/25 hover:border-editorial-terracotta hover:bg-white transition-all flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-serif text-sm font-medium text-editorial-emerald group-hover:text-editorial-terracotta transition-colors">
                            {item.label}
                          </h4>
                          <p className="text-[11px] text-editorial-slate font-light mt-0.5">
                            {item.note}
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-editorial-gold group-hover:text-editorial-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Trending Atelier Highlights Preview */}
                <div className="space-y-3 pt-2 border-t border-editorial-gold/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-editorial-charcoal">
                      Trending in Atelier
                    </span>
                    <Link
                      href="/collections/bestsellers"
                      onClick={closeSearch}
                      className="text-xs text-editorial-emerald hover:text-editorial-terracotta font-medium transition-colors"
                    >
                      View All Bestsellers &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {mockProducts
                      .filter((p) => p.isBestseller || p.isFeatured)
                      .slice(0, 3)
                      .map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={closeSearch}
                          className="group p-2.5 rounded-xl bg-editorial-ivory/40 border border-editorial-gold/25 hover:border-editorial-gold hover:bg-white transition-all flex sm:flex-col gap-3"
                        >
                          <div className="relative w-20 h-24 sm:w-full sm:aspect-[4/5] rounded-lg overflow-hidden bg-editorial-ivory shrink-0 border border-editorial-gold/20">
                            <Image
                              src={product.images[0]?.url || ""}
                              alt={product.title}
                              fill
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 80px, 260px"
                            />
                            {product.isBestseller && (
                              <span className="absolute top-2 left-2 bg-editorial-gold/20 text-editorial-gold-deep border border-editorial-gold/40 text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-xs shadow-2xs backdrop-blur-xs">
                                Bestseller
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <span className="text-[9px] uppercase tracking-wider text-editorial-slate font-medium">
                              {product.categoryName}
                            </span>
                            <h5 className="font-serif text-xs sm:text-sm text-editorial-charcoal group-hover:text-editorial-terracotta transition-colors line-clamp-1 mt-0.5">
                              {product.title}
                            </h5>
                            <span className="font-sans text-xs sm:text-sm font-semibold text-editorial-emerald mt-1">
                              {formatPrice(product.basePrice)}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              /* -------------------------------------------------------------- */
              /* STATE 2: MATCHING RESULTS FOUND                                */
              /* -------------------------------------------------------------- */
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Result header & keyboard helper */}
                <div className="flex items-center justify-between pb-2 border-b border-editorial-gold/25 text-xs">
                  <span className="text-editorial-slate-dark">
                    Found <strong className="text-editorial-emerald font-semibold">{filteredProducts.length}</strong>{" "}
                    {filteredProducts.length === 1 ? "handcrafted piece" : "handcrafted pieces"} matching &ldquo;{searchQuery}&rdquo;
                  </span>
                  <span className="hidden sm:flex items-center space-x-1.5 text-[11px] text-editorial-slate">
                    <span>Use</span>
                    <kbd className="px-1.5 py-0.5 rounded-xs bg-editorial-ivory border border-editorial-gold/30 font-sans text-[10px]">
                      &uarr;
                    </kbd>
                    <kbd className="px-1.5 py-0.5 rounded-xs bg-editorial-ivory border border-editorial-gold/30 font-sans text-[10px]">
                      &darr;
                    </kbd>
                    <span>to navigate,</span>
                    <kbd className="px-1.5 py-0.5 rounded-xs bg-editorial-ivory border border-editorial-gold/30 font-sans text-[10px] flex items-center">
                      <CornerDownLeft className="w-2.5 h-2.5 mr-0.5" />
                      Enter
                    </kbd>
                  </span>
                </div>

                {/* Results Grid / List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredProducts.map((product, idx) => {
                    const isSelected = selectedIndex === idx;
                    const discountPercent =
                      product.compareAtPrice && product.compareAtPrice > product.basePrice
                        ? Math.round(((product.compareAtPrice - product.basePrice) / product.compareAtPrice) * 100)
                        : null;

                    return (
                      <Link
                        key={product.id}
                        data-index={idx}
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className={`group relative p-3 rounded-xl border transition-all flex sm:flex-col gap-3.5 ${
                          isSelected
                            ? "border-editorial-terracotta bg-white ring-2 ring-editorial-terracotta/40 shadow-editorial"
                            : "border-editorial-gold/25 bg-editorial-ivory/50 hover:border-editorial-gold hover:bg-white"
                        }`}
                      >
                        {/* Thumbnail image */}
                        <div className="relative w-24 h-32 sm:w-full sm:aspect-[4/5] rounded-lg overflow-hidden bg-editorial-ivory shrink-0 border border-editorial-gold/25">
                          <Image
                            src={product.images[0]?.url || ""}
                            alt={product.title}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 96px, 320px"
                          />
                          {product.fabric && (
                            <span className="absolute bottom-1.5 left-1.5 bg-editorial-paper/95 text-[9px] uppercase tracking-wider font-medium text-editorial-charcoal px-1.5 py-0.5 rounded-xs border border-editorial-gold/20 shadow-2xs">
                              {product.fabric}
                            </span>
                          )}
                        </div>

                        {/* Garment Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-editorial-slate font-medium block">
                              {product.categoryName}
                            </span>
                            <h4 className="font-serif text-sm sm:text-base text-editorial-charcoal group-hover:text-editorial-terracotta transition-colors line-clamp-1 mt-0.5 font-normal">
                              {product.title}
                            </h4>
                            <p className="text-[11px] text-editorial-slate line-clamp-1 mt-0.5 font-light">
                              {product.work || product.weave || product.description}
                            </p>
                          </div>

                          {/* Pricing & Discount */}
                          <div className="mt-2 pt-2 border-t border-editorial-gold/20 flex items-baseline justify-between">
                            <div className="flex items-baseline space-x-2">
                              <span className="font-sans text-sm font-semibold text-editorial-emerald">
                                {formatPrice(product.basePrice)}
                              </span>
                              {product.compareAtPrice && product.compareAtPrice > product.basePrice && (
                                <span className="text-xs text-editorial-slate/70 line-through">
                                  {formatPrice(product.compareAtPrice)}
                                </span>
                              )}
                            </div>

                            {discountPercent && (
                              <span className="text-[10px] font-semibold text-editorial-terracotta uppercase tracking-wider">
                                {discountPercent}% OFF
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Enter indicator when active via keyboard */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-editorial-terracotta text-editorial-ivory text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full shadow-xs flex items-center space-x-1">
                            <span>Press Enter</span>
                            <CornerDownLeft className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* -------------------------------------------------------------- */
              /* STATE 3: NO RESULTS FOUND (Polished Editorial Fallback)         */
              /* -------------------------------------------------------------- */
              <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-full bg-editorial-ivory border border-editorial-gold/40 flex items-center justify-center text-editorial-gold-deep shadow-xs">
                  <Search className="w-7 h-7 stroke-[1.5]" />
                </div>

                <div className="space-y-1.5 max-w-md">
                  <h3 className="font-serif text-xl sm:text-2xl text-editorial-charcoal font-normal">
                    No Handcrafted Pieces Found
                  </h3>
                  <p className="text-xs sm:text-sm text-editorial-slate leading-relaxed font-light">
                    We could not locate any garments matching &ldquo;<strong>{searchQuery}</strong>&rdquo;. Try searching by traditional weave (e.g. <em>Chanderi</em>, <em>Banarasi</em>) or browse our curated categories.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="py-2 px-4 rounded-lg bg-editorial-emerald text-editorial-ivory text-xs font-semibold uppercase tracking-wider hover:bg-editorial-terracotta transition-colors shadow-xs"
                  >
                    Clear Search
                  </button>
                  <Link
                    href="/women"
                    onClick={closeSearch}
                    className="py-2 px-4 rounded-lg border border-editorial-gold/40 text-editorial-charcoal text-xs font-medium uppercase tracking-wider hover:bg-editorial-ivory transition-colors"
                  >
                    Browse All Women&apos;s Wear
                  </Link>
                </div>

                {/* Popular alternatives chips */}
                <div className="pt-6 border-t border-editorial-gold/25 w-full max-w-sm">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-editorial-slate font-semibold mb-2">
                    Try Searching For:
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {["Chanderi Silk", "Mulmul Kurti", "Banarasi Saree", "Festive Lehenga"].map((alt) => (
                      <button
                        key={alt}
                        type="button"
                        onClick={() => {
                          setSearchQuery(alt);
                          inputRef.current?.focus();
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-editorial-ivory border border-editorial-gold/30 text-editorial-charcoal hover:border-editorial-terracotta hover:text-editorial-terracotta transition-colors"
                      >
                        {alt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

