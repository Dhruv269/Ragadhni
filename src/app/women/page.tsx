/**
 * ==============================================================================
 * Ragadhni — Women's Master Collection Page (`src/app/women/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This page displays the complete Women's Indian Ethnic & Traditional Casuals collection.
 * It fetches all garments where `gender === "WOMEN"` and hands them over to
 * `<CategoryListingClient />` for real-time filtering (by fabric, size, price) and sorting.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Accessed when shoppers click "Women" in the main navigation or hero button.
 * - Filters products from `mockProducts` in `src/lib/mockData.ts`.
 * - Renders `<CategoryListingClient>` from `src/components/storefront/catalog/CategoryListingClient.tsx`.
 */

import React from "react";
import type { Metadata } from "next";
import { mockProducts } from "@/lib/mockData";
import { CategoryListingClient } from "@/components/storefront/catalog/CategoryListingClient";

export const metadata: Metadata = {
  title: "Women's Indian Ethnic & Traditional Casual Wear — Ragadhni",
  description:
    "Explore Ragadhni's complete women's collection: handcrafted Chanderi silk anarkalis, organic mulmul kurtis, handwoven sarees, and breezy palazzos.",
};

export default function WomenCollectionPage() {
  // Filter all products belonging to women's wear
  const womenProducts = mockProducts.filter(
    (p) => p.gender === "WOMEN" || p.gender === "UNISEX"
  );

  return (
    <CategoryListingClient
      initialProducts={womenProducts}
      pageTitle="Women's Ethnic & Casual Collection"
      categoryBadge="Handcrafted Indian Wardrobe"
      pageDescription="Timeless Indian silhouettes tailored in pure Chanderi silk, breathable organic mulmul cotton, and handblock prints. Designed for celebratory grandeur and everyday poise."
    />
  );
}

