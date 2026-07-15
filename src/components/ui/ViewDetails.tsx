import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * The "View details →" affordance at the bottom of every product card.
 * `size` toggles between the larger live-card treatment and the smaller
 * grid-card one; `color` switches accent vs violet.
 */
export function ViewDetails({
  size = "sm",
  color = "accent",
}: {
  size?: "sm" | "lg";
  color?: "accent" | "violet";
}) {
  const lg = size === "lg";
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold",
        lg ? "gap-[8px] text-[15px]" : "gap-[7px] text-[14px]",
        color === "accent" ? "text-accent" : "text-violet",
      )}
    >
      View details
      <ArrowRight size={lg ? 15 : 14} strokeWidth={2} />
    </span>
  );
}
