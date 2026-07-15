import { ABOUT, ABOUT_STATS } from "@/lib/data";
import { Reveal } from "@/components/common/Reveal";
import { SpotlightGroup } from "@/components/common/SpotlightGroup";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Pill } from "@/components/ui/Pill";
import { StatCard } from "@/components/ui/StatCard";

export function About() {
  return (
    <section
      id="about"
      className="relative z-[1] mx-auto max-w-[1200px] px-[clamp(20px,5vw,64px)] py-[clamp(70px,10vw,130px)]"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(40px,6vw,80px)]">
        <div>
          <SectionLabel>{ABOUT.eyebrow}</SectionLabel>
          <Reveal
            as="h2"
            className="mb-[28px] max-w-[16ch] font-grotesk text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.08] tracking-[-0.02em]"
          >
            {ABOUT.heading}
          </Reveal>
          <Reveal as="p" className="mb-[20px] text-[17px] leading-[1.75] text-dim">
            {ABOUT.paragraphs[0]}
          </Reveal>
          <Reveal as="p" className="mb-[30px] text-[17px] leading-[1.75] text-dim">
            {ABOUT.paragraphs[1]}
          </Reveal>
          <Reveal as="div" className="flex flex-wrap gap-[10px]">
            {ABOUT.tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </Reveal>
        </div>

        <SpotlightGroup className="grid grid-cols-2 gap-[16px]">
          {ABOUT_STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}
