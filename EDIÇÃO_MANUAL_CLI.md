# ✏️ Edição Manual Necessária

## Arquivo: `packages/cli/src/index.ts`

### DELETE as linhas 83-95:

```typescript
    // 3. Setup .npmrc (CRITICAL for local registry)
    const spinnerNpmrc = ora('Configurando Registry local (.npmrc)...').start();
    try {
      const npmrcContent = `registry=${registryUrl}\n`;
      await fs.writeFile(path.join(projectPath, '.npmrc'), npmrcContent);
      spinnerNpmrc.succeed('Registry configurado!');
    } catch (error) {
      spinnerNpmrc.fail('Erro ao criar .npmrc');
      return;
    }

    // 4. Install Dependencies
    const spinnerDeps = ora('Instalando pacotes (@igreen/design-system, etc)...').start();
```

### SUBSTITUA por:

```typescript
    // 3. Install Dependencies (directly from NPM public)
    const spinnerDeps = ora('Instalando pacotes do NPM público...').start();
```

---

## ✅ Mudanças Já Aplicadas

1. ✅ Linha 28: Registry padrão mudado para `https://registry.npmjs.org`
2. ✅ Linha 570: Registry padrão do comando `add` atualizado
3. ⬜ Linhas 83-95: **Você precisa fazer esta manualmente** (veja acima)

---

## 📝 Depois de Editar

Execute os comandos descritos em `COMANDOS_PUBLICAR_CLI.md`:

```cmd
cd c:\Users\sergi\OneDrive\Área de Trabalho\shadcnv4\igreenshadcn\packages\cli
npm run build
npm publish
```

---

**Ou se preferir, eu posso reescrever o arquivo inteiro com as mudanças aplicadas!**
