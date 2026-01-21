# 🔐 Resolver Erro de Autenticação NPM

## ❌ Erro Atual

```
403 Forbidden - Two-factor authentication or granular access token 
with bypass 2fa enabled is required to publish packages.
```

---

## ✅ Solução: 2 Opções

### Opção 1: Habilitar 2FA (Recomendado)

#### Passo 1: Habilitar 2FA na Conta NPM

1. Acesse: https://www.npmjs.com/settings/YourUsername/tfa
2. Escolha **"Enable 2FA"**
3. Escaneie o QR Code com app autenticador (Google Authenticator, Authy, etc)
4. Salve os códigos de backup!

#### Passo 2: Login com 2FA

```bash
npm login
```

Será pedido:
- Username: `seu-usuario`
- Password: `sua-senha`
- Email: `seu@email.com`
- **OTP (One-Time Password)**: Código do app autenticador (6 dígitos)

#### Passo 3: Publicar

```bash
cd c:\Users\sergi\OneDrive\Área de Trabalho\shadcnv4\igreenshadcn\packages\utils
npm publish
```

Será pedido o código 2FA novamente durante a publicação.

---

### Opção 2: Usar Access Token (Para Automação)

#### Passo 1: Criar Access Token

1. Acesse: https://www.npmjs.com/settings/YourUsername/tokens
2. Clique em **"Generate New Token"**
3. Escolha **"Automation"** (permite publicar sem 2FA)
4. Copie o token (começa com `npm_...`)

#### Passo 2: Configurar Token

**Windows (PowerShell):**
```powershell
npm config set //registry.npmjs.org/:_authToken "SEU_TOKEN_AQUI"
```

**OU criar arquivo `.npmrc` na pasta home:**
```
# C:\Users\sergi\.npmrc
//registry.npmjs.org/:_authToken=npm_SEU_TOKEN_AQUI
```

#### Passo 3: Publicar

```bash
npm publish
```

Não pedirá 2FA se o token tiver permissão de automação.

---

## 🚀 Passo a Passo Recomendado

### 1. Fazer Login Novamente

```bash
npm logout
npm login
```

Vai pedir código 2FA se você já tiver configurado.

### 2. Testar Autenticação

```bash
npm whoami
```

Deve mostrar seu username sem erros.

### 3. Publicar Utils

```bash
cd packages/utils
npm publish
```

---

## 🔍 Verificar Status da Org

A mensagem também pode indicar falta de permissão na org `@igreen`.

Verifique:
1. Acesse: https://www.npmjs.com/settings/igreen/members
2. Confirme que você está listado como **Owner** ou **Developer**
3. Se não estiver, adicione-se (se for owner da org)

---

## 📋 Checklist

- [ ] 2FA habilitado na conta NPM
- [ ] `npm logout` executado
- [ ] `npm login` com código 2FA
- [ ] `npm whoami` funciona
- [ ] Você é membro da org @igreen
- [ ] `npm publish` em packages/utils

---

## ⚡ Quick Fix

```bash
# 1. Logout
npm logout

# 2. Login (vai pedir 2FA)
npm login

# 3. Verificar
npm whoami

# 4. Publicar
cd packages/utils
npm publish
```

Quando pedir o código 2FA, use seu app autenticador! 📱
