# FinanceFlow - Design da Interface Mobile

## Visão Geral
FinanceFlow é um gerenciador de finanças pessoais desenvolvido para iOS/Android, permitindo que os usuários rastreiem receitas e despesas de forma simples e intuitiva. O design segue as diretrizes do Apple Human Interface Guidelines (HIG), com foco em usabilidade de uma mão e orientação retrato (9:16).

## Paleta de Cores
- **Primária:** `#0a7ea4` (Azul profissional)
- **Fundo:** `#ffffff` (Claro) / `#151718` (Escuro)
- **Superfície:** `#f5f5f5` (Claro) / `#1e2022` (Escuro)
- **Sucesso:** `#22C55E` (Verde)
- **Aviso:** `#F59E0B` (Laranja)
- **Erro:** `#EF4444` (Vermelho)

## Telas Principais

### 1. **Home (Dashboard)**
**Funcionalidade:** Resumo visual das finanças do mês atual.

**Conteúdo:**
- Saldo total em destaque no topo (grande, em azul primário)
- Dois cards lado a lado:
  - **Receitas:** Valor total com ícone de entrada (verde)
  - **Despesas:** Valor total com ícone de saída (vermelho)
- Gráfico de pizza ou barras mostrando despesas por categoria
- Lista das últimas 5 transações com ícone de categoria, descrição, valor e data
- Botão flutuante (FAB) para adicionar nova transação

**Fluxo:** Usuário vê resumo → Pode clicar em transação para detalhes → Pode adicionar nova transação via FAB

---

### 2. **Adicionar/Editar Transação**
**Funcionalidade:** Formulário para registrar nova receita ou despesa.

**Conteúdo:**
- Segmentador (Receita/Despesa) no topo
- Campo de valor (grande, com teclado numérico)
- Seletor de categoria (ícones com nomes: Alimentação, Transporte, Saúde, Lazer, Salário, etc.)
- Campo de descrição (opcional, texto curto)
- Seletor de data (com calendário)
- Botão "Salvar" (primário) e "Cancelar"

**Fluxo:** Usuário preenche dados → Clica salvar → Volta ao Dashboard → Transação aparece na lista

---

### 3. **Listagem de Transações**
**Funcionalidade:** Visualizar todas as transações com filtros.

**Conteúdo:**
- Abas ou filtros para: Todas, Receitas, Despesas
- Seletor de período (Este mês, Últimos 30 dias, Personalizado)
- Lista de transações agrupadas por data (hoje, ontem, semana passada, etc.)
- Cada item mostra: ícone de categoria, descrição, valor (cor verde/vermelho), data
- Swipe para deletar (com confirmação)
- Tap para editar

**Fluxo:** Usuário filtra transações → Pode editar/deletar → Volta ao Dashboard

---

### 4. **Configurações** (Opcional, mas recomendado)
**Funcionalidade:** Gerenciar preferências do app.

**Conteúdo:**
- Toggle para modo escuro/claro
- Seletor de moeda (R$, US$, EUR, etc.)
- Limpar dados (com confirmação)
- Sobre o app

**Fluxo:** Usuário acessa via menu → Altera preferências → Mudanças aplicadas imediatamente

---

## Fluxo de Usuário Principal

1. **Abrir App** → Dashboard com saldo e últimas transações
2. **Adicionar Transação** → FAB → Preencher formulário → Salvar → Volta ao Dashboard
3. **Ver Histórico** → Aba de Transações → Filtrar por período/tipo → Editar/Deletar
4. **Configurações** → Ajustar preferências → Voltar

---

## Componentes Reutilizáveis

| Componente | Uso |
|-----------|-----|
| **TransactionCard** | Exibe uma transação com ícone, descrição, valor e data |
| **CategoryIcon** | Ícone da categoria (Alimentação, Transporte, etc.) |
| **SummaryCard** | Card de resumo (Receitas/Despesas/Saldo) |
| **SegmentedControl** | Seletor Receita/Despesa ou Todas/Receitas/Despesas |
| **FloatingActionButton** | Botão para adicionar transação |
| **MonthSelector** | Seletor de período (mês/ano) |

---

## Considerações de UX

- **Acessibilidade:** Tamanhos de toque mínimos de 44x44pt
- **Uma mão:** Elementos interativos no terço inferior da tela
- **Feedback:** Haptic feedback ao adicionar/deletar transação
- **Persistência:** Dados salvos localmente (AsyncStorage)
- **Dark Mode:** Suporte completo com transição suave
- **Responsividade:** Funciona em phones (375px) até tablets (768px+)

---

## Próximas Fases (Futuro)

- [ ] Sincronização com cloud (Firebase/Backend)
- [ ] Autenticação de usuário
- [ ] Metas de gastos com alertas
- [ ] Exportar relatórios (PDF/CSV)
- [ ] Notificações de gastos excessivos
