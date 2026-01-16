# Tutorial: Adicionando Novos Tokens e Atualizando o iGreen Design System

Este guia explica como expandir o sistema de design (adicionar novas cores, criar novos arquivos de variáveis) e garantir que essas mudanças sejam refletidas corretamente no Registry para instalação em outros projetos.

## 1. Estrutura do Tema
Os tokens do sistema vivem na pasta `theme/`. Eles são divididos em três camadas:

- **`theme/primitives/`**: Cores cruas (ex: `--brand-500`, `--neutral-100`). **Aqui você define a cor.**
- **`theme/semantic/`**: Cores com significado (ex: `--bg-primary`, `--fg-error`). **Aqui você dá intenção à cor.**
- **`theme/bridge/`**: Conexão com bibliotecas externas (shadcn/ui). (ex: `--primary`, `--ring`). **Aqui você garante compatibilidade.**

---

## 2. Como Adicionar...

### A. Uma Nova Cor em um Arquivo Existente
Se você quer apenas adicionar um tom novo (ex: `brand-alpha-90`) a um arquivo que já existe:

1. Abra o arquivo correspondente em `theme/primitives/` (ex: `colors.css`).
2. Adicione a variável seguindo o padrão das outras:
   ```css
   --brand-alpha-90: oklch(0.52 0.15 158 / 0.90);
   ```
3. (Opcional) Adicione uma versão para o modo escuro no bloco `.dark { ... }` no final do arquivo.

### B. Um Novo Arquivo de Primitivos
Se você quer criar uma categoria totalmente nova (ex: `theme/primitives/glass.css`):

1. Crie o arquivo `.css` na pasta `theme/primitives/`.
2. Defina suas variáveis dentro de `:root { ... }`.
3. **MUITO IMPORTANTE:**
   Para que seu arquivo seja lido, você **NÃO** precisa importá-lo em lugar nenhum manualmente para o build funcionar, pois o script escaneia a pasta. 
   
   *Porém*, para que ele funcione no **ambiente de desenvolvimento local** do `igreenshadcn`, adicione um `@import` para ele no `theme/primitives/index.css` (ou `theme/index.css`).

---

## 3. O Segredo da Automação (Tailwind V4)

O nosso script de build `scripts/build-registry.ts` gera automaticamente as configurações do Tailwind (`@theme`) para você.

Ele faz isso procurando variáveis que comecem com **prefixos conhecidos**.

#### Lista de Prefixos Automáticos
Se sua variável começar com qualquer um destes nomes, ela será automaticamente transformada em uma classe utilitária do Tailwind (ex: `bg-minhacor` vira a classe `bg-minhacor`):

*   **Primitivos:** `brand`, `neutral`, `success`, `warning`, `critical`, `info`
*   **Semânticos:** `bg`, `fg`, `border`, `ring`
*   **Adaptadores:** `sidebar`, `chart`, `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `input`

### ⚠️ CUIDADO: Criando um Prefixo Novo

Se você criar uma variável com um nome totalmente novo, por exemplo `--neon-500`:

1. Ela **será** incluída no arquivo CSS final (`theme-config.css`).
2. Mas ela **NÃO** terá uma classe do Tailwind gerada automaticamente, a menos que você avise o script.

**Como corrigir:**
Abra `scripts/build-registry.ts` e adicione `'neon'` na lista `TAILWIND_DYNAMIC_PREFIXES`:

```typescript
const TAILWIND_DYNAMIC_PREFIXES = [
    // ... outros
    'neon' // <- Adicione aqui
];
```

---

## 4. Gerando a Nova Versão (Build)

Depois de editar os arquivos CSS, você precisa rodar o script para atualizar os arquivos JSON que são usados na distribuição.

1. No terminal do projeto `igreenshadcn`, rode:
   ```bash
   npm run build:registry
   ```

2. O terminal deve confirmar o sucesso:
   ```
   ✅ Registry built successfully!
      - Theme Vars: 305 extracted
      - Generated: .../theme-config.json
   ```

3. Verifique se sua nova variável aparece em `public/registry/styles/theme-config.json` (você pode dar um CTRL+F lá).

---

## 5. Consumindo em Outros Projetos

Agora que o Registry foi atualizado, vá para seu outro projeto (ex: `my-app`) e atualize o tema.

### Usando a CLI (Futuro)
```bash
igreen init
```

### Usando Shadcn (Legado/Manual)
Se você estiver usando o comando padrão do shadcn:
```bash
npx shadcn@latest add http://localhost:3000/registry/styles/theme-config.json --overwrite
```
*A flag `--overwrite` é importante para garantir que ele sobrescreva o tema antigo.*
