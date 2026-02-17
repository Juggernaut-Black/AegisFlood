# 🚀 AegisFlood Quick Start Guide

## Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (via Docker)

## 🎯 Quick Start (Windows PowerShell)

### Option 1: Use Startup Scripts (Recommended)

**Terminal 1 - Backend:**
```powershell
.\start-backend.ps1
```

**Terminal 2 - Frontend:**
```powershell
.\start-frontend.ps1
```

### Option 2: Manual Setup

#### Backend Setup
```powershell
# 1. Create virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r backend/requirements.txt

# 3. Create .env file
Copy-Item backend\env.example backend\.env

# 4. Start PostgreSQL
docker-compose up -d postgres

# 5. Initialize database
$env:PYTHONPATH="."
python backend/scripts/setup_db.py
python backend/scripts/load_regions.py

# 6. Start API
uvicorn backend.app.main:app --reload
```

#### Frontend Setup
```powershell
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🧪 Test Flows

### Citizen Registration
1. Go to http://localhost:5173
2. Click "Get Started Free"
3. Complete registration steps:
   - Enter location (e.g., "Guwahati, Assam")
   - Enter phone number (e.g., "9876543210")
   - Click "Send OTP"
   - Enter OTP: **0000**
   - Select language
   - Choose alert preferences
   - Click "Complete Setup"
4. You'll be redirected to Dashboard

### Authority Login
1. Go to http://localhost:5173/login
2. Enter credentials:
   - Username: **admin**
   - Password: **admin123**
3. Click "Login"
4. You'll see the Authority Dashboard

## 🔧 Troubleshooting

### Backend Issues
- **Database connection error**: Ensure PostgreSQL is running (`docker ps`)
- **Port 8000 in use**: Change port in `uvicorn` command or kill process using port
- **Module not found**: Ensure `PYTHONPATH=.` is set

### Frontend Issues
- **Port 5173 in use**: Vite will auto-select next available port
- **API connection error**: Ensure backend is running on port 8000
- **Build errors**: Run `npm install` again

### Database Issues
- **PostGIS extension error**: Ensure using PostGIS Docker image
- **Tables not created**: Run `python backend/scripts/setup_db.py` again
- **No regions**: Run `python backend/scripts/load_regions.py`

## 📝 Environment Variables

Edit `backend/.env` to configure:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens (change in production!)
- `ADMIN_USERNAME`: Authority login username
- `ADMIN_PASSWORD`: Authority login password
- `FRONTEND_ORIGIN`: CORS allowed origin

## ✅ Verification Checklist

- [ ] PostgreSQL container is running
- [ ] Backend API responds at http://localhost:8000/health
- [ ] Frontend loads at http://localhost:5173
- [ ] Can register a new citizen user
- [ ] Can login as authority
- [ ] Dashboard displays regions and alerts
- [ ] Settings page saves preferences
- [ ] Profile page displays user info

## 🎉 Success!

If all checks pass, your AegisFlood system is running! 🚀
