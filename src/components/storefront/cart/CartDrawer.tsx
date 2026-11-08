/**
 * ==============================================================================
 * Ragadhni — Editorial Cart Drawer (`src/components/storefront/cart/CartDrawer.tsx`)
 * ==============================================================================
 *
 * WHAT THIS COMPONENT DOES:
 * This component provides an immersive, slide-out shopping bag drawer for Ragadhni.
 * Grounded in "The Contemporary Indian Fashion Editorial" creative direction
 * (70% modern luxury editorial, 30% traditional Indian heritage), it provides:
 * 1. Smooth slide-out panel from the right with accessible backdrop dismissal.
 * 2. Real-time synchronized cart items, quantities, and line totals.
 * 3. Dynamic Indian Express Shipping threshold progress bar (₹1,499 threshold).
 * 4. Quantity increment, decrement, and removal controls.
 * 5. Sophisticated empty state with curated editorial inspiration links.
 * 6. Dynamic order summary and simulated checkout trigger.
 * 7. Mobile and desktop responsive layout with touch-friendly controls.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Powered by `useCart()` from `src/context/CartContext.tsx`.
 * - Rendered in `src/app/layout.tsx` so it can be opened from any page.
 * - Triggered by `Header.tsx`, `MobileDrawer.tsx`, `ProductCard.tsx`, and `ProductDetailsClient.tsx`.
 */

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    totalItems,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    isFreeShipping,
    updateQuantity,
    removeItem,
  } = useCart();

  // Simulated checkout state (modal / notification)
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // ----------------------------------------------------------------------------
  // 1. ACCESSIBILITY & SCROLL LOCK
  // ----------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (checkoutModalOpen) {
          setCheckoutModalOpen(false);
        } else if (isOpen) {
          closeCart();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart, checkoutModalOpen]);

  // Calculate free shipping progress percentage (clamped to 100%)
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      {/* ---------------------------------------------------------------------- */}
      {/* BACKDROP OVERLAY                                                       */}
      {/* ---------------------------------------------------------------------- */}
      <div
        className="fixed inset-0 bg-editorial-charcoal/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
      />

      {/* ---------------------------------------------------------------------- */}
      {/* SLIDE-OUT DRAWER CONTAINER                                             */}
      {/* ---------------------------------------------------------------------- */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside
          className="w-screen max-w-md lg:max-w-lg bg-editorial-paper border-l border-editorial-gold/30 shadow-editorial-float flex flex-col h-full transform transition-transform duration-300 ease-editorial animate-in slide-in-from-right"
          style={{ backgroundColor: "#FAF6EE" }}
        >
          {/* ================================================================== */}
          {/* A. DRAWER HEADER                                                   */}
          {/* ================================================================== */}
          <div className="p-4 sm:p-5 border-b border-editorial-gold/30 bg-editorial-ivory/70 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-editorial-emerald" />
              <h2 className="font-serif text-lg sm:text-xl text-editorial-charcoal font-medium tracking-wide">
                Your Shopping Bag
              </h2>
              {totalItems > 0 && (
                <span className="text-[11px] font-semibold text-editorial-terracotta bg-editorial-gold/20 px-2 py-0.5 rounded-full border border-editorial-gold/30">
                  {totalItems} {totalItems === 1 ? "piece" : "pieces"}
                </span>
              )}
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-editorial-slate hover:text-editorial-charcoal hover:bg-editorial-paper transition-colors"
              aria-label="Close shopping bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ================================================================== */}
          {/* B. FREE SHIPPING PROGRESS BAR                                      */}
          {/* ================================================================== */}
          {totalItems > 0 && (
            <div className="p-3.5 sm:p-4 bg-editorial-ivory/40 border-b border-editorial-gold/20 shrink-0">
              <div className="flex items-center justify-between text-xs mb-1.5">
                {isFreeShipping ? (
                  <span className="text-editorial-emerald font-medium flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-editorial-gold" />
                    <span>Complimentary Express Delivery Unlocked!</span>
                  </span>
                ) : (
                  <span className="text-editorial-slate-dark text-xs">
                    Add <strong className="text-editorial-terracotta font-semibold">{formatPrice(freeShippingRemaining)}</strong> more for <strong>FREE Express Shipping</strong>
                  </span>
                )}
                <span className="text-[11px] font-semibold text-editorial-slate font-sans">
                  {shippingProgress}%
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-1.5 bg-editorial-gold/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    isFreeShipping
                      ? "bg-editorial-emerald"
                      : "bg-gradient-to-r from-editorial-terracotta to-editorial-gold"
                  }`}
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ================================================================== */}
          {/* C. SCROLLABLE CONTENT (ITEMS OR EMPTY STATE)                       */}
          {/* ================================================================== */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              /* EMPTY CART STATE */
              <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center px-4 py-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-editorial-ivory/80 border border-editorial-gold/40 flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-9 h-9 text-editorial-emerald stroke-[1.4]" />
                </div>

                <div className="space-y-1.5 max-w-xs">
                  <h3 className="font-serif text-xl sm:text-2xl text-editorial-charcoal font-normal">
                    Your Shopping Bag is Empty
                  </h3>
                  <p className="text-xs text-editorial-slate leading-relaxed font-light">
                    Your personal editorial wardrobe awaits. Explore our newest handcrafted arrivals in Chanderi silks, handwoven sarees, and celebratory lehengas.
                  </p>
                </div>

                <div className="pt-2 w-full max-w-xs space-y-2">
                  <Link
                    href="/women"
                    onClick={closeCart}
                    className="block w-full py-3 px-4 rounded-lg bg-editorial-emerald text-editorial-ivory text-xs uppercase tracking-widest font-semibold hover:bg-editorial-terracotta transition-colors shadow-editorial text-center"
                  >
                    Explore Women&apos;s Collection
                  </Link>
                  <Link
                    href="/collections/new-arrivals"
                    onClick={closeCart}
                    className="block w-full py-2.5 px-4 rounded-lg border border-editorial-gold/40 text-editorial-charcoal text-xs uppercase tracking-wider font-medium hover:bg-editorial-ivory transition-colors text-center"
                  >
                    View New Season Drops
                  </Link>
                </div>

                {/* Popular curation chips */}
                <div className="pt-4 border-t border-editorial-gold/20 w-full max-w-xs">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-editorial-slate font-semibold mb-2">
                    Popular Edits:
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {[
                      { label: "Kurtas & Sets", href: "/women/kurtis" },
                      { label: "Handloom Sarees", href: "/women/sarees" },
                      { label: "Festive Edit", href: "/collections/festive-wear" },
                    ].map((chip) => (
                      <Link
                        key={chip.label}
                        href={chip.href}
                        onClick={closeCart}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-editorial-ivory border border-editorial-gold/30 text-editorial-charcoal hover:border-editorial-terracotta hover:text-editorial-terracotta transition-colors"
                      >
                        {chip.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* POPULATED ITEM LIST */
              <div className="divide-y divide-editorial-gold/20">
                {items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex space-x-3 sm:space-x-4">
                    {/* Thumbnail Image */}
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative w-20 h-26 sm:w-22 sm:h-28 shrink-0 bg-editorial-ivory rounded-xs overflow-hidden border border-editorial-gold/30 group"
                    >
                      <Image
                        src={item.image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"}
                        alt={item.title}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        sizes="90px"
                      />
                    </Link>

                    {/* Item Information */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm sm:text-[15px] text-editorial-charcoal hover:text-editorial-terracotta transition-colors line-clamp-1 leading-snug">
                            <Link href={`/product/${item.slug}`} onClick={closeCart}>
                              {item.title}
                            </Link>
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-editorial-slate/60 hover:text-editorial-terracotta transition-colors shrink-0"
                            aria-label={`Remove ${item.title} from bag`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variant Chips */}
                        <div className="flex items-center space-x-2 text-xs text-editorial-slate mt-1">
                          <span className="inline-block bg-editorial-ivory px-2 py-0.5 rounded-xs border border-editorial-gold/25 text-[11px] font-medium text-editorial-charcoal">
                            Size: {item.size}
                          </span>
                          {item.color && (
                            <span className="text-[11px] text-editorial-slate truncate">
                              &bull; {item.color}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Selector & Price */}
                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="inline-flex items-center border border-editorial-gold/35 rounded-md bg-editorial-ivory/60">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:p-1.5 text-editorial-charcoal hover:text-editorial-terracotta hover:bg-editorial-paper transition-colors rounded-l-md"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-editorial-charcoal font-sans">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className={`p-1 sm:p-1.5 text-editorial-charcoal hover:text-editorial-terracotta hover:bg-editorial-paper transition-colors rounded-r-md ${
                              item.quantity >= item.maxStock ? "opacity-30 cursor-not-allowed" : ""
                            }`}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Total Price */}
                        <div className="text-right">
                          <span className="block font-sans text-sm sm:text-base font-semibold text-editorial-emerald">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[10px] text-editorial-slate">
                              {formatPrice(item.price)} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================================================================== */}
          {/* D. DRAWER FOOTER (CHECKOUT & REASSURANCES)                         */}
          {/* ================================================================== */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-editorial-gold/30 bg-editorial-ivory/60 space-y-3.5 shrink-0">
              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs text-editorial-charcoal">
                <div className="flex items-center justify-between">
                  <span className="text-editorial-slate">Subtotal</span>
                  <span className="font-semibold text-sm text-editorial-charcoal font-sans">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-editorial-slate">Express Shipping</span>
                  {isFreeShipping ? (
                    <span className="text-editorial-emerald font-semibold uppercase tracking-wider text-[10px]">
                      Complimentary
                    </span>
                  ) : (
                    <span className="font-medium text-editorial-slate-dark">₹150</span>
                  )}
                </div>

                <p className="text-[10px] text-editorial-slate font-light">
                  Inclusive of all Indian taxes and artisanal GST.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Button
                  size="lg"
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-3.5 uppercase tracking-widest text-xs font-semibold shadow-editorial flex items-center justify-center space-x-2 bg-editorial-emerald text-editorial-ivory hover:bg-editorial-terracotta"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <button
                  type="button"
                  onClick={closeCart}
                  className="w-full py-2 text-center text-xs text-editorial-slate hover:text-editorial-charcoal transition-colors font-medium tracking-wide"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Trust Reassurance Pillars */}
              <div className="pt-2 border-t border-editorial-gold/20 grid grid-cols-3 gap-2 text-center text-[10px] text-editorial-slate">
                <div className="flex flex-col items-center space-y-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-editorial-gold" />
                  <span className="leading-tight">100% Authentic</span>
                </div>
                <div className="flex flex-col items-center space-y-0.5">
                  <Truck className="w-3.5 h-3.5 text-editorial-gold" />
                  <span className="leading-tight">Dispatched 24-48h</span>
                </div>
                <div className="flex flex-col items-center space-y-0.5">
                  <RotateCcw className="w-3.5 h-3.5 text-editorial-gold" />
                  <span className="leading-tight">7-Day Exchange</span>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ==================================================================== */}
      {/* E. SIMULATED CHECKOUT MODAL                                          */}
      {/* ==================================================================== */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-editorial-charcoal/70 backdrop-blur-xs"
            onClick={() => setCheckoutModalOpen(false)}
          />
          <div className="relative bg-editorial-paper border border-editorial-gold/40 shadow-2xl max-w-md w-full p-6 sm:p-7 z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-editorial-gold/25">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-editorial-emerald" />
                <h3 className="font-serif text-lg sm:text-xl text-editorial-charcoal font-medium">
                  Simulated Checkout
                </h3>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="p-1 rounded-full text-editorial-slate hover:text-editorial-charcoal"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-editorial-slate-dark leading-relaxed">
              <p>
                In this high-fidelity design preview, active payment gateways (Razorpay, Cash on Delivery, UPI) and backend database checkout processing are purposefully disabled.
              </p>
              <div className="p-3 bg-editorial-ivory/70 border border-editorial-gold/30 rounded-md space-y-1">
                <div className="flex justify-between font-medium text-editorial-charcoal">
                  <span>Selected Pieces:</span>
                  <span>{totalItems} items</span>
                </div>
                <div className="flex justify-between font-bold text-editorial-emerald text-sm">
                  <span>Total Payable:</span>
                  <span>{formatPrice(subtotal + (isFreeShipping ? 0 : 150))}</span>
                </div>
              </div>
              <p className="text-[11px] text-editorial-slate">
                Your selected items and sizes will remain safely saved in your browser session storage.
              </p>
            </div>

            <div className="pt-2">
              <Button
                size="md"
                onClick={() => {
                  setCheckoutModalOpen(false);
                  closeCart();
                }}
                className="w-full bg-editorial-emerald text-editorial-ivory hover:bg-editorial-terracotta uppercase tracking-wider text-xs font-semibold"
              >
                Return to Storefront
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
