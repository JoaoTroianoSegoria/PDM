import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export function StatPill({ color, icon, label, value }) {
  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: color }]}>
        <MaterialIcons name={icon} size={18} color={colors.primaryContrast} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 76,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    color: colors.secondaryText,
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: colors.primaryText,
    fontSize: 15,
    fontWeight: "700",
  },
});
