import { Mail } from "lucide-react";
import { CONTACT, SITE } from "@/lib/data";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

/**
 * Closing contact block (`#contact`). Centered eyebrow, headline and lead,
 * then the single mailto CTA — the "no forms, no funnel" invitation.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-[1] mx-auto max-w-[1000px] px-[clamp(20px,5vw,64px)] pb-0 pt-[clamp(70px,10vw,130px)] text-center"
    >
      <SectionLabel>{CONTACT.eyebrow}</SectionLabel>
      <Reveal
        as="h2"
        className="mx-auto mb-[24px] max-w-[18ch] font-grotesk text-[clamp(32px,5vw,58px)] font-bold leading-[1.06] tracking-[-0.02em]"
      >
        {CONTACT.heading}
      </Reveal>
      <Reveal as="p" className="mx-auto mb-[40px] max-w-[60ch] text-[18px] leading-[1.7] text-dim">
        {CONTACT.body}
      </Reveal>
      <Reveal as="div">
        <Button as="a" href={`mailto:${SITE.email}`} variant="primary" size="lg">
          <Mail size={18} strokeWidth={1.8} />
          {SITE.email}
        </Button>
      </Reveal>
    </section>
  );
}
