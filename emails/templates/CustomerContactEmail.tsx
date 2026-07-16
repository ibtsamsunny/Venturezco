import { Heading, Section, Text } from "@react-email/components";
import EmailShell from "../components/EmailShell";
import { colors } from "../components/theme";

export type CustomerContactEmailProps = {
  name: string;
  message: string;
};

/** Acknowledgement sent to a visitor right after they submit the contact
 * form — no promise of an exact reply time, just a reasonable expectation. */
export default function CustomerContactEmail({ name, message }: CustomerContactEmailProps) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <EmailShell previewText="We received your message and will be in touch soon">
      <Heading style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 800, color: colors.textWhite, letterSpacing: "-0.01em" }}>
        We received your message
      </Heading>
      <Text style={{ margin: "0 0 24px", fontSize: 14.5, lineHeight: 1.6, color: colors.textMuted }}>
        Hi {firstName}, thanks for reaching out to VenturezCo. Your message has come through, and someone from our team will get back to
        you within one business day.
      </Text>

      <Text style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: colors.textDim }}>
        Your message
      </Text>
      <Section
        style={{
          margin: "0 0 24px",
          padding: "16px",
          borderRadius: 12,
          border: `1px solid ${colors.cardBorder}`,
          backgroundColor: colors.bgOuter,
        }}
      >
        <Text style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: colors.textMuted, whiteSpace: "pre-wrap" }}>{message}</Text>
      </Section>

      <Text style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: colors.textDim }}>
        Need to add anything? Just reply to this email.
      </Text>
    </EmailShell>
  );
}

export const PreviewProps: CustomerContactEmailProps = {
  name: "Jane Doe",
  message: "Hi, we're looking for help scaling our outbound and would love to chat about what VenturezCo offers.",
};

CustomerContactEmail.PreviewProps = PreviewProps;
