/**
 * Fixed, non-interactive atmosphere behind the whole page: an animated
 * masked grid, three drifting colour orbs, and a faint noise overlay.
 * Purely presentational, so it renders on the server.
 *
 * Note: in the original the orbs carried a `data-speed` parallax transform,
 * but each orb also runs a CSS float animation, and an active CSS animation
 * overrides an inline transform — so the parallax was never visible. The
 * faithful (and simpler) result is the float animation alone.
 */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="abc-grid absolute inset-0 animate-[abc-grid_12s_linear_infinite] opacity-50" />
      <div className="absolute left-[-8%] top-[-6%] h-[520px] w-[520px] animate-[abc-float_16s_ease-in-out_infinite] rounded-full opacity-[0.26] blur-[72px] [background:radial-gradient(circle,var(--accent),transparent_65%)]" />
      <div className="absolute right-[-10%] top-[34%] h-[600px] w-[600px] animate-[abc-float2_20s_ease-in-out_infinite] rounded-full opacity-[0.16] blur-[82px] [background:radial-gradient(circle,#6366f1,transparent_65%)]" />
      <div className="absolute bottom-[2%] left-[6%] h-[560px] w-[560px] animate-[abc-float_22s_ease-in-out_infinite] rounded-full opacity-[0.15] blur-[88px] [background:radial-gradient(circle,var(--violet),transparent_65%)]" />
      <div className="abc-noise absolute inset-0 opacity-[0.035] [mix-blend-mode:overlay]" />
    </div>
  );
}
