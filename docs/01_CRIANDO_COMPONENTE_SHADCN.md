# 📦 Tutorial: Criando Componente Shadcn

> Este tutorial mostra como adicionar e customizar um componente do shadcn/ui no iGreen Design System.

---

## 📋 Visão Geral do Fluxo

```
1. Instalar componente shadcn → devcomponents/shadcn/
2. Aplicar tokens iGreen
3. Testar localmente (Next.js app)
4. Documentar no Storybook
5. Sincronizar para packages/components/
6. Build e publicar no NPM
```

---

## Passo 1: Instalar o Componente Base

### 1.1 Verificar Configuração

O arquivo `components.json` deve apontar para `devcomponents`:

```json
{
  "aliases": {
    "components": "@/devcomponents/shadcn",
    "ui": "@/devcomponents/shadcn"
  }
}
```

### 1.2 Instalar Componente

```bash
# Na raiz do projeto
npx shadcn@latest add badge
```

Isso cria: `devcomponents/shadcn/badge.tsx`

---

## Passo 2: Aplicar Tokens iGreen

### 2.1 Substituir Cores Hardcoded

❌ **Evite:**
```tsx
className="bg-green-500 text-white border-gray-200"
```

✅ **Use tokens semânticos:**
```tsx
className="bg-bg-primary text-fg-on-primary border-border-primary"
```

### 2.2 Exemplo: Customizando Badge

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: [
          "bg-bg-primary text-fg-on-primary border-border-primary",
          "hover:bg-bg-primary-hover"
        ],
        secondary: [
          "bg-bg-secondary text-fg-secondary border-border-default",
          "hover:bg-bg-secondary-hover"
        ],
        success: [
          "bg-bg-success text-fg-on-success border-success-600",
          "hover:bg-bg-success-hover"
        ],
        destructive: [
          "bg-bg-critical text-fg-on-critical border-destructive",
          "hover:bg-bg-critical-hover"
        ],
        outline: [
          "text-fg-main border-border-strong bg-background",
          "hover:bg-bg-accent"
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

### 2.3 Tabela de Tokens Comuns

| Categoria | Token | Uso |
|-----------|-------|-----|
| **Background** | `bg-bg-primary` | Fundo principal (botões primários) |
| | `bg-bg-secondary` | Fundo secundário |
| | `bg-bg-accent` | Hover, highlights |
| | `bg-background` | Fundo de página |
| **Foreground** | `text-fg-main` | Texto principal |
| | `text-fg-on-primary` | Texto em backgrounds coloridos |
| | `text-fg-secondary` | Texto menos importante |
| **Border** | `border-border-default` | Bordas padrão |
| | `border-border-primary` | Bordas primárias |
| | `border-border-strong` | Bordas com destaque |

---

## Passo 3: Testar Localmente

### 3.1 Criar Página de Teste

```tsx
// app/test-badge/page.tsx
import { Badge } from '@/devcomponents/shadcn/badge'

export default function TestBadgePage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Badge Variants</h1>
      
      <div className="flex gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  )
}
```

### 3.2 Iniciar Dev Server

```bash
npm run dev
```

Acesse: `http://localhost:3000/test-badge`

---

## Passo 4: Documentar no Storybook

### 4.1 Criar Story

```tsx
// apps/storybook/src/stories/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/devcomponents/shadcn/badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'destructive', 'outline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}
```

### 4.2 Ver no Storybook

```bash
npm run storybook
```

Acesse: `http://localhost:6006`

---

## Passo 5: Sincronizar para Packages

### 5.1 Usar Script de Sync

```bash
npm run sync badge
```

Isso cria a estrutura:
```
packages/components/shadcn/badge/
├── src/
│   ├── badge.tsx
│   └── index.ts
├── package.json
├── tsconfig.json
└── dist/ (após build)
```

### 5.2 Ou Manual (não recomendado)

```bash
# Criar estrutura
npm run setup-component badge shadcn

# Copiar arquivo
cp devcomponents/shadcn/badge.tsx packages/components/shadcn/badge/src/badge.tsx
```

---

## Passo 6: Build e Publicar

### 6.1 Build do Componente

```bash
cd packages/components/shadcn/badge
npm run build
```

Verifica que `dist/` foi criado com:
- `badge.js` - Código compilado
- `badge.d.ts` - Tipos TypeScript
- `index.js` e `index.d.ts` - Entry points

### 6.2 Publicar no Registry Local

```bash
# Garantir que Verdaccio está rodando
npm run registry:start

# Publicar (na pasta do componente)
npm publish --registry http://localhost:4873
```

### 6.3 Verificar Publicação

```bash
npm info @igreen/badge --registry http://localhost:4873
```

---

## Resumo dos Comandos

| Etapa | Comando |
|-------|---------|
| Instalar shadcn | `npx shadcn@latest add badge` |
| Testar local | `npm run dev` |
| Ver Storybook | `npm run storybook` |
| Sincronizar | `npm run sync badge` |
| Build | `cd packages/components/shadcn/badge && npm run build` |
| Publicar | `npm publish --registry http://localhost:4873` |

---

## Checklist

- [ ] Componente instalado em `devcomponents/shadcn/`
- [ ] Tokens iGreen aplicados (sem cores hardcoded)
- [ ] Testado na página local
- [ ] Story criada no Storybook
- [ ] Sincronizado para `packages/components/`
- [ ] Build executado com sucesso
- [ ] Publicado no Verdaccio

---

## Próximos Passos

- [Criar Componente iGreen Próprio](./02_CRIANDO_COMPONENTE_IGREEN.md)
- [Adicionar Novos Tokens](./03_ADICIONANDO_TOKENS.md)
- [Workflow Completo](./04_WORKFLOW_DESENVOLVIMENTO.md)
