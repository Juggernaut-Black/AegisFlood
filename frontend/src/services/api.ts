import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
  withCredentials: false,
})

const DEMO_MODE =
  String(import.meta.env.VITE_DEMO_MODE || '').toLowerCase() === 'true' ||
  (typeof window !== 'undefined' && window.localStorage?.getItem('DEMO_MODE') === 'true')

const demoToken = 'demo-token'

const demoRegions = [
  { id: 1, name: 'Guwahati', state: 'Assam', latest_risk_level: 'high', latest_risk_score: 78 },
  { id: 2, name: 'Chennai', state: 'Tamil Nadu', latest_risk_level: 'medium', latest_risk_score: 46 },
  { id: 3, name: 'Patna', state: 'Bihar', latest_risk_level: 'medium', latest_risk_score: 52 },
  { id: 4, name: 'Kolkata', state: 'West Bengal', latest_risk_level: 'low', latest_risk_score: 22 },
]

const demoAlerts = [
  {
    id: 101,
    region: 'Guwahati, Assam',
    message: 'Heavy rainfall expected in the next 6 hours. Avoid riverside areas.',
    risk_level: 'high',
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 102,
    region: 'Chennai, Tamil Nadu',
    message: 'Drainage overflow reported in low-lying zones. Stay indoors if possible.',
    risk_level: 'medium',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
]

function demoResponse<T>(data: T): Promise<{ data: T }> {
  return Promise.resolve({ data })
}

if (DEMO_MODE) {
  const _get = api.get.bind(api)
  const _post = api.post.bind(api)

  ;(api as any).get = (url: string, ...rest: any[]) => {
    if (url === '/health') return demoResponse({ status: 'ok', service: 'aegisflood-api' })
    if (url === '/dashboard/regions') return demoResponse(demoRegions)
    if (url === '/dashboard/stats') return demoResponse({ total_users: 1284, total_regions: demoRegions.length, alerts_sent_24h: 37 })
    if (url === '/alerts/' || url === '/alerts') return demoResponse(demoAlerts)
    if (url === '/auth/me') {
      return demoResponse({
        phone_number: 'demo',
        role: 'citizen',
        name: 'Demo User',
        language: 'en',
        sms_alerts: true,
        whatsapp_alerts: false,
      })
    }
    return _get(url, ...rest)
  }

  ;(api as any).post = (url: string, body?: any, ...rest: any[]) => {
    if (url === '/auth/register') return demoResponse({ otp_sent: true })
    if (url === '/auth/verify') return demoResponse({ access_token: demoToken, token_type: 'bearer', role: 'citizen' })
    if (url === '/auth/admin/login') return demoResponse({ access_token: demoToken, token_type: 'bearer', role: 'authority' })
    if (url === '/alerts/' || url === '/alerts') {
      const next = {
        id: Math.floor(Math.random() * 10000) + 200,
        region: body?.region || 'Demo Region',
        message: body?.message || 'Demo alert',
        risk_level: body?.risk_level || 'medium',
        created_at: new Date().toISOString(),
      }
      demoAlerts.unshift(next as any)
      return demoResponse(next)
    }
    return _post(url, body, ...rest)
  }
}

export function setAuthToken(token?: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// 401: clear auth so AuthContext can sync via aegisflood:logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      setAuthToken(null)
      localStorage.removeItem('auth')
      window.dispatchEvent(new Event('aegisflood:logout'))
    }
    return Promise.reject(err)
  }
)

export default api




