import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "@/components/common/Reveal";

/**
 * The mono uppercase eyebrow that opens most sections. Reveals on scroll like
 * the original `[data-reveal]` label; colour defaults to accent.
 */
export function SectionLabel({
  children,
  className,
  color = "accent",
}: {
  children: ReactNode;
  className?: string;
  color?: "accent" | "green";
}) {
  return (
    <Reveal
      as="div"
      className={cn(
        "mb-[18px] font-mono text-[12px] uppercase tracking-[0.18em]",
        color === "accent" ? "text-accent" : "text-green",
        className,
      )}
    >
      {children}
    </Reveal>
  );
}
