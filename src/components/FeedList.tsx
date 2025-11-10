import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import type { Post } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import FeedItem from './FeedItem';

export default function FeedList() {
  const { token } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const endRef = useRef(false);
  const seenKeys = useRef<Set<string>>(new Set());
  const sentinel = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const retryAtRef = useRef<number>(0);

  const uniqueKey = (p: Post) => `${p.id}:${p.createdat}`;

  const load = useCallback(async (page: number) => {
    if (!token) return;
    if (loadingRef.current || endRef.current) return;
    if (Date.now() < retryAtRef.current) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    loadingRef.current = true;
    setError(null);

    try {
      const res = await api.feed(token, page, 10);

      const fresh = res.posts.filter((p) => {
        const k = uniqueKey(p);
        if (seenKeys.current.has(k)) return false;
        seenKeys.current.add(k);
        return true;
      });

      setPosts((prev) => [...prev, ...fresh]);
      if (fresh.length === 0) {
        setEnd(true);
        endRef.current = true;
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') {
        setError(e.message);
        retryAtRef.current = Date.now() + 1500;
      } else if (typeof e === 'object' && e !== null && 'name' in e && e.name !== 'AbortError') {
        setError('Unexpected error');
        retryAtRef.current = Date.now() + 1500;
      }
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    setPosts([]);
    setEnd(false);
    setError(null);

    pageRef.current = 1;
    loadingRef.current = false;
    endRef.current = false;
    retryAtRef.current = 0;
    seenKeys.current.clear();
    abortRef.current?.abort();

    void load(1);
  }, [token, load]);

  useEffect(() => {
    const currentElement = sentinel.current;
    if (!currentElement) return;

    let io: IntersectionObserver | null = null;

    function attach() {
      if (io) io.disconnect();
      if (loading || end) return;

      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting) return;
          if (Date.now() < retryAtRef.current) return;

          io?.disconnect();

          const next = pageRef.current + 1;
          pageRef.current = next;
          void load(next);
        },
        { rootMargin: '300px 0px', threshold: 0.01 }
      );

      io.observe(currentElement as unknown as Element);
    }

    attach();

    return () => {
      if (io) io.disconnect();
    };
  }, [loading, end, load]);

  if (!posts.length && !loading && !error) {
    return (
      <div className="text-center text-slate-400">
        Feed kosong — ikuti beberapa pengguna untuk mulai melihat postingan.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {posts.map((p) => (
        <FeedItem
          key={uniqueKey(p)}
          userid={p.userid}
          content={p.content}
          createdat={p.createdat}
        />
      ))}
      <div ref={sentinel} />
      {loading && <div className="text-center text-slate-400 py-3">Loading…</div>}
      {end && <div className="text-center text-slate-400 py-3">Sudah sampai akhir.</div>}
      {error && <div className="text-center text-red-400 py-3">{error}</div>}
    </div>
  );
}
