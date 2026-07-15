"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useHeavyEffects } from "@/hooks/useHeavyEffects";

interface CursorGlowProps {
  /** The element the glow tracks the cursor within (the hero section). */
  containerRef: RefObject<HTMLElement | null>;
}

/**
 * Soft accent glow that eases toward the cursor while it's over the hero,
 * fading in on enter and out on leave. Same lerp factor (0.12) and 0.3
 * target opacity as the original.
 */
export function CursorGlow({ containerRef }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const enabled = useHeavyEffects();

  useEffect(() => {
    const glow = glowRef.current;
    const container = containerRef.current;
    if (!glow || !container || !enabled) return;

    let gx = 0;
    let gy = 0;
    let tx = 0;
    let ty = 0;
    let inside = false;
    let raf = 0;

    const loop = () => {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = "translate(" + gx + "px," + gy + "px)";
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!inside) {
        inside = true;
        glow.style.opacity = "0.3";
      }
    };
    const onLeave = () => {
      inside = false;
      glow.style.opacity = "0";
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, enabled]);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none absolute left-0 top-0 z-0 mt-[-230px] ml-[-230px] h-[460px] w-[460px] rounded-full opacity-0 blur-[40px] [background:radial-gradient(circle,var(--accent),transparent_62%)] [mix-blend-mode:screen]"
    />
  );
}
