import {
  AlignLeft,
  ArrowRight,
  CircleCheck,
  CirclePlus,
  Clock,
  Cloud,
  Code,
  Download,
  FileText,
  Search,
  Smartphone,
  Sparkle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons/BrandIcons";
import type {
  NavLink,
  ProcessStep,
  Product,
  SelectField,
  Service,
  SocialLink,
  Stat,
  TechCategory,
} from "@/types";

export const SITE = {
  name: "ABC Group",
  email: "hello@abcgroup.dev",
  location: "Surat, Gujarat, India",
  tagline: "Building thoughtful mobile products with care, one release at a time.",
  copyright: "\u00A9 2026 ABC Group. All rights reserved.",
} as const;

/** Offset (px) applied when smooth-scrolling to a section, matching the original. */
export const SCROLL_OFFSET = 66;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Apps", href: "#apps" },
  { label: "Tech", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  badge: "Lean Product Company",
  headline: "We build apps worth keeping.",
  body: "We build thoughtful mobile products, and every so often team up on a software project worth doing properly. It's a simple approach: make a few things with real care rather than a lot of things in a hurry.",
  primaryCta: { label: "See our apps", href: "#apps" },
  secondaryCta: { label: "About the company", href: "#about" },
} as const;

export const ABOUT = {
  eyebrow: "The company",
  heading: "Small by choice. Careful by default.",
  paragraphs: [
    "I started ABC Group to build software the way I always wanted to \u2014 carefully, and with real attention on each piece. Staying small isn't a constraint; it's the whole point. It means every app gets looked after properly instead of being rushed out the door.",
    "When something calls for a skill outside my wheelhouse, I bring in freelancers I've worked with and trust \u2014 never a faceless team. And I don't disappear after launch. I stay with an app for the long haul, fixing and improving it, because anything people rely on deserves to keep working.",
  ],
  tags: ["Product First", "Modern Engineering", "Thoughtful Design", "Built to Last"],
} as const;

export const ABOUT_STATS: Stat[] = [
  { value: 3, label: "Years building", span: "full", size: "lg" },
  { value: 1, label: "App live on Play Store", size: "md" },
  { value: 100, suffix: "+", label: "Downloads and counting", size: "md" },
  { value: 1, label: "In-house, plus freelancers", span: "full", size: "sm", inline: true },
];

export const SERVICES_INTRO = {
  eyebrow: "What we do",
  heading: "From idea to long-term care",
  body: "Every app takes the same route \u2014 from a rough first idea to something people actually keep on their phone, plus the quiet upkeep that comes after. Here's how that usually plays out.",
} as const;

export const SERVICES: Service[] = [
  {
    icon: Smartphone,
    title: "App design & development",
    description:
      "We shape the idea, work out how it should look and feel, then build the whole thing end to end until it's ready for the Play Store.",
  },
  {
    icon: Download,
    title: "Publishing & ASO",
    description:
      "Getting noticed takes more than hitting upload. We sort out the listing, the screenshots, and the keywords so the right people actually come across it.",
  },
  {
    icon: Clock,
    title: "Maintenance & updates",
    description:
      "An app is never really finished. We keep an eye on crashes, stay current with new Android versions, and add the things people ask for as they come up.",
  },
  {
    icon: CirclePlus,
    tone: "violet",
    title: "Apps for acquisition",
    description:
      "A few of our apps are finished and looking for a new home. If one fits what you're planning, you can license it or buy it outright.",
  },
];

export const LIVE_PRODUCT = {
  name: "Colors Quad",
  meta: "100+ installs \u00B7 Play Store",
  description:
    "Match the shades, clear the board, and see how long you can keep a streak going. It's the sort of quiet puzzle you pick up while the kettle boils.",
  href: "/apps/colors-quad/",
} as const;

export const PRODUCTS_IN_DEVELOPMENT: Product[] = [
  {
    name: "iLoveEmbroidery",
    status: "development",
    href: "/apps/iloveembroidery/",
    description:
      "Got an embroidery file but not the pricey desktop software? Open your Wilcom EMB and Tajima DST designs right on your phone, take a proper look, and send them on to whoever needs them.",
  },
  {
    name: "AI Discovery",
    status: "development",
    href: "/apps/ai-discovery/",
    description:
      "The AI space moves quickly, so this keeps track for you. Browse 200+ tools with prices you can line up side by side, reviews from real users, walkthroughs, and a feed of what's just landed.",
  },
  {
    name: "FileGo",
    status: "coming-soon",
    href: "/apps/filego/",
    description:
      "Send a file from your phone to your laptop \u2014 or someone else's \u2014 with no cables, no sign-up, and no emailing it to yourself. Pick the file, pick the device, and it's there.",
  },
];

export const PRODUCTS_ACQUISITION: Product[] = [
  {
    name: "Grablink",
    status: "acquisition",
    href: "/apps/grablink/",
    description:
      "Spotted a video you want to keep? Paste the link from Instagram, YouTube, or ShareChat and it saves straight to your phone \u2014 no account, nothing extra to install.",
  },
  {
    name: "Contactly",
    status: "acquisition",
    href: "/apps/contactly/",
    description:
      "If your address book is a mess, this sorts it out \u2014 merge the duplicates, add notes and tags, keep a backup, and share a tidy card whenever someone asks for your details.",
  },
  {
    name: "FileGo",
    status: "acquisition",
    href: "/apps/filego-acq/",
    description:
      "FileGo, ready to hand over \u2014 the finished app together with its full codebase. A solid running start if cross-device sharing is a space you're thinking about entering.",
  },
];

export const TECH_INTRO = {
  eyebrow: "How we build",
  heading: "Technology & development",
  body: "A quick look at what we build with. Not the whole list \u2014 just the tools we reach for most and trust to still be around in a few years.",
} as const;

export const TECH_CATEGORIES: TechCategory[] = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    tags: ["Android", "Android TV", "Flutter", "Kotlin", "Java"],
  },
  {
    icon: AlignLeft,
    title: "Engineering",
    tags: ["Clean Architecture", "MVVM", "Modular Development", "Performance Optimization"],
  },
  {
    icon: Cloud,
    title: "Cloud",
    tags: ["Firebase", "Supabase", "MongoDB", "REST APIs"],
  },
  {
    icon: Code,
    title: "Tools",
    tags: ["Android Studio", "Git & GitHub", "Figma"],
  },
  {
    icon: Sparkle,
    title: "AI Integration",
    description:
      "When it genuinely makes a product better, we can bring modern AI features into the mix.",
    tags: ["OpenAI", "Google Gemini"],
  },
];

export const INQUIRY = {
  eyebrow: "Start the conversation",
  heading: "Tell me about your project",
  body: "Whether it's a mobile app you've been sketching out, some Android or Flutter work you'd like a hand with, an improvement to something you've already shipped, or a chat about acquiring one of my apps \u2014 I'd genuinely like to hear about it. Tell me what you're thinking and I'll get back to you personally.",
} as const;

export const INQUIRY_SELECTS: Record<"type" | "budget", SelectField> = {
  type: {
    name: "type",
    label: "Inquiry type",
    placeholder: "Select one",
    options: [
      "New Project",
      "Custom Development",
      "Existing Project Support",
      "Business Partnership",
      "Product Acquisition",
      "Technical Consultation",
      "General Inquiry",
    ],
  },
  budget: {
    name: "budget",
    label: "Budget",
    optional: true,
    placeholder: "Select a range",
    options: ["Under $1,000", "$1,000 \u2013 $5,000", "$5,000 \u2013 $10,000", "$10,000+", "Let's Discuss"],
  },
};

export const PROCESS_STEPS: ProcessStep[] = [
  { icon: Search, text: "I read every inquiry myself \u2014 nothing gets filtered by a team or a bot." },
  { icon: Clock, text: "You'll usually hear back within 24\u201348 hours." },
  { icon: CircleCheck, text: "You'll get an honest answer \u2014 even if I'm not the right person for it." },
  { icon: FileText, text: "We start by understanding your goals. No pressure, no obligation." },
];

export const CONTACT = {
  eyebrow: "Let's work together",
  heading: "So, what are you working on?",
  body: "A product idea, a build you'd like a hand with, a business partnership, one of the apps above, or just a technical question \u2014 it all lands straight in my inbox. No forms, no funnel. Say hi.",
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "#", icon: GithubIcon },
  { label: "Twitter", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
];

export { ArrowRight };
