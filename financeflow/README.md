# FinanceFlow - Gerenciador de Finanças Pessoais

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📱 Sobre o Projeto

**FinanceFlow** é um aplicativo mobile de gerenciamento de finanças pessoais desenvolvido como trabalho acadêmico da disciplina de **Programação para Dispositivos Móveis** do curso de **Ciência da Computação**.

O aplicativo permite que usuários registrem, visualizem e gerenciem suas transações financeiras (receitas e despesas) de forma intuitiva e eficiente, com armazenamento local de dados e interface responsiva para dispositivos Android e iOS.

### 🎯 Objetivos Acadêmicos

Este projeto foi desenvolvido com o objetivo de demonstrar:

- **Desenvolvimento Mobile Multiplataforma:** Utilização de React Native e Expo para criar aplicações que funcionam em iOS e Android
- **Gerenciamento de Estado:** Implementação de hooks customizados (useFinances) para gerenciar estado global da aplicação
- **Persistência de Dados:** Uso de AsyncStorage para armazenamento local de dados no dispositivo
- **Design Responsivo:** Interface adaptada para diferentes tamanhos de tela seguindo as diretrizes de design iOS (Apple HIG)
- **Boas Práticas de Código:** Estrutura modular, tipagem com TypeScript e componentes reutilizáveis
- **Estilização Moderna:** Tailwind CSS (NativeWind) para estilização consistente e eficiente

---

## ✨ Funcionalidades Principais

### 1. **Dashboard Intuitivo**
- Exibição do saldo total em tempo real
- Resumo de receitas e despesas do período
- Últimas 5 transações registradas
- Pull-to-refresh para atualizar dados

### 2. **Adicionar Transações**
- Formulário completo com validação
- Seleção de tipo (Receita ou Despesa)
- Categorias pré-definidas com ícones
- Seletor de data integrado
- Campo de descrição para detalhes

### 3. **Listagem de Transações**
- Visualização completa de todas as transações
- Filtros por tipo (Todas, Receitas, Despesas)
- Agrupamento automático por data
- Exclusão de transações com confirmação
- Seletor de período para análise

### 4. **Configurações**
- Toggle de modo escuro/claro
- Opção para limpar todos os dados
- Informações da aplicação
- Créditos de desenvolvimento

### 5. **Feedback Visual**
- Animações suaves em interações
- Feedback haptic (vibração) em botões
- Indicadores de carregamento
- Mensagens de sucesso/erro

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React Native** | 0.81.5 | Framework mobile |
| **Expo** | 54.0 | Plataforma de desenvolvimento |
| **TypeScript** | 5.9 | Tipagem estática |
| **React** | 19.1.0 | Biblioteca de UI |
| **Expo Router** | 6.0 | Navegação entre telas |
| **NativeWind** | 4.2.1 | Tailwind CSS para React Native |
| **AsyncStorage** | 2.2.0 | Armazenamento local |
| **Expo Haptics** | 15.0.8 | Feedback haptic |
| **Expo Icons** | 15.0.3 | Ícones vetoriais |

---

## 📁 Estrutura do Projeto

```
financeflow/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Configuração da barra de abas
│   │   ├── index.tsx            # Tela Home (Dashboard)
│   │   └── settings.tsx         # Tela de Configurações
│   ├── add-transaction.tsx      # Tela de Adicionar Transação
│   ├── transactions.tsx         # Tela de Listagem de Transações
│   └── _layout.tsx              # Layout raiz
├── components/
│   ├── screen-container.tsx     # Container com SafeArea
│   ├── TransactionCard.tsx      # Card de transação
│   ├── SummaryCard.tsx          # Card de resumo financeiro
│   ├── haptic-tab.tsx           # Tab com feedback haptic
│   └── ui/
│       └── icon-symbol.tsx      # Mapeamento de ícones
├── hooks/
│   ├── useFinances.ts           # Hook de gerenciamento de finanças
│   ├── use-colors.ts            # Hook de cores do tema
│   └── use-color-scheme.ts      # Hook de detecção de tema
├── types/
│   └── finance.ts               # Tipos TypeScript
├── lib/
│   ├── theme-provider.tsx       # Provider de tema
│   ├── utils.ts                 # Funções utilitárias
│   └── _core/
│       └── theme.ts             # Configuração de tema
├── assets/
│   └── images/                  # Ícones e splash screen
├── app.config.ts                # Configuração do Expo
├── tailwind.config.js           # Configuração do Tailwind
└── package.json                 # Dependências do projeto
```

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** 18+ e **npm** ou **pnpm**
- **Expo CLI** instalado globalmente: `npm install -g expo-cli`
- **Expo Go** instalado no celular (disponível na App Store ou Google Play)

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/financeflow.git
   cd financeflow
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   # ou
   npm run dev
   ```

4. **Escaneie o QR code:**
   - Abra o **Expo Go** no seu celular
   - Clique em "Scan QR Code"
   - Aponte a câmera para o QR code exibido no terminal
   - O app será carregado automaticamente

### Executar em Plataformas Específicas

```bash
# iOS (macOS apenas)
pnpm ios

# Android
pnpm android

# Web
pnpm web
```

---

## 📦 Compilação para Produção

### Gerar APK (Android)

```bash
eas build --platform android --local
```

### Gerar IPA (iOS)

```bash
eas build --platform ios --local
```

> **Nota:** Requer configuração adicional com Expo Application Services (EAS)

---

## 💾 Persistência de Dados

O aplicativo utiliza **AsyncStorage** para armazenar transações localmente no dispositivo. Os dados são salvos automaticamente após cada ação e carregados ao iniciar o app.

**Estrutura de dados armazenada:**

```typescript
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: TransactionCategory;
  description: string;
  date: string;
  timestamp: number;
  createdAt: number;
}
```

---

## 🎨 Design e UX

### Princípios de Design

- **Apple Human Interface Guidelines (HIG):** O app segue as diretrizes de design da Apple para consistência com apps nativos
- **Modo Escuro/Claro:** Suporte completo a ambos os temas com transições suaves
- **Acessibilidade:** Tamanhos de toque adequados (mínimo 44x44pt) e contraste suficiente
- **Responsividade:** Interface adaptada para diferentes tamanhos de tela

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| **Primary** | `#0a7ea4` | Botões, links, destaques |
| **Success** | `#22C55E` | Receitas, confirmações |
| **Error** | `#EF4444` | Despesas, erros |
| **Background** | `#ffffff` (light) / `#151718` (dark) | Fundo principal |
| **Surface** | `#f5f5f5` (light) / `#1e2022` (dark) | Cards e superfícies |

---

## 🧪 Testes

Para executar testes unitários:

```bash
pnpm test
```

---

## 📝 Funcionalidades Futuras

- [ ] Gráficos de despesas por categoria (Pizza chart)
- [ ] Metas de gastos com alertas
- [ ] Relatórios mensais em PDF
- [ ] Sincronização em nuvem
- [ ] Autenticação de usuário
- [ ] Backup automático
- [ ] Exportação de dados (CSV, Excel)
- [ ] Notificações de transações

---

## 📚 Conceitos Acadêmicos Aplicados

### 1. **Programação Orientada a Componentes**
O app é construído com componentes reutilizáveis e compostos, seguindo o padrão de componentes do React.

### 2. **Gerenciamento de Estado**
Implementação de hooks customizados para centralizar a lógica de negócio e estado da aplicação.

### 3. **Persistência de Dados**
Uso de AsyncStorage para demonstrar como dados podem ser armazenados localmente em dispositivos móveis.

### 4. **Navegação**
Implementação de navegação por abas e rotas usando Expo Router, demonstrando fluxos de navegação complexos.

### 5. **Tipagem Estática**
Uso de TypeScript para garantir segurança de tipos e melhorar a qualidade do código.

### 6. **Estilização Responsiva**
Utilização de Tailwind CSS adaptado para React Native (NativeWind) para estilização consistente e eficiente.

---

## 👨‍💼 Autor

**Desenvolvido por:** Lucas

**Disciplina:** Programação para Dispositivos Móveis

**Curso:** Ciência da Computação

**Instituição:** [Sua Instituição]

**Data de Conclusão:** Março de 2026

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🤝 Contribuições

Este é um projeto acadêmico. Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou problemas com o projeto, abra uma **Issue** no repositório GitHub.

---

## 🙏 Agradecimentos

- **Expo Team** pela excelente plataforma de desenvolvimento
- **React Native Community** pela documentação e suporte
- **Tailwind CSS** pela framework de estilização
- Professores e colegas pela orientação e feedback

---

**Última atualização:** Março de 2026

**Versão:** 1.1.0
