const URL = (import.meta.env.VITE_API_URL as string) ?? '';

type Json = Record<string, unknown>;

// ---------- Utils ----------
async function safeText(res: Response): Promise<string | null> {
  try {
    const txt = await res.text();
    return txt?.length ? txt : null;
  } catch {
    return null;
  }
}

async function safeJson<T>(res: Response): Promise<T | null> {
  const txt = await safeText(res);
  if (!txt) return null;
  try {
    return JSON.parse(txt) as T;
  } catch {
    return null;
  }
}

function mergeHeaders(a?: HeadersInit, b?: HeadersInit): HeadersInit {
  const out = new Headers(a ?? {});
  new Headers(b ?? {}).forEach((v, k) => out.set(k, v));
  return out;
}

// ---------- Core request ----------
async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${URL}${path}`;
  const headers = mergeHeaders({ 'Content-Type': 'application/json' }, opts.headers);

  const res = await fetch(url, { ...opts, headers });

  if (res.status === 204) return undefined as T;

  const data = await safeJson<T & { message?: string; error?: string }>(res);

  if (!res.ok) {
    const msg =
      (data && (data as Json)['message'])?.toString() ||
      (data && (data as Json)['error'])?.toString() ||
      `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  if (data == null) throw new Error('Empty response body');
  return data as T;
}

// ---------- Types ----------
export type LoginResponse = { token: string };
export type RegisterResponse = { id: number; username: string };

export interface UserLite {
  id: number
  username: string
}

// Normalized Post used by UI
export type Post = {
  id: number;
  userid: number;
  content: string;
  createdat: string; 
};

export type FeedResponse = { page: number; posts: Post[] };

// Raw shapes that may come from the API
type RawPost = {
  id?: number | string;
  userid?: number | string;
  user_id?: number | string;
  userId?: number | string;
  content?: unknown;
  createdat?: unknown;
  created_at?: unknown;
  createdAt?: unknown;
};

type RawFeedV1 = { page?: number | string; posts?: RawPost[] };
type RawFeedV2 = RawPost[];

// ---------- Normalizers ----------
function toNumber(n: unknown, fallback = 0): number {
  if (typeof n === 'number') return n;
  if (typeof n === 'string' && n.trim() !== '' && !Number.isNaN(Number(n))) return Number(n);
  return fallback;
}

function toStringVal(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}

function normalizePost(p: RawPost): Post {
  const id = toNumber(p.id);
  const userid = toNumber(p.userid ?? p.user_id ?? p.userId);
  const content = toStringVal(p.content, '');
  const created =
    toStringVal(p.createdat) ||
    toStringVal(p.created_at) ||
    toStringVal(p.createdAt) ||
    new Date().toISOString();

  return { id, userid, content, createdat: created };
}



// ---------- API ----------
export const api = {
  register: (username: string, password: string) =>
    request<RegisterResponse>('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),


  login: (username: string, password: string) =>
    request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  createPost: (token: string, content: string) =>
    request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { Authorization: `Bearer ${token}` },
    }),

  follow: (token: string, userId: number) =>
    request<{ message: string }>(`/follow/${userId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }),

  unfollow: (token: string, userId: number) =>
    request<{ message: string }>(`/follow/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),


  feed: async (token: string, page = 1, limit = 10): Promise<FeedResponse> => {
    const raw = await request<RawFeedV1 | RawFeedV2>(`/feed?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const arr: RawPost[] = Array.isArray(raw)
      ? raw
      : Array.isArray(raw.posts)
      ? raw.posts
      : [];

    const posts = arr.map(normalizePost);
    const currentPage =
      (Array.isArray(raw) ? page : toNumber(raw.page, page));

    return { page: currentPage, posts };

    
  },
};
