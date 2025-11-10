import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const disabled = !form.username || !form.password || loading

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (disabled) return

    setLoading(true)
    setError(null)

    try {
      await login(form.username, form.password)
      nav('/')
    } catch (e: unknown) {
      let errorMessage = 'Login failed. Please try again.'
      
      if (e instanceof Error) {
        if (e.message.includes('Invalid credentials') || e.message.includes('401')) {
          errorMessage = 'Invalid username or password'
        } else if (e.message.includes('Network')) {
          errorMessage = 'Network error. Please check your connection'
        } else if (e.message.includes('404')) {
          errorMessage = 'Server not found. Please check API URL'
        } else {
          errorMessage = e.message
        }
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4 shadow-xl shadow-violet-500/30">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 animate-fade-in">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">⚠️</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-300 mb-1">
                      {error}
                    </p>
                    <p className="text-xs text-red-400/70">
                      Need help? Try registering a new account first.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Username Input - ALWAYS USE .input CLASS */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Enter your username"
                className="input"
                disabled={loading}
                autoComplete="username"
              />
            </div>

            {/* Password Input - ALWAYS USE .input CLASS */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                className="input"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={disabled}
              className="w-full btn-primary py-3 text-base"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Signing in...
                </>
              ) : (
                '🚀 Sign In'
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Create one now →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
