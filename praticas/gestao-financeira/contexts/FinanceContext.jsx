import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultCategories } from "../constants/defaultCategories";
import { financeApi } from "../services/api";
import { calculateTotals } from "../utils/finance";

const FinanceContext = createContext(null);

function normalizeCategory(category) {
  return {
    ...category,
    id: category.id ?? category.name,
    isIncome: Boolean(category.isIncome),
  };
}

function normalizeTransaction(transaction) {
  return {
    ...transaction,
    value: Number(transaction.value) || 0,
    category: transaction.category
      ? normalizeCategory(transaction.category)
      : transaction.category,
  };
}

async function createDefaultCategories() {
  const created = [];

  for (const category of defaultCategories) {
    const saved = await financeApi.createCategory(category);
    created.push(saved);
  }

  return created;
}

export function FinanceProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadFinanceData = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      let nextCategories = await financeApi.getCategories();

      if (nextCategories.length === 0) {
        nextCategories = await createDefaultCategories();
      }

      const nextTransactions = await financeApi.getTransactions();

      setCategories(nextCategories.map(normalizeCategory));
      setTransactions(nextTransactions.map(normalizeTransaction));
    } catch (err) {
      setError(
        `${err.message}. Confira se a API esta rodando e se o EXPO_PUBLIC_API_URL esta correto.`
      );
      setCategories(defaultCategories.map(normalizeCategory));
      setTransactions([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const createTransaction = useCallback(async (transaction) => {
    setSaving(true);
    setError(null);

    try {
      const created = await financeApi.createTransaction(transaction);
      setTransactions((current) => [normalizeTransaction(created), ...current]);
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    setError(null);
    await financeApi.deleteTransaction(id);
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id)
    );
  }, []);

  useEffect(() => {
    loadFinanceData();
  }, [loadFinanceData]);

  const totals = useMemo(() => calculateTotals(transactions), [transactions]);

  const value = useMemo(
    () => ({
      categories,
      transactions,
      totals,
      loading,
      refreshing,
      saving,
      error,
      loadFinanceData,
      createTransaction,
      deleteTransaction,
    }),
    [
      categories,
      transactions,
      totals,
      loading,
      refreshing,
      saving,
      error,
      loadFinanceData,
      createTransaction,
      deleteTransaction,
    ]
  );

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance deve ser usado dentro de FinanceProvider");
  }

  return context;
}
