import { TECH_CATEGORIES, TECH_INTRO } from "@/lib/data";
import { Reveal } from "@/components/common/Reveal";
import { SpotlightGroup } from "@/components/common/SpotlightGroup";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechCard } from "@/components/ui/TechCard";

/**
 * Technology & development (`#tech`). Intro block reveals on scroll, then the
 * five stack cards in a spotlight group (hover dims the rest).
 */
export function Technology() {
  return (
    <section
      id="tech"
      className="relative z-[1] mx-auto max-w-[1200px] px-[clamp(20px,5vw,64px)] py-[clamp(70px,10vw,130px)]"
    >
      <SectionLabel>{TECH_INTRO.eyebrow}</SectionLabel>
      <Reveal
        as="h2"
        className="mb-[22px] font-grotesk text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.08] tracking-[-0.02em]"
      >
        {TECH_INTRO.heading}
      </Reveal>
      <Reveal as="p" className="mb-[52px] max-w-[64ch] text-[17px] leading-[1.7] text-dim">
        {TECH_INTRO.body}
      </Reveal>

      <SpotlightGroup className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px]">
        {TECH_CATEGORIES.map((category) => (
          <TechCard key={category.title} category={category} />
        ))}
      </SpotlightGroup>
    </section>
  );
}
