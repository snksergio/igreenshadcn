# 📚 Documentação iGreen Design System

> Sistema de Design com componentes React, temas CSS e publicação NPM

---

## 🚀 Início Rápido

**Para criar novo projeto:**

```bash
npx @igreen/cli@latest init
```

Isso cria um projeto Next.js completo com iGreen configurado!

👉 [Veja o guia completo](./00_INICIO_RAPIDO.md)

---

## 📖 Tutoriais

### Para Usuários do Design System

| # | Tutorial | Descrição |
|---|----------|-----------|
| **00** | [**🚀 Início Rápido**](./00_INICIO_RAPIDO.md) | **Comece aqui!** Instale e use em 2 minutos |
| 07 | [Instalação e Consumo](./07_INSTALACAO_CONSUMO.md) | Instalação manual e configuração |

### Para Desenvolvedores do Design System

| # | Tutorial | Descrição |
|---|----------|-----------|
| 01 | [Criando Componente Shadcn](./01_CRIANDO_COMPONENTE_SHADCN.md) | Como adicionar componentes shadcn/ui |
| 02 | [Criando Componente iGreen](./02_CRIANDO_COMPONENTE_IGREEN.md) | Como criar componentes customizados |
| 03 | [Adicionando Tokens CSS](./03_ADICIONANDO_TOKENS.md) | Gerenciar design tokens |
| 04 | [Workflow de Desenvolvimento](./04_WORKFLOW_DESENVOLVIMENTO.md) | Fluxo dev → produção completo |
| 05 | [Storybook](./05_STORYBOOK.md) | Documentar componentes |
| **06** | [**Versionamento e Publicação**](./06_VERSIONAMENTO_PUBLICACAO.md) | **Publicar no NPM** |
| 08 | [Referência de Scripts](./08_REFERENCIA_SCRIPTS.md) | Todos os comandos disponíveis |
| 09 | [Publicando NPM Público](./09_PUBLICANDO_NPM_PUBLICO.md) | Setup NPM e organização |

---

## 🎯 Casos de Uso

### "Quero usar iGreen no meu projeto"

1. Execute: `npx @igreen/cli@latest init`
2. Pronto! 🎉

### "Quero criar um novo componente"

1. [Tutorial 01](./01_CRIANDO_COMPONENTE_SHADCN.md) - Se for baseado em shadcn
2. [Tutorial 02](./02_CRIANDO_COMPONENTE_IGREEN.md) - Se for 100% custom

### "Quero publicar um componente no NPM"

1. [Tutorial 06](./06_VERSIONAMENTO_PUBLICACAO.md) - Versionar e publicar

### "Quero adicionar um novo token CSS"

1. [Tutorial 03](./03__ADICIONANDO_TOKENS.md) - Adicionar tokens

---

## 🏗️ Arquitetura

```
igreenshadcn/
├── devcomponents/          # 🎨 Desenvolvimento
│   ├── shadcn/             # Componentes shadcn
│   └── igreen/             # Componentes custom
│
├── packages/               # 📦 Pacotes NPM (publicados)
│   ├── themes/             # @igreen/themes
│   ├── utils/              # @igreen/utils
│   ├── components/         # @igreen/button, etc
│   ├── cli/                # @igreen/cli
│   └── design-system/      # @igreen/design-system
│
├── docs/                   # 📖 Esta documentação
└── scripts/                # 🔧 Automação
```

---

## 📦 Pacotes Publicados no NPM

Todos disponíveis em: https://www.npmjs.com/search?q=%40igreen

### Core
- `@igreen/themes` - Temas (igreen, solarorange)
- `@igreen/utils` - Utilitários
- `@igreen/cli` - CLI para criação de projetos

### Componentes
- `@igreen/button`
- `@igreen/input`
- `@igreen/label`
- `@igreen/checkbox`
- `@igreen/example-card`

### Meta-Package
- `@igreen/design-system` - Todos os componentes

---

## 🔧 Scripts Principais

```bash
# Desenvolvimento
npm run dev                  # Dev server
npm run storybook            # Documentação

# Build
npm run build:themes         # Build temas
npm run build:all-components # Build componentes

# Publicação
npm run publish:all          # Publicar todos no NPM
npm run publish:component    # Publicar um componente

# Testes
npm run test:components      # Validar estrutura
npm run test:tokens          # Validar tokens
```

---

## 🎨 Sistema de Temas

### Arquitetura de 3 Camadas

```
┌─────────────────────────┐
│ PRIMITIVES (OKLCH)      │  ← Cores brutas
│ --brand-500, --neutral  │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│ SEMANTIC (Intenção)     │  ← Significado
│ --bg-primary, --fg-main │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│ BRIDGE (Shadcn)         │  ← Compatibilidade
│ --background, --primary │
└─────────────────────────┘
```

### Temas Disponíveis

- **igreen**: Verde moderno (padrão)
- **solarorange**: Laranja vibrante

---

## 🧰 Tecnologias

- **Framework**: Next.js 15 + App Router
- **Styling**: Tailwind CSS v4
- **Tokens**: CSS Variables (OKLCH)
- **Components**: React 19 + TypeScript
- **Build**: TypeScript Compiler
- **Docs**: Storybook 8
- **Monorepo**: NPM Workspaces
- **Registry**: NPM Público

---

## 📝 Convenções

Ver [CONVENTIONS.md](../CONVENTIONS.md) para:
- Nomenclatura de arquivos
- Estrutura de componentes
- Padrões de código
- Sistema de tokens

---

## 🔗 Links Úteis

- **NPM:** https://www.npmjs.com/search?q=%40igreen
- **Storybook Local:** http://localhost:6006
- **Dev Server:** http://localhost:3000

---

## 🚦 Status do Projeto

- ✅ CLI funcionando com NPM público
- ✅ 9 pacotes publicados
- ✅ Componentes testados e funcionais
- ✅ Documentação completa em português
- ✅ Dark mode suportado
- ✅ Tailwind CSS v4 configurado

---

## 📞 Suporte

- **Issues**: Abra uma issue no repositório
- **Docs**: Esta documentação
- **NPM**: https://www.npmjs.com/search?q=%40igreen

---

**Feito com 💚 pelo iGreen Team**
