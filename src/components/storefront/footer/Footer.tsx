/**
 * ==============================================================================
 * Ragadhni — Storefront Footer & Trust System (`Footer.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders the comprehensive footer at the bottom of every page.
 * It provides:
 * 1. Customer Trust Signals: 4 reassurance cards highlighting Authentic Craft,
 *    Free Shipping above ₹1,499, 7-Day Easy Exchange, and 100% Secure Checkout.
 * 2. Brand Story Summary: Concise statement of Ragadhni's handloom philosophy.
 * 3. Categorized Sitemap Links: Ethnic Wear, Traditional Casuals, and Help & Policies.
 * 4. Interactive Newsletter Subscription: Lets shoppers sign up for drops with instant confirmation.
 * 5. Copyright & Indian Payment Methods: UPI, RuPay, Netbanking, Cards, and Cash on Delivery.
 *
 * WHY IT EXISTS:
 * In online fashion e-commerce, the footer is where shoppers go to verify legitimacy
 * before spending money. Clear return policies, contact details, and payment badges
 * directly reduce checkout abandonment.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Included in `src/app/layout.tsx` at the bottom of the body.
 * - Reads trust signals from `siteConfig.trustSignals` in `src/config/site.ts`.
 * - Reads customer care contact details from `siteConfig.contact`.
 */

// Marked as a Client Component because it handles newsletter form input and state (`subscribed`)
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Sparkles, Truck, RotateCcw, ShieldCheck, Mail, ArrowRight, Phone, Check } from "lucide-react";

export function Footer() {
  // ----------------------------------------------------------------------------
  // COMPONENT STATE
  // ----------------------------------------------------------------------------

  // Tracks whether the user has successfully submitted the newsletter form
  const [subscribed, setSubscribed] = useState(false);

  // Holds the text currently typed into the email input box
  const [email, setEmail] = useState("");

  /**
   * `handleSubscribe`:
   * Runs when the user submits their email address.
   * In a future phase, this will call an API route to save the email in the database.
   * For now, it updates local state so the shopper immediately sees a confirmation message.
   */
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents standard browser page reload
    if (email) {
      setSubscribed(true);
    }
  };

  /**
   * `iconMap`:
   * A lookup dictionary mapping string icon names from `src/config/site.ts`
   * to actual rendered Lucide React SVG icon components.
   *
   * WHY WE USE A LOOKUP MAP:
   * JSON configuration files cannot store live React components; they can only store strings like "Truck".
   * This dictionary safely translates those strings into real React icons.
   */
  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-5 h-5 text-heritage-terracotta" />,
    Truck: <Truck className="w-5 h-5 text-heritage-terracotta" />,
    RotateCcw: <RotateCcw className="w-5 h-5 text-heritage-terracotta" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-heritage-terracotta" />,
  };

  return (
    <footer className="bg-heritage-sand/40 border-t border-[#E0D5C3] mt-24">
      {/*
       * ========================================================================
       * 1. TRUST SIGNALS STRIP:
       * 4-column responsive grid displaying core Indian D2C reassurances.
       * ========================================================================
       */}
      <div className="border-b border-[#E0D5C3] bg-heritage-ivory/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Loop through the 4 trust signals defined in `siteConfig.trustSignals` */}
            {siteConfig.trustSignals.map((signal) => (
              <div key={signal.title} className="flex items-start space-x-4">
                {/* Rounded Icon Bubble */}
                <div className="p-3 bg-heritage-sand/60 rounded-full shrink-0">
                  {iconMap[signal.icon] || <Sparkles className="w-5 h-5 text-heritage-terracotta" />}
                </div>
                {/* Title and Explanation */}
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-heritage-charcoal">
                    {signal.title}
                  </h4>
                  <p className="text-xs text-heritage-earth/80 mt-1 leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*
       * ========================================================================
       * 2. MAIN SITEMAP COLUMNS & NEWSLETTER:
       * 5-column responsive grid (Brand column takes 2, remaining 3 columns take 1 each).
       * ========================================================================
       */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Column 1 & 2: Brand Identity & Direct Contact */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.2em] uppercase font-normal text-heritage-charcoal">
              Ragadhni
            </h3>
            <p className="text-xs text-heritage-earth leading-relaxed max-w-sm">
              Ragadhni celebrates India’s rich textile legacy through honest craftsmanship,
              contemporary tailoring, and timeless casual elegance. Designed for everyday
              grace and festive grandeur.
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-heritage-charcoal">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-heritage-terracotta" />
                <span className="font-medium">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-heritage-terracotta" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Ethnic Wear Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-[0.18em] text-heritage-terracotta">
              Ethnic Wear
            </h4>
            <ul className="space-y-2 text-xs text-heritage-charcoal/80">
              <li>
                <Link href="/women/sarees" className="hover:text-heritage-terracotta transition-colors">
                  Handcrafted Sarees
                </Link>
              </li>
              <li>
                <Link href="/women/kurtis" className="hover:text-heritage-terracotta transition-colors">
                  Kurtis & Kurta Sets
                </Link>
              </li>
              <li>
                <Link href="/women/salwar-suits" className="hover:text-heritage-terracotta transition-colors">
                  Salwar Suits
                </Link>
              </li>
              <li>
                <Link href="/women/lehengas-anarkalis" className="hover:text-heritage-terracotta transition-colors">
                  Lehengas & Anarkalis
                </Link>
              </li>
              <li>
                <Link href="/women/dupattas" className="hover:text-heritage-terracotta transition-colors">
                  Handcrafted Dupattas
                </Link>
              </li>
              <li>
                <Link href="/collections/ethnic-wear" className="hover:text-heritage-terracotta transition-colors">
                  View All Ethnic
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Traditional Casuals & Edits */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-[0.18em] text-heritage-terracotta">
              Traditional Casuals
            </h4>
            <ul className="space-y-2 text-xs text-heritage-charcoal/80">
              <li>
                <Link href="/women/casual-dresses" className="hover:text-heritage-terracotta transition-colors">
                  Ethnic Casual Dresses
                </Link>
              </li>
              <li>
                <Link href="/women/tops-tunics" className="hover:text-heritage-terracotta transition-colors">
                  Handblock Tops & Tunics
                </Link>
              </li>
              <li>
                <Link href="/women/bottomwear" className="hover:text-heritage-terracotta transition-colors">
                  Palazzos & Bottomwear
                </Link>
              </li>
              <li>
                <Link href="/collections/casual-wear" className="hover:text-heritage-terracotta transition-colors">
                  Everyday Handblocks
                </Link>
              </li>
              <li>
                <Link href="/collections/festive-wear" className="hover:text-heritage-terracotta transition-colors">
                  Festive Celebrations
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-heritage-terracotta transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Customer Care & Policy Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-[0.18em] text-heritage-terracotta">
              Help & Policies
            </h4>
            <ul className="space-y-2 text-xs text-heritage-charcoal/80">
              <li>
                <Link href="/track-order" className="hover:text-heritage-terracotta transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-heritage-terracotta transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-heritage-terracotta transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-heritage-terracotta transition-colors">
                  Indian Size Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-heritage-terracotta transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-heritage-terracotta transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/*
         * ========================================================================
         * 3. INTERACTIVE NEWSLETTER FORM:
         * Switches conditionally between the input form and a success message.
         * ========================================================================
         */}
        <div className="mt-14 pt-8 border-t border-[#E0D5C3] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-auto">
            <h5 className="font-serif text-sm text-heritage-charcoal font-medium">
              Join the Ragadhni Circle
            </h5>
            <p className="text-xs text-heritage-earth mt-0.5">
              Receive private preview invites, festive lookbooks, and textile stories.
            </p>
          </div>

          {/*
           * Conditional Rendering:
           * If `subscribed` is true -> Show green confirmation message
           * If `subscribed` is false -> Show email input form
           */}
          {subscribed ? (
            <div className="flex items-center space-x-2 text-xs text-heritage-emerald bg-heritage-emerald/10 border border-heritage-emerald/30 px-4 py-2.5">
              <Check className="w-4 h-4 text-heritage-emerald" />
              <span>You have joined the Ragadhni Circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full md:w-80 flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-heritage-ivory border border-[#D5C9B5] px-3 py-2 text-xs text-heritage-charcoal placeholder:text-heritage-earth/60 focus:outline-none focus:border-heritage-terracotta w-full"
              />
              <button
                type="submit"
                className="bg-heritage-terracotta text-heritage-ivory px-4 py-2 text-xs uppercase tracking-wider font-medium hover:bg-heritage-rosewood transition-colors flex items-center shrink-0"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/*
       * ========================================================================
       * 4. BOTTOM COPYRIGHT & INDIAN PAYMENT METHODS:
       * ========================================================================
       */}
      <div className="bg-heritage-sand/60 py-5 border-t border-[#DDD1BE] text-center text-[11px] text-heritage-earth">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} Ragadhni Lifestyle Private Limited. All rights reserved.
          </p>
          {/* Payment trust signals */}
          <div className="flex items-center space-x-3 text-heritage-earth/80">
            <span>UPI &bull; RuPay &bull; Netbanking &bull; Visa &bull; Mastercard &bull; COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
