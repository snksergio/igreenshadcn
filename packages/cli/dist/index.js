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
// ==========================================
// COMMAND: INIT
// ==========================================
program
    .command('init')
    .description('Inicializa um novo projeto com iGreen Design System')
    .option('--registry <url>', 'URL do Registry (padrão: NPM público)', 'https://registry.npmjs.org')
    .action(async (options) => {
    console.log(chalk.green('🚀 Inicializando Projeto iGreen...'));
    const registryUrl = options.registry;
    // 1. Project Name & Theme Prompts
    const response = await prompts([
        {
            type: 'text',
            name: 'projectName',
            message: 'Qual o nome do seu projeto?',
            initial: 'meu-projeto-igreen'
        },
        {
            type: 'select',
            name: 'theme',
            message: 'Qual tema você deseja usar?',
            choices: [
                { title: 'iGreen (Default)', value: 'igreen' },
                { title: 'Solar Orange', value: 'solarorange' }
            ],
            initial: 0
        },
        {
            type: 'multiselect',
            name: 'components',
            message: 'Quais componentes você deseja instalar?',
            choices: [
                { title: 'Todos os componentes', value: 'all', selected: true },
                { title: 'Button', value: 'button' },
                { title: 'Input', value: 'input' },
                { title: 'Label', value: 'label' },
                { title: 'Checkbox', value: 'checkbox' },
                { title: 'Example Card', value: 'example-card' }
            ],
            instructions: 'Use espaço para selecionar, Enter para confirmar'
        }
    ]);
    if (!response.projectName || !response.theme) {
        console.log(chalk.yellow('Operação cancelada.'));
        return;
    }
    const { projectName, theme, components } = response;
    const projectPath = path.join(process.cwd(), projectName);
    // 2. Create Next.js App
    console.log(chalk.blue(`\n📦 Criando projeto Next.js em ${projectName}...`));
    try {
        await execa('npx', [
            'create-next-app@latest',
            projectName,
            '--typescript',
            '--tailwind',
            '--eslint',
            '--app',
            '--no-src-dir',
            '--import-alias', '@/*',
            '--use-npm' // Force npm
        ], { stdio: 'inherit' });
    }
    catch (error) {
        console.error(chalk.red('❌ Erro ao criar projeto Next.js'));
        return;
    }
    console.log(chalk.blue('\n🔧 Configurando iGreen Design System...'));
    // 4. Install Dependencies
    const spinnerDeps = ora('Instalando pacotes (@igreen/design-system, etc)...').start();
    try {
        // Determinar quais componentes instalar
        const shouldInstallAll = components.includes('all');
        const componentsToInstall = shouldInstallAll
            ? ['@igreen/button', '@igreen/input', '@igreen/label', '@igreen/checkbox', '@igreen/example-card']
            : components.map((c) => `@igreen/${c}`);
        await execa('npm', [
            'install',
            'next@15.1.6',
            '@igreen/design-system',
            'next-themes',
            'tailwindcss',
            '@tailwindcss/postcss',
            'tailwindcss-animate',
            'postcss',
            'clsx',
            'tailwind-merge',
            ...componentsToInstall
        ], {
            cwd: projectPath,
            stdio: 'ignore'
        });
        spinnerDeps.succeed('Dependências instaladas!');
    }
    catch (error) {
        spinnerDeps.fail('Erro ao instalar dependências.');
        return;
    }
    // 4.1 Create lib/utils.ts (Shadcn standard)
    const spinnerUtils = ora('Criando estrutura Shadcn (lib/utils.ts)...').start();
    try {
        const libPath = path.join(projectPath, 'lib');
        await fs.ensureDir(libPath);
        const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
        await fs.writeFile(path.join(libPath, 'utils.ts'), utilsContent);
        spinnerUtils.succeed('Utils criado!');
    }
    catch (error) {
        spinnerUtils.fail('Erro ao criar lib/utils.ts');
    }
    // 4.2 Create components/ui folder
    try {
        await fs.ensureDir(path.join(projectPath, 'components', 'ui'));
    }
    catch (e) { }
    // 4.3 Create components.json
    const spinnerConfig = ora('Gerando components.json...').start();
    try {
        const componentsJson = {
            "$schema": "https://ui.shadcn.com/schema.json",
            "style": "new-york",
            "rsc": true,
            "tsx": true,
            "tailwind": {
                "config": "tailwind.config.ts",
                "css": "app/globals.css",
                "baseColor": "neutral",
                "cssVariables": true,
                "prefix": ""
            },
            "aliases": {
                "components": "@/components",
                "utils": "@/lib/utils",
                "ui": "@/components/ui",
                "lib": "@/lib",
                "hooks": "@/hooks"
            }
        };
        await fs.writeJson(path.join(projectPath, 'components.json'), componentsJson, { spaces: 2 });
        spinnerConfig.succeed('components.json gerado!');
    }
    catch (error) {
        spinnerConfig.fail('Erro ao gerar components.json');
    }
    // 5. Configure globals.css (Tailwind v4 + Theme)
    const spinnerCss = ora('Configurando Tailwind v4 e Temas...').start();
    try {
        const globalsPath = path.join(projectPath, 'app', 'globals.css');
        const globalsContent = `@import "@igreen/themes/${theme}";
@import "tailwindcss";
@source "../node_modules/@igreen/**/*.{js,ts,jsx,tsx}";
@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme {
  /* ------------------------------------------
     TYPOGRAPHY - FONT FAMILIES
     ------------------------------------------ */
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Geist", ui-serif, Georgia, serif;
  --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, monospace;

  /* ------------------------------------------
     BORDER RADIUS
     ------------------------------------------ */
  --radius-xs: calc(var(--radius) - 6px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);

  /* ==========================================
     SHADCN/UI BRIDGE COLORS
     ========================================== */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Chart Colors */
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  /* Sidebar Colors */
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* ==========================================
     PRIMITIVES - BASE COLORS
     ========================================== */
  --color-base-static-black: var(--base-static-black);
  --color-base-static-white: var(--base-static-white);

  /* ==========================================
     PRIMITIVES - BRAND SCALE
     ========================================== */
  --color-brand-50: var(--brand-50);
  --color-brand-100: var(--brand-100);
  --color-brand-200: var(--brand-200);
  --color-brand-300: var(--brand-300);
  --color-brand-400: var(--brand-400);
  --color-brand-500: var(--brand-500);
  --color-brand-600: var(--brand-600);
  --color-brand-700: var(--brand-700);
  --color-brand-800: var(--brand-800);
  --color-brand-900: var(--brand-900);
  --color-brand-950: var(--brand-950);

  /* Brand Alpha Variants */
  --color-brand-alpha-5: var(--brand-alpha-5);
  --color-brand-alpha-10: var(--brand-alpha-10);
  --color-brand-alpha-15: var(--brand-alpha-15);
  --color-brand-alpha-20: var(--brand-alpha-20);
  --color-brand-alpha-25: var(--brand-alpha-25);
  --color-brand-alpha-30: var(--brand-alpha-30);
  --color-brand-alpha-50: var(--brand-alpha-50);

  /* ==========================================
     PRIMITIVES - NEUTRAL SCALE
     ========================================== */
  --color-neutral-0: var(--neutral-0);
  --color-neutral-50: var(--neutral-50);
  --color-neutral-100: var(--neutral-100);
  --color-neutral-200: var(--neutral-200);
  --color-neutral-300: var(--neutral-300);
  --color-neutral-400: var(--neutral-400);
  --color-neutral-500: var(--neutral-500);
  --color-neutral-600: var(--neutral-600);
  --color-neutral-700: var(--neutral-700);
  --color-neutral-800: var(--neutral-800);
  --color-neutral-900: var(--neutral-900);
  --color-neutral-950: var(--neutral-950);

  /* Neutral Alpha Variants */
  --color-neutral-alpha-5: var(--neutral-alpha-5);
  --color-neutral-alpha-10: var(--neutral-alpha-10);
  --color-neutral-alpha-15: var(--neutral-alpha-15);
  --color-neutral-alpha-20: var(--neutral-alpha-20);
  --color-neutral-alpha-25: var(--neutral-alpha-25);
  --color-neutral-alpha-30: var(--neutral-alpha-30);
  --color-neutral-alpha-50: var(--neutral-alpha-50);
  
  /* ==========================================
     PRIMITIVES - FEEDBACK SCALES
     ========================================== */
  --color-success-50: var(--success-50);
  --color-success-500: var(--success-500);
  --color-success-600: var(--success-600);
  --color-success-800: var(--success-800);
  --color-success-alpha-20: var(--success-alpha-20);

  --color-warning-50: var(--warning-50);
  --color-warning-500: var(--warning-500);
  --color-warning-600: var(--warning-600);
  --color-warning-800: var(--warning-800);
  --color-warning-alpha-20: var(--warning-alpha-20);

  --color-critical-50: var(--critical-50);
  --color-critical-500: var(--critical-500);
  --color-critical-600: var(--critical-600);
  --color-critical-800: var(--critical-800);
  --color-critical-alpha-20: var(--critical-alpha-20);

  --color-info-50: var(--info-50);
  --color-info-500: var(--info-500);
  --color-info-600: var(--info-600);
  --color-info-800: var(--info-800);
  --color-info-alpha-20: var(--info-alpha-20);

  /* ==========================================
     SEMANTIC - BACKGROUNDS
     ========================================== */
  --color-bg-canvas: var(--bg-canvas);
  --color-bg-background: var(--bg-background);
  --color-bg-muted: var(--bg-muted);
  --color-bg-accent: var(--bg-accent);
  --color-bg-fill: var(--bg-fill);
  --color-bg-inverse: var(--bg-inverse);

  --color-bg-elevated-0: var(--bg-elevated-0);
  --color-bg-elevated-1: var(--bg-elevated-1);
  --color-bg-elevated-2: var(--bg-elevated-2);
  --color-bg-elevated-3: var(--bg-elevated-3);
  --color-bg-elevated-4: var(--bg-elevated-4);

  --color-bg-primary: var(--bg-primary);
  --color-bg-primary-hover: var(--bg-primary-hover);
  --color-bg-primary-subtle: var(--bg-primary-subtle);

  --color-bg-secondary: var(--bg-secondary);
  --color-bg-secondary-hover: var(--bg-secondary-hover);
  --color-bg-secondary-subtle: var(--bg-secondary-subtle);

  --color-bg-tertiary: var(--bg-tertiary);
  --color-bg-tertiary-hover: var(--bg-tertiary-hover);
  --color-bg-tertiary-subtle: var(--bg-tertiary-subtle);

  --color-bg-success: var(--bg-success);
  --color-bg-success-hover: var(--bg-success-hover);
  --color-bg-success-subtle: var(--bg-success-subtle);
  --color-bg-success-muted: var(--bg-success-muted);

  --color-bg-warning: var(--bg-warning);
  --color-bg-warning-hover: var(--bg-warning-hover);
  --color-bg-warning-subtle: var(--bg-warning-subtle);
  --color-bg-warning-muted: var(--bg-warning-muted);

  --color-bg-critical: var(--bg-critical);
  --color-bg-critical-hover: var(--bg-critical-hover);
  --color-bg-critical-subtle: var(--bg-critical-subtle);
  --color-bg-critical-muted: var(--bg-critical-muted);

  --color-bg-info: var(--bg-info);
  --color-bg-info-hover: var(--bg-info-hover);
  --color-bg-info-subtle: var(--bg-info-subtle);
  --color-bg-info-muted: var(--bg-info-muted);

  /* ==========================================
     SEMANTIC - FOREGROUNDS
     ========================================== */
  --color-fg-main: var(--fg-main);
  --color-fg-subtle: var(--fg-subtle);
  --color-fg-muted: var(--fg-muted);
  --color-fg-moderate: var(--fg-moderate);
  --color-fg-strong: var(--fg-strong);

  --color-fg-primary: var(--fg-primary);
  --color-fg-on-primary: var(--fg-on-primary);

  --color-fg-secondary: var(--fg-secondary);
  --color-fg-on-secondary: var(--fg-on-secondary);

  --color-fg-tertiary: var(--fg-tertiary);
  --color-fg-on-tertiary: var(--fg-on-tertiary);

  --color-fg-interactive: var(--fg-interactive);
  --color-fg-on-inverted: var(--fg-on-inverted);
  --color-fg-muted-on-inverted: var(--fg-muted-on-inverted);

  --color-fg-success: var(--fg-success);
  --color-fg-on-success: var(--fg-on-success);
  --color-fg-warning: var(--fg-warning);
  --color-fg-on-warning: var(--fg-on-warning);
  --color-fg-critical: var(--fg-critical);
  --color-fg-on-critical: var(--fg-on-critical);
  --color-fg-info: var(--fg-info);
  --color-fg-on-info: var(--fg-on-info);

  /* ==========================================
     SEMANTIC - BORDERS
     ========================================== */
  --color-border-default: var(--border-default);
  --color-border-muted: var(--border-muted);
  --color-border-strong: var(--border-strong);

  --color-border-primary: var(--border-primary);
  --color-border-secondary: var(--border-secondary);
  --color-border-inverted: var(--border-inverted);

  --color-border-success: var(--border-success);
  --color-border-warning: var(--border-warning);
  --color-border-critical: var(--border-critical);
  --color-border-info: var(--border-info);

  /* ==========================================
     SEMANTIC - RINGS
     ========================================== */
  --color-ring-primary: var(--ring-primary);
  --color-ring-secondary: var(--ring-secondary);
  --color-ring-success: var(--ring-success);
  --color-ring-warning: var(--ring-warning);
  --color-ring-critical: var(--ring-critical);
  --color-ring-info: var(--ring-info);

  /* ==========================================
     SEMANTIC - VISUAL EFFECTS
     ========================================== */
  --shadow-inset-shine: var(--shadow-inset-shine);
  --shadow-inset-shine-pressed: var(--shadow-inset-shine-pressed);
  --gradient-shine: var(--gradient-shine);

  --shadow-elevated-0: var(--shadow-elevated-0);
  --shadow-elevated-1: var(--shadow-elevated-1);
  --shadow-elevated-2: var(--shadow-elevated-2);
  --shadow-elevated-3: var(--shadow-elevated-3);
  --shadow-elevated-4: var(--shadow-elevated-4);

  --color-backdrop-default: var(--backdrop-default);
  --color-backdrop-light: var(--backdrop-light);
  --color-backdrop-dark: var(--backdrop-dark);
  --color-backdrop-blur: var(--backdrop-blur);

  /* ==========================================
     FOCUS RINGS
     ========================================== */
  --ring-width-focus: var(--ring-focus-width);
  --ring-width-focus-sm: var(--ring-focus-width-sm);
  --ring-width-focus-lg: var(--ring-focus-width-lg);
  
  --outline-width-focus: var(--ring-focus-width);
  --outline-width-focus-sm: var(--ring-focus-width-sm);
  --outline-width-focus-lg: var(--ring-focus-width-lg);

  /* ==========================================
     ICON SIZES
     ========================================== */
  --size-icon-2xs: var(--icon-2xs);
  --size-icon-xs: var(--icon-xs);
  --size-icon-sm: var(--icon-sm);
  --size-icon-md: var(--icon-md);
  --size-icon-lg: var(--icon-lg);
  --size-icon-xl: var(--icon-xl);
  --size-icon-2xl: var(--icon-2xl);

  /* ==========================================
     Z-INDEX
     ========================================== */
  --z-index-base: var(--z-base);
  --z-index-docked: var(--z-docked);
  --z-index-dropdown: var(--z-dropdown);
  --z-index-sticky: var(--z-sticky);
  --z-index-fixed: var(--z-fixed);
  --z-index-modal-backdrop: var(--z-modal-backdrop);
  --z-index-modal: var(--z-modal);
  --z-index-popover: var(--z-popover);
  --z-index-tooltip: var(--z-tooltip);
  --z-index-toast: var(--z-toast);

  /* ==========================================
     SPACING & SIZING
     ========================================== */
  --height-formcontrol-sm: var(--h-formcontrol-sm);
  --height-formcontrol-md: var(--h-formcontrol-md);
  --height-formcontrol-lg: var(--h-formcontrol-lg);
  --height-formcontrol-xl: var(--h-formcontrol-xl);
  --height-formcontrol-2xl: var(--h-formcontrol-2xl);

  /* ==========================================
     SHADOWS (Overrides)
     ========================================== */
  --shadow-xs: 0 1px 2px 0 oklch(from var(--neutral-700) l c h / 0.05);
  --shadow-sm: 0 1px 3px 0 oklch(from var(--neutral-700) l c h / 0.1), 0 1px 2px -1px oklch(from var(--neutral-700) l c h / 0.1);
  --shadow-md: 0 4px 6px -1px oklch(from var(--neutral-700) l c h / 0.1), 0 2px 4px -2px oklch(from var(--neutral-700) l c h / 0.1);
  --shadow-lg: 0 10px 15px -3px oklch(from var(--neutral-700) l c h / 0.1), 0 4px 6px -4px oklch(from var(--neutral-700) l c h / 0.1);
  --shadow-xl: 0 20px 25px -5px oklch(from var(--neutral-700) l c h / 0.1), 0 8px 10px -6px oklch(from var(--neutral-700) l c h / 0.1);
  --shadow-2xl: 0 25px 50px -12px oklch(from var(--neutral-700) l c h / 0.25);
}

@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }

  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }
}
`;
        await fs.writeFile(globalsPath, globalsContent);
        spinnerCss.succeed('Tailwind configurado com sucesso!');
    }
    catch (error) {
        spinnerCss.fail('Erro ao configurar styles.');
        return;
    }
    // 6. Configure layout.tsx (imports)
    try {
        const layoutPath = path.join(projectPath, 'app', 'layout.tsx');
        if (fs.existsSync(layoutPath)) {
            let layoutContent = await fs.readFile(layoutPath, 'utf-8');
            // Add imports if not present
            if (!layoutContent.includes('@igreen/themes')) {
                const importLines = `import "@igreen/themes/${theme}";\n`;
                layoutContent = layoutContent.replace(/import ".\/globals.css";/, `${importLines}import "./globals.css";`);
                await fs.writeFile(layoutPath, layoutContent);
            }
        }
    }
    catch (e) {
        // ignore
    }
    // 7. Update postcss.config.mjs to use @tailwindcss/postcss
    try {
        const postcssPath = path.join(projectPath, 'postcss.config.mjs');
        const postcssContent = `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
`;
        await fs.writeFile(postcssPath, postcssContent);
    }
    catch (e) {
        // ignore
    }
    console.log(chalk.bold.green(`\n🎉 Projeto ${response.projectName} criado e configurado!`));
    console.log(chalk.dim(`\nPróximos passos:\n  cd ${response.projectName}\n  npm run dev`));
});
// ==========================================
// COMMAND: ADD
// ==========================================
program
    .command('add [components...]')
    .description('Instala componentes do iGreen (NPM)')
    .option('--registry <url>', 'URL do Registry (padrão: NPM público)', 'https://registry.npmjs.org')
    .action(async (components, options) => {
    if (!components || components.length === 0) {
        console.log(chalk.yellow('⚠️  Especifique os componentes. Ex: igreen add button input'));
        return;
    }
    console.log(chalk.green(`📦 Instalando ${components.length} componente(s)...`));
    const packages = components.map((c) => `@igreen/${c}`);
    // Add design system to ensure deps
    // packages.push('@igreen/design-system');
    try {
        await execa('npm', ['install', ...packages], { stdio: 'inherit' });
        console.log(chalk.bold.green('\n✅ Instalação concluída!'));
    }
    catch (error) {
        console.error(chalk.red('\n❌ Erro ao instalar componentes via npm.'));
        console.error(chalk.dim('Verifique se o Registry está rodando e configurado no .npmrc'));
    }
});
program.parse();
