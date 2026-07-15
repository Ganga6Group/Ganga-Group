"use client";

import { cn } from "@/utils/cn";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Animated count-up number. Starts from 0 and eases to `value` (+ optional
 * suffix) the first time it scrolls into view.
 */
export function Counter({
  value,
  suffix,
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const { ref, display } = useCountUp<HTMLSpanElement>({ target: value, suffix });
  return (
    <span ref={ref} className={cn("font-grotesk font-bold text-text", className)}>
      {display}
    </span>
  );
}
