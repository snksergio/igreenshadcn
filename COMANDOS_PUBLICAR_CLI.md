# 🚀 Comandos para Publicar o CLI Atualizado

## 📋 Passo a Passo

### 1️⃣ Build do CLI

```cmd
cd c:\Users\sergi\OneDrive\Área de Trabalho\shadcnv4\igreenshadcn\packages\cli
npm run build
```

**Aguarde:** Deve compilar sem erros e mostrar "tsc" finalizado.

---

### 2️⃣ Publicar no NPM

```cmd
npm publish
```

**O que vai acontecer:**
1. Vai mostrar o tarball sendo preparado
2. Vai pedir para você pressionar ENTER
3. Abrirá o navegador para autenticação
4. Faça login/autorize
5. Digite código 2FA se pedir
6. Aguarde mensagem: `+ @igreen/cli@0.1.0`

---

### 3️⃣ Verificar Publicação

```cmd
npm info @igreen/cli
```

**Deve mostrar:**
- version: `0.1.0`
- description: CLI for iGreen Design System - Works with Public NPM

---

### 4️⃣ Testar o CLI

Em **outra pasta qualquer**:

```cmd
cd c:\Users\sergi\OneDrive\Área de Trabalho
mkdir teste-cli-final
cd teste-cli-final

npx @igreen/cli@latest init
```

**Vai perguntar:**
1. Qual o nome do seu projeto? → Digite: `meu-projeto-teste`
2. Qual tema você deseja usar? → Escolha: `1` (igreen)

**Aguarde:** Vai criar projeto Next.js completo e instalar tudo do NPM público!

---

### 5️⃣ Testar o Projeto Criado

```cmd
cd meu-projeto-teste
npm run dev
```

Abra http://localhost:3000

**Deve aparecer:** Projeto Next.js com iGreen funcionando! 🎉

---

## ✅ Resumo dos Comandos

```cmd
REM 1. Build
cd c:\Users\sergi\OneDrive\Área de Trabalho\shadcnv4\igreenshadcn\packages\cli
npm run build

REM 2. Publish
npm publish

REM 3. Testar
cd c:\Users\sergi\OneDrive\Área de Trabalho
mkdir teste-cli-final
cd teste-cli-final
npx @igreen/cli@latest init
```

---

## 🎯 Resultado Final

Seus colegas poderão fazer:

```cmd
npx @igreen/cli@latest init
```

E terão um projeto Next.js completo com iGreen Design System configurado automaticamente! 🚀
