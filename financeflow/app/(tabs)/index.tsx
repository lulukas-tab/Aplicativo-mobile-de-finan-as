import { ScrollView, Text, View, Pressable, RefreshControl, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionCard } from '@/components/TransactionCard';
import { useFinances } from '@/hooks/useFinances';
import { IconSymbol } from '@/components/ui/icon-symbol';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  const { transactions, summary, isLoading, refreshTransactions } = useFinances();
  const [refreshing, setRefreshing] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Últimas 5 transações
  const recentTransactions = transactions.slice(0, 5);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await refreshTransactions();
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Carregando...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#0a7ea4"
          />
        }
      >
        <View className="gap-6 pb-20">
          {/* Cabeçalho */}
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-foreground">FinanceFlow</Text>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/settings');
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
            >
              <IconSymbol name="gear" size={24} color="#0a7ea4" />
            </Pressable>
          </View>

          {/* Resumo de Finanças */}
          <SummaryCard summary={summary} />

          {/* Seção de Transações Recentes */}
          <View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-foreground">Transações Recentes</Text>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push('/transactions');
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Text className="text-primary font-semibold text-sm">Ver Tudo</Text>
              </Pressable>
            </View>

            {recentTransactions.length > 0 ? (
              <View>
                {recentTransactions.map((transaction) => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
              </View>
            ) : (
              <View className="bg-surface rounded-lg p-6 items-center">
                <Text className="text-muted text-center">Nenhuma transação registrada ainda.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Botão Flutuante para Adicionar Transação */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: '#0a7ea4',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ scale: scaleAnim }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push('/add-transaction');
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          <IconSymbol name="plus" size={28} color="#ffffff" />
        </Pressable>
      </Animated.View>
    </ScreenContainer>
  );
}
