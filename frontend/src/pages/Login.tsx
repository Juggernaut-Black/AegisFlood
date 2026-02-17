import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../components/shared/Card'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/admin/login', { username, password })
      login(res.data.access_token, res.data.role)
      navigate('/dashboard', { replace: true })
    } catch (e) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
      <p className="text-center mb-4">
        <Link to="/" className="text-slate-600 hover:text-slate-900">← Back to home</Link>
      </p>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-2">Authority Login</h2>
        <p className="text-sm text-slate-600 mb-6">Sign in for dashboard and alert management.</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="text-sm text-slate-500 mt-6 text-center">
          Citizens: <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </Card>
      </div>
    </div>
  )
}


