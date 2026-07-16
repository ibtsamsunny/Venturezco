import { describe, expect, it, vi, beforeEach } from "vitest";
import { render } from "@react-email/render";
import type { ReactElement } from "react";
import { zonedTimeToUtc } from "@/lib/timezone";

const createCalendarBookingMock = vi.fn();
const sendEmailMock = vi.fn();
const appendLeadMock = vi.fn();

vi.mock("@/lib/googleCalendar", async () => {
  const actual = await vi.importActual<typeof import("@/lib/googleCalendar")>("@/lib/googleCalendar");
  return { ...actual, createCalendarBooking: createCalendarBookingMock };
});
vi.mock("@/lib/email", () => ({ NOTIFY_EMAIL: "hello@venturezco.com", sendEmail: sendEmailMock }));
vi.mock("@/lib/leads", () => ({ appendLead: appendLeadMock }));

const { POST } = await import("./route");

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const basePayload = {
  fullName: "Jane Doe",
  businessName: "Acme Inc",
  email: "jane@acme.com",
  website: "acme.com",
  challenge: "Need more leads",
  date: "Wed, Jul 15",
  slot: zonedTimeToUtc("2026-07-15", 9, 0, "Europe/London").toISOString(),
  timezone: "London Time",
  help: "Automation",
  budget: "$5k-$10k",
  timeline: "ASAP",
};

// Render the actual React Email element the route builds and inspect its
// plain-text output — this verifies the real rendered content rather than
// assuming anything about how the element was constructed.
async function renderedText(call: unknown): Promise<string> {
  const react = (call as { react: ReactElement }).react;
  return render(react, { plainText: true });
}

describe("POST /api/book — email content and failure isolation", () => {
  beforeEach(() => {
    createCalendarBookingMock.mockReset();
    sendEmailMock.mockReset();
    sendEmailMock.mockResolvedValue(true);
    appendLeadMock.mockReset();
  });

  it("returns the meetUrl from a successful calendar booking", async () => {
    createCalendarBookingMock.mockResolvedValue({
      eventId: "evt1",
      eventUrl: "https://calendar.google.com/event?eid=evt1",
      meetUrl: "https://meet.google.com/abc-defg-hij",
      start: basePayload.slot,
      end: basePayload.slot,
    });

    const res = await POST(makeRequest(basePayload));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.calendarEvent.meetUrl).toBe("https://meet.google.com/abc-defg-hij");
  });

  it("sends a branded admin email (reply-to the visitor) and a branded customer email (reply-to the business), both with formatted date/time", async () => {
    createCalendarBookingMock.mockResolvedValue({
      eventId: "evt1",
      eventUrl: "https://calendar.google.com/event?eid=evt1",
      meetUrl: "https://meet.google.com/abc-defg-hij",
      start: basePayload.slot,
      end: basePayload.slot,
    });

    await POST(makeRequest(basePayload));

    expect(sendEmailMock).toHaveBeenCalledTimes(2);
    const [adminCall, customerCall] = sendEmailMock.mock.calls.map((c) => c[0]);

    expect(adminCall.to).toBe("hello@venturezco.com");
    expect(adminCall.replyTo).toBe(basePayload.email);
    expect(adminCall.subject).toBe(`New strategy call booking — ${basePayload.fullName}`);
    const adminText = await renderedText(adminCall);
    expect(adminText).toContain("Wednesday, July 15, 2026");
    expect(adminText).toContain("9:00 AM");
    expect(adminText).toContain("London Time");
    expect(adminText).toContain("30 minutes");
    expect(adminText).toContain("https://meet.google.com/abc-defg-hij");
    expect(adminText).toContain("https://calendar.google.com/event?eid=evt1");
    expect(adminText).not.toMatch(/\d{4}-\d{2}-\d{2}T/); // never a raw ISO timestamp

    expect(customerCall.to).toBe(basePayload.email);
    expect(customerCall.replyTo).toBe("hello@venturezco.com");
    expect(customerCall.subject).toBe("Your VenturezCo strategy call is confirmed");
    const customerText = await renderedText(customerCall);
    expect(customerText).toContain("https://meet.google.com/abc-defg-hij");
    expect(customerText).toContain("Wednesday, July 15, 2026");
    expect(customerText).not.toMatch(/\d{4}-\d{2}-\d{2}T/);
  });

  it("never claims a Meet link exists (to admin or customer) when generation failed, without failing the request", async () => {
    createCalendarBookingMock.mockResolvedValue({
      eventId: "evt2",
      eventUrl: "https://calendar.google.com/event?eid=evt2",
      meetUrl: null,
      start: basePayload.slot,
      end: basePayload.slot,
    });

    const res = await POST(makeRequest(basePayload));
    expect(res.status).toBe(200);

    const [adminCall, customerCall] = sendEmailMock.mock.calls.map((c) => c[0]);
    const adminText = await renderedText(adminCall);
    const customerText = await renderedText(customerCall);
    expect(adminText).not.toMatch(/meet\.google\.com/i);
    expect(customerText).not.toMatch(/meet\.google\.com/i);
    expect(customerText).not.toMatch(/join google meet/i);
  });

  it("never renders a broken Meet/Calendar button when Google Calendar isn't configured, and still returns success", async () => {
    createCalendarBookingMock.mockResolvedValue(null);

    const res = await POST(makeRequest(basePayload));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.calendarEvent).toBeNull();
    const [adminCall, customerCall] = sendEmailMock.mock.calls.map((c) => c[0]);
    const adminText = await renderedText(adminCall);
    const customerText = await renderedText(customerCall);
    expect(adminText).not.toMatch(/meet\.google\.com|calendar\.google\.com\/calendar\/event/i);
    expect(customerText).not.toMatch(/meet\.google\.com|calendar\.google\.com\/calendar\/event/i);
  });

  it("still returns booking success when the customer email fails to send, and logs it separately from admin failures", async () => {
    createCalendarBookingMock.mockResolvedValue({
      eventId: "evt3",
      eventUrl: "https://calendar.google.com/event?eid=evt3",
      meetUrl: "https://meet.google.com/abc-defg-hij",
      start: basePayload.slot,
      end: basePayload.slot,
    });
    // Admin send succeeds, customer send fails.
    sendEmailMock.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(makeRequest(basePayload));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.calendarEvent.eventId).toBe("evt3");
    // No internal error detail leaked to the client response.
    expect(JSON.stringify(json)).not.toMatch(/error/i);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringMatching(/customer confirmation email/i));
    errorSpy.mockRestore();
  });

  it("does not create a lead or send emails when the slot became unavailable", async () => {
    const { SlotUnavailableError } = await import("@/lib/googleCalendar");
    createCalendarBookingMock.mockRejectedValue(new SlotUnavailableError(basePayload.slot));

    const res = await POST(makeRequest(basePayload));
    expect(res.status).toBe(409);
    expect(appendLeadMock).not.toHaveBeenCalled();
    expect(sendEmailMock).not.toHaveBeenCalled();
  });
});
