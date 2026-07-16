import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/googleCalendar";

export async function GET(request: Request) {
  const dateStr = new URL(request.url).searchParams.get("date");
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json({ error: "Missing or invalid ?date=YYYY-MM-DD" }, { status: 400 });
  }

  try {
    // Always the 7 fixed business-hour slots as real UTC instants, each
    // flagged with live availability — the client formats them into
    // whichever timezone the visitor has selected for display.
    const slots = await getAvailableSlots(dateStr);
    return NextResponse.json({ slots });
  } catch (err) {
    console.error("[availability] Failed to fetch availability:", err);
    // Fail open: let the modal fall back to its default skeleton rather
    // than blocking the booking flow on a transient API error. The
    // pre-insert recheck in createCalendarBooking is the real safety net
    // against double-booking, not this endpoint.
    return NextResponse.json({ slots: null });
  }
}
