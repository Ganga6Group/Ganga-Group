"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Thin gradient bar pinned to the top of the viewport that tracks overall
 * scroll progress. `scaleX` from 0→1 (origin left) is visually identical to
 * the original width-percentage bar, and stays perfectly linear with scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed left-0 right-0 top-0 z-[120] h-[2px] bg-transparent">
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-[linear-gradient(90deg,var(--accent),var(--accent-light))] shadow-[0_0_6px_var(--accent)]"
      />
    </div>
  );
}
