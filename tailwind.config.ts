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
         * HERITAGE LUXE × INDIAN EDITORIAL PALETTE:
         * Bespoke luxury palette reflecting Indian royal architectural aesthetics & contemporary fashion.
         */
        luxe: {
          burgundy: "#35131F",          // Royal Burgundy (Primary brand identity)
          wine: "#501E2B",              // Wine (Rich secondary dark tone)
          maroon: "#211419",            // Dark Maroon (Deepest contrast)
          ivory: "#EDE0CD",             // Antique Ivory (Warm supporting surface)
          gold: "#C3A16B",              // Muted Gold (Architectural borders & accents)
          terracotta: "#9A6B57",        // Terracotta (Earthy Indian clay accent)
          warmwhite: "#FAF5ED",         // Warm White (Clean luminous background)
          charcoal: "#292326",          // Charcoal (High-readability text)
          grey: "#77706B",              // Muted Grey (Subtle secondary copy)
        },

        /*
         * RAGADHNI INDIAN HERITAGE COLOR PALETTE:
         * Harmonized with Heritage Luxe tokens for full backward compatibility across components.
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
       * Cormorant Garamond for editorial serif headlines.
       * Manrope for UI navigation, buttons, prices, and functional typography.
       */
      fontFamily: {
        // `font-serif`: Cormorant Garamond — Used for large editorial headlines and brand names
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        // `font-sans`: Manrope — Clean, contemporary geometric sans for interface, navigation, buttons, and prices
        sans: ["Manrope", "var(--font-jakarta)", "system-ui", "sans-serif"],
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
