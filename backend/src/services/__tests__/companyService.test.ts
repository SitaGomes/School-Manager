// src/services/__tests__/companyService.test.ts
import { PrismaClient, Company, Advantage } from '@prisma/client';
import CompanyService from '../companyService.ts';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    company: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    advantage: {
      update: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('CompanyService', () => {
  let prisma: PrismaClient;
  let service: CompanyService;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new CompanyService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCompany', () => {
    it('should create a new company', async () => {
      const company = { id: '1', name: 'Test Company', email: 'test@example.com' } as Company;
      (prisma.company.create as jest.Mock).mockResolvedValue(company as never);

      await service.createCompany(company);
      expect(prisma.company.create).toHaveBeenCalledWith({
        data: { ...company },
      });
    });
  });

  describe('getCompanies', () => {
    it('should return all companies', async () => {
      const companies = [{ id: '1', name: 'Test Company', email: 'test@example.com' }] as Company[];
      (prisma.company.findMany as jest.Mock).mockResolvedValue(companies as never);

      const result = await service.getCompanies();
      expect(result).toEqual(companies);
      expect(prisma.company.findMany).toHaveBeenCalledWith({
        include: {
          advantages: true,
          transactions: true,
        },
      });
    });
  });

  describe('updateCompany', () => {
    it('should update a company', async () => {
      const company = { id: '1', name: 'Updated Company', email: 'updated@example.com' } as Company;
      (prisma.company.update as jest.Mock).mockResolvedValue(company as never);

      const result = await service.updateCompany(company);
      expect(result).toEqual(company);
      expect(prisma.company.update).toHaveBeenCalledWith({
        where: { id: company.id },
        data: { ...company },
      });
    });
  });

  describe('getCompanyByEmail', () => {
    it('should return a company by email', async () => {
      const email = 'test@example.com';
      const company = { id: '1', name: 'Test Company', email } as Company;
      (prisma.company.findUnique as jest.Mock).mockResolvedValue(company as never);

      const result = await service.getCompanyByEmail(email);
      expect(result).toEqual(company);
      expect(prisma.company.findUnique).toHaveBeenCalledWith({
        where: { email },
        include: {
          advantages: true,
          transactions: true,
        },
      });
    });
  });

  describe('getCompanyByUUID', () => {
    it('should return a company by UUID', async () => {
      const uuid = '1';
      const company = { id: uuid, name: 'Test Company', email: 'test@example.com' } as Company;
      (prisma.company.findUnique as jest.Mock).mockResolvedValue(company as never);

      const result = await service.getCompanyByUUID(uuid);
      expect(result).toEqual(company);
      expect(prisma.company.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
        include: {
          advantages: true,
          transactions: true,
        },
      });
    });
  });

  describe('addAdvantage', () => {
    it('should add an advantage to a company', async () => {
      const id = '1';
      const advantage = { id: 'adv1', name: 'Test Advantage', price: 100, studentId: 'student1' } as Advantage;
      (prisma.company.update as jest.Mock).mockResolvedValue({} as never);

      await service.addAdvantage(id, advantage);
      expect(prisma.company.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          advantages: {
            create: {
              name: advantage.name,
              price: advantage.price,
              id: advantage.id,
              studentId: advantage.studentId,
            },
          },
        },
      });
    });
  });

  describe('getAdvantageByUUID', () => {
    it('should return an advantage by UUID', async () => {
      const companyId = '1';
      const uuid = 'adv1';
      const advantage = { id: uuid, name: 'Test Advantage', price: 100, studentId: 'student1' } as Advantage;
      (prisma.company.findUnique as jest.Mock).mockResolvedValue({
        advantages: [advantage],
      } as never);

      const result = await service.getAdvantageByUUID(companyId, uuid);
      expect(result).toEqual({ advantages: [advantage] });
      expect(prisma.company.findUnique).toHaveBeenCalledWith({
        where: { id: companyId },
        select: {
          advantages: {
            where: { id: uuid },
          },
        },
      });
    });
  });

  describe('getAdvantageByName', () => {
    it('should return an advantage by name', async () => {
      const id = '1';
      const name = 'Test Advantage';
      const advantage = { id: 'adv1', name, price: 100, studentId: 'student1' } as Advantage;
      (prisma.company.findUnique as jest.Mock).mockResolvedValue({
        advantages: [advantage],
      } as never);

      const result = await service.getAdvantageByName(id, name);
      expect(result).toEqual({ advantages: [advantage] });
      expect(prisma.company.findUnique).toHaveBeenCalledWith({
        where: { id },
        select: {
          advantages: {
            where: { name },
          },
        },
      });
    });
  });

  describe('updateAdvantage', () => {
    it('should update an advantage', async () => {
      const advantage = { id: 'adv1', name: 'Updated Advantage', price: 150, studentId: 'student1' } as Advantage;
      (prisma.advantage.update as jest.Mock).mockResolvedValue(advantage as never);

      const result = await service.updateAdvantage(advantage);
      expect(result).toEqual(advantage);
      expect(prisma.advantage.update).toHaveBeenCalledWith({
        where: { id: advantage.id },
        data: { ...advantage },
      });
    });
  });

  describe('deleteAdvantage', () => {
    it('should delete an advantage from a company', async () => {
      const companyId = '1';
      const uuid = 'adv1';
      (prisma.company.update as jest.Mock).mockResolvedValue({} as never);

      await service.deleteAdvantage(companyId, uuid);
      expect(prisma.company.update).toHaveBeenCalledWith({
        where: { id: companyId },
        data: {
          advantages: {
            delete: {
              id: uuid,
            },
          },
        },
      });
    });
  });
});
