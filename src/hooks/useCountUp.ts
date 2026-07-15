"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  target: number;
  suffix?: string;
  /** Animation duration in ms (original: 1400). */
  duration?: number;
}

/**
 * Counts from 0 up to `target` once the element scrolls into view
 * (threshold 0.5), using the original easeOutCubic curve. Respects
 * reduced-motion by snapping straight to the final value.
 */
export function useCountUp<T extends HTMLElement>({
  target,
  suffix = "",
  duration = 1400,
}: UseCountUpOptions) {
  const ref = useRef<T>(null);
  const [display, setDisplay] = useState<string>("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          if (reduce) {
            setDisplay(target + suffix);
            return;
          }

          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * target) + suffix);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return { ref, display };
}
