/**
 * ==============================================================================
 * Ragadhni — Responsive Page Container (`src/components/ui/Container.tsx`)
 * ==============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component is a layout wrapper that:
 * 1. Sets a maximum width on large computer screens so content doesn't stretch infinitely.
 * 2. Centers the content horizontally (`mx-auto`).
 * 3. Adds responsive horizontal padding (`px-4` on mobile, `px-6` on tablets, `px-8` on desktops)
 *    so text and images never collide with screen edges.
 *
 * WHY IT EXISTS:
 * Beginners often forget to add horizontal padding or max-widths, causing their website to look
 * broken or awkwardly stretched on wide monitors and cramped on mobile phones.
 * Wrapping sections in `<Container>` guarantees consistent, professional alignment everywhere.
 *
 * HOW IT CONNECTS TO THE REST OF THE PROJECT:
 * - Used throughout `src/app/page.tsx` around hero banners, product grids, and craft stories.
 * - Used in `Header.tsx` and `Footer.tsx` to align the header and footer with the page content.
 */

import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  // Content rendered inside the container
  children: React.ReactNode;
  // Size preset: "default" (standard 7xl), "narrow" (editorial articles), or "wide" (lookbooks)
  size?: "default" | "narrow" | "wide";
}

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        // Centers the block and provides responsive horizontal padding
        "mx-auto px-4 sm:px-6 lg:px-8",
        // Narrow: max 896px width (ideal for text-heavy editorial stories and policy pages)
        size === "narrow" && "max-w-4xl",
        // Default: max 1280px width (standard e-commerce catalog width)
        size === "default" && "max-w-7xl",
        // Wide: max 1400px width (for expansive festive galleries)
        size === "wide" && "max-w-[1400px]",
        // Merge with any custom classes passed from the caller
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
