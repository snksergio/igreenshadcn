# 🖥️ Tutorial: Usando o iGreen CLI

> Aprenda a usar todos os comandos do CLI.

## Instalação

### Via Verdaccio (Desenvolvimento)

```bash
npm install -g @igreen/cli --registry http://localhost:4873
```

### Via NPM (Produção)

```bash
npm install -g @igreen/cli
```

---

## Comandos Disponíveis

### `igreen init`

Inicializa o Design System em um projeto.

```bash
igreen init
```

**Opções interativas:**
1. **Adicionar iGreen Theme**: Aplica apenas o tema em projeto existente
2. **Criar Novo Projeto**: Cria Next.js + iGreen do zero

Se escolher "Criar Novo Projeto":
- **Base**: Apenas tema (projeto vazio)
- **Completo**: Tema + todos os componentes

**Flags:**
```bash
igreen init --registry http://custom-registry.com
```

---

### `igreen add`

Adiciona componentes específicos ao projeto.

```bash
# Adicionar um componente
igreen add button

# Adicionar múltiplos
igreen add button card input

# Sobrescrever existentes
igreen add button --overwrite
# ou
igreen add button -o
```

**Flags:**
| Flag | Descrição |
|------|-----------|
| `--registry <url>` | URL do registry (default: localhost:3000) |
| `-o, --overwrite` | Sobrescreve arquivos existentes |

---

### `igreen --help`

```bash
igreen --help
igreen init --help
igreen add --help
```

---

## Fluxo de Uso Típico

### Novo Projeto

```bash
# 1. Criar projeto completo
igreen init
# → Selecione "Criar Novo Projeto"
# → Selecione "Completo"

# 2. Entrar na pasta
cd my-igreen-app

# 3. Iniciar desenvolvimento
npm run dev
```

### Projeto Existente

```bash
# 1. Na raiz do projeto existente
cd meu-projeto-nextjs

# 2. Adicionar tema
igreen init
# → Selecione "Adicionar iGreen Theme"

# 3. Adicionar componentes específicos
igreen add button card
```

---

## Onde os Arquivos São Instalados

| Tipo | Destino |
|------|---------|
| Componentes UI | `components/ui/` |
| Componentes System | `components/system/<nome>/` |
| Tema CSS | `components/ui/theme-config.css` |

---

## Troubleshooting

### "Registry não disponível"

```bash
# Verificar se o dev server está rodando
npm run dev

# Ou iniciar o registry local
npm run registry:start
```

### "Componente não encontrado"

```bash
# Listar componentes disponíveis
curl http://localhost:3000/registry/index.json | jq '.items[].name'
```

### "Dependências não instaladas"

O CLI instala automaticamente. Se falhar:
```bash
npm install
```

---

## Configuração Avançada

### Mudar Registry Default

Crie `.igreenrc` na home:
```json
{
  "registry": "https://registry.igreen.design"
}
```

Ou use variável de ambiente:
```bash
export IGREEN_REGISTRY=https://registry.igreen.design
```
