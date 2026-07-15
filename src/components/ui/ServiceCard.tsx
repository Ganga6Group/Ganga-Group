import type { Service } from "@/types";
import { Reveal } from "@/components/common/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconTile } from "@/components/ui/IconTile";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Reveal as="div" className="h-full">
      <GlassCard spotItem tabIndex={0} className="relative h-full overflow-hidden p-[30px]">
        <IconTile
          icon={service.icon}
          tone={service.tone === "violet" ? "serviceViolet" : "serviceAccent"}
          className="mb-[22px] h-[46px] w-[46px]"
        />
        <h3 className="mb-[12px] font-grotesk text-[20px] font-semibold text-text">
          {service.title}
        </h3>
        <p className="text-[15px] leading-[1.65] text-dim">{service.description}</p>
      </GlassCard>
    </Reveal>
  );
}
