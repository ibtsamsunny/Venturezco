import { Heading, Text } from "@react-email/components";
import CtaButton from "../components/CtaButton";
import DetailsCard from "../components/DetailsCard";
import EmailShell from "../components/EmailShell";
import StatusBadge from "../components/StatusBadge";
import { colors } from "../components/theme";

export type AdminBookingEmailProps = {
  fullName: string;
  businessName: string;
  email: string;
  website: string;
  help: string;
  challenge: string;
  budget: string;
  timeline: string;
  dateLabel: string;
  timeLabel: string;
  timezoneLabel: string;
  durationLabel: string;
  meetUrl: string | null;
  eventUrl: string | null;
};

/** Sent to the VenturezCo team the moment a strategy call is booked. All
 * values are plain React children, so JSX's default text escaping is the
 * only sanitization needed — nothing here uses dangerouslySetInnerHTML. */
export default function AdminBookingEmail({
  fullName,
  businessName,
  email,
  website,
  help,
  challenge,
  budget,
  timeline,
  dateLabel,
  timeLabel,
  timezoneLabel,
  durationLabel,
  meetUrl,
  eventUrl,
}: AdminBookingEmailProps) {
  return (
    <EmailShell previewText={`New strategy call booked by ${fullName} (${businessName})`}>
      <StatusBadge label="NEW BOOKING" tone="info" />
      <Heading style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 800, color: colors.textWhite, letterSpacing: "-0.01em" }}>
        New strategy call booked
      </Heading>
      <Text style={{ margin: "0 0 24px", fontSize: 14.5, lineHeight: 1.6, color: colors.textMuted }}>
        {fullName} from {businessName} just booked a strategy call. Details are below.
      </Text>

      <DetailsCard
        title="Appointment"
        rows={[
          { label: "Date", value: dateLabel },
          { label: "Time", value: timeLabel },
          { label: "Timezone", value: timezoneLabel },
          { label: "Duration", value: durationLabel },
          { label: "Google Meet", value: meetUrl ? { href: meetUrl, text: "Join link" } : null },
          { label: "Calendar event", value: eventUrl ? { href: eventUrl, text: "Open event" } : null },
        ]}
      />

      <DetailsCard
        title="Submission details"
        rows={[
          { label: "Name", value: fullName },
          { label: "Business name", value: businessName },
          { label: "Email", value: email },
          { label: "Website", value: website },
          { label: "Services / needs", value: help },
          { label: "Budget", value: budget },
          { label: "Timeline", value: timeline },
        ]}
      />

      <Text style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: colors.textDim }}>
        Challenge
      </Text>
      <Text style={{ margin: "0 0 28px", fontSize: 14, lineHeight: 1.6, color: colors.textMuted }}>{challenge}</Text>

      {eventUrl && <CtaButton href={eventUrl}>Open Google Calendar</CtaButton>}
      {meetUrl && (
        <CtaButton href={meetUrl} variant="secondary">
          Join Google Meet
        </CtaButton>
      )}
    </EmailShell>
  );
}

export const PreviewProps: AdminBookingEmailProps = {
  fullName: "Jane Doe",
  businessName: "Acme Inc.",
  email: "jane@acme.com",
  website: "acme.com",
  help: "Marketing Automation",
  challenge: "We generate leads but most never get followed up with in time, so they go cold.",
  budget: "$5,000 – $10,000/mo",
  timeline: "Within 30 days",
  dateLabel: "Thursday, July 16, 2026",
  timeLabel: "3:00 PM",
  timezoneLabel: "London Time",
  durationLabel: "30 minutes",
  meetUrl: "https://meet.google.com/abc-defg-hij",
  eventUrl: "https://calendar.google.com/calendar/event?eid=abc123",
};

AdminBookingEmail.PreviewProps = PreviewProps;
