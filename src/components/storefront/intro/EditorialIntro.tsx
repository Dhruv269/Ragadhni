/**
 * ==============================================================================
 * Ragadhni — Cinematic Editorial Loading Introduction Component
 * (`src/components/storefront/intro/EditorialIntro.tsx`)
 * ==============================================================================
 *
 * WHAT THIS COMPONENT DOES:
 * Fixed-position, full-viewport overlay for Ragadhni's art-directed loading sequence:
 * - Mounted directly in root layout (`src/app/layout.tsx`)
 * - Positioned at `fixed inset-0 z-[9999]` over the viewport
 * - Deep Emerald background foundation with subtle ambient illumination
 * - Houses `EditorialIntroArtwork` (Organic × Geometric Fusion in Asymmetrical Editorial layout)
 * - Accessible "Skip" button in Antique Gold & Deep Emerald
 * - Seamless cinematic transition into the storefront homepage
 */

"use client";

import React from "react";
import { useEditorialIntro } from "@/hooks/useEditorialIntro";
import { EditorialIntroArtwork } from "./EditorialIntroArtwork";

export const EditorialIntro: React.FC = () => {
  const { stage, isVisible, skipIntro } = useEditorialIntro();

  // If completed or not visible, unmount cleanly
  if (!isVisible || stage === "completed") {
    return null;
  }

  const isTransition = stage === "transition";

  return (
    <aside
      id="cinematic-editorial-intro"
      aria-label="Welcome to Ragadhni"
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-all duration-[850ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        isTransition ? "opacity-0 pointer-events-none scale-105" : "opacity-100 bg-[#123D32]"
      }`}
      style={{
        backgroundColor: isTransition ? "transparent" : "#123D32",
        transitionProperty: "opacity, transform, background-color",
      }}
    >
      {/* Deep Emerald Surface Ambient Gradient */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${
          isTransition ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(33, 102, 83, 0.35) 0%, rgba(18, 61, 50, 0.95) 70%, #0A241E 100%)",
        }}
      />

      {/* Accessible Skip Button */}
      <button
        onClick={skipIntro}
        type="button"
        className={`absolute top-4 right-4 sm:top-6 sm:right-8 z-30 px-3 py-1.5 rounded-sm border border-[#B69A62]/40 bg-[#0B2620]/80 backdrop-blur-sm text-[#F2EBDD] text-[10px] sm:text-xs tracking-[0.22em] uppercase font-sans hover:bg-[#B69A62]/20 hover:border-[#B69A62] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#B69A62] ${
          isTransition ? "opacity-0 pointer-events-none" : "opacity-85 hover:opacity-100"
        }`}
        aria-label="Skip introductory animation"
      >
        Skip
      </button>

      {/* Main Artwork Container with responsive edge padding */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 max-w-[1560px]">
        <EditorialIntroArtwork stage={stage} />
      </div>
    </aside>
  );
};

