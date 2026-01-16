# 🔄 Tutorial: Atualizando um Componente Existente

> Aprenda como atualizar componentes e propagar mudanças para o registry.

## Cenários Comuns

| Cenário | O que fazer |
|---------|-------------|
| Alterar estilos | Edit > Build > Publish |
| Adicionar variante | Edit > Build > Publish |
| Corrigir bug | Edit > Build > Publish |
| Breaking change | Edit > Bump version > Build > Publish |

---

## Fluxo Básico de Atualização

### 1. Editar o Componente

**UI Component:**
```bash
code components/ui/button.tsx
```

**System Component:**
```bash
code components/system/example-card/component.tsx
```

### 2. Testar Localmente

```bash
npm run dev
```

Valide visualmente que não quebrou nada.

### 3. Reconstruir o Registry

```bash
npm run build:components
```

O script substitui automaticamente o JSON anterior.

### 4. Validar

```bash
npm run test:components
```

### 5. Publicar

```bash
npm run cli:publish
```

---

## Controle de Versão

### Mudanças Pequenas (Patch)

Alterações que não quebram compatibilidade:
- Ajustes de estilos
- Correção de bugs
- Novas variantes opcionais

```bash
# Crie um changeset
npm run changeset

# Selecione: patch
# Descreva: "fix: adjust button hover color"
```

### Mudanças Significativas (Minor)

Novas funcionalidades retrocompatíveis:
- Novas props opcionais
- Novos componentes

```bash
npm run changeset
# Selecione: minor
```

### Breaking Changes (Major)

Mudanças que quebram compatibilidade:
- Renomear props
- Remover variantes
- Alterar comportamento padrão

```bash
npm run changeset
# Selecione: major
```

---

## Quando Rebuild É Necessário?

| Alteração | Precisa rebuild? |
|-----------|-----------------|
| Editou `.tsx` em `components/ui/` | ✅ Sim |
| Editou arquivos em `components/system/` | ✅ Sim |
| Editou tokens em `theme/` | ⚠️ Precisa `build:registry` |
| Editou CLI em `packages/cli/` | ⚠️ Precisa `cli:publish` |

---

## Fluxo Completo de Release

```bash
# 1. Fazer alterações
code components/ui/button.tsx

# 2. Testar
npm run dev

# 3. Reconstruir
npm run build:components

# 4. Validar
npm run test:all

# 5. Criar changeset
npm run changeset

# 6. Publicar CLI
npm run cli:publish
```

---

## FAQ

### O JSON não atualizou?

O script sobrescreve automaticamente. Verifique:
```bash
cat public/registry/components/button.json | head -20
```

### O CLI ainda usa a versão antiga?

Reinstale o CLI:
```bash
npm install -g @igreen/cli --registry http://localhost:4873
```

### Mudança não reflete no projeto destino?

Use a flag `--overwrite`:
```bash
igreen add button --overwrite
```
