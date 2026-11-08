/**
 * ==============================================================================
 * Ragadhni — Tailwind CSS Configuration (`tailwind.config.ts`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file is the central design system configuration for the entire Ragadhni storefront.
 * It defines our brand's custom colors, typography fonts, and shadow effects.
 *
 * WHY IT EXISTS:
 * Instead of hardcoding hex colors like `#9E3D2B` or raw font names in every single component,
 * we register them here as easy-to-use utility classes (e.g., `text-heritage-terracotta`
 * or `font-serif`). If we ever want to tweak a brand color, we change it in this one file,
 * and the entire website updates automatically.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - The `content` list tells Tailwind which files to scan for class names.
 * - The custom colors (under `theme.extend.colors.heritage`) can be used anywhere in TSX files
 *   (e.g., `bg-heritage-ivory`, `text-heritage-charcoal`, `border-heritage-gold`).
 * - The font families (`serif` and `sans`) connect directly to the Google Fonts loaded
 *   in `src/app/layout.tsx` via CSS variables (`--font-cormorant` and `--font-jakarta`).
 */

import type { Config } from "tailwindcss";

const config: Config = {
  /*
   * CONTENT PATHS:
   * Tailwind searches these folders and files for class names. Any Tailwind class
   * used inside `src/pages`, `src/components`, or `src/app` will be included in the final CSS.
   */
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    /*
     * EXTEND:
     * We use `extend` so that we ADD our custom brand colors and styles to Tailwind
     * without losing Tailwind's built-in utilities (like `flex`, `grid`, `p-4`, etc.).
     */
    extend: {
      colors: {
        // Dynamic root theme variables configured in `src/styles/globals.css`
        background: "var(--background)",
        foreground: "var(--foreground)",

        /*
         * ==============================================================================
         * 1. THE CONTEMPORARY INDIAN FASHION EDITORIAL PALETTE (Approved Phase 2)
         * ==============================================================================
         * Grounded in 70% modern editorial minimalism and 30% traditional Indian resonance.
         * Primary: Deep Emerald (#123D32) and Burnt Terracotta (#8C3F2B).
         * Supporting: Warm Terracotta, Warm Ivory, Antique Gold, Soft Gold, and Obsidian.
         */
        editorial: {
          emerald: {
            deep: "#123D32",       // Primary defining brand atmosphere & dark grounds
            DEFAULT: "#123D32",
            secondary: "#216653",  // Ambient depth, fluid secondary layers & highlights
            dark: "#0B2620",       // Deepest shadowed emerald for high-contrast dark surfaces
            light: "#2A7B65",      // Luminous emerald accent
          },
          terracotta: {
            burnt: "#8C3F2B",      // Deep expressive sculptural terracotta
            DEFAULT: "#8C3F2B",
            warm: "#B96645",       // Radiant warm terracotta for CTAs, active states & accents
            rose: "#9E4D36",       // Terracotta hover tone
            light: "#D48B70",      // Soft terracotta tint
          },
          gold: {
            antique: "#B69A62",    // Refined restrained gold for fine rules, borders & accents
            DEFAULT: "#B69A62",
            soft: "#D9C8A5",       // Luminous soft gold for nodes, subtle indicators & text
            pale: "#EAE0CF",       // Delicate gold highlight
            deep: "#8F7441",       // Dark burnished gold
          },
          ivory: {
            warm: "#F2EBDD",       // Warm Ivory canvas & breathing room
            DEFAULT: "#F2EBDD",
            paper: "#FAF6EE",      // Crisp, tactile editorial paper white
            cream: "#E8DFD0",      // Muted ivory tone for dividers and chips
            surface: "#F5EFE4",    // Elevated ivory card surface
          },
          charcoal: {
            DEFAULT: "#1A1D1B",    // High-readability editorial dark text & obsidian
            obsidian: "#1A1D1B",
            muted: "#2C312E",
          },
          slate: {
            DEFAULT: "#6B736F",    // Secondary editorial copy & metadata
            light: "#8E9691",      // Muted caption tone
            dark: "#484E4B",       // Strong secondary text
          },
        },

        /*
         * HERITAGE LUXE × INDIAN EDITORIAL PALETTE:
         * Preserved for 100% backward compatibility across existing components.
         */
        luxe: {
          burgundy: "#35131F",          // Royal Burgundy
          wine: "#501E2B",              // Wine
          maroon: "#211419",            // Dark Maroon
          ivory: "#EDE0CD",             // Antique Ivory
          gold: "#C3A16B",              // Muted Gold
          terracotta: "#9A6B57",        // Terracotta
          warmwhite: "#FAF5ED",         // Warm White
          charcoal: "#292326",          // Charcoal
          grey: "#77706B",              // Muted Grey
        },

        /*
         * RAGADHNI INDIAN HERITAGE COLOR PALETTE:
         * Preserved for 100% backward compatibility across existing components.
         */
        heritage: {
          burgundy: "#35131F",          // Royal Burgundy
          wine: "#501E2B",              // Wine
          "warm-ivory": "#FAF5ED",      // Warm White / Ivory
          "antique-gold": "#C3A16B",    // Muted Gold
          "antique-gold-light": "#DFC99E", // Light Muted Gold shimmer
          terracotta: "#9A6B57",        // Terracotta
          espresso: "#292326",          // Charcoal / Espresso
          ivory: "#FAF5ED",             // Warm White
          cream: "#EDE0CD",             // Antique Ivory
          sand: "#EDE0CD",              // Antique Ivory
          earth: "#77706B",             // Muted Grey
          charcoal: "#292326",          // Charcoal
          emerald: "#1B4332",           // Royal festive emerald
          gold: "#C3A16B",              // Muted Gold
          "gold-light": "#EFE4CE",      // Pale gold highlight
          rosewood: "#501E2B",          // Wine hover state
          maroon: "#211419",            // Dark Maroon
        },
      },

      /*
       * TYPOGRAPHY SYSTEM:
       * Cormorant Garamond for expressive editorial serif display headlines.
       * Manrope & Plus Jakarta Sans for clean, high-readability sans body and navigation.
       */
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["Manrope", "var(--font-jakarta)", "system-ui", "sans-serif"],
      },

      /*
       * EDITORIAL TYPOGRAPHIC SCALE:
       * Controlled letter-spacing and tight line-heights for luxury fashion layout.
       */
      fontSize: {
        "display-2xl": ["5.25rem", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-xl": ["4.25rem", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "editorial-h1": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "editorial-h2": ["2.125rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "editorial-h3": ["1.625rem", { lineHeight: "1.25", letterSpacing: "0" }],
        "editorial-kicker": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.28em" }],
        "editorial-nav": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
        "editorial-caption": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.14em" }],
      },

      letterSpacing: {
        kicker: "0.28em",
        brand: "0.22em",
        nav: "0.18em",
        spread: "0.35em",
        tightest: "-0.03em",
      },

      /*
       * EDITORIAL CONTENT WIDTHS & CONTAINERS:
       */
      maxWidth: {
        "editorial-narrow": "48rem",    // 768px (Essays, editorial copy)
        "editorial-prose": "56rem",     // 896px (Article spreads)
        "editorial-standard": "72rem",  // 1152px (Balanced boutique showcases)
        "editorial-wide": "84rem",      // 1344px (Flagship desktop container)
        "editorial-full": "100rem",     // 1600px (Cinematic wide viewport)
      },

      /*
       * EDITORIAL IMAGE PROPORTIONS:
       */
      aspectRatio: {
        "portrait-editorial": "4 / 5",   // Standard fashion editorial card
        "portrait-classic": "3 / 4",     // Traditional portrait drape
        "portrait-tall": "2 / 3",        // Haute couture runway silhouette
        "spread-wide": "16 / 10",        // Magazine horizontal spread
        cinema: "2.35 / 1",              // Cinematic brand film banner
      },

      /*
       * EDITORIAL BORDER RADII:
       * Sharp, refined architectural edges with subtle tactile corners.
       */
      borderRadius: {
        xs: "1px",
        sm: "2px",
        editorial: "3px",
        "editorial-card": "4px",
      },

      /*
       * EDITORIAL SHADOWS:
       * Very soft, tinted, diffused shadows with emerald-obsidian undertones.
       */
      boxShadow: {
        editorial: "0 10px 30px -10px rgba(18, 61, 50, 0.08)",
        "editorial-hover": "0 20px 40px -15px rgba(18, 61, 50, 0.12)",
        "editorial-card": "0 4px 20px -2px rgba(18, 61, 50, 0.06)",
        "editorial-float": "0 14px 36px -4px rgba(18, 61, 50, 0.14)",
        "editorial-glow-gold": "0 0 24px -4px rgba(182, 154, 98, 0.35)",
        "editorial-glow-terracotta": "0 0 24px -4px rgba(185, 102, 69, 0.35)",
      },

      /*
       * CINEMATIC EDITORIAL MOTION TIMING FUNCTIONS:
       */
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        "editorial-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "editorial-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "editorial-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },

  plugins: [],
};

export default config;
