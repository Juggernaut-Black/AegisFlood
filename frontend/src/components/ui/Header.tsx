import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
	const { token, logout } = useAuth()
	const navigate = useNavigate()

	return (
		<header className="bg-white/80 border-b border-slate-200 backdrop-blur">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				<Link to="/dashboard" className="text-lg font-semibold text-slate-900 hover:text-slate-700 tracking-tight">
					AegisFlood
				</Link>
				<nav className="flex items-center gap-2 text-sm">
					<Link to="/dashboard" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">Dashboard</Link>
					{token ? (
						<button
							type="button"
							onClick={() => { logout(); navigate('/', { replace: true }) }}
							className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
						>
							Logout
						</button>
					) : (
						<>
							<Link to="/login" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">Login</Link>
							<Link to="/register" className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100">Register</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}




