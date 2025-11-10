import { useState } from 'react'

type Props = {
  userId: number
  following: boolean
  onToggle: (userId: number, next: boolean) => Promise<void> | void
}

export default function FollowButton({ userId, following, onToggle }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (loading) return

    setLoading(true)
    try {
      await onToggle(userId, !following)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`btn ${following ? 'btn-secondary' : 'btn-primary'}`}
    >
      {loading ? (
        <>
          <span className="spinner w-4 h-4" />
          {following ? 'Unfollowing...' : 'Following...'}
        </>
      ) : following ? (
        <>✓ Following</>
      ) : (
        <>➕ Follow</>
      )}
    </button>
  )
}
