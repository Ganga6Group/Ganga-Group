import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/data";
import { INQUIRY_FIELDS, MAX_LENGTH, validateInquiry, type InquiryField } from "@/lib/inquiryValidation";

/**
 * Inquiry endpoint. Receives the contact form payload, re-validates it
 * server-side with the shared rules ([inquiryValidation]) — never trust the
 * client — then emails it to the site owner via Resend so a new inquiry lands
 * in the inbox immediately.
 *
 * Configure in the environment (e.g. Vercel project settings / .env.local):
 *   RESEND_API_KEY  — required; your Resend API key.
 *   INQUIRY_TO      — where inquiries are delivered (defaults to SITE.email).
 *   INQUIRY_FROM    — verified sender. Defaults to Resend's shared test
 *                     address, which works before you verify a domain.
 */

/** Trim, coerce to string, and cap length per field. */
function clean(value: unknown, field: InquiryField): string {
  return String(value ?? "").trim().slice(0, MAX_LENGTH[field]);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Normalise every known field to a trimmed, length-capped string.
  const data = Object.fromEntries(
    INQUIRY_FIELDS.map((field) => [field, clean(body[field], field)]),
  ) as Record<InquiryField, string>;

  const fieldErrors = validateInquiry(data);
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", fields: fieldErrors },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fail loudly in logs, but don't leak config details to the client.
    console.error("RESEND_API_KEY is not set — cannot deliver inquiry.");
    return NextResponse.json(
      { error: "Messaging is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const to = process.env.INQUIRY_TO || SITE.email;
  const from = process.env.INQUIRY_FROM || "Ganga Group <onboarding@resend.dev>";

  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Project type", data.type],
    ["Budget", data.budget || "—"],
    ["Timeline", data.timeline || "—"],
    ["Description", data.description],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
    <h2 style="margin:0 0 4px">New inquiry — ${escapeHtml(SITE.name)}</h2>
    <p style="margin:0 0 16px;color:#667">From ${escapeHtml(data.name)} &lt;${escapeHtml(
      data.email,
    )}&gt;</p>
    <table style="border-collapse:collapse">${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 14px 4px 0;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(
            label,
          )}</td><td style="padding:4px 0">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("")}</table>
  </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New inquiry from ${data.name}`,
      text,
      html,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
    }
  } catch (err) {
    console.error("Failed to send inquiry:", err);
    return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
