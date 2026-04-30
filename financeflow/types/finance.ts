/**
 * Tipos de transação (Receita ou Despesa)
 */
export type TransactionType = 'income' | 'expense';

/**
 * Categorias disponíveis para transações
 */
export type TransactionCategory = 
  | 'salary'      // Salário
  | 'food'        // Alimentação
  | 'transport'   // Transporte
  | 'health'      // Saúde
  | 'entertainment' // Lazer
  | 'utilities'   // Utilidades/Contas
  | 'shopping'    // Compras
  | 'investment'  // Investimento
  | 'other';      // Outro

/**
 * Interface para uma transação
 */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: string; // ISO 8601 format (YYYY-MM-DD)
  timestamp: number; // Unix timestamp para ordenação
  createdAt: number;
}

/**
 * Interface para resumo de finanças
 */
export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expensesByCategory: Record<TransactionCategory, number>;
}

/**
 * Mapeamento de categorias para ícones e nomes
 */
export const CATEGORY_CONFIG: Record<TransactionCategory, { name: string; icon: string; color: string }> = {
  salary: { name: 'Salário', icon: 'briefcase.fill', color: '#22C55E' },
  food: { name: 'Alimentação', icon: 'fork.knife', color: '#F59E0B' },
  transport: { name: 'Transporte', icon: 'car.fill', color: '#3B82F6' },
  health: { name: 'Saúde', icon: 'heart.fill', color: '#EF4444' },
  entertainment: { name: 'Lazer', icon: 'gamecontroller.fill', color: '#8B5CF6' },
  utilities: { name: 'Contas', icon: 'lightbulb.fill', color: '#F97316' },
  shopping: { name: 'Compras', icon: 'bag.fill', color: '#EC4899' },
  investment: { name: 'Investimento', icon: 'chart.line.uptrend.xyaxis', color: '#06B6D4' },
  other: { name: 'Outro', icon: 'ellipsis', color: '#6B7280' },
};
