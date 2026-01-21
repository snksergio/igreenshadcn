#!/usr/bin/env tsx
/**
 * Token Validation Script
 * 
 * Valida Design System Tokens em packages/themes/src/
 * 
 * Regras:
 * 1. Tokens semânticos devem referenciar primitivos existentes
 * 2. Nenhum token órfão (warning)
 * 3. Verificar se dark mode está definido
 */

import fs from 'fs'
import path from 'path'

const THEMES_ROOT = path.join(process.cwd(), 'packages', 'themes', 'src')
const THEME_NAMES = ['igreen', 'solarorange']

// Regex para encontrar definições de variáveis CSS: --name: value;
const REGEX_DEF = /--([
\w -]+) \s *:/g
// Regex para encontrar usos de variáveis CSS: var(--name)
const REGEX_USE = /var\(--([
\w -]+) \)/g

interface ThemeData {
  name: string
  definitions: Set<string>
  usages: Set<string>
  files: string[]
  darkModeTokens: Set<string>
}

function scanTheme(themePath: string, themeName: string): ThemeData {
  const data: ThemeData = {
    name: themeName,
    definitions: new Set(),
    usages: new Set(),
    files: [],
    darkModeTokens: new Set()
  }

  if (!fs.existsSync(themePath)) {
    return data
  }

  // Scanear subpastas (primitives, semantic, effects, etc)
  const scanDir = (dir: string) => {
    if (!fs.existsSync(dir)) return

    const items = fs.readdirSync(dir)

    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory()) {
        scanDir(itemPath)
      } else if (item.endsWith('.css')) {
        const content = fs.readFileSync(itemPath, 'utf-8')
        data.files.push(path.relative(themePath, itemPath))

        // Encontrar definições
        let match
        const defRegex = new RegExp(REGEX_DEF.source, 'g')
        while ((match = defRegex.exec(content)) !== null) {
          data.definitions.add(match[1])
        }

        // Encontrar usos
        const useRegex = new RegExp(REGEX_USE.source, 'g')
        while ((match = useRegex.exec(content)) !== null) {
          data.usages.add(match[1])
        }

        // Verificar tokens dark mode
        if (content.includes('.dark')) {
          const darkRegex = new RegExp(REGEX_DEF.source, 'g')
          const darkSection = content.split('.dark')[1] || ''
          while ((match = darkRegex.exec(darkSection)) !== null) {
            data.darkModeTokens.add(match[1])
          }
        }
      }
    }
  }

  scanDir(themePath)
  return data
}

function validateTokens() {
  console.log('🔍 Validando tokens em packages/themes/src/\n')

  if (!fs.existsSync(THEMES_ROOT)) {
    console.error('❌ Pasta packages/themes/src/ não encontrada')
    process.exit(1)
  }

  const themesData: ThemeData[] = []
  let totalErrors = 0
  let totalWarnings = 0

  // Scanear cada tema
  for (const themeName of THEME_NAMES) {
    const themePath = path.join(THEMES_ROOT, themeName)

    if (!fs.existsSync(themePath)) {
      console.log(`⚠️  Tema ${themeName}/ não encontrado, pulando...`)
      continue
    }

    console.log(`📦 Scaneando tema: ${themeName}`)
    const data = scanTheme(themePath, themeName)
    themesData.push(data)

    console.log(`   - ${data.definitions.size} tokens definidos`)
    console.log(`   - ${data.usages.size} tokens usados`)
    console.log(`   - ${data.darkModeTokens.size} tokens com dark mode`)
    console.log(`   - ${data.files.length} arquivos CSS\n`)
  }

  console.log('='.repeat(50))
  console.log('📊 Validação de Integridade')
  console.log('='.repeat(50) + '\n')

  for (const theme of themesData) {
    console.log(`🎨 Tema: ${theme.name}`)

    // Verificar links quebrados
    const brokenLinks: string[] = []
    theme.usages.forEach(token => {
      // Ignorar variáveis do Tailwind
      if (token.startsWith('tw-') || token.startsWith('font-') || token.startsWith('radius-')) {
        return
      }

      // Verificar se token existe
      if (!theme.definitions.has(token)) {
        brokenLinks.push(token)
        totalErrors++
      }
    })

    if (brokenLinks.length > 0) {
      console.log(`   ❌ ${brokenLinks.length} links quebrados:`)
      brokenLinks.slice(0, 5).forEach(token => {
        console.log(`      - --${token}`)
      })
      if (brokenLinks.length > 5) {
        console.log(`      ... e mais ${brokenLinks.length - 5}`)
      }
    } else {
      console.log(`   ✅ Nenhum link quebrado`)
    }

    // Verificar tokens órfãos (definidos mas não usados)
    const orphans: string[] = []
    theme.definitions.forEach(token => {
      // Primitivos geralmente não são usados diretamente, então não contar como órfãos
      if (token.includes('-50') || token.includes('-100') || token.includes('-200') ||
        token.includes('-300') || token.includes('-400') || token.includes('-500') ||
        token.includes('-600') || token.includes('-700') || token.includes('-800') ||
        token.includes('-900')) {
        return // Skip primitives scale tokens
      }

      if (!theme.usages.has(token)) {
        orphans.push(token)
      }
    })

    if (orphans.length > 0) {
      console.log(`   ⚠️  ${orphans.length} tokens potencialmente órfãos (não usados)`)
      totalWarnings += orphans.length
    }

    // Verificar tokens semânticos sem dark mode
    const semanticWithoutDark: string[] = []
    theme.definitions.forEach(token => {
      // Apenas verificar tokens semânticos (bg, fg, border, etc)
      if (token.startsWith('bg-') || token.startsWith('fg-') ||
        token.startsWith('border-') || token.startsWith('ring-')) {
        if (!theme.darkModeTokens.has(token)) {
          semanticWithoutDark.push(token)
          totalWarnings++
        }
      }
    })

    if (semanticWithoutDark.length > 0) {
      console.log(`   ⚠️  ${semanticWithoutDark.length} tokens semânticos sem dark mode`)
    }

    console.log('')
  }

  // Resumo final
  console.log('='.repeat(50))
  console.log('📊 Resultado Final')
  console.log('='.repeat(50))
  console.log(`❌ Erros: ${totalErrors}`)
  console.log(`⚠️  Warnings: ${totalWarnings}`)
  console.log('='.repeat(50) + '\n')

  if (totalErrors > 0) {
    console.error(`🚫 Validação FALHOU com ${totalErrors} erros.\n`)
    process.exit(1)
  } else {
    console.log(`✅ Validação PASSOU! Integridade do sistema: 100%\n`)
    process.exit(0)
  }
}

validateTokens()
