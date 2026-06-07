import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authApi, type MeResponse, type User } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';

export const ME_QUERY_KEY = ['auth', 'me'] as const;

// Resolves the current session by calling the protected /auth/me endpoint.
// A 401 (after the client's refresh attempt) means "not authenticated".
export function useMe() {
  return useQuery<MeResponse>({
    queryKey: ME_QUERY_KEY,
    queryFn: authApi.me,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

// After login/register the auth cookies are set, so we fetch /me to learn the
// onboarding status and hydrate the store before the caller navigates.
function useAuthMutation<TPayload>(mutationFn: (payload: TPayload) => Promise<User>) {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      const me = await queryClient.fetchQuery({ queryKey: ME_QUERY_KEY, queryFn: authApi.me });
      setSession(me.user, me.hasCompletedOnboarding);
    },
  });
}

export function useLogin() {
  return useAuthMutation(authApi.login);
}

export function useRegister() {
  return useAuthMutation(authApi.register);
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clear = useAuthStore((state) => state.clear);

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clear();
      queryClient.clear();
    },
  });
}
