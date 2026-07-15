"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle 3D tilt following the cursor, identical to the original
 * `[data-tilt]` behaviour (±3.5deg, -2px lift, .2s ease). Only active
 * when `enabled` (the heavy-effects gate) is true.
 */
export function useTilt<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const prevTransition = el.style.transition;
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";
    el.style.transition = (prevTransition ? prevTransition + ", " : "") + "transform .2s ease";

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        "perspective(800px) rotateX(" +
        -py * 3.5 +
        "deg) rotateY(" +
        px * 3.5 +
        "deg) translateY(-2px)";
    };
    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
      el.style.transition = prevTransition;
    };
  }, [enabled]);

  return ref;
}
