/**
 * ==============================================================================
 * Ragadhni — Sample Product Catalog Data (`src/lib/mockData.ts`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file contains realistic sample women's Indian clothing items (Kurtis, Anarkalis,
 * Sarees, Salwar Suits, Lehengas, Ethnic Dresses, Palazzos, and Dupattas)
 * shaped strictly according to the `Product` interface defined in `src/types/index.ts`.
 * Ragadhni is an exclusively women's Indian ethnic and traditional clothing brand.
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
 * - Used by Category Product Listing Pages (`/women`, `/women/[category]`, `/collections/*`).
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
  // Product 3: Women's Banarasi Silk Festive Lehenga Set
  // ----------------------------------------------------------------------------
  {
    id: "rag-003",
    title: "Banarasi Silk Woven Festive Lehenga Set",
    slug: "banarasi-silk-woven-festive-lehenga-set",
    description:
      "A handcrafted Banarasi silk lehenga woven with floral antique gold zari buttis, paired with an embroidered blouse and a lightweight organza dupatta.",
    gender: "WOMEN",
    category: "lehengas-anarkalis",
    categoryName: "Lehengas & Anarkalis",
    fabric: "Pure Banarasi Silk Blend",
    weave: "Brocade Jacquard",
    work: "Antique Gold Zari & Gota Patti",
    fit: "Voluminous Flared Flare",
    washCare: "Dry Clean Only",
    basePrice: 4999,
    compareAtPrice: 6999,
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 48,
    tags: ["Banarasi", "Lehenga", "Festive", "Silk", "Zari", "Wedding"],
    images: [
      {
        id: "img-003-a",
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
        altText: "Banarasi Silk Woven Festive Lehenga Set in Royal Ruby & Gold",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-003-xs", sku: "RAG-LHG-BN-XS", size: "XS", color: "Royal Ruby & Gold", colorHex: "#8B1E2B", price: 4999, stockQuantity: 5 },
      { id: "var-003-s", sku: "RAG-LHG-BN-S", size: "S", color: "Royal Ruby & Gold", colorHex: "#8B1E2B", price: 4999, stockQuantity: 9 },
      { id: "var-003-m", sku: "RAG-LHG-BN-M", size: "M", color: "Royal Ruby & Gold", colorHex: "#8B1E2B", price: 4999, stockQuantity: 12 },
      { id: "var-003-l", sku: "RAG-LHG-BN-L", size: "L", color: "Royal Ruby & Gold", colorHex: "#8B1E2B", price: 4999, stockQuantity: 7 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 4: Women's Lucknowi Chikankari Embroidered Mulmul Kurti Set
  // ----------------------------------------------------------------------------
  {
    id: "rag-004",
    title: "Lucknowi Chikankari Embroidered Mulmul Kurti Set",
    slug: "lucknowi-chikankari-embroidered-mulmul-kurti-set",
    description:
      "Crafted from breathable 100% fine cotton mulmul featuring intricate floral Lucknowi Chikankari needlework, paired with straight palazzo trousers.",
    gender: "WOMEN",
    category: "kurtis",
    categoryName: "Kurtis & Sets",
    fabric: "100% Fine Mulmul Cotton",
    weave: "Soft Sheer Mulmul",
    work: "Lucknowi Hand Chikankari",
    fit: "Straight Regular Fit",
    washCare: "Gentle Hand Wash in Cold Water",
    basePrice: 2299,
    compareAtPrice: 2999,
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 27,
    tags: ["Chikankari", "Mulmul", "Handcrafted", "Kurtis", "Summer"],
    images: [
      {
        id: "img-004-a",
        url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
        altText: "Lucknowi Chikankari Embroidered Mulmul Kurti Set in Ivory White",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-004-xs", sku: "RAG-CHK-ML-XS", size: "XS", color: "Ivory White", colorHex: "#FDFCF7", price: 2299, stockQuantity: 8 },
      { id: "var-004-s", sku: "RAG-CHK-ML-S", size: "S", color: "Ivory White", colorHex: "#FDFCF7", price: 2299, stockQuantity: 14 },
      { id: "var-004-m", sku: "RAG-CHK-ML-M", size: "M", color: "Ivory White", colorHex: "#FDFCF7", price: 2299, stockQuantity: 18 },
      { id: "var-004-l", sku: "RAG-CHK-ML-L", size: "L", color: "Ivory White", colorHex: "#FDFCF7", price: 2299, stockQuantity: 11 },
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
  // Product 8: Women's Pure Tussar Silk Handwoven Festive Saree
  // ----------------------------------------------------------------------------
  {
    id: "rag-008",
    title: "Pure Tussar Silk Handwoven Festive Saree",
    slug: "pure-tussar-silk-handwoven-festive-saree",
    description:
      "A radiant 6-yard saree woven from natural textured Tussar silk with contrasting temple borders and a rich tribal pallu. Includes an unstitched blouse piece (0.8m).",
    gender: "WOMEN",
    category: "sarees",
    categoryName: "Sarees & Drapes",
    fabric: "100% Pure Tussar Silk",
    weave: "Handloom Slub Tussar",
    work: "Woven Temple Border",
    fit: "Classic 6-Yard Drape",
    washCare: "Dry Clean Only",
    basePrice: 3799,
    compareAtPrice: 4999,
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 34,
    tags: ["Tussar", "Saree", "Handloom", "Silk", "Festive"],
    images: [
      {
        id: "img-008-a",
        url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
        altText: "Pure Tussar Silk Handwoven Festive Saree in Golden Sand & Maroon",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-008-free", sku: "RAG-SAR-TS-01", size: "Free Size", color: "Golden Sand & Maroon", colorHex: "#C29B38", price: 3799, stockQuantity: 12 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 9: Women's Ajrakh Handblock Printed Modal Silk Casual Dress
  // ----------------------------------------------------------------------------
  {
    id: "rag-009",
    title: "Ajrakh Handblock Printed Modal Silk Casual Dress",
    slug: "ajrakh-handblock-printed-modal-silk-casual-dress",
    description:
      "An effortless tiered ethnic casual dress crafted from lustrous modal silk, featuring traditional Kutch Ajrakh geometric handblock prints and side pockets.",
    gender: "WOMEN",
    category: "casual-dresses",
    categoryName: "Ethnic Casual Dresses",
    fabric: "Lustrous Modal Silk",
    weave: "Plain Weave Modal",
    work: "Natural Dye Ajrakh Handblock",
    fit: "Tiered Flared Fit",
    washCare: "Gentle Cold Wash Separately",
    basePrice: 2499,
    compareAtPrice: 3299,
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 29,
    tags: ["Ajrakh", "Handblock", "Casual Dress", "Modal Silk", "Everyday"],
    images: [
      {
        id: "img-009-a",
        url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
        altText: "Ajrakh Handblock Printed Modal Silk Casual Dress in Indigo & Madder Red",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-009-xs", sku: "RAG-DRS-AJ-XS", size: "XS", color: "Indigo & Madder Red", colorHex: "#1A2B4C", price: 2499, stockQuantity: 6 },
      { id: "var-009-s", sku: "RAG-DRS-AJ-S", size: "S", color: "Indigo & Madder Red", colorHex: "#1A2B4C", price: 2499, stockQuantity: 10 },
      { id: "var-009-m", sku: "RAG-DRS-AJ-M", size: "M", color: "Indigo & Madder Red", colorHex: "#1A2B4C", price: 2499, stockQuantity: 15 },
      { id: "var-009-l", sku: "RAG-DRS-AJ-L", size: "L", color: "Indigo & Madder Red", colorHex: "#1A2B4C", price: 2499, stockQuantity: 8 },
      { id: "var-009-xl", sku: "RAG-DRS-AJ-XL", size: "XL", color: "Indigo & Madder Red", colorHex: "#1A2B4C", price: 2499, stockQuantity: 4 },
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
    category: "dupattas",
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

  // ----------------------------------------------------------------------------
  // Product 11: Women's Kundan & Pearl Chandbali Earrings
  // ----------------------------------------------------------------------------
  {
    id: "rag-011",
    title: "Kundan & Freshwater Pearl Chandbali Earrings",
    slug: "kundan-freshwater-pearl-chandbali-earrings",
    description:
      "Handcrafted 22k gold plated brass crescent earrings set with uncut Kundan stones, emerald meenakari reverse work, and cascading freshwater seed pearls.",
    gender: "WOMEN",
    category: "accessories",
    categoryName: "Jewellery & Accessories",
    fabric: "Gold Plated Brass & Kundan",
    weave: "Handcrafted Filigree",
    work: "Jadau Kundan & Meenakari",
    fit: "Statement Crescent Earring",
    washCare: "Store in airtight pouch away from moisture",
    basePrice: 1499,
    compareAtPrice: 2199,
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 42,
    tags: ["Jewellery", "Kundan", "Earrings", "Festive", "Accessories"],
    images: [
      {
        id: "img-011-a",
        url: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80",
        altText: "Kundan & Freshwater Pearl Chandbali Earrings",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-011-free", sku: "RAG-JWL-KUN-01", size: "Free Size", color: "Muted Gold", colorHex: "#C3A16B", price: 1499, stockQuantity: 15 },
    ],
  },

  // ----------------------------------------------------------------------------
  // Product 12: Women's Zari Embroidered Raw Silk Potli Bag
  // ----------------------------------------------------------------------------
  {
    id: "rag-012",
    title: "Zari Embroidered Raw Silk Festive Potli Bag",
    slug: "zari-embroidered-raw-silk-festive-potli-bag",
    description:
      "Lustrous raw silk drawstring bag embellished with antique gold zari embroidery, braided pearl handle, and handmade latkan tassels.",
    gender: "WOMEN",
    category: "accessories",
    categoryName: "Jewellery & Accessories",
    fabric: "Pure Raw Silk",
    weave: "Textured Silk",
    work: "Zari Threadwork & Latkan",
    fit: "Drawstring Clutch Bag",
    washCare: "Spot Clean with Dry Cloth Only",
    basePrice: 1299,
    compareAtPrice: 1799,
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 29,
    tags: ["Potli", "Silk", "Accessories", "Festive", "Bags"],
    images: [
      {
        id: "img-012-a",
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
        altText: "Zari Embroidered Raw Silk Festive Potli Bag",
        isPrimary: true,
      },
    ],
    variants: [
      { id: "var-012-free", sku: "RAG-ACC-POT-01", size: "Free Size", color: "Royal Burgundy", colorHex: "#35131F", price: 1299, stockQuantity: 18 },
    ],
  },
];
