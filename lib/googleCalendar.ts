import { google } from "googleapis";

// Feature-flagged on env vars — every export here degrades gracefully
// (returns null / the full static slot list) when Google Calendar isn't
// configured yet, so the booking flow never breaks. See SETUP.md.

export type BookingPayload = {
  fullName: string;
  businessName: string;
  email: string;
  website: string;
  challenge: string;
  date: string;
  slot: string;
  timezone: string;
  help: string;
  budget: string;
  timeline: string;
};

// The booking modal's fixed business-hours slots — same 7 labels as the
// source design (BookingModal.dc.html's `bkSlotTimes`), each a 30-minute
// appointment in the business's own operating timezone. The design's
// timezone picker is cosmetic (the source never recomputes slot labels
// when it changes), so availability is always checked against these fixed
// ET business hours regardless of which timezone label the visitor picked.
export const SLOT_TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
const SLOT_HOURS: Record<string, { hour: number; minute: number }> = {
  "9:00 AM": { hour: 9, minute: 0 },
  "10:00 AM": { hour: 10, minute: 0 },
  "11:00 AM": { hour: 11, minute: 0 },
  "1:00 PM": { hour: 13, minute: 0 },
  "2:00 PM": { hour: 14, minute: 0 },
  "3:00 PM": { hour: 15, minute: 0 },
  "4:00 PM": { hour: 16, minute: 0 },
};
const SLOT_DURATION_MINUTES = 30;
const BUSINESS_TIMEZONE = process.env.GOOGLE_BUSINESS_TIMEZONE || "America/New_York";

const TZ_LABEL_TO_IANA: Record<string, string> = {
  "Pacific Time (PT)": "America/Los_Angeles",
  "Mountain Time (MT)": "America/Denver",
  "Central Time (CT)": "America/Chicago",
  "Eastern Time (ET)": "America/New_York",
  "GMT / London (GMT)": "Europe/London",
  "Central European (CET)": "Europe/Berlin",
  "India (IST)": "Asia/Kolkata",
  "Singapore (SGT)": "Asia/Singapore",
  "Sydney (AEST)": "Australia/Sydney",
};

function isConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);
}

function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || "primary";
}

export function getOAuthClient(redirectUri: string) {
  return new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectUri);
}

function getAuthenticatedClient() {
  const client = getOAuthClient(getRedirectUri());
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

export function getRedirectUri() {
  return process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/google/callback";
}

/** Exact UTC offset (e.g. "-04:00") for a given IANA zone on a given date,
 * DST-aware. Used to build a precise UTC instant from a wall-clock
 * date+time in that zone without pulling in a date/timezone library. */
function utcOffsetFor(isoInstant: string, timeZone: string): string {
  const dtf = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" });
  const part = dtf.formatToParts(new Date(isoInstant)).find((p) => p.type === "timeZoneName")?.value ?? "GMT+00:00";
  const offset = part.replace("GMT", "");
  return offset || "+00:00";
}

function zonedTimeToUtc(dateStr: string, hour: number, minute: number, timeZone: string): Date {
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  const offset = utcOffsetFor(`${dateStr}T${hh}:${mm}:00Z`, timeZone);
  return new Date(`${dateStr}T${hh}:${mm}:00${offset}`);
}

/** Parses the booking modal's "Wed, Jul 15" style label back into a
 * YYYY-MM-DD date string, using the current year (rolling to next year if
 * the resulting date would be in the past — handles December bookings
 * spilling into a January date list). */
export function parseBookingDateLabel(label: string): string {
  const match = label.match(/([A-Za-z]+)\s+(\d{1,2})$/);
  if (!match) throw new Error(`Unrecognized date label: ${label}`);
  const [, monStr, dayStr] = match;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months.indexOf(monStr);
  if (month < 0) throw new Error(`Unrecognized month: ${monStr}`);
  const day = parseInt(dayStr, 10);
  const now = new Date();
  let year = now.getFullYear();
  const candidate = new Date(Date.UTC(year, month, day));
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  if (candidate.getTime() < today.getTime() - 7 * 24 * 60 * 60 * 1000) year += 1;
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Returns which of the 7 fixed business-hours slots are free on the given
 * YYYY-MM-DD date, per the connected Google Calendar's freebusy data. Falls
 * back to "all slots available" when Google Calendar isn't configured. */
export async function getAvailableSlots(dateStr: string): Promise<string[]> {
  if (!isConfigured()) return SLOT_TIMES;

  const dayStart = zonedTimeToUtc(dateStr, 0, 0, BUSINESS_TIMEZONE);
  const dayEnd = zonedTimeToUtc(dateStr, 23, 59, BUSINESS_TIMEZONE);

  const auth = getAuthenticatedClient();
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = getCalendarId();

  const fb = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      items: [{ id: calendarId }],
    },
  });
  const busy = fb.data.calendars?.[calendarId]?.busy ?? [];

  return SLOT_TIMES.filter((label) => {
    const { hour, minute } = SLOT_HOURS[label];
    const slotStart = zonedTimeToUtc(dateStr, hour, minute, BUSINESS_TIMEZONE);
    const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
    return !busy.some((b) => {
      if (!b.start || !b.end) return false;
      const busyStart = new Date(b.start).getTime();
      const busyEnd = new Date(b.end).getTime();
      return slotStart.getTime() < busyEnd && slotEnd.getTime() > busyStart;
    });
  });
}

/** Creates the calendar event for a confirmed booking, with the lead as an
 * attendee and their answers in the description. Returns null when Google
 * Calendar isn't configured — the booking still succeeds (email + storage
 * still happen), it just won't have a calendar event. */
export async function createCalendarBooking(payload: BookingPayload): Promise<{ htmlLink: string } | null> {
  if (!isConfigured()) return null;

  const dateStr = parseBookingDateLabel(payload.date);
  const { hour, minute } = SLOT_HOURS[payload.slot] ?? {};
  if (hour === undefined) throw new Error(`Unrecognized slot: ${payload.slot}`);
  const start = zonedTimeToUtc(dateStr, hour, minute, BUSINESS_TIMEZONE);
  const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
  const displayTimeZone = TZ_LABEL_TO_IANA[payload.timezone] || BUSINESS_TIMEZONE;

  const auth = getAuthenticatedClient();
  const calendar = google.calendar({ version: "v3", auth });

  const res = await calendar.events.insert({
    calendarId: getCalendarId(),
    sendUpdates: "all",
    requestBody: {
      summary: `Strategy Call — ${payload.fullName} (${payload.businessName})`,
      description: [
        `Website: ${payload.website}`,
        `Help needed: ${payload.help}`,
        `Budget: ${payload.budget}`,
        `Timeline: ${payload.timeline}`,
        "",
        `Challenge: ${payload.challenge}`,
      ].join("\n"),
      start: { dateTime: start.toISOString(), timeZone: displayTimeZone },
      end: { dateTime: end.toISOString(), timeZone: displayTimeZone },
      attendees: [{ email: payload.email, displayName: payload.fullName }],
    },
  });

  return res.data.htmlLink ? { htmlLink: res.data.htmlLink } : null;
}
