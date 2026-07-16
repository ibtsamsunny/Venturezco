"use client";

import { useCallback, useRef, type CSSProperties, type FormEvent } from "react";
import {
  BUDGET_OPTS,
  HELP_OPTS,
  TIMELINE_OPTS,
  TZ_OPTS,
  useBookingModal,
} from "./BookingModalProvider";
import { BUSINESS_HOUR_SLOTS, formatClockLabel, formatTimeInZone, ianaForLabel } from "@/lib/timezone";

function inputStyle(err?: string, area = false): CSSProperties {
  return {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 15px",
    borderRadius: 12,
    fontFamily: "inherit",
    fontSize: 15,
    color: "#fff",
    background: "rgba(255,255,255,0.03)",
    outline: "none",
    transition: "border-color .2s ease, box-shadow .2s ease",
    border: `1px solid ${err ? "#F87171" : "rgba(255,255,255,0.12)"}`,
    ...(area ? { resize: "vertical", minHeight: 92, lineHeight: 1.5 } : {}),
  };
}

function chipStyle(selected: boolean): CSSProperties {
  return {
    padding: "11px 16px",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "all .2s ease",
    border: `1px solid ${selected ? "#3B2FE0" : "rgba(255,255,255,0.12)"}`,
    background: selected ? "rgba(59,47,224,0.18)" : "rgba(255,255,255,0.03)",
    color: selected ? "#fff" : "#C7CCD4",
  };
}

export default function BookingModal() {
  const bk = useBookingModal();
  const formRef = useRef<HTMLFormElement>(null);
  const { scrollRef } = bk;
  const attachScrollEl = useCallback((el: HTMLDivElement | null) => scrollRef(el), [scrollRef]);

  if (!bk.bkOpen) return null;

  const selDate = bk.bkDate != null ? bk.dates[bk.bkDate] : null;
  const displayZone = ianaForLabel(bk.bkTz);
  const slotLabel = bk.bkSlot ? formatTimeInZone(bk.bkSlot, displayZone) : "";
  const summary = selDate ? `${selDate.full}  ·  ${slotLabel}  ·  ${bk.bkTz}` : "";
  const canContinue = bk.bkDate != null && !!bk.bkSlot;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = formRef.current;
    if (!f) return;
    const get = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? "";
    bk.submit({
      fullName: get("fullName"),
      businessName: get("businessName"),
      email: get("email"),
      website: get("website"),
      challenge: get("challenge"),
    });
  };

  return (
    <div
      onClick={bk.closeBooking}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "rgba(6,8,14,0.72)",
        backdropFilter: "blur(8px)",
        animation: "bkFade .25s ease",
        fontFamily: "'Satoshi', system-ui, sans-serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        ref={attachScrollEl}
        className="bk-scroll"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 640,
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: 26,
          border: "1px solid rgba(96,132,220,0.28)",
          background: "linear-gradient(180deg, #12151F, #0B0D14)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          animation: "bkPop .35s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            padding: "22px 26px 16px",
            background: "linear-gradient(180deg, #12151F 70%, rgba(18,21,31,0))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(59,47,224,0.14)",
                  border: "1px solid rgba(59,47,224,0.3)",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9F91FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4.5" width="18" height="17" rx="3"></rect>
                  <path d="M3 9h18M8 2.5v4M16 2.5v4"></path>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Book your strategy call</div>
                <div style={{ fontSize: 12.5, color: "#8A93A0" }}>Free 30-minute session &middot; No commitment</div>
              </div>
            </div>
            <button
              onClick={bk.closeBooking}
              className="bk-close"
              aria-label="Close"
              style={{
                flex: "0 0 auto",
                width: 34,
                height: 34,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "#9AA1AD",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                transition: "all .2s ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18"></path>
              </svg>
            </button>
          </div>

          {!bk.bkDone && (
            <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 999, background: "#3B2FE0" }} />
              <div style={{ flex: 1, height: 4, borderRadius: 999, background: bk.bkStep === 2 ? "#3B2FE0" : "rgba(255,255,255,0.1)" }} />
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: "0.1em", color: "#8A93A0", whiteSpace: "nowrap" }}>
                STEP {bk.bkStep} / 2
              </span>
            </div>
          )}
        </div>

        {bk.bkStep === 1 && !bk.bkDone && (
          <div style={{ padding: "6px 26px 26px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#B7BCC5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Select a date
            </div>
            <div className="bk-dates" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10 }}>
              {bk.dates.map((d, i) => {
                const selected = bk.bkDate === i;
                return (
                  <div
                    key={i}
                    onClick={() => bk.selectDate(i)}
                    className="bk-chip"
                    style={{
                      flex: "0 0 auto",
                      width: 78,
                      padding: "14px 8px",
                      borderRadius: 14,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all .2s ease",
                      border: `1px solid ${selected ? "#3B2FE0" : "rgba(255,255,255,0.1)"}`,
                      background: selected ? "rgba(59,47,224,0.16)" : "rgba(255,255,255,0.03)",
                      boxShadow: selected ? "0 0 0 3px rgba(59,47,224,0.15)" : undefined,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#8A93A0", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d.wd}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "3px 0" }}>{d.day}</div>
                    <div style={{ fontSize: 11, color: "#8A93A0" }}>{d.mon}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, margin: "24px 0 12px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#B7BCC5", textTransform: "uppercase", letterSpacing: "0.08em" }}>Select a time</div>
              <div style={{ position: "relative" }}>
                <button
                  onClick={bk.toggleTz}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#C7CCD4",
                    fontFamily: "inherit",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "8px 11px",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B3A6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path>
                  </svg>
                  <span>{bk.bkTz}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: "transform .2s ease", transform: bk.bkTzOpen ? "rotate(180deg)" : undefined }}
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </button>
                {bk.bkTzOpen && (
                  <div
                    className="bk-scroll"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      right: 0,
                      zIndex: 30,
                      width: 238,
                      maxHeight: 230,
                      overflowY: "auto",
                      background: "#141922",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 12,
                      padding: 6,
                      boxShadow: "0 16px 38px rgba(0,0,0,0.55)",
                    }}
                  >
                    {TZ_OPTS.map((tz) => (
                      <div
                        key={tz}
                        onClick={() => bk.setTz(tz)}
                        className="bk-tzitem"
                        style={{
                          padding: "9px 11px",
                          borderRadius: 8,
                          cursor: "pointer",
                          fontSize: 13.5,
                          fontWeight: 500,
                          transition: "background .15s ease",
                          color: bk.bkTz === tz ? "#fff" : "#B7BCC5",
                          background: bk.bkTz === tz ? "rgba(59,47,224,0.18)" : "transparent",
                        }}
                      >
                        {tz}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 10, opacity: bk.bkSlotsLoading ? 0.5 : 1, transition: "opacity .2s ease" }}>
              {bk.bkSlots == null
                ? // No date picked yet (or a fetch is in flight): a
                  // non-interactive skeleton in the same fixed business-hour
                  // shape, labeled plainly since there's no concrete date/zone
                  // to convert against yet.
                  BUSINESS_HOUR_SLOTS.map(({ hour, minute }) => (
                    <div
                      key={`${hour}:${minute}`}
                      className="bk-chip"
                      style={{ ...chipStyle(false), textAlign: "center", opacity: 0.55, cursor: "not-allowed" }}
                    >
                      {formatClockLabel(hour, minute)}
                    </div>
                  ))
                : bk.bkSlots.map((s) => (
                    <div
                      key={s.iso}
                      onClick={() => s.available && bk.selectSlot(s.iso)}
                      className="bk-chip"
                      style={{
                        ...chipStyle(bk.bkSlot === s.iso),
                        textAlign: "center",
                        ...(s.available ? {} : { opacity: 0.35, cursor: "not-allowed", textDecoration: "line-through" }),
                      }}
                    >
                      {formatTimeInZone(s.iso, displayZone)}
                    </div>
                  ))}
            </div>
            {bk.bkErrors.slot && <p style={{ margin: "10px 0 0", fontSize: 12.5, color: "#F87171" }}>{bk.bkErrors.slot}</p>}

            <div style={{ marginTop: 26 }}>
              <button
                onClick={bk.toStep2}
                disabled={!canContinue}
                style={{
                  width: "100%",
                  marginTop: 4,
                  border: "none",
                  cursor: canContinue ? "pointer" : "not-allowed",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  background: canContinue ? "#3B2FE0" : "rgba(59,47,224,0.35)",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  padding: 16,
                  borderRadius: 14,
                  boxShadow: "0 12px 34px rgba(59,47,224,0.35)",
                  transition: "all .2s ease",
                  opacity: canContinue ? 1 : 0.55,
                }}
              >
                Continue
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M13 6l6 6-6 6"></path>
                </svg>
              </button>
            </div>
          </div>
        )}

        {bk.bkStep === 2 && !bk.bkDone && (
          <div className="bk-in" style={{ padding: "6px 26px 26px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 12,
                background: "rgba(59,47,224,0.1)",
                border: "1px solid rgba(59,47,224,0.25)",
                marginBottom: 20,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9F91FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4.5" width="18" height="17" rx="3"></rect>
                <path d="M3 9h18M8 2.5v4M16 2.5v4"></path>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#DCE3F0" }}>{summary}</span>
              <button
                onClick={bk.toStep1}
                style={{ marginLeft: "auto", background: "none", border: "none", color: "#B3A6FF", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Change
              </button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="bk-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#C7CCD4" }}>
                    Full name <span style={{ color: "#F87171" }}>*</span>
                  </span>
                  <input name="fullName" type="text" placeholder="Jane Doe" style={inputStyle(bk.bkErrors.fullName)} />
                  {bk.bkErrors.fullName && <span style={{ fontSize: 12, color: "#F87171" }}>{bk.bkErrors.fullName}</span>}
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#C7CCD4" }}>
                    Business name <span style={{ color: "#F87171" }}>*</span>
                  </span>
                  <input name="businessName" type="text" placeholder="Acme Inc." style={inputStyle(bk.bkErrors.businessName)} />
                  {bk.bkErrors.businessName && <span style={{ fontSize: 12, color: "#F87171" }}>{bk.bkErrors.businessName}</span>}
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#C7CCD4" }}>
                    Email <span style={{ color: "#F87171" }}>*</span>
                  </span>
                  <input name="email" type="email" placeholder="jane@acme.com" style={inputStyle(bk.bkErrors.email)} />
                  {bk.bkErrors.email && <span style={{ fontSize: 12, color: "#F87171" }}>{bk.bkErrors.email}</span>}
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#C7CCD4" }}>
                    Website URL <span style={{ color: "#F87171" }}>*</span>
                  </span>
                  <input name="website" type="text" placeholder="acme.com" style={inputStyle(bk.bkErrors.website)} />
                  {bk.bkErrors.website && <span style={{ fontSize: 12, color: "#F87171" }}>{bk.bkErrors.website}</span>}
                </label>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#C7CCD4" }}>
                  What do you need help with? <span style={{ color: "#F87171" }}>*</span>
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                  {HELP_OPTS.map((c) => (
                    <div key={c} onClick={() => bk.setHelp(c)} className="bk-chip" style={chipStyle(bk.bkHelp === c)}>
                      {c}
                    </div>
                  ))}
                </div>
                {bk.bkErrors.help && <span style={{ fontSize: 12, color: "#F87171" }}>{bk.bkErrors.help}</span>}
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#C7CCD4" }}>
                  What is your biggest growth challenge right now? <span style={{ color: "#F87171" }}>*</span>
                </span>
                <textarea
                  name="challenge"
                  placeholder="e.g. We generate leads but most never get followed up with..."
                  style={inputStyle(bk.bkErrors.challenge, true)}
                />
                {bk.bkErrors.challenge && <span style={{ fontSize: 12, color: "#F87171" }}>{bk.bkErrors.challenge}</span>}
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#C7CCD4" }}>
                  Monthly marketing budget? <span style={{ color: "#F87171" }}>*</span>
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                  {BUDGET_OPTS.map((c) => (
                    <div key={c} onClick={() => bk.setBudget(c)} className="bk-chip" style={chipStyle(bk.bkBudget === c)}>
                      {c}
                    </div>
                  ))}
                </div>
                {bk.bkErrors.budget && <span style={{ fontSize: 12, color: "#F87171" }}>{bk.bkErrors.budget}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#C7CCD4" }}>
                  How soon would you like to start? <span style={{ color: "#F87171" }}>*</span>
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                  {TIMELINE_OPTS.map((c) => (
                    <div key={c} onClick={() => bk.setTimeline(c)} className="bk-chip" style={chipStyle(bk.bkTimeline === c)}>
                      {c}
                    </div>
                  ))}
                </div>
                {bk.bkErrors.timeline && <span style={{ fontSize: 12, color: "#F87171" }}>{bk.bkErrors.timeline}</span>}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                <button
                  type="button"
                  onClick={bk.toStep1}
                  style={{
                    flex: "0 0 auto",
                    padding: "16px 20px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#C7CCD4",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={bk.bkSubmitting}
                  style={{
                    flex: 1,
                    border: "none",
                    cursor: bk.bkSubmitting ? "wait" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background: "#3B2FE0",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    padding: 16,
                    borderRadius: 14,
                    boxShadow: "0 12px 34px rgba(59,47,224,0.4)",
                    opacity: bk.bkSubmitting ? 0.7 : 1,
                  }}
                >
                  {bk.bkSubmitting ? "Booking…" : "Confirm Booking"}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </button>
              </div>
              <p style={{ margin: "2px 0 0", textAlign: "center", fontSize: 12, color: "#5B6270" }}>
                We&apos;ll email a calendar invite &amp; confirmation right away.
              </p>
            </form>
          </div>
        )}

        {bk.bkDone && (
          <div style={{ padding: "16px 30px 42px", textAlign: "center" }}>
            <div
              style={{
                width: 76,
                height: 76,
                margin: "14px auto 0",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: "rgba(52,211,153,0.14)",
                border: "1px solid rgba(52,211,153,0.4)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" style={{ strokeDasharray: 40, animation: "bkCheck .5s ease .1s both" }}></path>
              </svg>
            </div>
            <h3 style={{ margin: "22px 0 0", fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>You&apos;re booked in!</h3>
            <p style={{ maxWidth: 400, margin: "12px auto 0", color: "#9AA1AD", fontSize: 15, lineHeight: 1.6 }}>
              Your strategy call is set for <strong style={{ color: "#DCE3F0" }}>{summary}</strong>. Check your inbox for a calendar invite and a short prep
              note.
            </p>
            <button
              onClick={bk.closeBooking}
              style={{
                marginTop: 28,
                border: "none",
                cursor: "pointer",
                background: "#3B2FE0",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                padding: "14px 30px",
                borderRadius: 14,
                boxShadow: "0 12px 34px rgba(59,47,224,0.4)",
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
