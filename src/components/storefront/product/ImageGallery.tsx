/**
 * ==============================================================================
 * Ragadhni — Editorial PDP Image Gallery (`ImageGallery.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component handles the photo presentation on the Product Detail Page (PDP).
 * It features:
 * 1. A main large portrait photo display (4:5 aspect ratio) with hover zoom.
 * 2. Clickable secondary thumbnail previews allowing shoppers to switch angles
 *    (e.g., model full drape shot, neckline Zari close-up, back detail).
 * 3. Mobile swipe-friendly indicator dots.
 * 4. Textile badge overlay on the primary frame.
 *
 * WHY IT EXISTS:
 * When buying ethnic wear online, customers cannot touch the fabric.
 * High-resolution imagery showing both the complete silhouette drape and macro weave details
 * is the single most important factor in giving customers confidence to buy.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Rendered inside the Product Detail Page (`/product/[slug]/page.tsx`).
 * - Accepts `images: ProductImage[]` and `title: string` props.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/types";

interface ImageGalleryProps {
  images: ProductImage[];
  title: string;
  fabricBadge?: string;
}

export function ImageGallery({ images, title, fabricBadge }: ImageGalleryProps) {
  // Tracks which photo index is currently displayed in the main viewport (defaults to 0)
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback if no images are present
  const displayImages =
    images.length > 0
      ? images
      : [
          {
            id: "placeholder",
            url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
            altText: title,
          },
        ];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/*
       * ========================================================================
       * 1. THUMBNAIL STRIP:
       * On desktop: Vertical strip to the left of the main image.
       * On mobile: Horizontal row underneath the main image.
       * ========================================================================
       */}
      {displayImages.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 shrink-0">
          {displayImages.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[3/4] w-16 sm:w-20 overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? "border-heritage-terracotta shadow-xs"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={`${title} - Thumbnail ${idx + 1}`}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/*
       * ========================================================================
       * 2. MAIN ACTIVE PHOTO VIEWPORT:
       * 4:5 fashion aspect ratio with smooth hover zoom.
       * ========================================================================
       */}
      <div className="relative aspect-[4/5] w-full bg-heritage-sand/30 overflow-hidden border border-[#E3D8C6]">
        <Image
          src={currentImage.url}
          alt={currentImage.altText || title}
          fill
          priority // Highest priority loading on the PDP
          className="object-cover object-top transition-transform duration-500 ease-out hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Fabric badge overlay on top-left of main photo */}
        {fabricBadge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-heritage-ivory/95 backdrop-blur-xs border border-heritage-charcoal/30 text-heritage-charcoal text-[11px] uppercase tracking-widest font-medium px-3 py-1 shadow-xs">
              {fabricBadge}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

