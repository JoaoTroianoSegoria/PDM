import { useMemo } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { EmptyState } from "../../src/components/EmptyState";
import { MetricCard } from "../../src/components/MetricCard";
import { TransactionCard } from "../../src/components/TransactionCard";
import { useTransactions } from "../../src/context/transactions-context";
import { formatCurrency } from "../../src/utils/finance";

export default function TransactionsScreen() {
  const router = useRouter();
  const { isHydrated, removeTransaction, summary, transactions } =
    useTransactions();

  const recentTransactions = useMemo(
    () => transactions.slice(0, 6),
    [transactions]
  );

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando suas movimentações...</Text>
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
          <View style={styles.heroText}>
            <Text style={styles.eyebrow}>Painel financeiro</Text>
            <Text style={styles.title}>Controle tudo sem sair do app.</Text>
            <Text style={styles.subtitle}>
              Veja o saldo atual, acompanhe as últimas transações e entre no
              resumo com um toque.
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/add-transactions")}
            style={styles.quickAction}
          >
            <MaterialIcons
              name="add-chart"
              size={22}
              color={colors.primaryContrast}
            />
          </Pressable>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponível</Text>
          <Text style={styles.balanceValue}>
            {formatCurrency(summary.balance)}
          </Text>

          <View style={styles.balanceMeta}>
            <View style={styles.balancePill}>
              <MaterialIcons name="south-west" size={16} color={colors.primary} />
              <Text style={styles.balancePillText}>
                Entradas: {formatCurrency(summary.incomeTotal)}
              </Text>
            </View>

            <View style={styles.balancePill}>
              <MaterialIcons
                name="north-east"
                size={16}
                color={colors.negativeText}
              />
              <Text style={styles.balancePillText}>
                Saídas: {formatCurrency(summary.expenseTotal)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard
            label="Receitas"
            value={formatCurrency(summary.incomeTotal)}
            tone="positive"
            helper={`${summary.incomeCount} lançamento(s)`}
          />
          <MetricCard
            label="Despesas"
            value={formatCurrency(summary.expenseTotal)}
            tone="negative"
            helper={`${summary.expenseCount} lançamento(s)`}
          />
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Últimas movimentações</Text>
            <Text style={styles.sectionSubtitle}>
              {transactions.length === 0
                ? "Seu histórico ainda está vazio."
                : `${transactions.length} lançamento(s) salvo(s)`}
            </Text>
          </View>

          <Pressable onPress={() => router.push("/summary")}>
            <Text style={styles.linkText}>Ver resumo</Text>
          </Pressable>
        </View>

        {recentTransactions.length === 0 ? (
          <EmptyState
            title="Nenhuma transação por aqui"
            description="Adicione sua primeira entrada ou despesa para ver o painel ganhar vida."
            actionLabel="Adicionar agora"
            onPress={() => router.push("/add-transactions")}
          />
        ) : (
          <View style={styles.transactionList}>
            {recentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onDelete={() => removeTransaction(transaction.id)}
              />
            ))}
          </View>
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
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  hero: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  heroText: {
    flex: 1,
    gap: 6,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.primary,
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
  quickAction: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  balanceCard: {
    padding: 20,
    borderRadius: 28,
    backgroundColor: colors.primaryText,
    gap: 14,
  },
  balanceLabel: {
    fontSize: 15,
    color: "rgba(255,255,255,0.72)",
  },
  balanceValue: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.primaryContrast,
  },
  balanceMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  balancePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  balancePillText: {
    color: colors.primaryContrast,
    fontSize: 13,
    fontWeight: "600",
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryText,
  },
  sectionSubtitle: {
    marginTop: 4,
    color: colors.secondaryText,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  transactionList: {
    gap: 12,
    paddingBottom: 12,
  },
});
