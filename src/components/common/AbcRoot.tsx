"use client";

import type { ReactNode } from "react";
import { ThemeProvider, useTheme } from "@/hooks/useTheme";

function Root({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      data-abc-root
      data-theme={theme}
      className="relative min-h-screen bg-bg font-sans text-text [overflow-x:clip]"
    >
      {children}
    </div>
  );
}

/**
 * Recreates the original `[data-abc-root]` container: it owns the theme
 * attribute that drives every CSS-variable colour, the base background/text
 * colours, the Manrope body font, and horizontal overflow clipping.
 */
export function AbcRoot({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <Root>{children}</Root>
    </ThemeProvider>
  );
}
