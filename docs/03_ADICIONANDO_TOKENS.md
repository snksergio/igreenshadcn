# 🎨 Tutorial: Adicionando Novos Tokens CSS

> Este tutorial explica como adicionar e gerenciar tokens CSS (variáveis) no sistema de temas do iGreen.

---

## 📋 Estrutura de Temas

Os tokens CSS ficam em: `packages/themes/src/[theme-name]/`

```
packages/themes/src/
├── igreen/              # Tema iGreen (padrão)
│   ├── primitives/      # Cores brutas (--brand-500, --neutral-100)
│   ├── semantic/        # Semântica (--bg-primary, --fg-error)
│   ├── effects/         # Shadows, gradientes
│   └── index.css        # Importa tudo
├── solarorange/         # Tema alternativo
└── bridge/              # Compatibilidade shadcn
    └── shadcn-compat.css
```

---

## Camadas de Tokens

### 1️⃣ Primitives (Cores Brutas)

**Onde:** `packages/themes/src/igreen/primitives/colors.css`

**O que são:** Paleta de cores base sem contexto semântico.

```css
:root {
  /* Brand color scale */
  --brand-50: oklch(0.97 0.01 158);
  --brand-100: oklch(0.94 0.03 158);
  --brand-500: oklch(0.52 0.15 158);   /* ← Adicionando novo tom */
  --brand-900: oklch(0.25 0.08 158);
  
  /* Neutral scale */
  --neutral-50: oklch(0.98 0 0);
  --neutral-500: oklch(0.50 0 0);
}
```

### 2️⃣ Semantic (Intenção)

**Onde:** `packages/themes/src/igreen/semantic/backgrounds.css`

**O que são:** Tokens com significado (uso específico).

```css
:root {
  /* Primary backgrounds */
  --bg-primary: var(--brand-500);
  --bg-primary-hover: var(--brand-600);
  
  /* Adicionar novo contexto */
  --bg-info: var(--info-500);
  --bg-info-hover: var(--info-600);
}

/* Dark mode overrides */
.dark {
  --bg-primary: var(--brand-400);
  --bg-info: var(--info-400);
}
```

### 3️⃣ Effects (Visuais)

**Onde:** `packages/themes/src/igreen/effects/shadows.css`

**O que são:** Efeitos visuais (sombras, gradientes).

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  
  /* Novo: Shadow colorida */
  --shadow-brand: 0 4px 12px 0 var(--brand-500 / 0.2);
}
```

---

## Exemplo Completo: Adicionando Token "Info"

### Passo 1: Adicionar Primitivo

```css
/* packages/themes/src/igreen/primitives/colors.css */

:root {
  /* ... cores existentes ... */
  
  /* Info color scale (novo) */
  --info-50: oklch(0.97 0.02 240);
  --info-100: oklch(0.94 0.05 240);
  --info-200: oklch(0.88 0.10 240);
  --info-300: oklch(0.80 0.15 240);
  --info-400: oklch(0.68 0.18 240);
  --info-500: oklch(0.56 0.20 240);  /* Cor principal */
  --info-600: oklch(0.48 0.18 240);
  --info-700: oklch(0.38 0.15 240);
  --info-800: oklch(0.28 0.10 240);
  --info-900: oklch(0.18 0.05 240);
}

/* Dark mode adjustments */
.dark {
  --info-50: oklch(0.18 0.05 240);
  --info-500: oklch(0.68 0.18 240);
  --info-900: oklch(0.97 0.02 240);
}
```

### Passo 2: Adicionar Semântico

```css
/* packages/themes/src/igreen/semantic/backgrounds.css */

:root {
  /* Info backgrounds */
  --bg-info: var(--info-500);
  --bg-info-hover: var(--info-600);
  --bg-info-subtle: var(--info-50);
}
```

```css
/* packages/themes/src/igreen/semantic/foregrounds.css */

:root {
  /* Info text */
  --fg-info: var(--info-700);
  --fg-on-info: var(--neutral-0);  /* Text on info background */
}

.dark {
  --fg-info: var(--info-300);
}
```

```css
/* packages/themes/src/igreen/semantic/borders.css */

:root {
  --border-info: var(--info-500);
}
```

### Passo 3: Build do Tema

```bash
cd packages/themes
npm run build
```

Isso gera:
```
packages/themes/dist/
├── igreen.css          # Tema compilado
├── solarorange.css
└── bridge.css
```

### Passo 4: Testar em Componente

```tsx
// devcomponents/shadcn/badge.tsx

const badgeVariants = cva(
  "...",
  {
    variants: {
      variant: {
        // ... variantes existentes ...
        
        // Nova variante info
        info: [
          "bg-bg-info text-fg-on-info border-border-info",
          "hover:bg-bg-info-hover"
        ],
      }
    }
  }
)
```

Testar:
```tsx
<Badge variant="info">New Info Badge</Badge>
```

### Passo 5: Publicar Tema Atualizado

```bash
cd packages/themes
npm version patch  # 1.2.0 → 1.2.1
npm run build
npm publish --registry http://localhost:4873
```

---

## Adicionando Nova Categoria de Token

### Exemplo: Tokens de Spacing Customizado

#### 1. Criar Arquivo

```css
/* packages/themes/src/igreen/spacing/layout.css */

:root {
  /* Container widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  
  /* Page spacing */
  --page-padding-x: 1rem;
  --page-padding-y: 2rem;
  
  /* Section gaps */
  --section-gap: 4rem;
}

@media (min-width: 768px) {
  :root {
    --page-padding-x: 2rem;
    --section-gap: 6rem;
  }
}
```

#### 2. Importar no Index

```css
/* packages/themes/src/igreen/index.css */

@import './primitives/colors.css';
@import './semantic/backgrounds.css';
/* ... outros imports ... */
@import './spacing/layout.css';  /* ← Novo */
```

#### 3. Build

```bash
cd packages/themes
npm run build
```

---

## Usando Tokens no Tailwind CSS

O sistema automaticamente converte tokens CSS em classes Tailwind.

### Exemplo Automático

Token CSS:
```css
--bg-info: ...;
```

Classe Tailwind gerada:
```tsx
<div className="bg-bg-info">...</div>
```

### Se o Token Não Aparecer

Verifique `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Tokens são injetados automaticamente via @theme
        // Se não funcionar, adicione manualmente:
        'bg-info': 'var(--bg-info)',
      }
    }
  }
}
```

---

## Boas Práticas

### ✅ DO

- Seguir nomenclatura: `--[categoria]-[nome]-[valor]`
- Usar OKLCH para cores (melhor percepção)
- Documentar propósito do token
- Sempre adicionar modo escuro
- Testar em todos os temas

### ❌ DON'T

- Usar RGB ou HEX direto (`#FF0000`)
- Criar tokens muito específicos (`--button-submit-hover`)
- Esquecer de buildar após alterar
- Deixar de versionar o pacote de temas

---

## Estrutura Completa de Nomenclatura

```
Primitives:
  --[color]-[scale]           ex: --brand-500, --neutral-100

Semantic:
  --bg-[context][-state]      ex: --bg-primary, --bg-primary-hover
  --fg-[context]              ex: --fg-error, --fg-on-primary
  --border-[context]          ex: --border-default, --border-strong

Effects:
  --shadow-[size]             ex: --shadow-sm, --shadow-lg
  --gradient-[name]           ex: --gradient-shine

Spacing:
  --[type]-[size]             ex: --container-lg, --section-gap

Components:
  --[component]-[property]    ex: --button-height, --input-border-radius
```

---

## Comandos de Referência

| Ação | Comando |
|------|---------|
| Build temas | `cd packages/themes && npm run build` |
| Watch mode | `cd packages/themes && npm run dev` |
| Publicar | `npm version patch && npm publish --registry http://localhost:4873` |
| Testar local | Importar em `app/globals.css` |

---

## Checklist

- [ ] Token adicionado em arquivo correto (primitives/semantic/effects)
- [ ] Modo escuro considerado (`.dark`)
- [ ] Build executado com sucesso
- [ ] Testado em componente
- [ ] Classe Tailwind funcionando
- [ ] Tema versionado e publicado

---

## Próximos Passos

- [Workflow de Desenvolvimento](./04_WORKFLOW_DESENVOLVIMENTO.md)
- [Versionamento e Publicação](./06_VERSIONAMENTO_PUBLICACAO.md)
- [Referência de Scripts](./08_REFERENCIA_SCRIPTS.md)
