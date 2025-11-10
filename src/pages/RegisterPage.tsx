import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const nav = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const disabled = !form.username || !form.password || loading

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (disabled) return

    // Client-side validation
    if (form.username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await register(form.username, form.password)
      nav('/')
    } catch (e: unknown) {
      let errorMessage = 'Registration failed. Please try again.'
      
      if (e instanceof Error) {
        if (e.message.includes('already exists')) {
          errorMessage = 'Username already taken. Try another one'
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4 shadow-xl shadow-violet-500/30">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="heading mb-2">Create Account</h1>
          <p className="text-muted">Join the community today</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 animate-fade-in">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">⚠️</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-300 mb-1">
                      ✕ {error}
                    </p>
                    <p className="text-xs text-red-400/70">
                      Make sure your username is unique and password is strong.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Username Input - CONSISTENT STYLING */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Choose a username (3-32 chars)"
                className="input"
                disabled={loading}
                autoComplete="username"
                minLength={3}
                maxLength={32}
              />
              <p className="text-xs text-gray-500 mt-1">
                Lowercase letters, numbers, and underscores
              </p>
            </div>

            {/* Password Input - CONSISTENT STYLING */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Create a secure password (6+ chars)"
                className="input"
                disabled={loading}
                autoComplete="new-password"
                minLength={6}
                maxLength={64}
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
                  Creating account...
                </>
              ) : (
                '🚀 Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign in instead →
              </Link>
            </p>
          </div>
        </div>

        {/* Dev Mode Info */}
        {import.meta.env.DEV && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              🔧 Dev Mode: Check console for API errors
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
