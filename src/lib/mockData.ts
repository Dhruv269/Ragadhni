/**
 * ==============================================================================
 * Ragadhni — Sample Product Catalog Data (`src/lib/mockData.ts`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file contains realistic sample Indian clothing items (Kurtis, Anarkalis,
 * Men's Kurtas, and Handloom Shirts) shaped strictly according to the `Product`
 * interface defined in `src/types/index.ts`.
 *
 * WHY IT EXISTS:
 * In professional e-commerce development, building the user interface (UI) and
 * the database often happen in parallel. Mock data allows frontend components
 * (like `ProductCard.tsx` and the homepage) to be designed, tested, and previewed
 * with authentic cultural data (real Indian fabrics, weave types, and INR prices)
 * before the live PostgreSQL database is populated.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Imported by `src/app/page.tsx` to render the "New Arrivals" and "Fresh Drops" grid.
 * - Each item in this array is passed as a prop into `<ProductCard product={item} />`.
 * - When we connect the real database via Prisma later, we will simply replace
 *   `mockProducts` with a database query (e.g. `await prisma.product.findMany()`).
 *   Because the data structure matches `Product`, the UI components will work
 *   seamlessly without any rewriting!
 */

import { Product } from "@/types";

export const mockProducts: Product[] = [
  // ----------------------------------------------------------------------------
  // Product 1: Women's Festive Silk Anarkali Set
  // ----------------------------------------------------------------------------
  {
    id: "rag-001",
    title: "Chanderi Silk Embroidered Anarkali Set",
    slug: "chanderi-silk-embroidered-anarkali-set",
    description:
      "Crafted from lightweight pure Chanderi silk with delicate Zari neckline embroidery, paired with a matching organza dupatta and churidar trousers.",
    gender: "WOMEN",
    category: "lehengas-anarkalis",
    categoryName: "Lehengas & Anarkalis",
    // Authentic Indian textile specifications:
    fabric: "Pure Chanderi Silk",
    weave: "Handwoven Chanderi",
    work: "Zari & Thread Work",
    fit: "Flared Silhouette",
    washCare: "Dry Clean Only",
    // Pricing in Indian Rupees (INR):
    basePrice: 3899,
    compareAtPrice: 5499, // Original higher price (used to calculate discount %)
    // Visibility and merchandising flags:
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 38,
    tags: ["Chanderi", "Festive", "Embroidered", "Anarkali"],
    // Multi-angle photography:
    images: [
      {
        id: "img-001-a",
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
        altText: "Chanderi Silk Embroidered Anarkali Set Model Shot",
        isPrimary: true, // Main photo displayed on product cards
      },
      {
        id: "img-001-b",
        url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
        altText: "Close-up of Zari embroidery on neckline",
      },
    ],
    // Size and stock variations:
    variants: [
      { id: "var-001-s", sku: "RAG-ANK-CH-S", size: "S", color: "Rust Terracotta", colorHex: "#9E3D2B", price: 3899, stockQuantity: 8 },
      { id: "var-001-m", sku: "RAG-ANK-CH-M", size: "M", color: "Rust Terracotta", colorHex: "#9E3D2B", price: 3899, stockQuantity: 12 },
      { id: "var-001-l", sku: "RAG-ANK-CH-L", size: "L", color: "Rust Terracotta", colorHex: "#9E3D2B", price: 3899, stockQuantity: 5 },
      { id: "var-001-xl", sku: "RAG-ANK-CH-XL", size: "XL", color: "Rust Terracotta", colorHex: "#9E3D2B", price: 3899, stockQuantity: 3 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 2: Women's Everyday Organic Mulmul Kurti Set
  // ----------------------------------------------------------------------------
  {
    id: "rag-002",
    title: "Handblock Printed Mulmul Kurti Set",
    slug: "handblock-printed-mulmul-kurti-set",
    description:
      "Breathable organic cotton mulmul kurti featuring traditional Bagru handblock floral motifs, paired with straight trousers.",
    gender: "WOMEN",
    category: "kurtis",
    categoryName: "Kurtis & Sets",
    fabric: "100% Organic Mulmul Cotton",
    weave: "Fine Mulmul",
    work: "Bagru Handblock Print",
    fit: "Straight Regular Fit",
    washCare: "Gentle Hand Wash in Cold Water",
    basePrice: 1899,
    compareAtPrice: 2499,
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 24,
    tags: ["Mulmul", "Handblock", "Everyday Ethnic", "Summer"],
    images: [
      {
        id: "img-002-a",
        url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
        altText: "Handblock Printed Mulmul Kurti Set in Sage Olive",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-002-xs", sku: "RAG-KRT-ML-XS", size: "XS", color: "Sage & Sand", colorHex: "#8A9A86", price: 1899, stockQuantity: 6 },
      { id: "var-002-s", sku: "RAG-KRT-ML-S", size: "S", color: "Sage & Sand", colorHex: "#8A9A86", price: 1899, stockQuantity: 15 },
      { id: "var-002-m", sku: "RAG-KRT-ML-M", size: "M", color: "Sage & Sand", colorHex: "#8A9A86", price: 1899, stockQuantity: 18 },
      { id: "var-002-l", sku: "RAG-KRT-ML-L", size: "L", color: "Sage & Sand", colorHex: "#8A9A86", price: 1899, stockQuantity: 10 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 3: Men's Raw Tussar Silk Festive Kurta
  // ----------------------------------------------------------------------------
  {
    id: "rag-003",
    title: "Tussar Silk Handloom Festive Men's Kurta",
    slug: "tussar-silk-handloom-festive-mens-kurta",
    description:
      "A tailored men's festive kurta crafted from raw textured Tussar silk featuring a mandarin collar and subtle antique brass buttoning.",
    gender: "MEN",
    category: "kurtas",
    categoryName: "Men's Kurtas",
    fabric: "Raw Tussar Silk Blend",
    weave: "Handloom Tussar",
    work: "Slub Texture & Brass Accents",
    fit: "Tailored Modern Ethnic Fit",
    washCare: "Dry Clean Recommended",
    basePrice: 2699,
    compareAtPrice: 3499,
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 42,
    tags: ["Tussar", "Festive", "Men Ethnic", "Mandarin Collar"],
    images: [
      {
        id: "img-003-a",
        url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
        altText: "Tussar Silk Men's Festive Kurta in Warm Ochre",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-003-38", sku: "RAG-MKR-TS-38", size: "S", color: "Warm Ochre", colorHex: "#C29B38", price: 2699, stockQuantity: 9 },
      { id: "var-003-40", sku: "RAG-MKR-TS-40", size: "M", color: "Warm Ochre", colorHex: "#C29B38", price: 2699, stockQuantity: 14 },
      { id: "var-003-42", sku: "RAG-MKR-TS-42", size: "L", color: "Warm Ochre", colorHex: "#C29B38", price: 2699, stockQuantity: 11 },
      { id: "var-003-44", sku: "RAG-MKR-TS-44", size: "XL", color: "Warm Ochre", colorHex: "#C29B38", price: 2699, stockQuantity: 7 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 4: Men's Handspun Khadi Traditional Casual Shirt
  // ----------------------------------------------------------------------------
  {
    id: "rag-004",
    title: "Handspun Khadi Traditional Casual Shirt",
    slug: "handspun-khadi-traditional-casual-shirt",
    description:
      "Crafted from breathable 100% handspun Khadi cotton, combining Indian heritage weaving with an effortless casual button-down silhouette.",
    gender: "MEN",
    category: "casual-shirts",
    categoryName: "Men's Casual Shirts",
    fabric: "100% Handspun Khadi",
    weave: "Traditional Khadi",
    work: "Natural Coconut Shell Buttons",
    fit: "Relaxed Casual",
    washCare: "Machine Wash Cold with Similar Colors",
    basePrice: 1599,
    compareAtPrice: 2199,
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 19,
    tags: ["Khadi", "Casual Shirt", "Summer", "Handcrafted"],
    images: [
      {
        id: "img-004-a",
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
        altText: "Handspun Khadi Traditional Casual Shirt in Raw Ivory",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-004-s", sku: "RAG-MSH-KD-S", size: "S", color: "Raw Ivory", colorHex: "#F7F5EE", price: 1599, stockQuantity: 10 },
      { id: "var-004-m", sku: "RAG-MSH-KD-M", size: "M", color: "Raw Ivory", colorHex: "#F7F5EE", price: 1599, stockQuantity: 16 },
      { id: "var-004-l", sku: "RAG-MSH-KD-L", size: "L", color: "Raw Ivory", colorHex: "#F7F5EE", price: 1599, stockQuantity: 8 },
    ],
  },
];
