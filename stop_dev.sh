#!/bin/bash

# woom Research Assistant - Stop Development Servers
echo "🛑 Stopping woom Research Assistant servers..."

# Kill processes running on ports 3000 and 5001
echo "Stopping frontend server (port 3000)..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "Stopping backend server (port 5001)..."
lsof -ti:5001 | xargs kill -9 2>/dev/null

echo "✅ All servers stopped"

