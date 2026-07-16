import { render } from "@react-email/render";
import type { ReactElement } from "react";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "hello@venturezco.com";

// Read fresh per call rather than frozen at module load — these can change
// between requests in tests, and there's no reason to snapshot them.
function resendApiKey() {
  return process.env.RESEND_API_KEY;
}
function notifyFrom() {
  return process.env.NOTIFY_FROM || "VenturezCo <onboarding@resend.dev>";
}

type SendEmailOptions = {
  to: string;
  subject: string;
  replyTo?: string;
  /** A React Email template element — html and a plain-text fallback are
   * both rendered from it automatically. Mutually exclusive with html/text. */
  react?: ReactElement;
  html?: string;
  text?: string;
};

/**
 * Sends an email via Resend if RESEND_API_KEY is configured; otherwise logs
 * it to the console so the contact/booking flows still work end-to-end
 * locally with zero account setup. Accepts either a React Email `react`
 * element (html + a plain-text fallback are both derived from it) or
 * explicit `html`/`text`. Resend credentials never leave this module.
 * Returns `false` only on an actual send failure, so callers can log
 * admin/customer failures independently without one blocking the other.
 */
export async function sendEmail({ to, subject, replyTo, react, html, text }: SendEmailOptions): Promise<boolean> {
  const resolvedHtml = html ?? (react ? await render(react) : undefined);
  const resolvedText = text ?? (react ? await render(react, { plainText: true }) : undefined);
  const apiKey = resendApiKey();

  if (!apiKey) {
    console.log(
      `[email:not-configured] To: ${to}\nSubject: ${subject}${replyTo ? `\nReply-To: ${replyTo}` : ""}\n\n${resolvedText ?? resolvedHtml ?? ""}`
    );
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: notifyFrom(),
        to: [to],
        subject,
        ...(resolvedHtml ? { html: resolvedHtml } : {}),
        ...(resolvedText ? { text: resolvedText } : {}),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend request failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] Failed to send:", err);
    return false;
  }
}

/** Plain-text convenience wrapper used by flows that don't have a React
 * Email template (e.g. the newsletter signup notice). `to` defaults to the
 * internal notification address. */
export async function sendNotificationEmail({ to = NOTIFY_EMAIL, subject, text }: { to?: string; subject: string; text: string }) {
  return sendEmail({ to, subject, text });
}

export { NOTIFY_EMAIL };
