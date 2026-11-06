/**
 * ==============================================================================
 * Ragadhni — Rotating Announcement Banner (`AnnouncementBar.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component displays the slim, dark promotional banner at the very top of the website.
 * It automatically rotates through key marketing messages (e.g. Free shipping above ₹1,499,
 * festive collections, and verified Cash on Delivery) every 5 seconds.
 * It also lets shoppers manually click left and right arrows to browse announcements.
 *
 * WHY IT EXISTS:
 * Prominent top banners are a cornerstone of modern Indian D2C e-commerce.
 * They immediately communicate essential purchasing incentives (free shipping thresholds
 * and COD availability) before the customer even begins browsing products.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Read messages from `siteConfig.announcements` in `src/config/site.ts`.
 * - Rendered once at the top of `src/app/layout.tsx`, making it visible on every page.
 */

// 1. "use client" Directive:
// In Next.js App Router, components are Server Components by default (no browser JavaScript).
// Because this banner needs interactive state (`useState`, `useEffect`) and a browser timer (`setInterval`),
// we mark it as a Client Component so it runs in the shopper's browser.
"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function AnnouncementBar() {
  // `currentIndex` tracks which message from the announcements array is currently displayed (starts at 0)
  const [currentIndex, setCurrentIndex] = useState(0);

  // The array of promotional messages defined in `src/config/site.ts`
  const announcements = siteConfig.announcements;

  /**
   * Automatic Timer:
   * Sets up a browser interval that runs every 5000 milliseconds (5 seconds).
   * It increments `currentIndex` by 1.
   *
   * THE MODULO MATH (`% announcements.length`):
   * If there are 3 messages (indexes 0, 1, 2):
   * (0 + 1) % 3 = 1
   * (1 + 1) % 3 = 2
   * (2 + 1) % 3 = 0  <-- Loops back to the beginning seamlessly without crashing!
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    // CLEANUP FUNCTION:
    // When the component is removed from the screen, we must clear the timer
    // to prevent memory leaks and background CPU usage.
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    /*
     * Modern Royal Heritage Announcement Bar:
     * Styled in Deep Burgundy (#641E2B) with an Antique Gold bottom hairline border.
     * Communicates key incentives (Free Shipping, COD) with high contrast and brand authority.
     */
    <div className="bg-heritage-burgundy text-heritage-warm-ivory text-xs tracking-widest py-2.5 px-4 select-none relative z-50 border-b border-heritage-antique-gold/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/*
         * Previous Announcement Button:
         * Uses `(prev - 1 + length) % length` to cycle backwards safely without negative numbers.
         */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)
          }
          className="text-heritage-antique-gold-light/70 hover:text-heritage-warm-ivory transition-colors p-1"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* The Currently Active Announcement Text with Antique Gold bullet ornaments */}
        <div className="overflow-hidden text-center flex-1 px-4">
          <p className="transition-opacity duration-300 font-normal flex items-center justify-center space-x-2 text-[11px] sm:text-xs">
            <span className="text-heritage-antique-gold-light text-[10px] hidden sm:inline">&bull;</span>
            <span className="tracking-widest uppercase">{announcements[currentIndex]}</span>
            <span className="text-heritage-antique-gold-light text-[10px] hidden sm:inline">&bull;</span>
          </p>
        </div>

        {/* Next Announcement Button */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % announcements.length)
          }
          className="text-heritage-antique-gold-light/70 hover:text-heritage-warm-ivory transition-colors p-1"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
