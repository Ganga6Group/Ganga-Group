import { cn } from "@/utils/cn";
import type { IconComponent } from "@/types";

/**
 * The small gradient-filled square that holds a section icon (services, tech,
 * process steps) or stands in as a decorative placeholder (product cards).
 * Size and corner radius are set via className; `tone` picks the exact
 * gradient/border/text treatment from the original.
 */
type Tone = "serviceAccent" | "serviceViolet" | "softAccent" | "softViolet";

const TONES: Record<Tone, string> = {
  serviceAccent:
    "border-border text-accent [background:linear-gradient(140deg,rgba(79,156,255,0.18),rgba(79,156,255,0.04))]",
  serviceViolet:
    "border-border text-violet [background:linear-gradient(140deg,rgba(167,139,250,0.2),rgba(167,139,250,0.04))]",
  softAccent:
    "border-border text-accent [background:linear-gradient(140deg,rgba(79,156,255,0.18),transparent)]",
  softViolet:
    "border-[rgba(167,139,250,0.3)] text-violet [background:linear-gradient(140deg,rgba(167,139,250,0.22),transparent)]",
};

interface IconTileProps {
  icon?: IconComponent;
  tone?: Tone;
  iconSize?: number;
  iconStroke?: number;
  className?: string;
}

export function IconTile({
  icon: Icon,
  tone = "serviceAccent",
  iconSize = 22,
  iconStroke = 1.6,
  className,
}: IconTileProps) {
  return (
    <div className={cn("grid place-items-center rounded-[12px] border", TONES[tone], className)}>
      {Icon ? <Icon size={iconSize} strokeWidth={iconStroke} /> : null}
    </div>
  );
}
