import { INQUIRY, PROCESS_STEPS, SITE } from "@/lib/data";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconTile } from "@/components/ui/IconTile";
import { InquiryForm } from "@/components/ui/InquiryForm";

/**
 * Project inquiry (`#inquiry`): the client-validated form alongside a
 * "what happens next?" panel. Purely front-end — see InquiryForm for the
 * (backend-free) submit behaviour carried over from the original.
 */
export function Inquiry() {
  return (
    <section
      id="inquiry"
      className="relative z-[1] mx-auto max-w-[1200px] px-[clamp(20px,5vw,64px)] pb-0 pt-[clamp(70px,10vw,130px)]"
    >
      <SectionLabel>{INQUIRY.eyebrow}</SectionLabel>
      <Reveal
        as="h2"
        className="mb-[22px] max-w-[18ch] font-grotesk text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.08] tracking-[-0.02em]"
      >
        {INQUIRY.heading}
      </Reveal>
      <Reveal as="p" className="mb-[52px] max-w-[64ch] text-[17px] leading-[1.7] text-dim">
        {INQUIRY.body}
      </Reveal>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(24px,4vw,44px)]">
        <Reveal as="div" className="col-span-2 min-w-0">
          <InquiryForm />
        </Reveal>

        <Reveal as="div" className="min-w-0">
          <GlassCard className="relative overflow-hidden rounded-[22px] p-[clamp(24px,3vw,32px)]">
            <div className="pointer-events-none absolute right-[-15%] top-[-30%] h-[220px] w-[220px] rounded-full opacity-[0.08] blur-[42px] [background:radial-gradient(circle,var(--accent),transparent_65%)]" />
            <h3 className="mb-[22px] font-grotesk text-[20px] font-semibold text-text">
              What happens next?
            </h3>
            <ul className="m-0 flex list-none flex-col gap-[20px] p-0">
              {PROCESS_STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-[14px]">
                  <IconTile
                    icon={step.icon}
                    tone="softAccent"
                    iconSize={15}
                    iconStroke={2}
                    className="h-[30px] w-[30px] flex-none rounded-[9px]"
                  />
                  <span className="text-[15px] leading-[1.6] text-dim">{step.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-[26px] border-t border-border-soft pt-[22px]">
              <div className="mb-[10px] font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                Prefer email?
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="text-[15px] font-semibold text-accent no-underline"
              >
                {SITE.email}
              </a>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
