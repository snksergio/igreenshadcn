# iGreen Design System - Convenções e Padrões

> "Consistência é a base da escalabilidade."

Este documento define as regras de "Constituição" do nosso Design System. Seguir estas regras garante que o sistema permaneça manutenível à medida que cresce de 3 para 50+ componentes.

---

## 1. Arquitetura de Tokens

Nosso sistema utiliza uma arquitetura estrita de **3 Camadas**. O fluxo de dependência é sempre unidirecional:
`Primitives` → `Semantic` → `Component/Bridge`.

### 🟢 Primitives (Fundação)
Valores brutos. Representam a paleta total disponível.
* **Local**: `theme/primitives/*.css`
* **NUNCA** use em componentes (ex: `button.tsx`).
* **NUNCA** use em `bridge/shadcn.css`.

**Convenção de Nomenclatura:**
`--{categoria}-{escala}-{grau}`
* **Exemplos**:
    * `--brand-500` (Cor da marca, grau 500)
    * `--neutral-900` (Cinza, grau 900)
    * `--spacing-4` (Espaçamento)

### 🔵 Semantic (Intenção)
O significado do valor. Descreve **O QUE** o token faz, não qual cor ele é.
* **Local**: `theme/semantic/*.css`
* **USO**: Permitido em componentes customizados e no `globals.css`.

**Convenção de Nomenclatura:**
`--{propriedade}-{contexto}-{estado?}`
* **Exemplos**:
    * `--bg-primary-hover` (Background, Primário, Estado Hover)
    * `--fg-error` (Foreground/Texto, Erro)
    * `--border-input` (Borda, Input)

### 🔴 Bridge (Compatibilidade)
Camada de tradução para bibliotecas de terceiros (Shadcn/UI).
* **Local**: `theme/bridge/*.css`
* **Regra**: Arquivos aqui devem conter **APENAS** mapeamentos de `var(--shadcn-var)` para `var(--semantic-var)`. Sem valores hexadecimais (hardcoded).

---

## 2. Padrões de Componentes

### Customização do Shadcn
Adotamos o modelo "Standard Plus". Mantemos a base do shadcn mas expandimos suas capacidades.

1.  **Variantes Exclusivas**: Se você criar uma variante nova (ex: `size="2xl"` no Input), ela deve ser documentada.
2.  **Dependências CSS**: Se o componente usa uma classe nova (ex: `bg-gradient-shine`), essa classe deve ser definida no `theme` e mapeada no `tailwind.config` (via `@theme`).

**Exemplo de Documentação no Código:**
```tsx
/**
 * Input Component
 * @variant size="2xl" - Variante customizada iGreen (não nativa shadcn)
 * @token --h-formcontrol-2xl - Define altura de 48px
 */
```

---

## 3. Guia de Contribuição

### Adicionando uma Nova Cor
1.  **Primitive**: A cor existe na paleta? Se não, adicione em `theme/primitives/colors.css`.
    ```css
    /**
     * @token special-500
     * @description Cor especial para campanhas de marketing
     */
    --special-500: oklch(...);
    ```
2.  **Semantic**: Defina o uso. `theme/semantic/colors.css`.
    ```css
    --bg-campaign-card: var(--special-500);
    ```
3.  **Tailwind**: Mapeie em `app/globals.css` (Seção `@theme`).
    ```css
    --color-bg-campaign-card: var(--bg-campaign-card);
    ```

### Checklist de Pull Request
- [ ] Os novos tokens têm comentários JSDoc (`@token`, `@description`)?
- [ ] O script `npm run test:tokens` passou?
- [ ] Se alterou componente, atualizou o arquivo `.json` no Registry?
