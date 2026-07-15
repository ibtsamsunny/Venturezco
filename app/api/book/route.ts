import { NextResponse } from "next/server";
import { appendLead } from "@/lib/leads";
import { sendNotificationEmail } from "@/lib/email";
import { createCalendarBooking, type BookingPayload } from "@/lib/googleCalendar";

function isValidPayload(body: unknown): body is BookingPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return ["fullName", "businessName", "email", "website", "challenge", "date", "slot", "timezone", "help", "budget", "timeline"].every(
    (key) => typeof b[key] === "string" && (b[key] as string).trim().length > 0
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await appendLead("booking", body);

  const calendarResult = await createCalendarBooking(body).catch((err) => {
    console.error("[book] Calendar booking failed:", err);
    return null;
  });

  await sendNotificationEmail({
    subject: `New strategy call booked — ${body.fullName} (${body.businessName})`,
    text: [
      `${body.date} · ${body.slot} · ${body.timezone}`,
      "",
      `Name: ${body.fullName}`,
      `Business: ${body.businessName}`,
      `Email: ${body.email}`,
      `Website: ${body.website}`,
      `Help needed: ${body.help}`,
      `Budget: ${body.budget}`,
      `Timeline: ${body.timeline}`,
      "",
      `Challenge: ${body.challenge}`,
      calendarResult ? `\nCalendar event: ${calendarResult.htmlLink}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return NextResponse.json({ ok: true, calendarEvent: calendarResult ? { htmlLink: calendarResult.htmlLink } : null });
}
