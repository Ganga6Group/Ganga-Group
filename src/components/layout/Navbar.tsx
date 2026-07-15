"use client";

import { cn } from "@/utils/cn";
import { useScrolled } from "@/hooks/useScrolled";
import { NAV_LINKS } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ScrollLink } from "@/components/common/ScrollLink";

/**
 * Fixed top navigation. Condenses (tighter padding, glass background, hairline
 * border and soft shadow) once the page scrolls past 60px, matching the
 * original `[data-nav]` behaviour with its 0.4s transition.
 */
export function Navbar() {
  const scrolled = useScrolled(60);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-[clamp(20px,5vw,64px)]",
        "[transition:padding_.4s_ease,background-color_.4s_ease,box-shadow_.4s_ease,backdrop-filter_.4s_ease,border-color_.4s_ease]",
        scrolled
          ? "border-b border-border bg-glass py-[12px] shadow-[0_6px_22px_-22px_rgba(0,0,0,0.5)] backdrop-blur-[16px]"
          : "border-b border-transparent bg-transparent py-[22px] shadow-none backdrop-blur-none",
      )}
    >
      <Logo />

      <div className="flex items-center gap-[clamp(6px,2vw,30px)]">
        <div className="flex items-center gap-[clamp(10px,1.6vw,28px)] font-mono text-[12.5px] uppercase tracking-[0.12em]">
          {NAV_LINKS.map((link) => (
            <ScrollLink
              key={link.href}
              href={link.href}
              className="text-dim no-underline hover:text-text"
            >
              {link.label}
            </ScrollLink>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
