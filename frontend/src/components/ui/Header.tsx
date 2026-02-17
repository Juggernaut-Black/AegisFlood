import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
	const { token, logout } = useAuth()
	const navigate = useNavigate()

	return (
		<header className="bg-white border-b border-border-gray">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				<Link to="/dashboard" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
					AegisFlood
				</Link>
				<nav className="flex items-center gap-4 text-sm">
					<Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
					{token ? (
						<button
							type="button"
							onClick={() => { logout(); navigate('/', { replace: true }) }}
							className="text-gray-600 hover:text-gray-900"
						>
							Logout
						</button>
					) : (
						<>
							<Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
							<Link to="/register" className="text-gray-600 hover:text-gray-900">Register</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	)
}




