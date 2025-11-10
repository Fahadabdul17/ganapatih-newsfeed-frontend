import { createContext } from 'react';

export interface AuthState {
  token: string | null;
  username: string | null;
  login: (u: string, p: string) => Promise<void>;
  register: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

export const AuthCtx = createContext<AuthState | null>(null);
