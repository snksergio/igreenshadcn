#!/usr/bin/env tsx
/**
 * Script para criar pacotes de componentes automaticamente
 * Uso: tsx scripts/create-component-package.ts <component-name>
 */

import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];

if (!componentName) {
    console.error('❌ Uso: npm run create-component-package <component-name>');
    console.error('   Exemplo: npm run create-component-package checkbox');
    process.exit(1);
}

const projectRoot = process.cwd();
const uiPath = path.join(projectRoot, 'components', 'ui', `${componentName}.tsx`);
const packageDir = path.join(projectRoot, 'packages', 'components', componentName);
const srcDir = path.join(packageDir, 'src');

console.log(`🚀 Criando pacote para: ${componentName}`);

// Verificar se componente existe
if (!fs.existsSync(uiPath)) {
    console.error(`❌ Componente não encontrado: ${uiPath}`);
    process.exit(1);
}

// Criar estrutura de pastas
fs.mkdirSync(srcDir, { recursive: true });
console.log('✅ Estrutura de pastas criada');

// Copiar componente
const componentContent = fs.readFileSync(uiPath, 'utf-8');
const updatedContent = componentContent.replace(
    /from ["']@\/lib\/utils["']/g,
    'from "@igreen/utils"'
);
fs.writeFileSync(path.join(srcDir, `${componentName}.tsx`), updatedContent);
console.log('✅ Componente copiado e imports atualizados');

// Criar index.ts
fs.writeFileSync(
    path.join(srcDir, 'index.ts'),
    `export * from './${componentName}';\n`
);
console.log('✅ index.ts criado');

// Criar package.json
const packageJson = {
    name: `@igreen/${componentName}`,
    version: '1.0.0',
    description: `iGreen Design System - ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component`,
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    files: ['dist'],
    scripts: {
        build: 'tsc',
        dev: 'tsc --watch'
    },
    peerDependencies: {
        react: '^19.0.0',
        'react-dom': '^19.0.0'
    },
    dependencies: {
        '@igreen/utils': 'file:../../utils'
    },
    devDependencies: {
        '@types/react': '^19',
        '@types/react-dom': '^19'
    },
    publishConfig: {
        access: 'public',
        registry: 'http://localhost:4873'
    }
};

// Detectar dependências do componente
const radixMatch = componentContent.match(/@radix-ui\/[\w-]+/g);
const cvaMatch = componentContent.match(/class-variance-authority/);

if (radixMatch) {
    const radixDeps = [...new Set(radixMatch)];
    radixDeps.forEach(dep => {
        packageJson.dependencies[dep] = '^1.2.4';
    });
}

if (cvaMatch) {
    packageJson.dependencies['class-variance-authority'] = '^0.7.1';
}

fs.writeFileSync(
    path.join(packageDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
);
console.log('✅ package.json criado');

// Criar tsconfig.json
const tsConfig = {
    extends: '../../../tsconfig.base.json',
    compilerOptions: {
        outDir: 'dist',
        rootDir: 'src'
    },
    include: ['src/**/*']
};

fs.writeFileSync(
    path.join(packageDir, 'tsconfig.json'),
    JSON.stringify(tsConfig, null, 2)
);
console.log('✅ tsconfig.json criado');

console.log('\n🎉 Pacote criado com sucesso!');
console.log(`📁 Localização: packages/components/${componentName}`);
console.log('\n📝 Próximos passos:');
console.log(`   1. cd packages/components/${componentName}`);
console.log('   2. npm install');
console.log('   3. npm run build');
console.log('   4. npm publish --registry http://localhost:4873');
