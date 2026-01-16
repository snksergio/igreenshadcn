# Script para corrigir versões de Radix UI em todos os pacotes
$packages = @("checkbox", "input", "label", "mode-toggle")

foreach ($package in $packages) {
    $file = "packages/components/$package/package.json"
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Trocar ^1.2.4 por *
        $content = $content -replace '"\^1\.2\.4"', '"*"'
        Set-Content $file $content
        Write-Host "✅ Corrigido: $package"
    }
}

Write-Host "`n🎉 Todas as versões corrigidas!"
