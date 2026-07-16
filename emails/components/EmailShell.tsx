import { Body, Container, Head, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import type { ReactNode } from "react";
import { CONTENT_WIDTH, colors, fontFamily, SITE_URL } from "./theme";

type EmailShellProps = {
  previewText: string;
  children: ReactNode;
};

/** Shared outer frame for every transactional email: near-black outer
 * background, centered bordered card, VenturezCo wordmark header, and a
 * copyright footer — matches the site's own dark/purple branding. */
export default function EmailShell({ previewText, children }: EmailShellProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ backgroundColor: colors.bgOuter, margin: 0, padding: "32px 16px", fontFamily }}>
        <Container style={{ maxWidth: CONTENT_WIDTH, margin: "0 auto" }}>
          <Section style={{ textAlign: "center", padding: "0 0 24px" }}>
            <Text style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: colors.textWhite }}>
              Venturez<span style={{ color: colors.accent }}>Co</span>
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 16,
              padding: "36px 32px",
            }}
          >
            {children}
          </Section>

          <Section style={{ textAlign: "center", padding: "28px 12px 0" }}>
            <Text style={{ margin: 0, fontSize: 12, color: colors.textDim, lineHeight: 1.6 }}>
              © 2026 VenturezCo. All rights reserved.
              <br />
              <Link href={SITE_URL} style={{ color: colors.textDim, textDecoration: "underline" }}>
                venturezco.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function Divider() {
  return <Hr style={{ borderColor: colors.divider, margin: "28px 0" }} />;
}
