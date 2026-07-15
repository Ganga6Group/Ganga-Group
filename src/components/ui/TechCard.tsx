import type { TechCategory } from "@/types";
import { Reveal } from "@/components/common/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconTile } from "@/components/ui/IconTile";

/**
 * One technology category card: gradient icon tile, title, an optional lead
 * line (only the AI card has one), and the wrapped list of stack tags.
 */
export function TechCard({ category }: { category: TechCategory }) {
  return (
    <Reveal as="div" className="h-full">
      <GlassCard spotItem tabIndex={0} className="h-full p-[30px]">
        <IconTile
          icon={category.icon}
          tone="softAccent"
          iconSize={20}
          className="mb-[20px] h-[44px] w-[44px]"
        />
        <h3
          className={`font-grotesk text-[19px] font-semibold text-text ${
            category.description ? "mb-[12px]" : "mb-[16px]"
          }`}
        >
          {category.title}
        </h3>
        {category.description ? (
          <p className="mb-[16px] text-[14px] leading-[1.6] text-dim">{category.description}</p>
        ) : null}
        <div className="flex flex-wrap gap-[8px]">
          {category.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[8px] border border-border bg-surface px-[11px] py-[6px] font-mono text-[11px] text-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </Reveal>
  );
}
