# 🗑️ Scripts Legacy - Plano de Limpeza

## Scripts Obsoletos para Deletar

### 1. ❌ `build-components.ts`
**Razão**: Usa estrutura antiga (`components/ui/`, `components/system/`)
**Substituído por**: `build-all-components.ts`
**Comando para deletar**:
```bash
rm scripts/build-components.ts
```

### 2. ❌ `build-registry.ts`
**Razão**: Abordagem legacy baseada em registry JSON files
**Status atual**: Sistema usa NPM packages (Verdaccio)  
**Comando para deletar**:
```bash
rm scripts/build-registry.ts
```

### 3. ❌ `create-component-package.ts`
**Razão**: Usa estrutura antiga e paths incorretos
**Substituído por**: `setup-new-component.ts` + `sync-to-packages.ts`
**Comando para deletar**:
```bash
rm scripts/create-component-package.ts
```

---

## Scripts que Precisam de Atualização

### 4. ⚠️ `validate-components.ts`
**Problema**:  
- Valida `components/ui/` e `components/system/` (não existem mais)
- Precisa validar `packages/components/shadcn/` e `packages/components/igreen/`

**Precisa atualizar**:
- Mudar paths para `packages/components/`
- Validar estrutura de pacotes NPM (package.json, tsconfig.json, dist/)
- Verificar builds estão OK

### 5. ⚠️ `validate-tokens.ts`
**Problema**:
- Valida pasta `theme/` (estrutura antiga)
- Precisa validar `packages/themes/src/`

**Precisa atualizar**:
- Mudar THEME_DIR para `packages/themes/src/igreen`
- Considerar múltiplos temas (igreen, solarorange)

---

## Scripts a Manter

### 6. ✅ `fix-radix-versions.ps1`
**Razão**: Utilitário específico que pode ser útil
**Status**: Manter como está
**Atualização necessária**: Ajustar paths para `packages/components/shadcn/`

---

## Resumo de Ações

```bash
# 1. Deletar obsoletos
rm scripts/build-components.ts
rm scripts/build-registry.ts  
rm scripts/create-component-package.ts

# 2. Atualizar validate scripts (criar versões novas)
# - Criar versão nova de validate-components.ts
# - Criar versão nova de validate-tokens.ts

# 3. Atualizar package.json (remover scripts antigos)
# Remover referências a scripts deletados
```

---

## Próximos Passos

1. ✅ Confirmar com usuário se pode deletar os 3 scripts obsoletos
2. ⚠️ Atualizar `validate-components.ts` e `validate-tokens.ts`
3. 📦 Atualizar `package.json` removendo comandos obsoletos
