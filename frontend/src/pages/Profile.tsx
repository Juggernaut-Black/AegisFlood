import { useEffect, useState } from 'react'
import Card from '../components/shared/Card'
import { useI18n } from '../context/I18nContext'
import api from '../services/api'

type Profile = {
  phone_number: string
  role: string
  name: string | null
  language: string
  sms_alerts: boolean
  whatsapp_alerts: boolean
}

function maskPhone(phone: string) {
  if (phone.length < 4) return '****'
  return phone.slice(-4).padStart(phone.length, '*')
}

const LANG_LABELS: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  as: 'Assamese',
  ta: 'Tamil',
}

export default function Profile() {
  const { t } = useI18n()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    let cancelled = false
    
    api.get<Profile>('/auth/me', { signal: abortController.signal })
      .then((res) => {
        if (!cancelled) setProfile(res.data)
      })
      .catch((err) => {
        if (!cancelled && err.name !== 'CanceledError') {
          setError('Failed to load profile.')
          console.error('Failed to load profile:', err)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    
    return () => {
      cancelled = true
      abortController.abort()
    }
  }, [])

  if (loading) {
    return (
      <div className="p-4">
        <Card className="p-6 text-center text-gray-500">Loading profile…</Card>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="p-4">
        <Card className="p-6 text-red-600">{error || 'Profile not available.'}</Card>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Card className="p-6 space-y-4">
        <h1 className="text-lg font-semibold">{t('app.profile')}</h1>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gray-500">Phone</dt>
            <dd className="font-medium">{maskPhone(profile.phone_number)}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium">{profile.role === 'authority' ? 'Authority' : 'Citizen'}</dd>
          </div>
          {profile.name && (
            <div>
              <dt className="text-gray-500">Location / Name</dt>
              <dd className="font-medium">{profile.name}</dd>
            </div>
          )}
          <div>
            <dt className="text-gray-500">Language</dt>
            <dd className="font-medium">{LANG_LABELS[profile.language] || profile.language}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Alerts</dt>
            <dd className="font-medium">
              {profile.sms_alerts && 'SMS'}
              {profile.sms_alerts && profile.whatsapp_alerts && ', '}
              {profile.whatsapp_alerts && 'WhatsApp'}
              {!profile.sms_alerts && !profile.whatsapp_alerts && 'None'}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}
