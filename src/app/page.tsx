/**
 * ==============================================================================
 * Ragadhni — Premium Women's Ethnic Fashion Homepage (`src/app/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This is the root landing page (route: `/`) of Ragadhni, an exclusively women's
 * contemporary Indian ethnic fashion and traditional accessories brand.
 *
 * DESIGN DIRECTION:
 * HERITAGE LUXE × INDIAN EDITORIAL
 * Combining Indian royal architectural aesthetics (jharokha cusped arch framing,
 * deep royal burgundy, antique gold accents) with contemporary luxury fashion
 * editorials and seamless modern e-commerce usability.
 *
 * HOMEPAGE SECTIONS:
 * 1. SECTION B: Hero Section — Royal Architectural Framing
 *    Deep burgundy surroundings, ornate Indian architectural arch framing an
 *    editorial portrait of an Indian woman, headline "Where Heritage Meets Her",
 *    dual CTAs, and floating textile provenance insets.
 * 2. SECTION C: Brand Introduction
 *    Editorial story of how traditional Indian textile lineages meet modern women's fashion,
 *    featuring close-up craft photography and feature pillars.
 * 3. SECTION D: Shop by Category
 *    6 distinctive image-led cards: Sarees, Kurtas & Suits, Lehengas, Ethnic Dresses,
 *    Dupattas, and Handcrafted Accessories.
 * 4. SECTION E: Featured Collections
 *    Varied editorial layouts showcasing occasion edits: Everyday Elegance, Festive Edit,
 *    Traditional Classics, Contemporary Ethnic, and Wedding Guest Edit.
 * 5. SECTION F: Bestsellers & New Arrivals
 *    Interactive tabbed product showcase featuring `<ProductCard />` components with
 *    color swatches, prices, wishlist toggles, and quick add overlays.
 * 6. SECTION G: Craftsmanship & Heritage Storytelling
 *    Deep-dive into 4 handloom crafts: Chanderi Weaving, Bagru Handblocks, Lucknowi
 *    Chikankari, and Bengal Tussar Silk.
 * 7. SECTION H: Editorial Fashion Campaign
 *    Full-width magazine spread for the Sovereign Woman Edit in rich wine and gold.
 * 8. SECTION I: Customer Trust & Experience
 *    4 verified customer reassurances: Handloom Certified, Free Delivery > ₹1,499,
 *    7-Day Doorstep Exchange, and 100% Encrypted & COD Friendly.
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockProducts } from "@/lib/mockData";
import { FeaturedProductTabs } from "@/components/storefront/home/FeaturedProductTabs";
import {
  ArrowRight,
  Sparkles,
  Feather,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Compass,
} from "lucide-react";

export default function HomePage() {
  /*
   * Category Card Definitions (Section D: Shop by Category):
   * 6 image-led categories covering women's ethnic apparel and handcrafted accessories.
   */
  const categories = [
    {
      title: "Handcrafted Sarees",
      subtitle: "Six yards of pure Chanderi & Tussar silk",
      link: "/women/sarees",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      tag: "Heirloom Weaves",
    },
    {
      title: "Kurtas & Suits",
      subtitle: "Everyday poise & flared anarkali sets",
      link: "/women/kurtis",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
      tag: "Daily Grace",
    },
    {
      title: "Festive Lehengas",
      subtitle: "Opulent Banarasi brocade & zari borders",
      link: "/women/lehengas-anarkalis",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      tag: "Celebration",
    },
    {
      title: "Ethnic Dresses",
      subtitle: "Breezy cuts in Bagru & Ajrakh prints",
      link: "/women/casual-dresses",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      tag: "Contemporary",
    },
    {
      title: "Artisanal Dupattas",
      subtitle: "Pure silk stoles with Gota Patti trims",
      link: "/women/dupattas",
      image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      tag: "Handcrafted Drapes",
    },
    {
      title: "Jewellery & Accessories",
      subtitle: "Uncut Kundan chandbalis & silk potli bags",
      link: "/women/accessories",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80",
      tag: "Artisanal Accents",
    },
  ];

  /*
   * Heritage Craftsmanship Narratives (Section G):
   * Highlights 4 generational handloom traditions directly supported by Ragadhni.
   */
  const crafts = [
    {
      region: "Chanderi, Madhya Pradesh",
      title: "Chanderi Silk & Zari Weaving",
      description:
        "Interlacing fine mulberry silk warps with breathable cotton wefts and heirloom antique gold zari buttis, creating sheer, feather-light drapes favored by Indian royal courts for centuries.",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    },
    {
      region: "Bagru & Barmer, Rajasthan",
      title: "Bagru & Ajrakh Woodblock Printing",
      description:
        "Hand-carved seasoned teak woodblocks hand-stamped onto pure organic mulmul using mineral river mud, fermented natural indigo, and boiled pomegranate peel dyes.",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    },
    {
      region: "Lucknow, Awadh",
      title: "Lucknowi Chikankari Needlework",
      description:
        "Delicate shadow-work needlecraft meticulously hand-embroidered by generational women artisans across 32 traditional stitch varieties on pure, breathable muslins.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    },
    {
      region: "Murshidabad & Malda, Bengal",
      title: "Handspun Tussar Silk Cultivation",
      description:
        "Wild textured forest cocoons reeled and handspun into rich, earthy silks with a signature natural golden patina and natural breathability for all seasons.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="space-y-20 lg:space-y-32">
      {/*
       * ========================================================================
       * SECTION B: HERO SECTION — ROYAL ARCHITECTURAL FRAMING
       * ========================================================================
       * High-impact editorial hero inspired by Indian royal palace gateways (jharokhas).
       * Features deep burgundy surroundings (#35131F), a double gold arch portal
       * framing the woman's portrait, grand typography, and negative space.
       */}
      <section className="relative w-full bg-gradient-to-b from-luxe-burgundy via-[#2B0F19] to-luxe-maroon border-b border-luxe-gold/30 overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 text-luxe-warmwhite">
        {/* Subtle Indian Palace Jaali Lattice Geometry Overlay */}
        <div className="absolute inset-0 jaali-bg opacity-[0.04] pointer-events-none" />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/*
             * LEFT COLUMN: EDITORIAL MASTHEAD & NARRATIVE (7 Columns on Large Screens)
             */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Seasonal Campaign Badge */}
              <div className="animate-hero-text hero-delay-1 inline-flex items-center space-x-2.5 bg-luxe-maroon/80 border border-luxe-gold/50 px-4 py-1.5 shadow-sm backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-luxe-gold" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-luxe-gold">
                  Autumn / Festive 2026 &bull; The Royal Heirloom Edit
                </span>
              </div>

              {/* Grand Editorial Headline in Cormorant Garamond */}
              <h1 className="animate-hero-text hero-delay-2 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] tracking-tight text-luxe-warmwhite font-normal leading-[1.06]">
                Where Heritage <br />
                <span className="italic font-light text-luxe-gold">
                  Meets Her.
                </span>
              </h1>

              {/* Supporting Brand Narrative */}
              <p className="animate-hero-text hero-delay-3 text-sm sm:text-base lg:text-lg text-luxe-warmwhite/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover Indian traditions reimagined for the way women dress today.
                Pure Chanderi weaves, handspun organic mulmul, and generational
                heirloom drapes tailored for effortless sovereign grace.
              </p>

              {/* Dual Master Action Buttons */}
              <div className="animate-hero-text hero-delay-4 pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/women" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-luxe-gold hover:bg-[#DFC99E] text-luxe-maroon border border-luxe-gold tracking-widest text-xs uppercase font-semibold px-9 py-4 shadow-lg transition-all duration-300 group"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5 text-luxe-maroon" />
                  </Button>
                </Link>

                <Link href="/about" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-luxe-gold/60 text-luxe-warmwhite hover:bg-luxe-warmwhite/10 hover:border-luxe-gold tracking-widest text-xs uppercase font-medium px-8 py-4 transition-all duration-300"
                  >
                    <span>Discover Ragadhni</span>
                  </Button>
                </Link>
              </div>

              {/* Micro Craftsmanship & Transparency Indicators */}
              <div className="animate-hero-text hero-delay-4 pt-6 border-t border-luxe-gold/25 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-luxe-warmwhite/80 font-light">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-luxe-gold" />
                  <span>Handloom Weaves</span>
                </div>
                <span className="text-luxe-gold/40 hidden sm:inline">&bull;</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-luxe-gold" />
                  <span>Pure Natural Fibres</span>
                </div>
                <span className="text-luxe-gold/40 hidden sm:inline">&bull;</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-luxe-gold" />
                  <span>Direct Weaver Transparency</span>
                </div>
                <span className="text-luxe-gold/40 hidden sm:inline">&bull;</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-luxe-gold" />
                  <span>Free Delivery &gt; ₹1,499</span>
                </div>
              </div>
            </div>

            {/*
             * RIGHT COLUMN: ROYAL ARCHITECTURAL EDITORIAL ARCH (5 Columns on Large Screens)
             * Pure, statuesque architectural framing with subtle antique gold hairlines.
             * Eliminates distracting ornamental clipart in favor of clean high-fashion editorial presence.
             */}
            <div className="lg:col-span-5 relative flex justify-center animate-arch-reveal">
              {/* Outer Architectural Frame Container */}
              <div className="relative w-full max-w-[460px]">
                {/* Architectural Gold Hairline Outer Rim */}
                <div className="p-2 sm:p-2.5 border border-luxe-gold/35 rounded-t-[240px] sm:rounded-t-[300px] lg:rounded-t-[340px] bg-gradient-to-b from-luxe-maroon/80 to-luxe-burgundy/80 shadow-2xl backdrop-blur-xs relative">
                  {/* Inner Arch Window Container */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] min-h-[460px] sm:min-h-[540px] lg:min-h-[580px] w-full overflow-hidden rounded-t-[230px] sm:rounded-t-[290px] lg:rounded-t-[330px] border border-luxe-gold/25 group">
                    <Image
                      src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=85"
                      alt="Ragadhni Women's Royal Heritage Drape — Pure Chanderi Saree in Traditional Architectural Setting"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top editorial-hover-zoom"
                    />

                    {/* Gradient Shadows for Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon via-luxe-maroon/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-luxe-maroon/30 via-transparent to-transparent" />

                    {/* Floating Provenance Plaque: Textile No. 01 */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-luxe-maroon/90 border border-luxe-gold/30 backdrop-blur-md space-y-1 shadow-xl">
                      <div className="flex items-center justify-between text-[10px] text-luxe-gold uppercase tracking-[0.2em] font-medium">
                        <span>Textile No. 01</span>
                        <span>Madhya Pradesh</span>
                      </div>
                      <h3 className="font-serif text-lg text-luxe-warmwhite font-normal leading-tight">
                        Handwoven Chanderi Zari Drape
                      </h3>
                      <p className="text-[11px] text-luxe-warmwhite/75 font-light">
                        Pure mulberry silk warp with fine combed cotton &amp; antique gold zari buttis.
                      </p>
                    </div>

                    {/* Top Architectural Stamp */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-block bg-luxe-maroon/90 backdrop-blur-xs border border-luxe-gold/40 text-luxe-gold text-[9px] uppercase tracking-[0.25em] font-medium px-3.5 py-1 shadow-sm">
                        Royal Architectural Arch
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
       * ========================================================================
       * SECTION C: BRAND INTRODUCTION & TEXTILE LINEAGE
       * ========================================================================
       * Communicates the brand philosophy: Traditional Indian aesthetics meeting
       * the contemporary woman's daily lifestyle, backed by direct weaver partnerships.
       */}
      <section className="py-6 sm:py-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-luxe-terracotta font-medium">
                <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
                <span>Textile Philosophy &amp; Lineage</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxe-charcoal font-normal leading-[1.12]">
                Rooted in Sacred Weaves, <br className="hidden sm:inline" />
                Reimagined for Her Modern Rhythm.
              </h2>

              <p className="text-sm sm:text-base text-luxe-grey leading-relaxed font-light">
                At <strong>Ragadhni</strong>, we believe ethnic Indian fashion should never be
                confined to rare wedding seasons and ceremonial chests. By collaborating directly
                with multigenerational weaving cooperatives across Chanderi, Bagru, Lucknow,
                and Bengal, we eliminate excessive distributor markups to offer authentic
                handlooms at fair, transparent prices.
              </p>

              <p className="text-sm sm:text-base text-luxe-grey leading-relaxed font-light">
                Every drape honours ancient artisanal lineages while celebrating the sovereign
                freedom, effortless grace, and individuality of the contemporary woman.
              </p>

              {/* 2 Feature Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-luxe-gold/30">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-luxe-ivory/60 rounded-full text-luxe-terracotta shrink-0 mt-0.5">
                    <Feather className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-luxe-charcoal">
                      Pure Natural Fibres
                    </h4>
                    <p className="text-xs text-luxe-grey mt-1 leading-relaxed">
                      Organic cotton mulmul, raw textured Tussar, and natural vegetable block dyes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-luxe-ivory/60 rounded-full text-luxe-terracotta shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-luxe-charcoal">
                      Direct Weaver Transparency
                    </h4>
                    <p className="text-xs text-luxe-grey mt-1 leading-relaxed">
                      Zero synthetic compromises, honest pricing, and ethical artisan compensation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/about">
                  <Button variant="editorial">
                    Discover Our Craft Story &rarr;
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Asymmetric Photo Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-luxe-gold/40 shadow-xl bg-luxe-ivory/40">
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
                  alt="Artisan weaving traditional Indian handloom fabric"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Overlapping Floating Inset Card */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-luxe-burgundy text-luxe-warmwhite p-4 sm:p-5 border border-luxe-gold/50 shadow-2xl max-w-xs space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-luxe-gold font-medium">
                  Artisan Guild
                </span>
                <p className="font-serif text-base font-normal leading-snug">
                  Handcrafted in Chanderi &bull; 28 Days of Loom Craft
                </p>
                <p className="text-[11px] text-luxe-warmwhite/70 font-light">
                  Spun with pure mulberry silk warp and genuine gold zari buttis.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION D: SHOP BY CATEGORY
       * ========================================================================
       * 6 distinctive image-led category cards covering women's ethnic apparel
       * and handcrafted accessories with refined typography and smooth hover zoom.
       */}
      <section>
        <Container>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-luxe-terracotta font-medium">
              Curated Silhouettes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxe-charcoal font-normal">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-luxe-grey font-light">
              Explore our six core women&apos;s collections, from regal six-yard drapes to everyday handblock dresses.
            </p>
          </div>

          {/* 6-Column Responsive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.link}
                className="group relative aspect-[3/4] overflow-hidden bg-luxe-ivory/50 border border-luxe-gold/30 shadow-xs block"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon/90 via-luxe-maroon/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] uppercase tracking-widest text-luxe-warmwhite bg-luxe-maroon/70 backdrop-blur-xs px-2 py-0.5 border border-luxe-gold/30">
                    {cat.tag}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 text-luxe-warmwhite space-y-0.5">
                  <h3 className="font-serif text-base sm:text-lg tracking-wide group-hover:text-luxe-gold transition-colors font-normal leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] text-luxe-warmwhite/75 line-clamp-1 font-light">
                    {cat.subtitle}
                  </p>
                  <span className="inline-flex items-center text-[10px] text-luxe-gold uppercase tracking-widest font-medium pt-1.5 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION E: FEATURED COLLECTIONS
       * ========================================================================
       * Editorial showcase highlighting 5 occasion edits:
       * 1. The Festive Edit (Wide Spotlight Card)
       * 2. Everyday Elegance
       * 3. Traditional Classics
       * 4. Contemporary Ethnic
       * 5. Wedding Guest Edit
       */}
      <section className="bg-gradient-to-b from-luxe-ivory/30 via-luxe-warmwhite to-luxe-ivory/20 py-16 lg:py-24 border-y border-luxe-gold/25">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-luxe-gold/30 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-luxe-terracotta font-medium">
                Occasion Curations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxe-charcoal font-normal mt-1">
                Featured Collections
              </h2>
            </div>
            <Link
              href="/collections/ethnic-wear"
              className="text-xs uppercase tracking-widest text-luxe-charcoal hover:text-luxe-burgundy font-medium transition-colors"
            >
              View All Occasions &rarr;
            </Link>
          </div>

          {/* Varied Editorial Layout: Wide Hero Feature + 2x2 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Spotlight Feature Card (5 Columns on Large Screens) */}
            <Link
              href="/collections/festive-wear"
              className="lg:col-span-5 group relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden border border-luxe-gold/40 shadow-md bg-luxe-maroon block"
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="The Festive Edit — Chanderi Silk and Anarkali Heirlooms"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon/95 via-luxe-maroon/40 to-transparent" />

              <div className="absolute top-5 left-5">
                <Badge variant="gold">Celebration Grandeur</Badge>
              </div>

              <div className="absolute bottom-8 left-8 right-8 text-luxe-warmwhite space-y-2">
                <p className="text-[11px] uppercase tracking-[0.25em] text-luxe-gold font-medium">
                  Occasion Feature
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl text-luxe-warmwhite font-normal leading-tight group-hover:text-luxe-gold transition-colors">
                  The Festive Edit
                </h3>
                <p className="text-xs sm:text-sm text-luxe-warmwhite/80 max-w-sm font-light">
                  Shimmering pure Chanderi silk anarkalis, woven Banarasi lehenga sets, and royal dupattas.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center text-xs uppercase tracking-widest text-luxe-gold font-medium border-b border-luxe-gold/60 pb-1 group-hover:translate-x-1 transition-transform">
                    <span>Shop Festive Edit</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* 2x2 Editorial Cards Grid (7 Columns on Large Screens) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1: Everyday Elegance */}
              <Link
                href="/collections/casual-wear"
                className="group relative aspect-[4/5] overflow-hidden border border-luxe-gold/30 bg-luxe-ivory block shadow-xs"
              >
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
                  alt="Everyday Elegance — Handblock Printed Mulmul Kurtis"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon/90 via-luxe-maroon/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest text-luxe-warmwhite bg-luxe-maroon/60 px-2 py-0.5 border border-luxe-gold/30">
                    Daily Grace
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-luxe-warmwhite space-y-1">
                  <h4 className="font-serif text-xl group-hover:text-luxe-gold transition-colors font-normal">
                    Everyday Elegance
                  </h4>
                  <p className="text-xs text-luxe-warmwhite/75 line-clamp-1 font-light">
                    Breathable organic mulmul &amp; Bagru handblocks.
                  </p>
                  <span className="inline-flex items-center text-xs text-luxe-gold font-medium pt-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </Link>

              {/* Card 2: Traditional Classics */}
              <Link
                href="/collections/ethnic-wear"
                className="group relative aspect-[4/5] overflow-hidden border border-luxe-gold/30 bg-luxe-ivory block shadow-xs"
              >
                <Image
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
                  alt="Traditional Classics — Handcrafted Sarees"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon/90 via-luxe-maroon/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest text-luxe-warmwhite bg-luxe-maroon/60 px-2 py-0.5 border border-luxe-gold/30">
                    Heirloom Weaves
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-luxe-warmwhite space-y-1">
                  <h4 className="font-serif text-xl group-hover:text-luxe-gold transition-colors font-normal">
                    Traditional Classics
                  </h4>
                  <p className="text-xs text-luxe-warmwhite/75 line-clamp-1 font-light">
                    Time-honoured handloom sarees &amp; zari borders.
                  </p>
                  <span className="inline-flex items-center text-xs text-luxe-gold font-medium pt-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </Link>

              {/* Card 3: Contemporary Ethnic */}
              <Link
                href="/collections/new-arrivals"
                className="group relative aspect-[4/5] overflow-hidden border border-luxe-gold/30 bg-luxe-ivory block shadow-xs"
              >
                <Image
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
                  alt="Contemporary Ethnic — Modern Flared Cuts"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon/90 via-luxe-maroon/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest text-luxe-warmwhite bg-luxe-maroon/60 px-2 py-0.5 border border-luxe-gold/30">
                    Modern Cut
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-luxe-warmwhite space-y-1">
                  <h4 className="font-serif text-xl group-hover:text-luxe-gold transition-colors font-normal">
                    Contemporary Ethnic
                  </h4>
                  <p className="text-xs text-luxe-warmwhite/75 line-clamp-1 font-light">
                    Fluid tiered silhouettes &amp; fusion separates.
                  </p>
                  <span className="inline-flex items-center text-xs text-luxe-gold font-medium pt-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </Link>

              {/* Card 4: Wedding Guest Edit */}
              <Link
                href="/collections/bestsellers"
                className="group relative aspect-[4/5] overflow-hidden border border-luxe-gold/30 bg-luxe-ivory block shadow-xs"
              >
                <Image
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80"
                  alt="Wedding Guest Edit — Regal Brocades and Jewel Tones"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon/90 via-luxe-maroon/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest text-luxe-warmwhite bg-luxe-maroon/60 px-2 py-0.5 border border-luxe-gold/30">
                    Royal Occasion
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-luxe-warmwhite space-y-1">
                  <h4 className="font-serif text-xl group-hover:text-luxe-gold transition-colors font-normal">
                    Wedding Guest Edit
                  </h4>
                  <p className="text-xs text-luxe-warmwhite/75 line-clamp-1 font-light">
                    Regal jewel tones &amp; banarasi brocades.
                  </p>
                  <span className="inline-flex items-center text-xs text-luxe-gold font-medium pt-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION F: BESTSELLERS & NEW ARRIVALS
       * ========================================================================
       * Interactive tabbed product showcase featuring `<ProductCard />` components.
       * Supports color swatches, prices, wishlist toggles, and quick add overlays.
       */}
      <section>
        <Container>
          <FeaturedProductTabs products={mockProducts} />
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION G: CRAFTSMANSHIP & HERITAGE STORYTELLING
       * ========================================================================
       * Storytelling section celebrating 4 generational handloom traditions:
       * Chanderi Silk, Bagru Woodblock, Lucknowi Chikankari, and Bengal Tussar.
       */}
      <section className="bg-luxe-warmwhite border-y border-luxe-gold/30 py-16 lg:py-24">
        <Container>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-luxe-terracotta font-medium">
              Lineages of Handloom Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxe-charcoal font-normal">
              The Artisan&apos;s Guild
            </h2>
            <p className="text-xs sm:text-sm text-luxe-grey font-light leading-relaxed">
              Every Ragadhni garment is spun, woven, or printed by master craftspeople using
              centuries-old heritage techniques. We celebrate the hands that keep India&apos;s textile poetry alive.
            </p>
          </div>

          {/* 4 Craft Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {crafts.map((craft) => (
              <div
                key={craft.title}
                className="bg-luxe-ivory/30 border border-luxe-gold/30 overflow-hidden flex flex-col group hover:border-luxe-gold transition-colors duration-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-luxe-ivory">
                  <Image
                    src={craft.image}
                    alt={craft.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon/60 to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-[10px] uppercase tracking-widest text-luxe-gold font-medium bg-luxe-maroon/80 px-2 py-0.5 border border-luxe-gold/30">
                    {craft.region}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <h3 className="font-serif text-lg text-luxe-charcoal font-normal group-hover:text-luxe-burgundy transition-colors">
                      {craft.title}
                    </h3>
                    <p className="text-xs text-luxe-grey mt-2 leading-relaxed font-light">
                      {craft.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-luxe-gold/20 flex items-center justify-between text-[11px] text-luxe-terracotta font-medium">
                    <span>100% Ethical Craft</span>
                    <Compass className="w-3.5 h-3.5 text-luxe-gold" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION H: EDITORIAL FASHION CAMPAIGN
       * ========================================================================
       * Full-width magazine spread for "The Sovereign Woman Edit" in rich wine
       * and gold, resembling a luxury Indian fashion publication campaign.
       */}
      <section className="bg-gradient-to-r from-luxe-maroon via-luxe-burgundy to-luxe-wine text-luxe-warmwhite py-16 lg:py-24 relative overflow-hidden border-y border-luxe-gold/40">
        <div className="absolute inset-0 jaali-bg opacity-[0.03] pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Editorial Manifesto */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <Badge variant="gold">Campaign Autumn / Winter 2026</Badge>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-luxe-warmwhite leading-[1.08]">
                The Sovereign <br />
                <span className="italic font-light text-luxe-gold">
                  Woman Edit.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-luxe-warmwhite/80 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                &ldquo;Clothing steeped in memory, spun with patience, and draped with effortless
                sovereignty. For the modern Indian woman who wears her heritage with fearless poise.&rdquo;
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/collections/festive-wear">
                  <Button
                    size="lg"
                    className="bg-luxe-gold text-luxe-maroon hover:bg-[#DFC99E] font-medium tracking-widest text-xs uppercase px-8 py-4 shadow-lg"
                  >
                    <span>Shop The Campaign</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/women">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-luxe-gold/60 text-luxe-warmwhite hover:bg-luxe-warmwhite/10 font-medium tracking-widest text-xs uppercase px-8 py-4"
                  >
                    <span>View All Silhouettes</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Full Campaign Photograph */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden border-2 border-luxe-gold/50 shadow-2xl p-2 bg-luxe-maroon/40 rounded-sm">
                <div className="relative w-full h-full overflow-hidden border border-luxe-gold/30">
                  <Image
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                    alt="The Sovereign Woman Editorial Campaign Model Shot"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxe-maroon/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-center text-xs text-luxe-gold tracking-widest uppercase font-medium">
                    Limited Edition Festive Capsule
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*
       * ========================================================================
       * SECTION I: CUSTOMER TRUST & REASSURANCE EXPERIENCE
       * ========================================================================
       * 4 verified customer benefits ensuring peace of mind for Indian shoppers.
       */}
      <section className="py-14 sm:py-16 border-t border-luxe-gold/25 bg-luxe-ivory/30">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-luxe-ivory rounded-full text-luxe-terracotta shrink-0 border border-luxe-gold/30">
                <Sparkles className="w-5 h-5 text-luxe-gold" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-luxe-charcoal">
                  Authentic Handloom Weaves
                </h4>
                <p className="text-xs text-luxe-grey mt-1 leading-relaxed font-light">
                  100% pure natural fibres verified for authentic hand-weave provenance and fair artisan compensation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-luxe-ivory rounded-full text-luxe-terracotta shrink-0 border border-luxe-gold/30">
                <Truck className="w-5 h-5 text-luxe-gold" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-luxe-charcoal">
                  Complimentary Express Delivery
                </h4>
                <p className="text-xs text-luxe-grey mt-1 leading-relaxed font-light">
                  Free express shipping on all domestic orders above ₹1,499 across 25,000+ Indian pincodes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-luxe-ivory rounded-full text-luxe-terracotta shrink-0 border border-luxe-gold/30">
                <RotateCcw className="w-5 h-5 text-luxe-gold" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-luxe-charcoal">
                  7-Day Doorstep Exchange
                </h4>
                <p className="text-xs text-luxe-grey mt-1 leading-relaxed font-light">
                  Hassle-free size and product exchanges with seamless doorstep reverse courier pickup.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-luxe-ivory rounded-full text-luxe-terracotta shrink-0 border border-luxe-gold/30">
                <ShieldCheck className="w-5 h-5 text-luxe-gold" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-luxe-charcoal">
                  100% Secure Checkout &amp; COD
                </h4>
                <p className="text-xs text-luxe-grey mt-1 leading-relaxed font-light">
                  Encrypted UPI (GPay, PhonePe, Paytm), RuPay, Netbanking, Cards, and Cash on Delivery.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
