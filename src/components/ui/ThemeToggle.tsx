"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTheme } from "@/hooks/useTheme";

/**
 * Circular theme switch. The sun and moon are stacked and cross-fade with a
 * rotate/scale, matching the original 0.45s transition.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative grid h-[42px] w-[42px] cursor-pointer place-items-center overflow-hidden rounded-full border border-border bg-glass text-text backdrop-blur-[10px]"
    >
      <span
        className={cn(
          "absolute [transition:opacity_.45s_ease,transform_.45s_ease]",
          isDark
            ? "opacity-0 [transform:rotate(-70deg)_scale(.5)]"
            : "opacity-100 [transform:rotate(0)_scale(1)]",
        )}
      >
        <Sun size={17} strokeWidth={1.7} />
      </span>
      <span
        className={cn(
          "absolute [transition:opacity_.45s_ease,transform_.45s_ease]",
          isDark
            ? "opacity-100 [transform:rotate(0)_scale(1)]"
            : "opacity-0 [transform:rotate(70deg)_scale(.5)]",
        )}
      >
        <Moon size={16} strokeWidth={1.7} />
      </span>
    </button>
  );
}
