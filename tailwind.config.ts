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
         * A bespoke palette reflecting Indian handlooms, natural vegetable dyes, and clay architecture.
         */
        heritage: {
          // Primary Canvas: Raw Silk Ivory (#FAF7F2) — warmer and softer than harsh pure white (#FFF)
          ivory: "#FAF7F2",
          // Secondary Canvas: Soft cream (#F5EFEB) used for subtle card panels and backgrounds
          cream: "#F5EFEB",
          // Neutral: Handspun Khadi Sand (#EDE4D7) used for borders, chip badges, and dividers
          sand: "#EDE4D7",
          // Muted Body: Slate Earth (#57534E) for secondary text, metadata, and fabric details
          earth: "#57534E",
          // Primary Typography: Deep Charcoal (#1C1917) providing high-contrast editorial elegance
          charcoal: "#1C1917",
          // Jewel Accent: Deep Royal Emerald (#1B4332) for festive touches and success states
          emerald: "#1B4332",
          // Metallic Accent: Antique Kansa Gold (#C2A673) for celebratory badges and ratings
          gold: "#C2A673",
          "gold-light": "#E9DCB9",
          // Signature Brand Color: Terracotta / Sindoor (#9E3D2B) for primary buttons & active links
          terracotta: "#9E3D2B",
          // Hover State: Rosewood (#B85D4A) used when hovering over terracotta elements
          rosewood: "#B85D4A",
          // Special Accent: Jamun Maroon (#681D23) for discount badges and sale highlights
          maroon: "#681D23",
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
