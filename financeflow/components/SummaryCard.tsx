import { View, Text } from 'react-native';
import { FinanceSummary } from '@/types/finance';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface SummaryCardProps {
  summary: FinanceSummary;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const balanceColor = summary.balance >= 0 ? 'text-success' : 'text-error';

  return (
    <View className="gap-4">
      {/* Saldo Total */}
      <View className="bg-primary rounded-2xl p-6 items-center">
        <Text className="text-background text-sm font-semibold mb-2">Saldo Total</Text>
        <Text className="text-background text-4xl font-bold">
          R$ {summary.balance.toFixed(2)}
        </Text>
      </View>

      {/* Receitas e Despesas */}
      <View className="flex-row gap-3">
        {/* Card Receitas */}
        <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-8 h-8 rounded-full bg-success/20 items-center justify-center">
              <IconSymbol name="arrow.down.left" size={16} color="#22C55E" />
            </View>
            <Text className="text-muted text-xs font-semibold">Receitas</Text>
          </View>
          <Text className="text-success font-bold text-lg">
            R$ {summary.totalIncome.toFixed(2)}
          </Text>
        </View>

        {/* Card Despesas */}
        <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-8 h-8 rounded-full bg-error/20 items-center justify-center">
              <IconSymbol name="arrow.up.right" size={16} color="#EF4444" />
            </View>
            <Text className="text-muted text-xs font-semibold">Despesas</Text>
          </View>
          <Text className="text-error font-bold text-lg">
            R$ {summary.totalExpense.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
