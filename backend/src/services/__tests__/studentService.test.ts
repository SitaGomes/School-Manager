// src/services/__tests__/studentService.test.ts
import { PrismaClient, Advantage } from '@prisma/client';
import StudentService from '../studentService.ts';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    student: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('StudentService', () => {
  let prisma: PrismaClient;
  let service: StudentService;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new StudentService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStudents', () => {
    it('should return all students', async () => {
      const students = [{ id: '1', name: 'Student 1', schoolId: '1' }] as any[];
      (prisma.student.findMany as jest.Mock).mockResolvedValue(students as never);

      const result = await service.getStudents();
      expect(result).toEqual(students);
      expect(prisma.student.findMany).toHaveBeenCalledWith({
        include: { school: true, transactions: true },
      });
    });
  });

  describe('createStudent', () => {
    it('should create a new student', async () => {
      const student = { id: '1', name: 'Student 1', schoolId: '1' } as any;
      (prisma.student.create as jest.Mock).mockResolvedValue(student as never);

      await service.createStudent(student);
      expect(prisma.student.create).toHaveBeenCalledWith({
        data: { ...student },
      });
    });
  });

  describe('getStudentByEmail', () => {
    it('should return a student by email', async () => {
      const email = 'student@example.com';
      const student = { id: '1', name: 'Student 1', email, schoolId: '1' } as any;
      (prisma.student.findUnique as jest.Mock).mockResolvedValue(student as never);

      const result = await service.getStudentByEmail(email);
      expect(result).toEqual(student);
      expect(prisma.student.findUnique).toHaveBeenCalledWith({
        where: { email },
        include: { school: true, transactions: true },
      });
    });

    it('should return null if no student is found', async () => {
      const email = 'nonexistent@example.com';
      (prisma.student.findUnique as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getStudentByEmail(email);
      expect(result).toBeNull();
      expect(prisma.student.findUnique).toHaveBeenCalledWith({
        where: { email },
        include: { school: true, transactions: true },
      });
    });
  });

  describe('getStudentByUUID', () => {
    it('should return a student by UUID', async () => {
      const uuid = '1';
      const student = { id: uuid, name: 'Student 1', schoolId: '1' } as any;
      (prisma.student.findUnique as jest.Mock).mockResolvedValue(student as never);

      const result = await service.getStudentByUUID(uuid);
      expect(result).toEqual(student);
      expect(prisma.student.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
        include: { school: true, transactions: true },
      });
    });

    it('should return null if no student is found', async () => {
      const uuid = 'nonexistent-uuid';
      (prisma.student.findUnique as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getStudentByUUID(uuid);
      expect(result).toBeNull();
      expect(prisma.student.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
        include: { school: true, transactions: true },
      });
    });
  });

  describe('updateStudent', () => {
    it('should update a student', async () => {
      const student = { id: '1', name: 'Updated Student', schoolId: '1' } as any;
      (prisma.student.update as jest.Mock).mockResolvedValue(student as never);

      const result = await service.updateStudent(student);
      expect(result).toEqual(student);
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: student.id },
        data: { ...student },
      });
    });
  });

  describe('updateCoins', () => {
    it('should update the coins of a student', async () => {
      const id = '1';
      const coins = 100;
      const student = { id, coins, schoolId: '1', transactions: [], StudentAdvantages: [] } as any;
      (prisma.student.update as jest.Mock).mockResolvedValue(student as never);

      await service.updateCoins(id, coins);
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id },
        data: { coins },
        include: { school: true, transactions: true, StudentAdvantages: true },
      });
    });
  });

  describe('addAdvantage', () => {
    it('should add an advantage to a student', async () => {
      const id = '1';
      const advantage = { id: 'adv1', name: 'Advantage 1', price: 100 } as Omit<Advantage, 'studentId'>;
      (prisma.student.update as jest.Mock).mockResolvedValue({} as never);

      await service.addAdvantage(id, advantage);
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          advantages: {
            create: { ...advantage },
          },
        },
      });
    });
  });
});
