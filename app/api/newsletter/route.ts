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

  const { email } = (body ?? {}) as Record<string, unknown>;
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await appendLead("newsletter", { email: email.trim() });
  await sendNotificationEmail({ subject: "New newsletter signup", text: `Email: ${email.trim()}` });

  return NextResponse.json({ ok: true });
}
