"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic pull toward the cursor plus a one-shot "shine" sweep on enter,
 * matching the original `[data-magnetic]` / `[data-shine]` behaviour.
 * The shine element is found via the `data-shine` attribute inside the target.
 */
export function useMagnetic<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    el.style.transition = "transform .18s ease";

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.16;
      const y = (e.clientY - r.top - r.height / 2) * 0.2;
      el.style.transform = "translate(" + x + "px," + y + "px)";
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
    };
    const onDown = () => {
      el.style.transform += " scale(0.96)";
    };
    const onUp = () => {
      el.style.transform = el.style.transform.replace(" scale(0.96)", "");
    };

    const shine = el.querySelector<HTMLElement>("[data-shine]");
    const onEnter = () => {
      if (!shine) return;
      shine.style.transition = "none";
      shine.style.transform = "translateX(-140%) skewX(-18deg)";
      requestAnimationFrame(() => {
        shine.style.transition = "transform .7s ease";
        shine.style.transform = "translateX(320%) skewX(-18deg)";
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mouseenter", onEnter);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mouseenter", onEnter);
      el.style.transform = "";
    };
  }, [enabled]);

  return ref;
}
