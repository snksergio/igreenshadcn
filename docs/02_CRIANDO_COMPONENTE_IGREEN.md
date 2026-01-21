# 🎨 Tutorial: Criando Componente iGreen Próprio

> Este tutorial mostra como criar um componente 100% customizado do zero, sem base do shadcn/ui.

---

## 📋 Quando Criar Componente iGreen?

Use componentes iGreen próprios quando:
- O componente é **específico do negócio** (ex: Dashboard Card, KPI Widget)
- Requer **lógica complexa** (ex: Data Table, Kanban Board)
- Combina **múltiplos componentes shadcn** em algo novo
- Não existe equivalente no shadcn/ui

---

## Passo 1: Criar Estrutura no DevComponents

### 1.1 Criar Diretório

```bash
# Na raiz do projeto
mkdir -p devcomponents/igreen/feature-card
cd devcomponents/igreen/feature-card
```

### 1.2 Estrutura de Arquivos

Crie esta estrutura:

```
devcomponents/igreen/feature-card/
├── component.tsx    # Lógica e JSX do componente
├── types.ts         # Interfaces e tipos TypeScript
├── styles.ts        # Classes CSS (CVA) ou helpers
└── index.ts         # Exportações públicas
```

---

## Passo 2: Definir Tipos

```typescript
// types.ts
import { ReactNode } from 'react'

export interface FeatureCardProps {
  /**
   * Ícone do card (componente React ou SVG)
   */
  icon: ReactNode
  
  /**
   * Título principal do card
   */
  title: string
  
  /**
   * Descrição do recurso
   */
  description: string
  
  /**
   * Variante visual do card
   * @default 'default'
   */
  variant?: 'default' | 'highlighted' | 'muted'
  
  /**
   * Classes CSS adicionais
   */
  className?: string
  
  /**
   * Callback ao clicar no card
   */
  onClick?: () => void
}
```

---

## Passo 3: Criar Estilos com CVA

```typescript
// styles.ts
import { cva } from 'class-variance-authority'

export const featureCardVariants = cva(
  // Estilos base
  [
    "group relative overflow-hidden rounded-lg",
    "border border-border-default",
    "p-6 transition-all duration-200",
    "hover:shadow-md hover:border-border-strong",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-background",
          "hover:bg-bg-accent"
        ],
        highlighted: [
          "bg-bg-primary/5",
          "border-border-primary",
          "hover:bg-bg-primary/10"
        ],
        muted: [
          "bg-bg-muted",
          "border-border-default",
          "hover:bg-bg-secondary"
        ]
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export const iconWrapperVariants = cva(
  "flex items-center justify-center rounded-md mb-4",
  {
    variants: {
      variant: {
        default: "bg-bg-accent text-fg-main size-12",
        highlighted: "bg-bg-primary text-fg-on-primary size-12",
        muted: "bg-bg-secondary text-fg-secondary size-12"
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
```

---

## Passo 4: Implementar Componente

```tsx
// component.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import { FeatureCardProps } from './types'
import { featureCardVariants, iconWrapperVariants } from './styles'

/**
 * Feature Card Component
 * 
 * Exibe um recurso/feature com ícone, título e descrição.
 * Usado em landing pages e dashboards.
 * 
 * @example
 * ```tsx
 * <FeatureCard
 *   icon={<Zap />}
 *   title="Performance"
 *   description="Otimizado para velocidade máxima"
 *   variant="highlighted"
 * />
 * ```
 */
export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, variant = 'default', className, onClick }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(featureCardVariants({ variant }), className)}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {/* Icon */}
        <div className={iconWrapperVariants({ variant })}>
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-fg-main">
            {title}
          </h3>
          <p className="text-sm text-fg-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-bg-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    )
  }
)

FeatureCard.displayName = 'FeatureCard'
```

---

## Passo 5: Criar Index

```typescript
// index.ts
export { FeatureCard } from './component'
export type { FeatureCardProps } from './types'
export { featureCardVariants, iconWrapperVariants } from './styles'
```

---

## Passo 6: Testar Localmente

### 6.1 Criar Página de Teste

```tsx
// app/test-feature-card/page.tsx
import { FeatureCard } from '@/devcomponents/igreen/feature-card'
import { Zap, Globe, Lock } from 'lucide-react'

export default function TestFeatureCardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Feature Cards</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Zap className="size-6" />}
          title="Performance"
          description="Otimizado para velocidade máxima com lazy loading"
          variant="default"
        />
        
        <FeatureCard
          icon={<Globe className="size-6" />}
          title="Global"
          description="Disponível em múltiplos idiomas e regiões"
          variant="highlighted"
        />
        
        <FeatureCard
          icon={<Lock className="size-6" />}
          title="Segurança"
          description="Criptografia de ponta a ponta e autenticação 2FA"
          variant="muted"
        />
      </div>
    </div>
  )
}
```

### 6.2 Executar

```bash
npm run dev
```

---

## Passo 7: Documentar no Storybook

```tsx
// apps/storybook/src/stories/FeatureCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { FeatureCard } from '@/devcomponents/igreen/feature-card'
import { Zap, Globe, Lock, Rocket } from 'lucide-react'

const meta: Meta<typeof FeatureCard> = {
  title: 'iGreen/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'highlighted', 'muted'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof FeatureCard>

export const Default: Story = {
  args: {
    icon: <Zap className="size-6" />,
    title: 'Performance',
    description: 'Otimizado para velocidade máxima',
    variant: 'default',
  },
}

export const Highlighted: Story = {
  args: {
    icon: <Globe className="size-6" />,
    title: 'Global',
    description: 'Disponível em múltiplos idiomas',
    variant: 'highlighted',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <FeatureCard
        icon={<Zap className="size-6" />}
        title="Default"
        description="Variante padrão"
        variant="default"
      />
      <FeatureCard
        icon={<Rocket className="size-6" />}
        title="Highlighted"
        description="Com destaque"
        variant="highlighted"
      />
      <FeatureCard
        icon={<Lock className="size-6" />}
        title="Muted"
        description="Mais sutil"
        variant="muted"
      />
    </div>
  ),
}
```

---

## Passo 8: Empacotar para NPM

### 8.1 Sincronizar para Packages

```bash
npm run sync feature-card
```

Isso cria:
```
packages/components/igreen/feature-card/
├── src/
│   ├── component.tsx
│   ├── types.ts
│   ├── styles.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### 8.2 Build

```bash
cd packages/components/igreen/feature-card
npm install
npm run build
```

### 8.3 Publicar

```bash
npm publish --registry http://localhost:4873
```

---

## Boas Práticas

### ✅ DO

- Usar tokens semânticos do iGreen
- Documentar props com JSDoc
- Separar lógica (component.tsx) de estilos (styles.ts)
- Exportar tipos para consumo externo
- Adicionar handlers de acessibilidade (role, tabIndex)

### ❌ DON'T

- Usar cores hardcoded (`bg-blue-500`)
- Colocar tudo em um único arquivo gigante
- Esquecer de documentar o componente
- Ignorar responsividade
- Deixar de testar no Storybook

---

## Resumo dos Comandos

| Etapa | Comando |
|-------|---------|
| Criar estrutura | `mkdir -p devcomponents/igreen/[nome]` |
| Testar | `npm run dev` |
| Storybook | `npm run storybook` |
| Sincronizar | `npm run sync feature-card` |
| Build | `cd packages/components/igreen/feature-card && npm run build` |
| Publicar | `npm publish --registry http://localhost:4873` |

---

## Checklist

- [ ] Estrutura multi-arquivo criada em `devcomponents/igreen/`
- [ ] Tipos definidos em `types.ts`
- [ ] Estilos com CVA em `styles.ts`
- [ ] Componente implementado em `component.tsx`
- [ ] Index exportando tudo
- [ ] Testado localmente
- [ ] Story criada no Storybook
- [ ] Sincronizado e publicado

---

## Próximos Passos

- [Adicionar Tokens CSS](./03_ADICIONANDO_TOKENS.md)
- [Workflow de Desenvolvimento](./04_WORKFLOW_DESENVOLVIMENTO.md)
- [Versionamento e Publicação](./06_VERSIONAMENTO_PUBLICACAO.md)
