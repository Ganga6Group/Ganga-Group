import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Rounded mono "pill" used for the About keyword tags and the product
 * status badges. Colour/border/background are overridable via className.
 */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-border bg-glass px-[13px] py-[8px] font-mono text-[11.5px] uppercase tracking-[0.1em] text-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}
