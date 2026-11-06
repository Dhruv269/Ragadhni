/**
 * ==============================================================================
 * Ragadhni — Root Application Layout (`src/app/layout.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * In the Next.js App Router, `layout.tsx` is the master frame that wraps every single page.
 * It defines:
 * 1. The top-level `<html>` and `<body>` tags.
 * 2. Self-hosted Google Fonts (`Cormorant Garamond` and `Plus Jakarta Sans`).
 * 3. Global SEO metadata (page title, description, keywords, OpenGraph tags for social sharing).
 * 4. The persistent page structure:
 *    - `<AnnouncementBar />` (top promo strip)
 *    - `<Header />` (sticky brand navigation)
 *    - `<main>{children}</main>` (the unique content of each page)
 *    - `<Footer />` (trust pillars, sitemap, newsletter)
 *
 * WHY IT EXISTS:
 * Beginners often repeat the `<header>` and `<footer>` on every single page.
 * In Next.js, `layout.tsx` guarantees that the Header and Footer stay persistent across
 * page changes without reloading or flickering, creating a smooth native-app feeling.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Imports `src/styles/globals.css` to apply Tailwind and CSS variables across all pages.
 * - Injects the font CSS variables (`--font-cormorant` and `--font-jakarta`) consumed
 *   by `tailwind.config.ts`.
 * - Receives `{children}`: When visiting `/`, `{children}` is `src/app/page.tsx`.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { AnnouncementBar } from "@/components/storefront/header/AnnouncementBar";
import { Header } from "@/components/storefront/header/Header";
import { Footer } from "@/components/storefront/footer/Footer";

/*
 * ==============================================================================
 * 1. GOOGLE FONTS INITIALIZATION (`next/font/google`):
 * ==============================================================================
 * Next.js automatically downloads these fonts at build time, self-hosts them locally,
 * and sets `display: "swap"`.
 * WHY THIS IS GREAT:
 * 1. Zero layout shift (the page doesn't glitch while waiting for fonts to load).
 * 2. Faster load times because fonts are served from your own domain.
 * 3. Complete user privacy (no tracking requests sent to external Google servers).
 */

// Cormorant Garamond: Classical serif font for luxury editorial headlines
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant", // Injected as CSS variable `--font-cormorant`
  display: "swap",
});

// Plus Jakarta Sans: Modern geometric sans-serif for UI labels, prices, and navigation
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta", // Injected as CSS variable `--font-jakarta`
  display: "swap",
});

/*
 * ==============================================================================
 * 2. GLOBAL SEO METADATA:
 * ==============================================================================
 * Next.js automatically injects these properties into the HTML `<head>` tag.
 * These are essential for Google search rankings and social media link previews
 * (e.g. when someone shares a link to Ragadhni on WhatsApp, Instagram, or Twitter).
 */
export const metadata: Metadata = {
  title: "Ragadhni — Women's Indian Ethnic & Traditional Casual Wear",
  description:
    "Direct-to-consumer women's Indian ethnic wear and traditional casual clothing. Pure handloom weaves, elegant silhouettes, and contemporary tailoring for everyday grace and celebrations.",
  keywords: [
    "Ragadhni",
    "Indian ethnic wear",
    "kurtis",
    "sarees",
    "anarkalis",
    "salwar suits",
    "traditional casual wear",
    "chanderi silk",
    "festive wear",
  ],
  authors: [{ name: "Ragadhni" }],
  // OpenGraph metadata controls how links look when shared on WhatsApp/Facebook/LinkedIn
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ragadhni.com",
    title: "Ragadhni — Women's Indian Ethnic & Traditional Casual Wear",
    description:
      "Direct-to-consumer women's Indian ethnic wear and traditional casual clothing.",
    siteName: "Ragadhni",
  },
};

/*
 * ==============================================================================
 * 3. ROOT LAYOUT COMPONENT:
 * ==============================================================================
 */
export default function RootLayout({
  children,
}: {
  // `children` is whatever page the user is currently viewing (e.g., `src/app/page.tsx`)
  children: React.ReactNode;
}) {
  return (
    // Inject the font CSS variable class names onto the root <html> element
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      {/*
       * Body Layout:
       * `flex flex-col min-h-screen`: Flexbox column layout taking at least full screen height.
       * `main className="flex-1"`: Expands to fill available space, ensuring the Footer
       * is pushed to the bottom of the screen even on short pages.
       */}
      <body className="bg-heritage-ivory text-heritage-charcoal font-sans flex flex-col min-h-screen">
        {/* Top promotional announcement bar */}
        <AnnouncementBar />

        {/* Sticky brand navigation header */}
        <Header />

        {/* Dynamic page content */}
        <main className="flex-1">{children}</main>

        {/* Universal footer */}
        <Footer />
      </body>
    </html>
  );
}
