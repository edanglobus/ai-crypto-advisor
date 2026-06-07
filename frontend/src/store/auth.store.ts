import { create } from 'zustand';

import type { User } from '../api/auth.api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  setSession: (user: User, hasCompletedOnboarding: boolean) => void;
  setOnboardingComplete: () => void;
  clear: () => void;
}

// Client-side mirror of the session. The httpOnly cookie remains the source of
// truth; this store exposes the user + onboarding status to the UI and is kept
// in sync by AuthProvider and the auth/preferences hooks.
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  setSession: (user, hasCompletedOnboarding) =>
    set({ user, isAuthenticated: true, hasCompletedOnboarding }),
  setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),
  clear: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false }),
}));
