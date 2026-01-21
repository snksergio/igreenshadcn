# 🎨 DevComponents - Área de Desenvolvimento (Sandbox)

Esta pasta é o **sandbox de desenvolvimento** onde você trabalha nos componentes ANTES de empacotá-los para produção.

---

## 📁 Estrutura

```
devcomponents/
├── shadcn/          # Componentes baseados em shadcn/ui (estilizados)
│   ├── button.tsx
│   ├── input.tsx
│   └── ...
└── igreen/          # Componentes próprios do iGreen (100% custom)
    ├── data-table/
    └── ...
```

---

## 🔄 Workflow de Desenvolvimento

### 1. **Adicionar Componente Shadcn**
```bash
# Na raiz do monorepo
npx shadcn@latest add badge

# ↓ Arquivo criado em:
devcomponents/shadcn/badge.tsx
```

### 2. **Estilizar Localmente**
Edite `devcomponents/shadcn/badge.tsx` aplicando:
- Variáveis CSS do iGreen
- Variantes customizadas
- Ajustes de design

### 3. **Testar no App Local**
Use o app Next.js da raiz para testar:
```tsx
// app/page.tsx
import { Badge } from '@/devcomponents/shadcn/badge'

<Badge variant="success">Testando</Badge>
```

### 4. **Empacotar para Produção**
Quando o componente estiver 100%, empacote para NPM:

```bash
# Crie a estrutura do pacote
mkdir -p packages/components/shadcn/badge
cd packages/components/shadcn/badge

# Copie o componente
cp ../../../../devcomponents/shadcn/badge.tsx src/badge.tsx

# Crie package.json
# Crie tsconfig.json
# Build e publish
```

---

## 🎯 Quando usar cada pasta?

| Pasta | Quando Usar |
|-------|-------------|
| **`shadcn/`** | Componente vem do shadcn/ui (você só estiliza) |
| **`igreen/`** | Componente 100% próprio (ex: DataTable, KanbanBoard) |

---

## ⚠️ Importante

- **NÃO publique direto desta pasta** - Esta é apenas para desenvolvimento
- **Teste localmente** antes de empacotar
- **Depois de empacotar**, pode remover daqui (ou manter como referência)

---

## 📝 Exemplo Completo: Adicionar Badge

```bash
# 1. Adicionar do shadcn
npx shadcn@latest add badge

# 2. Editar devcomponents/shadcn/badge.tsx
# (aplicar estilos iGreen)

# 3. Testar em app/page.tsx
# import { Badge } from '@/devcomponents/shadcn/badge'

# 4. Quando pronto, empacotar:
npm run create-component-package badge
# (script helper que cria packages/components/shadcn/badge/)

# 5. Publicar
cd packages/components/shadcn/badge
npm run build
npm publish --registry http://localhost:4873
```
