"use client";

import type { ReactNode, Ref } from "react";
import { cn } from "@/utils/cn";
import { useHeavyEffects } from "@/hooks/useHeavyEffects";
import { useTilt } from "@/hooks/useTilt";

interface GlassCardProps {
  as?: "div" | "a" | "button";
  href?: string;
  /** Anchor target/rel — pass "_blank" + "noopener noreferrer" for external. */
  target?: string;
  rel?: string;
  /** Click handler (used by the button variant). */
  onClick?: () => void;
  /** Cursor-follow 3D tilt (default: true). */
  tilt?: boolean;
  /** Participate in a parent SpotlightGroup's dim-siblings behaviour. */
  spotItem?: boolean;
  tabIndex?: number;
  className?: string;
  children: ReactNode;
}

const base = "rounded-[18px] border border-border bg-glass backdrop-blur-[10px]";

/**
 * The frosted-glass surface used for every card on the page (services, tech,
 * stats, products, the inquiry aside). Adds the cursor-follow tilt on capable
 * devices and, optionally, tags itself as a spotlight item.
 */
export function GlassCard({
  as = "div",
  href,
  target,
  rel,
  onClick,
  tilt = true,
  spotItem = false,
  tabIndex,
  className,
  children,
}: GlassCardProps) {
  const heavy = useHeavyEffects();
  const tiltRef = useTilt<HTMLElement>(heavy && tilt);

  const classes = cn(
    base,
    as === "a" && "block no-underline",
    as === "button" && "block w-full cursor-pointer text-left",
    className,
  );
  const spot = spotItem ? { "data-spot-item": "" } : {};

  if (as === "a") {
    return (
      <a
        ref={tiltRef as Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        tabIndex={tabIndex}
        className={classes}
        {...spot}
      >
        {children}
      </a>
    );
  }

  if (as === "button") {
    return (
      <button
        ref={tiltRef as Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        tabIndex={tabIndex}
        className={classes}
        {...spot}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      ref={tiltRef as Ref<HTMLDivElement>}
      tabIndex={tabIndex}
      className={classes}
      {...spot}
    >
      {children}
    </div>
  );
}
