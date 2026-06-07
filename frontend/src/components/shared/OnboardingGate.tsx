import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../../store/auth.store';

// Wraps the main app: authenticated users who haven't finished the quiz are sent
// to /onboarding first. Assumes ProtectedRoute already ran.
export function OnboardingGate() {
  const hasCompletedOnboarding = useAuthStore((state) => state.hasCompletedOnboarding);

  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
