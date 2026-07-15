"use client";

import type { SocialLink } from "@/types";
import { useHeavyEffects } from "@/hooks/useHeavyEffects";
import { useMagnetic } from "@/hooks/useMagnetic";

/**
 * Footer social icon: a glass square that magnetically nudges toward the
 * cursor on capable devices (the original `[data-magnetic]` links).
 */
export function SocialButton({ link }: { link: SocialLink }) {
  const heavy = useHeavyEffects();
  const ref = useMagnetic<HTMLAnchorElement>(heavy);
  const Icon = link.icon;

  return (
    <a
      ref={ref}
      href={link.href}
      aria-label={link.label}
      className="grid h-[40px] w-[40px] place-items-center rounded-[10px] border border-border bg-glass text-dim no-underline"
    >
      <Icon />
    </a>
  );
}
