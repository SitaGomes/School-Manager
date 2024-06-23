// src/services/__tests__/transactionService.test.ts
import { PrismaClient, Transaction } from '@prisma/client';
import TransactionService from '../transactionService.ts';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    transaction: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('TransactionService', () => {
  let prisma: PrismaClient;
  let service: TransactionService;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new TransactionService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactionsByStudent', () => {
    it('should return transactions for a student', async () => {
      const uuid = 'student-uuid';
      const transactions = [{ id: '1', studentId: uuid }] as Transaction[];
      (prisma.transaction.findMany as jest.Mock).mockResolvedValue(transactions as never);

      const result = await service.getTransactionsByStudent(uuid);
      expect(result).toEqual(transactions);
      expect(prisma.transaction.findMany).toHaveBeenCalledWith({
        where: { studentId: uuid },
      });
    });
  });

  describe('getTransactionsByTeacher', () => {
    it('should return transactions for a teacher', async () => {
      const uuid = 'teacher-uuid';
      const transactions = [{ id: '1', teacherId: uuid }] as Transaction[];
      (prisma.transaction.findMany as jest.Mock).mockResolvedValue(transactions as never);

      const result = await service.getTransactionsByTeacher(uuid);
      expect(result).toEqual(transactions);
      expect(prisma.transaction.findMany).toHaveBeenCalledWith({
        where: { teacherId: uuid },
      });
    });
  });

  describe('getTransactionByCompany', () => {
    it('should return transactions for a company', async () => {
      const uuid = 'company-uuid';
      const transactions = [{ id: '1', toCompanyId: uuid }] as Transaction[];
      (prisma.transaction.findMany as jest.Mock).mockResolvedValue(transactions as never);

      const result = await service.getTransactionByCompany(uuid);
      expect(result).toEqual(transactions);
      expect(prisma.transaction.findMany).toHaveBeenCalledWith({
        where: { toCompanyId: uuid },
      });
    });
  });

  describe('createTransaction', () => {
    it('should create a new transaction', async () => {
      const transaction = { id: '1', amount: 100, studentId: 'student-uuid', teacherId: 'teacher-uuid', toCompanyId: 'company-uuid', date: new Date(), description: "", quantity: 0 } as Transaction;
      (prisma.transaction.create as jest.Mock).mockResolvedValue(transaction as never);

      await service.createTransaction(transaction);
      expect(prisma.transaction.create).toHaveBeenCalledWith({
        data: { ...transaction },
      });
    });
  });
});
