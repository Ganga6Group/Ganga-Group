import { cn } from "@/utils/cn";

/**
 * Thin centered gradient rule between sections (accent or violet), matching
 * the two dividers in the original layout.
 */
export function SectionDivider({ color = "accent" }: { color?: "accent" | "violet" }) {
  return (
    <div
      className={cn(
        "mx-auto h-px max-w-[1100px] opacity-40",
        color === "accent"
          ? "[background:linear-gradient(90deg,transparent,var(--accent),transparent)]"
          : "[background:linear-gradient(90deg,transparent,var(--violet),transparent)]",
      )}
    />
  );
}
