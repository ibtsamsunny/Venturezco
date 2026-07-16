import { Heading, Section, Text } from "@react-email/components";
import CtaButton from "../components/CtaButton";
import DetailsCard from "../components/DetailsCard";
import EmailShell from "../components/EmailShell";
import StatusBadge from "../components/StatusBadge";
import { colors } from "../components/theme";

export type AdminContactEmailProps = {
  name: string;
  email: string;
  company: string;
  message: string;
};

/** Sent to the VenturezCo team for every contact form submission. */
export default function AdminContactEmail({ name, email, company, message }: AdminContactEmailProps) {
  return (
    <EmailShell previewText={`New website enquiry from ${name}`}>
      <StatusBadge label="NEW ENQUIRY" tone="info" />
      <Heading style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 800, color: colors.textWhite, letterSpacing: "-0.01em" }}>
        New contact form submission
      </Heading>
      <Text style={{ margin: "0 0 24px", fontSize: 14.5, lineHeight: 1.6, color: colors.textMuted }}>
        Someone submitted the contact form on venturezco.com.
      </Text>

      <DetailsCard
        rows={[
          { label: "Name", value: name },
          { label: "Email", value: email },
          { label: "Company", value: company || null },
        ]}
      />

      <Text style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: colors.textDim }}>
        Message
      </Text>
      <Section
        style={{
          margin: "0 0 28px",
          padding: "16px",
          borderRadius: 12,
          border: `1px solid ${colors.cardBorder}`,
          backgroundColor: colors.bgOuter,
        }}
      >
        <Text style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: colors.textMuted, whiteSpace: "pre-wrap" }}>{message}</Text>
      </Section>

      <CtaButton href={`mailto:${email}`}>Reply to {name}</CtaButton>
    </EmailShell>
  );
}

export const PreviewProps: AdminContactEmailProps = {
  name: "Jane Doe",
  email: "jane@acme.com",
  company: "Acme Inc.",
  message: "Hi, we're looking for help scaling our outbound and would love to chat about what VenturezCo offers.",
};

AdminContactEmail.PreviewProps = PreviewProps;
