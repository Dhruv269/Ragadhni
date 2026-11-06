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
    "Complimentary Express Shipping on all orders above ₹1,499 across India",
    "The Royal Heritage Edit — Handcrafted Sarees, Anarkalis & Festive Silk Ensembles",
    "COD Available across 25,000+ Indian Pincodes with Instant Doorstep Tracking",
  ],

  /*
   * Primary navigation hierarchy:
   * Used by both the desktop header (`Header.tsx`) and the mobile slide-out drawer (`MobileDrawer.tsx`).
   * Structured exclusively for women's Indian ethnic wear, traditional casuals, and handcrafted accessories.
   */
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Shop",
      href: "/women",
      children: [
        {
          title: "Women's Silhouettes",
          items: [
            { label: "Handcrafted Sarees", href: "/women/sarees", badge: "Heirloom" },
            { label: "Kurtas & Suits", href: "/women/kurtis", badge: "Popular" },
            { label: "Festive Lehengas", href: "/women/lehengas-anarkalis", badge: "Festive" },
            { label: "Ethnic Dresses", href: "/women/casual-dresses" },
            { label: "Artisanal Dupattas", href: "/women/dupattas" },
            { label: "Jewellery & Accessories", href: "/women/accessories", badge: "New" },
          ],
        },
        {
          title: "Artisan Crafts & Edits",
          items: [
            { label: "Pure Chanderi Silk", href: "/collections/ethnic-wear" },
            { label: "Organic Mulmul Cotton", href: "/collections/casual-wear" },
            { label: "Salwar Suits & Sets", href: "/women/salwar-suits" },
            { label: "Tops & Tunics", href: "/women/tops-tunics" },
            { label: "Palazzos & Bottomwear", href: "/women/bottomwear" },
            { label: "Explore All Women's", href: "/women" },
          ],
        },
      ],
    },
    {
      label: "Collections",
      href: "/collections/ethnic-wear",
      children: [
        {
          title: "Occasion Edits",
          items: [
            { label: "Everyday Elegance", href: "/collections/casual-wear" },
            { label: "Festive Edit", href: "/collections/festive-wear", badge: "Celebration" },
            { label: "Traditional Classics", href: "/collections/ethnic-wear" },
            { label: "Contemporary Ethnic", href: "/collections/new-arrivals", badge: "Fresh" },
            { label: "Wedding Guest Edit", href: "/collections/bestsellers" },
          ],
        },
      ],
    },
    {
      label: "Our Story",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
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
