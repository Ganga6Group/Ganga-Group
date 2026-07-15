"use client";

import type { ReactNode } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * In-page anchor that eases to its target section (nav links + logo).
 * Hover colour is handled with Tailwind so it rides the global colour
 * transition, exactly like the original.
 */
export function ScrollLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const smooth = useSmoothScroll();
  return (
    <a href={href} onClick={(e) => smooth(e, href)} className={className} {...rest}>
      {children}
    </a>
  );
}
