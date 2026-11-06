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
         * RAGADHNI INDIAN HERITAGE COLOR PALETTE:
         * A bespoke palette reflecting Indian royal heritage, handlooms, and natural dyes.
         */
        heritage: {
          // Modern Royal Heritage Palette Tokens:
          burgundy: "#641E2B",          // Deep contrast & brand identity
          "warm-ivory": "#F7F1E7",      // Dominant editorial canvas background
          "antique-gold": "#B69A62",    // Hairlines, badges & delicate accents
          "antique-gold-light": "#CFBC93", // Shimmer & hover state
          terracotta: "#B65C43",        // Warm clay accent
          espresso: "#30231F",          // Deep readable typography & borders

          // Existing Tokens (Consolidated & preserved for backward compatibility):
          ivory: "#F7F1E7",             // Standardized to warm ivory
          cream: "#F5EFEB",             // Soft panel fills
          sand: "#EDE4D7",              // Muted dividers & borders
          earth: "#57534E",             // Secondary text
          charcoal: "#30231F",          // High-contrast espresso charcoal
          emerald: "#1B4332",           // Royal festive emerald
          gold: "#B69A62",              // Antique gold
          "gold-light": "#E9DCB9",      // Pale gold highlight
          rosewood: "#8B2B3C",          // Burgundy hover state
          maroon: "#641E2B",            // Burgundy accent
        },
      },

      /*
       * TYPOGRAPHY SYSTEM:
       * Defines which font family is used when you write `font-serif` or `font-sans` in your code.
       */
      fontFamily: {
        // `font-serif`: Cormorant Garamond — Used for large editorial headlines and brand names
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        // `font-sans`: Plus Jakarta Sans — Clean, modern font for interface labels, prices, and body text
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },

      /*
       * EDITORIAL SHADOWS:
       * Very soft, diffused shadows that give cards a premium floating feel without harsh black lines.
       */
      boxShadow: {
        editorial: "0 10px 30px -10px rgba(28, 25, 23, 0.08)",
        "editorial-hover": "0 20px 40px -15px rgba(28, 25, 23, 0.12)",
      },
    },
  },

  plugins: [],
};

export default config;
