import { useContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, TransactionType, TransactionCategory, FinanceSummary } from '@/types/finance';

const STORAGE_KEY = 'financeflow_transactions';

interface FinancesContextType {
  transactions: Transaction[];
  summary: FinanceSummary;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp' | 'createdAt'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getTransactionsByPeriod: (startDate: string, endDate: string) => Transaction[];
  refreshTransactions: () => Promise<void>;
  isLoading: boolean;
}

let transactionsCache: Transaction[] = [];
let summaryCache: FinanceSummary = {
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  expensesByCategory: {
    salary: 0,
    food: 0,
    transport: 0,
    health: 0,
    entertainment: 0,
    utilities: 0,
    shopping: 0,
    investment: 0,
    other: 0,
  },
};

/**
 * Calcula o resumo de finanças a partir das transações
 */
function calculateSummary(transactions: Transaction[]): FinanceSummary {
  const summary: FinanceSummary = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    expensesByCategory: {
      salary: 0,
      food: 0,
      transport: 0,
      health: 0,
      entertainment: 0,
      utilities: 0,
      shopping: 0,
      investment: 0,
      other: 0,
    },
  };

  transactions.forEach((tx) => {
    if (tx.type === 'income') {
      summary.totalIncome += tx.amount;
    } else {
      summary.totalExpense += tx.amount;
      summary.expensesByCategory[tx.category] = (summary.expensesByCategory[tx.category] || 0) + tx.amount;
    }
  });

  summary.balance = summary.totalIncome - summary.totalExpense;
  return summary;
}

/**
 * Carrega transações do AsyncStorage
 */
async function loadTransactions(): Promise<Transaction[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar transações:', error);
    return [];
  }
}

/**
 * Salva transações no AsyncStorage
 */
async function saveTransactions(transactions: Transaction[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    transactionsCache = transactions;
    summaryCache = calculateSummary(transactions);
  } catch (error) {
    console.error('Erro ao salvar transações:', error);
  }
}

/**
 * Hook para gerenciar finanças
 */
export function useFinances(): FinancesContextType {
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsCache);
  const [summary, setSummary] = useState<FinanceSummary>(summaryCache);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega transações ao inicializar
  useEffect(() => {
    const initializeTransactions = async () => {
      setIsLoading(true);
      const loaded = await loadTransactions();
      setTransactions(loaded);
      setSummary(calculateSummary(loaded));
      setIsLoading(false);
    };

    initializeTransactions();
  }, []);

  const addTransaction = useCallback(
    async (transaction: Omit<Transaction, 'id' | 'timestamp' | 'createdAt'>) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now().toString(),
        timestamp: new Date(transaction.date).getTime(),
        createdAt: Date.now(),
      };

      const updated = [newTransaction, ...transactions];
      setTransactions(updated);
      setSummary(calculateSummary(updated));
      await saveTransactions(updated);
    },
    [transactions]
  );

  const updateTransaction = useCallback(
    async (id: string, updates: Partial<Transaction>) => {
      const updated = transactions.map((tx) =>
        tx.id === id
          ? {
              ...tx,
              ...updates,
              timestamp: updates.date ? new Date(updates.date).getTime() : tx.timestamp,
            }
          : tx
      );

      setTransactions(updated);
      setSummary(calculateSummary(updated));
      await saveTransactions(updated);
    },
    [transactions]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      const updated = transactions.filter((tx) => tx.id !== id);
      setTransactions(updated);
      setSummary(calculateSummary(updated));
      await saveTransactions(updated);
    },
    [transactions]
  );

  const getTransactionsByPeriod = useCallback(
    (startDate: string, endDate: string): Transaction[] => {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      return transactions.filter((tx) => tx.timestamp >= start && tx.timestamp <= end);
    },
    [transactions]
  );

  const refreshTransactions = useCallback(async () => {
    const loaded = await loadTransactions();
    setTransactions(loaded);
    setSummary(calculateSummary(loaded));
  }, []);

  return {
    transactions,
    summary,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByPeriod,
    refreshTransactions,
    isLoading,
  };
}

export type { FinancesContextType };
