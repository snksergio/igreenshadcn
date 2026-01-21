#!/usr/bin/env tsx
/**
 * Version Component Script
 * 
 * Atualiza versão de componente (semver)
 * Modifica package.json do componente
 * 
 * Uso: npm run version-component <nome> <tipo>
 * Tipos: patch | minor | major
 * Exemplo: npm run version-component badge patch
 */

import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)

if (args.length < 2) {
    console.error('❌ Uso: npm run version-component <nome> <tipo>')
    console.error('   Tipos: patch | minor | major')
    console.error('   Exemplo: npm run version-component badge patch')
    process.exit(1)
}

const [componentName, versionType] = args

if (!['patch', 'minor', 'major'].includes(versionType)) {
    console.error('❌ Tipo de versão inválido')
    console.error('   Use: patch, minor ou major')
    process.exit(1)
}

const PROJECT_ROOT = process.cwd()

async function versionComponent() {
    console.log(`📦 Versionando: @igreen/${componentName}\n`)

    // Encontrar componente
    let componentPath: string | null = null

    for (const type of ['shadcn', 'igreen']) {
        const testPath = path.join(PROJECT_ROOT, 'packages', 'components', type, componentName)
        if (fs.existsSync(testPath)) {
            componentPath = testPath
            break
        }
    }

    if (!componentPath) {
        console.error(`❌ Componente não encontrado: ${componentName}`)
        console.error('   Procurado em: packages/components/{shadcn,igreen}/')
        process.exit(1)
    }

    const packageJsonPath = path.join(componentPath, 'package.json')

    if (!fs.existsSync(packageJsonPath)) {
        console.error(`❌ package.json não encontrado em: ${componentPath}`)
        process.exit(1)
    }

    // Ler package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    const currentVersion = packageJson.version

    if (!currentVersion) {
        console.error('❌ Versão não encontrada no package.json')
        process.exit(1)
    }

    // Parse versão atual
    const [major, minor, patch] = currentVersion.split('.').map(Number)

    // Calcular nova versão
    let newVersion: string
    switch (versionType) {
        case 'patch':
            newVersion = `${major}.${minor}.${patch + 1}`
            break
        case 'minor':
            newVersion = `${major}.${minor + 1}.0`
            break
        case 'major':
            newVersion = `${major + 1}.0.0`
            break
        default:
            throw new Error('Invalid version type')
    }

    // Atualizar package.json
    packageJson.version = newVersion
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')

    console.log(`📊 Versão atualizada:`)
    console.log(`   ${currentVersion} → ${newVersion}`)
    console.log(`   Tipo: ${versionType}`)
    console.log(`\n✅ package.json atualizado: ${packageJsonPath}`)

    console.log('\n📝 Próximos passos:')
    console.log('   1. Revisar mudanças')
    console.log('   2. npm run build (se necessário)')
    console.log('   3. npm run publish-component ' + componentName)
    console.log('   4. git commit -m "chore: bump ' + componentName + ' to v' + newVersion + '"')
    console.log('')
}

versionComponent().catch(error => {
    console.error('❌ Erro:', error)
    process.exit(1)
})
