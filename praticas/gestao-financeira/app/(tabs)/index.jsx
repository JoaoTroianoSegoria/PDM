import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatPill } from "../../components/StatPill";
import { TransactionCard } from "../../components/TransactionCard";
import { colors } from "../../constants/colors";
import { useFinance } from "../../contexts/FinanceContext";
import { formatCurrency } from "../../utils/currency";

export default function Transactions() {
  const {
    deleteTransaction,
    error,
    loadFinanceData,
    loading,
    refreshing,
    totals,
    transactions,
  } = useFinance();

  async function handleDelete(id) {
    await deleteTransaction(id);
  }

  function renderHeader() {
    return (
      <View style={styles.headerContent}>
        <View style={styles.balancePanel}>
          <Text style={styles.balanceLabel}>Saldo atual</Text>
          <Text
            style={[
              styles.balanceValue,
              totals.balance < 0 && styles.balanceValueNegative,
            ]}
            numberOfLines={1}
          >
            {formatCurrency(totals.balance)}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatPill
            color={colors.positiveText}
            icon="trending-up"
            label="Entradas"
            value={formatCurrency(totals.income)}
          />
          <StatPill
            color={colors.negativeText}
            icon="trending-down"
            label="Saidas"
            value={formatCurrency(totals.expenses)}
          />
        </View>

        {error ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => loadFinanceData()}
            style={styles.errorBox}
          >
            <MaterialIcons name="sync-problem" size={20} color={colors.warning} />
            <Text style={styles.errorText}>{error}</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Lancamentos</Text>
          <Text style={styles.sectionCount}>{transactions.length}</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <SafeAreaView edges={["bottom"]} style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={transactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <MaterialIcons name="receipt-long" size={36} color={colors.inactive} />
            <Text style={styles.emptyTitle}>Nenhum lancamento</Text>
            <Text style={styles.emptyText}>
              Use o botao central para cadastrar sua primeira transacao.
            </Text>
          </View>
        }
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={refreshing}
            onRefresh={() => loadFinanceData({ silent: true })}
          />
        }
        renderItem={({ item }) => (
          <TransactionCard transaction={item} onDelete={handleDelete} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  loadingText: {
    marginTop: 12,
    color: colors.secondaryText,
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
    paddingBottom: 104,
  },
  headerContent: {
    gap: 14,
    marginBottom: 14,
  },
  balancePanel: {
    minHeight: 132,
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  balanceLabel: {
    color: colors.primaryContrast,
    fontSize: 14,
    fontWeight: "700",
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceValue: {
    color: colors.primaryContrast,
    fontSize: 34,
    fontWeight: "900",
  },
  balanceValueNegative: {
    color: "#FFE8EC",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  errorBox: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF9E8",
    borderWidth: 1,
    borderColor: "#F3D78A",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  errorText: {
    flex: 1,
    color: colors.primaryText,
    fontSize: 12,
    lineHeight: 17,
  },
  sectionTitleRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "800",
  },
  sectionCount: {
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
  separator: {
    height: 10,
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
