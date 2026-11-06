/**
 * ==============================================================================
 * Ragadhni — Universal Reusable Button (`src/components/ui/Button.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component provides a standardized, accessible button for the entire website.
 * It supports multiple brand styles (Terracotta Primary, Khadi Sand Secondary,
 * Charcoal Outline, Antique Gold, and Underlined Editorial Link), multiple sizes,
 * and built-in loading spinner states.
 *
 * WHY IT EXISTS:
 * Beginners often copy-paste `<button className="...">` styles across 20 different pages.
 * If you ever need to change button padding, rounded corners, or hover animations,
 * you would have to edit 20 separate files.
 * With this reusable component, every button on Ragadhni behaves consistently and looks
 * on-brand with a single line: `<Button variant="primary">Add to Bag</Button>`.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Used on the homepage (`page.tsx`) for hero CTA links ("Explore Women's Edit").
 * - Used inside `ProductCard.tsx` and cart drawers for "Add to Bag" and checkout actions.
 * - Uses `cn()` from `src/lib/utils.ts` to merge custom classes without styling conflicts.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * `buttonVariants`:
 * Configured using `cva` (Class Variance Authority).
 * Instead of writing messy `if/else` checks, `cva` lets you define:
 * 1. Base styles applied to EVERY button (focus outlines, transition timing, disabled opacity).
 * 2. Visual variants (`primary`, `secondary`, `outline`, `editorial`, `gold`, `ghost`).
 * 3. Size variants (`sm`, `md`, `lg`, `icon`).
 */
const buttonVariants = cva(
  // Base classes applied to all buttons regardless of variant:
  "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-terracotta focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      // Visual style options
      variant: {
        // Primary: Signature Terracotta with Ivory text (Hero CTAs, Add to Bag, Checkout)
        primary:
          "bg-heritage-terracotta text-heritage-ivory hover:bg-heritage-rosewood shadow-sm hover:shadow",
        // Secondary: Khadi Sand background with subtle border (filters, secondary actions)
        secondary:
          "bg-heritage-sand text-heritage-charcoal hover:bg-heritage-cream border border-[#DFD5C6]",
        // Outline: Clean Charcoal border with transparent background
        outline:
          "border border-heritage-charcoal text-heritage-charcoal bg-transparent hover:bg-heritage-charcoal hover:text-heritage-ivory",
        // Ghost: No background or border until hovered (icon buttons, close buttons)
        ghost:
          "text-heritage-charcoal hover:bg-heritage-sand/50 bg-transparent",
        // Gold: Antique Kansa Gold for festive and celebratory collections
        gold:
          "bg-heritage-gold text-heritage-charcoal hover:bg-heritage-gold-light shadow-sm",
        // Editorial: Minimalist underlined fashion link (e.g. "Read the Ragadhni Craft Journey ->")
        editorial:
          "border-b border-heritage-charcoal text-heritage-charcoal pb-0.5 hover:border-heritage-terracotta hover:text-heritage-terracotta transition-colors bg-transparent rounded-none px-0",
      },

      // Size options
      size: {
        sm: "text-xs px-3.5 py-1.5 tracking-wider uppercase",
        md: "text-sm px-6 py-2.5 tracking-wide",
        lg: "text-base px-8 py-3.5 tracking-wide",
        icon: "h-10 w-10 p-2",
      },
    },

    // Default configuration if no props are specified
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * ButtonProps Interface:
 * Extends standard HTML button attributes (like `onClick`, `type`, `disabled`)
 * and includes our custom variants (`variant`, `size`) plus an `isLoading` boolean.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // When true, displays an animated loading spinner and disables clicks
  isLoading?: boolean;
}

/**
 * The Button Component:
 * Uses `React.forwardRef` so parent components can access the native DOM button
 * (required for keyboard focus management and libraries like Headless UI / Radix).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        // Button is disabled either if `disabled={true}` or if an async action `isLoading={true}`
        disabled={disabled || isLoading}
        // Merge cva styles with any additional className passed by the caller
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {/*
         * Conditional Rendering:
         * If `isLoading` is true, render a spinning SVG circle and "Please wait..."
         * Otherwise, render the normal button text/children.
         */}
        {isLoading ? (
          <span className="flex items-center space-x-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span>Please wait...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

// Helpful displayName for React Developer Tools debugging
Button.displayName = "Button";
