"use client";

import { Fragment, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HERO } from "@/lib/data";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/effects/ParticleField";
import { CursorGlow } from "@/components/effects/CursorGlow";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Hero content drifts down and fades as you scroll past it.
  const y = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.14));
  const opacity = useTransform(scrollY, (v) => (reduce ? 1 : Math.max(0, 1 - v / 700)));

  const words = HERO.headline.split(" ");

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative z-[1] flex min-h-screen items-center px-[clamp(20px,5vw,64px)] pb-[80px] pt-[120px]"
    >
      <ParticleField />
      <CursorGlow containerRef={heroRef} />

      <motion.div style={{ y, opacity }} className="relative z-[2] max-w-[920px] will-change-transform">
        <Reveal
          as="div"
          className="mb-[30px] inline-flex items-center gap-[9px] rounded-full border border-border bg-glass px-[14px] py-[7px] font-mono text-[11.5px] uppercase tracking-[0.16em] text-dim backdrop-blur-[10px]"
        >
          <span className="h-[7px] w-[7px] animate-[abc-pulse_2.4s_ease-in-out_infinite] rounded-full bg-green shadow-[0_0_0_0_var(--green)]" />
          {HERO.badge}
        </Reveal>

        <motion.h1
          className="mb-[26px] max-w-[14ch] font-grotesk text-[clamp(40px,7vw,84px)] font-bold leading-[1.03] tracking-[-0.025em]"
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "visible"}
          variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
        >
          {words.map((word, i) => (
            <Fragment key={i}>
              <motion.span
                className="inline-block whitespace-pre"
                variants={{
                  hidden: { opacity: 0, y: "0.5em" },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </motion.h1>

        <Reveal
          as="p"
          className="mb-[40px] max-w-[60ch] text-[clamp(17px,2vw,21px)] leading-[1.65] text-dim"
        >
          {HERO.body}
        </Reveal>

        <Reveal as="div" className="flex flex-wrap gap-[16px]">
          <Button variant="primary" href={HERO.primaryCta.href}>
            {HERO.primaryCta.label}
            <ArrowRight size={16} strokeWidth={2} />
          </Button>
          <Button variant="outline" href={HERO.secondaryCta.href}>
            {HERO.secondaryCta.label}
          </Button>
        </Reveal>
      </motion.div>

      <div className="absolute bottom-[34px] left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-[8px] font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        Scroll
        <span className="h-[34px] w-px [background:linear-gradient(var(--accent),transparent)]" />
      </div>
    </section>
  );
}
