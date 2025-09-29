# Classificação de Email (Frontend)

Interface moderna e responsiva para classificação automática de emails, desenvolvida com Next.js e TypeScript. Frontend integrado ao sistema de classificação de emails para empresas do setor financeiro.

## Visão Geral

Este frontend oferece uma interface intuitiva para classificar emails em **Produtivo** (requer ação) ou **Improdutivo** (informativo), com foco em otimizar o atendimento de empresas financeiras que processam alto volume de emails diários.

### Características Principais

- 🎨 **Interface Moderna**: Design limpo e responsivo com Tailwind CSS
- 📝 **Classificação de Texto**: Digite ou cole emails diretamente
- 📁 **Upload de Arquivos**: Suporte a .txt, .eml, .msg, .pdf
- 📊 **Análise Detalhada**: Exibe score de confiança e análise completa
- 💡 **Sugestões Inteligentes**: Respostas automáticas com botão de cópia
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- ⚡ **Tempo Real**: Resultados instantâneos da classificação

## Deploy em Produção

**Aplicação:** `https://email-classifier-frontend-cqf41yb29.vercel.app`

### Integração com Backend:
- **API Backend:** `https://email-classifier-backend-rxlb.onrender.com`
- **Redirecionamento**: Todas as requests passam pelas API Routes do Next.js

## Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Hooks** - Gerenciamento de estado
- **Fetch API** - Comunicação com backend
- **Vercel** - Plataforma de deploy

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── classify/
│   │   │   │   └── route.ts          # API Route para classificação
│   │   │   └── upload/
│   │   │       └── route.ts          # API Route para upload
│   │   ├── globals.css               # Estilos globais
│   │   ├── layout.tsx                # Layout principal
│   │   └── page.tsx                  # Página inicial
│   ├── components/
│   │   ├── EmailClassifier.tsx       # Componente principal
│   │   ├── EmailUpload.tsx          # Upload de arquivos
│   │   ├── ResultDisplay.tsx        # Exibição de resultados
│   │   └── ResponseSuggestions.tsx   # Sugestões de resposta
│   ├── lib/
│   │   └── api.ts                   # Funções de API
│   └── types/
│       └── index.ts                 # Tipos TypeScript
├── public/                          # Arquivos estáticos
├── package.json                     # Dependências Node.js
├── tailwind.config.js              # Configuração Tailwind
├── next.config.js                  # Configuração Next.js
├── .env.local                      # Variáveis de ambiente
└── README.md                       # Este arquivo
```

## Instalação e Execução Local

### 1. Clone o repositório
```bash
git clone https://github.com/ClassificacaoEmail/email-classifier-frontend.git
cd email-classifier-frontend
```

### 2. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env.local`:
```env
API_URL=https://email-classifier-backend-rxlb.onrender.com
NEXT_PUBLIC_API_URL=https://email-classifier-backend-rxlb.onrender.com
```

### 4. Executar aplicação
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: `http://localhost:3000`

## Componentes Principais

### EmailClassifier
Componente principal que gerencia o estado da aplicação:
- Formulário de entrada de texto
- Upload de arquivos
- Exibição de resultados
- Controle de loading

### EmailUpload
Componente para upload de arquivos:
- Drag & drop
- Validação de tipos de arquivo
- Preview do arquivo selecionado
- Indicador de progresso

### ResultDisplay
Exibição dos resultados da classificação:
- Badge de classificação (Produtivo/Improdutivo)
- Score de confiança com barra de progresso
- Análise detalhada expandível
- Animações suaves

### ResponseSuggestions
Sugestões de resposta automática:
- Lista de respostas baseadas na classificação
- Botão de copiar para clipboard
- Feedback visual de cópia

## API Routes (Next.js)

### `/api/classify`
Classifica texto enviado pelo usuário:
```typescript
// POST /api/classify
{
  "text": "Meu cartão foi bloqueado"
}

// Resposta
{
  "classification": "Produtivo",
  "confidence": 89.2,
  "suggestions": ["Recebido! Vou analisar..."],
  "analysis": { ... }
}
```

### `/api/upload`
Processa arquivo de email enviado:
```typescript
// POST /api/upload
FormData: { file: File }

// Resposta
{
  "filename": "email.txt",
  "classification": "Produtivo",
  "confidence": 85.7,
  "suggestions": ["Obrigado pelo contato..."]
}
```

## Funcionalidades da Interface

### Estados de Carregamento
- Spinner animado durante processamento
- Desabilitação de botões durante requests
- Feedback visual em tempo real

### Design Responsivo
- Layout adaptável para mobile/desktop
- Componentes que se ajustam ao tamanho da tela
- Navegação otimizada para touch

### UX/UI Features
- Animações suaves de transição
- Cores semânticas para classificações
- Tooltips informativos
- Estados de erro tratados

## Exemplos de Uso

### Classificação de Texto
1. Digite ou cole um email na área de texto
2. Clique em "Analisar Email"
3. Visualize a classificação e score de confiança
4. Use as sugestões de resposta geradas

### Upload de Arquivo
1. Arraste um arquivo para a área de upload
2. Ou clique para selecionar arquivo
3. Aguarde o processamento automático
4. Visualize os resultados da análise

## 🔧 Configuração de Produção

### Deploy na Vercel:
1. Conecte o repositório GitHub à Vercel
2. Configure as variáveis de ambiente:
   ```
   API_URL=https://email-classifier-backend-rxlb.onrender.com
   NEXT_PUBLIC_API_URL=https://email-classifier-backend-rxlb.onrender.com
   ```
3. Deploy automático a cada push

### Build para Produção:
```bash
npm run build
npm start
```

## Scripts Disponíveis

```json
{
  "dev": "next dev",           // Desenvolvimento
  "build": "next build",       // Build de produção
  "start": "next start",       // Servidor de produção
  "lint": "next lint"          // Verificação de código
}
```

## Tratamento de Erros

- **Conectividade**: Feedback quando backend está indisponível
- **Arquivos**: Validação de tipos e tamanhos
- **Timeout**: Indicadores de timeout em requests longos
- **Fallbacks**: Estados de erro elegantes

## Melhorias Futuras

- [ ] Histórico de classificações
- [ ] Autenticação de usuários
- [ ] Temas claro/escuro
- [ ] Integração com email providers
- [ ] Dashboard analytics
- [ ] Classificação em lote

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adicionar nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Links Relacionados

- **Backend**: https://github.com/ClassificacaoEmail/email-classifier-backend
- **API Backend**: https://email-classifier-backend-rxlb.onrender.com
- **Frontend em Produção**: https://email-classifier-frontend-cqf41yb29.vercel.app

## Screenshots

### Interface Principal
- Interface limpa e intuitiva
- Área de texto para entrada manual
- Botões de ação claramente identificados

### Resultados da Análise
- Card de resultado com classificação destacada
- Score de confiança visual
- Sugestões de resposta organizadas

### Upload de Arquivos
- Área de drag & drop responsiva
- Feedback visual durante upload
- Suporte a múltiplos formatos