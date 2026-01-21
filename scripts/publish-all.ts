#!/usr/bin/env tsx
/**
 * Publish All Packages Script
 * 
 * Publica TODOS os pacotes do monorepo
 * Inclui themes, utils, components
 * Faz build de tudo antes
 * 
 * Uso: npm run publish:all
 * Flags: --dry-run (simula sem publicar)
 *        --filter <pattern> (publica apenas pacotes que matched pattern)
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const filterIndex = args.indexOf('--filter')
const filterPattern = filterIndex >= 0 ? args[filterIndex + 1] : null

const PROJECT_ROOT = process.cwd()

interface PackageInfo {
    path: string
    name: string
    version: string
    type: string
}

async function publishAll() {
    console.log('📦 Publicando todos os pacotes do monorepo\n')

    if (dryRun) {
        console.log('⚠️  DRY RUN MODE - Nada será publicado\n')
    }

    // Coletar todos os pacotes
    const packages: PackageInfo[] = []

    // 1. Pacotes raiz (themes, utils, design-system)
    const rootPackages = ['themes', 'utils', 'design-system', 'cli']
    for (const pkg of rootPackages) {
        const pkgPath = path.join(PROJECT_ROOT, 'packages', pkg)
        if (fs.existsSync(pkgPath)) {
            const pkgJsonPath = path.join(pkgPath, 'package.json')
            if (fs.existsSync(pkgJsonPath)) {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
                packages.push({
                    path: pkgPath,
                    name: pkgJson.name,
                    version: pkgJson.version,
                    type: pkg,
                })
            }
        }
    }

    // 2. Componentes shadcn
    const shadcnPath = path.join(PROJECT_ROOT, 'packages', 'components', 'shadcn')
    if (fs.existsSync(shadcnPath)) {
        const shadcnComponents = fs.readdirSync(shadcnPath).filter(item => {
            const itemPath = path.join(shadcnPath, item)
            return fs.statSync(itemPath).isDirectory()
        })

        for (const component of shadcnComponents) {
            const componentPath = path.join(shadcnPath, component)
            const pkgJsonPath = path.join(componentPath, 'package.json')
            if (fs.existsSync(pkgJsonPath)) {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
                packages.push({
                    path: componentPath,
                    name: pkgJson.name,
                    version: pkgJson.version,
                    type: 'shadcn',
                })
            }
        }
    }

    // 3. Componentes igreen
    const igreenPath = path.join(PROJECT_ROOT, 'packages', 'components', 'igreen')
    if (fs.existsSync(igreenPath)) {
        const igreenComponents = fs.readdirSync(igreenPath).filter(item => {
            const itemPath = path.join(igreenPath, item)
            return fs.statSync(itemPath).isDirectory()
        })

        for (const component of igreenComponents) {
            const componentPath = path.join(igreenPath, component)
            const pkgJsonPath = path.join(componentPath, 'package.json')
            if (fs.existsSync(pkgJsonPath)) {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
                packages.push({
                    path: componentPath,
                    name: pkgJson.name,
                    version: pkgJson.version,
                    type: 'igreen',
                })
            }
        }
    }

    // Filtrar por pattern (se especificado)
    let packagesToPublish = packages
    if (filterPattern) {
        packagesToPublish = packages.filter(
            pkg => pkg.name.includes(filterPattern) || pkg.type.includes(filterPattern)
        )
        console.log(`🔍 Filtrando por: "${filterPattern}"`)
        console.log(`   Pacotes encontrados: ${packagesToPublish.length}\n`)
    }

    console.log(`📋 Total de pacotes: ${packagesToPublish.length}\n`)

    // Publicar cada pacote
    const results: { name: string; success: boolean; error?: string }[] = []
    const startTime = Date.now()

    for (let i = 0; i < packagesToPublish.length; i++) {
        const pkg = packagesToPublish[i]
        console.log(`[${i + 1}/${packagesToPublish.length}] ${pkg.name}@${pkg.version}`)

        try {
            // Build
            if (!dryRun) {
                execSync('npm run build', {
                    cwd: pkg.path,
                    stdio: 'pipe',
                })
            }

            // Publish (usa o registry definido no package.json publishConfig)
            if (!dryRun) {
                execSync('npm publish', {
                    cwd: pkg.path,
                    stdio: 'pipe',
                })
            }

            console.log(`   ✅ ${dryRun ? 'Would publish' : 'Published'}\n`)
            results.push({ name: pkg.name, success: true })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error)
            console.log(`   ❌ Failed`)
            console.log(`      ${errorMessage.split('\n')[0]}\n`)
            results.push({ name: pkg.name, success: false, error: errorMessage })
        }
    }

    // Relatório final
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    console.log('\n' + '='.repeat(50))
    console.log('📊 Publish Report')
    console.log('='.repeat(50))
    console.log(`✅ Successful: ${successful}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`⏱️  Duration: ${duration}s`)
    console.log('='.repeat(50) + '\n')

    if (failed > 0) {
        console.log('❌ Failed packages:')
        results
            .filter(r => !r.success)
            .forEach(r => {
                console.log(`   - ${r.name}`)
            })
        console.log('')
        process.exit(1)
    }

    if (dryRun) {
        console.log('💡 Dry run completo. Execute sem --dry-run para publicar.\n')
    } else {
        console.log('🎉 Todos os pacotes publicados com sucesso!\n')
    }
}

publishAll().catch(error => {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
})
