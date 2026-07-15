import Image from "next/image";
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
 * The app icon tile. Shows the product image when one is set, falling back to
 * the tinted placeholder tile (matching the card's accent) when it isn't.
 */
function AppIcon({ product, tone }: { product: Product; tone: "softAccent" | "softViolet" }) {
  if (!product.image) return <IconTile tone={tone} className="h-[46px] w-[46px] rounded-[12px]" />;
  return (
    <div className="relative h-[46px] w-[46px] shrink-0 overflow-hidden rounded-[12px] border border-border bg-surface">
      <Image src={product.image} alt={`${product.name} icon`} fill sizes="46px" className="object-cover" />
    </div>
  );
}

/**
 * Card for the "In development" and "Projects available to buy" grids.
 * Development cards lead with an icon + status badge; acquisition cards
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
            <div className="mb-[18px]">
              <AppIcon product={product} tone="softViolet" />
            </div>
          </>
        ) : (
          <div className="mb-[18px] flex items-center justify-between">
            <AppIcon product={product} tone="softAccent" />
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
