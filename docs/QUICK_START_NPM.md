# 🚀 Quick Start: Publicar no NPM

> Guia rápido e prático para publicar o iGreen no NPM público

---

## ⚡ Processo Completo (5 Passos)

### 1️⃣ Login no NPM

```bash
npm login
# Username: seu-usuario
# Password: sua-senha
# Email: seu@email.com
```

Teste:
```bash
npm whoami
# Deve mostrar seu username
```

---

### 2️⃣ Atualizar Registries

Execute o script automático:

```bash
npm run update-registry
```

Isso atualiza todos os `publishConfig.registry` de:
- `http://localhost:4873` ❌
- `https://registry.npmjs.org` ✅

---

### 3️⃣ Build de Tudo

```bash
npm run build:all-components
npm run build:themes
```

---

### 4️⃣ Publicar (Ordem Importa!)

**Opção A: Automático (RECOMENDADO)**
```bash
npm run publish:all
```

**Opção B: Manual (Passo a passo)**
```bash
# 1. Themes
cd packages/themes
npm publish

# 2. Utils  
cd ../utils
npm publish

# 3. Componentes
cd ../components/shadcn/button
npm publish

cd ../checkbox
npm publish

cd ../input
npm publish

cd ../label
npm publish

cd ../mode-toggle
npm publish

cd ../../igreen/example-card
npm publish

# 4. Design System (meta-package)
cd ../../../design-system
npm publish

# 5. CLI (opcional)
cd ../cli
npm publish
```

---

### 5️⃣ Verificar

```bash
npm info @igreen/themes
npm info @igreen/button
npm info @igreen/design-system
```

Ver online: https://www.npmjs.com/package/@igreen/themes

---

## ✅ Checklist de Publicação

- [ ] `npm login` executado
- [ ] `npm run update-registry` executado
- [ ] `npm run build:all-components` sem erros
- [ ] `npm run build:themes` sem erros
- [ ] `npm run publish:all` executado
- [ ] Verificado com `npm info @igreen/themes`
- [ ] Testado instalação: `npm install @igreen/design-system`

---

## 📖 Para Seus Colegas

Envie este comando:

```bash
npm install @igreen/design-system
```

E este exemplo de uso:

```typescript
// app/layout.tsx
import '@igreen/themes/igreen'

// app/page.tsx
import { Button, Input } from '@igreen/design-system'

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Test" />
    </div>
  )
}
```

---

## 🚨 Troubleshooting Rápido

**"You do not have permission"**
```bash
npm login
npm whoami
```

**"Package already exists"**
- Você precisa ter acesso ao pacote `@igreen`
- OU mude para `@seu-username/button` nos package.json

**"404 Not Found" ao instalar**
- O pacote ainda não foi publicado
- Execute `npm run publish:all`

---

## 📞 Precisa de Ajuda?

Ver guia completo: [docs/09_PUBLICANDO_NPM_PUBLICO.md](./09_PUBLICANDO_NPM_PUBLICO.md)

---

**Pronto! Seus colegas já podem usar:** `npm install @igreen/design-system` 🎉
