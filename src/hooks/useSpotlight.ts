"use client";

import { useEffect, useRef } from "react";

/**
 * When hovering/focusing one card in a group, the siblings dim slightly
 * (opacity .55 + a hair of blur). Mirrors the original `[data-spotlight]`
 * behaviour for both mouse and keyboard, across any child marked
 * `data-spot-item`.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const group = ref.current;
    if (!group) return;

    const items = Array.from(group.querySelectorAll<HTMLElement>("[data-spot-item]"));
    items.forEach((it) => {
      it.style.transition =
        (it.style.transition ? it.style.transition + ", " : "") + "opacity .3s ease, filter .3s ease";
    });

    const focusOne = (active: HTMLElement) => {
      items.forEach((it) => {
        if (it === active) {
          it.style.opacity = "1";
          it.style.filter = "none";
        } else {
          it.style.opacity = "0.55";
          it.style.filter = "blur(0.5px)";
        }
      });
    };
    const reset = () => {
      items.forEach((it) => {
        it.style.opacity = "1";
        it.style.filter = "none";
      });
    };

    const cleanups: Array<() => void> = [];
    items.forEach((it) => {
      const enter = () => focusOne(it);
      const focusIn = () => focusOne(it);
      it.addEventListener("mouseenter", enter);
      it.addEventListener("focusin", focusIn);
      cleanups.push(() => {
        it.removeEventListener("mouseenter", enter);
        it.removeEventListener("focusin", focusIn);
      });
    });

    const onLeave = () => reset();
    const onFocusOut = (e: FocusEvent) => {
      if (!group.contains(e.relatedTarget as Node)) reset();
    };
    group.addEventListener("mouseleave", onLeave);
    group.addEventListener("focusout", onFocusOut);

    return () => {
      cleanups.forEach((fn) => fn());
      group.removeEventListener("mouseleave", onLeave);
      group.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return ref;
}
