import { describe, expect, it, beforeEach } from "vitest";
import { computeAvailability, getAvailableSlots } from "./googleCalendar";
import { getBusinessSlotInstants, formatTimeInZone, zonedTimeToUtc, SLOT_DURATION_MINUTES } from "./timezone";

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
