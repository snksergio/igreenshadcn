# 📦 Components - Área de Produção (NPM Packages)

Esta pasta contém os **componentes empacotados** prontos para publicação no NPM.

---

## 📁 Estrutura

```
packages/components/
├── shadcn/              # Componentes shadcn/ui estilizados
│   ├── button/
│   │   ├── src/
│   │   │   └── button.tsx
│   │   ├── dist/
│   │   ├── package.json  # @igreen/button
│   │   └── tsconfig.json
│   ├── input/
│   ├── checkbox/
│   └── ...
│
└── igreen/              # Componentes próprios iGreen
    └── example-card/
        ├── src/
        │   ├── component.tsx
        │   ├── styles.ts
        │   ├── types.ts
        │   └── index.ts
        ├── dist/
        ├── package.json  # @igreen/example-card
        └── tsconfig.json
```

---

## 🎯 Diferença entre shadcn/ e igreen/

| Categoria | O que é | Exemplo |
|-----------|---------|---------|
| **`shadcn/`** | Componentes do shadcn/ui estilizados com iGreen | button, input, badge |
| **`igreen/`** | Componentes 100% próprios (multi-arquivo, complexos) | example-card, data-table |

---

## ⚠️ Importante: NPM não se importa com a estrutura

Mesmo com subpastas, o NPM vê apenas o **nome do pacote**:

```json
// packages/components/shadcn/button/package.json
{ "name": "@igreen/button" }  ← NPM instala como @igreen/button

// packages/components/igreen/example-card/package.json
{ "name": "@igreen/example-card" }  ← NPM instala como @igreen/example-card
```

**Para o usuário final:**
```bash
npm install @igreen/button      # Não precisa saber que vem de shadcn/
npm install @igreen/example-card # Não precisa saber que vem de igreen/
```

---

## 📝 Template de package.json

### Para Componentes Shadcn (simples)

```json
{
  "name": "@igreen/badge",
  "version": "1.0.0",
  "description": "iGreen Design System - Badge Component (shadcn-based)",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
    "@igreen/themes": "^1.2.0",
    "@igreen/utils": "^1.0.0",
    "class-variance-authority": "^0.7.1"
  },
  "publishConfig": {
    "access": "public",
    "registry": "http://localhost:4873"
  }
}
```

### Para Componentes iGreen (complexos)

```json
{
  "name": "@igreen/data-table",
  "version": "1.0.0",
  "description": "iGreen Design System - Data Table Component (custom)",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "peerDependencies": {
    "react": "^19.0.0"
  },
  "dependencies": {
    "@igreen/themes": "^1.2.0",
    "@igreen/utils": "^1.0.0",
    "@igreen/button": "^1.0.1",
    "@tanstack/react-table": "^8.0.0"
  },
  "publishConfig": {
    "access": "public",
    "registry": "http://localhost:4873"
  }
}
```

---

## 🔄 Workflow de Publicação

```bash
# 1. Desenvolver em devcomponents/
# 2. Copiar para packages/components/[shadcn|igreen]/[nome]/

# 3. Build
cd packages/components/shadcn/badge
npm run build

# 4. Versionar
npm version patch  # 1.0.0 → 1.0.1

# 5. Publicar
npm publish --registry http://localhost:4873

# 6. Atualizar design-system meta-package (se necessário)
cd ../../design-system
npm install @igreen/badge@latest --registry http://localhost:4873
# Adicionar export em src/index.ts
npm version patch
npm publish --registry http://localhost:4873
```
