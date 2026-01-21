#!/usr/bin/env tsx
/**
 * Component Validation Script
 * 
 * Valida que todos os componentes em packages/components/ têm:
 * - package.json correto
 * - tsconfig.json correto
 * - src/ com arquivos
 * - dist/ após build (warning se não tiver)
 */

import fs from 'fs'
import path from 'path'

const PACKAGES_ROOT = path.join(process.cwd(), 'packages', 'components')
const COMPONENT_TYPES = ['shadcn', 'igreen']

interface ValidationError {
    component: string
    type: 'missing_package_json' | 'missing_tsconfig' | 'missing_src' | 'invalid_package_json' | 'missing_dist'
    message: string
    severity: 'error' | 'warning'
}

const results: ValidationError[] = []

function validateComponent(type: string, componentName: string, componentPath: string) {
    const packageJsonPath = path.join(componentPath, 'package.json')
    const tsconfigPath = path.join(componentPath, 'tsconfig.json')
    const srcPath = path.join(componentPath, 'src')
    const distPath = path.join(componentPath, 'dist')

    // 1. Verificar package.json
    if (!fs.existsSync(packageJsonPath)) {
        results.push({
            component: `${type}/${componentName}`,
            type: 'missing_package_json',
            message: 'package.json não encontrado',
            severity: 'error'
        })
        return
    }

    // Validar conteúdo do package.json
    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

        if (!packageJson.name) {
            results.push({
                component: `${type}/${componentName}`,
                type: 'invalid_package_json',
                message: 'package.json sem campo "name"',
                severity: 'error'
            })
        }

        if (!packageJson.main || !packageJson.types) {
            results.push({
                component: `${type}/${componentName}`,
                type: 'invalid_package_json',
                message: 'package.json sem campos "main" ou "types"',
                severity: 'error'
            })
        }

        if (!packageJson.version) {
            results.push({
                component: `${type}/${componentName}`,
                type: 'invalid_package_json',
                message: 'package.json sem campo "version"',
                severity: 'error'
            })
        }
    } catch (e) {
        results.push({
            component: `${type}/${componentName}`,
            type: 'invalid_package_json',
            message: `package.json inválido: ${e}`,
            severity: 'error'
        })
    }

    // 2. Verificar tsconfig.json
    if (!fs.existsSync(tsconfigPath)) {
        results.push({
            component: `${type}/${componentName}`,
            type: 'missing_tsconfig',
            message: 'tsconfig.json não encontrado',
            severity: 'error'
        })
    }

    // 3. Verificar src/
    if (!fs.existsSync(srcPath)) {
        results.push({
            component: `${type}/${componentName}`,
            type: 'missing_src',
            message: 'Pasta src/ não encontrada',
            severity: 'error'
        })
    } else {
        // Verificar se tem arquivos
        const srcFiles = fs.readdirSync(srcPath).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))
        if (srcFiles.length === 0) {
            results.push({
                component: `${type}/${componentName}`,
                type: 'missing_src',
                message: 'Pasta src/ vazia (sem arquivos .ts/.tsx)',
                severity: 'error'
            })
        }
    }

    // 4. Verificar dist/ (warning, não erro)
    if (!fs.existsSync(distPath)) {
        results.push({
            component: `${type}/${componentName}`,
            type: 'missing_dist',
            message: 'Pasta dist/ não encontrada (rode npm run build)',
            severity: 'warning'
        })
    }
}

function validateAllComponents() {
    console.log('🔍 Validando componentes em packages/components/\n')

    if (!fs.existsSync(PACKAGES_ROOT)) {
        console.error('❌ Pasta packages/components/ não encontrada')
        process.exit(1)
    }

    let totalComponents = 0

    for (const type of COMPONENT_TYPES) {
        const typePath = path.join(PACKAGES_ROOT, type)

        if (!fs.existsSync(typePath)) {
            console.log(`⚠️  Pasta ${type}/ não encontrada, pulando...`)
            continue
        }

        const components = fs.readdirSync(typePath).filter(item => {
            const itemPath = path.join(typePath, item)
            return fs.statSync(itemPath).isDirectory()
        })

        console.log(`📦 ${type}/: ${components.length} componentes`)

        for (const component of components) {
            const componentPath = path.join(typePath, component)
            validateComponent(type, component, componentPath)
            totalComponents++
        }
    }

    // Relatório
    console.log('\n' + '='.repeat(50))
    console.log('📊 Validation Report')
    console.log('='.repeat(50))

    const errors = results.filter(r => r.severity === 'error')
    const warnings = results.filter(r => r.severity === 'warning')

    console.log(`✅ Total de componentes: ${totalComponents}`)
    console.log(`❌ Erros: ${errors.length}`)
    console.log(`⚠️  Warnings: ${warnings.length}`)
    console.log('='.repeat(50) + '\n')

    if (warnings.length > 0) {
        console.log('⚠️  Warnings:')
        warnings.forEach(w => {
            console.log(`   - [${w.component}] ${w.message}`)
        })
        console.log('')
    }

    if (errors.length > 0) {
        console.log('❌ Erros encontrados:')
        errors.forEach(e => {
            console.log(`   - [${e.component}] ${e.message}`)
        })
        console.log('\n💡 Dica: Verifique a estrutura dos pacotes em packages/components/\n')
        process.exit(1)
    }

    console.log('✅ Todos os componentes validados com sucesso!\n')
    process.exit(0)
}

validateAllComponents()
