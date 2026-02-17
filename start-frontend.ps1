# AegisFlood Frontend Startup Script
# This script sets up and starts the frontend development server

Write-Host "🎨 Starting AegisFlood Frontend..." -ForegroundColor Cyan

# Navigate to frontend directory
Set-Location frontend

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start dev server
Write-Host "`n✅ Starting Vite dev server..." -ForegroundColor Green
Write-Host "📍 Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔗 Make sure backend is running at http://localhost:8000`n" -ForegroundColor Yellow

npm run dev
