// src/services/__tests__/advantageService.test.ts
import { PrismaClient } from '@prisma/client';
import AdvantageService from '../advantageService.ts';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    advantage: {
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('AdvantageService', () => {
  let prisma: PrismaClient;
  let service: AdvantageService;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new AdvantageService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAdvantageByUUID', () => {
    it('should return an advantage with the given UUID', async () => {
      const uuid = 'test-uuid';
      const advantage = { id: uuid, Company: {} };
      (prisma.advantage.findUnique as jest.Mock).mockResolvedValue(advantage as never);

      const result = await service.getAdvantageByUUID(uuid);
      expect(result).toEqual(advantage);
      expect(prisma.advantage.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
        include: { Company: true },
      });
    });

    it('should return null if no advantage is found', async () => {
      const uuid = 'nonexistent-uuid';
      (prisma.advantage.findUnique as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getAdvantageByUUID(uuid);
      expect(result).toBeNull();
      expect(prisma.advantage.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
        include: { Company: true },
      });
    });
  });
});
