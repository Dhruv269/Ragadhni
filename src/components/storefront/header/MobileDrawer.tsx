/**
 * ==============================================================================
 * Ragadhni — Mobile Navigation Drawer (`MobileDrawer.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders the slide-out navigation drawer for smartphones and tablets.
 * Grounded in "The Contemporary Indian Fashion Editorial" aesthetic:
 * 1. Deep Obsidian-Emerald backdrop blur overlay.
 * 2. Warm Paper drawer panel with Antique Gold hairline borders.
 * 3. Prominent serif wordmark ("RAGADHNI") with atelier subtitle.
 * 4. Quick in-drawer search trigger for immediate discovery.
 * 5. Expandable accordion menus for Indian ethnic silhouettes and artisanal edits.
 * 6. Quick action links (Account, Wishlist, Bag) with live badges and 48px touch targets.
 * 7. Atelier concierge card with direct phone, WhatsApp, and service hours.
 * 8. Full accessibility: Esc key dismiss, body scroll lock, and ARIA labels.
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  X,
  ChevronDown,
  ChevronRight,
  Heart,
  ShoppingBag,
  User,
  Phone,
  Search,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
}

export function MobileDrawer({
  isOpen,
  onClose,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenCart,
}: MobileDrawerProps) {
  // Tracks active accordion section (defaults to "Shop" so first-time shoppers see categories immediately)
  const [expandedSection, setExpandedSection] = useState<string | null>("Shop");

  // Lock body scroll when mobile drawer is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* ---------------------------------------------------------------------- */}
      {/* 1. BACKDROP OVERLAY                                                    */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="fixed inset-0 bg-[#0B2620]/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ---------------------------------------------------------------------- */}
      {/* 2. SLIDE-OUT PANEL                                                     */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="fixed inset-y-0 left-0 w-full max-w-xs sm:max-w-sm bg-[#FAF6EE] shadow-editorial-float flex flex-col z-50 overflow-y-auto border-r border-editorial-gold/30 animate-in slide-in-from-left duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-editorial-gold/25 bg-[#FAF6EE] sticky top-0 z-10">
          <div>
            <Link href="/" onClick={onClose} className="block">
              <span className="font-serif text-2xl tracking-[0.24em] font-normal text-editorial-emerald uppercase block leading-none">
                Ragadhni
              </span>
              <span className="text-[9px] tracking-[0.32em] uppercase text-editorial-gold-deep mt-1 font-semibold block">
                Women&apos;s Indian Atelier
              </span>
            </Link>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-editorial-charcoal hover:text-editorial-terracotta hover:bg-editorial-ivory/60 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-editorial"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        {/* Quick In-Drawer Search Input Trigger */}
        <div className="px-5 pt-4 pb-2">
          <button
            type="button"
            onClick={() => {
              if (onOpenSearch) {
                onOpenSearch();
              } else {
                onClose();
              }
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-editorial-ivory/70 border border-editorial-gold/30 text-xs text-editorial-slate hover:border-editorial-terracotta hover:text-editorial-charcoal transition-all"
          >
            <span className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-editorial-slate" />
              <span>Search sarees, kurtas, dupattas...</span>
            </span>
            <span className="text-[10px] text-editorial-terracotta font-semibold uppercase tracking-wider">
              Find
            </span>
          </button>
        </div>

        {/* ---------------------------------------------------------------------- */}
        {/* 3. MAIN NAVIGATION ACCORDIONS & LINKS                                  */}
        {/* ---------------------------------------------------------------------- */}
        <div className="flex-1 py-3 px-4 divide-y divide-editorial-gold/20 space-y-3">
          <div className="space-y-1">
            {/* Direct Home Link */}
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-3 min-h-[48px] text-xs uppercase tracking-widest font-semibold text-editorial-charcoal hover:bg-editorial-ivory/60 rounded-xl transition-colors"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-editorial-slate" />
            </Link>

            {/* SHOP ACCORDION */}
            <div className="rounded-xl overflow-hidden border border-editorial-gold/20 bg-editorial-ivory/30">
              <button
                onClick={() => toggleSection("Shop")}
                className="w-full flex items-center justify-between px-3.5 py-3.5 min-h-[48px] text-xs uppercase tracking-widest font-semibold text-editorial-emerald hover:bg-editorial-ivory/60 transition-colors"
                aria-expanded={expandedSection === "Shop"}
              >
                <span className="flex items-center space-x-2">
                  <span>Shop</span>
                  <Badge variant="terracotta">All Wear</Badge>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-editorial-slate transition-transform duration-200 ${
                    expandedSection === "Shop" ? "rotate-180 text-editorial-terracotta" : ""
                  }`}
                />
              </button>

              {expandedSection === "Shop" && (
                <div className="bg-[#FAF6EE] px-4 py-3 space-y-4 border-t border-editorial-gold/20">
                  {/* Subgroup 1: Silhouettes */}
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-editorial-terracotta flex items-center justify-between">
                      <span>Women&apos;s Silhouettes</span>
                      <span className="text-editorial-gold">01</span>
                    </h4>
                    <ul className="space-y-1 pl-1">
                      {[
                        { label: "Handcrafted Sarees", href: "/women/sarees", badge: "Heirloom" },
                        { label: "Kurtas & Sets", href: "/women/kurtis", badge: "Popular" },
                        { label: "Festive Lehengas", href: "/women/lehengas-anarkalis", badge: "Festive" },
                        { label: "Ethnic Dresses", href: "/women/casual-dresses" },
                        { label: "Artisanal Dupattas", href: "/women/dupattas" },
                        { label: "Jewellery & Accessories", href: "/women/accessories", badge: "New" },
                      ].map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center justify-between py-2 px-2.5 min-h-[44px] text-xs text-editorial-charcoal hover:text-editorial-terracotta hover:bg-editorial-ivory/50 rounded-lg transition-colors"
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <Badge variant={item.badge === "Heirloom" ? "gold" : "terracotta"}>
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subgroup 2: Weaves & Edits */}
                  <div className="space-y-1.5 pt-2 border-t border-editorial-gold/15">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-editorial-terracotta flex items-center justify-between">
                      <span>Artisan Crafts & Edits</span>
                      <span className="text-editorial-gold">02</span>
                    </h4>
                    <ul className="space-y-1 pl-1">
                      {[
                        { label: "Pure Chanderi Silk", href: "/collections/ethnic-wear" },
                        { label: "Organic Mulmul Cotton", href: "/collections/casual-wear" },
                        { label: "Salwar Suits & Sets", href: "/women/salwar-suits" },
                        { label: "Tops & Tunics", href: "/women/tops-tunics" },
                        { label: "Palazzos & Bottomwear", href: "/women/bottomwear" },
                        { label: "View Complete Collection", href: "/women", badge: "All" },
                      ].map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center justify-between py-2 px-2.5 min-h-[44px] text-xs text-editorial-charcoal hover:text-editorial-terracotta hover:bg-editorial-ivory/50 rounded-lg transition-colors"
                          >
                            <span>{item.label}</span>
                            {item.badge && <Badge variant="neutral">{item.badge}</Badge>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* COLLECTIONS ACCORDION */}
            <div className="rounded-xl overflow-hidden border border-editorial-gold/20 bg-editorial-ivory/30">
              <button
                onClick={() => toggleSection("Collections")}
                className="w-full flex items-center justify-between px-3.5 py-3.5 min-h-[48px] text-xs uppercase tracking-widest font-semibold text-editorial-emerald hover:bg-editorial-ivory/60 transition-colors"
                aria-expanded={expandedSection === "Collections"}
              >
                <span className="flex items-center space-x-2">
                  <span>Collections</span>
                  <Badge variant="gold">Edits</Badge>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-editorial-slate transition-transform duration-200 ${
                    expandedSection === "Collections" ? "rotate-180 text-editorial-terracotta" : ""
                  }`}
                />
              </button>

              {expandedSection === "Collections" && (
                <div className="bg-[#FAF6EE] px-4 py-3 space-y-1.5 border-t border-editorial-gold/20">
                  {[
                    { label: "Everyday Elegance", href: "/collections/casual-wear" },
                    { label: "Festive Edit", href: "/collections/festive-wear", badge: "Celebration" },
                    { label: "Traditional Classics", href: "/collections/ethnic-wear" },
                    { label: "Contemporary Ethnic", href: "/collections/new-arrivals", badge: "Fresh" },
                    { label: "Wedding Guest Edit", href: "/collections/bestsellers" },
                  ].map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-2.5 px-2.5 min-h-[44px] text-xs text-editorial-charcoal hover:text-editorial-terracotta hover:bg-editorial-ivory/50 rounded-lg transition-colors"
                    >
                      <span>{sub.label}</span>
                      {sub.badge && <Badge variant="terracotta">{sub.badge}</Badge>}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Story Link */}
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-3 min-h-[48px] text-xs uppercase tracking-widest font-semibold text-editorial-charcoal hover:bg-editorial-ivory/60 rounded-xl transition-colors"
            >
              <span>Our Story</span>
              <ChevronRight className="w-4 h-4 text-editorial-slate" />
            </Link>

            {/* Direct Contact Link */}
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-3 min-h-[48px] text-xs uppercase tracking-widest font-semibold text-editorial-charcoal hover:bg-editorial-ivory/60 rounded-xl transition-colors"
            >
              <span>Contact & Concierge</span>
              <ChevronRight className="w-4 h-4 text-editorial-slate" />
            </Link>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* 4. QUICK ACCOUNT & SHOPPING LINKS                                  */}
          {/* ------------------------------------------------------------------ */}
          <div className="pt-3 space-y-1 text-xs text-editorial-charcoal">
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center space-x-3 py-2.5 px-3 min-h-[48px] rounded-xl hover:bg-editorial-ivory/60 transition-colors"
            >
              <User className="w-4 h-4 text-editorial-gold" />
              <span className="font-medium">My Account & Orders</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 px-3 min-h-[48px] rounded-xl hover:bg-editorial-ivory/60 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Heart className="w-4 h-4 text-editorial-terracotta" />
                <span className="font-medium">Curated Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="text-[10px] bg-editorial-gold/20 text-editorial-terracotta border border-editorial-gold/40 px-2 py-0.5 rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => {
                if (onOpenCart) {
                  onOpenCart();
                } else {
                  onClose();
                  window.location.href = "/cart";
                }
              }}
              className="w-full flex items-center justify-between py-2.5 px-3 min-h-[48px] rounded-xl hover:bg-editorial-ivory/60 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-4 h-4 text-editorial-emerald" />
                <span className="font-medium">Shopping Bag</span>
              </div>
              {cartCount > 0 && (
                <span className="text-[10px] bg-editorial-emerald text-editorial-paper px-2 py-0.5 rounded-full font-bold">
                  {cartCount} items
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------------- */}
        {/* 5. ATELIER CONCIERGE FOOTER CARD                                       */}
        {/* ---------------------------------------------------------------------- */}
        <div className="p-4 bg-editorial-ivory/70 border-t border-editorial-gold/25 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-editorial-terracotta flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-editorial-gold" />
              <span>Atelier Concierge</span>
            </span>
            <span className="text-[10px] text-editorial-slate">10am – 7pm IST</span>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-editorial-emerald text-editorial-paper text-xs font-medium hover:bg-editorial-terracotta transition-colors min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border border-editorial-gold/40 text-editorial-charcoal text-xs font-medium hover:bg-editorial-paper transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-editorial-emerald" />
              <span>WhatsApp</span>
            </a>
          </div>

          <p className="text-[10px] text-center text-editorial-slate font-light pt-1">
            Complimentary shipping across India on orders &ge; ₹1,499
          </p>
        </div>
      </div>
    </div>
  );
}
