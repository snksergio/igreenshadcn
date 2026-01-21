# iGreen Theme

Design System baseado em Shadcn/UI com Tailwind CSS v4.

## Estrutura

```
theme/
├── index.css                 # Entry point (importar este arquivo)
├── primitives/
│   ├── colors.css            # Escalas de cores (brand, neutral, feedback)
│   ├── typography.css        # Font sizes, weights, line-heights (proporcional)
│   ├── spacing.css           # Base spacing unit (--spacing)
│   └── index.css
├── semantic/
│   ├── colors.css            # bg-*, fg-*, border-*, ring-*
│   ├── effects.css           # Elevation, backdrop, icons, z-index
│   ├── motion.css            # Animações e transições (placeholder)
│   ├── sizing.css            # Form control heights
│   ├── typography.css        # Estilos de texto compostos
│   └── index.css
├── bridge/
│   └── shadcn.css            # Mapeamento para variáveis Shadcn/UI
└── README.md
```

## Instalação

### 1. Copiar a pasta `theme/` para seu projeto

### 2. Importar no `globals.css`

```css
@import "../theme/index.css";
@import "tailwindcss";
```

### 3. Mapear tokens no `@theme`

Adicione os mapeamentos necessários no bloco `@theme` do seu `globals.css`.
Consulte o arquivo `globals.css` deste projeto como referência.

## Tokens Disponíveis

### Cores Primitivas

| Scale | Classes |
|-------|---------|
| Brand (Green) | `bg-brand-500`, `text-brand-600`, etc. |
| Neutral (Grey) | `bg-neutral-200`, `text-neutral-800`, etc. |
| Success | `bg-success-500`, `text-success-600` |
| Warning | `bg-warning-500`, `text-warning-600` |
| Critical | `bg-critical-500`, `text-critical-600` |
| Info | `bg-info-500`, `text-info-600` |

### Cores Semânticas

| Category | Classes |
|----------|---------|
| Backgrounds | `bg-bg-primary`, `bg-bg-canvas`, `bg-bg-muted` |
| Foregrounds | `text-fg-main`, `text-fg-primary`, `text-fg-muted` |
| Borders | `border-border-default`, `border-border-primary` |
| Rings | `ring-ring-primary`, `ring-ring-critical` |

### Elevation (Profundidade)

```css
/* Backgrounds + Shadows em pares */
--bg-elevated-0 + --shadow-elevated-0  /* Base (flat) */
--bg-elevated-1 + --shadow-elevated-1  /* Cards, dropdowns */
--bg-elevated-2 + --shadow-elevated-2  /* Popovers, menus */
--bg-elevated-3 + --shadow-elevated-3  /* Modals, dialogs */
--bg-elevated-4 + --shadow-elevated-4  /* Toasts, notifications */
```

### Backdrop (Overlays)

| Token | Uso |
|-------|-----|
| `--backdrop-default` | Overlay padrão (50% opacidade) |
| `--backdrop-light` | Overlay claro (30% opacidade) |
| `--backdrop-dark` | Overlay escuro (70% opacidade) |
| `--backdrop-blur` | Overlay com blur |

### Icon Sizes

| Token | Tamanho | Uso |
|-------|---------|-----|
| `--icon-2xs` | 10px | Badges, indicadores |
| `--icon-xs` | 12px | Inline small |
| `--icon-sm` | 16px | Buttons small |
| `--icon-md` | 20px | Buttons default |
| `--icon-lg` | 24px | Headers |
| `--icon-xl` | 32px | Features |
| `--icon-2xl` | 40px | Heroes |

### Z-index Scale

| Token | Valor | Uso |
|-------|-------|-----|
| `--z-base` | 0 | Conteúdo base |
| `--z-docked` | 10 | Elementos fixos na página |
| `--z-dropdown` | 1000 | Dropdowns, selects |
| `--z-sticky` | 1020 | Headers sticky |
| `--z-fixed` | 1030 | Elementos fixed |
| `--z-modal-backdrop` | 1040 | Backdrop de modais |
| `--z-modal` | 1050 | Modais, dialogs |
| `--z-popover` | 1060 | Popovers |
| `--z-tooltip` | 1070 | Tooltips |
| `--z-toast` | 1080 | Toasts, notifications |

### Efeitos Visuais

| Token | Descrição |
|-------|-----------|
| `--shadow-inset-shine` | Brilho interno (botões primary) |
| `--gradient-shine` | Gradiente de brilho (top highlight) |

### Sistema de Tipografia (Proporcional)

Todos os tamanhos de fonte são calculados a partir de `--font-size-base`, mantendo as proporções do Tailwind.

```
--font-size-base (1rem = 16px)
     │
     ├──► text-xs:   × 0.75   = 12px
     ├──► text-sm:   × 0.875  = 14px
     ├──► text-base: × 1.0    = 16px  ← base
     ├──► text-lg:   × 1.125  = 18px
     ├──► text-xl:   × 1.25   = 20px
     └──► ...
```

**Para escalar toda a tipografia:**
```css
:root {
  --font-size-base: 1.125rem; /* 18px - todos os tamanhos escalam */
}
```

#### Estilos de Texto Compostos

Classes utilitárias que combinam size, weight, line-height e color:

| Classe | Tamanho | Peso | Cor |
|--------|---------|------|-----|
| `text-heading-1` | 4xl (36px) | bold | fg-main |
| `text-heading-2` | 3xl (30px) | semibold | fg-main |
| `text-heading-3` | 2xl (24px) | semibold | fg-moderate |
| `text-heading-4` | xl (20px) | semibold | fg-moderate |
| `text-heading-5` | lg (18px) | medium | fg-moderate |
| `text-heading-6` | base (16px) | medium | fg-subtle |
| `text-body` | base (16px) | normal | fg-main |
| `text-body-lg` | lg (18px) | normal | fg-main |
| `text-small` | sm (14px) | normal | fg-subtle |
| `text-muted-style` | sm (14px) | normal | fg-muted |
| `text-caption` | xs (12px) | normal | fg-muted |
| `text-label` | sm (14px) | medium | fg-main |

**Uso:**
```tsx
<h1 className="text-heading-1">Título da Página</h1>
<p className="text-body">Parágrafo de conteúdo...</p>
<span className="text-small">Informação secundária</span>
<span className="text-caption">Metadados</span>
```

### Sistema de Sizing (Form Controls)

O sistema de sizing é híbrido, mantendo compatibilidade com Shadcn e oferecendo tokens semânticos.

```
--spacing (0.25rem = 4px)
     │
     ├──► Tailwind: h-8, h-9, h-10... (Shadcn usa)
     │
     └──► Tokens: --h-formcontrol-sm, --h-formcontrol-md... (Design System usa)
```

#### Referência de Tamanhos

| Token Semântico | Classe Tailwind | Classe Nativa | Multiplicador | Pixels |
|-----------------|-----------------|---------------|---------------|--------|
| `--h-formcontrol-sm` | `h-formcontrol-sm` | `h-8` | × 8 | 32px |
| `--h-formcontrol-md` | `h-formcontrol-md` | `h-9` | × 9 | 36px |
| `--h-formcontrol-lg` | `h-formcontrol-lg` | `h-10` | × 10 | 40px |
| `--h-formcontrol-xl` | `h-formcontrol-xl` | `h-11` | × 11 | 44px |
| `--h-formcontrol-2xl` | `h-formcontrol-2xl` | `h-12` | × 12 | 48px |

#### Uso

**Componentes Shadcn (compatibilidade automática):**
```tsx
// Já vem com h-9, funciona automaticamente
<SelectTrigger className="h-9 ..." />
```

**Componentes customizados (semântico):**
```tsx
// Usa token semântico para clareza
<CustomInput className="h-formcontrol-md ..." />
```

#### Customização

**Criar tema mais compacto:**
```css
/* Apenas altere o multiplicador */
:root {
  --h-formcontrol-md: calc(var(--spacing) * 8); /* 32px ao invés de 36px */
}
```

**Alterar spacing base globalmente:**
```css
/* Afeta TODOS os componentes */
@theme {
  --spacing: 0.2rem; /* 3.2px - tema compacto */
}
```

## Dark Mode

O tema suporta dark mode automaticamente através da classe `.dark` no HTML.
As escalas de cores são invertidas para manter contraste adequado.

```html
<html class="dark">
  <!-- Tema escuro ativo -->
</html>
```

## Customização

### Alterar cor da marca

Edite os valores em `primitives/colors.css`:

```css
:root {
  /* Altere o Hue para mudar a cor base */
  --brand-500: oklch(0.62 0.16 155);  /* 155 = verde */
  --brand-500: oklch(0.62 0.16 220);  /* 220 = azul */
  --brand-500: oklch(0.62 0.16 25);   /* 25 = vermelho */
}
```

### Adicionar novos tokens

1. Adicione a variável no arquivo apropriado em `theme/`
2. Mapeie no `@theme` do `globals.css`
3. Use a classe Tailwind gerada

## Compatibilidade

- Next.js 15+
- Tailwind CSS v4
- Shadcn/UI (New York style)
