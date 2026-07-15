import { ScrollLink } from "@/components/common/ScrollLink";

/**
 * "ABC Group" wordmark — gradient "ABC" + solid "Group". Renders as a
 * scroll-link in the navbar (to #home) and as a plain mark in the footer.
 */
export function Logo({ as = "link" }: { as?: "link" | "plain" }) {
  const inner = (
    <>
      <span className="bg-[linear-gradient(120deg,var(--accent),var(--accent-light))] bg-clip-text text-transparent">
        ABC
      </span>
      <span className="ml-[6px] text-text">Group</span>
    </>
  );

  const classes =
    "flex items-center font-grotesk text-[22px] font-bold tracking-[-0.02em] no-underline";

  if (as === "plain") {
    return <div className={classes}>{inner}</div>;
  }

  return (
    <ScrollLink href="#home" className={classes} aria-label="ABC Group, back to top">
      {inner}
    </ScrollLink>
  );
}
