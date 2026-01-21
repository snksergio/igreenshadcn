#!/usr/bin/env node

/**
 * iGreen Design System - Postinstall Setup
 * 
 * Configura automaticamente o projeto após npm install
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Detectar se está sendo instalado em um projeto (não no próprio igreen)
const isInstallingInProject = () => {
  // __dirname é o caminho do próprio script
  // Se estiver em node_modules/@igreen/design-system, deve configurar o projeto

  if (__dirname.includes(path.join('node_modules', '@igreen', 'design-system'))) {
    // Projeto raiz está 3 níveis acima
    const projectRoot = path.resolve(__dirname, '..', '..', '..');

    // Verificar se NÃO é o próprio repo igreen
    const isIgreenRepo = fs.existsSync(path.join(projectRoot, 'packages', 'design-system'));

    return !isIgreenRepo; // Retorna true se NÃO for o repo igreen
  }

  return false;
};

const getProjectRoot = () => {
  // __dirname está em node_modules/@igreen/design-system
  // Projeto raiz está 3 níveis acima
  return path.resolve(__dirname, '..', '..', '..');
};

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupProject() {
  console.log('\n🎨 iGreen Design System Setup\n');

  // Verificar se está sendo instalado em um projeto
  if (!isInstallingInProject()) {
    console.log('[DEBUG] __dirname:', __dirname);
    console.log('[DEBUG] Skipping setup (detected as igreen repo or not in node_modules)\n');
    rl.close();
    return;
  }

  const projectRoot = getProjectRoot();
  console.log('[DEBUG] Project root:', projectRoot);

  // Verificar se já foi configurado antes
  const igreenConfigPath = path.join(projectRoot, '.igreen-configured');
  if (fs.existsSync(igreenConfigPath)) {
    console.log('✅ Projeto já configurado anteriormente.\n');
    console.log('💡 Para reconfigurar, delete o arquivo .igreen-configured e reinstale.\n');
    rl.close();
    return;
  }

  console.log('🚀 Vamos configurar seu projeto iGreen!\n');

  // 1. Perguntar se quer configuração automática
  const autoSetup = await question('Deseja configurar automaticamente? (S/n): ');
  if (autoSetup.toLowerCase() === 'n') {
    console.log('\n📚 Configuração manual: https://github.com/seu-repo/docs\n');
    rl.close();
    return;
  }

  // 2. Escolher tema
  console.log('\n📦 Temas disponíveis:');
  console.log('  1. igreen (padrão verde)');
  console.log('  2. solarorange (laranja vibrante)\n');

  const themeChoice = await question('Escolha o tema (1-2) [1]: ');
  const theme = themeChoice === '2' ? 'solarorange' : 'igreen';

  // 3. Criar estrutura de pastas
  console.log('\n📁 Criando estrutura de pastas...');

  const appDir = path.join(projectRoot, 'app');
  const componentsDir = path.join(projectRoot, 'components');
  const libDir = path.join(projectRoot, 'lib');

  [appDir, componentsDir, libDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`  ✅ ${path.relative(projectRoot, dir)}/`);
    }
  });

  // 4. Criar globals.css
  console.log('\n🎨 Configurando globals.css...');
  const globalsCss = `@import 'tailwindcss';

/* iGreen Design System está configurado! */
/* O tema ${theme} será carregado automaticamente no layout */
`;

  fs.writeFileSync(path.join(appDir, 'globals.css'), globalsCss);
  console.log('  ✅ app/globals.css');

  // 5. Criar layout.tsx
  console.log('  Configurando layout.tsx...');
  const layoutContent = `import '@igreen/themes/${theme}'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'iGreen App',
  description: 'Created with iGreen Design System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
`;

  fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutContent);
  console.log('  ✅ app/layout.tsx');

  // 6. Criar page.tsx exemplo
  console.log('  Criando página de exemplo...');
  const pageContent = `import { Button } from '@igreen/button'
import { Input } from '@igreen/input'
import { Label } from '@igreen/label'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">
        🎨 iGreen Design System
      </h1>
      
      <div className="space-y-6 max-w-md">
        <div>
          <Label>Nome</Label>
          <Input placeholder="Digite seu nome" />
        </div>
        
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="seu@email.com" />
        </div>
        
        <Button>Enviar</Button>
      </div>
    </main>
  )
}
`;

  fs.writeFileSync(path.join(appDir, 'page.tsx'), pageContent);
  console.log('  ✅ app/page.tsx');

  // 7. Criar lib/utils.ts
  console.log('  Configurando utilitários...');
  const utilsContent = `export { cn } from '@igreen/utils'
`;

  fs.writeFileSync(path.join(libDir, 'utils.ts'), utilsContent);
  console.log('  ✅ lib/utils.ts');

  // 8. Verificar/Criar postcss.config.mjs
  console.log('\n⚙️  Configurando PostCSS...');
  const postcssConfig = path.join(projectRoot, 'postcss.config.mjs');
  if (!fs.existsSync(postcssConfig)) {
    const postcssContent = `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
`;
    fs.writeFileSync(postcssConfig, postcssContent);
    console.log('  ✅ postcss.config.mjs');
  } else {
    console.log('  ⏭️  postcss.config.mjs já existe');
  }

  // 9. Atualizar package.json scripts (se possível)
  console.log('\n📦 Verificando scripts...');
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }

      if (!packageJson.scripts.dev) {
        packageJson.scripts.dev = 'next dev';
        packageJson.scripts.build = 'next build';
        packageJson.scripts.start = 'next start';

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('  ✅ Scripts adicionados ao package.json');
      }
    } catch (e) {
      console.log('  ⚠️  Não foi possível atualizar package.json automaticamente');
    }
  }

  // 10. Marcar como configurado
  fs.writeFileSync(igreenConfigPath, `Configured at: ${new Date().toISOString()}\nTheme: ${theme}\n`);

  // 11. Mostrar próximos passos
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Projeto configurado com sucesso!');
  console.log('='.repeat(60));
  console.log(`\n📦 Tema instalado: ${theme}`);
  console.log('\n📝 Próximos passos:\n');
  console.log('  1. Instale as dependências do Next.js:');
  console.log('     npm install next@latest react@latest react-dom@latest');
  console.log('');
  console.log('  2. Instale o Tailwind CSS v4:');
  console.log('     npm install tailwindcss@next @tailwindcss/postcss@next');
  console.log('');
  console.log('  3. Inicie o servidor de desenvolvimento:');
  console.log('     npm run dev');
  console.log('');
  console.log('  4. Abra http://localhost:3000\n');
  console.log('📚 Documentação: https://github.com/seu-repo/docs');
  console.log('💚 Componentes disponíveis:');
  console.log('   - Button, Input, Label, Checkbox, ExampleCard\n');
  console.log('='.repeat(60) + '\\n');

  rl.close();
}

// Executar setup
setupProject().catch(error => {
  console.error('\n❌ Erro durante configuração:', error.message);
  console.log('\n📚 Para configuração manual: https://github.com/seu-repo/docs\n');
  rl.close();
  process.exit(0); // Não falhar a instalação
});
