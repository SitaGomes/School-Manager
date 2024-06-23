// src/services/__tests__/schoolService.test.ts
import { PrismaClient, School, Teacher } from '@prisma/client';
import SchoolService from '../schoolService.ts';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    school: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('SchoolService', () => {
  let prisma: PrismaClient;
  let service: SchoolService;

  beforeEach(() => {
    prisma = new PrismaClient();
    service = new SchoolService(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSchool', () => {
    it('should create a new school', async () => {
      const school = { id: '1', name: 'Test School' } as School;
      (prisma.school.create as jest.Mock).mockResolvedValue(school as never);

      await service.createSchool(school);
      expect(prisma.school.create).toHaveBeenCalledWith({
        data: { ...school },
      });
    });
  });

  describe('getSchools', () => {
    it('should return all schools', async () => {
      const schools = [{ id: '1', name: 'Test School' }] as School[];
      (prisma.school.findMany as jest.Mock).mockResolvedValue(schools as never);

      const result = await service.getSchools();
      expect(result).toEqual(schools);
      expect(prisma.school.findMany).toHaveBeenCalledWith({
        include: {
          students: true,
          teachers: true,
        },
      });
    });
  });

  describe('getSchoolByName', () => {
    it('should return a school by name', async () => {
      const name = 'Test School';
      const school = { id: '1', name } as School;
      (prisma.school.findFirst as jest.Mock).mockResolvedValue(school as never);

      const result = await service.getSchoolByName(name);
      expect(result).toEqual(school);
      expect(prisma.school.findFirst).toHaveBeenCalledWith({
        where: { name },
      });
    });

    it('should return null if no school is found', async () => {
      const name = 'Nonexistent School';
      (prisma.school.findFirst as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getSchoolByName(name);
      expect(result).toBeNull();
      expect(prisma.school.findFirst).toHaveBeenCalledWith({
        where: { name },
      });
    });
  });

  describe('getSchoolByUUID', () => {
    it('should return a school by UUID', async () => {
      const uuid = '1';
      const school = { id: uuid, name: 'Test School' } as School;
      (prisma.school.findFirst as jest.Mock).mockResolvedValue(school as never);

      const result = await service.getSchoolByUUID(uuid);
      expect(result).toEqual(school);
      expect(prisma.school.findFirst).toHaveBeenCalledWith({
        where: { id: uuid },
      });
    });

    it('should return null if no school is found', async () => {
      const uuid = 'nonexistent-uuid';
      (prisma.school.findFirst as jest.Mock).mockResolvedValue(null as never);

      const result = await service.getSchoolByUUID(uuid);
      expect(result).toBeNull();
      expect(prisma.school.findFirst).toHaveBeenCalledWith({
        where: { id: uuid },
      });
    });
  });

  describe('updateSchool', () => {
    it('should update a school', async () => {
      const school = { id: '1', name: 'Updated School' } as School;
      (prisma.school.update as jest.Mock).mockResolvedValue(school as never);

      const result = await service.updateSchool(school);
      expect(result).toEqual(school);
      expect(prisma.school.update).toHaveBeenCalledWith({
        where: { id: school.id },
        data: { ...school },
      });
    });
  });

  describe('deleteSchool', () => {
    it('should delete a school', async () => {
      const uuid = '1';
      (prisma.school.delete as jest.Mock).mockResolvedValue({} as never);

      await service.deleteSchool(uuid);
      expect(prisma.school.delete).toHaveBeenCalledWith({
        where: { id: uuid },
      });
    });
  });

  describe('getTeachers', () => {
    it('should return teachers of a school', async () => {
      const id = '1';
      const teachers = [{ id: 't1', name: 'Teacher 1' }] as Teacher[];
      (prisma.school.findUnique as jest.Mock).mockResolvedValue({ teachers } as never);

      const result = await service.getTeachers(id);
      expect(result).toEqual({ teachers });
      expect(prisma.school.findUnique).toHaveBeenCalledWith({
        where: { id },
        select: {
          teachers: true,
        },
      });
    });
  });

  describe('getStudents', () => {
    it('should return students of a school', async () => {
      const id = '1';
      const students = [{ id: 's1', name: 'Student 1' }] as Teacher[];
      (prisma.school.findUnique as jest.Mock).mockResolvedValue({ students } as never);

      const result = await service.getStudents(id);
      expect(result).toEqual({ students });
      expect(prisma.school.findUnique).toHaveBeenCalledWith({
        where: { id },
        select: {
          students: true,
        },
      });
    });
  });

  describe('addTeacher', () => {
    it('should add a teacher to a school', async () => {
      const id = '1';
      const teacher = { id: 't1', name: 'Teacher 1' } as Teacher;
      (prisma.school.update as jest.Mock).mockResolvedValue({} as never);

      await service.addTeacher(id, teacher);
      expect(prisma.school.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          teachers: {
            create: { ...teacher },
          },
        },
      });
    });
  });
});
