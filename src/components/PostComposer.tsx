import type { FormEvent } from 'react'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'

export default function PostComposer({ onPosted }: { onPosted: () => void }) {
  const { token } = useAuth()
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const limit = 200
  const remaining = limit - text.length
  const isOverLimit = remaining < 0
  const isNearLimit = remaining <= 20 && remaining >= 0

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim() || isOverLimit || loading) return

    setLoading(true)
    setError(null)

    try {
      await api.createPost(token!, text.trim())
      setText('')
      onPosted()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind? ✨"
            className="input min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
            disabled={loading}
          />
          
          {/* Character Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
            <div
              className={`text-xs sm:text-sm font-medium ${
                isOverLimit
                  ? 'text-red-400'
                  : isNearLimit
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              }`}
            >
              {remaining} characters remaining
            </div>
            
            {/* Progress Bar */}
            <div className="w-full sm:w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  isOverLimit
                    ? 'bg-red-500'
                    : isNearLimit
                    ? 'bg-yellow-500'
                    : 'bg-violet-500'
                }`}
                style={{ width: `${Math.min((text.length / limit) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!text.trim() || isOverLimit || loading}
          className="btn-primary w-full sm:w-auto text-sm sm:text-base"
        >
          {loading ? (
            <>
              <span className="spinner" />
              Posting...
            </>
          ) : (
            <>
              📤 Post
            </>
          )}
        </button>
      </form>
    </div>
  )
}
