import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send/receive httpOnly auth cookies
});

// Endpoints that must never trigger the refresh-and-retry loop.
const AUTH_FREE_PATHS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'];

// Single-flight refresh: concurrent 401s share one /auth/refresh call.
let refreshPromise: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = apiClient
      .post('/auth/refresh')
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    const status = error.response?.status;
    const url = original?.url ?? '';

    const isAuthFree = AUTH_FREE_PATHS.some((path) => url.includes(path));

    if (status === 401 && original && !original._retry && !isAuthFree) {
      original._retry = true;
      try {
        await refreshSession();
        return apiClient(original);
      } catch {
        // Refresh failed: fall through and let the caller handle the 401.
      }
    }

    return Promise.reject(error);
  },
);
