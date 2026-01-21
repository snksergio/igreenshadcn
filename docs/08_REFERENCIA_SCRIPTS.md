# 🔧 Referência de Scripts de Automação

> Documentação completa de todos os scripts de automação do iGreen Design System.

---

## 📋 Índice

1. [Scripts de Build](#scripts-de-build)
2. [Scripts de Setup](#scripts-de-setup)
3. [Scripts de Versionamento](#scripts-de-versionamento)
4. [Scripts de Publicação](#scripts-de-publicação)
5. [Scripts de Validação](#scripts-de-validação)
6. [Scripts Legacy](#scripts-legacy)

---

## Scripts de Build

### `build-all-components.ts`

**Para que serve:**
- Faz build de todos os componentes em `packages/components/`
- Scaneia recursivamente `shadcn/` e `igreen/`
- Executa `npm run build` em cada pacote

**Como usar:**
```bash
npm run build:all-components
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| Nenhum | - | Script sem argumentos |

**Impacto:**
- **Arquivos modificados**: `packages/components/*/dist/` (todos os pacotes)
- **O que é criado**: Pasta `dist/` com arquivos `.js`, `.d.ts`, `.map`
- **Efeitos colaterais**: Pode demorar vários minutos se houver muitos componentes

**Exemplo prático:**
```bash
# Build de todos os componentes antes de publicar tudo
npm run build:all-components

# Saída esperada:
# ✅ Building @igreen/button...
# ✅ Building @igreen/badge...
# ✅ Building @igreen/input...
# 🎉 Built 12 components successfully!
```

**Quando usar:**
- Antes de publicar múltiplos pacotes
- Após mudanças globais (ex: atualizar tsconfig.base.json)
- Para verificar que tudo compila sem erros

---

### `build-themes.ts` (dentro de packages/themes/)

**Para que serve:**
- Compila temas CSS de `src/` para `dist/`
- Processa `igreen`, `solarorange`, `bridge`
- Gera arquivos CSS minificados

**Como usar:**
```bash
cd packages/themes
npm run build
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `--watch` | Não | Modo watch para desenvolvimento |

**Impacto:**
- **Arquivos criados**: `packages/themes/dist/*.css`
- **O que é gerado**: `igreen.css`, `solarorange.css`, `bridge.css`

**Exemplo prático:**
```bash
# Build único
npm run build

# Watch mode (desenvolvimento)
npm run dev
```

**Quando usar:**
- Após adicionar/modificar tokens CSS
- Antes de publicar `@igreen/themes`
- Para testar mudanças de tema localmente

---

## Scripts de Setup

### `setup-new-component.ts`

**Para que serve:**
- Cria estrutura de pacote NPM para novo componente
- Gera `package.json`, `tsconfig.json`, `src/`
- Detecta automaticamente dependências

**Como usar:**
```bash
npm run setup-component <nome> <tipo>
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `<nome>` | Sim | Nome do componente (ex: `badge`) |
| `<tipo>` | Sim | Tipo: `shadcn` ou `igreen` |

**Impacto:**
- **Arquivos criados**:
  - `packages/components/<tipo>/<nome>/package.json`
  - `packages/components/<tipo>/<nome>/tsconfig.json`
  - `packages/components/<tipo>/<nome>/src/`
- **O que NÃO faz**: Não copia código de `devcomponents` (use `sync` para isso)

**Exemplo prático:**
```bash
# Criar pacote para badge shadcn
npm run setup-component badge shadcn

# Criar pacote para componente iGreen
npm run setup-component data-table igreen

# Saída:
# ✅ Estrutura criada em packages/components/shadcn/badge/
# 📝 Próximos passos:
#    1. Copiar código de devcomponents/
#    2. cd packages/components/shadcn/badge
#    3. npm install && npm run build
```

**Quando usar:**
- Ao criar novo componente do zero
- Quando `devcomponents` ainda não existe (planeja mentar primeiro)
- Para criar estrutura antes de implementar

---

### `sync-to-packages.ts`

**Para que serve:**
- Sincroniza componente de `devcomponents/` → `packages/components/`
- Detecta tipo automaticamente (shadcn ou igreen)
- Atualiza imports (`@/lib/utils` → `@igreen/utils`)
- Cria estrutura de pacote se não existir

**Como usar:**
```bash
npm run sync <nome-componente>
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `<nome-componente>` | Sim | Nome do componente a sincronizar |
| `--force` |  Não | Sobrescrever sem perguntar |

**Impacto:**
- **Arquivos modificados**: `packages/components/[tipo]/[nome]/src/*`
- **Imports atualizados**: Replace local imports com NPM packages
- **O que é criado**: Estrutura completa se não existir

**Exemplo prático:**
```bash
# Sincronizar badge (shadcn)
npm run sync badge

# Detecta automaticamente:
# 📁 Encontrado: devcomponents/shadcn/badge.tsx
# 📦 Sincronizando para: packages/components/shadcn/badge/
# ✅ Imports atualizados
# ✅ Estrutura criada
# 📝 Pronto para build!

# Sincronizar componente iGreen
npm run sync feature-card

# Detecta:
# 📁 Encontrado: devcomponents/igreen/feature-card/
# 📦 Copiando múltiplos arquivos...
# ✅ Sincronizado!
```

**Quando usar:**
- Após finalizar desenvolvimento em `devcomponents/`
- Quando quiser testar build do componente
- Antes de publicar no NPM

---

## Scripts de Versionamento

### `version-component.ts`

**Para que serve:**
- Atualiza versão de componente (semver)
- Modifica `package.json` do componente
- Opcionalmente cria git commit/tag

**Como usar:**
```bash
npm run version-component <nome> <tipo>
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `<nome>` | Sim | Nome do componente |
| `<tipo>` | Sim | Tipo de bump: `patch`, `minor`, `major` |
| `--no-git` | Não | Não criar git commit |

**Impacto:**
- **Arquivos modificados**: `packages/components/[tipo]/[nome]/package.json`
- **Git**: Cria commit e tag (se `--no-git` não passado)
- **Efeitos colaterais**: Nenhum no código, apenas metadata

**Exemplo prático:**
```bash
# Bug fix: 1.0.0 → 1.0.1
npm run version-component badge patch

# Nova feature: 1.0.1 → 1.1.0
npm run version-component badge minor

# Breaking change: 1.1.0 → 2.0.0
npm run version-component badge major

# Sem git commit
npm run version-component badge patch --no-git
```

**Quando usar:**
- Antes de publicar componente atualizado
- Após corrigir bugs (patch)
- Após adicionar features (minor)
- Após breaking changes (major)

---

## Scripts de Publicação

### `publish-component.ts`

**Para que serve:**
- Publica componente individual no Verdaccio
- Faz build automaticamente antes
- Verifica se Verdaccio está rodando

**Como usar:**
```bash
npm run publish-component <nome>
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `<nome>` | Sim | Nome do componente a publicar |
| `--skip-build` | Não | Não fazer build (use com cuidado!) |

**Impacto:**
- **Arquivos criados**: `dist/` (se não usar --skip-build)
- **Publicação**: Pacote aparece no Verdaccio
- **Efeitos colaterais**: Outros podem instalar a nova versão

**Exemplo prático:**
```bash
# Publicar badge (com build automático)
npm run publish-component badge

# Saída:
# 🔨 Building @igreen/badge...
# ✅ Build successful
# 📦 Publishing to http://localhost:4873...
# ✅ Published @igreen/badge@1.0.1

# Publicar sem build (se já buildou)
npm run publish-component badge --skip-build
```

**Quando usar:**
- Após versionar componente
- Quando quiser disponibilizar atualização
- Para testar publicação de componente individual

---

### `publish-all.ts`

**Para que serve:**
- Publica TODOS os pacotes do monorepo
- Inclui themes, utils, components
- Faz build de tudo antes

**Como usar:**
```bash
npm run publish:all
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `--dry-run` | Não | Simula sem publicar |
| `--filter <pattern>` | Não | Publica apenas pacotes que matched pattern |

**Impacto:**
- **Tempo**: Pode demorar 5-10 minutos
- **Publicação**: Todos os pacotes atualizados no Verdaccio
- **Registry**: Pode ficar temporariamente ocupado

**Exemplo prático:**
```bash
# Publicar tudo
npm run publish:all

# Dry run (teste)
npm run publish:all --dry-run

# Apenas componentes shadcn
npm run publish:all --filter shadcn

# Saída:
# 📦 Publishing @igreen/themes...
# 📦 Publishing @igreen/utils...
# 📦 Publishing @igreen/button...
# ...
# 🎉 Published 15 packages successfully!
```

**Quando usar:**
- Após mudanças globais que afetam todos
- Release de nova versão do design system
- Setup inicial do registry

---

## Scripts de Validação

### `validate-components.ts`

**Para que serve:**
- Valida estrutura de componentes em `packages/components/`
- Verifica `package.json`, `tsconfig.json`, `src/`, `dist/`
- Detecta problemas de configuração

**Como usar:**
```bash
npm run test:components
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `--fix` | Não | Tentar corrigir problemas automaticamente |
| `--verbose` | Não | Mostrar detalhes de todos os pacotes |

**Impacto:**
- **Somente leitura**: Não modifica arquivos (sem --fix)
- **Relatório**: Mostra erros e warnings

**Exemplo prático:**
```bash
# Validação básica
npm run test:components

# Saída:
# ✅ @igreen/button: OK
# ❌ @igreen/badge: Missing dist/ folder (run build)
# ⚠️  @igreen/input: package.json missing "types" field
# 
# 2 errors, 1 warning

# Com fix automático
npm run test:components --fix

# Verbose
npm run test:components --verbose
```

**Quando usar:**
- Após criar novos componentes
- Antes de fazer build-all
- Para debugar problemas de build
- Em CI/CD pipeline

---

### `validate-tokens.ts`

**Para que serve:**
- Valida tokens CSS em `packages/themes/src/`
- Verifica nomenclatura (--brand-500, --bg-primary)
- Detecta tokens duplicados ou órfãos
- Garante modo escuro está definido

**Como usar:**
```bash
npm run test:tokens
```

**Opções/Argumentos:**
| Argumento | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `--theme <name>` | Não | Validar apenas tema específico |

**Impacto:**
- **Somente leitura**: Não modifica CSS
- **Relatório**: Lista tokens com problemas

**Exemplo prático:**
```bash
# Validar todos os temas
npm run test:tokens

# Saída:
# ✅ igreen/primitives/colors.css: 156 tokens
# ❌ igreen/semantic/backgrounds.css: Token --bg-info sem dark mode
# ⚠️  solarorange/primitives/colors.css: Token --brand-550 não segue escala

# Apenas tema igreen
npm run test:tokens --theme igreen
```

**Quando usar:**
- Após adicionar novos tokens
- Antes de publicar `@igreen/themes`
- Para garantir consistência de nomenclatura

---

## Scripts Legacy

### `build-components.ts` (Legacy)

**Para que serve:**
- Build antigo para registry JSON
- Ainda usado para compatibilidade

**Status:** ⚠️ Pode ser removido após migração completa para NPM

**Como usar:**
```bash
npm run build:components
```

---

### `build-registry.ts` (Legacy)

**Para que serve:**
- Gera `public/registry/*.json`
- Approach antigo baseado em registry files

**Status:** ⚠️ Legacy - Sistema NPM é o novo padrão

**Como usar:**
```bash
npm run build:registry
```

---

### `create-component-package.ts` (Legacy)

**Para que serve:**
- Versão antiga de `setup-new-component.ts`
- Usava estrutura antiga `components/ui/`

**Status:** ❌ Substituído por `setup-new-component.ts` e `sync-to-packages.ts`

---

## Resumo Rápido

### Desenvolvimento
```bash
npm run sync <component>           # Sincronizar dev → packages
npm run setup-component <name> <type>  # Criar novo pacote
```

### Build
```bash
npm run build:all-components       # Build todos os componentes
cd packages/themes && npm run build  # Build temas
```

### Versão & Publicação
```bash
npm run version-component <name> <type>  # Bump version
npm run publish-component <name>    # Publicar um
npm run publish:all                 # Publicar todos
```

### Validação
```bash
npm run test:components            # Validar componentes
npm run test:tokens                # Validar tokens
npm run test:all                   # Validar tudo
```

---

## Workflow Completo Automatizado

```bash
# 1. Desenvolver em devcomponents/shadcn/badge.tsx

# 2. Sincronizar
npm run sync badge

# 3. Versionar
npm run version-component badge minor

# 4. Publicar
npm run publish-component badge

# 5. Verificar
npm info @igreen/badge --registry http://localhost:4873
```

---

## Criando Seu Próprio Script

Template para novos scripts:

```typescript
// scripts/meu-script.ts
#!/usr/bin/env tsx

/**
 * Descrição do que o script faz
 * Uso: npm run meu-script <args>
 */

import fs from 'fs'
import path from 'path'

// Argumentos
const args = process.argv.slice(2)

if (args.length === 0) {
    console.error('❌ Uso: npm run meu-script <arg>')
    process.exit(1)
}

// Lógica principal
async function main() {
    console.log('🚀 Executando meu script...')
    
    try {
        // ... seu código ...
        console.log('✅ Sucesso!')
    } catch (error) {
        console.error('❌ Erro:', error)
        process.exit(1)
    }
}

main().catch(console.error)
```

Adicionar em `package.json`:
```json
{
  "scripts": {
    "meu-script": "tsx scripts/meu-script.ts"
  }
}
```

---

## Próximos Passos

- [Workflow de Desenvolvimento](./04_WORKFLOW_DESENVOLVIMENTO.md)
- [Versionamento e Publicação](./06_VERSIONAMENTO_PUBLICACAO.md)
- [Instalação e Consumo](./07_INSTALACAO_CONSUMO.md)
