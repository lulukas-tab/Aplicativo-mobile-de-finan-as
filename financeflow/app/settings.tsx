import { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '@/lib/theme-provider';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { colorScheme: themeColorScheme, setColorScheme } = useThemeContext();
  const [isDarkMode, setIsDarkMode] = useState(themeColorScheme === 'dark');

  const handleClearData = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const confirmed = typeof window !== 'undefined'
      ? confirm('Tem certeza que deseja deletar TODAS as transações? Esta ação não pode ser desfeita.')
      : true;

    if (confirmed) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        await AsyncStorage.removeItem('financeflow_transactions');
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        if (typeof window !== 'undefined') {
          alert('✅ Todos os dados foram deletados com sucesso!');
        }
        router.back();
      } catch (error) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if (typeof window !== 'undefined') {
          alert('❌ Erro ao deletar os dados');
        }
      }
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-6">
          {/* Cabeçalho */}
          <View className="flex-row items-center gap-4">
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.back();
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
            >
              <IconSymbol name="chevron.left" size={24} color="#0a7ea4" />
            </Pressable>
            <Text className="text-2xl font-bold text-foreground flex-1">Configurações</Text>
          </View>

          {/* Seção de Aparência */}
          <View className="gap-3">
            <Text className="text-foreground font-bold text-lg">Aparência</Text>
            <View className="bg-surface rounded-lg border border-border p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <IconSymbol name="moon.stars" size={20} color="#0a7ea4" />
                <Text className="text-foreground font-semibold">Modo Escuro</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={(value) => {
                  setIsDarkMode(value);
                  setColorScheme(value ? 'dark' : 'light');
                }}
                trackColor={{ false: '#e5e7eb', true: '#0a7ea4' }}
                thumbColor="#ffffff"
              />
            </View>
          </View>

          {/* Seção de Dados */}
          <View className="gap-3">
            <Text className="text-foreground font-bold text-lg">Dados</Text>
            <Pressable
              onPress={handleClearData}
              style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
            >
              <View className="bg-surface rounded-lg border border-error p-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <IconSymbol name="trash" size={20} color="#EF4444" />
                  <Text className="text-error font-semibold">Limpar Todos os Dados</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color="#EF4444" />
              </View>
            </Pressable>
          </View>

          {/* Seção de Sobre */}
          <View className="gap-3">
            <Text className="text-foreground font-bold text-lg">Sobre</Text>
            <View className="bg-surface rounded-lg border border-border p-4 gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground font-semibold">Versão</Text>
                <Text className="text-muted">1.0.0</Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row items-center justify-between">
                <Text className="text-foreground font-semibold">Desenvolvido por</Text>
                <Text className="text-muted">Lucas</Text>
              </View>
            </View>
          </View>

          {/* Nota */}
          <View className="bg-warning/10 rounded-lg p-4 border border-warning">
            <Text className="text-warning font-semibold text-sm">
              💡 Dica: Seus dados são salvos localmente no seu dispositivo e não são sincronizados com nuvem.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
