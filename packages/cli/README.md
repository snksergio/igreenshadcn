# @igreen/cli

A CLI oficial para o **iGreen Design System**. Automatiza a configuração do tema, instalação de dependências e adição de componentes.

## Instalação

```bash
# Instalação global via (Verdaccio)
npm install -g @igreen/cli --registry http://localhost:4873
```

## Comandos

### `igreen init`
Inicializa o Design System em um projeto Next.js existente ou novo.
- Instala dependências (Tailwind v4, Shadcn, etc).
- Configura `app/globals.css`.
- Baixa o tema `theme-config.css`.

#### Uso:
```bash
igreen init
```

### `igreen add [component]` (Em Breve)
Adiciona um componente específico (ex: button, card) ao seu projeto.

## Desenvolvimento

Para rodar localmente:
```bash
npm link
```
