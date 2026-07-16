import { describe, expect, it, vi, afterEach } from "vitest";
import AdminContactEmail from "@/emails/templates/AdminContactEmail";

const savedEnv = { ...process.env };

describe("sendEmail — Resend integration", () => {
  afterEach(() => {
    process.env = savedEnv;
    vi.unstubAllGlobals();
  });

  it("renders a react template into both html and a plain-text fallback, and posts reply_to to Resend", async () => {
    process.env = { ...savedEnv, RESEND_API_KEY: "re_test", NOTIFY_FROM: "VenturezCo <hello@venturezco.com>" };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async () => "" });
    vi.stubGlobal("fetch", fetchMock);

    const { sendEmail } = await import("./email");
    const ok = await sendEmail({
      to: "jane@acme.com",
      subject: "New website enquiry — Jane Doe",
      replyTo: "jane@acme.com",
      react: AdminContactEmail({ name: "Jane Doe", email: "jane@acme.com", company: "Acme Inc.", message: "Hello there" }),
    });

    expect(ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");

    const payload = JSON.parse(init.body);
    expect(payload.to).toEqual(["jane@acme.com"]);
    expect(payload.reply_to).toBe("jane@acme.com");
    expect(payload.from).toBe("VenturezCo <hello@venturezco.com>");
    expect(payload.html).toContain("New contact form submission");
    expect(payload.html).toContain("<!DOCTYPE html"); // full HTML document, not a raw text dump
    // html-to-text uppercases headings by default, so compare case-insensitively.
    expect(payload.text.toLowerCase()).toContain("new contact form submission");
    expect(payload.text).not.toContain("<html"); // plain-text fallback has no markup
  });

  it("logs to the console and reports success instead of calling Resend when RESEND_API_KEY is unset", async () => {
    process.env = { ...savedEnv, RESEND_API_KEY: undefined } as NodeJS.ProcessEnv;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { sendEmail } = await import("./email");
    const ok = await sendEmail({ to: "jane@acme.com", subject: "Hi", text: "Hello" });

    expect(ok).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[email:not-configured]"));
    logSpy.mockRestore();
  });

  it("returns false and logs an error when the Resend request fails, without throwing", async () => {
    process.env = { ...savedEnv, RESEND_API_KEY: "re_test" };
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 422, text: async () => "invalid `from` address" });
    vi.stubGlobal("fetch", fetchMock);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { sendEmail } = await import("./email");
    const ok = await sendEmail({ to: "jane@acme.com", subject: "Hi", text: "Hello" });

    expect(ok).toBe(false);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
