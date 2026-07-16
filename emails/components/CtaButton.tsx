import { Button, Section } from "@react-email/components";
import type { ReactNode } from "react";
import { colors } from "./theme";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

/** Solid-color button (no gradients) so it renders correctly in Outlook
 * desktop, which ignores background-image and border-radius but still
 * shows a correctly colored, clickable rectangle. */
export default function CtaButton({ href, children, variant = "primary" }: CtaButtonProps) {
  const primary = variant === "primary";
  return (
    <Section style={{ textAlign: "center", margin: "8px 0" }}>
      <Button
        href={href}
        style={{
          display: "inline-block",
          padding: "14px 28px",
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          textDecoration: "none",
          backgroundColor: primary ? colors.accent : "transparent",
          color: primary ? colors.textWhite : colors.accentText,
          border: primary ? "none" : `1px solid ${colors.cardBorder}`,
        }}
      >
        {children}
      </Button>
    </Section>
  );
}
