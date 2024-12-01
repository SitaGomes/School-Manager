// src/services/__tests__/studentAdvantagesService.test.ts
import { PrismaClient, StudentAdvantages } from '@prisma/client';
import StudentAdvantagesService from '../studentAdvantagesService.ts';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    studentAdvantages: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('StudentAdvantagesService', () => {
  let prisma: PrismaClient;
  let service: StudentAdvantagesService;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new StudentAdvantagesService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createStudentAdvantages', () => {
    it('should create a new student advantage', async () => {
      const studentAdvantages = { id: '1', studentId: 'student-uuid', advantageId: 'advantage-uuid' } as StudentAdvantages;
      (prisma.studentAdvantages.create as jest.Mock).mockResolvedValue(studentAdvantages as never);

      await service.createStudentAdvantages(studentAdvantages);
      expect(prisma.studentAdvantages.create).toHaveBeenCalledWith({
        data: { ...studentAdvantages },
      });
    });
  });

  describe('getStudentAdvantages', () => {
    it('should return all student advantages', async () => {
      const studentAdvantagesList = [
        { id: '1', studentId: 'student-uuid', advantageId: 'advantage-uuid' },
      ] as StudentAdvantages[];
      (prisma.studentAdvantages.findMany as jest.Mock).mockResolvedValue(studentAdvantagesList as never);

      const result = await service.getStudentAdvantages();
      expect(result).toEqual(studentAdvantagesList);
      expect(prisma.studentAdvantages.findMany).toHaveBeenCalledWith({
        include: {
          Student: true,
          Advantage: true,
        },
      });
    });
  });

  describe('getStudentAdvantagesByStudentId', () => {
    it('should return student advantages by studentId', async () => {
      const studentId = 'student-uuid';
      const studentAdvantagesList = [
        { id: '1', studentId, advantageId: 'advantage-uuid' },
      ] as StudentAdvantages[];
      (prisma.studentAdvantages.findMany as jest.Mock).mockResolvedValue(studentAdvantagesList as never);

      const result = await service.getStudentAdvantagesByStudentId(studentId);
      expect(result).toEqual(studentAdvantagesList);
      expect(prisma.studentAdvantages.findMany).toHaveBeenCalledWith({
        where: { studentId },
        include: {
          Student: true,
          Advantage: true,
        },
      });
    });
  });

  describe('getStudentAdvantagesByAdvantageId', () => {
    it('should return student advantages by advantageId', async () => {
      const advantageId = 'advantage-uuid';
      const studentAdvantagesList = [
        { id: '1', studentId: 'student-uuid', advantageId },
      ] as StudentAdvantages[];
      (prisma.studentAdvantages.findMany as jest.Mock).mockResolvedValue(studentAdvantagesList as never);

      const result = await service.getStudentAdvantagesByAdvantageId(advantageId);
      expect(result).toEqual(studentAdvantagesList);
      expect(prisma.studentAdvantages.findMany).toHaveBeenCalledWith({
        where: { advantageId },
        include: {
          Student: true,
          Advantage: true,
        },
      });
    });
  });
});
