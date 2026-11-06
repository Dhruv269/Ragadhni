/**
 * ==============================================================================
 * Ragadhni — Storefront Homepage (`src/app/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This is the root landing page (route: `/`) of the Ragadhni e-commerce platform.
 * It is structured into 5 editorial sections:
 * 1. Hero Showcase: Brand headline, calls-to-action ("Explore Sarees & Heirlooms", "Shop Everyday Handblocks"),
 *    Indian D2C trust signals, and a high-resolution editorial portrait.
 * 2. Silhouette Matrix: 4 curated visual categories (Kurtis, Sarees, Salwar Suits, Palazzos & Bottomwear).
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
      title: "Salwar Suits & Sets",
      subtitle: "Pure handspun cotton & chanderi",
      link: "/women/salwar-suits",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      tag: "Women",
    },
    {
      title: "Palazzos & Bottomwear",
      subtitle: "Breezy handblock printed pants",
      link: "/women/bottomwear",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      tag: "Women",
    },
  ];

  return (
    // Outer page wrapper with vertical spacing between major sections (`space-y-20` on mobile, `space-y-28` on desktop)
    <div className="space-y-20 lg:space-y-28">
      {/*
       * ========================================================================
       * SECTION 1: MODERN ROYAL HERITAGE FULL-BLEED EDITORIAL CAMPAIGN HERO
       * ========================================================================
       * WHAT THIS SECTION DOES:
       * This is the visual centrepiece of Ragadhni. Rather than a conventional
       * 2-column e-commerce layout, it presents an expansive editorial diptych
       * featuring two complementary women's Indian ethnic & casual collections side-by-side.
       *
       * WHY IT EXISTS:
       * Ragadhni is an exclusively women's Indian ethnic clothing brand. An editorial
       * diptych showcases both celebratory handloom heirlooms (pure silk sarees & lehengas)
       * and everyday artisan casuals (organic mulmul kurtis & sets), establishing
       * brand authority, textile heritage, and effortless product discovery.
       *
       * HOW IT CONNECTS TO THE REST OF THE PROJECT:
       * - "Explore Sarees & Heirlooms" connects directly to `/collections/ethnic-wear`.
       * - "Shop Everyday Casuals" connects directly to `/collections/casual-wear`.
       * - Interactive campaign panels feature direct deep links with visual hover states.
       * - Uses consolidated Modern Royal Heritage tokens: Warm Ivory (#F7F1E7),
       *   Deep Burgundy (#641E2B), Antique Gold (#B69A62), and Espresso (#30231F).
       */}
      <section className="relative w-full bg-heritage-warm-ivory border-b border-heritage-antique-gold/30 overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8 sm:space-y-12">
          {/*
           * PART 1: THE EDITORIAL MASTHEAD & BRAND DECLARATION
           * Centered luxury editorial header with Cormorant Garamond typography.
           */}
          <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-5">
            {/* Seasonal Editorial Badge */}
            <div className="animate-hero-text hero-delay-1 inline-flex items-center space-x-2.5 bg-heritage-warm-ivory border border-heritage-antique-gold/60 px-4 py-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-heritage-burgundy" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-heritage-espresso">
                Autumn / Festive 2026 &bull; The Royal Heritage Edit
              </span>
            </div>

            {/* Grand Editorial Headline in Cormorant Garamond */}
            <h1 className="animate-hero-text hero-delay-2 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-heritage-espresso font-normal leading-[1.1]">
              The Splendour of Heritage, <br className="hidden sm:inline" />
              <span className="italic font-light text-heritage-burgundy">
                Redefined for Today.
              </span>
            </h1>

            {/* Supporting Brand Philosophy */}
            <p className="animate-hero-text hero-delay-3 text-sm sm:text-base lg:text-lg text-heritage-espresso/80 max-w-2xl mx-auto leading-relaxed font-light">
              Honouring India&apos;s timeless handloom legacy through pure Chanderi weaves,
              breathable mulmul, and raw Tussar silk. Thoughtfully tailored silhouettes
              crafted for everyday grace and celebratory grandeur.
            </p>

            {/* Dual Master CTAs for Immediate Category Discovery */}
            <div className="animate-hero-text hero-delay-4 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/collections/ethnic-wear" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-heritage-burgundy hover:bg-[#501822] text-heritage-warm-ivory border border-heritage-burgundy tracking-widest text-xs uppercase font-medium px-8 py-4 shadow-sm transition-all duration-300 group"
                >
                  <span>Explore Sarees &amp; Heirlooms</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 text-heritage-antique-gold-light" />
                </Button>
              </Link>

              <Link href="/collections/casual-wear" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-heritage-espresso text-heritage-espresso hover:bg-heritage-espresso hover:text-heritage-warm-ivory tracking-widest text-xs uppercase font-medium px-8 py-4 transition-all duration-300"
                >
                  <span>Shop Everyday Casuals</span>
                </Button>
              </Link>
            </div>
          </div>

          {/*
           * PART 2: THE EXPANSIVE EDITORIAL DIPTYCH (CAMPAIGN PHOTOGRAPHY HERO)
           * Side-by-side full-scale campaign portals featuring Festive Heirlooms and Everyday Handblocks.
           * On desktop: 2 equal-width majestic panels spanning nearly the full viewport.
           * On mobile: 2 distinct full-width cards with clear framing and dedicated actions.
           */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch animate-hero-image">
            {/*
             * LEFT PORTAL: WOMEN'S EDITORIAL CAMPAIGN
             * Features the rich deep maroon & pure antique gold Zari handloom Chanderi drape.
             */}
            <Link
              href="/women"
              className="group relative h-[480px] sm:h-[540px] lg:h-[620px] overflow-hidden border border-heritage-antique-gold/30 bg-heritage-espresso/5 shadow-xl block"
            >
              {/* Campaign Image with Cinematic Hover Zoom */}
              <Image
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=85"
                alt="Ragadhni Women's Royal Heritage Collection — Pure Chanderi Saree and Anarkali Drapes"
                fill
                priority
                className="object-cover object-top editorial-hover-zoom"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Rich Multi-Stage Vignette Gradients for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-heritage-espresso/90 via-heritage-espresso/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-heritage-espresso/40 via-transparent to-transparent opacity-60" />

              {/* Top Collection Pill */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-block bg-heritage-warm-ivory/90 backdrop-blur-xs border border-heritage-antique-gold/50 text-heritage-espresso text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1 shadow-xs">
                  The Festive Edit
                </span>
              </div>

              {/* Bottom Editorial Content & Action Button */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-10 space-y-2 text-heritage-warm-ivory">
                <p className="text-[11px] uppercase tracking-[0.25em] text-heritage-antique-gold-light font-medium">
                  Pure Handloom Silk &bull; Handcrafted Drapes
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-heritage-warm-ivory tracking-wide leading-tight group-hover:text-heritage-antique-gold-light transition-colors duration-300">
                  Royal Chanderi Sarees &amp; Sets
                </h2>
                <p className="text-xs sm:text-sm text-heritage-warm-ivory/80 max-w-md line-clamp-2 font-light">
                  Woven with intricate antique gold zari borders and floral buttis, tailored for festive elegance.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center text-xs uppercase tracking-widest text-heritage-warm-ivory font-medium border-b border-heritage-antique-gold/60 pb-1 group-hover:border-heritage-antique-gold-light group-hover:text-heritage-antique-gold-light transition-all">
                    <span>Shop Festive Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>

            {/*
             * RIGHT PORTAL: EVERYDAY HANDBLOCK & CASUAL EDIT
             * Features handcrafted organic mulmul kurtis, tunics, and breezy traditional sets.
             */}
            <Link
              href="/women/kurtis"
              className="group relative h-[480px] sm:h-[540px] lg:h-[620px] overflow-hidden border border-heritage-antique-gold/30 bg-heritage-espresso/5 shadow-xl block"
            >
              {/* Campaign Image with Cinematic Hover Zoom */}
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1800&q=85"
                alt="Ragadhni Women's Everyday Casual Collection — Handblock Mulmul Kurtis and Kurta Sets"
                fill
                priority
                className="object-cover object-top editorial-hover-zoom"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Rich Multi-Stage Vignette Gradients for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-heritage-espresso/90 via-heritage-espresso/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-heritage-espresso/40 via-transparent to-transparent opacity-60" />

              {/* Top Collection Pill */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-block bg-heritage-warm-ivory/90 backdrop-blur-xs border border-heritage-antique-gold/50 text-heritage-espresso text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1 shadow-xs">
                  Everyday Elegance
                </span>
              </div>

              {/* Bottom Editorial Content & Action Button */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-10 space-y-2 text-heritage-warm-ivory">
                <p className="text-[11px] uppercase tracking-[0.25em] text-heritage-antique-gold-light font-medium">
                  Organic Mulmul &bull; Lucknowi Chikankari
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-heritage-warm-ivory tracking-wide leading-tight group-hover:text-heritage-antique-gold-light transition-colors duration-300">
                  Handblock Kurtis &amp; Sets
                </h2>
                <p className="text-xs sm:text-sm text-heritage-warm-ivory/80 max-w-md line-clamp-2 font-light">
                  Breezy silhouettes hand-printed with natural vegetable dyes, crafted for daily comfort and effortless grace.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center text-xs uppercase tracking-widest text-heritage-warm-ivory font-medium border-b border-heritage-antique-gold/60 pb-1 group-hover:border-heritage-antique-gold-light group-hover:text-heritage-antique-gold-light transition-all">
                    <span>Shop Kurtis &amp; Suits</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/*
           * PART 3: HERITAGE REASSURANCE RIBBON
           * 4 minimal, dignified trust points building customer confidence.
           */}
          <div className="border-t border-heritage-antique-gold/25 pt-6 flex flex-wrap items-center justify-around gap-4 text-xs text-heritage-espresso/75">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-heritage-burgundy" />
              <span className="tracking-wide font-medium">Artisan Handloom Weaves</span>
            </div>
            <span className="text-heritage-antique-gold/40 hidden md:inline">&bull;</span>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-heritage-burgundy" />
              <span className="tracking-wide font-medium">100% Pure Natural Fibers</span>
            </div>
            <span className="text-heritage-antique-gold/40 hidden md:inline">&bull;</span>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-heritage-burgundy" />
              <span className="tracking-wide font-medium">Complimentary Shipping &gt; ₹1,499</span>
            </div>
            <span className="text-heritage-antique-gold/40 hidden md:inline">&bull;</span>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-heritage-burgundy" />
              <span className="tracking-wide font-medium">Direct Weaver Honesty</span>
            </div>
          </div>
        </div>
      </section>

      {/*
       * ========================================================================
       * SECTION 2: CURATED CATEGORY SHOWCASE
       * Visual cards highlighting primary silhouettes for women's Indian ethnic & casual wardrobes.
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

                {/* Category Badge (e.g., "Women") */}
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
                New Arrivals in Women&apos;s Handlooms
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
            An exclusive curation of shimmering Chanderi silk sarees, handcrafted lehenga sets,
            and regal anarkali drapes designed to make every occasion memorable.
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
