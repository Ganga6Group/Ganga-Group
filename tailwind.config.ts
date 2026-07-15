import type { Config } from "tailwindcss";

/**
 * The colour tokens below intentionally resolve to CSS custom properties.
 * The concrete values (and their light-theme overrides) live in
 * `src/app/globals.css` under `[data-abc-root]` / `[data-abc-root][data-theme="light"]`,
 * so the theme switch stays a single source of truth and every utility
 * (`bg-surface`, `text-dim`, `border-border`, …) reacts to it automatically.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        glass: "var(--glass)",
        text: "var(--text)",
        dim: "var(--dim)",
        muted: "var(--muted)",
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
        },
        violet: "var(--violet)",
        green: "var(--green)",
        border: "var(--border)",
        "border-soft": "var(--border-soft)",
      },
      fontFamily: {
        // Manrope — default body copy.
        sans: ["var(--font-manrope)", "sans-serif"],
        // Space Grotesk — display / headings.
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        // Space Mono — eyebrows, labels, data.
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
