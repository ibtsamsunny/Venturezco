import { Link, Section, Text } from "@react-email/components";
import type { ReactNode } from "react";
import { colors } from "./theme";

export type DetailRowData = {
  label: string;
  /** A plain string is rendered as text; pass an `{ href, text }` pair to
   * render the value as a link (e.g. a Google Meet/Calendar URL). Rows whose
   * value is null/undefined/empty are skipped entirely — never render an
   * empty or broken row. */
  value: string | { href: string; text: string } | null | undefined;
};

type DetailsCardProps = {
  title?: string;
  rows: DetailRowData[];
};

function isPresent(row: DetailRowData) {
  if (row.value == null) return false;
  if (typeof row.value === "string") return row.value.trim().length > 0;
  return Boolean(row.value.href) && Boolean(row.value.text);
}

/** Bordered card of label/value rows — used for both the appointment
 * details block and the submission details block. Table-based layout for
 * consistent rendering across email clients (including Outlook desktop). */
export default function DetailsCard({ title, rows }: DetailsCardProps) {
  const visibleRows = rows.filter(isPresent);
  if (visibleRows.length === 0) return null;

  return (
    <Section style={{ margin: "0 0 24px" }}>
      {title && (
        <Text
          style={{
            margin: "0 0 10px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: colors.textDim,
          }}
        >
          {title}
        </Text>
      )}
      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <tbody>
          {visibleRows.map((row, i) => {
            let valueNode: ReactNode;
            if (typeof row.value === "string") {
              valueNode = row.value;
            } else if (row.value) {
              valueNode = (
                <Link href={row.value.href} style={{ color: colors.accentText, textDecoration: "underline" }}>
                  {row.value.text}
                </Link>
              );
            }
            return (
              <tr key={row.label} style={{ borderTop: i === 0 ? "none" : `1px solid ${colors.cardBorder}` }}>
                <td style={{ padding: "12px 16px", fontSize: 13.5, color: colors.textMuted, whiteSpace: "nowrap" }}>{row.label}</td>
                <td style={{ padding: "12px 16px", fontSize: 13.5, color: colors.textWhite, fontWeight: 600, textAlign: "right" }}>
                  {valueNode}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
}
