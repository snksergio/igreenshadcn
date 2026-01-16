
import fs from 'fs';
import path from 'path';

/**
 * Validates Design System Tokens
 * 
 * Rules:
 * 1. Semantic tokens must reference existing Primitives
 * 2. Bridge tokens must reference existing Semantic tokens
 * 3. No orphan primitives (warning)
 */

const THEME_DIR = path.join(process.cwd(), 'theme');

// Paths
const PATHS = {
  primitives: path.join(THEME_DIR, 'primitives'),
  semantic: path.join(THEME_DIR, 'semantic'),
  bridge: path.join(THEME_DIR, 'bridge'),
};

// Regex to find CSS variable definitions: --name: value;
const REGEX_DEF = /--([\w-]+)\s*:/g;
// Regex to find CSS variable usages: var(--name)
const REGEX_USE = /var\(--([\w-]+)\)/g;

function scanDir(dir: string): { definitions: Set<string>, usages: Set<string>, files: string[] } {
  const definitions = new Set<string>();
  const usages = new Set<string>();
  const fileList: string[] = [];

  if (!fs.existsSync(dir)) return { definitions, usages, files: [] };

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    if (!file.endsWith('.css')) return;
    
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    fileList.push(file);

    // Find definitions
    let match;
    while ((match = REGEX_DEF.exec(content)) !== null) {
      definitions.add(match[1]);
    }

    // Find usages
    while ((match = REGEX_USE.exec(content)) !== null) {
      usages.add(match[1]);
    }
  });

  return { definitions, usages, files: fileList };
}

function runValidation() {
  console.log('🔍 Validating iGreen Design System Tokens...\n');

  // 1. Scan Primitives
  const primData = scanDir(PATHS.primitives);
  console.log(`🟢 Primitives: Found ${primData.definitions.size} definitions in ${primData.files.length} files.`);

  // 2. Scan Semantic
  const semData = scanDir(PATHS.semantic);
  console.log(`🔵 Semantic: Found ${semData.definitions.size} definitions in ${semData.files.length} files.`);

  // 3. Scan Bridge
  const bridgeData = scanDir(PATHS.bridge);
  console.log(`🔴 Bridge: Found ${bridgeData.definitions.size} definitions in ${bridgeData.files.length} files.`);

  let errors = 0;

  console.log('\n--- Checking Dependency Integrity ---\n');

  // Check: Semantic -> Primitives
  semData.usages.forEach(token => {
    // Only check if it looks like a primitive (optional heuristic, or just check against all definitions)
    // For now, checks if it exists in Primitives OR Semantic (self-reference)
    if (!primData.definitions.has(token) && !semData.definitions.has(token)) {
        // Some semantic tokens might use other semantic tokens, which is valid.
        // But if it's missing from both, it's an error.
        
        // Exclude tailwind internal variables or known externals if any
        if (token.startsWith('tw-')) return; 

        console.error(`❌ [Broken Link] Semantic token uses unknown variable: --${token}`);
        errors++;
    }
  });

  // Check: Bridge -> Semantic (or Primitives)
  bridgeData.usages.forEach(token => {
     if (!semData.definitions.has(token) && !primData.definitions.has(token) && !bridgeData.definitions.has(token)) {
        console.error(`❌ [Broken Link] Bridge token uses unknown variable: --${token}`);
        errors++;
     }
  });

  console.log('\n--- Checking for Orphans (Warnings) ---\n');
  // Orphans: Primitives defined but never used in Semantic
  let orphans = 0;
  primData.definitions.forEach(token => {
    if (!semData.usages.has(token)) {
        // We don't fail on orphans, just warn
        // console.warn(`⚠️  [Orphan] Primitive defined but not used: --${token}`);
        orphans++;
    }
  });
  console.log(`⚠️  Found ${orphans} potential orphan primitives (defined but not referenced in semantic layer).`);

  if (errors > 0) {
    console.error(`\n🚫 Validation FAILED with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log(`\n✅ Validation PASSED! System integrity is 100%.`);
    process.exit(0);
  }
}

runValidation();
