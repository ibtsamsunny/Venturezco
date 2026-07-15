const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "hello@venturezco.com";
const NOTIFY_FROM = process.env.NOTIFY_FROM || "VenturezCo <onboarding@resend.dev>";

/**
 * Sends a plain-text notification email via Resend if RESEND_API_KEY is
 * configured; otherwise logs it to the console. Lets the contact/booking
 * flows work end-to-end locally with zero account setup, and upgrades to
 * real delivery the moment an API key is added to .env.local.
 */
export async function sendNotificationEmail({ subject, text }: { subject: string; text: string }) {
  if (!RESEND_API_KEY) {
    console.log(`[email:not-configured] To: ${NOTIFY_EMAIL}\nSubject: ${subject}\n\n${text}`);
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_EMAIL],
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend request failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("[email] Failed to send notification:", err);
  }
}
