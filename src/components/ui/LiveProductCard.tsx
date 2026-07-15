import { LIVE_PRODUCT } from "@/lib/data";
import { Reveal } from "@/components/common/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { ViewDetails } from "@/components/ui/ViewDetails";

/**
 * The wide, featured card for the one shipped app. Two-column layout with a
 * striped screenshot placeholder, a pulsing "Live" badge, and a green glow.
 */
export function LiveProductCard() {
  return (
    <Reveal as="div" className="mb-[54px]">
      <GlassCard
        as="a"
        href={LIVE_PRODUCT.href}
        className="relative grid grid-cols-[minmax(200px,0.9fr)_1.3fr] items-center gap-[clamp(24px,4vw,48px)] overflow-hidden rounded-[24px] p-[clamp(26px,4vw,44px)] backdrop-blur-[12px]"
      >
        <div className="pointer-events-none absolute left-[-10%] top-[-40%] h-[340px] w-[340px] rounded-full opacity-[0.1] blur-[52px] [background:radial-gradient(circle,var(--green),transparent_65%)]" />

        <div className="relative grid aspect-[4/5] place-items-center rounded-[18px] border border-border [background:repeating-linear-gradient(135deg,var(--surface),var(--surface)_12px,rgba(70,224,139,0.06)_12px,rgba(70,224,139,0.06)_24px)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            app screenshot
          </span>
        </div>

        <div>
          <div className="mb-[20px] inline-flex items-center gap-[8px] rounded-full border border-[rgba(70,224,139,0.35)] bg-[rgba(70,224,139,0.08)] px-[12px] py-[6px] font-mono text-[11px] uppercase tracking-[0.12em] text-green">
            <span className="h-[7px] w-[7px] animate-[abc-pulse_2s_ease-in-out_infinite] rounded-full bg-green" />
            Live
          </div>
          <h3 className="mb-[8px] font-grotesk text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.02em] text-text">
            {LIVE_PRODUCT.name}
          </h3>
          <div className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
            {LIVE_PRODUCT.meta}
          </div>
          <p className="mb-[22px] max-w-[52ch] text-[16.5px] leading-[1.7] text-dim">
            {LIVE_PRODUCT.description}
          </p>
          <ViewDetails size="lg" color="accent" />
        </div>
      </GlassCard>
    </Reveal>
  );
}
