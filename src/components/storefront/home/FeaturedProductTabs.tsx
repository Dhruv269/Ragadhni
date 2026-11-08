/**
 * ==============================================================================
 * Ragadhni — Featured Product Tabs Component (`FeaturedProductTabs.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component provides an interactive tabbed product showcase on the homepage.
 * It lets shoppers seamlessly switch between:
 * 1. "Most Coveted Bestsellers" (proven customer favorites with high ratings)
 * 2. "Fresh Off The Loom" (newest seasonal women's arrivals)
 * 3. "All Heirlooms" (the complete women's collection)
 *
 * WHY IT EXISTS:
 * In fashion e-commerce, presenting curated tabs saves customer scroll fatigue,
 * increases product discovery, and keeps the page visually clean and engaging.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Imported by `src/app/page.tsx` for Section F.
 * - Receives `products: Product[]` from `mockProducts` (`src/lib/mockData.ts`).
 * - Renders `<ProductCard />` for each garment item, including color swatches,
 *   wishlist toggle, and quick-add size selection.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/storefront/product/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeaturedProductTabsProps {
  products: Product[];
}

export function FeaturedProductTabs({ products }: FeaturedProductTabsProps) {
  // Active tab state: "bestsellers" | "new-arrivals" | "all"
  const [activeTab, setActiveTab] = useState<"bestsellers" | "new-arrivals" | "all">("bestsellers");

  // Filter products based on selected tab
  const displayedProducts = React.useMemo(() => {
    if (activeTab === "bestsellers") {
      const best = products.filter((p) => p.isBestseller);
      return best.length > 0 ? best.slice(0, 4) : products.slice(0, 4);
    }
    if (activeTab === "new-arrivals") {
      const fresh = products.filter((p) => p.isNewArrival);
      return fresh.length > 0 ? fresh.slice(0, 4) : products.slice(0, 4);
    }
    return products.slice(0, 8);
  }, [products, activeTab]);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Tab Navigation Header */}
      <ScrollReveal variant="fade-up">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-editorial-gold/30 pb-5 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-editorial-terracotta font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5 text-editorial-gold" />
              <span>The Curated Wardrobe</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-editorial-charcoal font-normal tracking-tight">
              Curated Women&apos;s Heirlooms
            </h2>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs uppercase tracking-widest font-medium">
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`px-3 sm:px-4 py-2 transition-all duration-200 border-b-2 ${
                activeTab === "bestsellers"
                  ? "border-editorial-emerald text-editorial-emerald font-semibold"
                  : "border-transparent text-editorial-slate hover:text-editorial-charcoal"
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab("new-arrivals")}
              className={`px-3 sm:px-4 py-2 transition-all duration-200 border-b-2 ${
                activeTab === "new-arrivals"
                  ? "border-editorial-emerald text-editorial-emerald font-semibold"
                  : "border-transparent text-editorial-slate hover:text-editorial-charcoal"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`hidden sm:inline-block px-3 sm:px-4 py-2 transition-all duration-200 border-b-2 ${
                activeTab === "all"
                  ? "border-editorial-emerald text-editorial-emerald font-semibold"
                  : "border-transparent text-editorial-slate hover:text-editorial-charcoal"
              }`}
            >
              All Pieces
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 4-Column Product Grid with subtle staggered reveal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {displayedProducts.map((product, idx) => (
          <ScrollReveal
            key={`${product.id}-${activeTab}`}
            variant="fade-up"
            staggerIndex={idx}
            staggerStep={80}
          >
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom View All Link */}
      <ScrollReveal variant="fade-up" delay={120}>
        <div className="pt-4 text-center">
          <Link
            href="/women"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] font-medium text-editorial-emerald hover:text-editorial-terracotta border-b border-editorial-emerald/40 pb-1 hover:border-editorial-terracotta transition-colors group"
          >
            <span>Explore Complete Women&apos;s Collection ({products.length} Designs)</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}

