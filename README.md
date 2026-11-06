# Ragadhni — Indian Ethnic & Traditional Casual Wear

> A direct-to-consumer (D2C) Indian clothing brand e-commerce platform built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Prisma.

---

## Table of Contents

- [1. About Ragadhni](#1-about-ragadhni)
- [2. Project Vision and Objectives](#2-project-vision-and-objectives)
- [3. Current Development Status](#3-current-development-status)
- [4. Implemented Features](#4-implemented-features)
  - [Phase 1: Storefront Foundation](#phase-1-storefront-foundation)
  - [Phase 2: Catalog Engine & Product Discovery](#phase-2-catalog-engine--product-discovery)
- [5. Technology Stack](#5-technology-stack)
- [6. Project Architecture & Directory Structure](#6-project-architecture--directory-structure)
- [7. Storefront Functionality](#7-storefront-functionality)
- [8. Product Catalogue & Discovery System](#8-product-catalogue--discovery-system)
- [9. Product Detail Experience (PDP)](#9-product-detail-experience-pdp)
- [10. Design System & UI Architecture](#10-design-system--ui-architecture)
- [11. Database Architecture & Prisma](#11-database-architecture--prisma)
- [12. Installation and Setup](#12-installation-and-setup)
- [13. Environment Configuration](#13-environment-configuration)
- [14. Development and Production Commands](#14-development-and-production-commands)
- [15. Upcoming Development Phases](#15-upcoming-development-phases)
- [16. Contribution Guidelines](#16-contribution-guidelines)
- [17. License](#17-license)

---

## 1. About Ragadhni

**Ragadhni** is an authentic Indian clothing brand specializing in handcrafted ethnic wear and traditional casual apparel for women and men. Rooted in traditional Indian craftsmanship, Ragadhni eliminates distributor markups by partnering directly with artisan weaving clusters across Madhya Pradesh, Rajasthan, and Bengal to offer premium handloom textiles at accessible, honest prices.

### Supported Product Categories

#### Women's Collection
- **Kurtis and Kurta Sets:** Everyday office and casual styles in breathable organic mulmul and handblock prints.
- **Handcrafted Sarees & Drapes:** 6-yard Chanderi silk, festive zari weaves, and unstitched blouse pieces.
- **Salwar Suits:** Three-piece ensembles with matching dupattas and tailored salwars.
- **Lehengas and Anarkalis:** Festive flared Chanderi silk silhouettes with delicate Zari and Gota work.
- **Casual Dresses:** Relaxed-fit flared dresses cut from handspun cotton and natural vegetable dyes.
- **Tops and Tunics:** Contemporary short kurtis and tunics for daily wear.
- **Bottomwear:** 100% handloom cotton pleated palazzos and straight trousers.
- **Dupattas & Stoles:** Pure Chanderi silk dupattas with Gota Patti borders and tassels.

#### Men's Collection
- **Kurtas and Kurta Sets:** Mandarin-collar festive kurtas in raw textured Tussar silk blends.
- **Casual Handloom Shirts:** 100% handspun Khadi cotton shirts with natural coconut shell buttons.
- **Traditional Casual Wear:** Artisanal Indigo short kurtas for everyday comfort.
- **Festive Wear:** Heirloom woven garments for weddings, celebrations, and festive occasions.
- **Sherwanis & Nehru Jackets:** Structured sleeveless waistcoats woven with Jamawar paisley brocades.
- **Ethnic Bottomwear:** Traditional cotton churidars and ready-to-wear pleated dhoti pants.

---

## 2. Project Vision and Objectives

Ragadhni is being developed as a commercial direct-to-consumer e-commerce brand. It is engineered from the ground up to support real customers, products, inventory, payments, and shipping.

### Key Architectural Goals
1. **Distinctive Brand Identity:** Avoiding generic pre-built Shopify templates and flat Bootstrap storefronts in favor of an editorial, warm Indian heritage aesthetic.
2. **Editorial Fashion Photography:** Vertical 4:5 aspect ratio presentation preserving full garment drapes without awkward cropping.
3. **Mobile-First Ergonomics:** Over 80% of Indian fashion traffic is mobile; navigation, filtering, and size selection are thumb-optimized.
4. **Performance & SEO:** Server-Side Rendering (SSR) and Static Site Generation (SSG) via Next.js App Router for sub-second page loads and Google search indexation.
5. **Type Safety & Maintainability:** Strict TypeScript contracts across all domain entities, components, and data layers.
6. **Beginner-Friendly Code Documentation:** Every meaningful section of code includes detailed comments explaining what it does, why it exists, how it works, and how it connects to other parts of the project.

---

## 3. Current Development Status

The project is being developed in structured, incremental phases. Below is the verified status of the codebase:

```
[Phase 1: Storefront Foundation]       --> COMPLETED
[Phase 2: Catalog Engine & Discovery]  --> COMPLETED
[Phase 3: Shopping Bag & Wishlist]     --> UPCOMING (Next)
[Phase 4: Indian Checkout & Payments]  --> PLANNED
[Phase 5: Admin & Inventory Ops]       --> PLANNED
[Phase 6: Policies & Brand Support]    --> PLANNED
[Phase 7: Performance & Security]      --> PLANNED
```

### Classification of Capabilities

| Category | Status | Notes |
| :--- | :--- | :--- |
| **Storefront Layout & Navigation** | Fully Implemented | Header, announcement bar, desktop mega-menu, mobile drawer, footer, and trust strip. |
| **Product Discovery & Filtering** | Fully Implemented | Real-time multi-facet filtering (fabric, size, price) and sorting (5 modes) across all categories. |
| **Product Detail Pages (PDP)** | Fully Implemented | 10 pre-rendered static routes with image gallery, size selector, accordions, and related products. |
| **Size Guide & Converter** | Fully Implemented | Interactive modal with authentic Indian measurements and an Inches/Centimeters toggle. |
| **Indian PIN Code Checker** | Simulated | Validates 6-digit Indian PIN codes and calculates estimated delivery dates (3-5 days); live courier APIs (Shiprocket/Delhivery) are planned for Phase 4. |
| **Product Catalog Data** | Mock Data | 10 realistic Indian garments in `src/lib/mockData.ts`. Live database queries via Prisma/PostgreSQL will be connected in subsequent phases. |
| **Shopping Bag & Wishlist** | UI Shell / Simulated | Header counters and buttons trigger interactive feedback; full `localStorage` persistence and slide-over drawers are scheduled for Phase 3. |
| **Payment & Checkout** | Planned | Razorpay sandbox integration and Cash on Delivery (COD) verification workflows will be built in Phase 4. |
| **User Authentication** | Planned | NextAuth.js (Auth.js) supporting OTP/SMS login and Google authentication is planned for Phase 4. |
| **Live Database Storage** | Schema Ready | PostgreSQL schema defined in `prisma/schema.prisma` with `@prisma/client` installed; database migrations and seed execution are scheduled. |

---

## 4. Implemented Features

### Phase 1: Storefront Foundation

- **Indian Heritage Design System:** Custom palette built into Tailwind CSS: Raw Silk Ivory (`#FAF7F2`), Warm Khadi Sand (`#EDE4D7`), Deep Charcoal (`#1C1917`), Terracotta Sindoor (`#9E3D2B`), Jamun Maroon (`#681D23`), and Antique Kansa Gold (`#C2A673`).
- **Editorial Typography Pairing:** Dual-font hierarchy via `next/font/google`:
  - Headings: `Cormorant Garamond` (classical Indian editorial serif).
  - Interface & Body: `Plus Jakarta Sans` (clean geometric sans-serif).
- **Persistent Root Layout:** Master frame in `src/app/layout.tsx` hosting self-hosted fonts, global SEO metadata, announcement bar, header, and footer.
- **Cycling Announcement Bar:** Client component rotating through key purchasing incentives (free shipping above ₹1,499, festive edits, verified COD) every 5 seconds with manual arrow overrides.
- **Brand Navigation Header:** Sticky frosted-glass header featuring the letter-spaced wordmark ("RAGADHNI"), expandable search drawer with popular keyword suggestions, and live action counters.
- **Mobile Navigation Drawer:** Slide-out drawer with accordion navigation for Women's and Men's subcategories, account links, and customer support contact details.
- **Trust Pillars & Footer:** 4 trust signals (*Authentic Indian Craft*, *Free Express Shipping*, *7-Day Easy Exchange*, *100% Secure Checkout*), brand story, sitemap, interactive newsletter subscription, and payment badges (UPI, RuPay, Netbanking, COD).
- **Reusable UI Primitives:** Headless, accessible components: `Button` (6 variants), `Badge` (textile, gold, terracotta, discount), and `Container` (responsive layout wrapper).
- **Product Card (`ProductCard.tsx`):** 4:5 vertical portrait ratio, image hover zoom, textile badge overlays, interactive wishlist toggle, hover quick-add size selector, and INR currency formatting.
- **Editorial Homepage (`src/app/page.tsx`):** Hero section, 4 curated silhouette cards, craftsmanship feature spotlight, fresh arrivals product grid, and celebratory festive banner.
- **Relational Database Schema:** Complete PostgreSQL schema in `prisma/schema.prisma` covering Users, Addresses, Categories, Products, Variants, Orders, Payments, Shipments, Wishlists, and Reviews.

### Phase 2: Catalog Engine & Product Discovery

- **Women's Master Catalog (`/women`):** Full catalog listing of all women's garments with real-time filtering and sorting.
- **Women's Subcategory Pages (`/women/[category]`):** Dynamic, statically pre-rendered routes for 8 specific categories:
  - `/women/kurtis`
  - `/women/sarees`
  - `/women/salwar-suits`
  - `/women/lehengas-anarkalis`
  - `/women/casual-dresses`
  - `/women/tops-tunics`
  - `/women/bottomwear`
  - `/women/dupattas`
- **Men's Master Catalog (`/men`):** Full catalog listing of all men's garments with real-time filtering and sorting.
- **Men's Subcategory Pages (`/men/[category]`):** Dynamic, statically pre-rendered routes for 6 specific categories:
  - `/men/kurtas`
  - `/men/casual-shirts`
  - `/men/traditional-casual`
  - `/men/festive-wear`
  - `/men/sherwanis`
  - `/men/bottomwear`
- **Thematic Curated Collections (`/collections/[slug]`):** Cross-category seasonal drops:
  - `/collections/ethnic-wear`
  - `/collections/casual-wear`
  - `/collections/new-arrivals`
  - `/collections/bestsellers`
  - `/collections/festive-wear`
- **Faceted Filtering Sidebar (`FilterSidebar.tsx`):**
  - Filter by Fabric: Pure Chanderi Silk, Organic Mulmul, Raw Tussar Silk, Handspun Khadi, Georgette, Handloom Cotton.
  - Filter by Size: XS, S, M, L, XL, XXL, Free Size.
  - Filter by Price Range: Under ₹2,000, ₹2,000 to ₹3,500, Above ₹3,500.
  - One-click filter reset button.
  - Responsive layout: Fixed desktop sidebar; slide-over drawer on mobile devices.
- **5-Mode Sorting Engine:** Featured Curations, Newest Arrivals, Price: Low to High, Price: High to Low, and Customer Rating.
- **Catalog Grid & Empty State (`ProductGrid.tsx`):** Responsive grid displaying active item count and a reassuring empty state when filters return 0 results.
- **Product Detail Page (`/product/[slug]`):** Server-rendered page with dynamic OpenGraph and SEO metadata generation, pre-rendering 10 sample products via `generateStaticParams()`.
- **Image Gallery (`ImageGallery.tsx`):** Multi-angle thumbnail carousel with main portrait viewport, hover zoom, and fabric badge overlay.
- **Size Selection & Stock Alerts (`ProductDetailsClient.tsx`):** Interactive size chips with low-stock warnings (*"Only 3 pieces left in size M"*).
- **Color Swatch Selector:** Clickable color preview dots with selected shade label.
- **Pricing & Discount Engine:** Automatic discount percentage calculation (`compareAtPrice` vs `basePrice`) displaying savings (e.g. `28% OFF`).
- **Indian Ethnic Size Guide Modal (`SizeGuideModal.tsx`):** Interactive modal with Inches and Centimeters toggle covering Bust/Chest, Waist, Hip, Collar, and Kurta Length, plus guidance on Indian garment tailoring ease.
- **Indian PIN Code Checker (`PincodeChecker.tsx`):** Real-time 6-digit postal PIN code format validator calculating dynamic delivery arrival dates (3-5 days) and confirming COD availability.
- **Product Specifications Accordions:** Expandable drawers for Fabric & Craftsmanship, Wash & Fabric Care, and Shipping & 7-Day Doorstep Returns.
- **Sticky Mobile Action Bar:** Pinned to the bottom of the screen on mobile phones so "Add to Bag" is always accessible while scrolling.
- **Related Garments Row:** "You May Also Love" recommendations grid rendered at the bottom of the PDP.

---

## 5. Technology Stack

### Core Framework & Runtime
- **Next.js 15.2.0:** React framework utilizing the App Router, Server Components, and Static Site Generation (SSG).
- **React 19.0.0 & React DOM 19.0.0:** Modern UI rendering engine.
- **TypeScript 5.7.3:** Strict static type checking for domain models, component props, and API contracts.
- **Node.js:** Modern LTS/Current JavaScript runtime environment.

### Styling & Design System
- **Tailwind CSS 3.4.17:** Utility-first CSS framework with custom Indian heritage color tokens.
- **PostCSS 8.5.2 & Autoprefixer 10.4.20:** CSS post-processing and cross-browser vendor prefixing.
- **Class Variance Authority (`class-variance-authority` 0.7.1):** Declarative, type-safe variant mapping for UI primitives.
- **Tailwind Merge (`tailwind-merge` 3.0.1) & Clsx (`clsx` 2.1.1):** Dynamic class merging resolving CSS specificity conflicts.
- **Lucide React (`lucide-react` 0.475.0):** Clean, scalable vector icon library.
- **Next Font (`next/font/google`):** Build-time self-hosted Google Fonts (`Cormorant Garamond` and `Plus Jakarta Sans`).

### Database & ORM
- **Prisma ORM (`@prisma/client` 7.10.1):** Type-safe database client and schema modeling for PostgreSQL.

---

## 6. Project Architecture & Directory Structure

Ragadhni follows a modular, feature-oriented Next.js App Router architecture:

```
Ragadhni/
├── .env.example                      # Template for environment variables and secrets
├── .gitignore                        # Git exclusion rules (node_modules, .next, .env)
├── next.config.ts                    # Next.js configuration (Unsplash image domain permissions)
├── package.json                      # Dependencies and npm script definitions
├── package-lock.json                 # Pinned dependency tree
├── postcss.config.mjs                # PostCSS configuration for Tailwind and Autoprefixer
├── tailwind.config.ts                # Heritage color tokens, fonts, and shadow configurations
├── tsconfig.json                     # TypeScript compiler settings and path aliases (@/*)
├── prisma/
│   └── schema.prisma                 # Complete PostgreSQL schema (Users, Products, Orders, etc.)
└── src/
    ├── app/                          # Next.js App Router routes and pages
    │   ├── layout.tsx                # Master root layout (Fonts, SEO, Header, Footer)
    │   ├── page.tsx                  # Editorial Homepage (Hero, Curations, Fresh Drops)
    │   ├── collections/
    │   │   └── [slug]/
    │   │       └── page.tsx          # Curated thematic drops (ethnic-wear, casual-wear, etc.)
    │   ├── men/
    │   │   ├── page.tsx              # Men's master catalog
    │   │   └── [category]/
    │   │       └── page.tsx          # Men's subcategories (kurtas, casual-shirts, sherwanis)
    │   ├── women/
    │   │   ├── page.tsx              # Women's master catalog
    │   │   └── [category]/
    │   │       └── page.tsx          # Women's subcategories (kurtis, sarees, anarkalis)
    │   └── product/
    │       └── [slug]/
    │           └── page.tsx          # Dynamic Product Detail Page (PDP)
    ├── components/
    │   ├── ui/                       # Reusable atomic UI primitives
    │   │   ├── Badge.tsx             # Textile, status, and discount badges
    │   │   ├── Button.tsx            # Multi-variant button with loading spinner
    │   │   └── Container.tsx         # Responsive max-width layout wrapper
    │   └── storefront/               # Storefront-specific feature components
    │       ├── catalog/
    │       │   ├── CategoryListingClient.tsx  # Interactive PLP state manager (filter/sort)
    │       │   ├── FilterSidebar.tsx          # Faceted filter sidebar and mobile drawer
    │       │   └── ProductGrid.tsx            # Catalog grid and empty state
    │       ├── footer/
    │       │   └── Footer.tsx                 # Trust signals, sitemap, and newsletter
    │       ├── header/
    │       │   ├── AnnouncementBar.tsx        # Rotating top promotional banner
    │       │   ├── Header.tsx                 # Sticky navigation, mega-menu, and search
    │       │   └── MobileDrawer.tsx           # Mobile slide-out accordion menu
    │       └── product/
    │           ├── ImageGallery.tsx           # Multi-angle photo viewer with zoom
    │           ├── PincodeChecker.tsx         # Indian 6-digit postal PIN code checker
    │           ├── ProductCard.tsx            # 4:5 vertical product card with quick-add
    │           ├── ProductDetailsClient.tsx   # PDP interactive size/color/cart actions
    │           └── SizeGuideModal.tsx         # Indian size guide modal with in/cm toggle
    ├── config/
    │   └── site.ts                   # Centralized brand constants, menus, and contact info
    ├── lib/
    │   ├── mockData.ts               # Sample Indian ethnic clothing catalog (10 items)
    │   └── utils.ts                  # Helper functions (cn, formatPrice for INR, slugify)
    ├── styles/
    │   └── globals.css               # Global CSS, canvas tokens, and custom scrollbar
    └── types/
        └── index.ts                  # TypeScript interfaces (Product, Variant, Cart, etc.)
```

---

## 7. Storefront Functionality

### Global Header & Navigation (`Header.tsx`)
- Pinned to the top of the viewport with a frosted glass backdrop (`backdrop-blur-md`).
- Letter-spaced serif brand wordmark ("RAGADHNI").
- Desktop mega-menu revealing two-column subcategories (Ethnic vs. Traditional Casuals) on hover.
- Expandable search drawer with autofocus input and clickable popular Indian ethnic keywords ("Chanderi Kurti", "Cotton Saree", "Nehru Jacket").
- Live counter badges for Customer Wishlist and Shopping Bag.

### Announcement Ticker (`AnnouncementBar.tsx`)
- Dark slim top bar cycling promotional announcements every 5 seconds.
- Uses modulo math (`(prev + 1) % length`) for infinite looping.
- Includes manual previous/next chevron buttons for accessibility.

### Mobile Navigation Drawer (`MobileDrawer.tsx`)
- Slide-out navigation drawer optimized for thumb-reach ergonomics.
- Collapsible accordions for Women's and Men's clothing categories.
- Direct links to My Account, Wishlist, and Shopping Bag with live counters.
- Dedicated customer care card with direct phone and WhatsApp support details.

### Reassurance Footer (`Footer.tsx`)
- 4-column trust strip emphasizing authentic handlooms, free shipping above ₹1,499, 7-day exchanges, and secure payments.
- 5-column sitemap covering brand philosophy, women's apparel, men's apparel, customer help, and legal policies.
- Interactive newsletter subscription with instant confirmation state.
- Supported Indian payment badges: UPI, RuPay, Netbanking, Visa, Mastercard, and Cash on Delivery.

---

## 8. Product Catalogue & Discovery System

The catalog engine provides complete product discovery across 35 statically pre-rendered routes:

### Implemented Catalog Routes

| Route | Purpose | Pre-rendered Path Count |
| :--- | :--- | :--- |
| `/` | Brand Homepage & Curations | 1 static page |
| `/women` | Women's Master Catalog | 1 static page |
| `/women/[category]` | Women's Subcategory PLPs | 8 dynamic paths (`kurtis`, `sarees`, `salwar-suits`, `lehengas-anarkalis`, `casual-dresses`, `tops-tunics`, `bottomwear`, `dupattas`) |
| `/men` | Men's Master Catalog | 1 static page |
| `/men/[category]` | Men's Subcategory PLPs | 6 dynamic paths (`kurtas`, `casual-shirts`, `traditional-casual`, `festive-wear`, `sherwanis`, `bottomwear`) |
| `/collections/[slug]` | Curated Thematic Drops | 5 dynamic paths (`ethnic-wear`, `casual-wear`, `new-arrivals`, `bestsellers`, `festive-wear`) |
| `/product/[slug]` | Individual Product Detail Pages | 10 dynamic paths (1 for each sample garment) |

### Faceted Filtering & Sorting Capabilities
- **Fabric Filter:** Multi-select checkboxes filtering by handloom fabrics (Chanderi Silk, Organic Mulmul Cotton, Raw Tussar Silk, Handspun Khadi, Georgette, Handloom Cotton).
- **Size Filter:** Multi-select chips filtering by size availability (`XS`, `S`, `M`, `L`, `XL`, `XXL`, `Free Size`).
- **Price Range Filter:** Radio filters for Under ₹2,000, ₹2,000 to ₹3,500, and Above ₹3,500.
- **Sorting Modes:**
  1. *Featured Curations* (default editorial ordering).
  2. *Newest Arrivals First* (flags `isNewArrival`).
  3. *Price: Low to High* (ascending INR price).
  4. *Price: High to Low* (descending INR price).
  5. *Highest Customer Rating* (descending rating stars).
- **Responsive Handling:** Desktop sticky sidebar (`lg:block`); mobile slide-over drawer triggered by a compact filter bar.

---

## 9. Product Detail Experience (PDP)

Every garment features an editorial Product Detail Page (`/product/[slug]`):

1. **Breadcrumb Navigation:** Structured hierarchy (`Home / Category / Subcategory / Title`).
2. **Multi-Angle Image Gallery:** 4:5 vertical portrait framing, thumbnail switcher, and smooth hover zoom.
3. **Price & Discount Engine:** Prominent INR price with crossed-out compare price and calculated discount percentage badge.
4. **Color Swatch Selector:** Visual color dots with selected shade label.
5. **Interactive Size Selector:** Size chips with low-stock alerts (*"Hurry! Only 3 left in size S"*).
6. **Indian Size Guide Modal:** Interactive popup showing Bust/Chest, Waist, Hip, Collar, and Length with an Inches/Centimeters toggle and tailoring ease guidance.
7. **Postal PIN Code Checker:** Validates 6-digit Indian PIN codes, calculates dynamic delivery dates (3-5 days), and confirms COD availability.
8. **Specifications Accordions:** Three structured drawers:
   - *Fabric & Craftsmanship Details* (weave type, embroidery work, fit cut).
   - *Wash & Fabric Care* (dry clean vs. cold wash instructions).
   - *Shipping & 7-Day Doorstep Exchange* (dispatch timelines, reverse pickup).
9. **Sticky Mobile Action Bar:** Pinned bottom bar on mobile screens showing price and a prominent "Add to Bag" button.
10. **Related Recommendations:** "You May Also Love" recommendations grid rendered at the bottom of the page.

---

## 10. Design System & UI Architecture

### Heritage Color Palette

The color system is defined in `tailwind.config.ts`:

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| `heritage-ivory` | `#FAF7F2` | Primary page canvas (raw silk neutral that reduces eye fatigue). |
| `heritage-cream` | `#F5EFEB` | Secondary card background and panel fills. |
| `heritage-sand` | `#EDE4D7` | Neutral borders, divider lines, and chip backgrounds. |
| `heritage-earth` | `#57534E` | Secondary body text, metadata, and fabric care instructions. |
| `heritage-charcoal` | `#1C1917` | High-contrast primary typography and headings. |
| `heritage-terracotta` | `#9E3D2B` | Signature Indian clay/sindoor accent for primary buttons and CTAs. |
| `heritage-rosewood` | `#B85D4A` | Hover state for terracotta buttons and interactive links. |
| `heritage-gold` | `#C2A673` | Antique Kansa gold for festive badges, ratings, and celebratory edits. |
| `heritage-maroon` | `#681D23` | Deep Jamun maroon for promotional discount badges and urgency alerts. |
| `heritage-emerald` | `#1B4332` | Royal jewel tone for verified purchase badges and success states. |

### Typography Scale

- **Headings (`font-serif`):** `Cormorant Garamond` (Google Fonts). Applied to brand wordmarks, section titles, product names, and editorial banners.
- **Interface & Body (`font-sans`):** `Plus Jakarta Sans` (Google Fonts). Applied to prices, button labels, filter chips, specifications, and navigation menus.

---

## 11. Database Architecture & Prisma

The database architecture is defined in `prisma/schema.prisma` using PostgreSQL. While the application currently uses mock data for the frontend prototype, the schema models the complete transactional life cycle of a production e-commerce business.

```mermaid
erDiagram
    User ||--o{ Address : has
    User ||--o{ Order : places
    User ||--o{ Wishlist : saves
    User ||--o{ Review : writes

    Category ||--o{ Product : contains
    Collection ||--o{ ProductCollection : groups
    Product ||--o{ ProductCollection : belongs_to
    Product ||--o{ ProductVariant : has
    Product ||--o{ ProductImage : has
    Product ||--o{ Review : receives

    ProductVariant ||--o{ OrderItem : included_in

    Order ||--o{ OrderItem : contains
    Order ||--|| Payment : has
    Order ||--|| Shipment : has
```

### Core Database Models

1. **User:** Customers, warehouse staff, and store administrators with Role-Based Access Control (`Role: CUSTOMER | STAFF | ADMIN`).
2. **Address:** Indian delivery addresses storing recipient name, phone, street address, landmark, city, state, and 6-digit postal PIN code.
3. **Category:** High-level apparel categories (`Gender: WOMEN | MEN | UNISEX`) with display ordering.
4. **Collection:** Curated thematic drops (e.g., "The Royal Chanderi Edit").
5. **Product:** Core garment record holding title, slug, fabric composition, weave technique, embroidery work, fit cut, wash care, and base price.
6. **ProductVariant:** Specific size (`XS` to `XXL`), color, SKU code, and exact inventory stock quantity to prevent overselling.
7. **ProductImage:** Image URLs, alt text for accessibility/SEO, display ordering, and primary cover flags.
8. **Order & OrderItem:** Customer purchase snapshots recording order numbers, item quantities, prices, discounts, shipping fees, and Indian delivery addresses.
9. **Payment:** Transaction verification records storing gateway order IDs, payment IDs, and cryptographic signatures (`PaymentStatus: PENDING | PAID | FAILED | REFUNDED`).
10. **Shipment:** Courier tracking records holding AWB numbers, courier partner names, tracking URLs, and delivery milestones (`ShipmentStatus: MANIFESTED | IN_TRANSIT | OUT_FOR_DELIVERY | DELIVERED`).
11. **WishlistItem:** Customer bookmarked garments.
12. **Review:** Verified customer star ratings (1 to 5) and written feedback.

---

## 12. Installation and Setup

### Prerequisites
- **Node.js:** v20.x or higher (tested on Node.js v26.12.1).
- **npm:** v10.x or higher (tested on npm v11.20.0).
- **Git:** Installed and configured.

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Ragadhni.git
   cd Ragadhni
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Set up local environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the storefront.

---

## 13. Environment Configuration

All environment configuration is templated in [`.env.example`](file:///Users/dhruvjagtap269/Ragadhni/.env.example). Never commit real credentials or secret keys to version control.

### Variable Reference

| Variable Name | Exposure | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Browser / Public | Canonical base URL of the website (`http://localhost:3000` in development). |
| `NEXTAUTH_URL` | Server Only | Base URL used by NextAuth to handle authentication callbacks. |
| `NEXTAUTH_SECRET` | Server Only | Secret key used to encrypt customer session tokens and cookies. |
| `DATABASE_URL` | Server Only | PostgreSQL connection string (`postgresql://user:pass@host:5432/db?schema=public`). |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Browser / Public | Razorpay Key ID used by the client to open the UPI/Card payment modal. |
| `RAZORPAY_KEY_SECRET` | Server Only | Secret key used on the server to verify payment signatures. |
| `RAZORPAY_WEBHOOK_SECRET` | Server Only | Secret key to verify incoming payment webhook events from Razorpay. |
| `SHIPROCKET_API_EMAIL` | Server Only | Account email for Shiprocket logistics API integration. |
| `SHIPROCKET_API_PASSWORD` | Server Only | Account password for Shiprocket logistics API integration. |
| `SHIPROCKET_WEBHOOK_TOKEN` | Server Only | Secret token to authenticate courier tracking webhooks. |
| `CLOUDINARY_CLOUD_NAME` | Server Only | Cloudinary cloud name for media hosting. |
| `CLOUDINARY_API_KEY` | Server Only | Cloudinary API access key. |
| `CLOUDINARY_API_SECRET` | Server Only | Cloudinary API secret key. |

> **Note on Security:** Variables prefixed with `NEXT_PUBLIC_` are bundled into client-side JavaScript and are visible to users. All other variables are strictly kept on the server and are inaccessible from the browser.

---

## 14. Development and Production Commands

All scripts are defined in [`package.json`](file:///Users/dhruvjagtap269/Ragadhni/package.json):

```bash
# Start local development server with hot-reloading
npm run dev

# Compile TypeScript and build the optimized production application (pre-renders 35 static routes)
npm run build

# Start the compiled production server
npm run start

# Run Next.js ESLint checks
npm run lint
```

### Production Build Verification

Running `npm run build` performs full TypeScript validation, CSS compilation, and static pre-rendering:

```
Route (app)                                                Size  First Load JS
┌ ○ /                                                   2.06 kB         123 kB
├ ○ /_not-found                                           992 B         104 kB
├ ● /collections/[slug]                                   127 B         127 kB (5 paths)
├ ○ /men                                                  130 B         127 kB
├ ● /men/[category]                                       130 B         127 kB (6 paths)
├ ● /product/[slug]                                     5.69 kB         129 kB (10 paths)
├ ○ /women                                                130 B         127 kB
└ ● /women/[category]                                     130 B         127 kB (8 paths)
+ First Load JS shared by all                            103 kB
○ (Static) prerendered as static content
● (SSG)    prerendered as static HTML (35/35 pages generated successfully)
```

---

## 15. Upcoming Development Phases

The roadmap focuses on building the full direct-to-consumer shopping experience:

### Phase 3: Shopping Bag, Cart Drawer & Wishlist (Next Up)
- **Persistent Cart State:** Client-side cart state provider synchronizing items with `localStorage`.
- **Slide-Over Shopping Cart Drawer:** Animated right-hand drawer that glides in upon clicking "Add to Bag" without navigating away from the catalog.
- **Dynamic Free Shipping Progress Bar:** Live calculation indicating remaining amount needed to unlock free shipping (e.g. *"Add ₹300 more to get FREE Delivery across India"*).
- **Dedicated Wishlist Experience:** Dedicated `/wishlist` route and slide-over drawer allowing shoppers to review saved items and move them directly into their shopping bag.
- **Quantity & Size Adjustments:** In-drawer quantity updates (`+` / `-`) and size switches.

### Phase 4: Indian Checkout, Address Management & Razorpay Sandbox
- Multi-step checkout flow (Contact Information, Indian Delivery Address, Shipping Method, Payment).
- Address form with auto-completion of City and State from 6-digit Indian PIN codes.
- Razorpay sandbox payment integration supporting UPI (Google Pay, PhonePe, Paytm), RuPay, Netbanking, and Credit/Debit cards.
- Native Cash on Delivery (COD) confirmation flow with automated fraud-prevention checks.
- Order confirmation receipt with printable invoice summary.

### Phase 5: Staff Admin Dashboard & Inventory Management
- Administrative dashboard under `/admin` with Role-Based Access Control (RBAC).
- Product catalog manager: Multi-attribute variant generator (auto-creating XS to XXL SKU combinations).
- Inventory stock health dashboard with low-stock alerts for festive sizes.
- Order fulfillment queue: Updating order milestones (`CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED`).

### Phase 6: Brand Story, Customer Help Center & Policies
- "Our Heritage & Craftsmanship" brand story page (`/about`).
- Transparent D2C policy suite: Shipping & Delivery Timeline, 7-Day Exchange & Returns Policy, and Privacy Terms.
- Customer support contact center with WhatsApp direct chat assistance toggle.

### Phase 7: Performance Hardening & Production Launch Verification
- Core Web Vitals optimization targeting 90+ Lighthouse performance scores on mobile.
- Structured JSON-LD Schema markup for Google Merchant Center product listings.
- End-to-end checkout flow testing and API rate limiting.

---

## 16. Contribution Guidelines

Ragadhni is a proprietary commercial project. For team members and authorized contributors, please adhere to the following workflow:

1. **Branching Strategy:** Create descriptive feature branches from `main` (e.g., `feature/cart-drawer`, `fix/size-guide-modal`).
2. **Code Commenting Standard:** Maintain educational, beginner-friendly comments on every meaningful logical chunk of code. Teach *what* it does, *why* it exists, *how* it works, and *how it connects* to the rest of the project.
3. **Type Safety:** Ensure strict TypeScript compliance. Never bypass type errors with `any`.
4. **Pre-Submission Check:** Run `npm run build` locally before opening pull requests to confirm 0 compilation errors across all static routes.

---

## 17. License

**Proprietary / Commercial**  
Copyright &copy; 2026 Ragadhni Lifestyle Private Limited. All rights reserved.

Unauthorized copying, distribution, modification, or public hosting of this software via any medium is strictly prohibited.

