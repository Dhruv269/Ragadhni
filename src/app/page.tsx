/**
 * ==============================================================================
 * Ragadhni — Storefront Homepage (`src/app/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This is the root landing page (route: `/`) of the Ragadhni e-commerce platform.
 * It is structured into 5 editorial sections:
 * 1. Hero Showcase: Brand headline, calls-to-action ("Explore Women", "Explore Men"),
 *    Indian D2C trust signals, and a high-resolution editorial portrait.
 * 2. Silhouette Matrix: 4 curated visual categories (Kurtis, Sarees, Festive Kurtas, Casual Shirts).
 * 3. Craft & Philosophy: Explains Ragadhni's direct weaver partnerships and honest pricing.
 * 4. Fresh Drops / New Arrivals Grid: 4-column product grid rendering `<ProductCard />` components.
 * 5. Festive Celebration Banner: Dark, regal showcase highlighting festive silk collections.
 *
 * WHY IT IS A SERVER COMPONENT:
 * Notice that this file does NOT have `"use client";` at the top!
 * In Next.js App Router, keeping pages as Server Components means Next.js can prerender
 * the entire homepage into pure HTML ahead of time (Static Site Generation).
 * This makes the homepage load in milliseconds and gives search engines (Google)
 * clean, readable HTML for instant indexation.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Inserted automatically into `src/app/layout.tsx` as `{children}` between Header and Footer.
 * - Imports `<Container>` from `src/components/ui/Container.tsx` to keep margins centered.
 * - Imports `<Button>` from `src/components/ui/Button.tsx` for CTA links.
 * - Imports `<Badge>` from `src/components/ui/Badge.tsx` for promotional chips.
 * - Imports `<ProductCard>` and passes products from `mockProducts` (`src/lib/mockData.ts`).
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/storefront/product/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { ArrowRight, Sparkles, Feather, ShieldCheck } from "lucide-react";

export default function HomePage() {
  /*
   * Silhouette Category Data:
   * Array of curated visual cards displayed in Section 2.
   * Each object contains a title, subtitle, target link, editorial photo, and gender tag.
   */
  const categories = [
    {
      title: "Kurtis & Anarkalis",
      subtitle: "Everyday grace & festive flair",
      link: "/women/kurtis",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      tag: "Women",
    },
    {
      title: "Handloom Sarees",
      subtitle: "Timeless six yards of heritage",
      link: "/women/sarees",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      tag: "Women",
    },
    {
      title: "Festive Men's Kurtas",
      subtitle: "Raw Tussar & Chanderi blends",
      link: "/men/kurtas",
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
      tag: "Men",
    },
    {
      title: "Traditional Casual Shirts",
      subtitle: "Pure handspun Khadi comfort",
      link: "/men/casual-shirts",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      tag: "Men",
    },
  ];

  return (
    // Outer page wrapper with vertical spacing between major sections (`space-y-20` on mobile, `space-y-28` on desktop)
    <div className="space-y-20 lg:space-y-28">
      {/*
       * ========================================================================
       * SECTION 1: EDITORIAL HERO BANNER
       * Welcomes the visitor with the core brand identity and primary CTAs.
       * ========================================================================
       */}
      <section className="relative bg-[#F4EFE6] border-b border-[#E3D8C6] overflow-hidden">
        <Container className="py-16 sm:py-24 lg:py-32">
          {/* 12-column responsive grid: 7 columns for text, 5 columns for model shot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Brand Tagline, Description, and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              {/* Weaver Badge */}
              <div className="inline-flex items-center space-x-2 bg-heritage-ivory/80 border border-[#DFD3C0] px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-heritage-terracotta" />
                <span className="text-[11px] uppercase tracking-widest font-medium text-heritage-charcoal">
                  Direct from Indian Weavers &bull; Handcrafted Luxury
                </span>
              </div>

              {/* Main Headline (Cormorant Garamond serif with italic terracotta accent) */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-heritage-charcoal font-normal leading-[1.15]">
                The Poetry of Handcrafted <br className="hidden sm:inline" />
                <span className="italic font-light text-heritage-terracotta">Indian Silhouettes</span>
              </h1>

              {/* Brand Positioning Paragraph */}
              <p className="text-sm sm:text-base text-heritage-earth/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Thoughtfully tailored ethnic wear and effortless traditional casuals.
                Woven from pure Chanderi, Mulmul, and Handspun Khadi for everyday
                comfort and festive elegance.
              </p>

              {/* Primary Call-to-Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/women">
                  <Button size="lg" className="w-full sm:w-auto shadow-md">
                    <span>Explore Women&apos;s Collection</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <Link href="/men">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <span>Explore Men&apos;s Collection</span>
                  </Button>
                </Link>
              </div>

              {/* Quick Customer Reassurances */}
              <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-heritage-earth">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta" />
                  <span>Free Shipping &gt; ₹1,499</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta" />
                  <span>Cash on Delivery Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-heritage-terracotta" />
                  <span>7-Day Easy Exchange</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Hero Portrait with Floating Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-none overflow-hidden shadow-2xl border-4 border-heritage-ivory">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                  alt="Ragadhni Editorial Festive Collection"
                  fill
                  priority // Loads immediately above-the-fold to improve LCP (Largest Contentful Paint)
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle dark gradient overlay so bottom text is always legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-heritage-ivory space-y-1">
                  <Badge variant="gold">Festive Edit</Badge>
                  <p className="font-serif text-lg tracking-wide">The Royal Chanderi Ensemble</p>
                  <p className="text-xs text-heritage-sand/90">Starting from ₹1,899</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION 2: CURATED CATEGORY SHOWCASE
       * Visual cards highlighting primary silhouettes for men and women.
       * ========================================================================
       */}
      <section>
        <Container>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-heritage-terracotta font-medium">
              Curated Wardrobe
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-normal">
              Explore by Silhouette
            </h2>
            <p className="text-xs sm:text-sm text-heritage-earth">
              From breezy handspun cottons to celebratory silk ensembles, discover authentic craftsmanship.
            </p>
          </div>

          {/* 4-Column Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/*
             * Array Mapping:
             * Loops through the `categories` array and generates one visual card for each entry.
             */}
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.link}
                className="group relative aspect-[3/4] overflow-hidden bg-heritage-sand/40 border border-[#E3D8C6]"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal/85 via-heritage-charcoal/30 to-transparent" />

                {/* Audience Badge (e.g., "Women" or "Men") */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest text-heritage-ivory bg-heritage-charcoal/60 px-2 py-0.5">
                    {cat.tag}
                  </span>
                </div>

                {/* Card Title & Link */}
                <div className="absolute bottom-6 left-6 right-6 text-heritage-ivory space-y-1">
                  <h3 className="font-serif text-xl tracking-wide group-hover:text-heritage-gold-light transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-heritage-sand/80">{cat.subtitle}</p>
                  <span className="inline-flex items-center text-xs text-heritage-gold-light font-medium pt-2 group-hover:translate-x-1 transition-transform">
                    <span>Shop Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION 3: CRAFT & PHILOSOPHY SPOTLIGHT
       * Editorial feature explaining Ragadhni's artisanal sourcing and fair pricing.
       * ========================================================================
       */}
      <section className="bg-heritage-sand/30 border-y border-[#E3D8C6] py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Square Loom & Weaver Photo */}
            <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full overflow-hidden border border-[#D5C7B2]">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                alt="Artisan Weaving Process"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Editorial Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-heritage-terracotta font-medium">
                Our Textile Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-normal leading-tight">
                Rooted in Indian Heritage, <br />
                Tailored for the Modern Wardrobe
              </h2>

              <p className="text-sm text-heritage-earth leading-relaxed font-light">
                At <strong>Ragadhni</strong>, we believe traditional Indian clothing should not be
                reserved only for weddings and rare festivals. By collaborating directly with
                weaving clusters across Madhya Pradesh, Rajasthan, and Bengal, we eliminate
                unnecessary distributor markups to offer genuine handlooms at fair, transparent prices.
              </p>

              {/* 2 Feature Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex items-start space-x-3">
                  <Feather className="w-5 h-5 text-heritage-terracotta shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-heritage-charcoal">
                      Breathable Natural Fibers
                    </h4>
                    <p className="text-xs text-heritage-earth mt-1">
                      Pure cotton mulmul, textured tussar silk, and natural vegetable dyes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-heritage-terracotta shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-heritage-charcoal">
                      Direct-to-Consumer Honesty
                    </h4>
                    <p className="text-xs text-heritage-earth mt-1">
                      No synthetic compromises. No middlemen markups. Authentic luxury made accessible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Link to Brand Story */}
              <div className="pt-2">
                <Link href="/about">
                  <Button variant="editorial">
                    Read the Ragadhni Craft Journey &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION 4: NEW ARRIVALS PRODUCT GRID
       * Renders live garments using the reusable `<ProductCard />` component.
       * ========================================================================
       */}
      <section>
        <Container>
          {/* Section Header with "View All" Link */}
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 pb-4 border-b border-[#E3D8C6] gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-heritage-terracotta font-medium">
                Fresh Drops
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-heritage-charcoal font-normal mt-1">
                New Arrivals for Men & Women
              </h2>
            </div>
            <Link
              href="/collections/new-arrivals"
              className="text-xs uppercase tracking-widest text-heritage-charcoal hover:text-heritage-terracotta font-medium transition-colors"
            >
              View All Arrivals &rarr;
            </Link>
          </div>

          {/*
           * 4-Column Product Grid:
           * Loops through `mockProducts` array and renders a `<ProductCard />` for each clothing item.
           * `key={product.id}` provides React with a unique identifier to optimize DOM rendering.
           */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION 5: EDITORIAL FESTIVE BANNER
       * High-contrast celebration banner for festive collections.
       * ========================================================================
       */}
      <section className="bg-heritage-charcoal text-heritage-ivory py-16 lg:py-24 relative overflow-hidden">
        <Container className="relative z-10 text-center max-w-3xl space-y-6">
          <Badge variant="gold">Festive Season 2026</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-heritage-ivory">
            The Celebration Edit
          </h2>
          <p className="text-sm sm:text-base text-heritage-sand/80 leading-relaxed font-light">
            An exclusive curation of shimmering Chanderi silk anarkalis, festive handwoven kurtas,
            and regal Nehru jackets designed to make every occasion memorable.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/collections/festive-wear">
              <Button variant="gold" size="lg">
                Explore Festive Edit
              </Button>
            </Link>
            <Link href="/collections/casual-wear">
              <Button
                variant="outline"
                size="lg"
                className="text-heritage-ivory border-heritage-ivory/60 hover:bg-heritage-ivory hover:text-heritage-charcoal"
              >
                Everyday Casuals
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
