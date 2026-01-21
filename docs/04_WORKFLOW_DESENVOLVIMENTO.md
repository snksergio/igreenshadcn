# 🔄 Tutorial: Workflow de Desenvolvimento

> Este tutorial apresenta o fluxo completo de desenvolvimento de componentes no iGreen Design System.

---

## 📋 Visão Geral do Fluxo

```
┌──────────────────────────────────────────────────────┐
│                iGreen Development Workflow            │
└──────────────────────────────────────────────────────┘

1. DESENVOLVIMENTO (devcomponents/)
   ↓
   Criar/Estilizar componente
   Testar localmente (Next.js app)
   Documentar no Storybook
   
2. VALIDAÇÃO
   ↓
   Revisar visual e funcional
   Garantir tokens iGreen
   Confirmar responsividade
   
3. EMPACOTAMENTO (packages/components/)
   ↓
   Sincronizar devcomponents → packages
   Build TypeScript → JavaScript
   Gerar tipos (.d.ts)
   
4. PUBLICAÇÃO (Verdaccio NPM)
   ↓
   Versionar pacote (patch/minor/major)
   Publicar no registry local
   Verificar disponibilidade
   
5. CONSUMO (Projetos externos)
   ↓
   npm install @igreen/component
   Importar e usar
```

---

## Etapa 1: Desenvolvimento

### 1.1 Ambiente de Sandbox

**Shadcn Component:**
```bash
# Instalar componente do shadcn
npx shadcn@latest add badge

# Arquivo criado em:
devcomponents/shadcn/badge.tsx
```

**iGreen Component:**
```bash
# Criar estrutura
mkdir -p devcomponents/igreen/feature-card

# Arquivos a criar:
devcomponents/igreen/feature-card/
├── component.tsx
├── types.ts
├── styles.ts
└── index.ts
```

### 1.2 Aplicar Design System

Sempre usar tokens semânticos:

```tsx
// ❌ Evite
className="bg-blue-500 text-white border-gray-200"

// ✅ Use
className="bg-bg-primary text-fg-on-primary border-border-primary"
```

### 1.3 Testar Localmente

```tsx
// app/playground/page.tsx
import { Badge } from '@/devcomponents/shadcn/badge'

export default function Playground() {
  return (
    <div className="p-8">
      <Badge variant="default">Testing</Badge>
    </div>
  )
}
```

```bash
npm run dev
# → http://localhost:3000/playground
```

---

## Etapa 2: Documentação no Storybook

### 2.1 Criar Story

```tsx
// apps/storybook/src/stories/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/devcomponents/shadcn/badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: 'Badge Text' }
}
```

### 2.2 Visualizar

```bash
npm run storybook
# → http://localhost:6006
```

---

## Etapa 3: Sincronizar para Packages

### 3.1 Opção A: Script Automático (Recomendado)

```bash
# Sincroniza componente de devcomponents → packages
npm run sync badge
```

**O que acontece:**
1. Detecta se é shadcn ou igreen
2. Cria estrutura em `packages/components/[tipo]/badge/`
3. Copia arquivos fonte para `/src`
4. Atualiza imports (`@/lib/utils` → `@igreen/utils`)
5. Gera `package.json` e `tsconfig.json`

### 3.2 Opção B: Setup Manual

```bash
# Criar estrutura do pacote
npm run setup-component badge shadcn

# Copiar arquivo manualmente
cp devcomponents/shadcn/badge.tsx packages/components/shadcn/badge/src/
```

---

## Etapa 4: Build do Pacote

### 4.1 Build Individual

```bash
cd packages/components/shadcn/badge
npm install
npm run build
```

**Resultado:**
```
packages/components/shadcn/badge/dist/
├── badge.js           # JavaScript compilado
├── badge.d.ts         # Tipos TypeScript
├── badge.js.map       # Source map
├── index.js
└── index.d.ts
```

### 4.2 Build de Todos

```bash
# Na raiz do projeto
npm run build:all-components
```

Isso builda todos os pacotes em `packages/components/`.

---

## Etapa 5: Versionamento

### 5.1 Semver (Semantic Versioning)

| Tipo | Quando Usar | Exemplo |
|------|-------------|---------|
| **patch** | Bug fixes, pequenas correções | 1.0.0 → 1.0.1 |
| **minor** | Novas features (backward compatible) | 1.0.1 → 1.1.0 |
| **major** | Breaking changes | 1.1.0 → 2.0.0 |

### 5.2 Bump de Versão

```bash
# Opção 1: Manual (na pasta do componente)
cd packages/components/shadcn/badge
npm version patch

# Opção 2: Script helper
npm run version-component badge patch
```

---

## Etapa 6: Publicação

### 6.1 Garantir Verdaccio Rodando

```bash
# Em um terminal separado
npm run registry:start
```

### 6.2 Publicar Componente

```bash
# Opção 1: Manual
cd packages/components/shadcn/badge
npm publish --registry http://localhost:4873

# Opção 2: Script
npm run publish-component badge
```

### 6.3 Verificar Publicação

```bash
npm info @igreen/badge --registry http://localhost:4873
```

Deve mostrar:
```
@igreen/badge@1.0.1 | Proprietary | deps: 3 | versions: 2
iGreen Design System - Badge Component
...
```

---

## Etapa 7: Consumo em Projeto

### 7.1 Instalar em Projeto Externo

```bash
cd ~/meu-projeto
npm install @igreen/badge --registry http://localhost:4873
```

### 7.2 Usar no Código

```tsx
// app/page.tsx
import { Badge } from '@igreen/badge'
import '@igreen/themes/igreen'  // Importar tema

export default function Home() {
  return (
    <Badge variant="default">Status: Active</Badge>
  )
}
```

---

## Workflow Resumido por Tipo

### Shadcn Component

```bash
# 1. Instalar
npx shadcn@latest add badge

# 2. Customizar
code devcomponents/shadcn/badge.tsx

# 3. Testar
npm run dev

# 4. Story
code apps/storybook/src/stories/Badge.stories.tsx
npm run storybook

# 5. Sincronizar
npm run sync badge

# 6. Build & Publish
cd packages/components/shadcn/badge
npm run build
npm publish --registry http://localhost:4873
```

### iGreen Component

```bash
# 1. Criar estrutura
mkdir -p devcomponents/igreen/feature-card

# 2. Implementar
# component.tsx, types.ts, styles.ts, index.ts

# 3. Testar
npm run dev

# 4. Story
code apps/storybook/src/stories/FeatureCard.stories.tsx

# 5. Sincronizar
npm run sync feature-card

# 6. Build & Publish
cd packages/components/igreen/feature-card
npm run build
npm publish --registry http://localhost:4873
```

---

## Scripts de Automação

| Script | Uso |
|--------|-----|
| `npm run sync [nome]` | Sincronizar dev → packages |
| `npm run setup-component [nome] [tipo]` | Criar estrutura de pacote |
| `npm run build:all-components` | Build de todos os componentes |
| `npm run version-component [nome] [tipo]` | Bump de versão |
| `npm run publish-component [nome]` | Publicar componente |
| `npm run publish:all` | Publicar todos os pacotes |

Detalhes completos: [Referência de Scripts](./08_REFERENCIA_SCRIPTS.md)

---

## Checklist Completo

### Desenvolvimento
- [ ] Componente criado em `devcomponents/`
- [ ] Tokens iGreen aplicados
- [ ] Testado em `/playground`
- [ ] Story criada no Storybook

### Empacotamento
- [ ] Sincronizado para `packages/components/`
- [ ] Dependencies corretas no `package.json`
- [ ] Build executado com sucesso
- [ ] `dist/` gerado corretamente

### Publicação
- [ ] Versão atualizada (semver)
- [ ] Verdaccio rodando
- [ ] Publicado no registry
- [ ] Verificado com `npm info`

### Consumo
- [ ] Instalado em projeto teste
- [ ] Importação funcionando
- [ ] Tema carregado
- [ ] Visual correto

---

## Troubleshooting

### "Cannot find module @igreen/utils"

```bash
cd packages/components/shadcn/badge
npm install @igreen/utils --registry http://localhost:4873
```

### "Build failed: Type error"

Verificar `tsconfig.json`:
```json
{
  "extends": "../../../../tsconfig.base.json",  // 4 níveis!
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

### "Package not found in registry"

```bash
# Verificar se Verdaccio está rodando
npm run registry:start

# Verificar publicação
npm info @igreen/badge --registry http://localhost:4873
```

---

## Próximos Passos

- [Storybook Detalhado](./05_STORYBOOK.md)
- [Versionamento e Publicação](./06_VERSIONAMENTO_PUBLICACAO.md)
- [Instalação por Usuários](./07_INSTALACAO_CONSUMO.md)
