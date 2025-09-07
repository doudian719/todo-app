@echo off
echo Starting Todo App Development Environment...
echo.

echo Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo Frontend build failed!
    pause
    exit /b 1
)

echo.
echo Starting backend server...
echo Frontend will be available at http://localhost:8080
echo.
go run .
