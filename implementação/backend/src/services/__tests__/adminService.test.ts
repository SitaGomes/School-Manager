import { PrismaClient } from '@prisma/client';
import AdminService from '../adminService.ts';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    admin: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('AdminService', () => {
  let prisma: PrismaClient;
  let service: AdminService;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new AdminService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAdminByEmail', () => {
    it('should return an admin if found', async () => {
      const email = 'test@example.com';
      const admin = { id: 1, email: 'test@example.com' };
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(admin as never);

      const result = await service.getAdminByEmail(email);
      expect(result).toEqual(admin);
      expect(prisma.admin.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null if no admin is found', async () => {
      const email = 'notfound@example.com';
      (prisma.admin.findUnique as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getAdminByEmail(email);
      expect(result).toBeNull();
      expect(prisma.admin.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('createAdmin', () => {
    it('should create a new admin', async () => {
      const admin = { id: "1", email: 'newadmin@example.com', name: "Admin", password: "password"};
      (prisma.admin.create as jest.Mock).mockResolvedValue(admin as never);

      await service.createAdmin({
        email: admin.email,
        id: admin.id,
        name: admin.name,
        password: admin.password
      });
      expect(prisma.admin.create).toHaveBeenCalledWith({
        data: { ...admin },
      });
    });
  });
});
