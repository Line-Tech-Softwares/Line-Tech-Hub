@echo off
REM Line Tech Hub - Development Startup Script
REM This script helps you get started quickly

echo.
echo ====================================
echo   Line Tech Hub - Development Setup
echo ====================================
echo.

REM Check Node.js installation
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not installed. Download from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js found

REM Check npm
echo Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm not installed
    pause
    exit /b 1
)
echo ✓ npm found

REM Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo Installing dependencies... This may take 2-5 minutes
    echo.
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
)
echo ✓ Dependencies ready

REM Check .env.local
echo.
echo Checking Firebase configuration...
if not exist ".env.local" (
    echo WARNING: .env.local not found!
    echo.
    echo You need to:
    echo 1. Create Firebase project at https://console.firebase.google.com
    echo 2. Copy your Firebase config credentials
    echo 3. Create .env.local file with your credentials
    echo.
    echo See QUICKSTART.md for detailed instructions
    echo.
    pause
    exit /b 1
)

REM Start development
echo.
echo ✓ All checks passed!
echo.
echo Starting Line Tech Hub development server...
echo.
echo Browser:  http://localhost:5173
echo Electron: Will open automatically
echo.
echo Press Ctrl+C to stop
echo.

call npm run dev:all

pause
