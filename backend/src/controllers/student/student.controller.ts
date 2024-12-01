import { PrismaClient } from "@prisma/client";
import AdvantageService from "../../services/advantageService.ts";
import EmailService from "../../services/emailService.ts";
import StudentAdvantagesService from "../../services/studentAdvantagesService.ts";
import StudentService from "../../services/studentService.ts";
import TransactionService from "../../services/transactionService.ts";
import { Request, Response } from "express";
import { randomUUID } from "crypto";

class StudentController {
    private studentService: StudentService;
    private advantageService: AdvantageService;
    private transactionService: TransactionService;
    private studentAdvantageService: StudentAdvantagesService;
    private emailService: EmailService;

    constructor(prisma: PrismaClient) {
        this.studentService = new StudentService(prisma);
        this.advantageService = new AdvantageService(prisma);
        this.transactionService = new TransactionService(prisma);
        this.studentAdvantageService = new StudentAdvantagesService(prisma);
        this.emailService = new EmailService();
    }


    public async getStudents(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const students = await this.studentService.getStudents();
            return res.status(200).json(students);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async loginStudent(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const student = await this.studentService.getStudentByEmail(email);

            if (!student || student.password !== password) {
                return res.status(400).json({ error: "Senha invalida" });
            }

            return res.status(200).json(student);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async updateStudent(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { id, name, major, password, address } = req.body;

            if (!id || !name || !major || !address || !password) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const student = await this.studentService.getStudentByUUID(id);

            if (!student) {
                return res.status(400).json({ error: "Estudante não encontrado" });
            }

            const { school, transactions, ...rest } = student;

            await this.studentService.updateStudent({
                ...rest,
                name,
                major,
                address,
                password,
            });

            return res.status(200).json({ message: "Estudante atualizado com sucesso" });
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async getStudentProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const student = await this.studentService.getStudentByUUID(id);

            if (!student) {
                return res.status(400).json({ error: "Estudante não encontrado" });
            }

            return res.status(200).json(student);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async registerStudent(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { email, password, name, cpf, schoolId, rg, major, address } = req.body;

        if (
            !email ||
            !password ||
            !name ||
            !cpf ||
            !schoolId ||
            !rg ||
            !major ||
            !address
        ) {
            return res.status(400).json({ error: "Dados insuficientes" });
        }

        try {
            await this.studentService.createStudent({
                coins: 0,
                cpf,
                email,
                name,
                password,
                schoolId,
                rg,
                address,
                major,
                id: randomUUID(),
            });

            return res.status(201).json({ message: "Estudante criado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar estudante" });
        }
    }

    public async exchangeAdvantage(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id, advantageId } = req.body;

        if (!id || !advantageId) {
            return res.status(400).json({ error: "Dados insuficientes" });
        }

        const student = await this.studentService.getStudentByUUID(id);

        if (!student) {
            return res.status(400).json({ error: "Estudante não encontrado" });
        }

        const advantage = await this.advantageService.getAdvantageByUUID(advantageId);

        if (!advantage) {
            return res.status(400).json({ error: "Vantagem não encontrada" });
        }

        if (student.coins < advantage.price) {
            return res.status(400).json({ error: "Saldo insuficiente" });
        }

        await this.studentAdvantageService.createStudentAdvantages({
            id: randomUUID(),
            advantageId: advantage.id,
            studentId: student.id,
        });

        const responseStudent = await this.studentService.updateCoins(
            student.id,
            student.coins - advantage.price
        );

        await this.transactionService.createTransaction({
            id: randomUUID(),
            quantity: advantage.price,
            studentId: student.id,
            teacherId: null,
            date: new Date(),
            description: advantage.name,
            toCompanyId: advantage.companyId,
        });

        this.emailService.sendEmail(student.email, "Vantagem adquirida", `Olá ${student.name}, informamos que sua vantagem ${advantage.name} foi adquirida com sucesso!`)
        this.emailService.sendEmail(advantage.Company?.email || "", "Vantagem adquirida", `Olá ${advantage.Company?.name}, informamos que sua vantagem ${advantage.name} foi adquirida por ${student.name} com sucesso!`)

        return res.status(200).json(responseStudent);
    }

    public async getStudentAdvantages(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({ error: "Dados insuficientes" });
        }

        const advantages =
            await this.studentAdvantageService.getStudentAdvantagesByStudentId(studentId);
        return res.status(200).json(advantages);
    }

    public async getTransactions(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Dados insuficientes" });
        }

        const student = await this.studentService.getStudentByUUID(id);

        if (!student) {
            return res.status(400).json({ error: "Estudante não encontrado" });
        }

        const transactions = await this.transactionService.getTransactionsByStudent(
            student.id
        );

        return res.status(200).json(transactions);
    }
}

export default StudentController;