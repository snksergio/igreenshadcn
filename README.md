# iGreen Design System

> Sistema de Design modular baseado em componentes React, temas CSS personalizáveis e publicação NPM independente.

[![License](https://img.shields.io/badge/license-Proprietary-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)
[![NPM](https://img.shields.io/badge/npm-%40igreen-success)](https://www.npmjs.com/search?q=%40igreen)

---

## 🚀 Quick Start

### Criar Novo Projeto (Recomendado)

```bash
npx @igreen/cli@latest init
```

**Isso vai:**
- ✅ Criar projeto Next.js configurado
- ✅ Perguntar qual tema você quer (igreen/solarorange)
- ✅ Instalar todos os componentes automaticamente
- ✅ Configurar Tailwind CSS v4
- ✅ Deixar tudo pronto para `npm run dev`

**Próximos passos:**
```bash
cd meu-projeto
npm run dev
```

---

### Adicionar a Projeto Existente

```bash
npm install @igreen/design-system
```

**Configuração manual necessária:** Ver [Tutorial 07](./docs/07_INSTALACAO_CONSUMO.md)

---

## 📦 Pacotes Disponíveis no NPM

Todos os pacotes estão publicados em **https://www.npmjs.com/search?q=%40igreen**

### Temas
- `@igreen/themes@1.2.0` - Temas igreen e solarorange

### Componentes
- `@igreen/button` - Botões com variantes
- `@igreen/input` - Campos de entrada
- `@igreen/label` - Labels para formulários
- `@igreen/checkbox` - Checkboxes customizados
- `@igreen/example-card` - Cards de exemplo

### Utilitários
- `@igreen/utils` - Helpers (cn, etc)
- `@igreen/cli` - CLI para scaffolding de projetos

### Meta-Package
- `@igreen/design-system` - Todos os componentes em um único pacote

---

## 🏗️ Arquitetura do Projeto

```
igreenshadcn/
├── devcomponents/          # 🎨 Sandbox de desenvolvimento
│   ├── shadcn/             # Componentes baseados em shadcn/ui
│   └── igreen/             # Componentes 100% customizados
│
├── packages/               # 📦 Pacotes NPM (publicados)
│   ├── components/
│   │   ├── shadcn/         # @igreen/button, @igreen/badge, ...
│   │   └── igreen/         # @igreen/example-card, ...
│   ├── themes/             # @igreen/themes
│   ├── utils/              # @igreen/utils
│   ├── cli/                # @igreen/cli ⭐
│   └── design-system/      # @igreen/design-system (meta-package)
│
├── docs/                   # 📖 9 tutoriais em português
└── scripts/                # 🔧 Automação de build/publish
```

---

## 📚 Documentação Completa

| # | Tutorial | Descrição |
|---|----------|-----------|
| 01 | [Criando Componente Shadcn](./docs/01_CRIANDO_COMPONENTE_SHADCN.md) | Como adicionar componentes shadcn/ui |
| 02 | [Criando Componente iGreen](./docs/02_CRIANDO_COMPONENTE_IGREEN.md) | Como criar componentes customizados |
| 03 | [Adicionando Tokens CSS](./docs/03_ADICIONANDO_TOKENS.md) | Gerenciar tokens de design |
| 04 | [Workflow de Desenvolvimento](./docs/04_WORKFLOW_DESENVOLVIMENTO.md) | Fluxo completo dev → produção |
| 05 | [Documentando no Storybook](./docs/05_STORYBOOK.md) | Criar stories interativas |
| 06 | [Versionamento e Publicação](./docs/06_VERSIONAMENTO_PUBLICACAO.md) | Semver e NPM publishing |
| 07 | [Instalação e Consumo](./docs/07_INSTALACAO_CONSUMO.md) | Guia para usuários finais |
| 08 | [Referência de Scripts](./docs/08_REFERENCIA_SCRIPTS.md) | Todos os comandos disponíveis |
| 09 | [Publicando no NPM](./docs/09_PUBLICANDO_NPM_PUBLICO.md) | Como publicar novos pacotes |

---

## 💡 Exemplo de Uso

```typescript
// app/layout.tsx
import '@igreen/themes/igreen'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
```

```typescript
// app/page.tsx
import { Button } from '@igreen/button'
import { Input } from '@igreen/input'
import { Label } from '@igreen/label'

export default function Home() {
  return (
    <div className="p-8">
      <Label>Nome</Label>
      <Input placeholder="Digite seu nome" />
      <Button>Enviar</Button>
    </div>
  )
}
```

---

## 🔧 Para Desenvolvedores do Design System

### Setup Local

```bash
# Clonar e instalar
git clone <repo-url>
cd igreenshadcn
npm install

# Dev server
npm run dev

# Storybook
npm run storybook
```

### Scripts Principais

```bash
# Build
npm run build:all-components  # Build todos os componentes
npm run build:themes          # Build temas

# Publicação
npm run publish:all           # Publicar todos no NPM

# Validação
npm run test:components       # Validar estrutura
npm run test:tokens           # Validar tokens CSS
```

---

## 🎨 Sistema de Temas

Arquitetura de 3 camadas:

```
Primitives (cores brutas OKLCH)
  ↓
Semantic (intenção/significado)
  ↓
Bridge (compatibilidade shadcn)
```

**Temas disponíveis:**
- `igreen` - Verde padrão
- `solarorange` - Laranja vibrante

---

## 🧰 Tecnologias

- **Framework:** Next.js 15 + App Router
- **Styling:** Tailwind CSS v4
- **Tokens:** CSS Variables (OKLCH)
- **Components:** React 19 + TypeScript
- **Build:** TypeScript Compiler
- **Documentation:** Storybook 8
- **Monorepo:** NPM Workspaces

---

## 🌐 Links Úteis

- **NPM Packages:** https://www.npmjs.com/search?q=%40igreen
- **Storybook Local:** http://localhost:6006
- **Dev Server:** http://localhost:3000
- **Docs:** [docs/README.md](./docs/README.md)

---

## 📝 Comandos CLI

```bash
# Criar novo projeto
npx @igreen/cli@latest init

# Adicionar componentes a projeto existente
npx @igreen/cli add button input label
```

---

## 🤝 Contribuindo

Ver [CONVENTIONS.md](./CONVENTIONS.md) para padrões e guias de contribuição.

---

## 📄 Licença

Proprietary - iGreen Design System

---

**Feito com 💚 pelo iGreen Team**
