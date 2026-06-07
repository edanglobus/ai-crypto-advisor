import { createHash, randomBytes } from 'crypto';

// Refresh tokens are random opaque strings. We only ever persist their sha256
// hash so a database leak cannot be replayed against the auth endpoints.
export function generateRefreshTokenValue(): string {
  return randomBytes(48).toString('hex');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
