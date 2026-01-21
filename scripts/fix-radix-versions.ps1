# Script para corrigir versões de Radix UI em todos os pacotes
# Atualizado para nova estrutura: packages/components/shadcn/

$shadcnPath = "packages/components/shadcn"

if (Test-Path $shadcnPath) {
    $components = Get-ChildItem -Path $shadcnPath -Directory
    
    foreach ($component in $components) {
        $file = "$shadcnPath/$($component.Name)/package.json"
        
        if (Test-Path $file) {
            $content = Get-Content $file -Raw
            
            # Trocar ^1.2.4 por * (permite qualquer versão)
            $content = $content -replace '"(\^|~)?1\.2\.4"', '"*"'
            
            Set-Content $file $content
            Write-Host "✅ Corrigido: $($component.Name)"
        }
    }
    
    Write-Host "`n🎉 Todas as versões do Radix UI corrigidas!"
} else {
    Write-Host "❌ Pasta packages/components/shadcn/ não encontrada"
}
