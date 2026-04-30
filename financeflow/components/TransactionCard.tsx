import { View, Text, Pressable } from 'react-native';
import { Transaction, CATEGORY_CONFIG } from '@/types/finance';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { cn } from '@/lib/utils';

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
  onDelete?: () => void;
}

export function TransactionCard({ transaction, onPress, onDelete }: TransactionCardProps) {
  const category = CATEGORY_CONFIG[transaction.category];
  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? 'text-success' : 'text-error';
  const amountSign = isIncome ? '+' : '-';

  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="flex-row items-center gap-3 bg-surface rounded-lg p-4 mb-2 border border-border">
        {/* Ícone da categoria */}
        <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: category.color + '20' }}>
          <IconSymbol name={category.icon as any} size={24} color={category.color} />
        </View>

        {/* Informações da transação */}
        <View className="flex-1">
          <Text className="text-foreground font-semibold text-base">{transaction.description || category.name}</Text>
          <Text className="text-muted text-sm">{category.name}</Text>
        </View>

        {/* Valor e data */}
        <View className="items-end">
          <Text className={cn('font-bold text-base', amountColor)}>
            {amountSign}R$ {transaction.amount.toFixed(2)}
          </Text>
          <Text className="text-muted text-xs">{formattedDate}</Text>
        </View>
      </View>
    </Pressable>
  );
}
