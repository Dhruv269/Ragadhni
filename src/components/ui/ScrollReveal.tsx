/**
 * ==============================================================================
 * Ragadhni — Reusable Scroll Reveal Component (`src/components/ui/ScrollReveal.tsx`)
 * ==============================================================================
 *
 * WHAT THIS COMPONENT DOES:
 * Wraps any React element or component in a refined, cinematic scroll-reveal
 * animation. Designed specifically for Ragadhni's "Heritage Luxe × Indian Editorial"
 * aesthetic.
 *
 * SUPPORTED VARIANTS:
 * 1. "fade-up" (Default):
 *    Subtle vertical lift (28px) and smooth fade-in. Ideal for headings, paragraphs,
 *    product grids, and trust signals.
 * 2. "fade-in":
 *    Pure opacity transition without vertical shift. Ideal for backgrounds and
 *    large banners.
 * 3. "image-reveal":
 *    Subtle scale deceleration (scale 1.04 -> 1.00) with opacity fade. Ideal for
 *    large editorial portraits and feature photography.
 *
 * PERFORMANCE & ACCESSIBILITY:
 * - Uses native IntersectionObserver via `useScrollReveal`.
 * - Animates strictly GPU-composited properties (`transform` and `opacity`).
 * - Manages `will-change` lifecycle to avoid GPU memory leaks on mobile devices.
 * - 100% Accessible: strictly honors `prefers-reduced-motion: reduce` with instant rendering.
 */

"use client";

import React, { ElementType, HTMLAttributes, useState } from "react";
import { useScrollReveal, UseScrollRevealOptions } from "@/hooks/useScrollReveal";

export type ScrollRevealVariant = "fade-up" | "fade-in" | "image-reveal";

export interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  /**
   * The animation preset style.
   * Default: "fade-up".
   */
  variant?: ScrollRevealVariant;

  /**
   * Animation duration in milliseconds.
   * Default: 700ms (fade-up), 800ms (fade-in), 900ms (image-reveal).
   */
  duration?: number;

  /**
   * Delay in milliseconds before starting the entrance animation.
   * Default: 0ms.
   */
  delay?: number;

  /**
   * Zero-based index for staggered lists (e.g., in a 4-card or 6-card grid).
   * Automatically multiplies by `staggerStep` to set `delay`.
   */
  staggerIndex?: number;

  /**
   * Step delay per stagger index in milliseconds.
   * Default: 90ms.
   */
  staggerStep?: number;

  /**
   * Vertical displacement in pixels for "fade-up".
   * Default: 28px.
   */
  distance?: number;

  /**
   * HTML tag or React component to render as.
   * Default: "div".
   */
  as?: ElementType;

  /**
   * Threshold for IntersectionObserver triggering (0.0 to 1.0).
   * Default: 0.12.
   */
  threshold?: number;

  /**
   * Viewport root margin for triggering.
   * Default: "0px 0px -40px 0px".
   */
  rootMargin?: string;

  /**
   * If true, animation triggers only once when entering viewport.
   * Default: true.
   */
  once?: boolean;

  /**
   * If true, bypasses animation and renders visible immediately.
   */
  disabled?: boolean;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  duration,
  delay: explicitDelay,
  staggerIndex,
  staggerStep = 90,
  distance = 28,
  as: Component = "div",
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
  once = true,
  disabled = false,
  className = "",
  style,
  ...restProps
}: ScrollRevealProps) {
  const { ref, isVisible, hasReducedMotion } = useScrollReveal({
    threshold,
    rootMargin,
    once,
    disabled,
  });

  const [transitionDone, setTransitionDone] = useState(false);

  // Compute effective delay from explicit delay or staggerIndex
  const calculatedDelay =
    explicitDelay !== undefined
      ? explicitDelay
      : staggerIndex !== undefined
      ? staggerIndex * staggerStep
      : 0;

  // Variant default durations
  const effectiveDuration =
    duration !== undefined
      ? duration
      : variant === "image-reveal"
      ? 900
      : variant === "fade-in"
      ? 800
      : 700;

  // Easing curve: Custom luxury editorial deceleration
  const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

  // If user prefers reduced motion or animation is disabled, render static visible state
  if (hasReducedMotion || disabled) {
    return (
      <Component
        ref={ref}
        className={className}
        style={{
          opacity: 1,
          transform: "none",
          ...style,
        }}
        {...restProps}
      >
        {children}
      </Component>
    );
  }

  // Initial (unrevealed) transform values based on variant
  let initialTransform = "none";
  let activeTransform = "none";

  if (variant === "fade-up") {
    initialTransform = `translate3d(0, ${distance}px, 0)`;
    activeTransform = "translate3d(0, 0, 0)";
  } else if (variant === "image-reveal") {
    initialTransform = "scale(1.045)";
    activeTransform = "scale(1)";
  }

  // Compute inline transition styles
  const animationStyles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? activeTransform : initialTransform,
    transitionProperty: variant === "fade-in" ? "opacity" : "opacity, transform",
    transitionDuration: `${effectiveDuration}ms`,
    transitionTimingFunction: easing,
    transitionDelay: isVisible ? `${calculatedDelay}ms` : "0ms",
    // Only apply will-change while active transition is ongoing to preserve mobile GPU memory
    willChange: !transitionDone && !hasReducedMotion ? "opacity, transform" : "auto",
    ...style,
  };

  return (
    <Component
      ref={ref}
      className={`scroll-reveal-container ${className}`}
      style={animationStyles}
      onTransitionEnd={(e: React.TransitionEvent) => {
        // Clear will-change once transition finishes
        if (e.target === e.currentTarget && isVisible) {
          setTransitionDone(true);
        }
      }}
      {...restProps}
    >
      {children}
    </Component>
  );
}

/**
 * ==============================================================================
 * StaggerContainer & StaggerItem Components:
 * Convenience wrappers for grid/flex lists where children sequentially cascade.
 * ==============================================================================
 */

export interface StaggerContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  children: React.ReactNode;
}

export function StaggerContainer({
  children,
  as: Component = "div",
  className = "",
  ...props
}: StaggerContainerProps) {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

export interface StaggerItemProps extends ScrollRevealProps {
  index: number;
}

export function StaggerItem({
  children,
  index,
  staggerStep = 90,
  variant = "fade-up",
  ...props
}: StaggerItemProps) {
  return (
    <ScrollReveal
      variant={variant}
      staggerIndex={index}
      staggerStep={staggerStep}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}

