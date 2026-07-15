"use client";

import { SITE, SOCIAL_LINKS } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";
import { SocialButton } from "@/components/ui/SocialButton";

/**
 * Site footer: brand + tagline, contact details, social links, and the
 * copyright rule. Layout mirrors the original three-column auto-fit grid.
 */
export function Footer() {
  return (
    <footer className="relative z-[1] mt-[clamp(70px,10vw,120px)] border-t border-border px-[clamp(20px,5vw,64px)] pb-[44px] pt-[56px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-[40px]">
        <div>
          <div className="mb-[16px]">
            <Logo as="plain" />
          </div>
          <p className="max-w-[38ch] text-[15px] leading-[1.65] text-dim">{SITE.tagline}</p>
        </div>

        <div>
          <div className="mb-[16px] font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Contact
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="mb-[10px] block text-[15px] text-text no-underline"
          >
            {SITE.email}
          </a>
          <div className="text-[15px] text-dim">{SITE.location}</div>
        </div>

        <div>
          <div className="mb-[16px] font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Elsewhere
          </div>
          <div className="flex gap-[12px]">
            {SOCIAL_LINKS.map((link) => (
              <SocialButton key={link.label} link={link} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[44px] max-w-[1200px] border-t border-border-soft pt-[24px] font-mono text-[12px] tracking-[0.06em] text-muted">
        {SITE.copyright}
      </div>
    </footer>
  );
}
