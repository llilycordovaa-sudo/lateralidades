# Script para limpiar badges repetitivos
$encoding = [System.Text.Encoding]::UTF8
$content = [System.IO.File]::ReadAllText("index.html", $encoding)

# Reemplazos
$content = $content.Replace("🎨 Mancha", "🎨")

# Guardar archivo
[System.IO.File]::WriteAllText("index.html", $content, $encoding)

Write-Host "Badges de Mancha actualizados exitosamente"