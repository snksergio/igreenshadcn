# 💻 Tutorial: Instalação e Consumo

> Como instalar e usar o iGreen Design System em seus projetos

---

## 🎯 Método Recomendado: CLI ⭐

### Instalação Automática (2 minutos)

```bash
npx @igreen/cli@latest init
```

**O CLI faz TUDO automaticamente:**
- ✅ Cria projeto Next.js
- ✅ Pergunta qual tema (igreen/solarorange)
- ✅ Pergunta quais componentes instalar
- ✅ Configura Tailwind CSS v4
- ✅ Instala pacotes do NPM
- ✅ Deixa tudo pronto para rodar

```bash
cd meu-projeto
npm run dev
```

**Pronto!** Abra http://localhost:3000

---

## 📦 Método Manual (Avançado)

Para adicionar iGreen em projeto Next.js **existente**:

### Passo 1: Instalar Pacotes

```bash
# Opção A: Meta-package (todos os componentes)
npm install @igreen/design-system

# Opção B: Componentes individuais
npm install @igreen/themes @igreen/button @igreen/input @igreen/label
```

### Passo 2: Instalar Tailwind CSS v4

```bash
npm install tailwindcss@next @tailwindcss/postcss@next
```

### Passo 3: Configurar PostCSS

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Passo 4: Importar Tema

```typescript
// app/layout.tsx
import '@igreen/themes/igreen'  // ← Importar tema
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
```

### Passo 5: Configurar Tailwind

```css
/* app/globals.css */
@import 'tailwindcss';
```

### Passo 6: Usar Componentes

```tsx
// app/page.tsx
import { Button } from '@igreen/button'
import { Input } from '@igreen/input'
import { Label } from '@igreen/label'

export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">iGreen Components</h1>
      
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Digite seu nome" />
      </div>
      
      <Button>Enviar</Button>
    </div>
  )
}
```

---

## 🎨 Temas Disponíveis

### Tema Padrão (iGreen)

```typescript
import '@igreen/themes/igreen'
```

### Tema Alternativo (SolarOrange)

```typescript
import '@igreen/themes/solarorange'
```

### Apenas Compatibilidade Shadcn

```typescript
import '@igreen/themes/bridge'
```

---

## 🌙 Configurar Dark Mode

### Instalar next-themes

```bash
npm install next-themes
```

### Configurar Provider

```tsx
// app/layout.tsx
import '@igreen/themes/igreen'
import './globals.css'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Criar Toggle Button

```tsx
'use client'

import { useTheme } from 'next-themes'
import { Button } from '@igreen/button'
import { Moon, Sun } from 'lucide-react'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

---

## 📋 Componentes Disponíveis

### Formulários
- `@igreen/button` - Botões com variantes
- `@igreen/input` - Campos de entrada
- `@igreen/label` - Labels
- `@igreen/checkbox` - Checkboxes

### Outros
- `@igreen/example-card` - Cards de exemplo

### Utilitários
- `@igreen/utils` - Helpers (cn, etc)

---

## 🔄 Atualizar Componentes

### Atualizar Pacote Específico

```bash
npm install @igreen/button@latest
```

### Atualizar Todos

```bash
npm update @igreen/*
```

### Ver Versão Instalada

```bash
npm list @igreen/button
```

---

## 📁 Estrutura de Projeto Final

```
meu-projeto/
├── app/
│   ├── layout.tsx          # Importa @igreen/themes
│   ├── page.tsx            # Usa componentes
│   └── globals.css         # Importa Tailwind
├── components/
│   └── ui/                 # Seus componentes customizados
├── lib/
│   └── utils.ts           # Utilitários
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🚨 Troubleshooting

### ❌ "Cannot find module '@igreen/button'"

```bash
# Verificar instalação
npm list @igreen/button

# Reinstalar
npm install @igreen/button
```

### ❌ "Tema não está aplicado"

Verificar ordem em `app/layout.tsx`:

```typescript
// ✅ Correto
import '@igreen/themes/igreen'  // PRIMEIRO
import './globals.css'          // DEPOIS
```

### ❌ "Classes Tailwind não funcionam"

Verificar `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // ← Deve ter isso
  },
}
```

### ❌ "Dark mode não funciona"

1. Verificar `ThemeProvider` com `attribute="class"`
2. Verificar import do tema antes do globals.css
3. Instalar `next-themes`

---

## 📊 Exemplo Completo: Formulário de Login

```tsx
'use client'

import { Button } from '@igreen/button'
import { Input } from '@igreen/input'
import { Label } from '@igreen/label'
import { Checkbox } from '@igreen/checkbox'

export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="seu@email.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input 
          id="password" 
          type="password"
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Lembrar-me</Label>
      </div>
      
      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  )
}
```

---

## 🎯 Checklist

- [ ] Projeto Next.js criado (ou use CLI)
- [ ] `@igreen/themes` instalado
- [ ] Tema importado em layout.tsx
- [ ] Tailwind CSS v4 configurado
- [ ] PostCSS configurado
- [ ] Componentes instalados
- [ ] Dark mode configurado (opcional)
- [ ] Projeto rodando sem erros

---

## 🔗 Próximos Passos

- [Workflow de Desenvolvimento](./04_WORKFLOW_DESENVOLVIMENTO.md)
- [Versionamento e Publicação](./06_VERSIONAMENTO_PUBLICACAO.md)
- [Referência de Scripts](./08_REFERENCIA_SCRIPTS.md)

---

## 💡 Dicas

### Usar CLI para Testes Rápidos

```bash
# Criar projeto de teste rapidamente
npx @igreen/cli@latest init
```

### Ver Todos os Pacotes Disponíveis

https://www.npmjs.com/search?q=%40igreen

### Reportar Bugs

Encontrou problemas? Abra uma issue no repositório!

---

**Feito com 💚 pelo iGreen Team**
