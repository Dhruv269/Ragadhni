/**
 * ==============================================================================
 * Ragadhni — Mobile Navigation Drawer (`MobileDrawer.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders the slide-out navigation menu for smartphones and tablets.
 * It contains:
 * 1. Brand logo and close button ("X").
 * 2. Expandable accordion menus for Indian ethnic & traditional casual categories.
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
  // Tracks which accordion section is currently open (defaults to "Shop" so first-time shoppers see categories)
  const [expandedSection, setExpandedSection] = useState<string | null>("Shop");

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
        className="fixed inset-0 bg-luxe-maroon/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/*
       * 2. SLIDE-OUT PANEL:
       * Refined warm white drawer anchored to the left side with gold hairline accents.
       */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-luxe-warmwhite shadow-2xl flex flex-col z-50 overflow-y-auto border-r border-luxe-gold/30">
        {/* Drawer Header: Brand name & Close "X" Button */}
        <div className="flex items-center justify-between p-5 border-b border-luxe-gold/25">
          <div>
            <span className="font-serif text-2xl tracking-[0.24em] font-normal text-luxe-charcoal uppercase">
              Ragadhni
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-luxe-grey mt-0.5">
              Women&apos;s Indian Ethnic
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-luxe-charcoal hover:bg-luxe-ivory rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/*
         * 3. MAIN NAVIGATION LIST:
         * Maps over `siteConfig.navItems`. Items with subcategories render as accordions,
         * while top-level links render as direct links with min 44px touch targets.
         */}
        <div className="flex-1 py-4 divide-y divide-luxe-gold/20">
          <div className="px-3 pb-3 space-y-1">
            {siteConfig.navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedSection === item.label;

              // If this item has subcategories -> Render Accordion
              if (hasChildren) {
                return (
                  <div key={item.label} className="rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="w-full flex items-center justify-between px-3.5 py-3.5 min-h-[48px] text-sm font-medium tracking-wide text-luxe-charcoal hover:bg-luxe-ivory/60 transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="terracotta">{item.badge}</Badge>
                        )}
                      </span>
                      {/* Chevron rotates 180 degrees when expanded */}
                      <ChevronDown
                        className={`w-4 h-4 text-luxe-grey transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Subcategories revealed when accordion is open */}
                    {isExpanded && (
                      <div className="bg-luxe-ivory/40 px-4 py-2 space-y-3">
                        {item.children?.map((subGroup) => (
                          <div key={subGroup.title} className="space-y-1.5">
                            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-luxe-terracotta">
                              {subGroup.title}
                            </h4>
                            <ul className="space-y-1 pl-2">
                              {subGroup.items.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="flex items-center justify-between py-2 px-2 min-h-[44px] text-xs text-luxe-charcoal hover:text-luxe-burgundy transition-colors"
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

              // Standard direct navigation link
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-3 min-h-[48px] text-sm font-medium tracking-wide text-luxe-charcoal hover:bg-luxe-ivory/60 rounded-md transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="terracotta">{item.badge}</Badge>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-luxe-grey/60" />
                </Link>
              );
            })}
          </div>

          {/*
           * 4. QUICK ACCOUNT & SHOPPING LINKS:
           * Direct access to Account, Wishlist, and Shopping Bag with live counters and min 44px touch targets.
           */}
          <div className="p-4 space-y-1.5 text-sm text-luxe-charcoal">
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center space-x-3 py-2.5 px-2 min-h-[44px] hover:text-luxe-burgundy transition-colors"
            >
              <User className="w-4 h-4 text-luxe-grey" />
              <span>My Account & Orders</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 px-2 min-h-[44px] hover:text-luxe-burgundy transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Heart className="w-4 h-4 text-luxe-grey" />
                <span>My Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="text-xs bg-luxe-ivory text-luxe-maroon border border-luxe-gold/40 px-2 py-0.5 rounded-full font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 px-2 min-h-[44px] hover:text-luxe-burgundy transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-4 h-4 text-luxe-grey" />
                <span>Shopping Bag</span>
              </div>
              {cartCount > 0 && (
                <span className="text-xs bg-luxe-gold text-luxe-maroon px-2 py-0.5 rounded-full font-semibold">
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
        <div className="p-4 bg-luxe-ivory/50 border-t border-luxe-gold/25 space-y-1.5">
          <div className="flex items-center space-x-2 text-xs text-luxe-grey">
            <Phone className="w-3.5 h-3.5 text-luxe-terracotta" />
            <span>Need Help? Call / WhatsApp:</span>
          </div>
          <p className="text-xs font-semibold text-luxe-charcoal">
            {siteConfig.contact.phone}
          </p>
          <p className="text-[11px] text-luxe-grey">
            {siteConfig.contact.hours}
          </p>
        </div>
      </div>
    </div>
  );
}
