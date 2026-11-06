/**
 * ==============================================================================
 * Ragadhni — PostCSS Configuration (`postcss.config.mjs`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * PostCSS is a tool that transforms and processes your CSS files during the build.
 * This file tells PostCSS which plugins it should run whenever it encounters CSS.
 *
 * WHY IT EXISTS:
 * Modern web development tools like Tailwind CSS do not write raw CSS manually.
 * Instead, they run as PostCSS plugins that generate and refine your final CSS.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * Whenever Next.js processes `src/styles/globals.css`, it hands that file over
 * to PostCSS. PostCSS runs the two plugins below in order:
 * 1. `tailwindcss`: Generates utility classes (like `px-4`, `text-sm`, `bg-heritage-terracotta`).
 * 2. `autoprefixer`: Adds browser-compatibility prefixes (e.g., `-webkit-backdrop-filter`)
 *    so styling looks consistent across all browsers (Chrome, Safari, Firefox, Edge, iPhone).
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Plugin 1: Tailwind CSS — Scans your JSX/TSX files and builds the exact CSS classes used.
    tailwindcss: {},

    // Plugin 2: Autoprefixer — Ensures smooth CSS rendering across older and mobile browsers.
    autoprefixer: {},
  },
};

// Export the configuration for PostCSS to use during compilation
export default config;
