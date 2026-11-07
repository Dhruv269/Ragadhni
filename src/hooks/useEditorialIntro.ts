/**
 * ==============================================================================
 * Ragadhni — Cinematic Editorial Loading Introduction Hook
 * (`src/hooks/useEditorialIntro.ts`)
 * ==============================================================================
 *
 * WHAT THIS HOOK DOES:
 * Orchestrates the multi-stage, art-directed opening sequence for Ragadhni:
 * 1. Coordinates 5 cinematic stages:
 *    - `atmospheric`: Deep emerald canvas, subtle handmade grain, ambient lighting (0.0 - 0.5s)
 *    - `entrance`: Independent entrance of organic terracotta & secondary emerald ribbons,
 *      alongside geometric architectural arch structures (0.5 - 1.3s)
 *    - `evolution`: Shapes overlap, intersect, and lock into an asymmetrical editorial balance (1.3 - 2.2s)
 *    - `brandReveal`: Off-centre RAGADHNI editorial wordmark reveals via clip-mask (2.2 - 3.0s)
 *    - `transition`: Dynamic expansion and aperture wipe smoothly revealing the homepage (3.0 - 3.8s)
 *    - `completed`: Unmounts overlay and restores normal viewport interaction (3.8s+)
 * 2. Enforces single-session persistence via `sessionStorage` (`ragadhni_editorial_intro_seen`)
 * 3. Enforces route restriction (only runs on the homepage `/`)
 * 4. Respects `prefers-reduced-motion` for accessibility (bypasses intro immediately)
 * 5. Provides accessible `skipIntro()` callback and 4.2s safety fallback
 */

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

export type EditorialIntroStage =
  | "atmospheric"
  | "entrance"
  | "evolution"
  | "brandReveal"
  | "transition"
  | "completed";

const SESSION_STORAGE_KEY = "ragadhni_editorial_intro_seen";

export function useEditorialIntro() {
  const pathname = usePathname();
  const [stage, setStage] = useState<EditorialIntroStage>("atmospheric");
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Safely mark intro as completed and clean up DOM attributes
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    } catch {
      // Gracefully handle storage quota or private-browsing restrictions
    }
    if (typeof document !== "undefined") {
      document.documentElement.removeAttribute("data-intro");
    }
    setStage("completed");
    setIsVisible(false);
  }, []);

  // Skip button handler for instant dismissal
  const skipIntro = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    finishIntro();
  }, [finishIntro]);

  useEffect(() => {
    // 1. Only execute on the storefront homepage ('/' or empty)
    const isHomePage = pathname === "/" || pathname === "";
    if (!isHomePage) {
      finishIntro();
      return;
    }

    // 2. Check if visitor has already experienced the intro in this browser session
    try {
      const alreadySeen = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (alreadySeen) {
        finishIntro();
        return;
      }
    } catch {
      finishIntro();
      return;
    }

    // 3. Accessibility: Respect prefers-reduced-motion immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finishIntro();
      return;
    }

    // Ensure data-intro="active" is set on <html>
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-intro", "active");
    }

    // 4. Choreographed Staged Timeline (Target: ~3.6s total)
    // Stage 1 (0ms): 'atmospheric' already active
    // Stage 2 (500ms): Organic & geometric elements enter
    const t1 = setTimeout(() => {
      setStage("entrance");
    }, 500);

    // Stage 3 (1300ms): Elements overlap, intersect and evolve into cohesive artwork
    const t2 = setTimeout(() => {
      setStage("evolution");
    }, 1300);

    // Stage 4 (2200ms): Editorial RAGADHNI brand name reveals
    const t3 = setTimeout(() => {
      setStage("brandReveal");
    }, 2200);

    // Stage 5 (3050ms): Expansion and aperture reveal into the homepage
    const t4 = setTimeout(() => {
      setStage("transition");
    }, 3050);

    // Stage 6 (3800ms): Intro completes, unmounts
    const t5 = setTimeout(() => {
      finishIntro();
    }, 3800);

    // Hard safety timeout (4200ms) to ensure users are never blocked
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 4200);

    timersRef.current = [t1, t2, t3, t4, t5, safetyTimer];

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [pathname, finishIntro]);

  return {
    stage,
    isVisible,
    skipIntro,
  };
}

