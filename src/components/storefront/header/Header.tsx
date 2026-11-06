/**
 * ==============================================================================
 * Ragadhni — Main Editorial Header & Navigation (`Header.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component is the main navigation header at the top of the storefront.
 * It stays pinned (sticky) to the top of the browser as the shopper scrolls down.
 * It manages:
 * 1. The brand wordmark ("RAGADHNI") with subtle subtitle.
 * 2. Desktop multi-column mega-menus with category previews.
 * 3. Expandable search drawer with popular Indian ethnic keyword suggestions.
 * 4. Action icons: Customer account, wishlist counter badge, and shopping bag counter badge.
 * 5. Mobile hamburger button and `MobileDrawer` visibility state.
 *
 * WHY IT EXISTS:
 * E-commerce navigation is the primary tool customers use to discover garments.
 * It needs to be fast, clear, visually elegant, and work seamlessly on both mobile
 * and large desktop monitors.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Included in `src/app/layout.tsx` so it appears consistently across all pages.
 * - Imports `siteConfig.navItems` from `src/config/site.ts` to build desktop menus.
 * - Renders and controls `<MobileDrawer>` from `MobileDrawer.tsx`.
 * - Uses `<Badge>` from `src/components/ui/Badge.tsx` to highlight new categories.
 */

// We mark this as a Client Component because it manages user clicks, hover menus, and search input state
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MobileDrawer } from "./MobileDrawer";

export function Header() {
  // ----------------------------------------------------------------------------
  // COMPONENT STATE (Variables that trigger a re-render when their values change)
  // ----------------------------------------------------------------------------

  // Controls whether the slide-out mobile drawer is open or closed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Controls whether the search bar drawer is expanded below the header
  const [searchOpen, setSearchOpen] = useState(false);

  // Holds the text currently typed into the search input box
  const [searchQuery, setSearchQuery] = useState("");

  // Tracks which top-level menu item is currently hovered on desktop (e.g., "Ethnic Wear" or "Traditional Casuals")
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Mock counters for Phase 1 (these connect to real Cart & Wishlist state in Phase 3)
  const cartCount = 2;
  const wishlistCount = 1;

  /**
   * `handleSearchSubmit`:
   * Runs when the user presses Enter in the search bar.
   * Redirects the browser to `/search?q=query` to display search results.
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents standard page reload
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/*
       * STICKY HEADER:
       * `sticky top-0 z-40`: Pins the header to the top of the viewport.
       * Frosted glass effect in Warm White with Muted Gold hairline bottom separator.
       */}
      <header className="sticky top-0 z-40 bg-luxe-warmwhite/95 backdrop-blur-md border-b border-luxe-gold/25 transition-all">
        {/* Main Brand Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            {/*
             * LEFT SECTION:
             * On mobile: Hamburger button to open mobile menu.
             * On desktop: Subtle editorial line or quick collection link.
             */}
            <div className="flex items-center lg:w-1/4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-luxe-charcoal hover:text-luxe-burgundy transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden lg:flex items-center space-x-3 text-[11px] uppercase tracking-[0.2em] text-luxe-grey font-medium">
                <Link
                  href="/collections/ethnic-wear"
                  className="hover:text-luxe-burgundy transition-colors"
                >
                  Heirlooms
                </Link>
                <span className="text-luxe-gold/50">&bull;</span>
                <Link
                  href="/collections/casual-wear"
                  className="hover:text-luxe-burgundy transition-colors"
                >
                  Daily Casuals
                </Link>
              </div>
            </div>

            {/*
             * CENTER SECTION:
             * Brand Wordmark & Heritage Subtitle.
             * Balanced Cormorant Garamond typography.
             */}
            <div className="text-center flex-1 lg:w-2/4">
              <Link href="/" className="inline-block group py-1">
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-[32px] tracking-[0.24em] text-luxe-charcoal uppercase font-normal transition-colors group-hover:text-luxe-burgundy leading-none">
                  Ragadhni
                </h1>
                <p className="text-[9px] sm:text-[10px] tracking-[0.34em] uppercase text-luxe-grey mt-1 font-medium">
                  Women&apos;s Indian Ethnic
                </p>
              </Link>
            </div>

            {/*
             * RIGHT SECTION:
             * Utility icons: Search, Customer Account, Wishlist, and Shopping Bag.
             */}
            <div className="flex items-center justify-end space-x-3 sm:space-x-5 lg:w-1/4">
              {/* Search Toggle Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-luxe-charcoal hover:text-luxe-burgundy transition-colors"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Customer Account Icon (hidden on small mobile screens to save space) */}
              <Link
                href="/account"
                className="hidden sm:block p-1.5 text-luxe-charcoal hover:text-luxe-burgundy transition-colors"
                aria-label="Customer account"
              >
                <User className="w-5 h-5 stroke-[1.75]" />
              </Link>

              {/* Wishlist Link with Live Counter Badge */}
              <Link
                href="/wishlist"
                className="relative p-1.5 text-luxe-charcoal hover:text-luxe-burgundy transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxe-ivory text-luxe-burgundy text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center border border-luxe-gold/50 shadow-2xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Link with Live Counter Badge */}
              <Link
                href="/cart"
                className="relative p-1.5 text-luxe-charcoal hover:text-luxe-burgundy transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxe-burgundy text-luxe-warmwhite text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/*
         * DESKTOP PRIMARY NAVIGATION BAR (Hidden on mobile via `hidden lg:block`):
         */}
        <nav className="hidden lg:block border-t border-luxe-gold/20 bg-luxe-warmwhite/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center justify-center space-x-8 text-xs font-medium uppercase tracking-[0.16em] py-2.5">
              {siteConfig.navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <li
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => hasChildren && setActiveMegaMenu(item.label)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <Link
                      href={item.href}
                      className="inline-flex items-center space-x-1.5 py-1 text-luxe-charcoal hover:text-luxe-burgundy transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-1 text-[9px] bg-luxe-gold/20 text-luxe-maroon border border-luxe-gold/40 px-1.5 py-0.2 rounded-xs font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* FLOATING MEGA-MENU DROPDOWN */}
                    {hasChildren && activeMegaMenu === item.label && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] bg-luxe-warmwhite border border-luxe-gold/30 shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="grid grid-cols-2 gap-8">
                          {item.children?.map((group) => (
                            <div key={group.title} className="space-y-3">
                              <h3 className="font-serif text-sm tracking-widest text-luxe-burgundy border-b border-luxe-gold/25 pb-2 font-normal uppercase">
                                {group.title}
                              </h3>
                              <ul className="space-y-2">
                                {group.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link
                                      href={subItem.href}
                                      className="flex items-center justify-between text-xs text-luxe-charcoal hover:text-luxe-burgundy normal-case tracking-normal transition-colors py-0.5"
                                    >
                                      <span>{subItem.label}</span>
                                      {subItem.badge && (
                                        <span className="text-[9px] bg-luxe-gold/20 text-luxe-maroon border border-luxe-gold/30 px-1 py-0.2 font-medium">
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/*
         * EXPANDABLE SEARCH DRAWER:
         * Slides down from the header when `searchOpen` is true.
         * Contains an autofocus search input and clickable popular Indian ethnic keywords.
         */}
        {searchOpen && (
          <div className="border-t border-heritage-antique-gold/25 bg-heritage-warm-ivory/98 backdrop-blur-md px-4 py-4 animate-in fade-in duration-200">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3 w-5 h-5 text-heritage-espresso/60" />
                <input
                  type="text"
                  placeholder="Search kurtis, sarees, anarkalis, salwar suits, palazzos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-heritage-warm-ivory border border-heritage-antique-gold/40 rounded-none pl-11 pr-10 py-3 text-sm text-heritage-espresso placeholder:text-heritage-espresso/50 focus:outline-none focus:border-heritage-burgundy focus:ring-1 focus:ring-heritage-burgundy"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 p-1 text-heritage-espresso/60 hover:text-heritage-espresso"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              {/* Popular Indian Fashion Suggestions */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-heritage-espresso/70">
                <span className="font-medium text-heritage-espresso">Popular:</span>
                <Link
                  href="/search?q=Chanderi+Kurti"
                  className="hover:text-heritage-burgundy underline underline-offset-2"
                >
                  Chanderi Kurti
                </Link>
                <span>&bull;</span>
                <Link
                  href="/search?q=Pure+Silk+Saree"
                  className="hover:text-heritage-burgundy underline underline-offset-2"
                >
                  Silk Saree
                </Link>
                <span>&bull;</span>
                <Link
                  href="/search?q=Anarkali+Suit"
                  className="hover:text-heritage-burgundy underline underline-offset-2"
                >
                  Anarkali Suit
                </Link>
                <span>&bull;</span>
                <Link
                  href="/search?q=Banarasi+Lehenga"
                  className="hover:text-heritage-burgundy underline underline-offset-2"
                >
                  Banarasi Lehenga
                </Link>
                <span>&bull;</span>
                <Link
                  href="/search?q=Kundan+Jewellery"
                  className="hover:text-heritage-burgundy underline underline-offset-2"
                >
                  Kundan Jewellery
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/*
       * MOBILE DRAWER INSTANCE:
       * Rendered conditionally on mobile when `mobileMenuOpen` is true.
       */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </>
  );
}
