import type { ComponentType, SVGProps } from "react";

/** A stroke/line icon component (Lucide icons and the brand SVGs both fit). */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export type Theme = "dark" | "light";

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  /** Numeric target the counter animates up to. */
  value: number;
  /** Optional suffix appended after the number (e.g. "+"). */
  suffix?: string;
  label: string;
  /** Layout hints preserved from the original grid. */
  span?: "full";
  /** Larger typographic treatment for the headline stat. */
  size?: "lg" | "md" | "sm";
  /** Renders the number and label on one baseline row. */
  inline?: boolean;
}

export interface Service {
  icon: IconComponent;
  title: string;
  description: string;
  /** Accent colour for the icon tile. */
  tone?: "accent" | "violet";
}

export type ProductStatus = "live" | "development" | "coming-soon" | "acquisition";

export interface Product {
  name: string;
  description: string;
  href: string;
  status: ProductStatus;
  /** Optional metadata line (e.g. install count) shown under the title. */
  meta?: string;
}

export interface TechCategory {
  icon: IconComponent;
  title: string;
  /** Optional lead paragraph (only the AI card uses this). */
  description?: string;
  tags: string[];
}

export interface ProcessStep {
  icon: IconComponent;
  text: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
}

export interface SelectField {
  name: string;
  label: string;
  optional?: boolean;
  placeholder: string;
  options: string[];
}
