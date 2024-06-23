import { PrismaClient } from "@prisma/client";
import AdminService from "../../services/adminService.ts";
import SchoolService from "../../services/schoolService.ts";
import TeacherService from "../../services/teacherService.ts";
import TransactionService from "../../services/transactionService.ts";
import { Request, Response } from "express";
import { randomUUID } from "crypto";

class AdminController {
    private adminService: AdminService;
    private schoolService: SchoolService;
    private teacherService: TeacherService;
    private transactionService: TransactionService;

    constructor(prisma: PrismaClient) {
        this.adminService = new AdminService(prisma);
        this.schoolService = new SchoolService(prisma);
        this.teacherService = new TeacherService(prisma);
        this.transactionService = new TransactionService(prisma);
    }

    public async loginAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { email, password } = req.body;
        const admin = await this.adminService.getAdminByEmail(email);

        if (!admin || admin.password !== password) {
            return res.status(400).json({ error: "Senha invalida" });
        }
        return res.status(200).json(admin);
    }

    public async registerAdmin(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { email, password, name } = req.body;

            const admin = await this.adminService.createAdmin({
                id: randomUUID(),
                email,
                name,
                password,
            });

            return res.status(201).json(admin);
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    public async getSchools(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const schools = await this.schoolService.getSchools();
            return res.status(200).json(schools);
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    public async registerSchool(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { name } = req.body;

        try {
            const schoolAlreadyExists = await this.schoolService.getSchoolByName(name);

            if (schoolAlreadyExists) {
                return res.status(400).json({ message: `Escola ${name} ja existe` });
            }

            const school = await this.schoolService.createSchool({
                id: randomUUID(),
                name,
            });

            return res.status(201).json(school);
        } catch (err) {
            return res.status(500).json({ message: "Erro ao criar nova escola", error: err });
        }
    }

    public async updateSchool(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id, name } = req.body;

        try {
            if (!id || !name) {
                return res.status(400).json({ message: "Dados insuficientes" });
            }

            const school = await this.schoolService.getSchoolByUUID(id);

            if (!school) {
                return res.status(400).json({ message: "Escola não encontrada" });
            }

            const editedSchool = { ...school, name };

            const updatedSchool = await this.schoolService.updateSchool(editedSchool);

            return res.status(200).json(updatedSchool);
        } catch (err) {
            return res.status(500).json({ message: "Erro com o prisma", error: err });
        }
    }

    public async getTeachers(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { id } = req.body;
            const teachers = await this.schoolService.getTeachers(id);
            return res.status(200).json(teachers);

        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    public async deleteSchool(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id } = req.body;

        try {
            if (!id) {
                return res.status(400).json({ message: "Dados insuficientes" });
            }

            const school = await this.schoolService.getSchoolByUUID(id);

            if (!school) {
                return res.status(400).json({ message: "Escola não encontrada" });
            }

            await this.schoolService.deleteSchool(id);

            return res.status(200).json({ message: "Escola deletada com sucesso" });
        } catch (err) {
            return res.status(500).json({ message: "Erro com o prisma", error: err });
        }
    }

    public async registerTeacher(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { schoolId, name, email, cpf, password } = req.body;

        try {
            if (!schoolId || !name || !email || !cpf || !password) {
                return res.status(400).json({ message: "Dados insuficientes" });
            }

            const teacherAlreadyExists = await this.teacherService.getTeacherByEmail(email);

            if (teacherAlreadyExists) {
                return res.status(400).json({ message: `Professor ${email} ja existe` });
            }

            const teacher = await this.teacherService.createTeacher({
                id: randomUUID(),
                schoolId,
                name,
                email,
                cpf,
                password,
                coins: 0,
            });

            return res.status(201).json(teacher);
        } catch (err) {
            return res.status(500).json({ message: "Erro ao criar novo professor", error: err });
        }
    }

    public async addCoins(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id, amount } = req.body;

        try {
            if (!id || !amount) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const teacher = await this.teacherService.getTeacherByUUID(id);

            if (!teacher) {
                return res.status(400).json({ error: "Professor não encontrado" });
            }

            const updatedTeacher = await this.teacherService.updateCoins(
                teacher.id,
                teacher.coins + amount
            );
            await this.transactionService.createTransaction({
                id: randomUUID(),
                quantity: amount,
                studentId: null,
                teacherId: teacher.id,
                date: new Date(),
                description: "Adicionado pelo admin",
                toCompanyId: null,
            });

            return res.status(200).json(updatedTeacher);
        } catch (err) {
            return res.status(500).json({ message: "Erro com o prisma", error: err });
        }
    }

    public async updateTeacher(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id, name, email, cpf, password } = req.body;

        try {
            if (!id || !name || !email || !cpf || !password) {
                return res.status(400).json({ message: "Dados insuficientes" });
            }

            const teacher = await this.teacherService.getTeacherByUUID(id);

            if (!teacher) {
                return res.status(400).json({ message: "Professor não encontrado" });
            }

            const editedTeacher = { ...teacher, name, email, cpf, password };

            const updatedTeacher = await this.teacherService.updateTeacher(editedTeacher);

            return res.status(200).json(updatedTeacher);
        } catch (err) {
            return res.status(500).json({ message: "Erro com o prisma", error: err });
        }
    }

    public async deleteTeacher(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id } = req.body;

        try {
            if (!id) {
                return res.status(400).json({ message: "Dados insuficientes" });
            }

            const teacher = await this.teacherService.getTeacherByUUID(id);

            if (!teacher) {
                return res.status(400).json({ message: "Professor não encontrado" });
            }

            await this.teacherService.deleteTeacher(id);

            return res.status(200).json({ message: "Professor deletado com sucesso" });
        } catch (err) {
            return res.status(500).json({ message: "Erro com o prisma", error: err });
        }
    }
}

export default AdminController;