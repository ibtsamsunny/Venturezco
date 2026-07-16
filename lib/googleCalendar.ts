import { google } from "googleapis";
import { BUSINESS_HOUR_SLOTS, SLOT_DURATION_MINUTES, getBusinessSlotInstants, parseBookingDateLabel, zonedTimeToUtc } from "./timezone";

// Feature-flagged on env vars — every export here degrades gracefully
// (real fixed-schedule instants, no busy-conflict filtering) when Google
// Calendar isn't configured yet, so the booking flow never breaks. See
// SETUP.md.

export type BookingPayload = {
  fullName: string;
  businessName: string;
  email: string;
  website: string;
  challenge: string;
  date: string;
  /** The UTC ISO instant of the chosen slot (not a display label — the
   * timezone picker only changes how slots are *shown*, never their
   * underlying identity). */
  slot: string;
  timezone: string;
  help: string;
  budget: string;
  timeline: string;
};

export type AvailableSlot = { iso: string; available: boolean };

/** Thrown when a slot that looked free at selection time is no longer free
 * by the time the booking is actually submitted — surfaced by /api/book as
 * a 409 so the client can send the visitor back to pick a different time,
 * instead of silently double-booking the calendar. */
export class SlotUnavailableError extends Error {
  constructor(iso: string) {
    super(`Slot ${iso} is no longer available`);
    this.name = "SlotUnavailableError";
  }
}

// Business hours live in this single timezone regardless of how a visitor
// chooses to *view* the picker — changing GOOGLE_BUSINESS_TIMEZONE moves
// the actual working hours, not just a label.
const BUSINESS_TIMEZONE = process.env.GOOGLE_BUSINESS_TIMEZONE || "Europe/London";

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

/** Pure availability check: given the day's fixed candidate slots and the
 * calendar's busy intervals (both as UTC instants), returns which
 * candidates are free. No Google/network dependency, so this is exactly
 * what's under test for the DST/blocking correctness — the real
 * `getAvailableSlots` below is a thin wrapper that fetches busy intervals
 * and calls this. */
export function computeAvailability(
  candidates: { iso: string }[],
  busyIntervals: { start?: string | null; end?: string | null }[],
  durationMinutes: number
): AvailableSlot[] {
  return candidates.map(({ iso }) => {
    const slotStart = new Date(iso).getTime();
    const slotEnd = slotStart + durationMinutes * 60 * 1000;
    const conflict = busyIntervals.some((b) => {
      if (!b.start || !b.end) return false;
      const busyStart = new Date(b.start).getTime();
      const busyEnd = new Date(b.end).getTime();
      return slotStart < busyEnd && slotEnd > busyStart;
    });
    return { iso, available: !conflict };
  });
}

/** Returns all 7 fixed business-hour slots for the given YYYY-MM-DD
 * business-calendar date, each flagged with real availability per the
 * connected Google Calendar's freebusy data. Falls back to "all available"
 * when Google Calendar isn't configured — the instants themselves are
 * always real (computed from GOOGLE_BUSINESS_TIMEZONE), only the
 * conflict-filtering is skipped. */
export async function getAvailableSlots(dateStr: string): Promise<AvailableSlot[]> {
  const candidates = getBusinessSlotInstants(dateStr, BUSINESS_TIMEZONE);

  if (!isConfigured()) return candidates.map(({ iso }) => ({ iso, available: true }));

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

  return computeAvailability(candidates, busy, SLOT_DURATION_MINUTES);
}

export type CalendarBookingResult = {
  eventId: string;
  eventUrl: string | null;
  /** null when the event was created but Google Meet conference generation
   * didn't return a link — the calendar booking is still valid, there's
   * just no video link to show. Callers must not claim a Meet link exists
   * when this is null. */
  meetUrl: string | null;
  start: string;
  end: string;
};

/** Pulls the Google Meet URL out of an inserted event, trying the
 * deprecated-but-still-populated `hangoutLink` shortcut first, then the
 * `conferenceData.entryPoints` video entry — mirrors what the Calendar API
 * actually returns for a `hangoutsMeet` createRequest. */
function extractMeetUrl(event: { hangoutLink?: string | null; conferenceData?: { entryPoints?: { entryPointType?: string | null; uri?: string | null }[] | null } | null }): string | null {
  if (event.hangoutLink) return event.hangoutLink;
  const videoEntry = event.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video");
  return videoEntry?.uri ?? null;
}

/** Creates the calendar event for a confirmed booking, with the lead as an
 * attendee, a unique Google Meet conference, and their answers in the
 * description. Returns null when Google Calendar isn't configured — the
 * booking still succeeds (email + storage still happen), it just won't have
 * a calendar event. Throws SlotUnavailableError if the slot was booked by
 * someone else between selection and submission (checked immediately before
 * insertion). */
export async function createCalendarBooking(payload: BookingPayload): Promise<CalendarBookingResult | null> {
  if (!isConfigured()) return null;

  const dateStr = parseBookingDateLabel(payload.date);

  // Recheck immediately before inserting — the visitor may have picked
  // this slot minutes ago, and someone else could have booked it since.
  const current = await getAvailableSlots(dateStr);
  const stillFree = current.some((s) => s.iso === payload.slot && s.available);
  if (!stillFree) throw new SlotUnavailableError(payload.slot);

  const start = new Date(payload.slot);
  const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

  const auth = getAuthenticatedClient();
  const calendar = google.calendar({ version: "v3", auth });

  const res = await calendar.events.insert({
    calendarId: getCalendarId(),
    sendUpdates: "all",
    // Required for the createRequest below to actually generate conference
    // data — without this the API silently ignores conferenceData.
    conferenceDataVersion: 1,
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
      // dateTime is an absolute RFC3339 instant; timeZone is the business's
      // own zone (not the visitor's display preference) so the event's
      // wall-clock time in Google Calendar's UI matches business hours.
      start: { dateTime: start.toISOString(), timeZone: BUSINESS_TIMEZONE },
      end: { dateTime: end.toISOString(), timeZone: BUSINESS_TIMEZONE },
      attendees: [{ email: payload.email, displayName: payload.fullName }],
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  const meetUrl = extractMeetUrl(res.data);
  if (!meetUrl) {
    console.warn(`[calendar] Event ${res.data.id ?? "(unknown id)"} was created without a Google Meet link — conference generation may have failed.`);
  }

  return {
    eventId: res.data.id ?? "",
    eventUrl: res.data.htmlLink ?? null,
    meetUrl,
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

export { BUSINESS_TIMEZONE, BUSINESS_HOUR_SLOTS };
