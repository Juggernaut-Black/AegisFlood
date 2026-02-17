import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

type RiskLocation = {
  name: string
  state: string
  riskLevel: string
  percentage: number
  color: string
}

type AlertData = {
  id: number
  type: 'flood' | 'weather' | 'emergency'
  message: string
  location: string
  timestamp: string
  severity: string
}

const FALLBACK_RISK: RiskLocation[] = [
  { name: 'Chennai', state: 'Tamil Nadu', riskLevel: 'medium', percentage: 35, color: 'bg-orange-500' },
  { name: 'Guwahati', state: 'Assam', riskLevel: 'high', percentage: 58, color: 'bg-red-500' },
  { name: 'Patna', state: 'Bihar', riskLevel: 'medium', percentage: 62, color: 'bg-orange-500' },
]

const FALLBACK_ALERTS: AlertData[] = [
  { id: 0, type: 'flood', message: 'Heavy rainfall expected in next 6 hours', location: 'Guwahati, Assam', timestamp: '—', severity: 'high' },
  { id: -1, type: 'weather', message: 'Water level rising in Brahmaputra river', location: 'Assam', timestamp: '—', severity: 'medium' },
]

function formatTimeAgo(iso: string): string {
  try {
    const d = new Date(iso)
    const n = Date.now() - d.getTime()
    if (n < 60000) return 'Just now'
    if (n < 3600000) return `${Math.floor(n / 60000)} min ago`
    if (n < 86400000) return `${Math.floor(n / 3600000)} hours ago`
    return d.toLocaleDateString()
  } catch {
    return '—'
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { role, logout } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [riskLocations, setRiskLocations] = useState<RiskLocation[]>(FALLBACK_RISK)
  const [alerts, setAlerts] = useState<AlertData[]>(FALLBACK_ALERTS)
  const [stats, setStats] = useState<{ total_users: number; total_regions: number; alerts_sent_24h: number } | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    // Fetch regions
    api.get<{ id: number; name: string; state: string | null; latest_risk_level: string | null; latest_risk_score: number | null }[]>('/dashboard/regions', { signal })
      .then((res) => {
        if (signal.aborted) return
        const list: RiskLocation[] = (res.data || []).slice(0, 6).map((r) => {
          const level = (r.latest_risk_level || 'low').toLowerCase()
          const score = r.latest_risk_score ?? 20
          const color = level === 'high' ? 'bg-red-500' : level === 'medium' ? 'bg-orange-500' : 'bg-green-500'
          return { name: r.name, state: r.state || '', riskLevel: level, percentage: score, color }
        })
        if (list.length) setRiskLocations(list)
      })
      .catch((err) => {
        if (!signal.aborted && err.name !== 'CanceledError') {
          console.error('Failed to load regions:', err)
        }
      })

    // Fetch alerts
    api.get<{ id: number; region: string; message: string; risk_level: string; created_at: string | Date }[]>('/alerts/', { signal })
      .then((res) => {
        if (signal.aborted) return
        const list: AlertData[] = (res.data || []).slice(0, 10).map((a) => {
          const createdAt = typeof a.created_at === 'string' ? a.created_at : a.created_at instanceof Date ? a.created_at.toISOString() : new Date().toISOString()
          return {
            id: a.id,
            type: 'flood' as const,
            message: a.message,
            location: a.region,
            timestamp: formatTimeAgo(createdAt),
            severity: a.risk_level,
          }
        })
        if (list.length) setAlerts(list)
      })
      .catch((err) => {
        if (!signal.aborted && err.name !== 'CanceledError') {
          console.error('Failed to load alerts:', err)
        }
      })

    // Fetch stats
    api.get<{ total_users: number; total_regions: number; alerts_sent_24h: number }>('/dashboard/stats', { signal })
      .then((res) => {
        if (!signal.aborted) setStats(res.data)
      })
      .catch((err) => {
        if (!signal.aborted && err.name !== 'CanceledError') {
          console.error('Failed to load stats:', err)
        }
      })

    return () => {
      abortController.abort()
    }
  }, [])

  const languages = [
    'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu',
    'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light')
  }
  
  const getRiskBadgeColor = (level: string) => {
    const L = level.toLowerCase()
    if (L === 'low' || L === 'safe') return 'bg-yellow-500 text-yellow-900'
    if (L === 'medium') return 'bg-orange-500 text-orange-900'
    if (L === 'high' || L === 'critical') return 'bg-red-500 text-white'
    return 'bg-gray-500 text-white'
  }
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'flood': return '🌊'
      case 'weather': return '⛈️'
      case 'emergency': return '🚨'
      default: return '⚠️'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Navigation Header */}
      <header className="bg-purple-900/30 border-b border-cyan-400/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FG</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">AegisFlood Dashboard</span>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" className="glow-button" onClick={() => navigate('/dashboard')}>
                🏠 Home
              </Button>
              <Button variant="ghost" className="hover:bg-purple-800/50" onClick={() => navigate('/community')}>
                💬 Community Chat
              </Button>
              <Button variant="ghost" className="glow-button">
                🚨 Recent Alerts
              </Button>
              <Button variant="ghost" className="glow-button">
                📊 Risk Predicted
              </Button>
            </nav>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="glow-button"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                >
                  🌐 {selectedLanguage}
                </Button>
                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-48 language-dropdown z-50">
                    <div className="py-2">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors"
                          onClick={() => {
                            setSelectedLanguage(lang)
                            setShowLanguageDropdown(false)
                          }}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Theme Toggle */}
              <Button variant="ghost" className="glow-button" onClick={toggleTheme}>
                {isDarkMode ? '☀️' : '🌙'}
              </Button>
              
              {/* Profile */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="glow-button"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  👤 A
                </Button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 language-dropdown z-50">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">A</span>
                        </div>
                        <div>
                          <p className="font-medium">{role === 'authority' ? 'Authority' : 'Citizen'} User</p>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{role === 'authority' ? 'admin@floodguard.in' : 'Citizen'}</p>
                        </div>
                      </div>
                      <div className="border-t pt-3" style={{ borderColor: 'var(--border-primary)' }}>
                        <Link to="/profile" className="block w-full text-left px-2 py-1 text-sm hover:bg-blue-50 rounded transition-colors text-white">Profile Settings</Link>
                        <button
                          type="button"
                          className="block w-full text-left px-2 py-1 text-sm hover:bg-blue-50 rounded transition-colors text-white"
                          onClick={() => { logout(); navigate('/', { replace: true }) }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Left Column - Risk Monitor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alert Feature */}
            <Card variant="elevated" className="h-fit">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold glow-text">Recent Alerts</h2>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Updates every 3 hours</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {riskLocations.slice(0, 3).map((location, index) => (
                  <div key={`${location.name}-${index}`} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{location.name}{location.state ? `, ${location.state}` : ''}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskBadgeColor(location.riskLevel)}`}>
                        {location.riskLevel}
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-2">{location.percentage}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${location.color} h-2 rounded-full`} style={{ width: `${location.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <span className="text-xl">{getAlertIcon(alert.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{alert.message}</p>
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{alert.timestamp}</span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>📍 {alert.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Interactive Risk Map */}
            <Card variant="elevated" className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold glow-text">Interactive Risk Map</h2>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Last Updated: 12:58:59 AM</span>
              </div>
              
              <div className="flex-1 rounded-lg flex flex-col" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '300px' }}>
                <div className="p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-sm font-medium">📊 Layers</div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">🌊 Flood Risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">🌧️ Rainfall</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">🏞️ River Levels</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">⚠️ Incidents</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Map Ready for ML Integration</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>This interactive map is prepared for your machine learning model integration. Connect your flood prediction model to display real-time risk data.</p>
                    <div className="mt-4 space-y-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      <p>Time Frame: Current</p>
                      <p>Showing: Current</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right Column - Calendar & Timeline */}
          <div className="space-y-6">
            {/* High Risk Calendar */}
            <Card variant="elevated">
              <h2 className="text-lg font-semibold mb-4 glow-text">📅 High Risk Calendar</h2>
              <div className="h-48 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-center">
                  <div className="text-4xl mb-2">📅</div>
                  <p className="font-medium">Risk Calendar</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Upcoming high-risk dates</p>
                </div>
              </div>
            </Card>
            
            {/* Prediction Timeline */}
            <Card variant="elevated" className="flex-1">
              <h2 className="text-lg font-semibold mb-4 glow-text">🕐 Prediction Timeline (3hr intervals)</h2>
              <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Prediction Time</span>
                        <span className="font-medium">{stats ? `${stats.total_regions} regions · ${stats.total_users} users` : 'Now'}</span>
                      </div>
                
                <div className="space-y-3">
                  {['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM', '12:00 AM'].map((time, index) => (
                    <div key={time} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <span className="text-sm">{time}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-red-500' : 
                          index === 1 ? 'bg-orange-500' : 
                          index === 2 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        <span className="text-sm">
                          {index === 0 ? 'High' : index === 1 ? 'Medium' : index === 2 ? 'Low' : 'Safe'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
