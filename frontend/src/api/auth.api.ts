import { apiClient } from './client';

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
}

export interface MeResponse {
  user: User;
  hasCompletedOnboarding: boolean;
}

export const authApi = {
  register: (payload: RegisterPayload): Promise<User> =>
    apiClient.post<AuthResponse>('/auth/register', payload).then((res) => res.data.user),

  login: (payload: LoginPayload): Promise<User> =>
    apiClient.post<AuthResponse>('/auth/login', payload).then((res) => res.data.user),

  logout: (): Promise<void> => apiClient.post('/auth/logout').then(() => undefined),

  me: (): Promise<MeResponse> =>
    apiClient.get<MeResponse>('/auth/me').then((res) => res.data),
};
