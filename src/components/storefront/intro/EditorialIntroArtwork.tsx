/**
 * ==============================================================================
 * Ragadhni — Cinematic Editorial Intro Artwork
 * (`src/components/storefront/intro/EditorialIntroArtwork.tsx`)
 * ==============================================================================
 *
 * ART DIRECTION & CONCEPT:
 * - Theme: Modern Indian Editorial (Organic × Geometric Fusion)
 * - Composition: Deliberately Asymmetrical Editorial
 *   - Lower-Left: Off-centre RAGADHNI editorial wordmark, architectural ivory pill,
 *     precision hairline rules, and coordinate geometry.
 *   - Center & Right: Large sculptural organic ribbons in Burnt & Warm Terracotta,
 *     intersecting fluid Secondary Emerald contours, an architectural stilted arch
 *     in Antique Gold, geometric Warm Ivory graphic disk, and concentric orbital arcs.
 * - Palette:
 *   - Deep Emerald: #123D32 (Dominant atmosphere)
 *   - Secondary Emerald: #216653 (Tonal depth & fluid overlays)
 *   - Burnt Terracotta: #8C3F2B (Deep expressive sculptural warmth)
 *   - Warm Terracotta: #B96645 (Vibrant sculptural organic contour)
 *   - Antique Gold: #B69A62 (Architectural linework, arch cusps, radial rays)
 *   - Soft Gold: #D9C8A5 (Luminous nodes & precision orbital rings)
 *   - Warm Ivory: #F2EBDD (Editorial negative space & brand typography)
 */

"use client";

import React from "react";
import type { EditorialIntroStage } from "@/hooks/useEditorialIntro";

interface EditorialIntroArtworkProps {
  stage: EditorialIntroStage;
}

export const EditorialIntroArtwork: React.FC<EditorialIntroArtworkProps> = ({ stage }) => {
  const isEntrance = stage !== "atmospheric";
  const isEvolution = stage === "evolution" || stage === "brandReveal" || stage === "transition";
  const isBrandReveal = stage === "brandReveal" || stage === "transition";
  const isTransition = stage === "transition";

  return (
    <div
      className="relative w-full max-w-[1500px] aspect-[16/10] mx-auto select-none transition-transform duration-[850ms] cubic-bezier(0.16, 1, 0.3, 1)"
      style={{
        transform: isTransition ? "scale(1.14)" : "scale(1)",
        opacity: isTransition ? 0.05 : 1,
        transitionProperty: "transform, opacity",
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle Ambient Radial Glow */}
          <radialGradient
            id="ambientLight"
            cx="65%"
            cy="45%"
            r="60%"
            fx="65%"
            fy="45%"
          >
            <stop offset="0%" stopColor="#216653" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#123D32" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0B2620" stopOpacity="1" />
          </radialGradient>

          {/* Terracotta Gradient for Sculptural Ribbon */}
          <linearGradient
            id="terracottaGradient"
            x1="800"
            y1="120"
            x2="1350"
            y2="780"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#B96645" />
            <stop offset="60%" stopColor="#8C3F2B" />
            <stop offset="100%" stopColor="#6E2F1F" />
          </linearGradient>

          {/* Secondary Emerald Gradient */}
          <linearGradient
            id="emeraldRibbonGradient"
            x1="650"
            y1="300"
            x2="1150"
            y2="850"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2A7B65" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#123D32" stopOpacity="0.9" />
          </linearGradient>

          {/* Antique Gold Metallic Shimmer Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0D2B4" />
            <stop offset="50%" stopColor="#B69A62" />
            <stop offset="100%" stopColor="#8F7441" />
          </linearGradient>

          {/* Subtle Paper Texture Filter (Handmade organic tactile feel) */}
          <filter id="editorialGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.85   0 0 0 0 0.8   0 0 0 0 0.7   0 0 0 0.05 0"
              result="coloredNoise"
            />
            <feComposite in="SourceGraphic" in2="coloredNoise" operator="over" />
          </filter>
        </defs>

        {/* ==============================================================================
            1. ATMOSPHERIC FOUNDATION & BACKGROUND
            ============================================================================== */}
        <rect width="1600" height="1000" fill="#123D32" />
        <rect width="1600" height="1000" fill="url(#ambientLight)" />

        {/* Diagonal Atmospheric Ray across composition */}
        <path
          d="M 120 0 L 1600 680 L 1600 1000 L 0 520 Z"
          fill="#216653"
          opacity="0.14"
        />

        {/* ==============================================================================
            2. GEOMETRIC FOUNDATION: AXIS LINES & ARCHITECTURAL GRID
            ============================================================================== */}
        {/* Horizontal Editorial Datum Line */}
        <line
          x1="80"
          y1="720"
          x2="1520"
          y2="720"
          stroke="#B69A62"
          strokeWidth="0.85"
          opacity="0.25"
        />

        {/* Vertical Aligning Axis */}
        <line
          x1="580"
          y1="100"
          x2="580"
          y2="900"
          stroke="#B69A62"
          strokeWidth="0.75"
          strokeDasharray="4 6"
          opacity="0.2"
        />

        {/* Editorial Frame Precision Corner Markers */}
        <g stroke="#B69A62" strokeWidth="1" opacity="0.45">
          <path d="M 60 90 L 60 60 L 90 60" />
          <path d="M 1510 60 L 1540 60 L 1540 90" />
          <path d="M 60 910 L 60 940 L 90 940" />
          <path d="M 1510 940 L 1540 940 L 1540 910" />
        </g>

        {/* ==============================================================================
            3. ASYMMETRICAL CENTER & RIGHT: GEOMETRIC & ORGANIC FUSION
            ============================================================================== */}

        {/* 3A. WARM IVORY GEOMETRIC GRAPHIC DISK (Negative space & contrast) */}
        <g
          className="transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: isEntrance ? "scale(1)" : "scale(0.7)",
            opacity: isEntrance ? 0.95 : 0,
            transformOrigin: "1160px 420px",
          }}
        >
          {/* Main Contrast Disk */}
          <circle
            cx="1160"
            cy="420"
            r="190"
            fill="#F2EBDD"
          />
          {/* Inner Accent Ring */}
          <circle
            cx="1160"
            cy="420"
            r="170"
            stroke="#D9C8A5"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* 3B. CONCENTRIC ORBITAL ARCS (Soft Gold) */}
        <g
          className="transition-all duration-[1100ms] cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: isEvolution ? "rotate(0deg)" : "rotate(-35deg)",
            opacity: isEvolution ? 0.75 : 0,
            transformOrigin: "1160px 420px",
          }}
        >
          {/* Outer Orbit Segment */}
          <path
            d="M 860 420 A 300 300 0 1 1 1460 420"
            stroke="#D9C8A5"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            fill="none"
          />
          {/* Intermediate Orbit Segment */}
          <path
            d="M 920 420 A 240 240 0 0 1 1400 420"
            stroke="#B69A62"
            strokeWidth="0.9"
            fill="none"
          />
          {/* Precision Nodes */}
          <circle cx="920" cy="420" r="3.5" fill="#D9C8A5" />
          <circle cx="1400" cy="420" r="3.5" fill="#D9C8A5" />
          <circle cx="1160" cy="180" r="4" fill="#B69A62" />
        </g>

        {/* 3C. TRANSLUCENT SECONDARY EMERALD FLUID RIBBON */}
        <g
          className="transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: isEntrance
              ? "translate(0px, 0px) rotate(0deg)"
              : "translate(-60px, 40px) rotate(-6deg)",
            opacity: isEntrance ? 0.85 : 0,
            transformOrigin: "900px 550px",
          }}
        >
          <path
            d="M 680 580 C 720 420 840 320 980 340 C 1140 360 1260 490 1280 640 C 1295 760 1190 860 1060 850 C 910 840 820 740 780 670 C 730 680 670 650 680 580 Z"
            fill="url(#emeraldRibbonGradient)"
          />
        </g>

        {/* 3D. SCULPTURAL BURNT & WARM TERRACOTTA ORGANIC RIBBON */}
        <g
          className="transition-all duration-[1100ms] cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: isEntrance
              ? "translate(0px, 0px) scale(1) rotate(0deg)"
              : "translate(90px, -40px) scale(0.9) rotate(5deg)",
            opacity: isEntrance ? 1 : 0,
            transformOrigin: "1120px 480px",
          }}
        >
          {/* Sweeping Haute Couture Draping Contour */}
          <path
            d="M 940 180 C 1080 140 1220 210 1310 320 C 1410 440 1440 600 1370 730 C 1310 840 1170 890 1050 840 C 940 790 920 670 960 560 C 990 470 1060 410 1140 430 C 1210 450 1230 520 1190 570 C 1150 610 1090 600 1070 550 C 1050 490 1110 390 1210 370 C 1120 300 1020 290 940 180 Z"
            fill="url(#terracottaGradient)"
            filter="drop-shadow(0 14px 28px rgba(11, 38, 32, 0.45))"
          />

          {/* Accent Ribbon Tail (Burnt Terracotta #8C3F2B) */}
          <path
            d="M 1310 320 C 1370 380 1410 470 1390 560 C 1340 500 1310 410 1310 320 Z"
            fill="#8C3F2B"
            opacity="0.95"
          />
        </g>

        {/* 3E. ARCHITECTURAL STILTED ARCHWAY (Pure Minimalist Antique Gold) */}
        <g
          className="transition-all duration-[1250ms] cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: isEvolution ? "scale(1)" : "scale(0.92)",
            opacity: isEvolution ? 0.9 : 0,
            transformOrigin: "1160px 460px",
          }}
        >
          {/* Main Stilted Arch Frame */}
          <path
            d="M 990 720 L 990 420 C 990 326 1066 250 1160 250 C 1254 250 1330 326 1330 420 L 1330 720"
            stroke="url(#goldGradient)"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Inner Keystone Arch Accent */}
          <path
            d="M 1040 720 L 1040 440 C 1040 374 1094 320 1160 320 C 1226 320 1280 374 1280 440 L 1280 720"
            stroke="#D9C8A5"
            strokeWidth="0.9"
            strokeDasharray="5 5"
            fill="none"
            opacity="0.6"
          />
          {/* Apex Geometric Cartouche Node */}
          <polygon
            points="1160,238 1166,244 1160,250 1154,244"
            fill="#F2EBDD"
            stroke="#B69A62"
            strokeWidth="0.8"
          />
        </g>

        {/* 3F. FLOATING GEOMETRIC SHAPES (Terracotta & Gold) */}
        {/* Upper Center Wedge Accent */}
        <g
          className="transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: isEvolution ? "translate(0px, 0px)" : "translate(0px, -30px)",
            opacity: isEvolution ? 0.85 : 0,
          }}
        >
          <polygon
            points="760,180 840,160 810,240"
            fill="#8C3F2B"
          />
          <line
            x1="810"
            y1="240"
            x2="880"
            y2="310"
            stroke="#B69A62"
            strokeWidth="1"
            opacity="0.7"
          />
          <circle cx="880" cy="310" r="3" fill="#D9C8A5" />
        </g>

        {/* ==============================================================================
            4. ASYMMETRICAL LOWER-LEFT: EDITORIAL ANCHOR & RAGADHNI WORDMARK
            ============================================================================== */}

        {/* 4A. VERTICAL ARCHITECTURAL PILL STRUCTURE (Warm Ivory #F2EBDD) */}
        <g
          className="transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            transform: isEntrance ? "scaleY(1)" : "scaleY(0.4)",
            opacity: isEntrance ? 1 : 0,
            transformOrigin: "150px 720px",
          }}
        >
          {/* Outer Ivory Column */}
          <rect
            x="140"
            y="320"
            width="28"
            height="400"
            rx="14"
            fill="#F2EBDD"
          />
          {/* Inner Warm Terracotta Inlay Strip */}
          <rect
            x="151"
            y="370"
            width="6"
            height="300"
            rx="3"
            fill="#B96645"
          />
        </g>

        {/* 4B. EDITORIAL BRAND WORDMARK: RAGADHNI */}
        <g
          className="transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            clipPath: isBrandReveal ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
            transform: isBrandReveal ? "translateY(0)" : "translateY(24px)",
            opacity: isBrandReveal ? 1 : 0,
            transitionProperty: "clip-path, transform, opacity",
          }}
        >
          {/* RAGADHNI Master Wordmark */}
          <text
            x="196"
            y="612"
            fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
            fontSize="84"
            fontWeight="500"
            letterSpacing="0.18em"
            fill="#F2EBDD"
            filter="drop-shadow(0 4px 16px rgba(10, 38, 30, 0.6))"
          >
            RAGADHNI
          </text>

          {/* Precision Gold Hairline Underline Rule */}
          <line
            x1="200"
            y1="640"
            x2="635"
            y2="640"
            stroke="url(#goldGradient)"
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Fine Editorial Geometric Coordinate Markers */}
          <circle cx="200" cy="640" r="2.5" fill="#D9C8A5" />
          <circle cx="635" cy="640" r="2.5" fill="#D9C8A5" />

          {/* Minimalist Alignment Crosshair */}
          <g stroke="#B69A62" strokeWidth="0.8" opacity="0.6">
            <line x1="660" y1="635" x2="660" y2="645" />
            <line x1="655" y1="640" x2="665" y2="640" />
          </g>
        </g>
      </svg>
    </div>
  );
};
