# Script para iniciar todos os servidores backend simultaneamente

Write-Host "Iniciando todos os servidores..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Caminho base
$baseDir = "c:\Users\T-GAMER\OneDrive\Documentos\Estudos\SZN\BackEnd"

# Iniciar Login Service (porta 3000)
Write-Host "`nIniciando Login Service (porta 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\login_mysql'; npm start"

# Aguardar um pouco para evitar conflitos
Start-Sleep -Seconds 2

# Iniciar Denuncia Service (porta 3002)
Write-Host "`nIniciando Denuncia Service (porta 3002)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\denuncia'; npm start"

# Aguardar um pouco
Start-Sleep -Seconds 2

# Iniciar Policia Service (porta 3005)
Write-Host "`nIniciando Policia Service (porta 3005)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$baseDir\Policia-Service'; npm start"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Todos os servidores foram iniciados!" -ForegroundColor Green
Write-Host "Login Service: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Denuncia Service: http://localhost:3002" -ForegroundColor Cyan
Write-Host "Policia Service: http://localhost:3005" -ForegroundColor Cyan
Write-Host "`nAs abas estao abertas em novas janelas PowerShell" -ForegroundColor Magenta
