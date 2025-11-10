import { useState } from 'react'
import type { UserLite } from '@/lib/api'

interface UserCardProps {
  user: UserLite
  following: boolean
  isCurrentUser?: boolean
  onToggle: (userId: number, next: boolean) => Promise<void>
}

export default function UserCard({
  user,
  following,
  isCurrentUser = false,
  onToggle,
}: UserCardProps) {
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    if (loading || isCurrentUser) return

    setLoading(true)
    try {
      await onToggle(user.id, !following)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card-hover p-6 animate-fade-in group">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Avatar with gradient */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
              {user.username.charAt(0).toUpperCase()}
            </div>
            {following && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              @{user.username}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge text-xs">ID: {user.id}</span>
              {isCurrentUser && (
                <span className="badge bg-violet-500/20 border-violet-500/30">
                  You
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Action Button */}
        <div className="flex-shrink-0">
          {isCurrentUser ? (
            <span className="text-sm text-gray-400 italic">Your account</span>
          ) : (
            <button
              onClick={handleToggle}
              disabled={loading}
              className={`btn ${
                following ? 'btn-secondary text-sm' : 'btn-primary text-sm'
              } min-w-[100px]`}
            >
              {loading ? (
                <span className="spinner w-4 h-4" />
              ) : following ? (
                <>
                  <span className="hidden sm:inline">✓ </span>Following
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">➕ </span>Follow
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
