/**
 * Single source of truth for inquiry-form validation, shared by the client
 * form ([InquiryForm]) and the API route ([/api/inquiry]) so the rules can
 * never drift apart. Pure and dependency-free, so it runs in both places.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Digits, spaces, and + ( ) - only; at least 7 dialling characters. */
export const PHONE_RE = /^[+(]?[\d][\d\s()-]{6,}$/;

/** Every field the form posts. Optional fields may be empty strings. */
export const INQUIRY_FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "type",
  "budget",
  "timeline",
  "description",
] as const;

export type InquiryField = (typeof INQUIRY_FIELDS)[number];

/** Per-field maximum lengths — cheap guard against oversized payloads. */
export const MAX_LENGTH: Record<InquiryField, number> = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  type: 80,
  budget: 80,
  timeline: 160,
  description: 4000,
};

/**
 * Validate a raw payload (form values as strings). Returns a map of
 * field → human-readable message for every field that fails. An empty map
 * means the submission is valid.
 */
export function validateInquiry(data: Record<string, unknown>): Partial<Record<InquiryField, string>> {
  const errors: Partial<Record<InquiryField, string>> = {};
  const val = (k: InquiryField) => String(data[k] ?? "").trim();

  const name = val("name");
  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "That name looks too short.";
  else if (name.length > MAX_LENGTH.name) errors.name = "That name is too long.";

  const email = val("email");
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > MAX_LENGTH.email)
    errors.email = "Enter a valid email address.";

  // Optional, but if supplied it must look like a phone number.
  const phone = val("phone");
  if (phone && !PHONE_RE.test(phone)) errors.phone = "Enter a valid phone number.";

  if (!val("type")) errors.type = "Please choose an inquiry type.";

  const description = val("description");
  if (!description) errors.description = "Please add a short description.";
  else if (description.length < 10)
    errors.description = "Tell me a little more — at least 10 characters.";
  else if (description.length > MAX_LENGTH.description)
    errors.description = "That description is a little too long.";

  return errors;
}
