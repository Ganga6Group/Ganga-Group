import { SERVICES, SERVICES_INTRO } from "@/lib/data";
import { Reveal } from "@/components/common/Reveal";
import { SpotlightGroup } from "@/components/common/SpotlightGroup";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  return (
    <section
      id="services"
      className="relative z-[1] mx-auto max-w-[1200px] px-[clamp(20px,5vw,64px)] py-[clamp(70px,10vw,130px)]"
    >
      <SectionLabel>{SERVICES_INTRO.eyebrow}</SectionLabel>
      <Reveal
        as="h2"
        className="mb-[22px] max-w-[16ch] font-grotesk text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.08] tracking-[-0.02em]"
      >
        {SERVICES_INTRO.heading}
      </Reveal>
      <Reveal as="p" className="mb-[52px] max-w-[66ch] text-[17px] leading-[1.7] text-dim">
        {SERVICES_INTRO.body}
      </Reveal>

      <SpotlightGroup className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[20px]">
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </SpotlightGroup>
    </section>
  );
}
