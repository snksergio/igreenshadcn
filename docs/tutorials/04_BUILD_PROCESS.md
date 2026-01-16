# 🏗️ Tutorial: Como Funciona o Build

> Entenda o processo de build e como os componentes ficam disponíveis no CLI.

## Arquitetura do Sistema

```
┌─────────────────────────────┐
│  components/ui/*.tsx        │  ← Componentes Shadcn customizados
│  components/system/*/       │  ← Componentes personalizados
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  npm run build:components   │  ← Script de automação
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  public/registry/           │
│  ├── index.json             │  ← Lista de todos componentes
│  └── components/*.json      │  ← JSON de cada componente
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Next.js Dev Server         │  ← Serve os JSONs via HTTP
│  http://localhost:3000      │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  @igreen/cli                │  ← CLI que consome o registry
│  igreen add button          │
└─────────────────────────────┘
```

---

## O que cada script faz?

### `npm run build:registry`

Gera os tokens CSS para o tema:
- Lê `theme/primitives/`, `theme/semantic/`, `theme/bridge/`
- Gera `public/registry/styles/theme.json`
- Gera `public/registry/styles/theme-config.json`

### `npm run build:components`

Gera os JSONs dos componentes:
- Lê `components/ui/*.tsx`
- Lê `components/system/*/`
- Para cada componente, gera um JSON com:
  - `$schema`: Referência ao schema do Shadcn
  - `name`: Nome do componente
  - `type`: `registry:ui` ou `registry:block`
  - `dependencies`: Pacotes npm necessários
  - `registryDependencies`: Outros componentes necessários
  - `files`: Array com path, content e target

### `npm run build:all`

Executa ambos os scripts em sequência.

---

## Estrutura do JSON Gerado

### Componente UI (arquivo único)

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "content": "import * as React from 'react'...",
      "type": "registry:ui",
      "target": "components/ui/button.tsx"
    }
  ]
}
```

### Componente System (multi-arquivo)

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "example-card",
  "type": "registry:block",
  "dependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/system/example-card/component.tsx",
      "content": "...",
      "type": "registry:component",
      "target": "components/system/example-card/component.tsx"
    },
    {
      "path": "components/system/example-card/index.ts",
      "content": "...",
      "type": "registry:component",
      "target": "components/system/example-card/index.ts"
    }
  ]
}
```

---

## Como o CLI Instala

Quando executa `igreen add button`:

1. **Fetch do JSON**: CLI busca `http://localhost:3000/registry/components/button.json`
2. **Parse**: Extrai a lista de `files`
3. **Write**: Para cada file, escreve o `content` no `target`
4. **Dependencies**: Executa `npm install` para as dependências

---

## Detecção Automática de Dependências

O script analisa os imports do código:

### npm dependencies

```typescript
import { Slot } from "@radix-ui/react-slot"
// → dependencies: ["@radix-ui/react-slot"]
```

### Registry dependencies

```typescript
import { Button } from "@/components/ui/button"
// → registryDependencies: ["button"]
```

---

## Ordem Recomendada de Build

```bash
# 1. Validar tokens (não quebrou referências)
npm run test:tokens

# 2. Build do registry (tema)
npm run build:registry

# 3. Build dos componentes
npm run build:components

# 4. Validar componentes
npm run test:components
```

Ou use o atalho:
```bash
npm run prepare:registry
```
