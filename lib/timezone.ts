// Pure, isomorphic timezone utilities — no Node-only APIs, safe to import
// from both server code (API routes, lib/googleCalendar.ts) and client
// components (formatting already-fetched instants for display). All
// DST/offset math goes through Intl, which is DST-aware for any IANA zone.

export type TzOption = { label: string; iana: string };

// Single source of truth for every timezone label shown in the booking
// modal's picker and its underlying IANA identifier. "London Time" is the
// business's own timezone by default (see GOOGLE_BUSINESS_TIMEZONE).
export const TZ_OPTIONS: TzOption[] = [
  { label: "Pacific Time (PT)", iana: "America/Los_Angeles" },
  { label: "Mountain Time (MT)", iana: "America/Denver" },
  { label: "Central Time (CT)", iana: "America/Chicago" },
  { label: "Eastern Time (ET)", iana: "America/New_York" },
  { label: "London Time", iana: "Europe/London" },
  { label: "Central European (CET)", iana: "Europe/Paris" },
  { label: "India (IST)", iana: "Asia/Kolkata" },
  { label: "Singapore (SGT)", iana: "Asia/Singapore" },
  { label: "Sydney (AEST)", iana: "Australia/Sydney" },
];

export const TZ_LABELS = TZ_OPTIONS.map((t) => t.label);

const DEFAULT_IANA = "Europe/London";

/** Maps a display label (e.g. "Eastern Time (ET)") to its IANA zone.
 * Falls back to the business default if the label is unrecognized. */
export function ianaForLabel(label: string): string {
  return TZ_OPTIONS.find((t) => t.label === label)?.iana ?? DEFAULT_IANA;
}

// The booking modal's fixed business-hours schedule — 7 fixed times of day,
// each a 30-minute appointment, evaluated in the business's own timezone
// (GOOGLE_BUSINESS_TIMEZONE). The picker only changes how these are
// *displayed* to a visitor, never which underlying instants exist.
export const BUSINESS_HOUR_SLOTS: { hour: number; minute: number }[] = [
  { hour: 9, minute: 0 },
  { hour: 10, minute: 0 },
  { hour: 11, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 14, minute: 0 },
  { hour: 15, minute: 0 },
  { hour: 16, minute: 0 },
];
export const SLOT_DURATION_MINUTES = 30;

/** Exact UTC offset (e.g. "-04:00") for a given IANA zone at a given
 * instant, DST-aware. Used to build a precise UTC instant from a
 * wall-clock date+time in that zone without a date/timezone library. */
export function utcOffsetFor(isoInstant: string, timeZone: string): string {
  const dtf = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" });
  const part = dtf.formatToParts(new Date(isoInstant)).find((p) => p.type === "timeZoneName")?.value ?? "GMT+00:00";
  const offset = part.replace("GMT", "");
  return offset || "+00:00";
}

/** Converts a wall-clock date+time in the given IANA zone to the precise
 * UTC instant it represents, correctly handling DST for that specific
 * date (the offset is resolved for the target date, not "now"). */
export function zonedTimeToUtc(dateStr: string, hour: number, minute: number, timeZone: string): Date {
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  // First pass with a Z-suffixed guess just to land on the right side of any
  // DST transition for this calendar date; the offset it resolves to is
  // then used to build the real, precise instant.
  const offset = utcOffsetFor(`${dateStr}T${hh}:${mm}:00Z`, timeZone);
  return new Date(`${dateStr}T${hh}:${mm}:00${offset}`);
}

/** Formats a UTC instant as a 12-hour clock label ("10:00 AM") in the
 * given IANA zone — this is what actually makes the timezone picker
 * functional: the same instant renders a different label per zone. */
export function formatTimeInZone(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone }).format(new Date(iso));
}

/** Formats a UTC instant as a full date label ("Thursday, July 16, 2026")
 * in the given IANA zone — used for email/confirmation copy where a raw
 * ISO timestamp would never be shown to a human. */
export function formatDateInZone(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone }).format(new Date(iso));
}

/** "30 minutes" / "1 minute" — the only pluralization this app ever needs,
 * since every booking slot is a fixed length. */
export function formatDurationLabel(minutes: number): string {
  return minutes === 1 ? "1 minute" : `${minutes} minutes`;
}

/** Zone-agnostic "9:00 AM" style label straight from hour/minute numbers —
 * used only for the pre-date-selection skeleton grid, before any concrete
 * calendar date (and therefore any real instant) exists to convert. */
export function formatClockLabel(hour: number, minute: number): string {
  const period = hour < 12 ? "AM" : "PM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

/** Every candidate business-hour instant (as UTC ISO strings) for a given
 * YYYY-MM-DD business-calendar date. Pure — no network/Google dependency,
 * so both the API route and its tests can use the exact same candidates
 * the real availability check evaluates against. */
export function getBusinessSlotInstants(dateStr: string, businessTimeZone: string): { hour: number; minute: number; iso: string }[] {
  return BUSINESS_HOUR_SLOTS.map(({ hour, minute }) => ({
    hour,
    minute,
    iso: zonedTimeToUtc(dateStr, hour, minute, businessTimeZone).toISOString(),
  }));
}

/** Parses the booking modal's "Wed, Jul 15" style date label back into a
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
