/**
 * ==============================================================================
 * Ragadhni — Floating Editorial Header & Navigation (`Header.tsx`)
 * ==============================================================================
 *
 * WHAT THIS COMPONENT DOES:
 * This component is the primary floating navigation island for Ragadhni.
 * Grounded in "The Contemporary Indian Fashion Editorial" creative direction
 * (70% modern luxury editorial, 30% traditional Indian heritage), it provides:
 * 1. A floating frosted-glass capsule with subtle elevation and scroll awareness.
 * 2. Expressive serif typography ("RAGADHNI") with restrained gold atelier kicker.
 * 3. Multi-column desktop mega-menus for "Shop" and "Collections" with curated
 *    campaign editorial teaser cards.
 * 4. Expandable inline search drawer with high-intent ethnic search suggestions.
 * 5. Interactive customer utility shells (Account, Wishlist, and Shopping Bag)
 *    that prevent 404s and eliminate alert() popups.
 * 6. Clean integration hooks (`onSearchOpen`, `onCartOpen`) ready for Phase 3.2.
 * 7. Seamless mobile drawer trigger with thumb-friendly touch targets.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Check,
  Package,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MobileDrawer } from "./MobileDrawer";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useWishlist } from "@/context/WishlistContext";
import { mockProducts } from "@/lib/mockData";

export interface HeaderProps {
  onSearchOpen?: () => void;
  onCartOpen?: () => void;
}

export function Header({ onSearchOpen, onCartOpen }: HeaderProps) {
  // ----------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ----------------------------------------------------------------------------
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // References for outside click dismissal
  const headerContainerRef = useRef<HTMLDivElement>(null);

  // Shared dynamic cart, search & wishlist state
  const { totalItems: cartCount, subtotal: cartSubtotal, openCart, closeCart, isOpen: isCartDrawerOpen } = useCart();
  const { openSearch, closeSearch, isSearchOpen } = useSearch();
  const { wishlistCount, wishlistIds } = useWishlist();

  // ----------------------------------------------------------------------------
  // SCROLL & KEYBOARD EVENT HANDLERS
  // ----------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMegaMenu(null);
        setAccountOpen(false);
        setWishlistOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        headerContainerRef.current &&
        !headerContainerRef.current.contains(e.target as Node)
      ) {
        setActiveMegaMenu(null);
        setAccountOpen(false);
        setWishlistOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ----------------------------------------------------------------------------
  // ACTION HANDLERS
  // ----------------------------------------------------------------------------
  const handleToggleSearch = () => {
    if (onSearchOpen) {
      onSearchOpen();
    } else {
      openSearch();
      setAccountOpen(false);
      setWishlistOpen(false);
      setActiveMegaMenu(null);
    }
  };

  const handleToggleCart = () => {
    if (onCartOpen) {
      onCartOpen();
    } else {
      openCart();
      closeSearch();
      setAccountOpen(false);
      setWishlistOpen(false);
      setActiveMegaMenu(null);
    }
  };

  const handleToggleAccount = () => {
    setAccountOpen((prev) => !prev);
    setWishlistOpen(false);
    closeCart();
    closeSearch();
    setActiveMegaMenu(null);
  };

  const handleToggleWishlist = () => {
    setWishlistOpen((prev) => !prev);
    setAccountOpen(false);
    closeCart();
    closeSearch();
    setActiveMegaMenu(null);
  };

  // ----------------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------------
  return (
    <>
      {/* FLOATING CAPSULE CONTAINER */}
      <div
        ref={headerContainerRef}
        className="sticky top-2 sm:top-3 z-40 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300"
      >
        <header
          className={`relative w-full rounded-2xl transition-all duration-300 border ${
            isScrolled
              ? "bg-[#FAF6EE]/95 backdrop-blur-md shadow-editorial-float border-editorial-gold/40 py-2 sm:py-2.5"
              : "bg-[#FAF6EE]/90 backdrop-blur-md shadow-editorial-card border-editorial-gold/25 py-2.5 sm:py-3"
          }`}
        >
          <div className="px-4 sm:px-6 flex items-center justify-between">
            {/* ------------------------------------------------------------------ */}
            {/* 1. LEFT SECTION (Mobile Hamburger + Desktop Primary Nav Links)     */}
            {/* ------------------------------------------------------------------ */}
            <div className="flex items-center space-x-6 lg:w-5/12">
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-editorial-charcoal hover:text-editorial-terracotta focus-editorial rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-6">
                <Link
                  href="/"
                  className="editorial-nav-link text-editorial-charcoal hover:text-editorial-terracotta transition-colors py-1 relative group"
                >
                  <span>Home</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-editorial-terracotta transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* SHOP MENU (Mega-menu trigger) */}
                <div
                  className="relative group py-1"
                  onMouseEnter={() => {
                    setActiveMegaMenu("Shop");
                    setAccountOpen(false);
                    setWishlistOpen(false);
                    closeCart();
                  }}
                >
                  <Link
                    href="/women"
                    className={`editorial-nav-link flex items-center space-x-1.5 transition-colors py-1 relative ${
                      activeMegaMenu === "Shop"
                        ? "text-editorial-terracotta"
                        : "text-editorial-charcoal hover:text-editorial-terracotta"
                    }`}
                  >
                    <span>Shop</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMegaMenu === "Shop" ? "rotate-180 text-editorial-terracotta" : "text-editorial-slate"
                      }`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-editorial-terracotta transition-all duration-300 ${
                        activeMegaMenu === "Shop" ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </div>

                {/* COLLECTIONS MENU (Mega-menu trigger) */}
                <div
                  className="relative group py-1"
                  onMouseEnter={() => {
                    setActiveMegaMenu("Collections");
                    setAccountOpen(false);
                    setWishlistOpen(false);
                    closeCart();
                  }}
                >
                  <Link
                    href="/collections/ethnic-wear"
                    className={`editorial-nav-link flex items-center space-x-1.5 transition-colors py-1 relative ${
                      activeMegaMenu === "Collections"
                        ? "text-editorial-terracotta"
                        : "text-editorial-charcoal hover:text-editorial-terracotta"
                    }`}
                  >
                    <span>Collections</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMegaMenu === "Collections" ? "rotate-180 text-editorial-terracotta" : "text-editorial-slate"
                      }`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-editorial-terracotta transition-all duration-300 ${
                        activeMegaMenu === "Collections" ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </div>

                <Link
                  href="/about"
                  className="editorial-nav-link text-editorial-charcoal hover:text-editorial-terracotta transition-colors py-1 relative group"
                >
                  <span>Our Story</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-editorial-terracotta transition-all duration-300 group-hover:w-full" />
                </Link>
              </nav>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* 2. CENTER SECTION (Brand Wordmark & Editorial Atelier Subtitle)    */}
            {/* ------------------------------------------------------------------ */}
            <div className="text-center flex-1 lg:w-2/12">
              <Link href="/" className="inline-block group py-0.5">
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-[29px] tracking-[0.24em] text-editorial-emerald uppercase font-normal transition-colors group-hover:text-editorial-terracotta leading-none">
                  Ragadhni
                </h1>
                <p className="text-[8px] sm:text-[9px] tracking-[0.32em] uppercase text-editorial-gold-deep mt-1 font-semibold flex items-center justify-center space-x-1.5">
                  <span className="w-1.5 h-[1px] bg-editorial-gold/60 hidden sm:inline-block" />
                  <span>Women&apos;s Indian Atelier</span>
                  <span className="w-1.5 h-[1px] bg-editorial-gold/60 hidden sm:inline-block" />
                </p>
              </Link>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* 3. RIGHT SECTION (Quick Story + Editorial Utility Access Points)   */}
            {/* ------------------------------------------------------------------ */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-3.5 lg:w-5/12">
              {/* Quick Contact Link (Desktop only) */}
              <Link
                href="/contact"
                className="hidden xl:inline-block editorial-nav-link text-editorial-slate hover:text-editorial-charcoal transition-colors mr-2"
              >
                Concierge
              </Link>

              {/* Search Toggle Button (Opens Live Search Overlay) */}
              <button
                onClick={handleToggleSearch}
                className={`p-2 text-editorial-charcoal hover:text-editorial-terracotta focus-editorial rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  isSearchOpen ? "bg-editorial-gold/15 text-editorial-terracotta" : ""
                }`}
                aria-label="Search collection"
                aria-expanded={isSearchOpen}
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.8]" />
              </button>

              {/* Customer Account Button (Opens Popover Shell, no 404) */}
              <button
                onClick={handleToggleAccount}
                className={`hidden sm:flex p-2 text-editorial-charcoal hover:text-editorial-terracotta focus-editorial rounded-full transition-colors min-h-[44px] min-w-[44px] items-center justify-center relative ${
                  accountOpen ? "bg-editorial-gold/15 text-editorial-terracotta" : ""
                }`}
                aria-label="Customer account options"
                aria-expanded={accountOpen}
              >
                <User className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.8]" />
              </button>

              {/* Wishlist Button (Opens Popover Shell, no 404) */}
              <button
                onClick={handleToggleWishlist}
                className={`relative p-2 text-editorial-charcoal hover:text-editorial-terracotta focus-editorial rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  wishlistOpen ? "bg-editorial-gold/15 text-editorial-terracotta" : ""
                }`}
                aria-label={`Wishlist, ${wishlistCount} saved item`}
                aria-expanded={wishlistOpen}
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-editorial-gold/20 text-editorial-terracotta border border-editorial-gold/50 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button (Opens Slide-out Cart Drawer) */}
              <button
                onClick={handleToggleCart}
                className={`relative p-2 text-editorial-emerald hover:text-editorial-terracotta focus-editorial rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center group ${
                  isCartDrawerOpen ? "bg-editorial-emerald text-editorial-paper" : ""
                }`}
                aria-label={`Shopping bag, ${cartCount} items, total ₹${cartSubtotal.toLocaleString("en-IN")}`}
                aria-expanded={isCartDrawerOpen}
              >
                <ShoppingBag
                  className={`w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.8] ${
                    isCartDrawerOpen ? "text-editorial-paper" : "text-editorial-emerald group-hover:text-editorial-terracotta"
                  }`}
                />
                {cartCount > 0 && (
                  <span
                    className={`absolute top-1.5 right-1.5 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs ${
                      isCartDrawerOpen
                        ? "bg-editorial-gold text-editorial-emerald-dark"
                        : "bg-editorial-terracotta text-editorial-ivory"
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ================================================================== */}
          {/* 4. DESKTOP MEGA-MENU PANELS (SHOP & COLLECTIONS)                   */}
          {/* ================================================================== */}
          {activeMegaMenu && (
            <div
              className="absolute top-[calc(100%+8px)] left-0 right-0 mx-auto w-full max-w-5xl rounded-2xl bg-[#F2EBDD] border border-editorial-gold/35 shadow-editorial-float p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              style={{ backgroundColor: "#F2EBDD" }}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              {/* SHOP MEGA-MENU */}
              {activeMegaMenu === "Shop" && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Category Group 1: Silhouettes */}
                  <div className="col-span-4 space-y-3">
                    <h3 className="font-serif text-sm tracking-widest text-editorial-emerald border-b border-editorial-gold/30 pb-2 font-medium uppercase flex items-center justify-between">
                      <span>Women&apos;s Silhouettes</span>
                      <span className="text-[10px] tracking-widest text-editorial-gold-deep font-sans font-semibold">01</span>
                    </h3>
                    <ul className="space-y-1.5 pt-1">
                      {[
                        { label: "Handcrafted Sarees", href: "/women/sarees", badge: "Heirloom" },
                        { label: "Kurtas & Sets", href: "/women/kurtis", badge: "Popular" },
                        { label: "Festive Lehengas", href: "/women/lehengas-anarkalis", badge: "Festive" },
                        { label: "Ethnic Dresses", href: "/women/casual-dresses" },
                        { label: "Artisanal Dupattas", href: "/women/dupattas" },
                        { label: "Fine Jewellery & Accessories", href: "/women/accessories", badge: "New" },
                      ].map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="flex items-center justify-between text-xs text-editorial-emerald hover:text-editorial-terracotta hover:translate-x-1 transition-all py-1.5 group"
                          >
                            <span className="font-medium group-hover:underline underline-offset-4 decoration-editorial-terracotta/40">
                              {sub.label}
                            </span>
                            {sub.badge && (
                              <span
                                className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-xs border ${
                                  sub.badge === "Heirloom"
                                    ? "bg-editorial-gold/20 text-editorial-gold-deep border-editorial-gold/40"
                                    : "bg-editorial-terracotta text-editorial-ivory border-editorial-terracotta-warm/40"
                                }`}
                              >
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Category Group 2: Craft Traditions & Weaves */}
                  <div className="col-span-4 space-y-3">
                    <h3 className="font-serif text-sm tracking-widest text-editorial-emerald border-b border-editorial-gold/30 pb-2 font-medium uppercase flex items-center justify-between">
                      <span>Artisan Weaves & Crafts</span>
                      <span className="text-[10px] tracking-widest text-editorial-gold-deep font-sans font-semibold">02</span>
                    </h3>
                    <ul className="space-y-1.5 pt-1">
                      {[
                        { label: "Pure Chanderi Silk", href: "/collections/ethnic-wear" },
                        { label: "Organic Mulmul Cotton", href: "/collections/casual-wear" },
                        { label: "Salwar Suits & Sets", href: "/women/salwar-suits" },
                        { label: "Tops & Tunics", href: "/women/tops-tunics" },
                        { label: "Palazzos & Bottomwear", href: "/women/bottomwear" },
                        { label: "Explore Complete Catalog", href: "/women", badge: "View All" },
                      ].map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="flex items-center justify-between text-xs text-editorial-emerald hover:text-editorial-terracotta hover:translate-x-1 transition-all py-1.5 group"
                          >
                            <span className="font-medium group-hover:underline underline-offset-4 decoration-editorial-terracotta/40">
                              {sub.label}
                            </span>
                            {sub.badge && (
                              <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-xs bg-editorial-emerald/10 text-editorial-emerald border border-editorial-emerald/25">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Curated Campaign Teaser Card (Complementary Darker Surface: Deep Emerald) */}
                  <div className="col-span-4 rounded-xl bg-[#123D32] text-editorial-ivory p-5 flex flex-col justify-between border border-editorial-gold/40 shadow-editorial">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-editorial-gold-soft font-semibold">
                          Curated Edit
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-editorial-gold" />
                      </div>
                      <h4 className="font-serif text-xl tracking-wide text-editorial-ivory font-normal leading-snug">
                        The Royal Heritage Edit
                      </h4>
                      <p className="text-xs text-editorial-ivory/80 leading-relaxed font-light">
                        Handcrafted Chanderi silks, zardozi needlework, and heirloom silhouettes curated for timeless Indian celebrations.
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-editorial-gold/25 flex items-center justify-between">
                      <span className="text-[11px] text-editorial-gold-soft">Complimentary Express Shipping</span>
                      <Link
                        href="/collections/festive-wear"
                        onClick={() => setActiveMegaMenu(null)}
                        className="inline-flex items-center space-x-1 text-xs text-editorial-ivory font-medium hover:text-editorial-gold-soft transition-colors"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* COLLECTIONS MEGA-MENU */}
              {activeMegaMenu === "Collections" && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Occasion Edits */}
                  <div className="col-span-7 space-y-3">
                    <h3 className="font-serif text-sm tracking-widest text-editorial-emerald border-b border-editorial-gold/30 pb-2 font-medium uppercase flex items-center justify-between">
                      <span>Curated Occasion Edits</span>
                      <span className="text-[10px] tracking-widest text-editorial-gold-deep font-sans font-semibold">Capsules</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
                      {[
                        { label: "Everyday Elegance", href: "/collections/casual-wear", desc: "Mulmul cottons & daily grace" },
                        { label: "Festive Edit", href: "/collections/festive-wear", desc: "Zari, brocades & royal celebrations", badge: "Celebration" },
                        { label: "Traditional Classics", href: "/collections/ethnic-wear", desc: "Handloom Banarasi & Chanderi" },
                        { label: "Contemporary Ethnic", href: "/collections/new-arrivals", desc: "Modern silhouettes, Indian soul", badge: "Fresh" },
                        { label: "Wedding Guest Edit", href: "/collections/bestsellers", desc: "Opulent anarkalis & festive lehengas" },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setActiveMegaMenu(null)}
                          className="group p-2.5 rounded-lg hover:bg-editorial-paper border border-transparent hover:border-editorial-gold/30 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-editorial-emerald group-hover:text-editorial-terracotta transition-colors">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-xs border ${
                                  item.badge === "Celebration"
                                    ? "bg-editorial-terracotta text-editorial-ivory border-editorial-terracotta-warm/40"
                                    : "bg-editorial-gold/20 text-editorial-gold-deep border-editorial-gold/40"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-editorial-slate-dark mt-0.5 line-clamp-1">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Teaser 2 (Complementary Darker Surface: Deep Emerald) */}
                  <div className="col-span-5 rounded-xl bg-[#123D32] border border-editorial-gold/40 p-5 flex flex-col justify-between shadow-editorial text-editorial-ivory">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-editorial-gold-soft font-semibold">
                        Editorial Spotlight
                      </span>
                      <h4 className="font-serif text-lg tracking-wide text-editorial-ivory font-normal">
                        Chanderi & Organza Silk Ensemble
                      </h4>
                      <p className="text-xs text-editorial-ivory/80 leading-relaxed font-light">
                        Each garment is produced in small, limited artisanal batches to preserve weaving authenticity and reduce textile waste.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-editorial-gold/25 flex items-center justify-between">
                      <span className="text-xs font-semibold text-editorial-gold-soft">From ₹3,490</span>
                      <Link
                        href="/collections/ethnic-wear"
                        onClick={() => setActiveMegaMenu(null)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-editorial-terracotta text-editorial-ivory text-xs font-medium hover:bg-editorial-terracotta-warm transition-colors shadow-xs"
                      >
                        <span>View Edit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================== */}
          {/* 5. CUSTOMER ACCOUNT POPOVER SHELL (Zero 404s, Accessible)          */}
          {/* ================================================================== */}
          {accountOpen && (
            <div className="absolute top-[calc(100%+8px)] right-3 sm:right-16 w-80 rounded-2xl bg-[#FAF6EE]/98 backdrop-blur-md border border-editorial-gold/35 shadow-editorial-float p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-editorial-gold/20">
                <div>
                  <h4 className="font-serif text-base tracking-wide text-editorial-charcoal">
                    Ragadhni Atelier
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-editorial-slate">
                    Customer Sanctuary
                  </p>
                </div>
                <button
                  onClick={() => setAccountOpen(false)}
                  className="p-1 text-editorial-slate hover:text-editorial-charcoal"
                  aria-label="Close account menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-3.5 space-y-2 text-xs">
                <p className="text-editorial-slate leading-relaxed">
                  Sign in to track orders, access artisanal bridal consultations, and manage saved measurements.
                </p>

                <div className="pt-2 flex items-center space-x-2">
                  <Link
                    href="/account"
                    onClick={() => setAccountOpen(false)}
                    className="flex-1 py-2 px-3 text-center rounded-lg bg-editorial-emerald text-editorial-paper font-medium hover:bg-editorial-terracotta transition-colors text-xs"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setAccountOpen(false)}
                    className="flex-1 py-2 px-3 text-center rounded-lg border border-editorial-gold/40 text-editorial-charcoal font-medium hover:bg-editorial-ivory transition-colors text-xs"
                  >
                    Register
                  </Link>
                </div>
              </div>

              <div className="pt-3 border-t border-editorial-gold/20 space-y-1.5 text-xs text-editorial-charcoal">
                <Link
                  href="/account"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center space-x-2.5 py-1.5 px-2 rounded-md hover:bg-editorial-ivory transition-colors"
                >
                  <Package className="w-3.5 h-3.5 text-editorial-gold" />
                  <span>Track Active Shipment</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center space-x-2.5 py-1.5 px-2 rounded-md hover:bg-editorial-ivory transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-editorial-terracotta" />
                  <span>Styling & Sizing Concierge</span>
                </Link>
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* 7. WISHLIST PREVIEW POPOVER SHELL (Zero 404s, Accessible)           */}
          {/* ================================================================== */}
          {wishlistOpen && (
            <div className="absolute top-[calc(100%+8px)] right-3 sm:right-10 w-84 max-w-[calc(100vw-32px)] rounded-2xl bg-[#FAF6EE]/98 backdrop-blur-md border border-editorial-gold/35 shadow-editorial-float p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-editorial-gold/20">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-editorial-terracotta" />
                  <h4 className="font-serif text-base tracking-wide text-editorial-charcoal">
                    Saved Pieces ({wishlistCount})
                  </h4>
                </div>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="p-1 text-editorial-slate hover:text-editorial-charcoal"
                  aria-label="Close wishlist preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-3 space-y-2.5 max-h-60 overflow-y-auto">
                {wishlistCount === 0 ? (
                  <p className="text-xs text-editorial-slate text-center py-4 italic">
                    No saved pieces yet. Tap the heart on any heirloom to curate your wishlist.
                  </p>
                ) : (
                  mockProducts
                    .filter((p) => wishlistIds.includes(p.id))
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.slug}`}
                        onClick={() => setWishlistOpen(false)}
                        className="flex items-center space-x-3 p-2 rounded-xl bg-editorial-ivory/60 border border-editorial-gold/20 hover:border-editorial-terracotta/40 transition-colors group"
                      >
                        <div className="w-12 h-14 rounded-md bg-editorial-emerald/10 border border-editorial-gold/30 overflow-hidden shrink-0 relative">
                          <img
                            src={item.images[0]?.url || ""}
                            alt={item.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-editorial-charcoal group-hover:text-editorial-terracotta transition-colors truncate">
                            {item.title}
                          </h5>
                          <p className="text-[11px] text-editorial-slate truncate">
                            {item.fabric || item.categoryName}
                          </p>
                          <p className="text-xs font-semibold text-editorial-emerald mt-0.5">
                            ₹{item.basePrice.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </Link>
                    ))
                )}
              </div>

              <div className="pt-3 border-t border-editorial-gold/20">
                <Link
                  href="/wishlist"
                  onClick={() => setWishlistOpen(false)}
                  className="block w-full py-2 text-center rounded-lg bg-editorial-emerald text-editorial-paper text-xs font-medium hover:bg-editorial-terracotta transition-colors"
                >
                  View Full Wishlist
                </Link>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* ==================================================================== */}
      {/* 9. MOBILE DRAWER COMPONENT                                           */}
      {/* ==================================================================== */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenSearch={() => {
          setMobileMenuOpen(false);
          handleToggleSearch();
        }}
        onOpenCart={() => {
          setMobileMenuOpen(false);
          handleToggleCart();
        }}
      />
    </>
  );
}
