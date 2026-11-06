/**
 * ==============================================================================
 * Ragadhni — Mobile Navigation Drawer (`MobileDrawer.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders the slide-out navigation menu for smartphones and tablets.
 * It contains:
 * 1. Brand logo and close button ("X").
 * 2. Expandable accordion menus for Women's and Men's Indian ethnic categories.
 * 3. Direct links to customer account, wishlist, and shopping bag.
 * 4. Direct phone and WhatsApp customer support contact info.
 *
 * WHY IT EXISTS:
 * Over 80% of Indian fashion e-commerce shopping happens on mobile devices.
 * A desktop navigation bar cannot fit on a small screen. This drawer provides
 * an ergonomic, thumb-friendly navigation experience tailored for mobile users.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Controlled by `Header.tsx`: When the user taps the hamburger menu icon in the header,
 *   `Header.tsx` sets `mobileMenuOpen = true`, which makes this drawer visible.
 * - Reads categories and support info from `siteConfig` in `src/config/site.ts`.
 * - Uses `Badge` from `src/components/ui/Badge.tsx` to highlight "New" and "Trending" labels.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { X, ChevronDown, ChevronRight, Heart, ShoppingBag, User, Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * MobileDrawerProps:
 * Defines the properties passed down from the parent `Header` component.
 */
interface MobileDrawerProps {
  // Whether the drawer is currently open and visible
  isOpen: boolean;
  // Callback function to close the drawer (called when tapping "X" or the backdrop)
  onClose: () => void;
  // Current count of items in the shopping bag
  cartCount: number;
  // Current count of items in the wishlist
  wishlistCount: number;
}

export function MobileDrawer({
  isOpen,
  onClose,
  cartCount,
  wishlistCount,
}: MobileDrawerProps) {
  // Tracks which accordion section is currently open (defaults to "Women" so first-time shoppers see options)
  const [expandedSection, setExpandedSection] = useState<string | null>("Women");

  /*
   * EARLY EXIT (PERFORMANCE OPTIMIZATION):
   * If `isOpen` is false, return `null`. This prevents rendering hundreds of invisible
   * DOM nodes when the user isn't using the mobile menu.
   */
  if (!isOpen) return null;

  /**
   * Toggles an accordion section open or closed:
   * If the section is already open, clicking it sets it to `null` (collapsing it).
   * Otherwise, it opens that section.
   */
  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  return (
    // Fixed overlay covering the entire screen, hidden on large desktop screens (`lg:hidden`)
    <div className="fixed inset-0 z-50 lg:hidden">
      {/*
       * 1. BACKDROP:
       * A dark, semi-transparent blurred layer over the website.
       * Tapping anywhere outside the menu calls `onClose()` to dismiss the drawer.
       */}
      <div
        className="fixed inset-0 bg-heritage-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/*
       * 2. SLIDE-OUT PANEL:
       * The physical white/ivory drawer anchored to the left side of the screen.
       */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-heritage-ivory shadow-2xl flex flex-col z-50 overflow-y-auto">
        {/* Drawer Header: Brand name & Close "X" Button */}
        <div className="flex items-center justify-between p-5 border-b border-[#E8DFD0]">
          <div>
            <span className="font-serif text-2xl tracking-[0.2em] font-normal text-heritage-charcoal uppercase">
              Ragadhni
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-heritage-earth/70 mt-0.5">
              Indian Ethnic & Casuals
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-heritage-charcoal hover:bg-heritage-sand/60 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/*
         * 3. MAIN NAVIGATION LIST:
         * Maps over `siteConfig.navItems`. Items with subcategories render as accordions,
         * while top-level links (like "New Arrivals") render as direct links.
         */}
        <div className="flex-1 py-4 divide-y divide-[#EFE7D8]">
          <div className="px-3 pb-3 space-y-1">
            {siteConfig.navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedSection === item.label;

              // If this item has subcategories (e.g. Women, Men) -> Render Accordion
              if (hasChildren) {
                return (
                  <div key={item.label} className="rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium tracking-wide text-heritage-charcoal hover:bg-heritage-sand/40 transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="terracotta">{item.badge}</Badge>
                        )}
                      </span>
                      {/* Chevron rotates 180 degrees when expanded */}
                      <ChevronDown
                        className={`w-4 h-4 text-heritage-earth transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Subcategories revealed when accordion is open */}
                    {isExpanded && (
                      <div className="bg-heritage-cream/40 px-4 py-2 space-y-3">
                        {item.children?.map((subGroup) => (
                          <div key={subGroup.title} className="space-y-1.5">
                            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-heritage-terracotta">
                              {subGroup.title}
                            </h4>
                            <ul className="space-y-1 pl-2">
                              {subGroup.items.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="flex items-center justify-between py-1.5 text-xs text-heritage-charcoal hover:text-heritage-terracotta transition-colors"
                                  >
                                    <span>{subItem.label}</span>
                                    {subItem.badge && (
                                      <Badge variant="gold">{subItem.badge}</Badge>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // Standard direct navigation link (e.g., "Ethnic Wear", "New Arrivals")
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-medium tracking-wide text-heritage-charcoal hover:bg-heritage-sand/40 rounded-md transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="terracotta">{item.badge}</Badge>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-heritage-earth/60" />
                </Link>
              );
            })}
          </div>

          {/*
           * 4. QUICK ACCOUNT & SHOPPING LINKS:
           * Direct access to Account, Wishlist, and Shopping Bag with live counters.
           */}
          <div className="p-4 space-y-3 text-sm text-heritage-charcoal">
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center space-x-3 py-1.5 hover:text-heritage-terracotta transition-colors"
            >
              <User className="w-4 h-4 text-heritage-earth" />
              <span>My Account & Orders</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-1.5 hover:text-heritage-terracotta transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Heart className="w-4 h-4 text-heritage-earth" />
                <span>My Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="text-xs bg-heritage-sand px-2 py-0.5 rounded-full font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-between py-1.5 hover:text-heritage-terracotta transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-4 h-4 text-heritage-earth" />
                <span>Shopping Bag</span>
              </div>
              {cartCount > 0 && (
                <span className="text-xs bg-heritage-terracotta text-heritage-ivory px-2 py-0.5 rounded-full font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/*
         * 5. FOOTER SUPPORT SECTION:
         * Dedicated contact card at the bottom of the drawer to help shoppers
         * call or message customer care directly.
         */}
        <div className="p-4 bg-heritage-cream/60 border-t border-[#E8DFD0] space-y-2">
          <div className="flex items-center space-x-2 text-xs text-heritage-earth">
            <Phone className="w-3.5 h-3.5 text-heritage-terracotta" />
            <span>Need Help? Call / WhatsApp:</span>
          </div>
          <p className="text-xs font-semibold text-heritage-charcoal">
            {siteConfig.contact.phone}
          </p>
          <p className="text-[11px] text-heritage-earth/80">
            {siteConfig.contact.hours}
          </p>
        </div>
      </div>
    </div>
  );
}
