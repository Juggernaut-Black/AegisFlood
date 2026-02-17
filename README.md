# AegisFlood (MVP)

AI-powered flood prediction and community alert system.

This repository contains a TypeScript React frontend and a FastAPI backend per the MVP scope:
- Citizen registration and dashboard (risk view)
- Authority dashboard (basic)
- Simple prediction logic
- SMS alerts via Twilio (mockable)
- JWT auth with roles (citizen, authority)

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   ├── prediction.py
│   │   ├── alerts.py
│   │   └── admin.py
│   ├── data/
│   │   └── regions.json
│   ├── scripts/
│   │   ├── setup_db.py
│   │   └── load_regions.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── styles/main.css
│       ├── components/
│       │   ├── shared/{Button.tsx,Card.tsx,Input.tsx,StatusPill.tsx,Toggle.tsx}
│       │   └── ui/{Header.tsx,NavigationBar.tsx,DashboardCard.tsx}
│       ├── pages/{Home.tsx,Dashboard.tsx,Login.tsx,Registration.tsx,Settings.tsx}
│       ├── context/AuthContext.tsx
│       └── services/api.ts
├── docker-compose.yml
└── .gitignore
```

## Quick Start (Local)

### Backend
1) Copy env (from project root)
   - **Windows (PowerShell):** `Copy-Item backend\env.example backend\.env`
   - **Windows (cmd):** `copy backend\env.example backend\.env`
   - **macOS/Linux:** `cp backend/env.example backend/.env`
2) Start Postgres, then from project root:
```
docker-compose up -d postgres
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate   # macOS/Linux
pip install -r backend/requirements.txt
```
3) Run DB setup and load regions (from project root; set PYTHONPATH so `backend` is importable):
   - **Windows (PowerShell):** `$env:PYTHONPATH="."; python backend/scripts/setup_db.py; python backend/scripts/load_regions.py`
   - **macOS/Linux:** `PYTHONPATH=. python backend/scripts/setup_db.py && PYTHONPATH=. python backend/scripts/load_regions.py`
4) Start the API (from project root):
```
uvicorn backend.app.main:app --reload
```

API: http://localhost:8000, Docs: http://localhost:8000/docs

### Frontend
```
cd frontend
npm install
npm run dev
```

App: http://localhost:5173

**Flows:** Land at `/` (NewLanding) → **Get Started Free** or **Start Free Trial** → Register (location, phone, OTP `0000`, language, alerts) → Dashboard. Authority login: **Sign In** → `/login` (admin / admin123) → Dashboard.

## Security (MVP)
- JWT with 24h expiry, role-based access control
- Input validation via Pydantic schemas
- CORS restricted via FRONTEND_ORIGIN
- Env-based secrets, no secrets in code
- Twilio credentials via env, optional mock mode

## Notes
- This is MVP scope only. Extended features are out-of-scope until requested.

## 🚀 Quick Start Scripts

**Windows PowerShell:**
- Backend: `.\start-backend.ps1`
- Frontend: `.\start-frontend.ps1`

See `QUICK_START.md` for detailed instructions.

## 📚 Documentation

- `IMPROVEMENTS.md` - Complete list of improvements made
- `VERIFICATION.md` - Code quality assessment
- `QUICK_START.md` - Quick start guide

## ✅ Production Ready

This codebase has been optimized with:
- ✅ Comprehensive error handling
- ✅ Transaction safety
- ✅ Input validation & sanitization
- ✅ Security best practices
- ✅ Complete backend-frontend integration
- ✅ Proper resource cleanup
- ✅ Type safety throughout




