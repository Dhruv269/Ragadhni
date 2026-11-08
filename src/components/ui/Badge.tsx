/**
 * ==============================================================================
 * Ragadhni — Reusable Textile & Status Badge (`src/components/ui/Badge.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders small, elegant tag chips (badges) used to highlight
 * fabric information (e.g., "Pure Chanderi Silk"), merchandising flags (e.g., "Bestseller"),
 * discounts, and navigation indicators (e.g., "Trending").
 *
 * WHY IT EXISTS:
 * Fashion websites rely heavily on textile tags to build customer trust.
 * This component standardizes badge padding, uppercase letter-spacing, and font sizing
 * so badges never look sloppy or misaligned across product grids and navigation menus.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Rendered in `ProductCard.tsx` on the top-left of clothing images.
 * - Rendered in `Header.tsx` and `MobileDrawer.tsx` next to menu links.
 * - Rendered in `page.tsx` on hero banners and festive highlights.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * `badgeVariants`:
 * Defines the base typography (small 10px font, letter-spaced uppercase)
 * and visual color combinations.
 */
const badgeVariants = cva(
  "inline-flex items-center text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 transition-colors select-none",
  {
    variants: {
      variant: {
        // Terracotta: High-contrast badge for "New Arrival" or primary alerts
        terracotta: "bg-editorial-terracotta text-editorial-ivory border border-editorial-terracotta-warm/30",
        // Gold: Celebratory antique gold for "Bestseller" and festive edits
        gold: "bg-editorial-gold/20 text-editorial-gold-deep border border-editorial-gold/40",
        // Emerald: Deep regal green for verified purchase reviews and in-stock badges
        emerald: "bg-editorial-emerald text-editorial-ivory border border-editorial-gold/25",
        // Neutral: Warm Ivory background for general category tags
        neutral: "bg-editorial-ivory text-editorial-charcoal border border-editorial-gold/30",
        // Outline: Translucent backdrop with delicate emerald border
        outline: "border border-editorial-emerald/40 text-editorial-emerald bg-editorial-ivory/80",
        // Discount: Signature Terracotta for promotional percentage tags
        discount: "bg-editorial-terracotta text-editorial-ivory font-semibold border border-editorial-terracotta-warm/40",
      },
    },

    // Default variant if none is specified
    defaultVariants: {
      variant: "neutral",
    },
  }
);

/**
 * BadgeProps Interface:
 * Extends standard HTML `<span>` attributes (like `id`, `title`, `onClick`)
 * and variant options from `cva`.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * The Badge Component:
 * Renders an inline `<span>` element styled with the chosen variant classes.
 */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
