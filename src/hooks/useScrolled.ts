"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has scrolled past `threshold` px.
 * Drives the navbar's condensed state (original toggles at y > 60).
 */
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled((window.scrollY || 0) > threshold);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
