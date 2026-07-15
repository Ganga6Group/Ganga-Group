"use client";

import { useCallback, type MouseEvent } from "react";
import { SCROLL_OFFSET } from "@/lib/data";

const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function scrollToY(targetY: number, duration = 720): void {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + diff * easeInOut(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Returns a click handler for in-page anchor links. Reproduces the original
 * eased scroll (720ms, cubic in-out) with a fixed 66px offset for the navbar.
 */
export function useSmoothScroll() {
  return useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    scrollToY(top);
  }, []);
}
