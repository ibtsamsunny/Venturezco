import { Heading, Link, Section, Text } from "@react-email/components";
import CtaButton from "../components/CtaButton";
import DetailsCard from "../components/DetailsCard";
import EmailShell from "../components/EmailShell";
import StatusBadge from "../components/StatusBadge";
import { colors } from "../components/theme";

export type CustomerBookingEmailProps = {
  fullName: string;
  dateLabel: string;
  timeLabel: string;
  timezoneLabel: string;
  durationLabel: string;
  meetUrl: string | null;
  eventUrl: string | null;
};

/** Sent to the visitor once their strategy call is confirmed. Deliberately
 * omits internal-only fields (budget, timeline, challenge notes) — a
 * customer-facing receipt, not an internal record. */
export default function CustomerBookingEmail({
  fullName,
  dateLabel,
  timeLabel,
  timezoneLabel,
  durationLabel,
  meetUrl,
  eventUrl,
}: CustomerBookingEmailProps) {
  const firstName = fullName.trim().split(/\s+/)[0] || fullName;

  return (
    <EmailShell previewText={`Your strategy call is confirmed for ${dateLabel} at ${timeLabel} ${timezoneLabel}`}>
      <StatusBadge label="CONFIRMED" tone="success" />
      <Heading style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 800, color: colors.textWhite, letterSpacing: "-0.01em" }}>
        Your strategy call is booked
      </Heading>
      <Text style={{ margin: "0 0 24px", fontSize: 14.5, lineHeight: 1.6, color: colors.textMuted }}>
        Hi {firstName}, thanks for booking time with us — we&apos;re looking forward to it. Here are your call details:
      </Text>

      <DetailsCard
        rows={[
          { label: "Date", value: dateLabel },
          { label: "Time", value: timeLabel },
          { label: "Timezone", value: timezoneLabel },
          { label: "Duration", value: durationLabel },
        ]}
      />

      {meetUrl && <CtaButton href={meetUrl}>Join Google Meet</CtaButton>}
      {eventUrl && (
        <Section style={{ textAlign: "center", margin: "4px 0 8px" }}>
          <Link href={eventUrl} style={{ fontSize: 13.5, color: colors.accentText, textDecoration: "underline" }}>
            Add to Google Calendar
          </Link>
        </Section>
      )}

      <Text style={{ margin: "28px 0 0", fontSize: 13.5, fontWeight: 700, color: colors.textWhite }}>Before the call</Text>
      <Text style={{ margin: "6px 0 24px", fontSize: 14, lineHeight: 1.6, color: colors.textMuted }}>
        Feel free to prepare your main growth challenge, current lead process, and goals — it&apos;ll help us make the most of our time
        together.
      </Text>

      <Text style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: colors.textDim }}>Need to reschedule? Reply to this email.</Text>
    </EmailShell>
  );
}

export const PreviewProps: CustomerBookingEmailProps = {
  fullName: "Jane Doe",
  dateLabel: "Thursday, July 16, 2026",
  timeLabel: "3:00 PM",
  timezoneLabel: "London Time",
  durationLabel: "30 minutes",
  meetUrl: "https://meet.google.com/abc-defg-hij",
  eventUrl: "https://calendar.google.com/calendar/event?eid=abc123",
};

CustomerBookingEmail.PreviewProps = PreviewProps;
