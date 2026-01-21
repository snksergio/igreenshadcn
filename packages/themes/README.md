# 🎨 iGreen Themes Package

**Versão:** 1.2.0  
**Tipo:** Multi-Theme Design System

---

## 📦 O que é este pacote?

Este pacote contém **todos os temas** do iGreen Design System. Cada tema é **auto-contido** (já inclui primitives + semantic + bridge).

---

## 🏗️ Estrutura

```
packages/themes/
├── src/
│   ├── bridge/              # 🔗 Compartilhado entre todos os temas
│   │   └── shadcn.css
│   ├── igreen/              # 🟢 Theme padrão (Verde)
│   │   ├── primitives/
│   │   │   ├── index.css
│   │   │   ├── colors.css   # ← Cores VERDES (Hue 155)
│   │   │   ├── typography.css
│   │   │   └── spacing.css
│   │   └── semantic/
│   │       ├── index.css
│   │       ├── colors.css
│   │       ├── effects.css
│   │       ├── sizing.css
│   │       └── typography.css
│   └── solarorange/         # 🟠 Theme alternativo (Laranja)
│       └── (mesma estrutura de igreen)
│
├── dist/                    # 📦 Gerado pelo build
│   ├── igreen.css           # ← Auto-contido (primitives + semantic + bridge)
│   ├── solarorange.css      # ← Auto-contido
│   └── bridge.css           # ← Standalone (raro usar isolado)
│
├── build.ts                 # 🔧 Build script inteligente
└── package.json
```

---

## ✨ Como Adicionar um Novo Theme

### 1. Copiar estrutura base
```bash
cd packages/themes/src
cp -r igreen/ mytheme/
```

### 2. Editar cores
Abra `mytheme/primitives/colors.css` e mude as variáveis `--brand-*`:

```css
/* Exemplo: Tema Roxo (Hue 270) */
:root {
  --brand-500: oklch(0.60 0.18 270);  /* ← Mude o Hue aqui */
  --brand-600: oklch(0.52 0.16 270);
  /* ... resto da escala ... */
}
```

### 3. Adicionar ao build
Edite `build.ts`:
```typescript
const themes = ['igreen', 'solarorange', 'mytheme'];  // ← Adicione aqui
```

### 4. Adicionar export
Edite `package.json`:
```json
"exports": {
  "./igreen": "./dist/igreen.css",
  "./solarorange": "./dist/solarorange.css",
  "./mytheme": "./dist/mytheme.css"  // ← Adicione aqui
}
```

### 5. Build e Publish
```bash
npm run build
npm version minor  # 1.2.0 → 1.3.0
npm publish --registry http://localhost:4873
```

### 6. Atualizar CLI (Opcional)
Edite `packages/cli/src/index.ts` para adicionar o theme na lista de seleção.

---

## 🎯 Como Consumir

### Instalação
```bash
npm install @igreen/themes
```

### Uso
```css
/* app/globals.css - SÓ 1 IMPORT NECESSÁRIO */
@import "@igreen/themes/igreen";  /* OU solarorange */
@import "tailwindcss";
```

**Nota:** Não precisa importar `bridge` separadamente! Ele já está incluído em cada theme.

---

## 🔧 Build Process

O build script (`build.ts`) faz a **montagem automática**:

```
1. Lê primitives/index.css (que importa colors, typography, spacing)
2. Lê semantic/index.css (que importa colors, effects, sizing, typography)
3. Lê bridge/shadcn.css (compartilhado)
4. Concatena tudo em dist/[theme].css
```

**Resultado:** Cada `dist/[theme].css` é **auto-contido** e pronto para uso.

---

## 📝 Changelog

### v1.2.0 (Atual)
- ✨ **Otimização:** Removido `index.css` duplicado de cada theme
- ✨ **Auto-Contained:** Cada theme agora inclui bridge automaticamente
- ✨ **Simplified Import:** Usuários precisam de apenas 1 `@import`

### v1.1.0
- ✨ Adicionado theme `solarorange`
- 🔧 CLI com seleção interativa de theme

### v1.0.0
- 🎉 Lançamento inicial com theme `igreen`
