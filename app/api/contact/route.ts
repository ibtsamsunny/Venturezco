import { NextResponse } from "next/server";
import { appendLead } from "@/lib/leads";
import { NOTIFY_EMAIL, sendEmail } from "@/lib/email";
import AdminContactEmail from "@/emails/templates/AdminContactEmail";
import CustomerContactEmail from "@/emails/templates/CustomerContactEmail";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, company, message } = (body ?? {}) as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim() || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const nameStr = name.trim();
  const emailStr = email.trim();
  const companyStr = typeof company === "string" ? company.trim() : "";
  const messageStr = message.trim();

  await appendLead("contact", { name: nameStr, email: emailStr, company: companyStr, message: messageStr });

  // Admin and customer sends are independent — logged separately, and
  // neither one failing reverses the lead capture that already succeeded.
  const adminSent = await sendEmail({
    to: NOTIFY_EMAIL,
    subject: `New website enquiry — ${nameStr}`,
    replyTo: emailStr,
    react: AdminContactEmail({ name: nameStr, email: emailStr, company: companyStr, message: messageStr }),
  });
  if (!adminSent) console.error("[contact] Failed to send admin enquiry notification email");

  const customerSent = await sendEmail({
    to: emailStr,
    subject: "We received your message — VenturezCo",
    replyTo: NOTIFY_EMAIL,
    react: CustomerContactEmail({ name: nameStr, message: messageStr }),
  });
  if (!customerSent) console.error("[contact] Failed to send customer acknowledgement email");

  return NextResponse.json({ ok: true });
}
