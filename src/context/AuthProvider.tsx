import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { clearToken, getToken, setToken } from '@/lib/auth';


import { AuthCtx } from './AuthContext';
import type { AuthState } from './AuthContext';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTok] = useState<string | null>(getToken());
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (token) setToken(token);
  }, [token]);

  const value = useMemo<AuthState>(() => ({
    token,
    username,
    login: async (u, p) => {
      const res = await api.login(u, p);
      setTok(res.token);
      setUsername(u);
    },
    register: async (u, p) => {
      await api.register(u, p);
      const res = await api.login(u, p);
      setTok(res.token);
      setUsername(u);
    },
    logout: () => {
      setTok(null);
      setUsername(null);
      clearToken();
    },
  }), [token, username]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
