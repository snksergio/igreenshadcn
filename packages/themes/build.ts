import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const themes = ['igreen'];
const distDir = path.join(__dirname, 'dist');

// Criar pasta dist se não existir
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Build cada theme
for (const theme of themes) {
    const srcPath = path.join(__dirname, 'src', theme, 'index.css');
    const distPath = path.join(distDir, `${theme}.css`);

    if (fs.existsSync(srcPath)) {
        // Ler conteúdo do index.css
        const content = fs.readFileSync(srcPath, 'utf-8');

        // Resolver os @import relativos
        const resolvedContent = content.replace(
            /@import\s+["']\.\/([^"']+)["'];/g,
            (match, importPath) => {
                const fullPath = path.join(__dirname, 'src', theme, importPath);
                if (fs.existsSync(fullPath)) {
                    return fs.readFileSync(fullPath, 'utf-8');
                }
                return match;
            }
        );

        fs.writeFileSync(distPath, resolvedContent);
        console.log(`✅ Built theme: ${theme}`);
    } else {
        console.warn(`⚠️  Theme source not found: ${srcPath}`);
    }
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
