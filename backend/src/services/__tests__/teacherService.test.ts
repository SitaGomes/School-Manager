// src/services/__tests__/teacherService.test.ts
import { PrismaClient, Teacher } from '@prisma/client';
import TeacherService from '../teacherService.ts';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';


jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    teacher: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('TeacherService', () => {
  let prisma: PrismaClient;
  let service: TeacherService;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new TeacherService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTeachers', () => {
    it('should return all teachers', async () => {
      const teachers = [{ id: '1', name: 'Teacher 1', schoolId: '1' }] as Teacher[];
      (prisma.teacher.findMany as jest.Mock).mockResolvedValue(teachers as never);

      const result = await service.getTeachers();
      expect(result).toEqual(teachers);
      expect(prisma.teacher.findMany).toHaveBeenCalledWith({
        include: { school: true },
      });
    });
  });

  describe('createTeacher', () => {
    it('should create a new teacher', async () => {
      const teacher = { id: '1', name: 'Teacher 1', schoolId: '1' } as Teacher;
      (prisma.teacher.create as jest.Mock).mockResolvedValue(teacher as never);

      const result = await service.createTeacher(teacher);
      expect(result).toEqual(teacher);
      expect(prisma.teacher.create).toHaveBeenCalledWith({
        data: { ...teacher },
      });
    });
  });

  describe('getTeacherByUUID', () => {
    it('should return a teacher by UUID', async () => {
      const uuid = '1';
      const teacher = { id: uuid, name: 'Teacher 1', schoolId: '1' } as Teacher;
      (prisma.teacher.findUnique as jest.Mock).mockResolvedValue(teacher as never);

      const result = await service.getTeacherByUUID(uuid);
      expect(result).toEqual(teacher);
      expect(prisma.teacher.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
        include: { school: true },
      });
    });

    it('should return null if no teacher is found', async () => {
      const uuid = 'nonexistent-uuid';
      (prisma.teacher.findUnique as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getTeacherByUUID(uuid);
      expect(result).toBeNull();
      expect(prisma.teacher.findUnique).toHaveBeenCalledWith({
        where: { id: uuid },
        include: { school: true },
      });
    });
  });

  describe('getTeacherByEmail', () => {
    it('should return a teacher by email', async () => {
      const email = 'teacher@example.com';
      const teacher = { id: '1', name: 'Teacher 1', email, schoolId: '1' } as Teacher;
      (prisma.teacher.findUnique as jest.Mock).mockResolvedValue(teacher as never);

      const result = await service.getTeacherByEmail(email);
      expect(result).toEqual(teacher);
      expect(prisma.teacher.findUnique).toHaveBeenCalledWith({
        where: { email },
        include: { school: true },
      });
    });

    it('should return null if no teacher is found', async () => {
      const email = 'nonexistent@example.com';
      (prisma.teacher.findUnique as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getTeacherByEmail(email);
      expect(result).toBeNull();
      expect(prisma.teacher.findUnique).toHaveBeenCalledWith({
        where: { email },
        include: { school: true },
      });
    });
  });

  describe('getTeacherByCPF', () => {
    it('should return a teacher by CPF', async () => {
      const cpf = '12345678900';
      const teacher = { id: '1', name: 'Teacher 1', cpf, schoolId: '1' } as Teacher;
      (prisma.teacher.findUnique as jest.Mock).mockResolvedValue(teacher as never);

      const result = await service.getTeacherByCPF(cpf);
      expect(result).toEqual(teacher);
      expect(prisma.teacher.findUnique).toHaveBeenCalledWith({
        where: { cpf },
        include: { school: true },
      });
    });

    it('should return null if no teacher is found', async () => {
      const cpf = 'nonexistent-cpf';
      (prisma.teacher.findUnique as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getTeacherByCPF(cpf);
      expect(result).toBeNull();
      expect(prisma.teacher.findUnique).toHaveBeenCalledWith({
        where: { cpf },
        include: { school: true },
      });
    });
  });

  describe('updateCoins', () => {
    it('should update the coins of a teacher', async () => {
      const id = '1';
      const coins = 100;
      (prisma.teacher.update as jest.Mock).mockResolvedValue({} as never);

      await service.updateCoins(id, coins);
      expect(prisma.teacher.update).toHaveBeenCalledWith({
        where: { id },
        data: { coins },
      });
    });
  });

  describe('updateTeacher', () => {
    it('should update a teacher', async () => {
      const teacher = { id: '1', name: 'Updated Teacher', schoolId: '1' } as Teacher;
      (prisma.teacher.update as jest.Mock).mockResolvedValue(teacher as never);

      const result = await service.updateTeacher(teacher);
      expect(result).toEqual(teacher);
      expect(prisma.teacher.update).toHaveBeenCalledWith({
        where: { id: teacher.id },
        data: { ...teacher },
      });
    });
  });

  describe('deleteTeacher', () => {
    it('should delete a teacher', async () => {
      const uuid = '1';
      (prisma.teacher.delete as jest.Mock).mockResolvedValue({} as never);

      await service.deleteTeacher(uuid);
      expect(prisma.teacher.delete).toHaveBeenCalledWith({
        where: { id: uuid },
      });
    });
  });
});
