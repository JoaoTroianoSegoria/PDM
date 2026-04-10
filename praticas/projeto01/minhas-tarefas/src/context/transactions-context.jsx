import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { summarizeTransactions } from "../utils/finance";

const STORAGE_KEY = "@projeto01:transactions";

const TransactionsContext = createContext(null);

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const storedTransactions = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.warn("Não foi possível carregar as transações salvas.", error);
      } finally {
        setIsHydrated(true);
      }
    }

    loadTransactions();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)).catch(
      (error) => {
        console.warn("Não foi possível salvar as transações.", error);
      }
    );
  }, [isHydrated, transactions]);

  function addTransaction(transaction) {
    setTransactions((current) => [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        ...transaction,
      },
      ...current,
    ]);
  }

  function removeTransaction(id) {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id)
    );
  }

  const value = useMemo(
    () => ({
      addTransaction,
      isHydrated,
      removeTransaction,
      summary: summarizeTransactions(transactions),
      transactions,
    }),
    [isHydrated, transactions]
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("useTransactions precisa ser usado dentro de TransactionsProvider.");
  }

  return context;
}
