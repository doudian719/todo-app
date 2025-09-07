# Test script to verify the API is working
Write-Host "Testing Todo App API..." -ForegroundColor Green

# Start the server in background
$job = Start-Job -ScriptBlock { 
    Set-Location "E:\GOLANG\Code\todo-app"
    go run .
}

# Wait a moment for server to start
Start-Sleep -Seconds 3

try {
    # Test API endpoints
    $headers = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer valid-token-123"
    }

    Write-Host "Testing GET /api/tasks..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/tasks" -Method GET -Headers $headers
    Write-Host "✓ GET /api/tasks successful" -ForegroundColor Green

    Write-Host "Testing POST /api/task..." -ForegroundColor Yellow
    $taskData = @{
        title = "测试任务"
        notes = "这是一个测试任务"
        due_date = "2024-12-31"
        priority = 2
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/task" -Method POST -Headers $headers -Body $taskData
    Write-Host "✓ POST /api/task successful" -ForegroundColor Green

    Write-Host "Testing GET / (frontend)..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri "http://localhost:8080/" -Method GET
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Frontend served successfully" -ForegroundColor Green
    }

    Write-Host "`nAll tests passed! 🎉" -ForegroundColor Green
    Write-Host "You can now open http://localhost:8080 in your browser" -ForegroundColor Cyan

} catch {
    Write-Host "❌ Test failed: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    # Stop the server
    Stop-Job $job
    Remove-Job $job
}
