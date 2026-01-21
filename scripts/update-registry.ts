#!/usr/bin/env tsx
/**
 * Update Registry Script
 * 
 * Atualiza todos os package.json de Verdaccio local para NPM público
 * 
 * Uso: npm run update-registry
 */

import fs from 'fs'
import path from 'path'

const PROJECT_ROOT = process.cwd()
const PACKAGES_ROOT = path.join(PROJECT_ROOT, 'packages')

let updatedCount = 0
let skippedCount = 0

function updatePackageJson(filePath: string, packageName: string) {
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

        if (content.publishConfig && content.publishConfig.registry) {
            const oldRegistry = content.publishConfig.registry

            if (oldRegistry === 'https://registry.npmjs.org') {
                console.log(`   ⏭️  ${packageName} (já está configurado)`)
                skippedCount++
                return
            }

            content.publishConfig.registry = 'https://registry.npmjs.org'
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n')
            console.log(`   ✅ ${packageName}`)
            updatedCount++
        } else {
            console.log(`   ⚠️  ${packageName} (sem publishConfig)`)
            skippedCount++
        }
    } catch (error) {
        console.error(`   ❌ ${packageName}: ${error}`)
    }
}

console.log('🔄 Atualizando registries para NPM público...\n')

// 1. Atualizar pacotes raiz
console.log('📦 Pacotes principais:')
const rootPackages = ['themes', 'utils', 'cli', 'design-system']
rootPackages.forEach(pkg => {
    const pkgPath = path.join(PACKAGES_ROOT, pkg, 'package.json')
    if (fs.existsSync(pkgPath)) {
        updatePackageJson(pkgPath, `@igreen/${pkg}`)
    }
})

// 2. Atualizar componentes shadcn
console.log('\n📦 Componentes Shadcn:')
const shadcnPath = path.join(PACKAGES_ROOT, 'components', 'shadcn')
if (fs.existsSync(shadcnPath)) {
    const components = fs.readdirSync(shadcnPath).filter(item => {
        const itemPath = path.join(shadcnPath, item)
        return fs.statSync(itemPath).isDirectory()
    })

    components.forEach(component => {
        const pkgPath = path.join(shadcnPath, component, 'package.json')
        if (fs.existsSync(pkgPath)) {
            updatePackageJson(pkgPath, `@igreen/${component}`)
        }
    })
}

// 3. Atualizar componentes igreen
console.log('\n📦 Componentes iGreen:')
const igreenPath = path.join(PACKAGES_ROOT, 'components', 'igreen')
if (fs.existsSync(igreenPath)) {
    const components = fs.readdirSync(igreenPath).filter(item => {
        const itemPath = path.join(igreenPath, item)
        return fs.statSync(itemPath).isDirectory()
    })

    components.forEach(component => {
        const pkgPath = path.join(igreenPath, component, 'package.json')
        if (fs.existsSync(pkgPath)) {
            updatePackageJson(pkgPath, `@igreen/${component}`)
        }
    })
}

// Resumo
console.log('\n' + '='.repeat(50))
console.log('📊 Resumo')
console.log('='.repeat(50))
console.log(`✅ Atualizados: ${updatedCount}`)
console.log(`⏭️  Já configurados: ${skippedCount}`)
console.log('='.repeat(50))

if (updatedCount > 0) {
    console.log('\n✅ Registry atualizado para: https://registry.npmjs.org')
    console.log('\n📝 Próximos passos:')
    console.log('   1. npm login')
    console.log('   2. npm run publish:all')
    console.log('')
} else {
    console.log('\n✅ Todos os pacotes já estão configurados!\n')
}
