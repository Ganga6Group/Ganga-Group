import Image from "next/image";
import { ScrollLink } from "@/components/common/ScrollLink";

/**
 * Ganga Group logo. The artwork is a dark wordmark, so it ships in two forms —
 * a white version for the dark theme and the original dark version for the
 * light theme — and the active one is chosen by CSS from the root's
 * `data-theme` (see `.abc-logo-on-*` in globals.css). Renders as a scroll-link
 * in the navbar (to #home) and as a plain mark in the footer.
 */
export function Logo({ as = "link" }: { as?: "link" | "plain" }) {
  const inner = (
    <span className="inline-flex items-center">
      <Image
        src="/logo-white.png"
        alt="Ganga Group"
        width={714}
        height={407}
        priority
        className="abc-logo-on-dark h-[30px] w-auto"
      />
      <Image
        src="/logo.png"
        alt="Ganga Group"
        width={714}
        height={407}
        priority
        className="abc-logo-on-light h-[30px] w-auto"
      />
    </span>
  );

  const classes = "inline-flex items-center no-underline";

  if (as === "plain") {
    return <div className={classes}>{inner}</div>;
  }

  return (
    <ScrollLink href="#home" className={classes} aria-label="Ganga Group, back to top">
      {inner}
    </ScrollLink>
  );
}
