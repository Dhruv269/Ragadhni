/**
 * ==============================================================================
 * Ragadhni — Shared Utility Helpers (`src/lib/utils.ts`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This file contains reusable helper functions used across various frontend components.
 * Rather than repeating common logic (like formatting prices or combining CSS classes)
 * inside every file, we write it once here and import it wherever needed.
 *
 * WHY IT EXISTS:
 * Keeping helper functions in a single `lib` file prevents code duplication,
 * eliminates bugs, and ensures consistent behavior across the whole website.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - `cn()` is imported in almost every UI component (`Button.tsx`, `Badge.tsx`, `ProductCard.tsx`)
 *   to safely merge Tailwind CSS classes.
 * - `formatPrice()` is used in `ProductCard.tsx`, cart drawers, and checkout screens to display
 *   prices properly formatted with the Indian Rupee symbol (`₹`).
 * - `slugify()` helps convert product titles into clean, SEO-friendly website URLs.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` (Class Name merger):
 * Combines multiple conditional class names and resolves Tailwind CSS conflicts.
 *
 * HOW IT WORKS (STEP-BY-STEP):
 * 1. `clsx(inputs)`: Allows you to pass conditional classes (e.g., `isOpen && 'block'`).
 *    It filters out falsy values like `false`, `null`, or `undefined`.
 * 2. `twMerge(...)`: Solves class conflicts. For example, if a button default has `p-4`
 *    and a developer passes `p-6` to customize it, standard CSS might be confused about
 *    which padding wins. `twMerge` recognizes they are both padding utilities and ensures
 *    the override (`p-6`) cleanly replaces `p-4`.
 *
 * @example
 * cn("text-sm text-heritage-earth", isSelected && "font-bold text-heritage-terracotta")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * `formatPrice`:
 * Converts any numeric price into the authentic Indian Rupee format (e.g. ₹1,499).
 *
 * WHY THIS IS IMPORTANT FOR RAGADHNI:
 * The Indian numbering system groups thousands, lakhs, and crores differently
 * from Western numbering (e.g., ₹1,50,000 instead of ₹150,000).
 * JavaScript's built-in `Intl.NumberFormat("en-IN")` ensures correct Indian comma placement.
 *
 * @param price - The price as a number (e.g., 1899) or string (e.g., "1899")
 * @returns Formatted price string with the ₹ symbol (e.g., "₹1,899")
 */
export function formatPrice(price: number | string): string {
  // Convert string input to a float number if needed
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  // Safeguard: If the input cannot be parsed into a number, show safe fallback "₹0"
  if (isNaN(numericPrice)) return "₹0";

  // Use the official Indian locale ("en-IN") and Indian Rupee ("INR") currency code
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    // We omit decimal paise (.00) for a cleaner fashion editorial aesthetic
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

/**
 * `slugify`:
 * Converts human product titles into clean, web-safe URL strings.
 *
 * HOW IT WORKS:
 * 1. Converts all letters to lowercase.
 * 2. Removes unwanted punctuation, symbols, and special characters.
 * 3. Replaces spaces and underscores with clean hyphens (-).
 *
 * @example
 * slugify("Chanderi Silk Anarkali Set!") -> "chanderi-silk-anarkali-set"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters except spaces and hyphens
    .replace(/[\s_-]+/g, "-")  // Replace multiple spaces or underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim any hyphens from the start or end
}
