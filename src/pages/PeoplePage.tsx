import { useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function PeoplePage() {
  const { token } = useAuth()
  const [userId, setUserId] = useState('')
  const [following, setFollowing] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleFollow() {
    if (!userId || !token) return

    const id = Number(userId)
    if (isNaN(id) || id <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid User ID' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      await api.follow(token, id)
      setFollowing((prev) => new Set(prev).add(id))
      setMessage({ type: 'success', text: `Successfully followed User #${id}` })
      setUserId('')
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : 'Failed to follow user'
      setMessage({ type: 'error', text: error })
    } finally {
      setLoading(false)
    }
  }

  async function handleUnfollow() {
    if (!userId || !token) return

    const id = Number(userId)
    if (isNaN(id) || id <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid User ID' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      await api.unfollow(token, id)
      setFollowing((prev) => {
        const s = new Set(prev)
        s.delete(id)
        return s
      })
      setMessage({ type: 'success', text: `Successfully unfollowed User #${id}` })
      setUserId('')
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : 'Failed to unfollow user'
      setMessage({ type: 'error', text: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4 shadow-xl">
          <span className="text-2xl sm:text-3xl">👥</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Follow Users
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto px-4">
          Enter a User ID to follow or unfollow. You can find User IDs from posts in your feed.
        </p>
      </div>

      {/* Main Card */}
      <div className="glass-card p-6 sm:p-8 max-w-md mx-auto">
        {/* Alert Message */}
        {message && (
          <div
            className={`p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                : 'bg-red-500/10 border border-red-500/30 text-red-300'
            }`}
          >
            <p className="text-xs sm:text-sm">
              {message.type === 'success' ? '✅ ' : '⚠️ '}
              {message.text}
            </p>
          </div>
        )}

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              User ID
            </label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g., 1, 2, 3"
              className="input text-center text-base sm:text-lg"
              min="1"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: User IDs appear next to usernames in the feed
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              onClick={handleFollow}
              disabled={!userId || loading}
              className="btn-primary text-sm sm:text-base"
            >
              {loading ? (
                <span className="spinner w-4 h-4" />
              ) : (
                <>➕ Follow</>
              )}
            </button>
            <button
              onClick={handleUnfollow}
              disabled={!userId || loading}
              className="btn-secondary text-sm sm:text-base"
            >
              {loading ? (
                <span className="spinner w-4 h-4" />
              ) : (
                <>➖ Unfollow</>
              )}
            </button>
          </div>
        </div>

        {/* Following List */}
        {following.size > 0 && (
          <div className="mt-6 sm:mt-8 pt-6 border-t border-white/10">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">
              Currently Following ({following.size})
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(following).map((id) => (
                <span key={id} className="badge text-xs">
                  User #{id}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
