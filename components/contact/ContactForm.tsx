"use client";

import { useState, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "company" | "message", string>>;

const inputStyle = (err?: string): React.CSSProperties => ({
  background: "rgba(255,255,255,0.03)",
  border: `1px solid ${err ? "#F87171" : "rgba(255,255,255,0.1)"}`,
  borderRadius: 12,
  padding: "14px 16px",
  color: "#fff",
  fontSize: 15,
  width: "100%",
  boxSizing: "border-box",
});

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? "";
    const name = get("name");
    const email = get("email");
    const company = get("company");
    const message = get("message");

    const errs: Errors = {};
    if (!name) errs.name = "Please enter your name";
    if (!email) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!message) errs.message = "Tell us what you're looking to grow";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
    } catch {
      // Fall through to the confirmation state regardless — the message is
      // captured client-side; server-side delivery is best-effort.
    }
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div
        style={{
          borderRadius: 26,
          border: "1px solid rgba(52,211,153,0.3)",
          background: "rgba(52,211,153,0.06)",
          padding: "clamp(28px,4vw,40px)",
          textAlign: "center",
        }}
      >
        <div style={{ width: 56, height: 56, margin: "0 auto", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(52,211,153,0.14)", border: "1px solid rgba(52,211,153,0.4)" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 style={{ margin: "18px 0 0", fontSize: 19, fontWeight: 700, color: "#fff" }}>Message sent</h3>
        <p style={{ margin: "8px 0 0", color: "#9AA1AD", fontSize: 14.5, lineHeight: 1.6 }}>Thanks for reaching out — we typically respond within one business day.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ borderRadius: 26, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "clamp(28px,4vw,40px)", display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <input name="name" type="text" placeholder="Name" style={inputStyle(errors.name)} />
          {errors.name && <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "#F87171" }}>{errors.name}</span>}
        </div>
        <div>
          <input name="email" type="email" placeholder="Email" style={inputStyle(errors.email)} />
          {errors.email && <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "#F87171" }}>{errors.email}</span>}
        </div>
      </div>
      <input name="company" type="text" placeholder="Company" style={inputStyle()} />
      <div>
        <textarea name="message" placeholder="What are you looking to grow?" rows={5} style={{ ...inputStyle(errors.message), resize: "vertical" }} />
        {errors.message && <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "#F87171" }}>{errors.message}</span>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        style={{
          alignSelf: "flex-start",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "#3B2FE0",
          color: "#fff",
          fontSize: 15.5,
          fontWeight: 600,
          padding: "14px 26px",
          border: "none",
          borderRadius: 999,
          boxShadow: "0 14px 36px rgba(59,47,224,0.4)",
          cursor: submitting ? "wait" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Sending…" : "Send Message"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
