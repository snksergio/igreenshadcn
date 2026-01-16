# 🤝 Guia de Contribuição - iGreen Design System

Este documento explica como adicionar componentes, tokens e como funciona o workflow de desenvolvimento.

---

## 📋 Tabela de Conteúdo

1. [Estrutura do Projeto](#estrutura-do-projeto)
2. [Adicionando um Novo Componente](#adicionando-um-novo-componente)
3. [Adicionando um Novo Token](#adicionando-um-novo-token)
4. [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
5. [Publicando Alterações](#publicando-alterações)

---

## 📁 Estrutura do Projeto

```
igreenshadcn/
├── components/
│   ├── ui/              # Componentes Shadcn customizados (1 arquivo)
│   └── system/          # Componentes próprios (multi-arquivo)
├── theme/
│   ├── primitives/      # Valores brutos (cores, spacing)
│   ├── semantic/        # Significado (bg-primary, fg-error)
│   └── bridge/          # Mapeamento Shadcn
├── scripts/             # Scripts de automação
├── packages/cli/        # CLI (@igreen/cli)
└── public/registry/     # Arquivos gerados automaticamente
```

---

## 🎨 Adicionando um Novo Componente

### Componente UI (Shadcn Customizado)

1. **Instale o componente base** (se vier do Shadcn):
   ```bash
   npx shadcn@latest add card
   ```

2. **Customize em** `components/ui/card.tsx`:
   - Use tokens semânticos (`bg-bg-primary`, `text-fg-main`)
   - Adicione JSDoc no topo do arquivo
   - Adicione variantes extras se necessário

3. **Regenere o registry**:
   ```bash
   npm run build:components
   ```

4. **Valide**:
   ```bash
   npm run test:components
   ```

### Componente System (Próprio)

1. **Crie a pasta**: `components/system/meu-componente/`

2. **Crie os arquivos**:
   ```
   meu-componente/
   ├── component.tsx    # Componente principal
   ├── index.ts         # Exports
   ├── styles.ts        # Estilos (opcional)
   └── types.ts         # TypeScript types
   ```

3. **Regenere**: `npm run build:components`

---

## 🎨 Adicionando um Novo Token

### 1. Primitive (Nova Cor Base)

Em `theme/primitives/colors.css`:
```css
/**
 * @token special-500
 * @description Cor especial para campanhas
 */
--special-500: oklch(65% 0.2 180);
```

### 2. Semantic (Uso da Cor)

Em `theme/semantic/colors.css`:
```css
--bg-campaign: var(--special-500);
--fg-campaign: var(--neutral-50);
```

### 3. Regenerar

```bash
npm run build:registry
```

---

## 🔄 Workflow de Desenvolvimento

### Setup Inicial
```bash
# Instalar dependências
npm install

# Iniciar Verdaccio (registry local)
npm run registry:start
```

### Desenvolvimento Diário
```bash
# Validar e buildar tudo, depois iniciar dev server
npm run dev:full
```

### Testando o CLI
```bash
# Publicar no Verdaccio local
npm run cli:publish

# Testar em outro terminal
npm install -g @igreen/cli --registry http://localhost:4873
igreen init
```

---

## 🚀 Publicando Alterações

### Checklist de PR

- [ ] Tokens têm JSDoc (`@token`, `@description`)?
- [ ] `npm run test:tokens` passou?
- [ ] `npm run test:components` passou?
- [ ] Documentação atualizada?

### Fluxo de Release

1. Crie changeset:
   ```bash
   npm run changeset
   ```

2. Atualize versões:
   ```bash
   npm run version
   ```

3. Publique:
   ```bash
   npm run release
   ```

---

## 📚 Recursos

- [CONVENTIONS.md](../CONVENTIONS.md) - Regras de nomenclatura
- [theme/README.md](../theme/README.md) - Arquitetura de tokens
