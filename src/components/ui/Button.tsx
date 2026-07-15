"use client";

import type { MouseEvent, ReactNode, Ref } from "react";
import { cn } from "@/utils/cn";
import { useHeavyEffects } from "@/hooks/useHeavyEffects";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

type ButtonElement = "a" | "button";
type Variant = "primary" | "outline";
type Size = "md" | "lg";

interface ButtonProps {
  as?: ButtonElement;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Magnetic hover + shine sweep (primary CTAs). Default: true. */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

const base =
  "relative inline-flex items-center no-underline font-semibold";

const bySize: Record<Size, string> = {
  md: "gap-[10px] rounded-[12px] px-[28px] py-[15px] text-[15.5px]",
  lg: "gap-[12px] rounded-[14px] px-[34px] py-[17px] text-[16.5px]",
};

const byVariant: Record<Variant, string> = {
  primary:
    "overflow-hidden text-[#04122b] [background:linear-gradient(120deg,var(--accent),var(--accent-light))]",
  outline:
    "border border-border bg-glass text-text backdrop-blur-[10px]",
};

const shadowBySize: Record<Size, string> = {
  md: "shadow-[0_8px_22px_-14px_var(--accent)]",
  lg: "shadow-[0_10px_28px_-16px_var(--accent)]",
};

/**
 * Shared CTA button. Renders as an anchor or a submit button, supports the
 * gradient "primary" (with shine sweep) and glass "outline" variants, applies
 * the magnetic hover on capable devices, and smooth-scrolls for `#` links.
 */
export function Button({
  as = "a",
  variant = "primary",
  size = "md",
  href,
  type,
  onClick,
  magnetic = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  const heavy = useHeavyEffects();
  const smooth = useSmoothScroll();
  const magneticRef = useMagnetic<HTMLElement>(heavy && magnetic);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (href?.startsWith("#")) smooth(e as MouseEvent<HTMLAnchorElement>, href);
    onClick?.(e);
  };

  const classes = cn(
    base,
    bySize[size],
    byVariant[variant],
    variant === "primary" && shadowBySize[size],
    as === "button" && "cursor-pointer border-none font-sans",
    className,
  );

  const shine =
    variant === "primary" ? (
      <span
        data-shine
        className="absolute bottom-0 left-0 top-0 w-2/5 -translate-x-[140%] -skew-x-[18deg] [background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]"
      />
    ) : null;

  if (as === "button") {
    return (
      <button
        ref={magneticRef as Ref<HTMLButtonElement>}
        type={type ?? "button"}
        onClick={handleClick}
        className={classes}
        {...rest}
      >
        {shine}
        {children}
      </button>
    );
  }

  return (
    <a
      ref={magneticRef as Ref<HTMLAnchorElement>}
      href={href}
      onClick={handleClick}
      className={classes}
      {...rest}
    >
      {shine}
      {children}
    </a>
  );
}
