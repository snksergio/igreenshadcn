# 📚 Tutorial: Documentando no Storybook

> Este tutorial mostra como criar e organizar stories para componentes no Storybook.

---

## 📋 O que é Storybook?

Storybook é uma ferramenta de documentação interativa que permite:
- **Visualizar** componentes isoladamente
- **Testar** todas as variantes e estados
- **Documentar** props e uso
- **Compartilhar** com designers e stakeholders

---

## Estrutura de Stories

```
apps/storybook/
├── src/
│   └── stories/
│       ├── Badge.stories.tsx       # shadcn components
│       ├── Button.stories.tsx
│       └── FeatureCard.stories.tsx # iGreen components
├── .storybook/
│   ├── main.ts                     # Configuração
│   └── preview.ts                  # Decorators globais
└── package.json
```

---

## Passo 1: Criar Story Básica

### 1.1 Template Simples

```tsx
// apps/storybook/src/stories/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/devcomponents/shadcn/badge'

// Metadata do componente
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',           // Categoria e nome
  component: Badge,
  tags: ['autodocs'],                  // Gera docs automaticamente
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success'],
      description: 'Estilo visual do badge'
    },
    children: {
      control: 'text',
      description: 'Conteúdo do badge'
    }
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// Story padrão
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default'
  }
}
```

---

## Passo 2: Stories com Variantes

### 2.1 Todas as Variantes

```tsx
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}
```

### 2.2 Com Estados

```tsx
export const WithStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Normal</h3>
        <Badge>Normal Badge</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Hover (simulated)</h3>
        <Badge className="hover:bg-bg-primary-hover">Hover Me</Badge>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">With Icon</h3>
        <Badge>
          <CheckCircle className="size-3 mr-1" />
          Verified
        </Badge>
      </div>
    </div>
  ),
}
```

---

## Passo 3: Documentar Props

### 3.1 Com JSDoc no Componente

```tsx
// devcomponents/shadcn/badge.tsx

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variante visual do badge
   * @default 'default'
   */
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline'
  
  /**
   * Conteúdo do badge
   */
  children: React.ReactNode
  
  /**
   * Classes CSS adicionais
   */
  className?: string
}
```

Storybook extrai isso automaticamente com `tags: ['autodocs']`!

### 3.2 ArgTypes Customizados

```tsx
const meta: Meta<typeof Badge> = {
  // ...
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'destructive', 'outline'],
      description: 'Estilo visual do badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      }
    },
    children: {
      control: 'text',
      description: 'Conteúdo exibido dentro do badge'
    },
    className: {
      control: 'text',
      description: 'Classes Tailwind CSS adicionais'
    }
  },
}
```

---

## Passo 4: Organizando Stories

### 4.1 Hierarquia de Pastas

Use `/` no `title` para criar hierarquia:

```tsx
// Componentes shadcn
title: 'Components/Badge'           // → Components > Badge
title: 'Components/Form/Input'      // → Components > Form > Input

// Componentes iGreen
title: 'iGreen/FeatureCard'         // → iGreen > FeatureCard
title: 'iGreen/Layout/Container'    // → iGreen > Layout > Container
```

### 4.2 Estrutura Recomendada

```
Storybook Sidebar:
├── Components (shadcn-based)
│   ├── Badge
│   ├── Button
│   ├── Input
│   └── ...
│
├── iGreen (custom components)
│   ├── FeatureCard
│   ├── DataTable
│   └── ...
│
└── Themes
    ├── Colors
    ├── Typography
    └── Spacing
```

---

## Passo 5: Temas no Storybook

### 5.1 Configurar Tema Global

```ts
// apps/storybook/.storybook/preview.ts
import '@igreen/themes/igreen'
import '../src/styles/globals.css'

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#0a0a0a' },
    ],
  },
}
```

### 5.2 Toolbar para Dark Mode

```ts
// apps/storybook/.storybook/preview.ts
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
}
```

Adicionar decorator:

```tsx
import { useEffect } from 'react'

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme

    useEffect(() => {
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    return <Story />
  },
]
```

---

## Passo 6: Exemplo Completo - Componente Complexo

```tsx
// apps/storybook/src/stories/FeatureCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { FeatureCard } from '@/devcomponents/igreen/feature-card'
import { Zap, Globe, Lock, Rocket } from 'lucide-react'

const meta: Meta<typeof FeatureCard> = {
  title: 'iGreen/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',  // Centralizar story
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'highlighted', 'muted'],
    },
    icon: {
      control: false,  // Não mostrar control (é ReactNode)
      description: 'Ícone do card (React component)'
    },
  },
}

export default meta
type Story = StoryObj<typeof FeatureCard>

// Story Padrão (editável)
export const Default: Story = {
  args: {
    icon: <Zap className="size-6" />,
    title: 'Performance',
    description: 'Otimizado para velocidade máxima com lazy loading e code splitting',
    variant: 'default',
  },
}

// Highlighted Variant
export const Highlighted: Story = {
  args: {
    icon: <Rocket className="size-6" />,
    title: 'Rápido Deploy',
    description: 'Deploy em segundos com CI/CD integrado',
    variant: 'highlighted',
  },
}

// Grid Layout
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <FeatureCard
        icon={<Zap className="size-6" />}
        title="Performance"
        description="Otimizado para velocidade"
        variant="default"
      />
      <FeatureCard
        icon={<Globe className="size-6" />}
        title="Global"
        description="Disponível mundialmente"
        variant="highlighted"
      />
      <FeatureCard
        icon={<Lock className="size-6" />}
        title="Seguro"
        description="Criptografia de ponta a ponta"
        variant="muted"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',  // Usar tela cheia
  },
}

// Interativo
export const Interactive: Story = {
  args: {
    icon: <Zap className="size-6" />,
    title: 'Clique-me',
    description: 'Este card tem onClick handler',
    variant: 'default',
    onClick: () => alert('Card clicked!'),
  },
}
```

---

## Passo 7: Executar Storybook

### 7.1 Dev Mode

```bash
npm run storybook
```

Abre em: `http://localhost:6006`

### 7.2 Build Estático

```bash
cd apps/storybook
npm run build-storybook
```

Gera pasta `storybook-static/` para deploy.

---

## Boas Práticas

### ✅ DO

- Criar story para cada variante importante
- Documentar props com JSDoc no componente
- Organizar em hierarquia lógica (`Components/...`, `iGreen/...`)
- Mostrar casos de uso reais
- Testar responsividade

### ❌ DON'T

- Criar 50 stories para cada pequena mudança
- Deixar de documentar props
- Misturar tudo na raiz (use subpastas)
- Esquecer de testar dark mode

---

## Comandos de Referência

| Comando | Descrição |
|---------|-----------|
| `npm run storybook` | Iniciar Storybook em dev mode |
| `npm run build-storybook` | Build estático |
| `npm run storybook -- --no-open` | Iniciar sem abrir browser |

---

## Checklist

- [ ] Story criada em `apps/storybook/src/stories/`
- [ ] Metadata configurada (`title`, `component`, `tags`)
- [ ] ArgTypes documentados
- [ ] Variantes principais showcased
- [ ] Props documentadas no componente (JSDoc)
- [ ] Testado em light e dark mode
- [ ] Responsividade verificada

---

## Próximos Passos

- [Workflow de Desenvolvimento](./04_WORKFLOW_DESENVOLVIMENTO.md)
- [Versionamento e Publicação](./06_VERSIONAMENTO_PUBLICACAO.md)
- [Referência de Scripts](./08_REFERENCIA_SCRIPTS.md)
