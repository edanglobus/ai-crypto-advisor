import { Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { PublicOnlyRoute } from './components/shared/PublicOnlyRoute';
import { OnboardingGate } from './components/shared/OnboardingGate';
import { PendingOnboardingRoute } from './components/shared/PendingOnboardingRoute';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PendingOnboardingRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        <Route element={<OnboardingGate />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
