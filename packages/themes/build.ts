import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const themes = ['igreen', 'solarorange'];
const distDir = path.join(__dirname, 'dist');

// Criar pasta dist se não existir
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Função para resolver imports recursivamente
const bundleCss = (filePath: string): string => {
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  File not found: ${filePath}`);
        return '';
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const dir = path.dirname(filePath);

    return content.replace(
        /@import\s+["']([^"']+)["'];/g,
        (match, importPath) => {
            // Ignorar imports externos (http/https)
            if (importPath.startsWith('http')) return match;

            const resolvedPath = path.join(dir, importPath);
            return bundleCss(resolvedPath);
        }
    );
};

// Build cada theme (montagem automática)
for (const theme of themes) {
    console.log(`Bundling theme: ${theme}...`);

    // 1. Primitives (cores, tipografia, espaçamento)
    const primitivesPath = path.join(__dirname, 'src', theme, 'primitives', 'index.css');
    const primitivesContent = bundleCss(primitivesPath);

    // 2. Semantic (cores contextuais, efeitos, sizing)
    const semanticPath = path.join(__dirname, 'src', theme, 'semantic', 'index.css');
    const semanticContent = bundleCss(semanticPath);

    // 3. Bridge (compatibilidade shadcn - compartilhado)
    const bridgePath = path.join(__dirname, 'src', 'bridge', 'shadcn.css');
    const bridgeContent = fs.readFileSync(bridgePath, 'utf-8');

    // Montar theme completo
    const themeHeader = `/**
 * ${theme.toUpperCase()} Theme - Complete Bundle
 * 
 * This file contains:
 * 1. Primitives: Raw color scales, typography, spacing
 * 2. Semantic: Contextual tokens that reference primitives
 * 3. Bridge: Shadcn/UI variable mappings
 * 
 * Import this single file in your globals.css
 */

`;

    const fullThemeContent = themeHeader + primitivesContent + '\n' + semanticContent + '\n' + bridgeContent;

    const distPath = path.join(distDir, `${theme}.css`);
    fs.writeFileSync(distPath, fullThemeContent);
    console.log(`✅ Built theme: ${theme} (auto-contained with bridge)`);
}

// Build bridge (separado)
const bridgeSrc = path.join(__dirname, 'src', 'bridge', 'shadcn.css');
const bridgeDist = path.join(distDir, 'bridge.css');

if (fs.existsSync(bridgeSrc)) {
    fs.copyFileSync(bridgeSrc, bridgeDist);
    console.log('✅ Built bridge (shadcn compatibility)');
} else {
    console.warn(`⚠️  Bridge source not found: ${bridgeSrc}`);
}

console.log('\n🎉 Theme build complete!');
