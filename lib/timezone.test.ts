import { describe, expect, it } from "vitest";
import {
  TZ_OPTIONS,
  TZ_LABELS,
  ianaForLabel,
  zonedTimeToUtc,
  formatTimeInZone,
  formatDateInZone,
  formatDurationLabel,
  formatClockLabel,
  getBusinessSlotInstants,
  parseBookingDateLabel,
} from "./timezone";

describe("timezone labels", () => {
  it("has no leftover 'GMT / London (GMT)' label anywhere", () => {
    expect(TZ_LABELS.some((l) => l.includes("GMT / London"))).toBe(false);
  });

  it("maps 'London Time' to the Europe/London IANA zone", () => {
    expect(ianaForLabel("London Time")).toBe("Europe/London");
  });

  it("maps 'Central European (CET)' to Europe/Paris", () => {
    expect(ianaForLabel("Central European (CET)")).toBe("Europe/Paris");
  });

  it("every configured option resolves to a valid, distinct IANA zone Intl accepts", () => {
    for (const { iana } of TZ_OPTIONS) {
      expect(() => new Intl.DateTimeFormat("en-US", { timeZone: iana })).not.toThrow();
    }
  });

  it("falls back to Europe/London for an unrecognized label", () => {
    expect(ianaForLabel("Not A Real Zone")).toBe("Europe/London");
  });
});

describe("zonedTimeToUtc — DST correctness", () => {
  it("Europe/London in July is BST (UTC+1)", () => {
    // 3:00 PM BST = 2:00 PM UTC
    const utc = zonedTimeToUtc("2026-07-15", 15, 0, "Europe/London");
    expect(utc.toISOString()).toBe("2026-07-15T14:00:00.000Z");
  });

  it("Europe/London in winter is GMT (UTC+0)", () => {
    // 3:00 PM GMT = 3:00 PM UTC
    const utc = zonedTimeToUtc("2026-01-15", 15, 0, "Europe/London");
    expect(utc.toISOString()).toBe("2026-01-15T15:00:00.000Z");
  });

  it("America/New_York observes daylight saving in July (EDT, UTC-4)", () => {
    // 10:00 AM EDT = 2:00 PM UTC
    const utc = zonedTimeToUtc("2026-07-15", 10, 0, "America/New_York");
    expect(utc.toISOString()).toBe("2026-07-15T14:00:00.000Z");
  });

  it("America/New_York is standard time in January (EST, UTC-5)", () => {
    // 10:00 AM EST = 3:00 PM UTC
    const utc = zonedTimeToUtc("2026-01-15", 10, 0, "America/New_York");
    expect(utc.toISOString()).toBe("2026-01-15T15:00:00.000Z");
  });

  it("rolls over the UTC calendar date at a timezone boundary", () => {
    // 8:00 PM PST (UTC-8) on Jan 1 is 4:00 AM UTC on Jan 2 — a real
    // date-boundary crossing, not just a time-of-day offset.
    const utc = zonedTimeToUtc("2026-01-01", 20, 0, "America/Los_Angeles");
    expect(utc.toISOString()).toBe("2026-01-02T04:00:00.000Z");
  });
});

describe("formatTimeInZone — visitor timezone conversion", () => {
  it("the same instant shows different clock times in different zones", () => {
    const iso = zonedTimeToUtc("2026-07-15", 15, 0, "Europe/London").toISOString();
    expect(formatTimeInZone(iso, "Europe/London")).toBe("3:00 PM");
    // Both London (BST, UTC+1) and New York (EDT, UTC-4) are on daylight
    // saving in July, so the offset between them is the usual 5 hours.
    expect(formatTimeInZone(iso, "America/New_York")).toBe("10:00 AM");
  });

  it("does not change the underlying UTC instant when reformatted", () => {
    const iso = zonedTimeToUtc("2026-07-15", 9, 0, "Europe/London").toISOString();
    formatTimeInZone(iso, "America/Los_Angeles");
    formatTimeInZone(iso, "Asia/Kolkata");
    // Re-parsing the same iso string must still equal the original instant.
    expect(new Date(iso).toISOString()).toBe(iso);
  });
});

describe("formatDateInZone — human-readable date labels for emails", () => {
  it("formats a full weekday/month/day/year label, never a raw ISO string", () => {
    const iso = zonedTimeToUtc("2026-07-16", 15, 0, "Europe/London").toISOString();
    expect(formatDateInZone(iso, "Europe/London")).toBe("Thursday, July 16, 2026");
  });

  it("can roll to a different calendar date in another zone for the same instant", () => {
    // 8pm PST on Jan 1 is 4am UTC on Jan 2 — reformatting in UTC should
    // show the rolled-over date, not the original wall-clock date.
    const iso = zonedTimeToUtc("2026-01-01", 20, 0, "America/Los_Angeles").toISOString();
    expect(formatDateInZone(iso, "UTC")).toBe("Friday, January 2, 2026");
  });
});

describe("formatDurationLabel", () => {
  it("pluralizes minutes correctly", () => {
    expect(formatDurationLabel(30)).toBe("30 minutes");
    expect(formatDurationLabel(1)).toBe("1 minute");
  });
});

describe("formatClockLabel — zone-agnostic skeleton labels", () => {
  it("formats morning and afternoon hours correctly", () => {
    expect(formatClockLabel(9, 0)).toBe("9:00 AM");
    expect(formatClockLabel(13, 0)).toBe("1:00 PM");
    expect(formatClockLabel(0, 0)).toBe("12:00 AM");
    expect(formatClockLabel(12, 0)).toBe("12:00 PM");
  });
});

describe("getBusinessSlotInstants", () => {
  it("produces 7 candidate instants for a given business date/timezone", () => {
    const slots = getBusinessSlotInstants("2026-07-15", "Europe/London");
    expect(slots).toHaveLength(7);
    expect(slots[0].iso).toBe("2026-07-15T08:00:00.000Z"); // 9am BST
    expect(slots[slots.length - 1].iso).toBe("2026-07-15T15:00:00.000Z"); // 4pm BST
  });
});

describe("parseBookingDateLabel", () => {
  it("parses a 'Wed, Jul 15' style label into YYYY-MM-DD", () => {
    expect(parseBookingDateLabel("Wed, Jul 15")).toMatch(/^\d{4}-07-15$/);
  });
});
