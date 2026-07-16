import { NextResponse } from "next/server";
import { appendLead } from "@/lib/leads";
import { NOTIFY_EMAIL, sendEmail } from "@/lib/email";
import { createCalendarBooking, SlotUnavailableError, type BookingPayload, type CalendarBookingResult } from "@/lib/googleCalendar";
import { ianaForLabel, formatTimeInZone, formatDateInZone, formatDurationLabel, SLOT_DURATION_MINUTES } from "@/lib/timezone";
import AdminBookingEmail from "@/emails/templates/AdminBookingEmail";
import CustomerBookingEmail from "@/emails/templates/CustomerBookingEmail";

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

  let calendarResult: CalendarBookingResult | null = null;
  try {
    calendarResult = await createCalendarBooking(body);
  } catch (err) {
    if (err instanceof SlotUnavailableError) {
      // Someone else booked this slot between selection and submission —
      // don't record the lead as booked for a time that isn't actually
      // held; let the client send the visitor back to pick another time.
      return NextResponse.json(
        { error: "slot_unavailable", message: "That time was just booked by someone else. Please pick another slot." },
        { status: 409 }
      );
    }
    console.error("[book] Calendar booking failed:", err);
  }

  await appendLead("booking", body);

  // The slot is a UTC instant; the visitor's chosen display timezone is
  // what both confirmation emails should show, matching what they saw in
  // the modal — never a raw ISO string or the business's own timezone.
  const zone = ianaForLabel(body.timezone);
  const dateLabel = formatDateInZone(body.slot, zone);
  const timeLabel = formatTimeInZone(body.slot, zone);
  const durationLabel = formatDurationLabel(SLOT_DURATION_MINUTES);
  const meetUrl = calendarResult?.meetUrl ?? null;
  const eventUrl = calendarResult?.eventUrl ?? null;

  // Admin and customer sends are independent — logged separately, and
  // neither one failing reverses the booking that already succeeded above.
  const adminSent = await sendEmail({
    to: NOTIFY_EMAIL,
    subject: `New strategy call booking — ${body.fullName}`,
    replyTo: body.email,
    react: AdminBookingEmail({
      fullName: body.fullName,
      businessName: body.businessName,
      email: body.email,
      website: body.website,
      help: body.help,
      challenge: body.challenge,
      budget: body.budget,
      timeline: body.timeline,
      dateLabel,
      timeLabel,
      timezoneLabel: body.timezone,
      durationLabel,
      meetUrl,
      eventUrl,
    }),
  });
  if (!adminSent) console.error("[book] Failed to send admin booking notification email");

  const customerSent = await sendEmail({
    to: body.email,
    subject: "Your VenturezCo strategy call is confirmed",
    replyTo: NOTIFY_EMAIL,
    react: CustomerBookingEmail({
      fullName: body.fullName,
      dateLabel,
      timeLabel,
      timezoneLabel: body.timezone,
      durationLabel,
      meetUrl,
      eventUrl,
    }),
  });
  if (!customerSent) console.error("[book] Failed to send customer confirmation email");

  return NextResponse.json({
    ok: true,
    calendarEvent: calendarResult ? { eventId: calendarResult.eventId, eventUrl, meetUrl } : null,
  });
}
