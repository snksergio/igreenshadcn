/**
 * Component Validation Script
 * 
 * Validates that all components in components/ui and components/system
 * have corresponding registry JSON files with correct schema.
 */

import fs from 'fs';
import path from 'path';

const COMPONENTS_UI_PATH = path.join(process.cwd(), 'components/ui');
const COMPONENTS_SYSTEM_PATH = path.join(process.cwd(), 'components/system');
const REGISTRY_PATH = path.join(process.cwd(), 'public/registry/components');

interface ValidationError {
    component: string;
    type: 'missing_json' | 'missing_schema' | 'missing_target' | 'stale_content';
    message: string;
}

const errors: ValidationError[] = [];
const warnings: string[] = [];

function validateUIComponents() {
    if (!fs.existsSync(COMPONENTS_UI_PATH)) {
        console.log('⚠️  Pasta components/ui não encontrada');
        return;
    }

    const files = fs.readdirSync(COMPONENTS_UI_PATH).filter(f => f.endsWith('.tsx'));

    for (const file of files) {
        const name = file.replace('.tsx', '');
        const jsonPath = path.join(REGISTRY_PATH, `${name}.json`);

        // Check if JSON exists
        if (!fs.existsSync(jsonPath)) {
            errors.push({
                component: name,
                type: 'missing_json',
                message: `Registry JSON não encontrado para ${name}`
            });
            continue;
        }

        // Validate JSON structure
        try {
            const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

            if (!json.$schema) {
                errors.push({
                    component: name,
                    type: 'missing_schema',
                    message: `${name}.json sem $schema`
                });
            }

            if (!json.files?.[0]?.target) {
                errors.push({
                    component: name,
                    type: 'missing_target',
                    message: `${name}.json sem target nos arquivos`
                });
            }

            // Check if content is up to date
            const sourceContent = fs.readFileSync(path.join(COMPONENTS_UI_PATH, file), 'utf-8');
            const jsonContent = json.files?.[0]?.content || '';

            if (sourceContent.trim() !== jsonContent.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n')) {
                warnings.push(`${name}: Conteúdo pode estar desatualizado (rode build:components)`);
            }
        } catch (e) {
            errors.push({
                component: name,
                type: 'missing_json',
                message: `Erro ao ler ${name}.json: ${e}`
            });
        }
    }
}

function validateSystemComponents() {
    if (!fs.existsSync(COMPONENTS_SYSTEM_PATH)) {
        console.log('⚠️  Pasta components/system não encontrada');
        return;
    }

    const dirs = fs.readdirSync(COMPONENTS_SYSTEM_PATH).filter(f =>
        fs.statSync(path.join(COMPONENTS_SYSTEM_PATH, f)).isDirectory()
    );

    for (const dir of dirs) {
        const jsonPath = path.join(REGISTRY_PATH, `${dir}.json`);

        if (!fs.existsSync(jsonPath)) {
            errors.push({
                component: dir,
                type: 'missing_json',
                message: `Registry JSON não encontrado para ${dir}`
            });
            continue;
        }

        try {
            const json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

            if (!json.$schema) {
                errors.push({
                    component: dir,
                    type: 'missing_schema',
                    message: `${dir}.json sem $schema`
                });
            }

            // Check all files have targets
            for (const file of json.files || []) {
                if (!file.target) {
                    errors.push({
                        component: dir,
                        type: 'missing_target',
                        message: `${dir}.json: arquivo ${file.path} sem target`
                    });
                }
            }
        } catch (e) {
            errors.push({
                component: dir,
                type: 'missing_json',
                message: `Erro ao ler ${dir}.json: ${e}`
            });
        }
    }
}

// Run validation
console.log('\n🔍 Validando componentes...\n');

validateUIComponents();
validateSystemComponents();

// Report results
if (warnings.length > 0) {
    console.log('⚠️  Avisos:');
    warnings.forEach(w => console.log(`   - ${w}`));
    console.log('');
}

if (errors.length > 0) {
    console.log('❌ Erros encontrados:');
    errors.forEach(e => console.log(`   - [${e.type}] ${e.message}`));
    console.log(`\n💡 Dica: Rode "npm run build:components" para regenerar o registry.\n`);
    process.exit(1);
} else {
    console.log('✅ Todos os componentes validados com sucesso!\n');
    process.exit(0);
}
