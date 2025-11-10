import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

export default function Navbar() {
  const { token, username, logout } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={token ? "/" : "/login"} 
            className="flex items-center gap-2 flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-xl font-bold">📰</span>
            </div>
            <span className="text-lg sm:text-xl font-bold gradient-text">
              NewsFeed
            </span>
          </Link>

          {/* Desktop Navigation */}
          {token ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg transition-all text-sm ${
                    isActive('/')
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  🏠 Feed
                </Link>
                <Link
                  to="/people"
                  className={`px-4 py-2 rounded-lg transition-all text-sm ${
                    isActive('/people')
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  👥 People
                </Link>

                {/* User Menu */}
                <div className="flex items-center gap-2 ml-2 pl-3 border-l border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-sm font-bold">
                      {username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-300 hidden lg:inline">
                      {username}
                    </span>
                  </div>
                  <button onClick={logout} className="btn-secondary text-sm">
                    Logout
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </>
          ) : (
            // Unauthenticated Navigation
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className={`btn-secondary text-sm ${
                  isActive('/login') ? 'bg-white/20' : ''
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`btn-primary text-sm ${
                  isActive('/register') ? 'opacity-90' : ''
                }`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {token && mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-all ${
                isActive('/')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              🏠 Feed
            </Link>
            <Link
              to="/people"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-all ${
                isActive('/people')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              👥 People
            </Link>
            
            {/* Mobile User Info */}
            <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-sm font-bold">
                  {username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-300">{username}</span>
              </div>
              <button 
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }} 
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
