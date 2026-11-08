/**
 * ==============================================================================
 * Ragadhni — Editorial Product Card (`ProductCard.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders an individual handcrafted garment card across all catalog
 * grids (Homepage Curated Wardrobe, Master Women's PLP, Category PLPs, Collection
 * PLPs, and Related Heirlooms on PDPs).
 *
 * DESIGN SYSTEM ALIGNMENT ("The Contemporary Indian Fashion Editorial"):
 * 1. 4:5 vertical portrait aspect ratio with fine Antique Gold borders.
 * 2. Dual-image lookbook presentation: smooth crossfade to secondary atelier shot
 *    on desktop hover when an alternate image exists; graceful zoom on single images.
 * 3. Graceful fallback placeholder when an image fails to load.
 * 4. Authentic product badges derived strictly from existing product attributes:
 *    - Handloom/Textile badge (e.g., "Pure Chanderi Silk", "Organic Mulmul")
 *    - Antique Gold "Bestseller" badge
 *    - Burnt Terracotta "New Arrival" badge
 * 5. Centralized Wishlist integration with persistent localStorage storage,
 *    isolated click propagation, and real-time synchronization with Header & PDP.
 * 6. Quick Add Infrastructure:
 *    - Desktop: Smooth slide-up size picker drawer on hover with instant size chips
 *      and active variant selection.
 *    - Mobile/Tablet: Touch-friendly Quick Add trigger that opens an inline size
 *      selector without hover dependency.
 *    - 1-click add for single-size / "Free Size" heirlooms (sarees, dupattas, potlis).
 *    - Immediate feedback: "Added to Bag ✓" state + automatic Cart Drawer opening.
 * 7. Typography Hierarchy:
 *    - Editorial category & craft kicker
 *    - Serif title with line clamping and terracotta hover transition
 *    - Micro color swatches with active shade indicator
 *    - Deep Emerald selling price with strikethrough original price & discount percentage.
 */

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Heart, ShoppingBag, Check, X, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80";

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // ----------------------------------------------------------------------------
  // COMPONENT STATE
  // ----------------------------------------------------------------------------
  // Selected variant size for Quick Add (defaults to first variant's size)
  const defaultSize = product.variants[0]?.size || "Free Size";
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);

  // Temporary feedback state after an item is added
  const [isJustAdded, setIsJustAdded] = useState(false);

  // Mobile inline size picker toggle state
  const [mobileSizePickerOpen, setMobileSizePickerOpen] = useState(false);

  // Image load error fallback state
  const [imgLoadError, setImgLoadError] = useState(false);

  // Wishlist state for this specific product
  const isSaved = isWishlisted(product.id);

  // ----------------------------------------------------------------------------
  // PRODUCT DATA COMPUTATIONS
  // ----------------------------------------------------------------------------
  // Primary cover image & secondary lookbook image
  const primaryImage = product.images[0]?.url || FALLBACK_IMAGE;
  const secondaryImage =
    product.images.length > 1 && product.images[1]?.url ? product.images[1].url : null;

  // Check if product is single-size / Free Size
  const isSingleSize =
    product.variants.length <= 1 ||
    product.variants.every((v) => v.size.toLowerCase() === "free size");

  // Extract unique available color variants for swatch rendering
  const uniqueColors = useMemo(() => {
    return Array.from(
      new Map(
        product.variants
          .filter((v) => v.colorHex || v.color)
          .map((v) => [v.colorHex || v.color, v])
      ).values()
    );
  }, [product.variants]);

  // Discount percentage calculation
  const discountPercent = useMemo(() => {
    if (product.compareAtPrice && product.compareAtPrice > product.basePrice) {
      return Math.round(
        ((product.compareAtPrice - product.basePrice) / product.compareAtPrice) * 100
      );
    }
    return 0;
  }, [product.compareAtPrice, product.basePrice]);

  // ----------------------------------------------------------------------------
  // ACTION HANDLERS
  // ----------------------------------------------------------------------------
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickAdd = (targetSize?: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const sizeToUse = targetSize || selectedSize;
    const targetVariant =
      product.variants.find((v) => v.size === sizeToUse) || product.variants[0];

    if (targetVariant) {
      addItem(product, targetVariant, 1);
      setIsJustAdded(true);
      setMobileSizePickerOpen(false);

      setTimeout(() => {
        setIsJustAdded(false);
      }, 1800);
    }
  };

  const handleMobileTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSingleSize) {
      handleQuickAdd(defaultSize);
    } else {
      setMobileSizePickerOpen((prev) => !prev);
    }
  };

  return (
    <div
      data-component="product-card"
      data-product-id={product.id}
      className={cn(
        "group relative flex flex-col bg-transparent transition-all duration-300",
        className
      )}
    >
      {/*
       * ========================================================================
       * 1. IMAGE CONTAINER (4:5 Editorial Portrait Ratio)
       * ========================================================================
       */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-editorial-ivory/60 border border-editorial-gold/25 group-hover:border-editorial-gold/50 transition-colors shadow-2xs">
        {/* Clickable Image Link navigating to Product Detail Page */}
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative"
          aria-label={`View ${product.title}`}
        >
          {/* Subtle Fallback & Loading Background Layer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-editorial-ivory text-editorial-charcoal pointer-events-none">
            <span className="font-serif text-2xl sm:text-3xl font-light text-editorial-emerald italic mb-1">
              Ragadhni
            </span>
            <p className="font-serif text-[11px] text-editorial-slate line-clamp-1 max-w-[160px]">
              {product.title}
            </p>
            <span className="text-[9px] uppercase tracking-widest text-editorial-gold mt-1 font-medium">
              {product.fabric || "Handcrafted Heirloom"}
            </span>
          </div>

          {/* Primary Image */}
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            unoptimized
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "object-cover object-top transition-all duration-700 ease-out relative z-1",
              secondaryImage
                ? "group-hover:opacity-0 group-hover:scale-105"
                : "group-hover:scale-105"
            )}
          />

          {/* Secondary Lookbook Image (Crossfades smoothly on desktop hover) */}
          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.title} — Detail View`}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top absolute inset-0 z-2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-100 group-hover:scale-105 pointer-events-none"
            />
          )}
        </Link>

        {/*
         * ======================================================================
         * 2. EDITORIAL BADGES (Top-Left)
         * Authentic attributes only: Handloom Fabric, Bestseller, New Arrival.
         * ======================================================================
         */}
        <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 z-10 pointer-events-none">
          {product.fabric && (
            <span className="inline-block bg-[#FAF6EE]/95 backdrop-blur-xs text-[9px] uppercase tracking-wider text-editorial-charcoal font-medium px-2 py-0.5 border border-editorial-gold/25 shadow-2xs">
              {product.fabric}
            </span>
          )}

          {product.isBestseller && (
            <span className="inline-block bg-[#B69A62]/20 backdrop-blur-xs text-[#8C6D37] border border-[#B69A62]/45 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 shadow-2xs">
              Bestseller
            </span>
          )}

          {product.isNewArrival && !product.isBestseller && (
            <span className="inline-block bg-editorial-terracotta text-editorial-ivory border border-editorial-terracotta-warm/30 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 shadow-2xs">
              New Arrival
            </span>
          )}
        </div>

        {/*
         * ======================================================================
         * 3. WISHLIST TOGGLE (Top-Right)
         * Isolated propagation; persists state in WishlistContext.
         * ======================================================================
         */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FAF6EE]/90 backdrop-blur-xs border border-editorial-gold/30 hover:border-editorial-terracotta hover:bg-white text-editorial-charcoal shadow-xs flex items-center justify-center transition-all z-20 group/wishlist min-h-[32px] min-w-[32px]"
          aria-label={isSaved ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-all duration-200",
              isSaved
                ? "fill-editorial-terracotta text-editorial-terracotta scale-110"
                : "text-editorial-charcoal stroke-[1.75] group-hover/wishlist:text-editorial-terracotta group-hover/wishlist:scale-105"
            )}
          />
        </button>

        {/*
         * ======================================================================
         * 4. MOBILE QUICK ADD TRIGGER (Bottom-Right, Touch-Friendly)
         * Visible on mobile/tablet without requiring mouse hover.
         * ======================================================================
         */}
        <button
          type="button"
          onClick={handleMobileTriggerClick}
          className={cn(
            "lg:hidden absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full shadow-editorial flex items-center justify-center transition-all z-20 border min-h-[36px] min-w-[36px]",
            isJustAdded
              ? "bg-editorial-emerald text-editorial-paper border-editorial-emerald"
              : "bg-[#123D32]/90 backdrop-blur-xs text-editorial-paper border-editorial-gold/40 hover:bg-editorial-terracotta active:scale-95"
          )}
          aria-label={`Quick Add ${product.title}`}
        >
          {isJustAdded ? (
            <Check className="w-4 h-4 text-editorial-gold" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
        </button>

        {/*
         * ======================================================================
         * 5. MOBILE INLINE SIZE PICKER DRAWER (Touch-Friendly Overlay)
         * Opens on mobile when a multi-variant piece's bag icon is tapped.
         * ======================================================================
         */}
        {mobileSizePickerOpen && !isSingleSize && (
          <div className="lg:hidden absolute inset-x-0 bottom-0 p-3 bg-[#FAF6EE]/98 backdrop-blur-md border-t border-editorial-gold/30 z-30 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-editorial">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-editorial-gold/20">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-editorial-charcoal">
                Select Size:
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileSizePickerOpen(false);
                }}
                className="p-1 text-editorial-slate hover:text-editorial-charcoal"
                aria-label="Close size selector"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={(e) => handleQuickAdd(v.size, e)}
                  className="flex-1 min-w-[42px] py-1.5 px-2 text-center text-xs font-medium rounded-xs bg-editorial-ivory border border-editorial-gold/30 text-editorial-charcoal hover:bg-editorial-emerald hover:text-editorial-paper hover:border-editorial-emerald active:scale-95 transition-all"
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/*
         * ======================================================================
         * 6. DESKTOP QUICK ADD DRAWER (Hover Slide-Up)
         * Smoothly reveals on desktop hover with variant chips & feedback.
         * ======================================================================
         */}
        <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0B2620]/95 via-[#123D32]/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex-col items-center justify-end z-20 pointer-events-none group-hover:pointer-events-auto">
          {/* Multi-Size Variant Selector Chips */}
          {!isSingleSize && (
            <div className="flex items-center space-x-1.5 mb-2">
              {product.variants.map((v) => {
                const isChipSelected = selectedSize === v.size;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(v.size);
                    }}
                    className={cn(
                      "text-[10px] px-2.5 py-1 font-medium transition-all rounded-xs",
                      isChipSelected
                        ? "bg-editorial-gold text-editorial-emerald-dark font-semibold shadow-xs"
                        : "bg-[#FAF6EE]/90 text-editorial-charcoal hover:bg-white hover:text-editorial-emerald"
                    )}
                  >
                    {v.size}
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Add Action Button */}
          <button
            type="button"
            onClick={(e) => handleQuickAdd(selectedSize, e)}
            className={cn(
              "w-full text-[11px] uppercase tracking-widest py-2 font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-sm rounded-xs",
              isJustAdded
                ? "bg-editorial-emerald text-editorial-gold border border-editorial-gold/50"
                : "bg-editorial-gold hover:bg-editorial-gold-soft text-editorial-emerald-dark active:scale-[0.99]"
            )}
          >
            {isJustAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  {isSingleSize ? "Quick Add" : `Add ${selectedSize} to Bag`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/*
       * ========================================================================
       * 7. PRODUCT INFORMATION & PRICING
       * Refined editorial typography and clear pricing hierarchy.
       * ========================================================================
       */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Category & Craft Kicker */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-editorial-slate font-medium">
          <span>{product.categoryName}</span>
          {product.weave && (
            <span className="hidden sm:inline text-editorial-slate/75 font-normal tracking-normal text-[9px] lowercase italic truncate max-w-[130px]">
              {product.weave}
            </span>
          )}
        </div>

        {/* Product Title with Link to PDP */}
        <h3 className="font-serif text-[15px] sm:text-base tracking-wide text-editorial-charcoal font-normal line-clamp-1 mt-1 group-hover:text-editorial-terracotta transition-colors">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Available Color Swatches */}
        {uniqueColors.length > 0 && (
          <div
            className="flex items-center space-x-1.5 mt-1.5"
            title={`${uniqueColors.length} color(s) available`}
          >
            {uniqueColors.map((colorVariant) => (
              <span
                key={colorVariant.id}
                className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0 shadow-2xs transition-transform hover:scale-125"
                style={{ backgroundColor: colorVariant.colorHex || "#B69A62" }}
                title={colorVariant.color}
              />
            ))}
            <span className="text-[10px] text-editorial-slate font-light truncate">
              {uniqueColors[0]?.color}
            </span>
          </div>
        )}

        {/* Price & Discount Display */}
        <div className="mt-2 flex items-baseline space-x-2">
          {/* Selling Price */}
          <span className="font-sans text-sm sm:text-base font-semibold text-editorial-emerald">
            {formatPrice(product.basePrice)}
          </span>

          {/* Crossed-out Compare Price & Discount Tag */}
          {product.compareAtPrice && product.compareAtPrice > product.basePrice && (
            <>
              <span className="font-sans text-xs text-editorial-slate/70 line-through font-normal">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-editorial-terracotta uppercase tracking-wider">
                ({discountPercent}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
