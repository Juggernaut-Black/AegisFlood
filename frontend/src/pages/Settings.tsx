import { useEffect, useState } from 'react'
import Card from '../components/shared/Card'
import Toggle from '../components/shared/Toggle'
import api from '../services/api'
import { useI18n } from '../context/I18nContext'

type Profile = {
  phone_number: string
  role: string
  name: string | null
  language: string
  sms_alerts: boolean
  whatsapp_alerts: boolean
}

export default function Settings() {
  const { t } = useI18n()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [sms, setSms] = useState(true)
  const [whatsapp, setWhatsapp] = useState(false)
  const [canSave, setCanSave] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    let cancelled = false
    
    api.get<Profile>('/auth/me', { signal: abortController.signal })
      .then((res) => {
        if (!cancelled) {
          setSms(res.data.sms_alerts)
          setWhatsapp(res.data.whatsapp_alerts)
        }
      })
      .catch((err) => {
        if (!cancelled && err.name !== 'CanceledError') {
          setError('Failed to load preferences.')
          console.error('Failed to load preferences:', err)
        }
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    
    return () => {
      cancelled = true
      abortController.abort()
    }
  }, [])

  const handleSmsChange = (checked: boolean) => {
    setSms(checked)
    setCanSave(true)
  }
  const handleWhatsappChange = (checked: boolean) => {
    setWhatsapp(checked)
    setCanSave(true)
  }

  const save = () => {
    if (!canSave) return
    setSaving(true)
    setError('')
    api.patch<Profile>('/auth/me', { sms_alerts: sms, whatsapp_alerts: whatsapp })
      .then((res) => {
        setSms(res.data.sms_alerts)
        setWhatsapp(res.data.whatsapp_alerts)
        setCanSave(false)
      })
      .catch(() => setError('Failed to save.'))
      .finally(() => setSaving(false))
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Card className="p-6 text-center text-gray-500">Loading preferences…</Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">{t('reg.alertPrefs')}</h2>
        <p className="text-sm text-gray-600">{t('reg.alertPrefsDesc')}</p>
        <div className="flex items-center justify-between">
          <span>{t('reg.smsAlerts')}</span>
          <Toggle checked={sms} onChange={handleSmsChange} />
        </div>
        <div className="flex items-center justify-between">
          <span>{t('reg.whatsappAlerts')}</span>
          <Toggle checked={whatsapp} onChange={handleWhatsappChange} />
        </div>
        <p className="text-xs text-gray-500">{t('reg.selectOne')}</p>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {canSave && (
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save preferences'}
          </button>
        )}
      </Card>
    </div>
  )
}




