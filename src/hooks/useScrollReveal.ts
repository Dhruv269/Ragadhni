/**
 * ==============================================================================
 * Ragadhni — Viewport Scroll Reveal Hook (`src/hooks/useScrollReveal.ts`)
 * ==============================================================================
 *
 * WHAT THIS HOOK DOES:
 * Provides an efficient, performant IntersectionObserver-based viewport detection
 * mechanism for triggering scroll-reveal animations across the storefront.
 *
 * DESIGN PHILOSOPHY:
 * - Heritage Luxe × Indian Editorial motion language: smooth, subtle, and cinematic.
 * - Single-trigger by default (`once: true`) to avoid visual fatigue and re-trigger distraction.
 * - Zero continuous scroll event listeners: relies solely on native browser IntersectionObserver.
 * - 100% Accessible: strictly respects `prefers-reduced-motion: reduce` by immediately
 *   rendering elements in their visible, untransformed state.
 */

"use client";

import { useEffect, useRef, useState } from "react";

export interface UseScrollRevealOptions {
  /**
   * Proportion of the element that must be visible before triggering (0.0 to 1.0).
   * Default: 0.12 (triggers smoothly when ~12% of element enters viewport).
   */
  threshold?: number;

  /**
   * Margin around the root viewport. Negative bottom margin prevents premature triggers.
   * Default: "0px 0px -40px 0px".
   */
  rootMargin?: string;

  /**
   * If true, observer stops tracking after the first intersection.
   * Default: true.
   */
  once?: boolean;

  /**
   * If true, animation is bypassed and element becomes immediately visible.
   */
  disabled?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.12,
    rootMargin = "0px 0px -40px 0px",
    once = true,
    disabled = false,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Accessibility Check: prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setHasReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches);
      if (e.matches) {
        setIsVisible(true);
      }
    };

    mediaQuery.addEventListener("change", handleMotionPreferenceChange);

    // 2. Disabled override
    if (disabled) {
      setIsVisible(true);
      return () => {
        mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      };
    }

    // 3. Fallback for environments without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return () => {
        mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      };
    }

    const currentElement = elementRef.current;
    if (!currentElement) {
      return () => {
        mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      };
    }

    // 4. Native IntersectionObserver with single-trigger optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
              observer.disconnect();
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [threshold, rootMargin, once, disabled]);

  return {
    ref: elementRef,
    isVisible: hasReducedMotion || disabled ? true : isVisible,
    hasReducedMotion,
  };
}

