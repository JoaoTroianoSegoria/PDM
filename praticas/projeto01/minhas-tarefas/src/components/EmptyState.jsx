import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

export function EmptyState({ actionLabel, description, onPress, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionLabel ? (
        <Pressable onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: colors.primaryText,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    color: colors.secondaryText,
  },
  button: {
    marginTop: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.primaryContrast,
    fontWeight: "700",
  },
});
