import { describe, expect, it, vi, beforeEach } from "vitest";
import { render } from "@react-email/render";
import type { ReactElement } from "react";

const sendEmailMock = vi.fn();
const appendLeadMock = vi.fn();

vi.mock("@/lib/email", () => ({ NOTIFY_EMAIL: "hello@venturezco.com", sendEmail: sendEmailMock }));
vi.mock("@/lib/leads", () => ({ appendLead: appendLeadMock }));

const { POST } = await import("./route");

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Render the actual React Email element the route builds and inspect its
// plain-text output, rather than assuming anything about how it was built.
async function renderedText(call: unknown): Promise<string> {
  const react = (call as { react: ReactElement }).react;
  return render(react, { plainText: true });
}

const basePayload = {
  name: "Jane Doe",
  email: "jane@acme.com",
  company: "Acme Inc.",
  message: "Hi, we'd like to talk about growth marketing.",
};

describe("POST /api/contact — branded admin + customer emails", () => {
  beforeEach(() => {
    sendEmailMock.mockReset();
    sendEmailMock.mockResolvedValue(true);
    appendLeadMock.mockReset();
  });

  it("rejects a payload missing required fields without sending anything", async () => {
    const res = await POST(makeRequest({ name: "Jane" }));
    expect(res.status).toBe(400);
    expect(appendLeadMock).not.toHaveBeenCalled();
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("sends an admin enquiry email (reply-to the visitor) and a customer acknowledgement (reply-to the business)", async () => {
    const res = await POST(makeRequest(basePayload));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(appendLeadMock).toHaveBeenCalledWith("contact", basePayload);

    expect(sendEmailMock).toHaveBeenCalledTimes(2);
    const [adminCall, customerCall] = sendEmailMock.mock.calls.map((c) => c[0]);

    expect(adminCall.to).toBe("hello@venturezco.com");
    expect(adminCall.replyTo).toBe(basePayload.email);
    expect(adminCall.subject).toBe(`New website enquiry — ${basePayload.name}`);
    const adminText = await renderedText(adminCall);
    expect(adminText).toContain(basePayload.email);
    expect(adminText.toLowerCase()).toContain(basePayload.company.toLowerCase());
    expect(adminText).toContain(basePayload.message);

    expect(customerCall.to).toBe(basePayload.email);
    expect(customerCall.replyTo).toBe("hello@venturezco.com");
    expect(customerCall.subject).toBe("We received your message — VenturezCo");
    const customerText = await renderedText(customerCall);
    expect(customerText).toContain(basePayload.message);
  });

  it("still returns success and records the lead when one notification email fails, without leaking error detail", async () => {
    sendEmailMock.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(makeRequest(basePayload));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ ok: true });
    expect(appendLeadMock).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringMatching(/admin enquiry notification email/i));
    errorSpy.mockRestore();
  });
});
