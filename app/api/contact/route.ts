import { NextResponse } from "next/server";
import { appendLead } from "@/lib/leads";
import { sendNotificationEmail } from "@/lib/email";

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

  const companyStr = typeof company === "string" ? company.trim() : "";

  await appendLead("contact", { name: name.trim(), email: email.trim(), company: companyStr, message: message.trim() });

  await sendNotificationEmail({
    subject: `New contact form submission from ${name.trim()}`,
    text: [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      companyStr && `Company: ${companyStr}`,
      "",
      message.trim(),
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return NextResponse.json({ ok: true });
}
