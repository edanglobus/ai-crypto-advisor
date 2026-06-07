import { AxiosError } from 'axios';

interface ApiErrorBody {
  error?: {
    message?: string;
    details?: Record<string, string[]>;
  };
}

// Normalizes an unknown thrown value into a user-facing message, preferring the
// backend's `{ error: { message } }` shape.
export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorBody | undefined;
    if (body?.error?.message) {
      return body.error.message;
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
