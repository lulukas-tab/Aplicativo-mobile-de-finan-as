import { useState } from 'react';
import { ScrollView, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useFinances } from '@/hooks/useFinances';
import { CATEGORY_CONFIG, TransactionCategory, TransactionType } from '@/types/finance';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { cn } from '@/lib/utils';

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useFinances();

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTransaction = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    try {
      setIsLoading(true);
      await addTransaction({
        type,
        amount: parseFloat(amount),
        category,
        description: description || CATEGORY_CONFIG[category].name,
        date,
      });
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a transação');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Object.entries(CATEGORY_CONFIG).map(([key, value]) => ({
    key: key as TransactionCategory,
    ...value,
  }));

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-6">
          {/* Cabeçalho */}
          <View className="flex-row items-center gap-4">
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <IconSymbol name="chevron.left" size={24} color="#0a7ea4" />
            </Pressable>
            <Text className="text-2xl font-bold text-foreground flex-1">Nova Transação</Text>
          </View>

          {/* Segmentador Receita/Despesa */}
          <View className="flex-row gap-3 bg-surface rounded-lg p-1 border border-border">
            {(['expense', 'income'] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setType(t)}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 6,
                    backgroundColor: type === t ? '#0a7ea4' : 'transparent',
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text
                  className={cn(
                    'text-center font-semibold',
                    type === t ? 'text-white' : 'text-foreground'
                  )}
                >
                  {t === 'expense' ? 'Despesa' : 'Receita'}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Campo de Valor */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold">Valor</Text>
            <View className="flex-row items-center bg-surface rounded-lg border border-border px-4 py-3">
              <Text className="text-foreground font-semibold text-lg">R$</Text>
              <TextInput
                placeholder="0,00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                className="flex-1 ml-2 text-foreground text-lg"
                placeholderTextColor="#9BA1A6"
              />
            </View>
          </View>

          {/* Seletor de Categoria */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold">Categoria</Text>
            <View className="flex-row flex-wrap gap-2">
              {categories.map((cat) => (
                <Pressable
                  key={cat.key}
                  onPress={() => setCategory(cat.key)}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <View
                    className={cn(
                      'flex-row items-center gap-2 px-3 py-2 rounded-lg border',
                      category === cat.key
                        ? 'bg-primary border-primary'
                        : 'bg-surface border-border'
                    )}
                  >
                    <IconSymbol
                      name={cat.icon as any}
                      size={16}
                      color={category === cat.key ? '#ffffff' : cat.color}
                    />
                    <Text
                      className={cn(
                        'text-sm font-semibold',
                        category === cat.key ? 'text-white' : 'text-foreground'
                      )}
                    >
                      {cat.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Campo de Descrição */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold">Descrição (Opcional)</Text>
            <TextInput
              placeholder="Adicione uma descrição"
              value={description}
              onChangeText={setDescription}
              className="bg-surface rounded-lg border border-border px-4 py-3 text-foreground"
              placeholderTextColor="#9BA1A6"
            />
          </View>

          {/* Seletor de Data */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold">Data</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="bg-surface rounded-lg border border-border px-4 py-3 flex-row items-center justify-between">
                <Text className="text-foreground">{new Date(date).toLocaleDateString('pt-BR')}</Text>
                <IconSymbol name="calendar" size={20} color="#0a7ea4" />
              </View>
            </Pressable>
          </View>

          {/* Botões de Ação */}
          <View className="flex-row gap-3 mt-4">
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
              className="flex-1"
            >
              <View className="bg-surface rounded-lg border border-border py-3 items-center">
                <Text className="text-foreground font-semibold">Cancelar</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handleAddTransaction}
              disabled={isLoading}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
              className="flex-1"
            >
              <View className="bg-primary rounded-lg py-3 items-center">
                <Text className="text-white font-semibold">
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
