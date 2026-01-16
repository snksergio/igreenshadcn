#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
// Dynamic version from package.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = fs.readJsonSync(path.join(__dirname, '../package.json'));
const program = new Command();
program
    .name('igreen')
    .description('CLI do iGreen Design System')
    .version(pkg.version);
program
    .command('init')
    .description('Inicializa o design system no projeto atual')
    .option('--registry <url>', 'URL do Registry', 'http://localhost:3000') // Default para dev
    .action(async (options) => {
    console.log(chalk.green('🚀 Inicializando iGreen Design System...'));
    const registryUrl = options.registry;
    const themeConfigUrl = `${registryUrl}/registry/styles/theme-config.json`;
    // 0. Pre-flight Check: O Registry está online?
    try {
        await fetch(themeConfigUrl);
    }
    catch (e) {
        console.error(chalk.red('\n🚫 Erro: Não foi possível conectar ao Registry.'));
        console.error(chalk.yellow(`   Verifique se o servidor está rodando em: ${registryUrl}`));
        console.error(chalk.dim('   (Dica: Rode "npm run dev" no projeto do Design System)\n'));
        process.exit(1);
    }
    // 0.1 Tailwind Check
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        try {
            const pkg = await fs.readJson(packageJsonPath);
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };
            const twVersion = deps.tailwindcss;
            if (twVersion && (twVersion.startsWith('^3') || twVersion.startsWith('3'))) {
                console.log(chalk.yellow('\n⚠️  Atenção: Detectamos Tailwind CSS v3.'));
                console.log(chalk.dim('   O iGreen foi otimizado para o Tailwind v4.'));
                console.log(chalk.dim('   Recomendamos atualizar para evitar problemas de estilo.\n'));
            }
        }
        catch (error) {
            // Ignore JSON parse errors
        }
    }
    // 0.2 Interactive Selection
    const response = await prompts({
        type: 'select',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            { title: 'Adicionar iGreen Theme (Projeto Existente)', value: 'theme' },
            { title: 'Criar Novo Projeto (Starter Kit)', value: 'new' }, // Habilitado
        ],
    });
    if (!response.action) {
        console.log(chalk.yellow('Operação cancelada.'));
        return;
    }
    if (response.action === 'new') {
        const project = await prompts({
            type: 'text',
            name: 'name',
            message: 'Qual o nome do seu projeto?',
            initial: 'my-igreen-app'
        });
        if (!project.name)
            return;
        const projectPath = path.join(process.cwd(), project.name);
        // 1. Create Next App
        console.log(chalk.green(`\n🌱 Criando projeto Next.js em ${project.name}...`));
        try {
            await execa('npx', [
                'create-next-app@latest',
                project.name,
                '--typescript',
                '--tailwind',
                '--eslint',
                '--app',
                '--no-src-dir',
                '--import-alias', '@/*',
                '--use-npm' // Force npm for consistency
            ], { stdio: 'inherit' });
        }
        catch (error) {
            console.error(chalk.red('Erro ao criar o projeto Next.js'));
            return;
        }
        // 1.5 Template Selection
        const template = await prompts({
            type: 'select',
            name: 'type',
            message: 'Como você deseja iniciar?',
            choices: [
                { title: 'Apenas Configuração (Base)', value: 'empty' },
                { title: 'Com Todos os Componentes (Completo)', value: 'full' },
            ],
        });
        // 2. Initialize Shadcn (Defaults)
        const initSpinner = ora('Inicializando Shadcn...').start();
        try {
            await execa('npx', ['shadcn@latest', 'init', '-d'], {
                stdio: 'inherit',
                cwd: projectPath
            });
            initSpinner.succeed('Shadcn inicializado!');
        }
        catch (error) {
            initSpinner.fail('Erro ao inicializar shadcn.');
            console.error(error);
            return;
        }
        // 3. Install iGreen Theme inside the new project
        const spinner = ora('Instalando iGreen Design System...').start();
        try {
            // Change cwd to the new project for these commands
            await execa('npx', ['shadcn@latest', 'add', themeConfigUrl, '--overwrite'], {
                stdio: 'inherit', // Suppress output here to keep it clean
                cwd: projectPath
            });
            spinner.succeed('iGreen instalado com sucesso!');
        }
        catch (error) {
            spinner.fail('Erro ao instalar iGreen no novo projeto.');
            console.error(error);
        }
        // 4. Install All Components (if Full)
        // NOTE: We bypass `shadcn add` here because shadcn prefers its internal
        // registry for known component names like "button". Instead, we fetch
        // the component JSON directly and write files ourselves.
        if (template.type === 'full') {
            const compSpinner = ora('Buscando componentes...').start();
            try {
                const indexUrl = `${registryUrl}/registry/index.json`;
                const indexRes = await fetch(indexUrl);
                if (!indexRes.ok)
                    throw new Error('Falha ao buscar registry index');
                const registry = await indexRes.json();
                const components = registry.items || [];
                compSpinner.text = `Instalando ${components.length} componentes...`;
                for (const comp of components) {
                    const compUrl = `${registryUrl}/registry/components/${comp.name}.json`;
                    compSpinner.text = `Instalando ${comp.name}...`;
                    // Fetch component JSON directly
                    const compRes = await fetch(compUrl);
                    if (!compRes.ok) {
                        console.warn(chalk.yellow(`   Aviso: Não foi possível baixar ${comp.name}`));
                        continue;
                    }
                    const compData = await compRes.json();
                    // Install npm dependencies
                    if (compData.dependencies && compData.dependencies.length > 0) {
                        await execa('npm', ['install', ...compData.dependencies], {
                            stdio: 'ignore',
                            cwd: projectPath
                        });
                    }
                    // Write files directly to their target paths
                    for (const file of compData.files) {
                        const targetPath = path.join(projectPath, file.target);
                        // Ensure directory exists
                        await fs.ensureDir(path.dirname(targetPath));
                        // Write file content
                        await fs.writeFile(targetPath, file.content, 'utf-8');
                    }
                }
                compSpinner.succeed(`Todos os ${components.length} componentes instalados!`);
            }
            catch (e) {
                compSpinner.fail('Erro ao instalar componentes.');
                console.error(e);
            }
        }
        // 3. Clean globals.css in the new project
        const cleanerSpinner = ora('Otimizando globals.css...').start();
        try {
            const globalsPath = path.join(projectPath, 'app', 'globals.css');
            const cleanContent = `@import "tailwindcss";
@import "../components/ui/theme-config.css";

@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Personalizações do projeto */
}

:root {
  /* Variáveis locais */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
            await fs.writeFile(globalsPath, cleanContent);
            cleanerSpinner.succeed('globals.css limpo e configurado!');
        }
        catch (error) {
            cleanerSpinner.fail('Erro ao limpar globals.css');
        }
        console.log(chalk.bold.green(`\n🎉 Projeto ${project.name} criado com sucesso!`));
        console.log(chalk.dim(`\nPara começar:\n  cd ${project.name}\n  npm run dev`));
        return;
    }
    if (response.action === 'theme') {
        // 1. Instalar via Shadcn (npx shadcn add ...)
        const spinner = ora('Instalando tema e dependências...').start();
        try {
            // Usa --overwrite para garantir
            await execa('npx', ['shadcn@latest', 'add', themeConfigUrl, '--overwrite'], { stdio: 'inherit' });
            spinner.succeed('Tema instalado com sucesso!');
        }
        catch (error) {
            spinner.fail('Erro ao instalar o tema via shadcn.');
            console.error(error);
            return;
        }
        // 2. Limpar globals.css
        const cleanerSpinner = ora('Otimizando globals.css...').start();
        try {
            const globalsPath = path.join(process.cwd(), 'app', 'globals.css');
            if (fs.existsSync(globalsPath)) {
                const cleanContent = `@import "tailwindcss";
@import "../components/ui/theme-config.css";

@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Personalizações do projeto */
}

:root {
  /* Variáveis locais */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
                await fs.writeFile(globalsPath, cleanContent);
                cleanerSpinner.succeed('globals.css limpo e configurado!');
            }
            else {
                cleanerSpinner.warn('Arquivo app/globals.css não encontrado. Pulando limpeza.');
            }
        }
        catch (error) {
            cleanerSpinner.fail('Erro ao limpar globals.css');
            console.error(error);
        }
        console.log(chalk.bold.green('\n✅ Setup concluído! O projeto está pronto.'));
    }
    else {
        console.log(chalk.yellow('🚧 Feature em desenvolvimento.'));
    }
    console.log(chalk.bold.green('\n✅ Setup concluído! O projeto está pronto.'));
});
program
    .command('add [components...]')
    .description('Adiciona componentes do iGreen ao projeto')
    .option('--registry <url>', 'URL do Registry', 'http://localhost:3000')
    .option('-o, --overwrite', 'Sobrescrever arquivos existentes', false)
    .action(async (components, options) => {
    if (!components || components.length === 0) {
        console.log(chalk.yellow('⚠️  Nenhum componente especificado.'));
        console.log(chalk.dim('   Uso: igreen add button card ...'));
        return;
    }
    const registryUrl = options.registry;
    const projectPath = process.cwd();
    console.log(chalk.green(`📦 Adicionando ${components.length} componente(s)...`));
    for (const component of components) {
        const componentUrl = `${registryUrl}/registry/components/${component}.json`;
        const spinner = ora(`Instalando ${component}...`).start();
        try {
            // Fetch component JSON directly (bypass shadcn to avoid override)
            const compRes = await fetch(componentUrl);
            if (!compRes.ok) {
                spinner.fail(`Componente "${component}" não encontrado no Registry.`);
                continue;
            }
            const compData = await compRes.json();
            // Check for existing files if not overwrite mode
            if (!options.overwrite) {
                const existingFiles = compData.files.filter(f => fs.existsSync(path.join(projectPath, f.target)));
                if (existingFiles.length > 0) {
                    spinner.warn(`${component}: Arquivos já existem. Use -o para sobrescrever.`);
                    continue;
                }
            }
            // Install npm dependencies
            if (compData.dependencies && compData.dependencies.length > 0) {
                spinner.text = `Instalando dependências de ${component}...`;
                await execa('npm', ['install', ...compData.dependencies], {
                    stdio: 'ignore',
                    cwd: projectPath
                });
            }
            // Write files directly
            for (const file of compData.files) {
                const targetPath = path.join(projectPath, file.target);
                await fs.ensureDir(path.dirname(targetPath));
                await fs.writeFile(targetPath, file.content, 'utf-8');
            }
            spinner.succeed(`${component} instalado!`);
        }
        catch (error) {
            spinner.fail(`Erro ao instalar ${component}`);
            console.error(chalk.dim(`   ${error}`));
        }
    }
});
program.parse();
