#!/bin/bash

# Vaani Research Assistant - Local Development Startup Script
# This script starts both the backend and frontend servers

echo "🚀 Starting Vaani Research Assistant..."
echo "======================================"

# Check if API keys are configured
if grep -q "your_.*_api_key_here" PromptEngineering/API_KEY.py; then
    echo "⚠️  WARNING: Please configure your API keys in PromptEngineering/API_KEY.py"
    echo "   - Google Gemini API Key"
    echo "   - ElevenLabs API Key"
    echo ""
fi

# Function to kill background processes on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "📡 Starting backend server on port 5001..."
cd PromptEngineering
python3 app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5001/health > /dev/null; then
    echo "✅ Backend server is running at http://localhost:5001"
else
    echo "❌ Failed to start backend server"
    exit 1
fi

# Start frontend server
echo "🌐 Starting frontend server on port 3000..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 5

# Check if frontend is running
if curl -s -I http://localhost:3000 > /dev/null; then
    echo "✅ Frontend server is running at http://localhost:3000"
else
    echo "❌ Failed to start frontend server"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 Vaani Research Assistant is now running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

