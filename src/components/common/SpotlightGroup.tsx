"use client";

import type { ReactNode } from "react";
import { useSpotlight } from "@/hooks/useSpotlight";

/**
 * Wraps a group of cards so that hovering/focusing one dims the others.
 * Any descendant marked `data-spot-item` participates.
 */
export function SpotlightGroup({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useSpotlight<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
