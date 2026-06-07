import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../../store/auth.store';

// Guards the /onboarding route: only reachable while onboarding is incomplete.
// Users who already finished are redirected to the dashboard.
export function PendingOnboardingRoute() {
  const hasCompletedOnboarding = useAuthStore((state) => state.hasCompletedOnboarding);

  if (hasCompletedOnboarding) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
