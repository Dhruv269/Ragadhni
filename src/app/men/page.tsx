/**
 * ==============================================================================
 * Ragadhni — Men's Master Collection Page (`src/app/men/page.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This page displays the complete Men's Indian Ethnic & Traditional Casuals collection.
 * It fetches all garments where `gender === "MEN"` and hands them over to
 * `<CategoryListingClient />` for real-time filtering (by fabric, size, price) and sorting.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Accessed when shoppers click "Men" in the main navigation or hero button.
 * - Filters products from `mockProducts` in `src/lib/mockData.ts`.
 * - Renders `<CategoryListingClient>` from `src/components/storefront/catalog/CategoryListingClient.tsx`.
 */

import React from "react";
import type { Metadata } from "next";
import { mockProducts } from "@/lib/mockData";
import { CategoryListingClient } from "@/components/storefront/catalog/CategoryListingClient";

export const metadata: Metadata = {
  title: "Men's Indian Ethnic & Traditional Casual Wear — Ragadhni",
  description:
    "Explore Ragadhni's complete men's collection: raw Tussar silk festive kurtas, handspun Khadi casual shirts, traditional short kurtas, and regal Jamawar Nehru jackets.",
};

export default function MenCollectionPage() {
  // Filter all products belonging to men's wear
  const menProducts = mockProducts.filter(
    (p) => p.gender === "MEN" || p.gender === "UNISEX"
  );

  return (
    <CategoryListingClient
      initialProducts={menProducts}
      pageTitle="Men's Ethnic & Casual Collection"
      categoryBadge="Handcrafted Men's Apparel"
      pageDescription="Tailored Indian silhouettes cut from raw Tussar silk, handspun Khadi cotton, and festive brocade jacquards. Combining centuries of Indian weaving pride with modern, comfortable tailoring."
    />
  );
}

