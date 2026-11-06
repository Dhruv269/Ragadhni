/**
 * ==============================================================================
 * Ragadhni — Women's Category Page (`src/app/women/[category]/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This dynamic route page displays a specific subcategory of women's apparel.
 * Examples:
 * - `/women/kurtis` (Kurtis & Kurta Sets)
 * - `/women/sarees` (Handcrafted Sarees & Drapes)
 * - `/women/salwar-suits` (Salwar Suits)
 * - `/women/lehengas-anarkalis` (Lehengas & Anarkalis)
 * - `/women/bottomwear` (Palazzos & Trousers)
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Linked directly from the desktop mega-menu (`Header.tsx`) and mobile drawer (`MobileDrawer.tsx`).
 * - Filters `mockProducts` by matching `category` slug.
 * - Renders `<CategoryListingClient>` for client-side filtering and sorting.
 */

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import { CategoryListingClient } from "@/components/storefront/catalog/CategoryListingClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// Map of category slugs to formatted titles and descriptions
const categoryDetailsMap: Record<
  string,
  { title: string; badge: string; description: string }
> = {
  kurtis: {
    title: "Kurtis & Kurta Sets",
    badge: "Women's Ethnic Wear",
    description: "Everyday elegance in fine organic mulmul and handblock prints paired with straight trousers.",
  },
  sarees: {
    title: "Handcrafted Sarees & Drapes",
    badge: "Timeless Indian Weaves",
    description: "Six yards of pure Chanderi silk, festive zari weaves, and lightweight handlooms with unstitched blouse pieces.",
  },
  "salwar-suits": {
    title: "Salwar Suits & Sets",
    badge: "Traditional Grace",
    description: "Three-piece traditional suits with matching dupattas and flowing salwars for festive occasions.",
  },
  "lehengas-anarkalis": {
    title: "Lehengas & Anarkalis",
    badge: "Festive & Occasion Wear",
    description: "Flared Chanderi silk anarkalis and regal festive lehengas adorned with delicate Zari and Gota craftsmanship.",
  },
  "casual-dresses": {
    title: "Ethnic Casual Dresses",
    badge: "Contemporary Silhouettes",
    description: "Effortless flared dresses crafted from handspun cotton and natural vegetable dyes.",
  },
  "tops-tunics": {
    title: "Tops & Tunics",
    badge: "Everyday Casuals",
    description: "Breezy handloom tunics and short kurtis for effortless everyday styling.",
  },
  bottomwear: {
    title: "Palazzos, Pants & Trousers",
    badge: "Wardrobe Essentials",
    description: "Tailored 100% handloom cotton palazzos and trousers designed for all-day comfort.",
  },
  dupattas: {
    title: "Handcrafted Dupattas & Stoles",
    badge: "Handloom Accents",
    description: "Pure Chanderi silk dupattas with Gota Patti borders and hand-stitched tassel details.",
  },
};

/**
 * `generateStaticParams`:
 * Pre-generates all women's category pages at build time.
 */
export function generateStaticParams() {
  return Object.keys(categoryDetailsMap).map((cat) => ({
    category: cat,
  }));
}

/**
 * `generateMetadata`:
 * Generates custom SEO titles and descriptions for each category.
 */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const details = categoryDetailsMap[category];
  if (!details) return { title: "Collection — Ragadhni" };

  return {
    title: `${details.title} — Ragadhni Women's Wear`,
    description: details.description,
  };
}

export default async function WomenCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const details = categoryDetailsMap[category];

  // If category is not recognized, show 404
  if (!details) {
    notFound();
  }

  // Filter products matching this category (or matching category tags)
  const categoryProducts = mockProducts.filter(
    (p) =>
      p.gender === "WOMEN" &&
      (p.category === category || p.tags.some((t) => t.toLowerCase() === category.toLowerCase()))
  );

  return (
    <CategoryListingClient
      initialProducts={categoryProducts}
      pageTitle={details.title}
      categoryBadge={details.badge}
      pageDescription={details.description}
      breadcrumbParent={{ label: "Women", href: "/women" }}
    />
  );
}

