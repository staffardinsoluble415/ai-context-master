@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   AI Context Master - Setup
echo ========================================
echo.

REM Check if running as administrator (not required but good to know)
echo [1/3] Checking VS Code installation...
where code >nul 2>nul
if %errorlevel% neq 0 (
    echo    WARNING: VS Code CLI not found in PATH
    echo    Please make sure VS Code is installed
    echo.
)

echo [2/3] Running VS Code settings installer...
echo.

REM Run the PowerShell script
powershell -ExecutionPolicy Bypass -File "%~dp0.vscode\install-settings.ps1"

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Setup failed! Please check the error messages above.
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo 1. Restart VS Code to apply changes
echo 2. Open any project and Claude Code will
echo    automatically load Memory Stack
echo.
echo For more info, see README.md
echo.
pause
