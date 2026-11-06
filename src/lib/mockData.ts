/**
 * ==============================================================================
 * Ragadhni — Sample Product Catalog Data (`src/lib/mockData.ts`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file contains realistic sample Indian clothing items (Kurtis, Anarkalis,
 * Sarees, Salwar Suits, Bottomwear, Men's Kurtas, Casual Shirts, and Nehru Jackets)
 * shaped strictly according to the `Product` interface defined in `src/types/index.ts`.
 *
 * WHY IT EXISTS:
 * In professional e-commerce development, building the user interface (UI) and
 * the database often happen in parallel. Mock data allows frontend components
 * (like `ProductCard.tsx`, category listing pages, and product detail pages)
 * to be designed, tested, and previewed with authentic cultural data
 * (real Indian fabrics, weave types, and INR prices) before the live PostgreSQL
 * database is populated.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Imported by `src/app/page.tsx` to render the "New Arrivals" grid.
 * - Used by Category Product Listing Pages (`/women`, `/men`, `/collections/*`).
 * - Used by the Product Detail Page (`/product/[slug]`) to render the full product view.
 * - When we connect the real database via Prisma later, we simply replace
 *   `mockProducts` with a database query (e.g. `await prisma.product.findMany()`).
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
    fabric: "Pure Chanderi Silk",
    weave: "Handwoven Chanderi",
    work: "Zari & Thread Work",
    fit: "Flared Silhouette",
    washCare: "Dry Clean Only",
    basePrice: 3899,
    compareAtPrice: 5499,
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 38,
    tags: ["Chanderi", "Festive", "Embroidered", "Anarkali", "Ethnic"],
    images: [
      {
        id: "img-001-a",
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
        altText: "Chanderi Silk Embroidered Anarkali Set Model Shot",
        isPrimary: true,
      },
      {
        id: "img-001-b",
        url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
        altText: "Close-up of Zari embroidery on neckline",
      },
    ],
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
    tags: ["Mulmul", "Handblock", "Everyday Ethnic", "Summer", "Casual"],
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

  // ----------------------------------------------------------------------------
  // Product 5: Women's Pure Zari Woven Chanderi Saree
  // ----------------------------------------------------------------------------
  {
    id: "rag-005",
    title: "Pure Zari Woven Chanderi Saree with Blouse Piece",
    slug: "pure-zari-woven-chanderi-saree",
    description:
      "A shimmering 6-yard pure Chanderi silk saree adorned with intricate antique gold zari borders and dainty floral buttis. Comes with an unstitched matching blouse fabric piece (0.8m).",
    gender: "WOMEN",
    category: "sarees",
    categoryName: "Sarees & Drapes",
    fabric: "Pure Chanderi Silk",
    weave: "Handloom Zari Weave",
    work: "Antique Gold Zari Border",
    fit: "Classic 6-Yard Drape",
    washCare: "Dry Clean Only",
    basePrice: 4299,
    compareAtPrice: 5999,
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 56,
    tags: ["Chanderi", "Saree", "Festive", "Silk", "Zari"],
    images: [
      {
        id: "img-005-a",
        url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
        altText: "Pure Zari Woven Chanderi Saree Pallu Drape",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-005-free", sku: "RAG-SAR-CH-01", size: "Free Size", color: "Deep Maroon & Gold", colorHex: "#681D23", price: 4299, stockQuantity: 14 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 6: Women's Pastel Floral Salwar Suit Set
  // ----------------------------------------------------------------------------
  {
    id: "rag-006",
    title: "Pastel Floral Georgette Salwar Suit Set",
    slug: "pastel-floral-georgette-salwar-suit-set",
    description:
      "Three-piece salwar suit set featuring a digital floral georgette kurta with delicate gota lace edging, comfortable modal silk salwar, and a matching chiffon dupatta.",
    gender: "WOMEN",
    category: "salwar-suits",
    categoryName: "Salwar Suits",
    fabric: "Flowing Georgette with Cotton Lining",
    weave: "Fine Georgette",
    work: "Gota Patti & Foil Highlights",
    fit: "Straight Kurta with Gathered Salwar",
    washCare: "Dry Clean or Gentle Cold Wash",
    basePrice: 2899,
    compareAtPrice: 3899,
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 18,
    tags: ["Salwar Suit", "Pastel", "Floral", "Occasion"],
    images: [
      {
        id: "img-006-a",
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
        altText: "Pastel Floral Georgette Salwar Suit Set",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-006-s", sku: "RAG-SLW-PST-S", size: "S", color: "Blush Rose", colorHex: "#D4A59A", price: 2899, stockQuantity: 7 },
      { id: "var-006-m", sku: "RAG-SLW-PST-M", size: "M", color: "Blush Rose", colorHex: "#D4A59A", price: 2899, stockQuantity: 12 },
      { id: "var-006-l", sku: "RAG-SLW-PST-L", size: "L", color: "Blush Rose", colorHex: "#D4A59A", price: 2899, stockQuantity: 9 },
      { id: "var-006-xl", sku: "RAG-SLW-PST-XL", size: "XL", color: "Blush Rose", colorHex: "#D4A59A", price: 2899, stockQuantity: 4 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 7: Women's Handloom Cotton Pleated Palazzo Trousers
  // ----------------------------------------------------------------------------
  {
    id: "rag-007",
    title: "Handloom Cotton Pleated Palazzo Trousers",
    slug: "handloom-cotton-pleated-palazzo-trousers",
    description:
      "Versatile wide-leg palazzo trousers tailored from 100% breathable handloom cotton. Designed with an elasticated drawstring waistband and deep side pockets.",
    gender: "WOMEN",
    category: "bottomwear",
    categoryName: "Palazzos & Trousers",
    fabric: "100% Handloom Cotton",
    weave: "Plain Weave Cotton",
    work: "Front Knife Pleats & Hand-Stitched Hem",
    fit: "Wide-Leg Relaxed",
    washCare: "Machine Wash Cold",
    basePrice: 1299,
    compareAtPrice: 1699,
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 31,
    tags: ["Bottomwear", "Palazzo", "Cotton", "Daily Wear"],
    images: [
      {
        id: "img-007-a",
        url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
        altText: "Handloom Cotton Pleated Palazzo Trousers",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-007-s", sku: "RAG-PLZ-CT-S", size: "S", color: "Natural Sand", colorHex: "#EDE4D7", price: 1299, stockQuantity: 15 },
      { id: "var-007-m", sku: "RAG-PLZ-CT-M", size: "M", color: "Natural Sand", colorHex: "#EDE4D7", price: 1299, stockQuantity: 20 },
      { id: "var-007-l", sku: "RAG-PLZ-CT-L", size: "L", color: "Natural Sand", colorHex: "#EDE4D7", price: 1299, stockQuantity: 18 },
      { id: "var-007-xl", sku: "RAG-PLZ-CT-XL", size: "XL", color: "Natural Sand", colorHex: "#EDE4D7", price: 1299, stockQuantity: 10 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 8: Men's Royal Jamawar Embroidered Nehru Jacket
  // ----------------------------------------------------------------------------
  {
    id: "rag-008",
    title: "Royal Jamawar Silk Nehru Jacket",
    slug: "royal-jamawar-silk-nehru-jacket",
    description:
      "A regal sleeveless Nehru jacket woven with traditional Kashmiri Jamawar paisley motifs, finished with a structured mandarin collar and antique brass buttons.",
    gender: "MEN",
    category: "sherwanis",
    categoryName: "Nehru Jackets & Sherwanis",
    fabric: "Jamawar Silk Blend",
    weave: "Brocade Jacquard",
    work: "Paisley Jamawar Weave",
    fit: "Tailored Slim Fit",
    washCare: "Dry Clean Only",
    basePrice: 3499,
    compareAtPrice: 4799,
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 22,
    tags: ["Nehru Jacket", "Festive", "Jamawar", "Men Ethnic", "Wedding"],
    images: [
      {
        id: "img-008-a",
        url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
        altText: "Royal Jamawar Silk Nehru Jacket in Deep Emerald",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-008-38", sku: "RAG-NJ-JM-38", size: "S", color: "Deep Emerald", colorHex: "#1B4332", price: 3499, stockQuantity: 6 },
      { id: "var-008-40", sku: "RAG-NJ-JM-40", size: "M", color: "Deep Emerald", colorHex: "#1B4332", price: 3499, stockQuantity: 10 },
      { id: "var-008-42", sku: "RAG-NJ-JM-42", size: "L", color: "Deep Emerald", colorHex: "#1B4332", price: 3499, stockQuantity: 8 },
      { id: "var-008-44", sku: "RAG-NJ-JM-44", size: "XL", color: "Deep Emerald", colorHex: "#1B4332", price: 3499, stockQuantity: 5 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 9: Men's Indigo Handblock Short Casual Kurta
  // ----------------------------------------------------------------------------
  {
    id: "rag-009",
    title: "Indigo Handblock Short Casual Kurta",
    slug: "indigo-handblock-short-casual-kurta",
    description:
      "A contemporary short kurta cut from naturally dyed Indigo cotton. Features an artisanal Dabu mud-resist block print and a relaxed notched collar.",
    gender: "MEN",
    category: "traditional-casual",
    categoryName: "Traditional Casuals",
    fabric: "100% Indigo Dyed Cotton",
    weave: "Slub Cotton",
    work: "Dabu Mud Resist Handblock",
    fit: "Relaxed Short Kurta Fit",
    washCare: "Hand Wash Separately in Cold Water",
    basePrice: 1499,
    compareAtPrice: 1999,
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 35,
    tags: ["Indigo", "Short Kurta", "Casual", "Handblock"],
    images: [
      {
        id: "img-009-a",
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
        altText: "Indigo Handblock Short Casual Kurta",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-009-s", sku: "RAG-MSK-ID-S", size: "S", color: "Indigo Blue", colorHex: "#1A2B4C", price: 1499, stockQuantity: 11 },
      { id: "var-009-m", sku: "RAG-MSK-ID-M", size: "M", color: "Indigo Blue", colorHex: "#1A2B4C", price: 1499, stockQuantity: 18 },
      { id: "var-009-l", sku: "RAG-MSK-ID-L", size: "L", color: "Indigo Blue", colorHex: "#1A2B4C", price: 1499, stockQuantity: 14 },
      { id: "var-009-xl", sku: "RAG-MSK-ID-XL", size: "XL", color: "Indigo Blue", colorHex: "#1A2B4C", price: 1499, stockQuantity: 7 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 10: Women's Handcrafted Chanderi Dupatta with Gota Patti
  // ----------------------------------------------------------------------------
  {
    id: "rag-010",
    title: "Handcrafted Chanderi Dupatta with Gota Patti",
    slug: "handcrafted-chanderi-dupatta-gota-patti",
    description:
      "A radiant 2.5-meter pure Chanderi silk dupatta framed with lustrous hand-stitched Gota Patti borders and delicate tassel details.",
    gender: "WOMEN",
    category: "kurtis",
    categoryName: "Dupattas & Stoles",
    fabric: "Pure Chanderi Silk",
    weave: "Fine Sheer Chanderi",
    work: "Gota Patti Border & Tassels",
    fit: "Full 2.5m Stole Drape",
    washCare: "Dry Clean Only",
    basePrice: 1199,
    compareAtPrice: 1699,
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 16,
    tags: ["Dupatta", "Chanderi", "Gota Patti", "Festive"],
    images: [
      {
        id: "img-010-a",
        url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
        altText: "Handcrafted Chanderi Dupatta with Gota Patti",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-010-free", sku: "RAG-DUP-CH-01", size: "Free Size", color: "Antique Gold Ochre", colorHex: "#C2A673", price: 1199, stockQuantity: 22 },
    ],
  },
];
