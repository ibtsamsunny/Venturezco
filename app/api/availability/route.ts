import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/googleCalendar";

export async function GET(request: Request) {
  const dateStr = new URL(request.url).searchParams.get("date");
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json({ error: "Missing or invalid ?date=YYYY-MM-DD" }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(dateStr);
    return NextResponse.json({ slots });
  } catch (err) {
    console.error("[availability] Failed to fetch availability:", err);
    // Fail open: let the modal fall back to its default full slot list
    // rather than blocking the booking flow on a transient API error.
    return NextResponse.json({ slots: null });
  }
}
