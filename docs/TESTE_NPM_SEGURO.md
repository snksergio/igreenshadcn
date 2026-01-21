# 🧪 Guia de Teste: Publicar no NPM (Processo Seguro)

> Processo passo a passo para testar publicação sem riscos

---

## 🎯 Estratégia: Testar com 1 Pacote Primeiro

Vamos publicar apenas o `@igreen/utils` primeiro (é pequeno e não tem dependências).

---

## ✅ Passo 1: Verificar Login

```bash
npm whoami
```

**Deve mostrar:** `seuusername` ou o nome que você logou

Se não mostrar, faça login:
```bash
npm login
```

---

## ✅ Passo 2: Verificar Registry do Utils

```bash
cd packages/utils
cat package.json | grep registry
```

**Deve mostrar:**
```json
"registry": "https://registry.npmjs.org"
```

Se ainda estiver `localhost:4873`:
```bash
# Voltar para raiz
cd ../..
npm run update-registry
```

---

## ✅ Passo 3: Build do Utils

```bash
cd packages/utils
npm run build
```

**Verificar que criou `dist/`:**
```bash
ls dist
# Deve mostrar: index.js, index.d.ts, etc
```

---

## ✅ Passo 4: Teste DRY RUN (Simulação)

```bash
npm publish --dry-run
```

**Saída esperada:**
```
npm notice 
npm notice 📦  @igreen/utils@1.0.0
npm notice === Tarball Contents ===
npm notice dist/index.js
npm notice dist/index.d.ts
npm notice package.json
npm notice === Tarball Details ===
npm notice name:          @igreen/utils
npm notice version:       1.0.0
npm notice size:          xxx KB
npm notice unpacked size: xxx KB
npm notice total files:   x
npm notice 
+ @igreen/utils@1.0.0
```

**Se der erro:** Leia a mensagem de erro e corrija antes de continuar

---

## ✅ Passo 5: Publicar de Verdade

```bash
npm publish
```

**Saída esperada:**
```
npm notice 
npm notice 📦  @igreen/utils@1.0.0
...
+ @igreen/utils@1.0.0
```

---

## ✅ Passo 6: Verificar se Funcionou

```bash
# Ver info do pacote
npm info @igreen/utils

# Ver no NPM (abrir no navegador)
# https://www.npmjs.com/package/@igreen/utils
```

---

## ✅ Passo 7: Testar Instalação

```bash
# Em outra pasta qualquer
cd ~
mkdir test-igreen
cd test-igreen
npm init -y
npm install @igreen/utils
```

**Se instalou sem erros:** ✅ SUCESSO!

---

## 🚀 Passo 8: Publicar Tudo (Agora com Confiança)

Volte para o projeto:

```bash
cd ~/caminho/para/igreenshadcn

# Publicar todos (o script foi corrigido)
npm run publish:all
```

**Ou publicar manualmente na ordem correta:**

```bash
# 1. Themes
cd packages/themes
npm run build
npm publish

# 2. Componentes (já temos utils publicado)
cd ../components/shadcn/button
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

cd ../../igreen/example-card
npm run build
npm publish

# 3. Design System (meta-package)
cd ../../../design-system
npm run build
npm publish
```

---

## 🚨 Troubleshooting

### "403 Forbidden"

**Problema:** Você não tem permissão para publicar no scope `@igreen`

**Soluções:**

1. **Verificar se você é membro da org:**
   - Acesse: https://www.npmjs.com/settings/igreen/members
   - Você deve aparecer como Owner ou Developer

2. **Se não for membro:**
   - Peça para alguém te adicionar, OU
   - Mude o scope nos package.json para `@seuusername`

### "409 Conflict - cannot publish over existing version"

**Problema:** Essa versão já foi publicada

**Solução:**
```bash
npm version patch
npm publish
```

### "402 Payment Required"

**Problema:** Tentando publicar pacote privado sem plano pago

**Solução:** Certifique que `publishConfig.access` está como `"public"`

---

## 📋 Checklist Completo

### Antes de Publicar
- [ ] `npm whoami` funciona
- [ ] Organization `@igreen` criada
- [ ] Você é membro da org
- [ ] `npm run update-registry` executado
- [ ] Todos os package.json têm `"access": "public"`

### Teste com Utils
- [ ] `cd packages/utils`
- [ ] `npm run build` sem erros
- [ ] `npm publish --dry-run` sem erros
- [ ] `npm publish` com sucesso
- [ ] `npm info @igreen/utils` mostra o pacote

### Publicar Tudo
- [ ] `npm run build:all-components` sem erros
- [ ] `npm run build:themes` sem erros
- [ ] `npm run publish:all` OU publicar manualmente
- [ ] Verificar cada pacote: `npm info @igreen/[nome]`

---

## ✅ Resultado Final

Quando tudo estiver publicado, seus colegas poderão fazer:

```bash
npm install @igreen/design-system
```

E usar:
```typescript
import { Button, Input } from '@igreen/design-system'
```

---

**Primeiro faça o teste com utils. Se funcionar, publique o resto!** 🚀
