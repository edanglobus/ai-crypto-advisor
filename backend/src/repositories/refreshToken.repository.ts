import { RefreshToken } from '@prisma/client';

import { prisma } from '../lib/prisma';

export const refreshTokenRepository = {
  create(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<RefreshToken> {
    return prisma.refreshToken.create({ data });
  },

  findByHash(tokenHash: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({ where: { tokenHash } });
  },

  revokeById(id: string): Promise<RefreshToken> {
    return prisma.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  },

  revokeAllForUser(userId: string): Promise<number> {
    return prisma.refreshToken
      .updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      })
      .then((result) => result.count);
  },
};
