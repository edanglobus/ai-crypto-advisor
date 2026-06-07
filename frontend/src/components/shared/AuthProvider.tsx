import { ReactNode, useEffect } from 'react';

import { useMe } from '../../hooks/useAuth';
import { useAuthStore } from '../../store/auth.store';
import { FullScreenLoader } from '../ui/FullScreenLoader';

interface AuthProviderProps {
  children: ReactNode;
}

// Bootstraps the session once on load (via /auth/me) and keeps the Zustand store
// in sync with the query result. Blocks the app shell until the first resolution
// so guards never flash the wrong route.
export function AuthProvider({ children }: AuthProviderProps) {
  const { data, isSuccess, isError, isLoading } = useMe();
  const setSession = useAuthStore((state) => state.setSession);
  const clear = useAuthStore((state) => state.clear);

  useEffect(() => {
    if (isSuccess) {
      setSession(data.user, data.hasCompletedOnboarding);
    } else if (isError) {
      clear();
    }
  }, [isSuccess, isError, data, setSession, clear]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
}
