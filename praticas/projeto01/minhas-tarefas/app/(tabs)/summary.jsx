import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { EmptyState } from "../../src/components/EmptyState";
import { MetricCard } from "../../src/components/MetricCard";
import { useTransactions } from "../../src/context/transactions-context";
import { formatCurrency } from "../../src/utils/finance";

export default function SummaryScreen() {
  const { isHydrated, summary, transactions } = useTransactions();

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Montando seu resumo...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.title}>Resumo das finanças</Text>
          <Text style={styles.subtitle}>
            Uma leitura rápida do que entrou, saiu e de onde vem o maior peso
            do mês.
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            label="Saldo"
            value={formatCurrency(summary.balance)}
            tone={summary.balance >= 0 ? "positive" : "negative"}
            helper="Resultado atual"
          />
          <MetricCard
            label="Movimentos"
            value={`${summary.totalCount}`}
            tone="neutral"
            helper="Lançamentos totais"
          />
        </View>

        {transactions.length === 0 ? (
          <EmptyState
            title="Sem dados para resumir"
            description="Quando você cadastrar as primeiras transações, o resumo começa a mostrar padrões e categorias."
          />
        ) : (
          <>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Visão geral</Text>

              <View style={styles.row}>
                <Text style={styles.label}>Entradas registradas</Text>
                <Text style={[styles.value, styles.positive]}>
                  {formatCurrency(summary.incomeTotal)}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Saídas registradas</Text>
                <Text style={[styles.value, styles.negative]}>
                  {formatCurrency(summary.expenseTotal)}
                </Text>
              </View>

              <View style={[styles.row, styles.rowHighlight]}>
                <Text style={styles.label}>Categoria com maior gasto</Text>
                <Text style={styles.value}>
                  {summary.largestExpenseCategory
                    ? summary.largestExpenseCategory.label
                    : "Sem despesas ainda"}
                </Text>
              </View>
            </View>

            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Distribuição por categoria</Text>

              {summary.expenseCategories.length === 0 ? (
                <Text style={styles.emptyHint}>
                  Ainda não há despesas categorizadas para comparar.
                </Text>
              ) : (
                <View style={styles.barList}>
                  {summary.expenseCategories.map((category) => {
                    const width = summary.expenseTotal
                      ? `${Math.max(
                          10,
                          Math.round((category.amount / summary.expenseTotal) * 100)
                        )}%`
                      : "0%";

                    return (
                      <View key={category.key} style={styles.barItem}>
                        <View style={styles.barHeader}>
                          <Text style={styles.barLabel}>{category.label}</Text>
                          <Text style={styles.barValue}>
                            {formatCurrency(category.amount)}
                          </Text>
                        </View>

                        <View style={styles.track}>
                          <View
                            style={[
                              styles.fill,
                              { width, backgroundColor: category.color },
                            ]}
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>

            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Leitura rápida</Text>

              <Text style={styles.insight}>
                {summary.balance >= 0
                  ? "Seu saldo ainda está positivo. Se quiser apertar o controle, olhe primeiro para a categoria que mais pesa."
                  : "As saídas já passaram das entradas. Vale revisar as maiores categorias antes do próximo gasto."}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    gap: 18,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  hero: {
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.secondaryText,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  panel: {
    padding: 18,
    borderRadius: 24,
    backgroundColor: colors.surface,
    gap: 14,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryText,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  rowHighlight: {
    marginTop: 8,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  label: {
    flex: 1,
    color: colors.secondaryText,
    fontSize: 15,
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryText,
    textAlign: "right",
  },
  positive: {
    color: colors.positiveText,
  },
  negative: {
    color: colors.negativeText,
  },
  emptyHint: {
    color: colors.secondaryText,
    lineHeight: 22,
  },
  barList: {
    gap: 14,
  },
  barItem: {
    gap: 8,
  },
  barHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  barLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
  },
  barValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.secondaryText,
  },
  track: {
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
  insight: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.primaryText,
  },
});
