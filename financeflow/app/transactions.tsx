import { useState, useMemo } from 'react';
import { ScrollView, Text, View, Pressable, SectionList } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { TransactionCard } from '@/components/TransactionCard';
import { useFinances } from '@/hooks/useFinances';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'income' | 'expense';

export default function TransactionsScreen() {
  const router = useRouter();
  const { transactions, deleteTransaction } = useFinances();
  const [filter, setFilter] = useState<FilterType>('all');

  // Filtrar transações
  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((tx) => tx.type === filter);
  }, [transactions, filter]);

  // Agrupar por data
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, typeof transactions> = {};

    filteredTransactions.forEach((tx) => {
      const date = new Date(tx.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let groupKey: string;
      if (date.toDateString() === today.toDateString()) {
        groupKey = 'Hoje';
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = 'Ontem';
      } else if (date.getFullYear() === today.getFullYear()) {
        groupKey = date.toLocaleDateString('pt-BR', { month: 'long', day: 'numeric' });
      } else {
        groupKey = date.toLocaleDateString('pt-BR');
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(tx);
    });

    return Object.entries(groups).map(([title, data]) => ({
      title,
      data,
    }));
  }, [filteredTransactions]);

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
  };

  return (
    <ScreenContainer className="p-4">
      {/* Cabeçalho */}
      <View className="flex-row items-center gap-4 mb-4">
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <IconSymbol name="chevron.left" size={24} color="#0a7ea4" />
        </Pressable>
        <Text className="text-2xl font-bold text-foreground flex-1">Transações</Text>
      </View>

      {/* Filtros */}
      <View className="flex-row gap-2 mb-4">
        {(['all', 'income', 'expense'] as const).map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View
              className={cn(
                'px-4 py-2 rounded-full border',
                filter === f
                  ? 'bg-primary border-primary'
                  : 'bg-surface border-border'
              )}
            >
              <Text
                className={cn(
                  'font-semibold text-sm',
                  filter === f ? 'text-white' : 'text-foreground'
                )}
              >
                {f === 'all' ? 'Todas' : f === 'income' ? 'Receitas' : 'Despesas'}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Lista de Transações */}
      {filteredTransactions.length > 0 ? (
        <SectionList
          sections={groupedTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              transaction={item}
              onPress={() => {
                // TODO: Implementar edição
              }}
              onDelete={() => handleDeleteTransaction(item.id)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="text-foreground font-bold text-base mt-4 mb-2">{title}</Text>
          )}
          scrollEnabled={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted text-center">Nenhuma transação encontrada</Text>
        </View>
      )}
    </ScreenContainer>
  );
}
