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

/**
 * ProductCardProps:
 * Defines what data the parent component MUST provide when rendering a `<ProductCard />`.
 */
interface ProductCardProps {
  // A complete Product object containing title, prices, images, and sizes
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // ----------------------------------------------------------------------------
  // COMPONENT STATE
  // ----------------------------------------------------------------------------

  // Tracks whether the shopper has clicked the heart icon on this garment
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Tracks which size chip the shopper has clicked in the desktop quick-add overlay
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

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
    <div className="group relative flex flex-col bg-heritage-ivory transition-all duration-300">
      {/*
       * ========================================================================
       * 1. IMAGE CONTAINER (4:5 Ratio):
       * `aspect-[4/5]`: Standard fashion editorial aspect ratio.
       * Allows full drape of kurtas, sarees, and dupattas without awkward cropping.
       * ========================================================================
       */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-heritage-sand/30">
        {/* Link wrapping the photo so clicking anywhere opens the product page */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/*
           * Next.js <Image /> component:
           * Automatically resizes, compresses, and generates WebP images for fast mobile loads.
           * `group-hover:scale-105`: Image subtly expands by 5% when the mouse hovers over the card.
           */}
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/*
         * TEXTILE & PROMOTION BADGES (Top-Left):
         * Displays the fabric name (e.g. "Pure Chanderi Silk") and status badges.
         */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.fabric && (
            <Badge variant="outline" className="shadow-xs backdrop-blur-xs">
              {product.fabric}
            </Badge>
          )}
          {product.isBestseller && (
            <Badge variant="gold">Bestseller</Badge>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <Badge variant="terracotta">New Arrival</Badge>
          )}
        </div>

        {/*
         * WISHLIST TOGGLE BUTTON (Top-Right):
         * Clicking toggles `isWishlisted` state.
         * `e.preventDefault()` prevents the click from navigating to the product page.
         */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 p-2 bg-heritage-ivory/90 backdrop-blur-xs rounded-full text-heritage-charcoal hover:text-heritage-terracotta hover:bg-heritage-ivory transition-all shadow-sm z-10"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? "fill-heritage-terracotta text-heritage-terracotta"
                : "text-heritage-charcoal stroke-[1.75]"
            }`}
          />
        </button>

        {/*
         * QUICK ADD OVERLAY (Slides up on desktop hover):
         * `hidden lg:flex`: Hidden on mobile to prevent clutter; active on desktop screens.
         * `translate-y-full group-hover:translate-y-0`: Glides smoothly up from the bottom.
         */}
        <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-heritage-charcoal/80 via-heritage-charcoal/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex-col items-center justify-end">
          {/* Size Selection Chips */}
          <div className="flex items-center space-x-1.5 mb-2">
            {/* Loop through available sizes (XS, S, M, L, XL) */}
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedSize(v.size)}
                className={`text-[11px] px-2 py-1 font-medium transition-colors ${
                  selectedSize === v.size
                    ? "bg-heritage-terracotta text-heritage-ivory"
                    : "bg-heritage-ivory/90 text-heritage-charcoal hover:bg-heritage-ivory"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>

          {/* Quick Add Action Button */}
          <button
            onClick={() => {
              alert(`Added ${product.title} (${selectedSize || product.variants[0]?.size}) to your bag.`);
            }}
            className="w-full bg-heritage-ivory text-heritage-charcoal hover:bg-heritage-terracotta hover:text-heritage-ivory text-xs uppercase tracking-widest py-2 font-medium flex items-center justify-center space-x-2 transition-colors"
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
      <div className="pt-3.5 pb-2 flex flex-col flex-1">
        {/* Category breadcrumb (e.g., "Lehengas & Anarkalis") */}
        <span className="text-[10px] uppercase tracking-widest text-heritage-earth/80">
          {product.categoryName}
        </span>

        {/* Product Title (Cormorant Garamond serif with single-line clamp) */}
        <h3 className="font-serif text-sm tracking-wide text-heritage-charcoal font-normal line-clamp-1 mt-1 group-hover:text-heritage-terracotta transition-colors">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Pricing & Discount Display */}
        <div className="mt-2 flex items-baseline space-x-2">
          {/* Selling Price */}
          <span className="font-sans text-sm font-semibold text-heritage-charcoal">
            {formatPrice(product.basePrice)}
          </span>

          {/* Crossed-out original price & discount percentage badge (if on sale) */}
          {product.compareAtPrice && product.compareAtPrice > product.basePrice && (
            <>
              <span className="font-sans text-xs text-heritage-earth/60 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="text-[10px] font-semibold text-heritage-maroon uppercase tracking-wider">
                ({discountPercent}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
