# 📦 Guia: Publicando iGreen no NPM Público

> Tutorial passo a passo para disponibilizar o iGreen Design System no NPM para seus colegas

---

## 📋 Pré-requisitos

### 1. Criar Conta no NPM

```bash
# Se ainda não tem conta
npm adduser

# Se já tem conta, fazer login
npm login
```

Você será solicitado:
- **Username**: Seu nome de usuário NPM
- **Password**: Sua senha
- **Email**: Seu email (será público)
- **OTP**: Código 2FA (se habilitado)

### 2. Verificar Login

```bash
npm whoami
# Deve mostrar seu username
```

### 3. Criar Organization (Recomendado)

Para manter `@igreen` como scope:

1. Acesse: https://www.npmjs.com/org/create
2. Nome da org: `igreen`
3. Escolha o plano (Free funciona para testes)
4. Convide colaboradores depois

**OU** use seu próprio username como scope (ex: `@seuusername/button`)

---

## 🔧 Preparação dos Pacotes

### 1. Atualizar publishConfig em TODOS os package.json

Você precisa mudar de Verdaccio local para NPM público.

**Antes:**
```json
{
  "publishConfig": {
    "access": "public",
    "registry": "http://localhost:4873"
  }
}
```

**Depois:**
```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
  }
}
```

**Arquivos a atualizar:**
- `packages/themes/package.json`
- `packages/utils/package.json`
- `packages/cli/package.json`
- `packages/design-system/package.json`
- `packages/components/shadcn/*/package.json` (todos)
- `packages/components/igreen/*/package.json` (todos)

### 2. Script Automático para Atualizar

Crie este script para facilitar:

```typescript
// scripts/update-registry.ts
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const packagesRoot = path.join(process.cwd(), 'packages')

function updatePackageJson(filePath: string) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    if (content.publishConfig) {
        content.publishConfig.registry = 'https://registry.npmjs.org'
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n')
        console.log(`✅ Updated: ${filePath}`)
    }
}

// Atualizar todos os packages
const dirs = ['themes', 'utils', 'cli', 'design-system']
dirs.forEach(dir => {
    const pkgPath = path.join(packagesRoot, dir, 'package.json')
    if (fs.existsSync(pkgPath)) {
        updatePackageJson(pkgPath)
    }
})

// Atualizar componentes
const componentTypes = ['shadcn', 'igreen']
componentTypes.forEach(type => {
    const typePath = path.join(packagesRoot, 'components', type)
    if (fs.existsSync(typePath)) {
        fs.readdirSync(typePath).forEach(component => {
            const pkgPath = path.join(typePath, component, 'package.json')
            if (fs.existsSync(pkgPath)) {
                updatePackageJson(pkgPath)
            }
        })
    }
})

console.log('\n✅ Todos os registries atualizados para NPM público!')
```

Execute:
```bash
tsx scripts/update-registry.ts
```

---

## 📤 Ordem de Publicação

**IMPORTANTE:** Publique nesta ordem para respeitar dependências:

### 1️⃣ Themes (não depende de nada)

```bash
cd packages/themes
npm run build
npm publish
```

### 2️⃣ Utils (não depende de nada)

```bash
cd packages/utils
npm run build
npm publish
```

### 3️⃣ Componentes (dependem de themes e utils)

**Shadcn:**
```bash
cd packages/components/shadcn/button
npm run build
npm publish

cd ../checkbox
npm run build
npm publish

cd ../input
npm run build
npm publish

cd ../label
npm run build
npm publish

cd ../mode-toggle
npm run build
npm publish
```

**iGreen:**
```bash
cd packages/components/igreen/example-card
npm run build
npm publish
```

**OU use script automático:**
```bash
npm run publish:all
```

### 4️⃣ Design System (depende de tudo)

```bash
cd packages/design-system
npm run build
npm publish
```

### 5️⃣ CLI (opcional)

```bash
cd packages/cli
npm run build
npm publish
```

---

## ✅ Verificação

### Verificar que foi publicado

```bash
npm info @igreen/themes
npm info @igreen/button
npm info @igreen/design-system
```

### Ver no NPM

Acesse: https://www.npmjs.com/package/@igreen/themes

---

## 📖 Instruções para Colegas

Crie este documento para seus colegas:

### README para Colegas

```markdown
# 🧪 Testando iGreen Design System

## Instalação

### Opção 1: Meta-package (Recomendado para testes)

```bash
npm install @igreen/design-system
```

### Opção 2: Componentes individuais

```bash
npm install @igreen/themes @igreen/button @igreen/input
```

## Setup no Projeto

### Next.js 14+ (App Router)

1. **Instalar pacotes:**
```bash
npm install @igreen/design-system
npm install tailwindcss@next @tailwindcss/postcss@next
```

2. **Configurar PostCSS:**
```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

3. **Importar tema:**
```tsx
// app/layout.tsx
import '@igreen/themes/igreen'
import './globals.css'

export default function RootLayout({ children }) {
  return <html lang="pt-BR">
    <body>{children}</body>
  </html>
}
```

4. **Configurar Tailwind:**
```css
/* app/globals.css */
@import 'tailwindcss';
```

5. **Usar componentes:**
```tsx
// app/page.tsx
import { Button, Input } from '@igreen/design-system'

export default function Home() {
  return (
    <div className="p-8">
      <Button variant="default">Click me</Button>
      <Input placeholder="Test input" />
    </div>
  )
}
```

## Dark Mode

```bash
npm install next-themes
```

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Componentes Disponíveis

- Button
- Input
- Label
- Checkbox
- ModeToggle (dark mode switcher)
- ExampleCard

## Temas Disponíveis

```typescript
// Tema padrão (iGreen)
import '@igreen/themes/igreen'

// Tema alternativo (SolarOrange)
import '@igreen/themes/solarorange'
```

## Reportar Issues

Encontrou bugs? Abra uma issue no repositório!
```

---

## 🔐 Segurança e Controle de Acesso

### Adicionar Colaboradores na Org

1. Acesse: https://www.npmjs.com/settings/igreen/members
2. Invite → Add member
3. Escolha permissões:
   - **Developer**: Pode publicar
   - **Owner**: Controle total

### Publicar como Privado (Opcional)

Se quiser restringir acesso:

```json
{
  "publishConfig": {
    "access": "restricted"  // ← Ao invés de "public"
  }
}
```

**Nota:** Pacotes privados requerem plano pago no NPM.

---

## 🎯 Checklist de Publicação

- [ ] Conta NPM criada e logada
- [ ] Organization `@igreen` criada (ou usando seu username)
- [ ] Todos os `publishConfig.registry` atualizados para `https://registry.npmjs.org`
- [ ] Todos os pacotes buildados
- [ ] Publicado na ordem: themes → utils → components → design-system
- [ ] Verificado com `npm info @igreen/themes`
- [ ] Testado instalação em projeto limpo
- [ ] Documentação para colegas criada

---

## 🚨 Troubleshooting

### "You do not have permission to publish"

**Causa:** Pacote já existe ou você não está logado

**Solução:**
```bash
npm login
npm whoami
# Se o pacote já existe com outro dono, mude o nome ou peça acesso
```

### "Package name too similar to existing package"

**Causa:** Nome muito parecido com pacote existente

**Solução:** Mude `@igreen` para `@seu-username` ou `@igreen-ds`

### "402 Payment Required"

**Causa:** Tentando publicar pacote privado sem plano pago

**Solução:** Mude para `"access": "public"`

---

## 📊 Versionamento para Produção

Quando for publicar versões de produção (não mais teste):

### Semver

- `1.0.0-beta.1` - Versão de teste
- `1.0.0-rc.1` - Release candidate
- `1.0.0` - Produção estável

```bash
# Publicar beta
npm version prerelease --preid=beta
npm publish --tag beta

# Instalar beta
npm install @igreen/button@beta
```

---

## 🎉 Próximos Passos

1. **Publicar primeira versão de teste**
2. **Compartilhar com colegas**
3. **Coletar feedback**
4. **Iterar e melhorar**
5. **Publicar versão estável (1.0.0)**

---

## 📞 Suporte

**NPM oficial:** https://docs.npmjs.com/  
**Organization:** https://www.npmjs.com/settings/igreen/members

---

Boa sorte com a publicação! 🚀
