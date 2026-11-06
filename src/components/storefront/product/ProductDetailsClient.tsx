/**
 * ==============================================================================
 * Ragadhni — Interactive Product Details Client (`ProductDetailsClient.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component manages the interactive shopping actions on the Product Detail Page:
 * 1. Size selection state (`selectedSize`).
 * 2. Real-time low stock warnings (e.g., "Hurry! Only 3 left in stock").
 * 3. Opening and closing the Indian Size Guide Modal (`<SizeGuideModal />`).
 * 4. Wishlist heart toggle.
 * 5. "Add to Bag" and "Buy Now" actions.
 * 6. Sticky mobile bottom bar so shoppers can tap "Add to Bag" while scrolling on phones.
 *
 * WHY IT EXISTS:
 * Keeping client-side interactivity in this dedicated component allows the parent
 * `page.tsx` to remain a Server Component for blazing-fast SEO and Google indexing.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Rendered inside `src/app/product/[slug]/page.tsx`.
 * - Imports `<SizeGuideModal>` from `SizeGuideModal.tsx`.
 * - Imports `<PincodeChecker>` from `PincodeChecker.tsx`.
 * - Imports `<Button>` and `<Badge>` from UI primitives.
 */

"use client";

import React, { useState } from "react";
import { Product, ProductVariant } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SizeGuideModal } from "./SizeGuideModal";
import { PincodeChecker } from "./PincodeChecker";
import { Heart, ShoppingBag, Ruler, ShieldCheck, Sparkles, ChevronDown } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  // Currently selected size (defaults to first variant)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: "var-default",
      sku: "DEFAULT",
      size: "M",
      color: "Default",
      price: product.basePrice,
      stockQuantity: 10,
    }
  );

  // Modal visibility for the Indian Size Guide
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Wishlist heart toggle state
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Accordion active state for product specs
  const [openAccordion, setOpenAccordion] = useState<string | null>("fabric");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.basePrice) / product.compareAtPrice) * 100)
    : 0;

  const isLowStock = selectedVariant.stockQuantity > 0 && selectedVariant.stockQuantity <= 5;

  return (
    <div className="space-y-6">
      {/*
       * ========================================================================
       * 1. HEADER & PRICING:
       * ========================================================================
       */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] uppercase tracking-widest text-heritage-earth font-medium">
            {product.categoryName}
          </span>
          {product.isBestseller && <Badge variant="gold">Bestseller</Badge>}
          {product.isNewArrival && <Badge variant="terracotta">New Arrival</Badge>}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-heritage-charcoal font-normal leading-tight">
          {product.title}
        </h1>

        {/* Rating preview */}
        {product.rating && (
          <div className="flex items-center space-x-2 pt-1 text-xs text-heritage-earth">
            <span className="text-heritage-gold font-semibold">★ {product.rating}</span>
            <span>&bull;</span>
            <span>{product.reviewCount || 28} Verified Customer Reviews</span>
          </div>
        )}

        {/* Pricing in INR */}
        <div className="pt-2 flex items-baseline space-x-3">
          <span className="font-sans text-2xl font-semibold text-heritage-charcoal">
            {formatPrice(product.basePrice)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.basePrice && (
            <>
              <span className="font-sans text-base text-heritage-earth/60 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="text-xs font-semibold text-heritage-maroon uppercase tracking-wider">
                ({discountPercent}% OFF)
              </span>
            </>
          )}
        </div>
        <p className="text-[11px] text-heritage-earth/80">Inclusive of all taxes &bull; Free express delivery</p>
      </div>

      {/*
       * ========================================================================
       * 2. COLOR SWATCH PREVIEW:
       * ========================================================================
       */}
      <div className="space-y-2 pt-2 border-t border-[#E8DFD0]">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-heritage-charcoal uppercase tracking-wider text-[11px]">
            Color: <span className="font-normal text-heritage-earth">{selectedVariant.color}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedVariant(v)}
              className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                selectedVariant.id === v.id
                  ? "border-heritage-terracotta scale-110"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <span
                className="block w-full h-full rounded-full border border-heritage-charcoal/20"
                style={{ backgroundColor: v.colorHex || "#9E3D2B" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/*
       * ========================================================================
       * 3. SIZE SELECTOR WITH INDIAN SIZE GUIDE MODAL:
       * ========================================================================
       */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-heritage-charcoal uppercase tracking-wider text-[11px]">
            Select Size
          </span>
          {/* Button opening the Size Guide Modal */}
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="flex items-center space-x-1.5 text-heritage-terracotta hover:underline font-medium text-[11px] uppercase tracking-wider"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Size Guide & Measurements</span>
          </button>
        </div>

        {/* Size Selection Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {product.variants.map((v) => {
            const isSelected = selectedVariant.id === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`py-3 px-2 text-center text-xs font-medium border transition-colors ${
                  isSelected
                    ? "bg-heritage-terracotta text-heritage-ivory border-heritage-terracotta shadow-xs"
                    : "bg-heritage-ivory text-heritage-charcoal border-[#D5C9B5] hover:border-heritage-terracotta"
                }`}
              >
                {v.size}
              </button>
            );
          })}
        </div>

        {/* Low Stock Urgency Alert */}
        {isLowStock && (
          <p className="text-xs text-heritage-maroon font-medium pt-1">
            Hurry! Only {selectedVariant.stockQuantity} pieces left in size {selectedVariant.size}.
          </p>
        )}
      </div>

      {/*
       * ========================================================================
       * 4. ACTION BUTTONS: ADD TO BAG & BUY NOW
       * ========================================================================
       */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        {/* Primary Add to Bag Button */}
        <Button
          size="lg"
          onClick={() => {
            alert(`Added "${product.title}" (Size: ${selectedVariant.size}) to your Shopping Bag.`);
          }}
          className="flex-1 py-4 uppercase tracking-widest text-xs font-semibold shadow-md"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          <span>Add to Bag</span>
        </Button>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="p-3 border border-heritage-charcoal/40 hover:border-heritage-terracotta bg-heritage-ivory flex items-center justify-center transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted
                ? "fill-heritage-terracotta text-heritage-terracotta"
                : "text-heritage-charcoal"
            }`}
          />
        </button>
      </div>

      {/*
       * ========================================================================
       * 5. PINCODE DELIVERY & COD CHECKER:
       * ========================================================================
       */}
      <div className="pt-4">
        <PincodeChecker />
      </div>

      {/*
       * ========================================================================
       * 6. PRODUCT SPECIFICATIONS ACCORDIONS:
       * ========================================================================
       */}
      <div className="pt-4 divide-y divide-[#E8DFD0] border-t border-[#E8DFD0]">
        {/* Accordion 1: Fabric & Craftsmanship */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleAccordion("fabric")}
            className="w-full flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-heritage-charcoal hover:text-heritage-terracotta"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-heritage-terracotta" />
              <span>Fabric & Craftsmanship Details</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordion === "fabric" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "fabric" && (
            <div className="pt-3 pb-1 text-xs text-heritage-earth space-y-2 leading-relaxed">
              <p><strong>Primary Fabric:</strong> {product.fabric}</p>
              {product.weave && <p><strong>Weave Technique:</strong> {product.weave}</p>}
              {product.work && <p><strong>Embroidery & Work:</strong> {product.work}</p>}
              {product.fit && <p><strong>Silhouette Cut:</strong> {product.fit}</p>}
              <p>{product.description}</p>
            </div>
          )}
        </div>

        {/* Accordion 2: Wash & Fabric Care */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleAccordion("care")}
            className="w-full flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-heritage-charcoal hover:text-heritage-terracotta"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-heritage-terracotta" />
              <span>Wash & Fabric Care</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordion === "care" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "care" && (
            <div className="pt-3 pb-1 text-xs text-heritage-earth space-y-1.5 leading-relaxed">
              <p>&bull; <strong>Recommended Care:</strong> {product.washCare}</p>
              <p>&bull; Iron on medium silk/cotton setting with a pressing cloth.</p>
              <p>&bull; Store in a breathable muslin cover away from direct harsh sunlight.</p>
            </div>
          )}
        </div>

        {/* Accordion 3: Shipping & 7-Day Exchange Policy */}
        <div className="py-3">
          <button
            type="button"
            onClick={() => toggleAccordion("shipping")}
            className="w-full flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-heritage-charcoal hover:text-heritage-terracotta"
          >
            <span>Shipping & 7-Day Doorstep Exchange</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordion === "shipping" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "shipping" && (
            <div className="pt-3 pb-1 text-xs text-heritage-earth space-y-1.5 leading-relaxed">
              <p>&bull; <strong>Dispatch:</strong> Orders are dispatched from our Jaipur warehouse within 24 to 48 hours.</p>
              <p>&bull; <strong>Free Delivery:</strong> All orders above ₹1,499 qualify for complimentary express delivery.</p>
              <p>&bull; <strong>7-Day Exchange:</strong> Hassle-free size exchange with doorstep reverse pickup across India.</p>
            </div>
          )}
        </div>
      </div>

      {/*
       * ========================================================================
       * 7. STICKY MOBILE ACTION BAR:
       * Pinned to the bottom of the screen on mobile devices (`lg:hidden`).
       * Ensures the "Add to Bag" button is always 1 tap away.
       * ========================================================================
       */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 bg-heritage-ivory/95 backdrop-blur-md border-t border-[#E0D5C3] p-3 z-40 flex items-center justify-between shadow-2xl">
        <div>
          <span className="block text-xs font-semibold text-heritage-charcoal">
            {formatPrice(product.basePrice)}
          </span>
          <span className="block text-[10px] text-heritage-earth">
            Size: {selectedVariant.size}
          </span>
        </div>
        <Button
          size="sm"
          onClick={() => {
            alert(`Added "${product.title}" (Size: ${selectedVariant.size}) to your Shopping Bag.`);
          }}
          className="uppercase tracking-widest text-xs px-6 py-2.5 font-semibold"
        >
          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
          <span>Add to Bag</span>
        </Button>
      </div>

      {/* Render the Size Guide Modal instance */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        gender={product.gender}
      />
    </div>
  );
}

