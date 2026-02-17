# 🚀 AegisFlood - Run Instructions

## ✅ Pre-Flight Checklist

- [x] ✅ Code optimized and verified
- [x] ✅ All imports working
- [x] ✅ Frontend builds successfully
- [x] ✅ Backend modules import correctly
- [x] ✅ Startup scripts created
- [x] ✅ Documentation complete

---

## 🎯 Quick Start (Recommended)

### Step 1: Start Docker Desktop
**IMPORTANT**: Docker Desktop must be running for PostgreSQL!

### Step 2: Start Backend (Terminal 1)
```powershell
.\start-backend.ps1
```

This script will:
- ✅ Create `.env` file if missing
- ✅ Create virtual environment if needed
- ✅ Install dependencies
- ✅ Start PostgreSQL container
- ✅ Initialize database
- ✅ Start FastAPI server

### Step 3: Start Frontend (Terminal 2)
```powershell
.\start-frontend.ps1
```

This script will:
- ✅ Install dependencies if needed
- ✅ Start Vite dev server

---

## 🌐 Access the Application

Once both are running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## 🧪 Test the Application

### Test 1: Citizen Registration
1. Open http://localhost:5173
2. Click **"Get Started Free"**
3. Complete registration:
   - **Location**: Enter any location (e.g., "Guwahati, Assam")
   - **Phone**: Enter phone number (e.g., "9876543210")
   - **OTP**: Enter **0000** (demo OTP)
   - **Language**: Select language
   - **Alerts**: Choose SMS/WhatsApp preferences
4. Click **"Complete Setup"**
5. ✅ Should redirect to Dashboard with live data

### Test 2: Authority Login
1. Open http://localhost:5173/login
2. Enter credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Click **"Login"**
4. ✅ Should redirect to Authority Dashboard

### Test 3: Dashboard Features
- ✅ View regions with risk levels
- ✅ View recent alerts
- ✅ View statistics
- ✅ Navigate to Settings/Profile

### Test 4: Settings & Profile
- ✅ Update alert preferences in Settings
- ✅ View profile information
- ✅ Changes persist after refresh

---

## 🔧 Troubleshooting

### Issue: Docker not running
**Solution**: Start Docker Desktop, then run `docker-compose up -d postgres`

### Issue: Port 8000 already in use
**Solution**: 
- Find process: `netstat -ano | findstr :8000`
- Kill process or change port in startup script

### Issue: Port 5173 already in use
**Solution**: Vite will auto-select next available port

### Issue: Database connection error
**Solution**: 
- Ensure PostgreSQL container is running: `docker ps`
- Check `.env` file has correct `DATABASE_URL`
- Restart container: `docker-compose restart postgres`

### Issue: Module not found (Python)
**Solution**: 
- Ensure `PYTHONPATH=.` is set
- Activate virtual environment: `.venv\Scripts\Activate.ps1`
- Reinstall: `pip install -r backend/requirements.txt`

### Issue: Frontend build errors
**Solution**:
- Clear cache: `rm -rf node_modules .vite`
- Reinstall: `npm install`
- Rebuild: `npm run build`

---

## 📊 Verification

### Backend Health Check
```powershell
curl http://localhost:8000/health
# Should return: {"status":"ok","service":"aegisflood-api"}
```

### API Documentation
Visit http://localhost:8000/docs to see:
- ✅ All available endpoints
- ✅ Request/response schemas
- ✅ Try out endpoints directly

### Frontend Console
Open browser DevTools (F12):
- ✅ No console errors
- ✅ API calls successful
- ✅ No network errors

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Backend logs show: "Starting AegisFlood API..."
2. ✅ Frontend shows: "VITE ready in X ms"
3. ✅ Health check returns: `{"status":"ok"}`
4. ✅ Can register a new user
5. ✅ Can login as authority
6. ✅ Dashboard displays data
7. ✅ Settings save preferences
8. ✅ Profile shows user info

---

## 🎉 You're All Set!

The application is **optimized, verified, and ready to run**!

For detailed information, see:
- `QUICK_START.md` - Quick start guide
- `VERIFICATION.md` - Code quality report
- `IMPROVEMENTS.md` - All improvements made
- `FINAL_STATUS.md` - Final status report

**Happy coding!** 🚀
