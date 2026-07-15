"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { INQUIRY_SELECTS } from "@/lib/data";
import type { SelectField } from "@/types";
import { useHeavyEffects } from "@/hooks/useHeavyEffects";
import { useMagnetic } from "@/hooks/useMagnetic";

/** Required fields and email pattern — identical to the original validator. */
const REQUIRED = ["name", "email", "type", "description"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUCCESS = "Thanks \u2014 your message is on its way. I\u2019ll be in touch soon.";
const ERROR = "Please fill in the highlighted fields.";
const SEND_ERROR = "Something went wrong sending your message. Please try again.";

type Status = { message: string; tone: "error" | "success" } | null;

const fieldBase =
  "w-full box-border rounded-[11px] border border-border bg-surface px-[15px] py-[13px] font-sans text-[15px] text-text outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(79,156,255,0.14)]";
const fieldError =
  "border-[#ff6b6b] shadow-[0_0_0_3px_rgba(255,107,107,0.13)] focus:border-[#ff6b6b] focus:shadow-[0_0_0_3px_rgba(255,107,107,0.13)]";
const labelClass = "font-mono text-[11px] uppercase tracking-[0.1em] text-muted";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
      {optional ? <span className="normal-case tracking-normal"> (optional)</span> : null}
    </label>
  );
}

/**
 * The project inquiry form. Validates name/email/type/description on the
 * client, highlighting bad fields in red (clearing as you edit). On a valid
 * submit it POSTs to /api/inquiry, which emails the message via Resend; the
 * button is disabled while sending and a success or error status is shown.
 */
export function InquiryForm() {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>(null);
  const [submitting, setSubmitting] = useState(false);

  const heavy = useHeavyEffects();
  const buttonRef = useMagnetic<HTMLButtonElement>(heavy);

  const clearError = (name: string) =>
    setErrors((prev) => (prev[name] ? { ...prev, [name]: false } : prev));

  const cls = (name: string) => cn(fieldBase, errors[name] && fieldError);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Record<string, boolean> = {};
    for (const name of REQUIRED) {
      if (!String(data.get(name) ?? "").trim()) next[name] = true;
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !EMAIL_RE.test(email)) next.email = true;

    setErrors(next);
    const bad = Object.keys(next).filter((k) => next[k]);
    if (bad.length) {
      const first = form.elements.namedItem(bad[0]);
      if (first instanceof HTMLElement) first.focus();
      setStatus({ message: ERROR, tone: "error" });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      const payload = Object.fromEntries(data.entries());
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const info = (await res.json().catch(() => null)) as
          | { error?: string; fields?: string[] }
          | null;
        if (info?.fields?.length) {
          setErrors(Object.fromEntries(info.fields.map((f) => [f, true])));
        }
        setStatus({ message: info?.error ?? SEND_ERROR, tone: "error" });
        return;
      }
      setStatus({ message: SUCCESS, tone: "success" });
      form.reset();
    } catch {
      setStatus({ message: SEND_ERROR, tone: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const renderSelect = (field: SelectField) => (
    <div className="flex flex-col gap-[8px]">
      <Label htmlFor={`inq-${field.name}`} optional={field.optional}>
        {field.label}
      </Label>
      <select
        id={`inq-${field.name}`}
        name={field.name}
        defaultValue=""
        onChange={() => clearError(field.name)}
        className={cn(cls(field.name), "abc-select")}
      >
        <option value="" disabled>
          {field.placeholder}
        </option>
        {field.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid w-full min-w-0 grid-cols-2 gap-[20px] rounded-[22px] border border-border bg-glass p-[clamp(24px,4vw,38px)] backdrop-blur-[10px]"
    >
      <div className="flex flex-col gap-[8px]">
        <Label htmlFor="inq-name">Full name</Label>
        <input
          id="inq-name"
          name="name"
          type="text"
          placeholder="Your name"
          onInput={() => clearError("name")}
          className={cls("name")}
        />
      </div>

      <div className="flex flex-col gap-[8px]">
        <Label htmlFor="inq-company" optional>
          Company
        </Label>
        <input
          id="inq-company"
          name="company"
          type="text"
          placeholder="Organization"
          className={cls("company")}
        />
      </div>

      <div className="flex flex-col gap-[8px]">
        <Label htmlFor="inq-email">Email address</Label>
        <input
          id="inq-email"
          name="email"
          type="email"
          placeholder="you@email.com"
          onInput={() => clearError("email")}
          className={cls("email")}
        />
      </div>

      <div className="flex flex-col gap-[8px]">
        <Label htmlFor="inq-phone" optional>
          Phone
        </Label>
        <input
          id="inq-phone"
          name="phone"
          type="tel"
          placeholder="+91 00000 00000"
          className={cls("phone")}
        />
      </div>

      {renderSelect(INQUIRY_SELECTS.type)}
      {renderSelect(INQUIRY_SELECTS.budget)}

      <div className="col-span-2 flex flex-col gap-[8px]">
        <Label htmlFor="inq-timeline" optional>
          Timeline
        </Label>
        <input
          id="inq-timeline"
          name="timeline"
          type="text"
          placeholder="e.g. next couple of months, no rush"
          className={cls("timeline")}
        />
      </div>

      <div className="col-span-2 flex flex-col gap-[8px]">
        <Label htmlFor="inq-desc">Project description</Label>
        <textarea
          id="inq-desc"
          name="description"
          rows={4}
          placeholder={"Tell me a little about what you have in mind\u2026"}
          onInput={() => clearError("description")}
          className={cn(cls("description"), "min-h-[110px] resize-y")}
        />
      </div>

      <div className="col-span-2 flex flex-wrap items-center gap-[16px]">
        <button
          ref={buttonRef}
          type="submit"
          className={cn(
            "relative inline-flex cursor-pointer items-center gap-[10px] overflow-hidden rounded-[12px] border-none px-[30px] py-[15px] font-sans text-[15.5px] font-semibold text-[#04122b] shadow-[0_8px_22px_-14px_var(--accent)] [background:linear-gradient(120deg,var(--accent),var(--accent-light))]",
            submitting && "pointer-events-none opacity-70",
          )}
        >
          <span
            data-shine
            className="absolute bottom-0 left-0 top-0 w-2/5 -translate-x-[140%] -skew-x-[18deg] [background:linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]"
          />
          Send inquiry
          <ArrowRight size={16} strokeWidth={2} />
        </button>
        <span
          role="status"
          aria-live="polite"
          className={cn(
            "text-[14px] [transition:opacity_.3s_ease]",
            status ? "opacity-100" : "opacity-0",
            status?.tone === "success" ? "text-green" : "text-[#ff8a8a]",
          )}
        >
          {status?.message}
        </span>
      </div>
    </form>
  );
}
