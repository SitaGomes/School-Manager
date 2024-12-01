import { PrismaClient } from "@prisma/client";
import TeacherService from "../../services/teacherService.ts";
import { Request, Response } from "express";
import TransactionService from "../../services/transactionService.ts";
import StudentService from "../../services/studentService.ts";
import { randomUUID } from "crypto";

class TeacherController {
    private teacherService: TeacherService;
    private transactionService: TransactionService;
    private studentService: StudentService;

  constructor(prisma: PrismaClient) {
    this.teacherService = new TeacherService(prisma);
    this.transactionService = new TransactionService(prisma);
    this.studentService = new StudentService(prisma);
  }

    public async loginTeacher(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const teacher = await this.teacherService.getTeacherByEmail(email);

            if (!teacher) {
                return res.status(400).json({ error: "Professor não encontrado" });
            }

            return res.status(200).json(teacher);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async exchangeCoins(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { email, quantity, studentId, description } = req.body;
    
            if (!email || !quantity || !studentId || !description) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }
    
            const teacher = await this.teacherService.getTeacherByEmail(email);
    
            if (!teacher) {
                return res.status(400).json({ error: "Professor não encontrado" });
            }
    
            if (teacher.coins < quantity) {
                return res.status(400).json({ error: "Saldo insuficiente" });
            }
    
            const student = await this.studentService.getStudentByUUID(studentId);
    
            if (!student) {
                return res.status(400).json({ error: "Estudante não encontrado" });
            }
    
            await this.teacherService.updateCoins(teacher.id, teacher.coins - quantity);
            await this.teacherService.updateCoins(student.id, student.coins + quantity);
            await this.transactionService.createTransaction({
                id: randomUUID(),
                quantity,
                studentId: student.id,
                teacherId: teacher.id,
                date: new Date(),
                description,
                toCompanyId: null,
            });
    
            return res.status(200).json({ message: "Troca realizada com sucesso" });
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async getTransactions(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { email } = req.body;
    
            if (!email) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }
    
            const teacher = await this.teacherService.getTeacherByEmail(email);
    
            if (!teacher) {
                return res.status(400).json({ error: "Professor não encontrado" });
            }
    
            const transactions = await this.transactionService.getTransactionsByTeacher(
                teacher.id
            );
    
            return res.status(200).json(transactions);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }
}

export default TeacherController;