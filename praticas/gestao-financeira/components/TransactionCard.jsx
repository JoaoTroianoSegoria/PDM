import { MaterialIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { formatCurrency } from "../utils/currency";
import { formatDate } from "../utils/date";
import { getSignedTransactionValue, isIncomeTransaction } from "../utils/finance";

export function TransactionCard({ onDelete, transaction }) {
  const category = transaction.category ?? {};
  const isIncome = isIncomeTransaction(transaction);
  const signedValue = getSignedTransactionValue(transaction);

  function confirmDelete() {
    Alert.alert(
      "Excluir transacao",
      "Deseja remover este lancamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onDelete(transaction.id),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
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

      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {category.displayName ?? "Categoria"} - {formatDate(transaction.date)}
        </Text>
      </View>

      <View style={styles.amountArea}>
        <Text
          style={[
            styles.amount,
            { color: isIncome ? colors.positiveText : colors.negativeText },
          ]}
          numberOfLines={1}
        >
          {formatCurrency(signedValue)}
        </Text>
        <TouchableOpacity
          accessibilityLabel="Excluir transacao"
          activeOpacity={0.75}
          onPress={confirmDelete}
          style={styles.deleteButton}
        >
          <MaterialIcons name="delete-outline" size={20} color={colors.mutedText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 76,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  description: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  meta: {
    color: colors.secondaryText,
    fontSize: 12,
  },
  amountArea: {
    alignItems: "flex-end",
    gap: 6,
    minWidth: 96,
  },
  amount: {
    fontSize: 14,
    fontWeight: "800",
  },
  deleteButton: {
    width: 32,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
