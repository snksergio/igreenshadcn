#!/usr/bin/env tsx
/**
 * Setup New Component Script
 * 
 * Cria estrutura de pacote NPM para novo componente
 * Gera package.json, tsconfig.json, src/
 * 
 * Uso: npm run setup-component <nome> <tipo>
 * Exemplo: npm run setup-component badge shadcn
 */

import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)

if (args.length < 2) {
    console.error('❌ Uso: npm run setup-component <nome> <tipo>')
    console.error('   Tipo: shadcn | igreen')
    console.error('   Exemplo: npm run setup-component badge shadcn')
    process.exit(1)
}

const [componentName, componentType] = args

if (!['shadcn', 'igreen'].includes(componentType)) {
    console.error('❌ Tipo inválido. Use: shadcn ou igreen')
    process.exit(1)
}

const PROJECT_ROOT = process.cwd()
const COMPONENT_PATH = path.join(
    PROJECT_ROOT,
    'packages',
    'components',
    componentType,
    componentName
)

async function setupComponent() {
    console.log(`🚀 Criando pacote: @igreen/${componentName}\n`)

    // Verificar se já existe
    if (fs.existsSync(COMPONENT_PATH)) {
        console.error(`❌ Pacote já existe: ${COMPONENT_PATH}`)
        console.error('   Use --force para sobrescrever (não implementado)')
        process.exit(1)
    }

    // Criar estrutura de diretórios
    const srcPath = path.join(COMPONENT_PATH, 'src')
    fs.mkdirSync(srcPath, { recursive: true })
    console.log(`✅ Estrutura criada: ${COMPONENT_PATH}`)

    // Criar package.json
    const packageJson = {
        name: `@igreen/${componentName}`,
        version: '1.0.0',
        description: `iGreen Design System - ${capitalize(componentName)} Component`,
        main: 'dist/index.js',
        types: 'dist/index.d.ts',
        files: ['dist'],
        scripts: {
            build: 'tsc',
            dev: 'tsc --watch',
        },
        peerDependencies: {
            react: '^19.0.0',
            'react-dom': '^19.0.0',
        },
        dependencies: {
            '@igreen/themes': '^1.2.0',
            '@igreen/utils': '^1.0.0',
        },
        devDependencies: {
            '@types/react': '^19',
            '@types/react-dom': '^19',
        },
        publishConfig: {
            access: 'public',
            registry: 'http://localhost:4873',
        },
    }

    // Adicionar dependências comuns baseado no tipo
    if (componentType === 'shadcn') {
        packageJson.dependencies['class-variance-authority'] = '^0.7.1'
    }

    fs.writeFileSync(
        path.join(COMPONENT_PATH, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    )
    console.log('✅ package.json criado')

    // Criar tsconfig.json
    const tsConfig = {
        extends: '../../../../tsconfig.base.json',
        compilerOptions: {
            outDir: 'dist',
            rootDir: 'src',
        },
        include: ['src/**/*'],
    }

    fs.writeFileSync(
        path.join(COMPONENT_PATH, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
    )
    console.log('✅ tsconfig.json criado')

    // Criar src/index.ts placeholder
    const indexTemplate =
        componentType === 'shadcn'
            ? `export * from './${componentName}'\n`
            : `export * from './component'\nexport type * from './types'\n`

    fs.writeFileSync(path.join(srcPath, 'index.ts'), indexTemplate)
    console.log('✅ src/index.ts criado')

    // Para componentes iGreen, criar estrutura multi-arquivo
    if (componentType === 'igreen') {
        // types.ts
        const typesTemplate = `import { ReactNode } from 'react'

export interface ${capitalize(componentName)}Props {
  /**
   * Conteúdo do componente
   */
  children?: ReactNode
  
  /**
   * Classes CSS adicionais
   */
  className?: string
}
`
        fs.writeFileSync(path.join(srcPath, 'types.ts'), typesTemplate)

        // styles.ts
        const stylesTemplate = `import { cva } from 'class-variance-authority'

export const ${componentName}Variants = cva(
  // Base styles
  '',
  {
    variants: {
      variant: {
        default: '',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)
`
        fs.writeFileSync(path.join(srcPath, 'styles.ts'), stylesTemplate)

        // component.tsx
        const componentTemplate = `import React from 'react'
import { cn } from '@igreen/utils'
import { ${capitalize(componentName)}Props } from './types'
import { ${componentName}Variants } from './styles'

/**
 * ${capitalize(componentName)} Component
 * 
 * TODO: Adicionar descrição
 */
export const ${capitalize(componentName)} = React.forwardRef<
  HTMLDivElement,
  ${capitalize(componentName)}Props
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(${componentName}Variants(), className)}
      {...props}
    >
      {children}
    </div>
  )
})

${capitalize(componentName)}.displayName = '${capitalize(componentName)}'
`
        fs.writeFileSync(path.join(srcPath, 'component.tsx'), componentTemplate)

        console.log('✅ Estrutura iGreen criada (component.tsx, types.ts, styles.ts)')
    } else {
        // Para shadcn, criar arquivo único como placeholder
        const componentTemplate = `import React from 'react'
import { cn } from '@igreen/utils'

export interface ${capitalize(componentName)}Props
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ${capitalize(componentName)} = React.forwardRef<
  HTMLDivElement,
  ${capitalize(componentName)}Props
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  )
})

${capitalize(componentName)}.displayName = '${capitalize(componentName)}'
`
        fs.writeFileSync(path.join(srcPath, `${componentName}.tsx`), componentTemplate)
        console.log(`✅ ${componentName}.tsx criado`)
    }

    // Instruções finais
    console.log('\n🎉 Pacote criado com sucesso!')
    console.log(`📁 Localização: packages/components/${componentType}/${componentName}`)
    console.log('\n📝 Próximos passos:')
    console.log(`   1. Editar src/ e implementar componente`)
    console.log(`   2. cd packages/components/${componentType}/${componentName}`)
    console.log('   3. npm install')
    console.log('   4. npm run build')
    console.log('   5. npm publish --registry http://localhost:4873\n')
}

function capitalize(str: string): string {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
}

setupComponent().catch(error => {
    console.error('❌ Erro:', error)
    process.exit(1)
})
