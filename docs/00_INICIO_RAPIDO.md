# 🚀 Início Rápido: iGreen Design System

> Comece a usar o iGreen em 2 minutos!

---

## Para Usuários (Criar Novo Projeto)

### Um Único Comando ⭐

```bash
npx @igreen/cli@latest init
```

**Isso é TUDO** que você precisa! O CLI vai:

1. ✅ Perguntar o nome do seu projeto
2. ✅ Perguntar qual tema deseja (igreen/solarorange)
3. ✅ Perguntar quais componentes instalar
4. ✅ Criar projeto Next.js completo
5. ✅ Instalar tudo do NPM automaticamente
6. ✅ Configurar Tailwind CSS v4
7. ✅ Deixar tudo pronto para usar

### Próximos Passos

```bash
cd meu-projeto
npm run dev
```

Abra http://localhost:3000 - **Pronto!** 🎉

---

## Como Usar os Componentes

```typescript
// app/page.tsx
import { Button } from '@igreen/button'
import { Input } from '@igreen/input'
import { Label } from '@igreen/label'

export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <Label>Nome</Label>
      <Input placeholder="Digite seu nome" />
      <Button>Enviar</Button>
    </div>
  )
}
```

---

## Componentes Disponíveis

- `@igreen/button` - Botões com variantes
- `@igreen/input` - Campos de entrada
- `@igreen/label` - Labels para formulários
- `@igreen/checkbox` - Checkboxes customizados
- `@igreen/example-card` - Cards de exemplo

---

## Temas Disponíveis

- **igreen** (padrão) - Verde moderno
- **solarorange** - Laranja vibrante

Trocar tema:
```typescript
// app/layout.tsx
import '@igreen/themes/solarorange'  // ← Mudar aqui
```

---

## Dark Mode

Já vem configurado! Use `next-themes`:

```bash
npm install next-themes
```

```typescript
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

---

## Adicionar Mais Componentes Depois

```bash
npm install @igreen/checkbox
npm install @igreen/example-card
```

---

## Tutoriais Completos

Para desenvolvedores do Design System:

- [01 - Criar Componente Shadcn](./01_CRIANDO_COMPONENTE_SHADCN.md)
- [02 - Criar Componente iGreen](./02_CRIANDO_COMPONENTE_IGREEN.md)
- [03 - Adicionar Tokens CSS](./03_ADICIONANDO_TOKENS.md)
- [04 - Workflow Desenvolvimento](./04_WORKFLOW_DESENVOLVIMENTO.md)
- [05 - Documentar no Storybook](./05_STORYBOOK.md)
- [06 - Versionamento e Publicação](./06_VERSIONAMENTO_PUBLICACAO.md)
- [07 - Instalação Manual](./07_INSTALACAO_CONSUMO.md)
- [08 - Referência de Scripts](./08_REFERENCIA_SCRIPTS.md)
- [09 - Publicar no NPM](./09_PUBLICANDO_NPM_PUBLICO.md)

---

## Links Úteis

- **NPM:** https://www.npmjs.com/search?q=%40igreen
- **CLI:** `npx @igreen/cli@latest --help`
- **Documentação Completa:** [README.md](./README.md)

---

**Feito com 💚 pelo iGreen Team**
