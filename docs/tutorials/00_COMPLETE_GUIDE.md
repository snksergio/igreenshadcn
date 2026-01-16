# 📚 Guia Completo: Do Zero à Publicação

> Este guia cobre TODO o fluxo de criação de um componente, desde a concepção até estar disponível para usuários finais.

---

## Índice

1. [Escolhendo o Tipo de Componente](#1-escolhendo-o-tipo-de-componente)
2. [Criando o Componente](#2-criando-o-componente)
3. [Testando Localmente](#3-testando-localmente)
4. [Gerando o Registry](#4-gerando-o-registry)
5. [Validando](#5-validando)
6. [Publicando no CLI](#6-publicando-no-cli)
7. [Usando em Outros Projetos](#7-usando-em-outros-projetos)
8. [Atualizando Componentes](#8-atualizando-componentes)

---

## 1. Escolhendo o Tipo de Componente

| Tipo | Quando usar | Local |
|------|-------------|-------|
| **UI** | Componente Shadcn customizado (arquivo único) | `components/ui/` |
| **System** | Componente próprio (multi-arquivo) | `components/system/` |

---

## 2. Criando o Componente

### Opção A: UI Component

```bash
# Instalar base do Shadcn
npx shadcn@latest add dialog

# Editar
code components/ui/dialog.tsx
```

Customizações:
- Usar tokens semânticos (`bg-bg-primary`)
- Adicionar variantes iGreen
- Documentar com JSDoc

### Opção B: System Component

```bash
# Criar estrutura
mkdir -p components/system/feature-card

# Criar arquivos
touch components/system/feature-card/{component.tsx,index.ts,types.ts,styles.ts}
```

Implementar seguindo o padrão:
```
feature-card/
├── component.tsx  ← Lógica e JSX
├── index.ts       ← export { FeatureCard } from './component'
├── types.ts       ← interface FeatureCardProps
└── styles.ts      ← const styles = { ... }
```

---

## 3. Testando Localmente

```bash
# Iniciar dev server
npm run dev
```

Crie uma página de teste:
```tsx
// app/test/page.tsx
import { FeatureCard } from '@/components/system/feature-card';

export default function TestPage() {
  return <FeatureCard titulo="Teste" />;
}
```

Acesse: `http://localhost:3000/test`

---

## 4. Gerando o Registry

```bash
npm run build:components
```

**O que é gerado:**
- `public/registry/components/feature-card.json`
- `public/registry/index.json` (atualizado)

**Verificação manual:**
```bash
cat public/registry/components/feature-card.json
```

---

## 5. Validando

```bash
# Validar tokens
npm run test:tokens

# Validar componentes
npm run test:components

# Ou tudo junto
npm run test:all
```

---

## 6. Publicando no CLI

### 6.1 Atualizar Versão do CLI (Opcional)

Se fez alterações significativas:
```json
// packages/cli/package.json
"version": "0.0.15"
```

### 6.2 Publicar

```bash
npm run cli:publish
```

Verificar:
```bash
npm info @igreen/cli --registry http://localhost:4873
```

---

## 7. Usando em Outros Projetos

### Instalar CLI

```bash
npm install -g @igreen/cli --registry http://localhost:4873
```

### Usar

```bash
# Novo projeto com tudo
igreen init

# Ou adicionar específico
igreen add feature-card
```

### Verificar Instalação

```bash
ls components/system/feature-card/
# component.tsx  index.ts  styles.ts  types.ts
```

---

## 8. Atualizando Componentes

### Fazer Alteração

```bash
code components/system/feature-card/component.tsx
```

### Rebuild

```bash
npm run build:components
```

### Publicar

```bash
npm run cli:publish
```

### Atualizar em Projeto Destino

```bash
igreen add feature-card --overwrite
```

---

## Resumo Visual

```
┌─────────────────────────────────────────────────────────┐
│                    FLUXO COMPLETO                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   1. CRIAR                                              │
│      └── components/ui/novo.tsx                         │
│      └── components/system/novo/                        │
│                     │                                   │
│                     ▼                                   │
│   2. TESTAR                                             │
│      └── npm run dev                                    │
│                     │                                   │
│                     ▼                                   │
│   3. BUILD                                              │
│      └── npm run build:components                       │
│                     │                                   │
│                     ▼                                   │
│   4. VALIDAR                                            │
│      └── npm run test:all                               │
│                     │                                   │
│                     ▼                                   │
│   5. PUBLICAR                                           │
│      └── npm run cli:publish                            │
│                     │                                   │
│                     ▼                                   │
│   6. USAR                                               │
│      └── igreen add novo                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Comandos de Referência Rápida

| Etapa | Comando |
|-------|---------|
| Dev server | `npm run dev` |
| Build tudo | `npm run prepare:registry` |
| Build componentes | `npm run build:components` |
| Validar | `npm run test:all` |
| Publicar CLI | `npm run cli:publish` |
| Instalar CLI | `npm i -g @igreen/cli --registry http://localhost:4873` |
| Usar CLI | `igreen add <componente>` |

---

## Links para Tutoriais Específicos

- [Adicionando UI Component](./01_ADDING_UI_COMPONENT.md)
- [Criando System Component](./02_CREATING_SYSTEM_COMPONENT.md)
- [Atualizando Componentes](./03_UPDATING_COMPONENTS.md)
- [Como Funciona o Build](./04_BUILD_PROCESS.md)
- [Usando o CLI](./05_CLI_USAGE.md)
- [Adicionando Tokens](./ADDING_NEW_TOKENS.md)
