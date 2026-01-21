#!/usr/bin/env tsx
/**
 * Publish Component Script
 * 
 * Publica componente individual no Verdaccio
 * Faz build automaticamente antes de publicar
 * 
 * Uso: npm run publish-component <nome>
 * Exemplo: npm run publish-component badge
 * Flags: --skip-build (não fazer build)
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const args = process.argv.slice(2)
const skipBuild = args.includes('--skip-build')
const componentName = args.filter(arg => !arg.startsWith('--'))[0]

if (!componentName) {
    console.error('❌ Uso: npm run publish-component <nome>')
    console.error('   Exemplo: npm run publish-component badge')
    console.error('   Flags: --skip-build')
    process.exit(1)
}

const PROJECT_ROOT = process.cwd()

async function publishComponent() {
    console.log(`📦 Publicando: @igreen/${componentName}\n`)

    // Encontrar componente
    let componentPath: string | null = null
    let componentType: string | null = null

    for (const type of ['shadcn', 'igreen']) {
        const testPath = path.join(PROJECT_ROOT, 'packages', 'components', type, componentName)
        if (fs.existsSync(testPath)) {
            componentPath = testPath
            componentType = type
            break
        }
    }

    // Verificar também em packages/ raiz (themes, utils, etc)
    if (!componentPath) {
        const testPath = path.join(PROJECT_ROOT, 'packages', componentName)
        if (fs.existsSync(testPath)) {
            componentPath = testPath
            componentType = 'package'
        }
    }

    if (!componentPath) {
        console.error(`❌ Componente não encontrado: ${componentName}`)
        console.error('   Procurado em:')
        console.error('   - packages/components/{shadcn,igreen}/')
        console.error('   - packages/')
        process.exit(1)
    }

    console.log(`📁 Encontrado: ${componentPath}`)

    const packageJsonPath = path.join(componentPath, 'package.json')
    if (!fs.existsSync(packageJsonPath)) {
        console.error(`❌ package.json não encontrado`)
        process.exit(1)
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    const packageName = packageJson.name
    const packageVersion = packageJson.version

    console.log(`📦 Pacote: ${packageName}@${packageVersion}\n`)

    // Build (se não skipado)
    if (!skipBuild) {
        console.log('🔨 Building...')
        try {
            execSync('npm run build', {
                cwd: componentPath,
                stdio: 'inherit',
            })
            console.log('✅ Build successful\n')
        } catch (error) {
            console.error('❌ Build failed')
            process.exit(1)
        }
    } else {
        console.log('⚠️  Pulando build (--skip-build)\n')
    }

    // Verificar se dist existe
    const distPath = path.join(componentPath, 'dist')
    if (!fs.existsSync(distPath)) {
        console.error('❌ Pasta dist/ não encontrada')
        console.error('   Execute npm run build primeiro')
        process.exit(1)
    }

    // Publicar
    console.log('📤 Publicando no Verdaccio...')
    try {
        execSync('npm publish --registry http://localhost:4873', {
            cwd: componentPath,
            stdio: 'inherit',
        })

        console.log(`\n✅ Publicado com sucesso!`)
        console.log(`📦 ${packageName}@${packageVersion}`)
        console.log(`🔗 http://localhost:4873`)

        console.log('\n📝 Verificar:')
        console.log(`   npm info ${packageName} --registry http://localhost:4873`)
        console.log('')
    } catch (error) {
        console.error('\n❌ Falha ao publicar')
        console.error('   Verifique se Verdaccio está rodando:')
        console.error('   npm run registry:start')
        process.exit(1)
    }
}

publishComponent().catch(error => {
    console.error('❌ Erro:', error)
    process.exit(1)
})
