/**
 * ==============================================================================
 * Ragadhni — Men's Category Page (`src/app/men/[category]/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This dynamic route page displays a specific subcategory of men's clothing.
 * Examples:
 * - `/men/kurtas` (Kurtas & Kurta Sets)
 * - `/men/casual-shirts` (Handloom Casual Shirts)
 * - `/men/traditional-casual` (Short Kurtas & Tunics)
 * - `/men/festive-wear` (Festive & Wedding Wear)
 * - `/men/sherwanis` (Nehru Jackets & Sherwanis)
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

// Map of men's category slugs to formatted titles and descriptions
const menCategoryDetailsMap: Record<
  string,
  { title: string; badge: string; description: string }
> = {
  kurtas: {
    title: "Men's Kurtas & Kurta Sets",
    badge: "Ethnic Heritage",
    description: "Tailored festive and daily kurtas crafted from raw Tussar silk blends, fine cotton, and antique brass details.",
  },
  "casual-shirts": {
    title: "Handloom Casual Shirts",
    badge: "Traditional Casuals",
    description: "Breathable 100% handspun Khadi cotton shirts featuring natural coconut shell buttons and relaxed casual cuts.",
  },
  "traditional-casual": {
    title: "Short Kurtas & Tunics",
    badge: "Everyday Traditional",
    description: "Contemporary short kurtas cut from artisanal Indigo handblock prints for versatile everyday wear.",
  },
  "festive-wear": {
    title: "Festive & Wedding Celebrations",
    badge: "Festive Grandeur",
    description: "Richly textured Tussar silks and embroidered kurtas designed to celebrate Indian occasions with dignity.",
  },
  sherwanis: {
    title: "Nehru Jackets & Sherwanis",
    badge: "Occasion Tailoring",
    description: "Structured sleeveless Nehru jackets woven with traditional Jamawar motifs and regal mandarin collars.",
  },
  bottomwear: {
    title: "Churidars & Dhoti Pants",
    badge: "Ethnic Bottomwear",
    description: "Comfortable cotton churidars and ready-to-wear pleated dhoti pants.",
  },
};

/**
 * `generateStaticParams`:
 * Pre-generates all men's category pages at build time.
 */
export function generateStaticParams() {
  return Object.keys(menCategoryDetailsMap).map((cat) => ({
    category: cat,
  }));
}

/**
 * `generateMetadata`:
 * Generates custom SEO titles and descriptions for each men's category.
 */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const details = menCategoryDetailsMap[category];
  if (!details) return { title: "Men's Collection — Ragadhni" };

  return {
    title: `${details.title} — Ragadhni Men's Wear`,
    description: details.description,
  };
}

export default async function MenCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const details = menCategoryDetailsMap[category];

  // If category is not recognized, show 404
  if (!details) {
    notFound();
  }

  // Filter products matching this men's category
  const categoryProducts = mockProducts.filter(
    (p) =>
      p.gender === "MEN" &&
      (p.category === category || p.tags.some((t) => t.toLowerCase() === category.toLowerCase()))
  );

  return (
    <CategoryListingClient
      initialProducts={categoryProducts}
      pageTitle={details.title}
      categoryBadge={details.badge}
      pageDescription={details.description}
      breadcrumbParent={{ label: "Men", href: "/men" }}
    />
  );
}

