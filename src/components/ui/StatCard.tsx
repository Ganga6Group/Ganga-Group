import { cn } from "@/utils/cn";
import type { Stat } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/common/Reveal";

const numberSize: Record<NonNullable<Stat["size"]>, string> = {
  lg: "text-[52px]",
  md: "text-[44px]",
  sm: "text-[40px]",
};

/**
 * A single About stat. Reproduces the three original treatments: the large
 * full-width headline stat, the two mid-size half stats, and the inline
 * full-width stat with its label on the same baseline.
 */
export function StatCard({ stat }: { stat: Stat }) {
  const full = stat.span === "full";
  const number = (
    <Counter
      value={stat.value}
      suffix={stat.suffix}
      className={cn("tracking-[-0.03em]", numberSize[stat.size ?? "md"])}
    />
  );

  return (
    <Reveal as="div" className={cn("h-full", full && "col-span-2")}>
      <GlassCard
        spotItem
        className={cn(
          "h-full",
          stat.inline
            ? "flex items-baseline gap-[14px] px-[28px] py-[22px]"
            : "px-[28px] py-[26px]",
        )}
      >
        {stat.inline ? (
          <>
            {number}
            <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-dim">
              {stat.label}
            </div>
          </>
        ) : stat.size === "lg" ? (
          <>
            <div className="flex items-baseline gap-[10px]">{number}</div>
            <div className="mt-[4px] font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
              {stat.label}
            </div>
          </>
        ) : (
          <>
            {number}
            <div className="mt-[4px] font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              {stat.label}
            </div>
          </>
        )}
      </GlassCard>
    </Reveal>
  );
}
