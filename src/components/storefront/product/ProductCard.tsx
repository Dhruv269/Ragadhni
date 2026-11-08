/**
 * ==============================================================================
 * Ragadhni — Editorial Product Card (`ProductCard.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders an individual clothing item card in product grids.
 * It displays:
 * 1. 4:5 vertical fashion editorial photograph with subtle zoom on hover.
 * 2. Textile badge overlay (e.g., "Pure Chanderi Silk", "Organic Mulmul").
 * 3. Bestseller or New Arrival badge.
 * 4. Interactive heart button to add/remove the item from the customer's wishlist.
 * 5. Desktop hover slide-up drawer for fast size selection (`XS` to `XXL`) and "Quick Add".
 * 6. Category label, product title, selling price in INR, and calculated discount percentage.
 *
 * WHY IT EXISTS:
 * In fashion e-commerce, the product card is the most important conversion element.
 * It must show fabric details immediately, load lightning-fast, and make viewing
 * or adding items to the bag effortless.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Accepts a `product: Product` object as a prop (from `src/types/index.ts`).
 * - Used in `src/app/page.tsx` to render the "New Arrivals" catalog showcase.
 * - Uses `formatPrice()` from `src/lib/utils.ts` to format Indian Rupee prices (e.g. `₹3,899`).
 * - Uses `<Badge>` from `src/components/ui/Badge.tsx` for fabric and discount tags.
 * - Clicking the image or title navigates to the Product Detail Page (`/product/[slug]`).
 */

// Marked as a Client Component because it handles wishlist clicks, size selection state, and hover events
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";

/**
 * ProductCardProps:
 * Defines what data the parent component MUST provide when rendering a `<ProductCard />`.
 */
interface ProductCardProps {
  // A complete Product object containing title, prices, images, and sizes
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  // ----------------------------------------------------------------------------
  // COMPONENT STATE
  // ----------------------------------------------------------------------------

  // Tracks whether the shopper has clicked the heart icon on this garment
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Tracks which size chip the shopper has clicked in the desktop quick-add overlay
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Extract unique colors available for this garment
  const uniqueColors = Array.from(
    new Map(
      product.variants
        .filter((v) => v.colorHex || v.color)
        .map((v) => [v.colorHex || v.color, v])
    ).values()
  );

  // Primary cover photo URL (with fallback placeholder if an image is missing)
  const primaryImage = product.images[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80";

  /**
   * Discount Percentage Calculation:
   * Formula: ((Original Price - Selling Price) / Original Price) * 100
   * Example: ((5499 - 3899) / 5499) * 100 = ~29% OFF
   */
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.basePrice) / product.compareAtPrice) * 100)
    : 0;

  return (
    // Outer card container with hover group
    <div className="group relative flex flex-col bg-transparent transition-all duration-300">
      {/*
       * ========================================================================
       * 1. IMAGE CONTAINER (4:5 Ratio):
       * Standard fashion editorial aspect ratio.
       * ========================================================================
       */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-editorial-ivory/50 border border-editorial-gold/25">
        {/* Link wrapping the photo so clicking anywhere opens the product page */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/*
         * TEXTILE & STATUS BADGES (Top-Left):
         * Clean minimal editorial chips with backdrop-blur.
         */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.fabric && (
            <span className="inline-block bg-editorial-paper/90 backdrop-blur-xs text-[9px] uppercase tracking-wider text-editorial-charcoal font-medium px-2 py-0.5 shadow-xs border border-editorial-gold/20">
              {product.fabric}
            </span>
          )}
          {product.isBestseller && (
            <span className="inline-block bg-editorial-gold/20 text-editorial-gold-deep border border-editorial-gold/40 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span className="inline-block bg-editorial-terracotta text-editorial-ivory border border-editorial-terracotta-warm/30 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/*
         * WISHLIST TOGGLE BUTTON (Top-Right):
         */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-editorial-paper/90 backdrop-blur-xs rounded-full text-editorial-charcoal hover:text-editorial-terracotta hover:bg-white transition-all shadow-xs flex items-center justify-center z-10"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? "fill-editorial-terracotta text-editorial-terracotta"
                : "text-editorial-charcoal stroke-[1.75]"
            }`}
          />
        </button>

        {/*
         * QUICK ADD OVERLAY (Slides up smoothly on desktop hover):
         */}
        <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-editorial-emerald-dark/95 via-editorial-emerald/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex-col items-center justify-end z-20">
          {/* Size Selection Chips */}
          <div className="flex items-center space-x-1.5 mb-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedSize(v.size)}
                className={`text-[10px] px-2 py-1 font-medium transition-colors ${
                  selectedSize === v.size
                    ? "bg-editorial-gold text-editorial-emerald-dark font-semibold"
                    : "bg-editorial-paper/90 text-editorial-charcoal hover:bg-white"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>

          {/* Quick Add Action Button */}
          <button
            onClick={() => {
              const targetVariant =
                product.variants.find((v) => v.size === selectedSize) ||
                product.variants[0];
              if (targetVariant) {
                addItem(product, targetVariant, 1);
              }
            }}
            className="w-full bg-editorial-gold hover:bg-editorial-gold-soft text-editorial-emerald-dark text-[11px] uppercase tracking-widest py-2 font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/*
       * ========================================================================
       * 2. PRODUCT DETAILS & PRICING:
       * ========================================================================
       */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Category breadcrumb */}
        <span className="text-[10px] uppercase tracking-[0.2em] text-editorial-slate font-medium">
          {product.categoryName}
        </span>

        {/* Product Title */}
        <h3 className="font-serif text-[15px] sm:text-base tracking-wide text-editorial-charcoal font-normal line-clamp-1 mt-0.5 group-hover:text-editorial-terracotta transition-colors">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Available Color Swatch Dots */}
        {uniqueColors.length > 0 && (
          <div className="flex items-center space-x-1.5 mt-1.5" title={`${uniqueColors.length} color(s) available`}>
            {uniqueColors.map((colorVariant) => (
              <span
                key={colorVariant.id}
                className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                style={{ backgroundColor: colorVariant.colorHex || "#B69A62" }}
                title={colorVariant.color}
              />
            ))}
            <span className="text-[10px] text-editorial-slate font-light truncate">
              {uniqueColors[0]?.color}
            </span>
          </div>
        )}

        {/* Pricing Display */}
        <div className="mt-1.5 flex items-baseline space-x-2">
          {/* Selling Price */}
          <span className="font-sans text-sm font-semibold text-editorial-emerald">
            {formatPrice(product.basePrice)}
          </span>

          {/* Crossed-out original price & discount */}
          {product.compareAtPrice && product.compareAtPrice > product.basePrice && (
            <>
              <span className="font-sans text-xs text-editorial-slate/70 line-through font-normal">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="text-[10px] font-semibold text-editorial-terracotta uppercase tracking-wider">
                ({discountPercent}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
