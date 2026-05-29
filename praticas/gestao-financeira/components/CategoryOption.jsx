import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

export function CategoryOption({ category, onPress, selected }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.option, selected && styles.optionSelected]}
    >
      <View
        style={[
          styles.icon,
          { backgroundColor: category.background ?? colors.border },
        ]}
      >
        <MaterialIcons
          name={category.icon ?? "category"}
          size={22}
          color={colors.primaryContrast}
        />
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={1}>
        {category.displayName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    width: 96,
    minHeight: 92,
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    maxWidth: "100%",
    color: colors.secondaryText,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  labelSelected: {
    color: colors.primaryDark,
  },
});
