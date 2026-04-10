import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import {
  formatCurrency,
  formatDate,
  getCategoryMeta,
} from "../utils/finance";

export function TransactionCard({ onDelete, transaction }) {
  const category = getCategoryMeta(transaction.category);
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: category.softColor }]}>
        <MaterialIcons name={category.icon} size={22} color={category.color} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <Text style={styles.title}>{transaction.title}</Text>
            <Text style={styles.meta}>
              {category.label} · {formatDate(transaction.createdAt)}
            </Text>
          </View>

          <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
            {isIncome ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </Text>
        </View>

        {transaction.notes ? (
          <Text style={styles.notes}>{transaction.notes}</Text>
        ) : null}

        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <MaterialIcons name="delete-outline" size={18} color={colors.negativeText} />
          <Text style={styles.deleteText}>Remover</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
    borderRadius: 22,
    backgroundColor: colors.surface,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  titleGroup: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
  },
  meta: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  amount: {
    fontSize: 16,
    fontWeight: "800",
    textAlign: "right",
  },
  income: {
    color: colors.positiveText,
  },
  expense: {
    color: colors.negativeText,
  },
  notes: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.primaryText,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
  },
  deleteText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.negativeText,
  },
});
