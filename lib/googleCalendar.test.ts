import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { getBusinessSlotInstants, formatTimeInZone, zonedTimeToUtc, SLOT_DURATION_MINUTES } from "./timezone";

const insertMock = vi.fn();
const freebusyQueryMock = vi.fn();

// Hoisted by Vitest above the imports below, so googleCalendar.ts's
// `import { google } from "googleapis"` resolves to this mock everywhere in
// this test file — lets createCalendarBooking/getAvailableSlots be exercised
// without ever hitting the real Calendar API.
vi.mock("googleapis", () => ({
  google: {
    auth: {
      OAuth2: class {
        setCredentials() {}
      },
    },
    calendar: () => ({
      events: { insert: insertMock },
      freebusy: { query: freebusyQueryMock },
    }),
  },
}));

import { computeAvailability, getAvailableSlots, createCalendarBooking, SlotUnavailableError, type BookingPayload } from "./googleCalendar";

describe("computeAvailability — the core double-booking bug", () => {
  it("a busy event at 3:00 PM London blocks exactly the 3:00 PM London slot", () => {
    const dateStr = "2026-07-15";
    const candidates = getBusinessSlotInstants(dateStr, "Europe/London");
    const threePm = candidates.find((c) => c.hour === 15 && c.minute === 0)!;

    // Busy interval covering exactly that 30-minute slot.
    const busyStart = threePm.iso;
    const busyEnd = new Date(new Date(threePm.iso).getTime() + SLOT_DURATION_MINUTES * 60 * 1000).toISOString();

    const result = computeAvailability(candidates, [{ start: busyStart, end: busyEnd }], SLOT_DURATION_MINUTES);

    const blocked = result.filter((r) => !r.available);
    expect(blocked).toHaveLength(1);
    expect(blocked[0].iso).toBe(threePm.iso);

    // Every other slot is untouched.
    const stillFree = result.filter((r) => r.iso !== threePm.iso);
    expect(stillFree.every((r) => r.available)).toBe(true);
  });

  it("that same busy slot displays as 10:00 AM New York on the same July date", () => {
    const dateStr = "2026-07-15";
    const candidates = getBusinessSlotInstants(dateStr, "Europe/London");
    const threePm = candidates.find((c) => c.hour === 15 && c.minute === 0)!;

    expect(formatTimeInZone(threePm.iso, "Europe/London")).toBe("3:00 PM");
    expect(formatTimeInZone(threePm.iso, "America/New_York")).toBe("10:00 AM");
  });

  it("a busy interval that only partially overlaps a slot still blocks it", () => {
    const candidates = getBusinessSlotInstants("2026-07-15", "Europe/London");
    const nineAm = candidates.find((c) => c.hour === 9 && c.minute === 0)!;
    // Busy from 8:45 to 9:15 — overlaps the first 15 minutes of the 9:00 slot.
    const busyStart = new Date(new Date(nineAm.iso).getTime() - 15 * 60 * 1000).toISOString();
    const busyEnd = new Date(new Date(nineAm.iso).getTime() + 15 * 60 * 1000).toISOString();

    const result = computeAvailability(candidates, [{ start: busyStart, end: busyEnd }], SLOT_DURATION_MINUTES);
    expect(result.find((r) => r.iso === nineAm.iso)?.available).toBe(false);
  });

  it("a busy interval that ends exactly when a slot starts does not block it (adjacent, not overlapping)", () => {
    const candidates = getBusinessSlotInstants("2026-07-15", "Europe/London");
    const tenAm = candidates.find((c) => c.hour === 10 && c.minute === 0)!;
    const nineAm = candidates.find((c) => c.hour === 9 && c.minute === 0)!;
    // Busy exactly 9:00–10:00 — touches but doesn't overlap the 10:00 slot.
    const result = computeAvailability(candidates, [{ start: nineAm.iso, end: tenAm.iso }], SLOT_DURATION_MINUTES);
    expect(result.find((r) => r.iso === tenAm.iso)?.available).toBe(true);
  });

  it("no busy intervals means every candidate is available", () => {
    const candidates = getBusinessSlotInstants("2026-07-15", "Europe/London");
    const result = computeAvailability(candidates, [], SLOT_DURATION_MINUTES);
    expect(result.every((r) => r.available)).toBe(true);
    expect(result).toHaveLength(7);
  });

  it("ignores malformed busy intervals missing start/end instead of throwing", () => {
    const candidates = getBusinessSlotInstants("2026-07-15", "Europe/London");
    const result = computeAvailability(candidates, [{ start: null, end: undefined }], SLOT_DURATION_MINUTES);
    expect(result.every((r) => r.available)).toBe(true);
  });
});

describe("getAvailableSlots — graceful fallback when Google isn't configured", () => {
  const savedEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;
    delete process.env.GOOGLE_REFRESH_TOKEN;
    process.env = { ...savedEnv, GOOGLE_CLIENT_ID: undefined, GOOGLE_CLIENT_SECRET: undefined, GOOGLE_REFRESH_TOKEN: undefined } as NodeJS.ProcessEnv;
  });

  it("returns all 7 real business-hour instants as available, without calling Google", async () => {
    const slots = await getAvailableSlots("2026-07-15");
    expect(slots).toHaveLength(7);
    expect(slots.every((s) => s.available)).toBe(true);
    // Instants are real, DST-aware UTC timestamps in the business timezone
    // (Europe/London by default), not placeholder strings.
    const businessTz = process.env.GOOGLE_BUSINESS_TIMEZONE || "Europe/London";
    const expectedFirst = zonedTimeToUtc("2026-07-15", 9, 0, businessTz).toISOString();
    expect(slots[0].iso).toBe(expectedFirst);
  });
});

describe("createCalendarBooking — Google Meet generation", () => {
  const savedEnv = { ...process.env };
  const slotIso = zonedTimeToUtc("2026-07-15", 9, 0, "Europe/London").toISOString();
  const payload: BookingPayload = {
    fullName: "Jane Doe",
    businessName: "Acme Inc",
    email: "jane@acme.com",
    website: "acme.com",
    challenge: "Need more leads",
    date: "Wed, Jul 15",
    slot: slotIso,
    timezone: "London Time",
    help: "Automation",
    budget: "$5k-$10k",
    timeline: "ASAP",
  };

  beforeEach(() => {
    process.env = {
      ...savedEnv,
      GOOGLE_CLIENT_ID: "test-client-id",
      GOOGLE_CLIENT_SECRET: "test-secret",
      GOOGLE_REFRESH_TOKEN: "test-refresh",
      GOOGLE_CALENDAR_ID: "primary",
    } as NodeJS.ProcessEnv;
    insertMock.mockReset();
    freebusyQueryMock.mockReset();
    // The pre-insert recheck should find the slot free by default.
    freebusyQueryMock.mockResolvedValue({ data: { calendars: { primary: { busy: [] } } } });
  });

  afterEach(() => {
    process.env = savedEnv;
  });

  it("creates the event with the lead as an attendee and a unique Meet conference request", async () => {
    insertMock.mockResolvedValue({
      data: {
        id: "evt123",
        htmlLink: "https://calendar.google.com/event?eid=evt123",
        hangoutLink: "https://meet.google.com/abc-defg-hij",
      },
    });

    const result = await createCalendarBooking(payload);

    expect(insertMock).toHaveBeenCalledTimes(1);
    const call = insertMock.mock.calls[0][0];
    // conferenceDataVersion must be a top-level param, not inside requestBody.
    expect(call.conferenceDataVersion).toBe(1);
    expect(call.requestBody.conferenceDataVersion).toBeUndefined();
    expect(call.sendUpdates).toBe("all");
    expect(call.requestBody.attendees).toEqual([{ email: payload.email, displayName: payload.fullName }]);
    expect(call.requestBody.conferenceData.createRequest.conferenceSolutionKey).toEqual({ type: "hangoutsMeet" });
    expect(typeof call.requestBody.conferenceData.createRequest.requestId).toBe("string");
    expect(call.requestBody.conferenceData.createRequest.requestId.length).toBeGreaterThan(0);

    expect(result).toEqual({
      eventId: "evt123",
      eventUrl: "https://calendar.google.com/event?eid=evt123",
      meetUrl: "https://meet.google.com/abc-defg-hij",
      start: slotIso,
      end: new Date(new Date(slotIso).getTime() + SLOT_DURATION_MINUTES * 60 * 1000).toISOString(),
    });
  });

  it("generates a distinct conference requestId per booking", async () => {
    insertMock.mockResolvedValue({ data: { id: "evt1", htmlLink: "https://x", hangoutLink: "https://meet.google.com/aaa-bbbb-ccc" } });
    await createCalendarBooking(payload);
    const firstId = insertMock.mock.calls[0][0].requestBody.conferenceData.createRequest.requestId;

    insertMock.mockResolvedValue({ data: { id: "evt2", htmlLink: "https://x", hangoutLink: "https://meet.google.com/ddd-eeee-fff" } });
    await createCalendarBooking(payload);
    const secondId = insertMock.mock.calls[1][0].requestBody.conferenceData.createRequest.requestId;

    expect(firstId).not.toBe(secondId);
  });

  it("falls back to the conferenceData video entry point when hangoutLink is absent", async () => {
    insertMock.mockResolvedValue({
      data: {
        id: "evt456",
        htmlLink: "https://calendar.google.com/event?eid=evt456",
        conferenceData: {
          entryPoints: [
            { entryPointType: "phone", uri: "tel:+1-555-0100" },
            { entryPointType: "video", uri: "https://meet.google.com/xyz-uvwx-rst" },
          ],
        },
      },
    });

    const result = await createCalendarBooking(payload);
    expect(result?.meetUrl).toBe("https://meet.google.com/xyz-uvwx-rst");
  });

  it("returns meetUrl: null and logs a warning, without failing the booking, when no Meet link comes back", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    insertMock.mockResolvedValue({
      data: {
        id: "evt789",
        htmlLink: "https://calendar.google.com/event?eid=evt789",
        // no hangoutLink, no conferenceData — conference generation failed.
      },
    });

    const result = await createCalendarBooking(payload);

    expect(result).not.toBeNull();
    expect(result?.eventId).toBe("evt789");
    expect(result?.meetUrl).toBeNull();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toMatch(/without a Google Meet link/);
    warnSpy.mockRestore();
  });

  it("still throws SlotUnavailableError from the pre-insert recheck without ever calling insert", async () => {
    freebusyQueryMock.mockResolvedValue({
      data: {
        calendars: {
          primary: { busy: [{ start: slotIso, end: new Date(new Date(slotIso).getTime() + SLOT_DURATION_MINUTES * 60 * 1000).toISOString() }] },
        },
      },
    });

    await expect(createCalendarBooking(payload)).rejects.toThrow(SlotUnavailableError);
    expect(insertMock).not.toHaveBeenCalled();
  });
});
