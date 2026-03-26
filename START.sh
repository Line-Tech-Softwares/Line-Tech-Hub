#!/bin/bash
# Line Tech Hub - Development Startup Script

echo ""
echo "===================================="
echo "  Line Tech Hub - Development Setup"
echo "===================================="
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not installed. Download from https://nodejs.org/"
    read -p "Press enter to continue..."
    exit 1
fi
echo "✓ Node.js found: $(node --version)"

# Check npm
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm not installed"
    read -p "Press enter to continue..."
    exit 1
fi
echo "✓ npm found: $(npm --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo ""
    echo "Installing dependencies... This may take 2-5 minutes"
    echo ""
    npm install --legacy-peer-deps
    if [ $? -ne 0 ]; then
        echo "ERROR: npm install failed"
        read -p "Press enter to continue..."
        exit 1
    fi
fi
echo "✓ Dependencies ready"

# Check .env.local
echo ""
echo "Checking Firebase configuration..."
if [ ! -f ".env.local" ]; then
    echo "WARNING: .env.local not found!"
    echo ""
    echo "You need to:"
    echo "1. Create Firebase project at https://console.firebase.google.com"
    echo "2. Copy your Firebase config credentials"
    echo "3. Create .env.local file with your credentials"
    echo ""
    echo "See QUICKSTART.md for detailed instructions"
    echo ""
    read -p "Press enter to continue..."
    exit 1
fi

# Start development
echo ""
echo "✓ All checks passed!"
echo ""
echo "Starting Line Tech Hub development server..."
echo ""
echo "Browser:  http://localhost:5173"
echo "Electron: Will open automatically"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev:all
