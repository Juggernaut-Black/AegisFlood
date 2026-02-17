import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header with Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-5">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mr-3 shadow-sm">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">AegisFlood</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AI-powered flood prediction and community alert system protecting communities through early warning and real-time monitoring.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/register">
              <Button variant="primary" size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Authority Login</Button>
            </Link>
          </div>
        </div>

        {/* Dual Cards */}
        <div className="mb-6">
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-slate-900">Hackathon Demo Access</p>
                <p className="text-sm text-slate-600">Skip OTP/login and open the app instantly.</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    localStorage.setItem('DEMO_MODE', 'true')
                    login('demo-token', 'citizen')
                    navigate('/dashboard', { replace: true })
                  }}
                >
                  Demo Citizen
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    localStorage.setItem('DEMO_MODE', 'true')
                    login('demo-token', 'authority')
                    navigate('/dashboard', { replace: true })
                  }}
                >
                  Demo Authority
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* For Citizens Card */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-3 border border-blue-100">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">For Citizens</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Get flood alerts and stay informed about risk levels in your area.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Real-time flood risk monitoring
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Personalized alerts via SMS/WhatsApp
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Weekly weather forecasts
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Offline-first mobile experience
              </li>
            </ul>
            <Link to="/register">
              <Button variant="primary" className="w-full">
                Get Started
              </Button>
            </Link>
          </Card>

          {/* For Authorities Card */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mr-3 border border-slate-200">
                <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">For Authorities</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Manage alerts and monitor regional flood risks.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Regional risk overview dashboard
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Alert management and distribution
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Historical data analysis
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Contact management system
              </li>
            </ul>
            <Link to="/login">
              <Button variant="secondary" className="w-full">
                Authority Login
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}




