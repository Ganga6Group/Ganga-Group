"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useHeavyEffects } from "@/hooks/useHeavyEffects";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * The drifting particle-network canvas behind the hero. Identical parameters
 * to the original: up to 56 nodes, ±0.28 velocity, links drawn under 118px,
 * accent colour that follows the active theme. Only runs on capable devices.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enabled = useHeavyEffects();
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let parts: Particle[] = [];
    let raf = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      width = r.width;
      height = r.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      const n = Math.min(56, Math.round(width / 22));
      parts = [];
      for (let i = 0; i < n; i++) {
        parts.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const accent = themeRef.current === "dark" ? "143,193,255" : "37,99,235";
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + accent + ",0.5)";
        ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < 118) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(" + accent + "," + 0.14 * (1 - d / 118) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      init();
    };

    resize();
    init();
    draw();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
