/**
 * ==============================================================================
 * Ragadhni — Editorial Product Detail Page (`src/app/product/[slug]/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This is the individual Product Detail Page (PDP) template for all garments on Ragadhni.
 * It is dynamically routed using Next.js `[slug]` parameters.
 * When a shopper visits `/product/chanderi-silk-embroidered-anarkali-set`, this page:
 * 1. Reads the `slug` from the URL.
 * 2. Fetches the matching garment record from `mockProducts` (or PostgreSQL database in later phases).
 * 3. Generates dynamic SEO `<title>` and `<meta>` tags for Google search.
 * 4. Displays breadcrumbs (`Home / Women / Lehengas & Anarkalis / Garment Title`).
 * 5. Renders `<ImageGallery />` on the left and `<ProductDetailsClient />` on the right.
 * 6. Renders a "Complete the Look / You May Also Love" recommendations row.
 *
 * WHY IT IS A SERVER COMPONENT:
 * By keeping this main page as a Server Component:
 * - Product data is fetched server-side with zero client-side loading spinners.
 * - `generateMetadata()` injects exact product names, prices, and images into the HTML
 *   header so social media cards (WhatsApp, Instagram, Facebook) look beautiful when shared.
 * - Interactive elements (size selection, pincode checking) are delegated to the
 *   `<ProductDetailsClient />` child component.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Rendered inside `src/app/layout.tsx`.
 * - Uses `<Container>` from `src/components/ui/Container.tsx`.
 * - Uses `<ImageGallery>` from `src/components/storefront/product/ImageGallery.tsx`.
 * - Uses `<ProductDetailsClient>` from `src/components/storefront/product/ProductDetailsClient.tsx`.
 * - Uses `<ProductCard>` to render related garment recommendations at the bottom.
 */

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mockProducts } from "@/lib/mockData";
import { Container } from "@/components/ui/Container";
import { ImageGallery } from "@/components/storefront/product/ImageGallery";
import { ProductDetailsClient } from "@/components/storefront/product/ProductDetailsClient";
import { ProductCard } from "@/components/storefront/product/ProductCard";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  // In Next.js 15, route parameters are provided as an asynchronous Promise
  params: Promise<{ slug: string }>;
}

/**
 * `generateStaticParams`:
 * Next.js function that tells the build system all possible product URLs in advance.
 * This pre-renders every product page to static HTML at build time for instant page loads.
 */
export function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * `generateMetadata`:
 * Dynamically builds Google SEO tags and social sharing previews for this specific garment.
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Garment Not Found — Ragadhni",
      description: "The requested clothing item could not be found.",
    };
  }

  return {
    title: `${product.title} — Ragadhni`,
    description: `${product.description} Handcrafted in ${product.fabric}.`,
    openGraph: {
      title: `${product.title} | Ragadhni Indian Fashion`,
      description: product.description,
      images: [
        {
          url: product.images[0]?.url || "",
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  // Await the route parameter to retrieve the active slug
  const { slug } = await params;

  // Find matching garment from catalog data
  const product = mockProducts.find((p) => p.slug === slug);

  // If no product matches the URL slug, trigger Next.js 404 page
  if (!product) {
    notFound();
  }

  // Related recommendations (garments from the same gender, excluding the current product)
  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.gender === product.gender)
    .slice(0, 4);

  return (
    <div className="py-6 sm:py-10">
      <Container>
        {/*
         * ========================================================================
         * 1. BREADCRUMBS NAVIGATION:
         * Helps shoppers retrace their steps back to the parent category.
         * ========================================================================
         */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-heritage-earth mb-8"
        >
          <Link href="/" className="hover:text-heritage-burgundy transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-heritage-sand" />
          <Link
            href="/women"
            className="hover:text-heritage-burgundy transition-colors"
          >
            Women
          </Link>
          <ChevronRight className="w-3 h-3 text-heritage-sand" />
          <Link
            href={`/women/${product.category}`}
            className="hover:text-heritage-burgundy transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 text-heritage-sand" />
          <span className="text-heritage-charcoal font-medium line-clamp-1">
            {product.title}
          </span>
        </nav>

        {/*
         * ========================================================================
         * 2. MAIN 2-COLUMN PDP LAYOUT:
         * Left: Image Gallery with thumbnail switcher and zoom.
         * Right: Interactive product details, size selector, pincode checker, and buy actions.
         * ========================================================================
         */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (Takes 7 of 12 columns on desktop) */}
          <div className="lg:col-span-7">
            <ImageGallery
              images={product.images}
              title={product.title}
              fabricBadge={product.fabric}
            />
          </div>

          {/* Right Column: Interactive Details (Takes 5 of 12 columns on desktop) */}
          <div className="lg:col-span-5">
            <ProductDetailsClient product={product} />
          </div>
        </div>

        {/*
         * ========================================================================
         * 3. COMPLETE THE LOOK / RELATED CURATIONS:
         * Recommends complementary garments from the same ethnic category.
         * ========================================================================
         */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#E3D8C6]">
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-2">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-heritage-terracotta font-medium">
                  Complete the Wardrobe
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-heritage-charcoal font-normal mt-1">
                  You May Also Love
                </h2>
              </div>
              <Link
                href={`/women/${product.category}`}
                className="text-xs uppercase tracking-widest text-heritage-charcoal hover:text-heritage-burgundy font-medium transition-colors"
              >
                View Full Collection &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

