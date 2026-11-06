/**
 * ==============================================================================
 * Ragadhni — Next.js Configuration (`next.config.ts`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file controls how Next.js behaves when building and running your application.
 * It is where you configure build rules, security permissions, external domains,
 * and performance optimizations.
 *
 * WHY IT EXISTS:
 * Next.js needs to know project-wide settings before it starts compiling code.
 * Without this file, Next.js uses standard default settings.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * In Ragadhni, components like `ProductCard.tsx` and `page.tsx` use the Next.js
 * `<Image />` component to display editorial clothing photos from Unsplash.
 * Next.js requires external image domains to be explicitly permitted here
 * so it can safely optimize (compress and convert to WebP/AVIF) external pictures.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Image Optimization Settings:
   * By default, Next.js blocks loading images from external websites to protect
   * your users from malicious external servers and prevent unexpected bandwidth costs.
   */
  images: {
    /*
     * `remotePatterns` tells Next.js: "It is safe to download and optimize
     * images from these specific trusted web domains."
     */
    remotePatterns: [
      {
        // Only allow secure HTTPS requests
        protocol: "https",
        // Allow Unsplash, which hosts our sample editorial apparel photography
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// Export the configuration object so Next.js build tools can read it
export default nextConfig;
