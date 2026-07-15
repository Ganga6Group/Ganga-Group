"use client";

import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

/**
 * Scroll-reveal used across the page — the Framer Motion equivalent of the
 * original `[data-reveal]` observer: fade in + rise 26px, 0.7s on the
 * cubic-bezier(.22,1,.36,1) curve, once, triggered at ~12% visibility with a
 * -8% bottom root margin. Honors reduced-motion by rendering statically.
 *
 * Polymorphic via `as` so it can be a heading, paragraph, form, etc. without
 * introducing an extra wrapper element. For cards that also tilt, wrap the
 * card in <Reveal> so Framer owns the reveal transform and the tilt hook owns
 * the hover transform (no conflict).
 */
type RevealTag = "div" | "h1" | "h2" | "p" | "span" | "form" | "aside" | "ul" | "li";

const MOTION: Record<RevealTag, ElementType> = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
  form: motion.form,
  aside: motion.aside,
  ul: motion.ul,
  li: motion.li,
};

type RevealProps<T extends RevealTag> = {
  as?: T;
  delay?: number;
  children?: ReactNode;
} & HTMLMotionProps<T>;

export function Reveal<T extends RevealTag = "div">({
  as,
  delay = 0,
  children,
  ...rest
}: RevealProps<T>) {
  const reduce = useReducedMotion();
  const Comp = MOTION[(as ?? "div") as RevealTag];

  if (reduce) {
    return <Comp {...rest}>{children}</Comp>;
  }

  return (
    <Comp
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
