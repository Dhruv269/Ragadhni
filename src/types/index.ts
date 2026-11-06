/**
 * ==============================================================================
 * Ragadhni — TypeScript Domain Types & Interfaces (`src/types/index.ts`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file is the "dictionary" of data shapes for the entire Ragadhni website.
 * It defines what a Product, Category, Variant, Cart, and Navigation Item look like.
 *
 * WHY IT EXISTS:
 * In plain JavaScript, you can easily make typos (e.g. writing `product.cost` instead
 * of `product.basePrice`), and JavaScript won't warn you until the website crashes in production.
 * In TypeScript, these "interfaces" and "types" act like strict blueprints. If any component
 * tries to use a property that doesn't exist, TypeScript catches the error immediately.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - `Product` is used by `ProductCard.tsx`, `mockData.ts`, and the homepage `page.tsx`.
 * - `ProductVariant` powers size selection (`XS` to `XXL`) and inventory counters.
 * - `NavItem` defines the menus rendered in `Header.tsx` and `MobileDrawer.tsx`.
 * - `Cart` and `CartItem` are used by the shopping bag and checkout systems.
 */

// ==============================================================================
// 1. AUDIENCE & CATEGORY DEFINITIONS
// ==============================================================================

/**
 * Gender:
 * Ragadhni is an exclusively women's Indian ethnic and traditional clothing brand.
 * The Gender type is strictly restricted to "WOMEN".
 */
export type Gender = "WOMEN";

/**
 * ApparelCategory:
 * The complete list of women's clothing categories supported by the Ragadhni brand.
 * Using a union type prevents spelling mistakes when creating new products or category routes.
 * Accessories are strictly excluded.
 */
export type ApparelCategory =
  | "kurtis"
  | "sarees"
  | "salwar-suits"
  | "lehengas-anarkalis"
  | "casual-dresses"
  | "tops-tunics"
  | "bottomwear"
  | "dupattas";

/**
 * CategoryInfo:
 * Defines metadata for a category landing page (e.g., banner image, title, subcategories).
 */
export interface CategoryInfo {
  id: string;
  name: string;
  slug: string; // URL-safe name (e.g., "kurtis")
  gender: Gender;
  description: string;
  image?: string; // The `?` means this field is optional (can be omitted)
  subcategories?: { name: string; slug: string }[];
}

// ==============================================================================
// 2. PRODUCT & VARIANT DEFINITIONS
// ==============================================================================

/**
 * ProductVariant:
 * Represents one specific purchasable variation of a garment (e.g., Size "M" in "Rust Terracotta").
 * In fashion e-commerce, customers don't buy a generic "Kurti"; they buy a specific size and color.
 * We track stock quantities on the variant level so we know if "Size M" is sold out while "Size L" is in stock.
 */
export interface ProductVariant {
  id: string;
  sku: string; // Stock Keeping Unit (e.g., "RAG-ANK-CH-M")
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Free Size" | "Custom";
  color: string; // Name of the color (e.g., "Rust Terracotta")
  colorHex?: string; // Hex color code for swatch preview dots (e.g., "#9E3D2B")
  price: number; // Current selling price in INR
  compareAtPrice?: number; // Original crossed-out price (if discounted)
  stockQuantity: number; // Number of physical pieces left in the warehouse
}

/**
 * ProductImage:
 * Defines a photo belonging to a product.
 */
export interface ProductImage {
  id: string;
  url: string; // Direct image URL (e.g. from Unsplash or Cloudinary)
  altText: string; // Description for screen-readers and Google SEO
  isPrimary?: boolean; // True if this is the main photo displayed on product cards
}

/**
 * Product:
 * The complete data structure representing an Indian ethnic clothing item.
 * Contains both high-level information (title, fabric, wash care) and nested lists
 * (variants array for sizes, images array for photography).
 */
export interface Product {
  id: string;
  title: string; // Garment name (e.g., "Chanderi Silk Embroidered Anarkali Set")
  slug: string; // URL-friendly path (e.g., "chanderi-silk-embroidered-anarkali-set")
  description: string; // Editorial paragraph explaining design and styling
  gender: Gender;
  category: ApparelCategory;
  categoryName: string; // User-facing category label (e.g., "Lehengas & Anarkalis")
  fabric: string; // e.g. "Pure Chanderi Silk", "Organic Mulmul Cotton"
  weave?: string; // Traditional weave technique (e.g., "Handwoven Chanderi")
  work?: string; // Surface ornamentation (e.g., "Zari & Thread Work", "Bagru Handblock")
  fit?: string; // Garment cut (e.g., "Flared Silhouette", "Straight Regular Fit")
  washCare: string; // Maintenance instructions (e.g., "Dry Clean Only")
  basePrice: number; // Current selling price in Indian Rupees (e.g., 3899)
  compareAtPrice?: number; // Higher original price to calculate discounts (e.g., 5499)
  isNewArrival?: boolean; // Shows "New Arrival" badge if true
  isBestseller?: boolean; // Shows "Bestseller" gold badge if true
  isFeatured?: boolean; // Controls whether this item appears in curated homepage showcases
  rating?: number; // Customer star rating (e.g., 4.8)
  reviewCount?: number; // Total number of reviews submitted
  images: ProductImage[]; // Array of product photos
  variants: ProductVariant[]; // Array of available sizes, colors, and stock counts
  tags: string[]; // Search keywords (e.g., ["Chanderi", "Festive", "Silk"])
}

// ==============================================================================
// 3. SHOPPING CART & CHECKOUT DEFINITIONS
// ==============================================================================

/**
 * CartItem:
 * Represents a single line item that a customer has placed into their shopping bag.
 */
export interface CartItem {
  id: string;
  productId: string;
  variantId: string; // Points to the specific size/color variant chosen
  title: string;
  slug: string;
  image: string; // Thumbnail preview image
  size: string; // e.g., "M"
  color: string;
  price: number; // Unit price
  quantity: number; // Quantity chosen by customer (e.g., 1 or 2)
  maxStock: number; // Warehouse limit so customer cannot add more than is available
}

/**
 * Cart:
 * The complete state of the shopping bag, including calculated totals and shipping fees.
 */
export interface Cart {
  items: CartItem[]; // List of all items currently in the bag
  subtotal: number; // Sum of all item prices
  discount: number; // Amount saved via promotional discount codes
  shippingFee: number; // Delivery charge (₹0 if subtotal exceeds threshold)
  freeShippingThreshold: number; // Benchmark for free shipping (₹1,499 in Ragadhni)
  total: number; // Final payable amount (subtotal - discount + shippingFee)
}

// ==============================================================================
// 4. NAVIGATION & TRUST SIGNALS
// ==============================================================================

/**
 * NavItem:
 * Represents a link in the website header or mobile drawer.
 * Can contain nested child categories to power the desktop mega-menu.
 */
export interface NavItem {
  label: string; // Display text (e.g., "Ethnic Wear", "Traditional Casuals", "New Arrivals")
  href: string; // Target link URL (e.g., "/women")
  isFeatured?: boolean;
  badge?: string; // Optional chip badge (e.g., "Fresh", "Trending")
  children?: {
    title: string; // Sub-group title (e.g., "Ethnic Wear", "Traditional Casuals")
    items: { label: string; href: string; badge?: string }[];
  }[];
}

/**
 * TrustSignal:
 * Represents a customer reassurance pillar (e.g., "Authentic Indian Craft", "7-Day Easy Exchange").
 * Displayed in the footer and across product pages to build trust with new shoppers.
 */
export interface TrustSignal {
  title: string;
  description: string;
  icon: string; // Name of Lucide React icon to render
}
