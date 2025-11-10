import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthGuard({ children }: { children: ReactElement }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
