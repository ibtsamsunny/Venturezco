import { Text } from "@react-email/components";
import { colors } from "./theme";

type StatusBadgeProps = {
  label: string;
  tone?: "info" | "success";
};

/** Small uppercase pill above the heading — "NEW BOOKING", "CONFIRMED",
 * "NEW ENQUIRY". */
export default function StatusBadge({ label, tone = "info" }: StatusBadgeProps) {
  const bg = tone === "success" ? colors.successSoftBg : colors.accentSoftBg;
  const fg = tone === "success" ? colors.success : colors.accentText;
  return (
    <Text
      style={{
        display: "inline-block",
        margin: "0 0 16px",
        padding: "6px 12px",
        borderRadius: 999,
        backgroundColor: bg,
        color: fg,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </Text>
  );
}
