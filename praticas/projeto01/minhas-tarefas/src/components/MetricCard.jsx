import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

const toneStyles = {
  neutral: {
    backgroundColor: colors.surface,
    accent: colors.primaryText,
  },
  positive: {
    backgroundColor: colors.primarySoft,
    accent: colors.positiveText,
  },
  negative: {
    backgroundColor: "#FDECEE",
    accent: colors.negativeText,
  },
};

export function MetricCard({ helper, label, tone = "neutral", value }) {
  const palette = toneStyles[tone] ?? toneStyles.neutral;

  return (
    <View style={[styles.card, { backgroundColor: palette.backgroundColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: palette.accent }]}>{value}</Text>
      <Text style={styles.helper}>{helper}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 126,
    padding: 16,
    borderRadius: 22,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondaryText,
  },
  value: {
    fontSize: 22,
    fontWeight: "800",
  },
  helper: {
    fontSize: 13,
    color: colors.secondaryText,
  },
});
