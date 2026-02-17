# AegisFlood Backend Startup Script
# This script sets up and starts the backend API

Write-Host "🚀 Starting AegisFlood Backend..." -ForegroundColor Cyan

# Check if .env exists
$envPath = "backend\.env"
if (-not (Test-Path $envPath)) {
    Write-Host "📝 Creating .env file from env.example..." -ForegroundColor Yellow
    Copy-Item "backend\env.example" $envPath
    Write-Host "✅ .env file created. Please review and update if needed." -ForegroundColor Green
}

# Check if virtual environment exists
if (-not (Test-Path ".venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv .venv
}

# Activate virtual environment
Write-Host "🔧 Activating virtual environment..." -ForegroundColor Yellow
& ".venv\Scripts\Activate.ps1"

# Install/update dependencies
Write-Host "📥 Installing dependencies..." -ForegroundColor Yellow
pip install -q --upgrade pip
pip install -q -r backend/requirements.txt

# Check if Postgres is running (Docker)
Write-Host "🐘 Checking PostgreSQL..." -ForegroundColor Yellow
$postgresRunning = docker ps --filter "name=aegisflood_postgres" --format "{{.Names}}" | Select-String "aegisflood_postgres"
if (-not $postgresRunning) {
    Write-Host "⚠️  PostgreSQL container not running. Starting with docker-compose..." -ForegroundColor Yellow
    docker-compose up -d postgres
    Start-Sleep -Seconds 5
}

# Set PYTHONPATH
$env:PYTHONPATH = "."

# Check if database is initialized
Write-Host "🗄️  Checking database..." -ForegroundColor Yellow
try {
    python -c "from backend.app.database import engine; engine.connect().close()" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "📊 Initializing database..." -ForegroundColor Yellow
        python backend/scripts/setup_db.py
        python backend/scripts/load_regions.py
    }
} catch {
    Write-Host "📊 Initializing database..." -ForegroundColor Yellow
    python backend/scripts/setup_db.py
    python backend/scripts/load_regions.py
}

# Start the API
Write-Host "`n✅ Starting FastAPI server..." -ForegroundColor Green
Write-Host "📍 API will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 API docs at: http://localhost:8000/docs`n" -ForegroundColor Cyan

uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
