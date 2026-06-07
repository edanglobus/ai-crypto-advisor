import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { preferenceApi, type Preferences } from '../api/preference.api';
import { useAuthStore } from '../store/auth.store';
import { ME_QUERY_KEY } from './useAuth';
import { DASHBOARD_QUERY_KEY } from './useDashboard';

export const PREFERENCES_QUERY_KEY = ['preferences'] as const;

export function usePreferences() {
  return useQuery<Preferences | null>({
    queryKey: PREFERENCES_QUERY_KEY,
    queryFn: preferenceApi.get,
  });
}

export function useSavePreferences() {
  const queryClient = useQueryClient();
  const setOnboardingComplete = useAuthStore((state) => state.setOnboardingComplete);

  return useMutation({
    mutationFn: preferenceApi.save,
    onSuccess: (preferences) => {
      setOnboardingComplete();
      queryClient.setQueryData(PREFERENCES_QUERY_KEY, preferences);
      queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
      // Coins/investor type changed, so refetch the dashboard data with the new
      // preferences — the page updates automatically without a manual refresh.
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
    },
  });
}
