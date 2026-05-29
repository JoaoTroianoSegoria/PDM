import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatPill } from "../../components/StatPill";
import { colors } from "../../constants/colors";
import { useFinance } from "../../contexts/FinanceContext";
import { formatCurrency } from "../../utils/currency";
import { getExpensesByCategory } from "../../utils/finance";

export default function Summary() {
  const { loading, totals, transactions } = useFinance();
  const expensesByCategory = getExpensesByCategory(transactions);
  const maxExpense = expensesByCategory[0]?.total || 1;

  if (loading) {
    return (
      <SafeAreaView edges={["bottom"]} style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.overview}>
          <Text style={styles.overviewLabel}>Resultado geral</Text>
          <Text
            style={[
              styles.overviewValue,
              totals.balance < 0 && styles.overviewValueNegative,
            ]}
            numberOfLines={1}
          >
            {formatCurrency(totals.balance)}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatPill
            color={colors.positiveText}
            icon="south-west"
            label="Entradas"
            value={formatCurrency(totals.income)}
          />
          <StatPill
            color={colors.negativeText}
            icon="north-east"
            label="Saidas"
            value={formatCurrency(totals.expenses)}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Gastos por categoria</Text>
          <Text style={styles.sectionMeta}>{expensesByCategory.length}</Text>
        </View>

        {expensesByCategory.length === 0 ? (
          <View style={styles.emptyBox}>
            <MaterialIcons name="donut-large" size={36} color={colors.inactive} />
            <Text style={styles.emptyTitle}>Sem saidas registradas</Text>
            <Text style={styles.emptyText}>
              As categorias aparecem aqui depois dos primeiros lancamentos.
            </Text>
          </View>
        ) : (
          <View style={styles.chartList}>
            {expensesByCategory.map((category) => {
              const percent = Math.max(8, (category.total / maxExpense) * 100);

              return (
                <View key={category.id} style={styles.categoryRow}>
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: category.background },
                    ]}
                  >
                    <MaterialIcons
                      name={category.icon}
                      size={20}
                      color={colors.primaryContrast}
                    />
                  </View>
                  <View style={styles.categoryContent}>
                    <View style={styles.categoryTop}>
                      <Text style={styles.categoryName} numberOfLines={1}>
                        {category.name}
                      </Text>
                      <Text style={styles.categoryValue} numberOfLines={1}>
                        {formatCurrency(category.total)}
                      </Text>
                    </View>
                    <View style={styles.track}>
                      <View
                        style={[
                          styles.bar,
                          {
                            width: `${percent}%`,
                            backgroundColor: category.background,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 108,
    gap: 16,
  },
  overview: {
    minHeight: 126,
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    backgroundColor: colors.primaryText,
  },
  overviewLabel: {
    color: colors.primaryContrast,
    opacity: 0.8,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  overviewValue: {
    color: colors.primaryContrast,
    fontSize: 32,
    fontWeight: "900",
  },
  overviewValueNegative: {
    color: "#FFDDE4",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "800",
  },
  sectionMeta: {
    minWidth: 28,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: "hidden",
    color: colors.primaryDark,
    backgroundColor: colors.primarySoft,
    textAlign: "center",
    fontWeight: "800",
  },
  chartList: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 16,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryContent: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  categoryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  categoryName: {
    flex: 1,
    color: colors.primaryText,
    fontSize: 14,
    fontWeight: "800",
  },
  categoryValue: {
    color: colors.negativeText,
    fontSize: 13,
    fontWeight: "800",
  },
  track: {
    height: 9,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.background,
  },
  bar: {
    height: "100%",
    borderRadius: 8,
  },
  emptyBox: {
    borderRadius: 8,
    padding: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    color: colors.secondaryText,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});
