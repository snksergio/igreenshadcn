#!/usr/bin/env tsx
/**
 * Build All Components Script
 * 
 * Faz build de todos os componentes em packages/components/
 * Scaneia recursivamente shadcn/ e igreen/
 * 
 * Uso: npm run build:all-components
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const COMPONENTS_ROOT = path.join(process.cwd(), 'packages', 'components')
const COMPONENT_TYPES = ['shadcn', 'igreen']

interface BuildResult {
    package: string
    success: boolean
    error?: string
}

async function buildAllComponents() {
    console.log('🔨 Building all components...\n')

    const results: BuildResult[] = []
    const startTime = Date.now()

    for (const type of COMPONENT_TYPES) {
        const typePath = path.join(COMPONENTS_ROOT, type)

        if (!fs.existsSync(typePath)) {
            console.log(`⚠️  Skipping ${type}/ (directory not found)\n`)
            continue
        }

        const components = fs.readdirSync(typePath).filter(item => {
            const itemPath = path.join(typePath, item)
            return fs.statSync(itemPath).isDirectory()
        })

        console.log(`📦 Found ${components.length} ${type} components\n`)

        for (const component of components) {
            const componentPath = path.join(typePath, component)
            const packageJsonPath = path.join(componentPath, 'package.json')

            // Verificar se é pacote válido
            if (!fs.existsSync(packageJsonPath)) {
                console.log(`⚠️  Skipping ${type}/${component} (no package.json)`)
                continue
            }

            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
            const packageName = packageJson.name

            try {
                console.log(`   Building ${packageName}...`)

                // Build
                execSync('npm run build', {
                    cwd: componentPath,
                    stdio: 'pipe',
                })

                console.log(`   ✅ ${packageName}\n`)

                results.push({
                    package: packageName,
                    success: true,
                })
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error)
                console.log(`   ❌ ${packageName}`)
                console.log(`      ${errorMessage}\n`)

                results.push({
                    package: packageName,
                    success: false,
                    error: errorMessage,
                })
            }
        }
    }

    // Relatório final
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    console.log('\n' + '='.repeat(50))
    console.log('📊 Build Report')
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
                console.log(`   - ${r.package}`)
                if (r.error) {
                    console.log(`     ${r.error.split('\n')[0]}`)
                }
            })
        console.log('')
        process.exit(1)
    }

    console.log('🎉 All components built successfully!\n')
}

buildAllComponents().catch(error => {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
})
