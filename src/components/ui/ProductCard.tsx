import type { Product } from "@/types";
import { cn } from "@/utils/cn";
import { Reveal } from "@/components/common/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconTile } from "@/components/ui/IconTile";
import { ViewDetails } from "@/components/ui/ViewDetails";

function StatusBadge({ status }: { status: Product["status"] }) {
  const comingSoon = status === "coming-soon";
  return (
    <span
      className={cn(
        "rounded-full border border-border px-[11px] py-[5px] font-mono text-[10.5px] uppercase tracking-[0.1em]",
        comingSoon ? "bg-surface text-muted" : "bg-[rgba(79,156,255,0.06)] text-accent",
      )}
    >
      {comingSoon ? "Coming soon" : "In development"}
    </span>
  );
}

/**
 * Card for the "In development" and "Projects available to buy" grids.
 * Development cards lead with an icon-tile + status badge; acquisition cards
 * carry a violet glow and violet accents.
 */
export function ProductCard({ product }: { product: Product }) {
  const isAcquisition = product.status === "acquisition";

  return (
    <Reveal as="div" className="h-full">
      <GlassCard
        as="a"
        href={product.href}
        spotItem
        className={cn(
          "relative h-full overflow-hidden p-[28px]",
          isAcquisition && "rounded-[18px] border-[rgba(167,139,250,0.28)]",
        )}
      >
        {isAcquisition ? (
          <>
            <div className="pointer-events-none absolute right-[-10%] top-[-30%] h-[200px] w-[200px] rounded-full opacity-[0.09] blur-[42px] [background:radial-gradient(circle,var(--violet),transparent_65%)]" />
            <IconTile tone="softViolet" className="mb-[18px] h-[42px] w-[42px] rounded-[11px]" />
          </>
        ) : (
          <div className="mb-[18px] flex items-center justify-between">
            <IconTile tone="softAccent" className="h-[42px] w-[42px] rounded-[11px]" />
            <StatusBadge status={product.status} />
          </div>
        )}

        <h3 className="mb-[10px] font-grotesk text-[20px] font-semibold text-text">
          {product.name}
        </h3>
        <p className="mb-[18px] text-[15px] leading-[1.65] text-dim">{product.description}</p>
        <ViewDetails color={isAcquisition ? "violet" : "accent"} />
      </GlassCard>
    </Reveal>
  );
}
