import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/data";

/**
 * Inquiry endpoint. Receives the contact form payload, validates it
 * server-side (never trust the client), and emails it via Resend.
 *
 * Configure in the environment (e.g. Vercel project settings):
 *   RESEND_API_KEY  — required; your Resend API key.
 *   INQUIRY_TO      — where inquiries are delivered (defaults to SITE.email).
 *   INQUIRY_FROM    — verified sender. Defaults to Resend's shared test
 *                     address, which works before you verify a domain.
 */

const REQUIRED = ["name", "email", "type", "description"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim, coerce to string, and cap length to keep payloads sane. */
function field(value: unknown, max = 5000): string {
  return String(value ?? "").trim().slice(0, max);
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

  const data = {
    name: field(body.name, 200),
    company: field(body.company, 200),
    email: field(body.email, 320),
    phone: field(body.phone, 60),
    type: field(body.type, 120),
    budget: field(body.budget, 120),
    timeline: field(body.timeline, 200),
    description: field(body.description),
  };

  const invalid: string[] = REQUIRED.filter((name) => !data[name]);
  if (data.email && !EMAIL_RE.test(data.email)) invalid.push("email");
  if (invalid.length) {
    return NextResponse.json(
      { error: "Please fill in the highlighted fields.", fields: invalid },
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
  const from = process.env.INQUIRY_FROM || "ABC Group <onboarding@resend.dev>";

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
  const html = `<h2>New inquiry — ${escapeHtml(SITE.name)}</h2><table>${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

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
