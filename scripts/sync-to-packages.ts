#!/usr/bin/env tsx
/**
 * Sync to Packages Script
 * 
 * Sincroniza componente de devcomponents/ → packages/components/
 * Detecta tipo automaticamente (shadcn ou igreen)
 * Atualiza imports locais para NPM packages
 * 
 * Uso: npm run sync <componente>
 * Exemplo: npm run sync badge
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const args = process.argv.slice(2)

if (args.length === 0) {
    console.error('❌ Uso: npm run sync <componente>')
    console.error('   Exemplo: npm run sync badge')
    process.exit(1)
}

const componentName = args[0]
const PROJECT_ROOT = process.cwd()
const DEV_COMPONENTS_ROOT = path.join(PROJECT_ROOT, 'devcomponents')

async function syncComponent() {
    console.log(`🔄 Sincronizando: ${componentName}\n`)

    //  Detectar tipo e caminho no devcomponents
    let componentType: 'shadcn' | 'igreen' | null = null
    let sourcePath: string | null = null

    // Verificar shadcn (arquivo único)
    const shadcnFilePath = path.join(DEV_COMPONENTS_ROOT, 'shadcn', `${componentName}.tsx`)
    if (fs.existsSync(shadcnFilePath)) {
        componentType = 'shadcn'
        sourcePath = shadcnFilePath
        console.log(`📁 Encontrado: devcomponents/shadcn/${componentName}.tsx`)
    }

    // Verificar igreen (pasta)
    const igreenDirPath = path.join(DEV_COMPONENTS_ROOT, 'igreen', componentName)
    if (fs.existsSync(igreenDirPath) && fs.statSync(igreenDirPath).isDirectory()) {
        componentType = 'igreen'
        sourcePath = igreenDirPath
        console.log(`📁 Encontrado: devcomponents/igreen/${componentName}/`)
    }

    if (!componentType || !sourcePath) {
        console.error(`❌ Componente não encontrado em devcomponents/`)
        console.error(`   Procurado em:`)
        console.error(`   - devcomponents/shadcn/${componentName}.tsx`)
        console.error(`   - devcomponents/igreen/${componentName}/`)
        process.exit(1)
    }

    // Caminho de destino
    const destPath = path.join(
        PROJECT_ROOT,
        'packages',
        'components',
        componentType,
        componentName
    )

    // Verificar se destino existe, senão criar
    const destSrcPath = path.join(destPath, 'src')
    if (!fs.existsSync(destSrcPath)) {
        console.log(`📦 Estrutura não existe, criando...`)
        try {
            execSync(`npm run setup-component ${componentName} ${componentType}`, {
                cwd: PROJECT_ROOT,
                stdio: 'inherit',
            })
        } catch (error) {
            console.error('❌ Erro ao criar estrutura')
            process.exit(1)
        }
    }

    console.log(`📦 Destino: packages/components/${componentType}/${componentName}/src/`)

    // Sincronizar arquivos
    if (componentType === 'shadcn') {
        // Arquivo único
        const destFilePath = path.join(destSrcPath, `${componentName}.tsx`)
        const content = fs.readFileSync(sourcePath, 'utf-8')

        // Atualizar imports
        const updatedContent = updateImports(content)

        fs.writeFileSync(destFilePath, updatedContent)
        console.log(`✅ Arquivo sincronizado: ${componentName}.tsx`)
    } else {
        // Pasta (múltiplos arquivos)
        const files = fs.readdirSync(sourcePath).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))

        for (const file of files) {
            const sourceFile = path.join(sourcePath, file)
            const destFile = path.join(destSrcPath, file)

            const content = fs.readFileSync(sourceFile, 'utf-8')
            const updatedContent = updateImports(content)

            fs.writeFileSync(destFile, updatedContent)
            console.log(`✅ Sincronizado: ${file}`)
        }
    }

    // Atualizar index.ts
    const indexPath = path.join(destSrcPath, 'index.ts')
    if (componentType === 'shadcn' && !fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, `export * from './${componentName}'\n`)
        console.log(`✅ index.ts criado`)
    } else if (componentType === 'igreen' && !fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, `export * from './component'\nexport type * from './types'\n`)
        console.log(`✅ index.ts criado`)
    }

    console.log('\n🎉 Sincronização concluída!')
    console.log('\n📝 Próximos passos:')
    console.log(`   1. cd packages/components/${componentType}/${componentName}`)
    console.log('   2. npm run build')
    console.log('   3. npm publish --registry http://localhost:4873\n')
}

function updateImports(content: string): string {
    let updated = content

    // Atualizar import de utils
    updated = updated.replace(
        /from ['"]@\/lib\/utils['"]/g,
        'from "@igreen/utils"'
    )

    // Atualizar import de components locais (se houver)
    updated = updated.replace(
        /from ['"]@\/devcomponents\/(shadcn|igreen)\/([^'"]+)['"]/g,
        'from "@igreen/$2"'
    )

    return updated
}

syncComponent().catch(error => {
    console.error('❌ Erro:', error)
    process.exit(1)
})
