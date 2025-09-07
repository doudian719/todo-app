Write-Host "Testing Todo App..." -ForegroundColor Green

# Test if Go compiles
Write-Host "Testing Go compilation..." -ForegroundColor Yellow
go build -o test-todo.exe .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Go compilation successful" -ForegroundColor Green
    Remove-Item test-todo.exe
} else {
    Write-Host "❌ Go compilation failed" -ForegroundColor Red
    exit 1
}

# Test if frontend builds
Write-Host "Testing frontend build..." -ForegroundColor Yellow
if (Test-Path "build\index.html") {
    Write-Host "✓ Frontend build exists" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build missing" -ForegroundColor Red
    exit 1
}

Write-Host "`nAll tests passed! 🎉" -ForegroundColor Green
Write-Host "To start the app, run: go run ." -ForegroundColor Cyan
Write-Host "Then open: http://localhost:8080" -ForegroundColor Cyan
