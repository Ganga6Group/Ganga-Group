"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors the original `heavyOK` gate: the pointer-driven effects
 * (particles, cursor glow, 3D tilt, magnetic buttons) only run on
 * devices that can meaningfully use them — i.e. not reduced-motion,
 * not touch-only, and not a small viewport.
 *
 * Returns `false` during SSR / first paint so nothing mismatches on hydration.
 */
export function useHeavyEffects(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    const small = window.innerWidth < 760;
    setEnabled(!reduce && !noHover && !small);
  }, []);

  return enabled;
}
