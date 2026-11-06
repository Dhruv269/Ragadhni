/**
 * ==============================================================================
 * Ragadhni — Curated Collections Page (`src/app/collections/[slug]/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This dynamic route page displays curated cross-category edits that combine
 * women's Indian ethnic clothing under thematic drops:
 * - `/collections/ethnic-wear`: Authentic Indian sarees, lehengas, and anarkali sets.
 * - `/collections/casual-wear`: Handloom cotton kurtis, casual ethnic dresses, and palazzos.
 * - `/collections/new-arrivals`: Freshly launched drops for the upcoming season.
 * - `/collections/bestsellers`: Most-loved community favorites with high ratings.
 * - `/collections/festive-wear`: Celebration edits for Diwali, weddings, and family festivities.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Linked from the navigation bar (`Header.tsx`), hero buttons, and footer.
 * - Filters `mockProducts` based on thematic tags and merchandising flags.
 * - Renders `<CategoryListingClient>` for client-side filtering and sorting.
 */

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import { CategoryListingClient } from "@/components/storefront/catalog/CategoryListingClient";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

// Map of collection slugs to titles and descriptions
const collectionDetailsMap: Record<
  string,
  { title: string; badge: string; description: string; filterKey: string }
> = {
  "ethnic-wear": {
    title: "The Ethnic Wear Collection",
    badge: "Traditional Heritage",
    description: "An homage to Indian textile grandeur — Chanderi silks, handloom sarees, zari-embroidered anarkalis, and Banarasi lehengas.",
    filterKey: "ethnic",
  },
  "casual-wear": {
    title: "Traditional Casual Wear",
    badge: "Daily Grace & Comfort",
    description: "Breathable everyday fashion cut from pure organic mulmul, handspun Khadi, and natural Indigo block prints.",
    filterKey: "casual",
  },
  "new-arrivals": {
    title: "Fresh Drops & New Arrivals",
    badge: "Season 2026",
    description: "Discover our newest handcrafted arrivals for women, fresh off the artisan looms.",
    filterKey: "new",
  },
  bestsellers: {
    title: "Ragadhni Bestsellers",
    badge: "Community Favorites",
    description: "Our most-loved pieces celebrated for exquisite drape, breathable natural weaves, and timeless tailoring.",
    filterKey: "bestseller",
  },
  "festive-wear": {
    title: "The Celebration Edit",
    badge: "Festive Grandeur",
    description: "Curated heirloom ensembles, shimmering zari borders, and regal anarkali sets designed for Indian celebrations.",
    filterKey: "festive",
  },
};

/**
 * `generateStaticParams`:
 * Pre-renders all collection pages at build time.
 */
export function generateStaticParams() {
  return Object.keys(collectionDetailsMap).map((slug) => ({
    slug,
  }));
}

/**
 * `generateMetadata`:
 * Generates custom SEO titles and descriptions for each collection.
 */
export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const details = collectionDetailsMap[slug];
  if (!details) return { title: "Curated Collection — Ragadhni" };

  return {
    title: `${details.title} — Ragadhni`,
    description: details.description,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const details = collectionDetailsMap[slug];

  if (!details) {
    notFound();
  }

  // Filter products based on collection rule
  let collectionProducts = mockProducts;

  if (details.filterKey === "new") {
    collectionProducts = mockProducts.filter((p) => p.isNewArrival);
  } else if (details.filterKey === "bestseller") {
    collectionProducts = mockProducts.filter((p) => p.isBestseller);
  } else if (details.filterKey === "festive") {
    collectionProducts = mockProducts.filter(
      (p) =>
        p.tags.includes("Festive") ||
        p.tags.includes("Silk") ||
        p.category === "lehengas-anarkalis" ||
        p.category === "sarees"
    );
  } else if (details.filterKey === "casual") {
    collectionProducts = mockProducts.filter(
      (p) =>
        p.tags.includes("Casual") ||
        p.tags.includes("Summer") ||
        p.category === "casual-dresses" ||
        p.category === "tops-tunics" ||
        p.category === "bottomwear" ||
        p.category === "kurtis"
    );
  } else if (details.filterKey === "ethnic") {
    collectionProducts = mockProducts.filter(
      (p) =>
        p.category === "sarees" ||
        p.category === "lehengas-anarkalis" ||
        p.category === "salwar-suits" ||
        p.category === "kurtis" ||
        p.category === "dupattas" ||
        p.category === "accessories"
    );
  }

  return (
    <CategoryListingClient
      initialProducts={collectionProducts}
      pageTitle={details.title}
      categoryBadge={details.badge}
      pageDescription={details.description}
      breadcrumbParent={{ label: "Collections", href: "/" }}
    />
  );
}

