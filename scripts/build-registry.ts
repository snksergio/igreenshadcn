
import fs from 'fs';
import path from 'path';

/**
 * Registry Builder Script
 * 
 * Automatically generates:
 * 1. public/registry/styles/theme.json (shadcn theme format)
 * 2. public/registry/styles/theme-config.json (standalone CSS file for distributions)
 * 
 * Scans theme/primitives, theme/semantic, and theme/bridge directories.
 */

// Paths
const THEME_DIR = path.join(process.cwd(), 'theme');
const OUTPUT_THEME_JSON = path.join(process.cwd(), 'public/registry/styles/theme.json');
const OUTPUT_THEME_CONFIG_JSON = path.join(process.cwd(), 'public/registry/styles/theme-config.json');

const DIRS_TO_SCAN = [
    path.join(THEME_DIR, 'primitives'),
    path.join(THEME_DIR, 'semantic'),
    path.join(THEME_DIR, 'bridge'),
];

// Regex to capture CSS variables
const REGEX_CSS_VAR = /--([\w-]+):\s*([^;]+);/g;

function removeComments(css: string): string {
    return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

interface ThemeJson {
    name: string;
    type: string;
    cssVars: {
        light: Record<string, string>;
        dark: Record<string, string>;
    }
}

// Pre-defined @theme block (Tailwind v4 Configuration)
// This maps the CSS variables to Tailwind utility classes.
// Pre-defined @theme block (Tailwind v4 Configuration)
// This maps the CSS variables to Tailwind utility classes.
const TAILWIND_STATIC_BLOCK = `
@theme {
  /* Fonts */
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Geist", ui-serif, Georgia, serif;
  --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, monospace;

  /* Font Sizes */
  --font-size-2xs: var(--typography-2xs);
  --font-size-xs: var(--typography-xs);
  --font-size-sm: var(--typography-sm);
  --font-size-base: var(--typography-base);
  --font-size-lg: var(--typography-lg);
  --font-size-xl: var(--typography-xl);
  --font-size-2xl: var(--typography-2xl);
  --font-size-3xl: var(--typography-3xl);
  --font-size-4xl: var(--typography-4xl);
  --font-size-5xl: var(--typography-5xl);
  --font-size-6xl: var(--typography-6xl);
  --font-size-7xl: var(--typography-7xl);
  --font-size-8xl: var(--typography-8xl);
  --font-size-9xl: var(--typography-9xl);
  --font-size-formcontrol: var(--text-formcontrol);

  /* Line Heights */
  --line-height-none: var(--typography-leading-none);
  --line-height-tight: var(--typography-leading-tight);
  --line-height-snug: var(--typography-leading-snug);
  --line-height-normal: var(--typography-leading-normal);
  --line-height-relaxed: var(--typography-leading-relaxed);
  --line-height-loose: var(--typography-leading-loose);

  /* Font Weights */
  --font-weight-thin: var(--typography-weight-thin);
  --font-weight-extralight: var(--typography-weight-extralight);
  --font-weight-light: var(--typography-weight-light);
  --font-weight-normal: var(--typography-weight-normal);
  --font-weight-medium: var(--typography-weight-medium);
  --font-weight-semibold: var(--typography-weight-semibold);
  --font-weight-bold: var(--typography-weight-bold);
  --font-weight-extrabold: var(--typography-weight-extrabold);
  --font-weight-black: var(--typography-weight-black);

  /* Letter Spacing */
  --letter-spacing-tighter: var(--typography-tracking-tighter);
  --letter-spacing-tight: var(--typography-tracking-tight);
  --letter-spacing-normal: var(--typography-tracking-normal);
  --letter-spacing-wide: var(--typography-tracking-wide);
  --letter-spacing-wider: var(--typography-tracking-wider);
  --letter-spacing-widest: var(--typography-tracking-widest);

  /* Radius */
  --radius-xs: calc(var(--radius) - 6px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
`;

const TAILWIND_DYNAMIC_PREFIXES = [
    'brand', 'neutral', 'success', 'warning', 'critical', 'info', // Primitives
    'bg', 'fg', 'border', 'ring', // Semantic
    'sidebar', 'chart', 'background', 'foreground', 'card', 'popover', 'primary', 'secondary', 'muted', 'accent', 'destructive', 'input' // Bridge
];

function buildRegistry() {
    console.log('🏗️  Building Registry Themes...');

    const lightVars: Record<string, string> = {};
    const darkVars: Record<string, string> = {};

    let totalVars = 0;

    DIRS_TO_SCAN.forEach(dir => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            if (!file.endsWith('.css')) return;
            const filePath = path.join(dir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const cleanContent = removeComments(content);
            const parts = cleanContent.split('.dark {');

            // Process Light
            let match;
            REGEX_CSS_VAR.lastIndex = 0;
            while ((match = REGEX_CSS_VAR.exec(parts[0])) !== null) {
                const [_, name, value] = match;
                lightVars[name] = value.trim();
                totalVars++;
            }

            // Process Dark
            if (parts[1]) {
                const darkBlock = parts[1].split('}')[0];
                REGEX_CSS_VAR.lastIndex = 0;
                while ((match = REGEX_CSS_VAR.exec(darkBlock)) !== null) {
                    const [_, name, value] = match;
                    darkVars[name] = value.trim();
                }
            }
        });
    });

    // 1. Build Standard Shadcn Theme (theme.json)
    const themeRegistry: ThemeJson = {
        name: "base",
        type: "registry:theme",
        cssVars: {
            light: lightVars,
            dark: darkVars
        }
    };
    // Ensure dir exists
    const outDir = path.dirname(OUTPUT_THEME_JSON);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(OUTPUT_THEME_JSON, JSON.stringify(themeRegistry, null, 2));

    // 2. Build Component Overlay Theme (theme-config.json)

    // Auto-generate Dynamic Theme Block
    let configCss = TAILWIND_STATIC_BLOCK + '\n';

    // Sort keys for consistent output
    const sortedKeys = Object.keys(lightVars).sort();

    configCss += '  /* Auto-generated Mappings */\n';

    sortedKeys.forEach(key => {
        // Check if key starts with any of our known color prefixes
        // or if it generally looks like a system color token
        const isColor = TAILWIND_DYNAMIC_PREFIXES.some(prefix => key.startsWith(prefix));
        const isShadow = key.startsWith('shadow');
        const isGradient = key.startsWith('gradient');

        if (isColor) {
            configCss += `  --color-${key}: var(--${key});\n`;
        }

        if (isShadow) {
            configCss += `  --shadow-${key.replace('shadow-', '')}: var(--${key});\n`;
        }

        if (isGradient) {
            configCss += `  --image-${key.replace('gradient-', '')}: var(--${key});\n`;
        }
    });

    configCss += '}\n\n';

    // Add :root variables
    configCss += ':root {\n';
    Object.entries(lightVars).sort(([a], [b]) => a.localeCompare(b)).forEach(([key, value]) => {
        configCss += `  --${key}: ${value};\n`;
    });
    configCss += '}\n\n';

    // Add .dark variables
    configCss += '@custom-variant dark (&:is(.dark *));\n\n';
    configCss += '.dark {\n';
    Object.entries(darkVars).sort(([a], [b]) => a.localeCompare(b)).forEach(([key, value]) => {
        configCss += `  --${key}: ${value};\n`;
    });
    configCss += '}\n';

    const configRegistry = {
        name: "theme-config",
        type: "registry:ui",
        dependencies: ["tailwindcss-animate"],
        files: [
            {
                path: "components/ui/theme-config.css",
                content: configCss,
                type: "registry:ui"
            }
        ]
    };

    fs.writeFileSync(OUTPUT_THEME_CONFIG_JSON, JSON.stringify(configRegistry, null, 2));

    console.log(`✅ Registry built successfully!`);
    console.log(`   - Theme Vars: ${totalVars} extracted`);
    console.log(`   - Generated: ${OUTPUT_THEME_JSON}`);
    console.log(`   - Generated: ${OUTPUT_THEME_CONFIG_JSON}`);
}

buildRegistry();
