import { useContext } from 'react';


import { AuthCtx } from '@/context/AuthContext';
import type { AuthState } from '@/context/AuthContext';

export function useAuth(): AuthState {
  const v = useContext(AuthCtx);
  if (!v) throw new Error('useAuth must be used within AuthProvider');
  return v;
}
