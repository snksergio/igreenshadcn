
import fs from "fs";
import path from "path";

const REGISTRY_PATH = path.join(process.cwd(), "public/registry");
const COMPONENTS_UI_PATH = path.join(process.cwd(), "components/ui");
const COMPONENTS_SYSTEM_PATH = path.join(process.cwd(), "components/system");

// Ensure directories exist
if (!fs.existsSync(path.join(REGISTRY_PATH, "components"))) {
    fs.mkdirSync(path.join(REGISTRY_PATH, "components"), { recursive: true });
}

type RegistryItem = {
    $schema?: string;
    name: string;
    type: "registry:ui" | "registry:block" | "registry:component";
    dependencies?: string[];
    registryDependencies?: string[];
    files: Array<{
        path: string;
        content: string;
        type: "registry:ui" | "registry:block" | "registry:component";
        target: string; // Explicit target path in consumer project
    }>;
};

// Helper: Extract registry dependencies (imports from @/components/ui/...)
function extractRegistryDependencies(content: string): string[] {
    const regex = /from\s+['"]@\/components\/ui\/([^'"]+)['"]/g;
    const matches = [...content.matchAll(regex)];
    // Unique matches, removing extensions if present (usually imports don't have sensitive extensions, but good to clean)
    return [...new Set(matches.map((m) => m[1].replace(/\.tsx?$/, "")))];
}

// Helper: Extract npm dependencies (imports from non-relative, non-alias)
// This is a naive regex, might need refinement for complex cases but covers basics
function extractNpmDependencies(content: string): string[] {
    const regex = /from\s+['"]([^.@][^/'"]+)['"]/g; // Starts with char, not . or @ (unless scoped, handled separately?)
    // Actually, handling scoped @radix-ui is important.
    // Better regex: from ["'](@[\w-]+\/[\w-]+|[\w-]+)["']
    const importRegex = /from\s+['"]((?!@\/|\.|\/)[^'"]+)['"]/g;
    const matches = [...content.matchAll(importRegex)];
    const deps = matches.map(m => {
        const pkg = m[1];
        // Handle subpaths (e.g. lucide-react/icons) -> just lucide-react
        if (pkg.startsWith("@")) {
            const parts = pkg.split("/");
            return `${parts[0]}/${parts[1]}`;
        }
        return pkg.split("/")[0];
    });
    // Filter out react, etc? Usually registry keeps them. But let's keep all for now.
    return [...new Set(deps.filter(d => d !== "react" && d !== "react-dom"))]; // Common guidelines exclude peerDeps
}

async function buildComponents() {
    const index: { name: string; type: string; files: string[] }[] = [];

    // 1. Process UI Components (Single File)
    if (fs.existsSync(COMPONENTS_UI_PATH)) {
        const files = fs.readdirSync(COMPONENTS_UI_PATH).filter((f) => f.endsWith(".tsx"));

        for (const file of files) {
            const name = file.replace(".tsx", "");
            const content = fs.readFileSync(path.join(COMPONENTS_UI_PATH, file), "utf-8");

            const item: RegistryItem = {
                $schema: "https://ui.shadcn.com/schema/registry-item.json",
                name,
                type: "registry:ui",
                dependencies: extractNpmDependencies(content),
                registryDependencies: extractRegistryDependencies(content),
                files: [
                    {
                        path: `components/ui/${file}`,
                        content,
                        type: "registry:ui",
                        target: `components/ui/${file}`
                    }
                ]
            };

            const jsonPath = path.join(REGISTRY_PATH, "components", `${name}.json`);
            fs.writeFileSync(jsonPath, JSON.stringify(item, null, 4));
            console.log(`✅ UI Component: ${name}`);

            index.push({
                name,
                type: "registry:ui",
                files: [`public/registry/components/${name}.json`]
            });
        }
    }

    // 2. Process System Components (Directories)
    if (fs.existsSync(COMPONENTS_SYSTEM_PATH)) {
        const dirs = fs.readdirSync(COMPONENTS_SYSTEM_PATH).filter((f) => {
            return fs.statSync(path.join(COMPONENTS_SYSTEM_PATH, f)).isDirectory();
        });

        for (const dir of dirs) {
            const dirPath = path.join(COMPONENTS_SYSTEM_PATH, dir);
            const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".ts") || f.endsWith(".tsx"));

            const registryFiles = [];
            let allContent = "";

            for (const file of files) {
                const content = fs.readFileSync(path.join(dirPath, file), "utf-8");
                allContent += content; // Aggregate for dependency search
                registryFiles.push({
                    path: `components/system/${dir}/${file}`,
                    content,
                    type: "registry:component",
                    target: `components/system/${dir}/${file}` // Explicit target path
                });
            }

            const item: RegistryItem = {
                $schema: "https://ui.shadcn.com/schema/registry-item.json",
                name: dir,
                type: "registry:block", // Changed to block to preserve folder structure
                dependencies: extractNpmDependencies(allContent),
                registryDependencies: extractRegistryDependencies(allContent),
                files: registryFiles as any
            };

            const jsonPath = path.join(REGISTRY_PATH, "components", `${dir}.json`);
            fs.writeFileSync(jsonPath, JSON.stringify(item, null, 4));
            console.log(`📦 System Component: ${dir}`);

            index.push({
                name: dir,
                type: "registry:block",
                files: [`public/registry/components/${dir}.json`]
            });
        }
    }

    // 3. Update Index with proper registry schema
    // Read homepage from config or use default
    let homepage = "http://localhost:3000";
    const configPath = path.join(process.cwd(), "igreen.config.json");
    if (fs.existsSync(configPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
            const env = process.env.IGREEN_ENV || config.defaultEnvironment || "dev";
            homepage = config.registry?.[env] || homepage;
        } catch (e) {
            // Use default
        }
    }

    const registryIndex = {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: "igreen",
        homepage,
        items: index
    };
    fs.writeFileSync(path.join(REGISTRY_PATH, "index.json"), JSON.stringify(registryIndex, null, 4));
    console.log(`\n🎉 Generated registry index with ${index.length} items (homepage: ${homepage}).`);
}

buildComponents().catch(console.error);
