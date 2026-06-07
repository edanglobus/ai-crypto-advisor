import { User } from '@prisma/client';

import { userRepository } from '../repositories/user.repository';
import { refreshTokenRepository } from '../repositories/refreshToken.repository';
import { hashPassword, verifyPassword } from '../utils/password';
import { signAccessToken } from '../utils/jwt';
import { generateRefreshTokenValue, hashToken } from '../utils/hashToken';
import { parseDurationToMs } from '../utils/duration';
import { env } from '../config/env';
import { ConflictError, NotFoundError, UnauthorizedError } from '../errors/AppError';
import type { LoginInput, RegisterInput } from '../validators/auth.validator';

export interface SafeUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  user: SafeUser;
  tokens: AuthTokens;
}

function toSafeUser(user: User): SafeUser {
  return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
}

// Issues a new access token and a rotating, DB-backed refresh token for a user.
async function issueTokens(user: Pick<User, 'id' | 'email'>): Promise<AuthTokens> {
  const accessToken = signAccessToken({ sub: user.id, email: user.email });

  const refreshToken = generateRefreshTokenValue();
  await refreshTokenRepository.create({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + parseDurationToMs(env.REFRESH_TOKEN_TTL)),
  });

  return { accessToken, refreshToken };
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResult> {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictError('An account with this email already exists');
    }

    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash: await hashPassword(input.password),
    });

    return { user: toSafeUser(user), tokens: await issueTokens(user) };
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await userRepository.findByEmail(input.email);
    // Always run a comparison-shaped failure to avoid leaking which emails exist.
    if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid email or password');
    }

    return { user: toSafeUser(user), tokens: await issueTokens(user) };
  },

  // Rotation: validate the presented refresh token, revoke it, and issue a fresh pair.
  async rotateRefreshToken(rawToken: string | undefined): Promise<AuthResult> {
    if (!rawToken) {
      throw new UnauthorizedError('Missing refresh token');
    }

    const stored = await refreshTokenRepository.findByHash(hashToken(rawToken));
    if (!stored || stored.revokedAt || stored.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    await refreshTokenRepository.revokeById(stored.id);

    const user = await userRepository.findById(stored.userId);
    if (!user) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    return { user: toSafeUser(user), tokens: await issueTokens(user) };
  },

  async logout(rawToken: string | undefined): Promise<void> {
    if (!rawToken) return;
    const stored = await refreshTokenRepository.findByHash(hashToken(rawToken));
    if (stored && !stored.revokedAt) {
      await refreshTokenRepository.revokeById(stored.id);
    }
  },

  async getMe(userId: string): Promise<SafeUser> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return toSafeUser(user);
  },
};
