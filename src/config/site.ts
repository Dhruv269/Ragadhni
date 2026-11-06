/**
 * ==============================================================================
 * Ragadhni — Global Website Configuration (`src/config/site.ts`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file is the single source of truth for all global brand information,
 * navigation menus, customer care details, promotional messages, and trust badges.
 *
 * WHY IT EXISTS:
 * Beginners often hardcode text (like "Free shipping above ₹1,499" or customer care phone numbers)
 * directly into individual HTML or JSX files. When the business changes something, they have to
 * hunt through dozens of files to find every instance.
 * By placing all brand constants in this file:
 * - You change a value once here, and the entire website updates.
 * - Your code remains clean, modular, and easy to maintain.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - `siteConfig.announcements` is used by `AnnouncementBar.tsx` to cycle promo messages.
 * - `siteConfig.navItems` is used by `Header.tsx` (desktop mega-menu) and `MobileDrawer.tsx` (mobile menu).
 * - `siteConfig.trustSignals` is used by `Footer.tsx` to render customer reassurance cards.
 * - `siteConfig.contact` is used by `Footer.tsx` and `MobileDrawer.tsx` for support information.
 */

import { NavItem, TrustSignal } from "@/types";

export const siteConfig = {
  // Brand name displayed across page titles, headers, and metadata
  name: "Ragadhni",
  shortName: "Ragadhni",

  // Brand description used for Google search engine previews (SEO) and social media cards
  description:
    "Direct-to-consumer women's Indian ethnic wear and traditional casual clothing. Handcrafted fabrics, contemporary silhouettes, and timeless elegance.",

  // Canonical base web address
  url: "https://ragadhni.com",

  // Free shipping threshold in Indian Rupees (orders equal to or greater than this get free delivery)
  freeShippingThreshold: 1499,

  // Currency configuration
  currency: {
    symbol: "₹",
    code: "INR",
  },

  // Customer care contact channels
  contact: {
    email: "care@ragadhni.com",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    hours: "Monday to Saturday, 10:00 AM - 7:00 PM IST",
  },

  /*
   * Promotional announcements displayed in the cycling top bar (`AnnouncementBar.tsx`).
   * Adding or editing a string here instantly updates the banner.
   */
  announcements: [
    "Complimentary Shipping on all orders above ₹1,499 across India",
    "Discover the Festive Handloom Edit — Handcrafted Silhouettes in Pure Silk & Chanderi",
    "COD Available across 25,000+ Indian Pincodes with Instant Order Tracking",
  ],

  /*
   * Primary navigation hierarchy:
   * Used by both the desktop header (`Header.tsx`) and the mobile slide-out drawer (`MobileDrawer.tsx`).
   * Structured exclusively for women's Indian ethnic and traditional casual collections.
   */
  navItems: [
    {
      label: "Ethnic Wear",
      href: "/collections/ethnic-wear",
      children: [
        {
          title: "Traditional Heirlooms",
          items: [
            { label: "Handcrafted Sarees", href: "/women/sarees", badge: "Trending" },
            { label: "Lehengas & Anarkalis", href: "/women/lehengas-anarkalis", badge: "Festive" },
            { label: "Kurtis & Kurta Sets", href: "/women/kurtis" },
            { label: "Salwar Suits", href: "/women/salwar-suits" },
          ],
        },
        {
          title: "Celebration Edits",
          items: [
            { label: "Pure Chanderi Silk", href: "/women/sarees" },
            { label: "Banarasi Brocade", href: "/women/lehengas-anarkalis" },
            { label: "Handcrafted Dupattas", href: "/women/dupattas" },
            { label: "All Ethnic Wear", href: "/collections/ethnic-wear" },
          ],
        },
      ],
    },
    {
      label: "Traditional Casuals",
      href: "/collections/casual-wear",
      children: [
        {
          title: "Everyday Grace",
          items: [
            { label: "Ethnic Casual Dresses", href: "/women/casual-dresses", badge: "New" },
            { label: "Handblock Tops & Tunics", href: "/women/tops-tunics" },
            { label: "Palazzos & Trousers", href: "/women/bottomwear" },
            { label: "Organic Mulmul Sets", href: "/women/kurtis" },
          ],
        },
        {
          title: "Textile Crafts",
          items: [
            { label: "Bagru & Ajrakh Prints", href: "/women/casual-dresses" },
            { label: "Handspun Khadi", href: "/women/tops-tunics" },
            { label: "Pure Cotton Mulmul", href: "/women/kurtis" },
            { label: "All Casual Wear", href: "/collections/casual-wear" },
          ],
        },
      ],
    },
    {
      label: "All Women's",
      href: "/women",
    },
    {
      label: "New Arrivals",
      href: "/collections/new-arrivals",
      badge: "Fresh",
    },
    {
      label: "Festive Edit",
      href: "/collections/festive-wear",
      badge: "Celebration",
    },
    {
      label: "Bestsellers",
      href: "/collections/bestsellers",
    },
  ] as NavItem[],

  /*
   * Customer trust pillars:
   * Displayed in the footer (`Footer.tsx`) to reassure shoppers about product authenticity,
   * delivery speed, return policies, and online payment security.
   */
  trustSignals: [
    {
      title: "Authentic Indian Craft",
      description: "Rooted in authentic handloom weaves, chanderi silks, and natural dyes.",
      icon: "Sparkles",
    },
    {
      title: "Free Express Shipping",
      description: "Complimentary delivery on all prepaid & COD orders above ₹1,499.",
      icon: "Truck",
    },
    {
      title: "7-Day Easy Exchange",
      description: "Hassle-free size exchanges and doorstep reverse pickup.",
      icon: "RotateCcw",
    },
    {
      title: "100% Secure Checkout",
      description: "Protected payments via UPI, RuPay, Netbanking, Cards & Verified COD.",
      icon: "ShieldCheck",
    },
  ] as TrustSignal[],
};
