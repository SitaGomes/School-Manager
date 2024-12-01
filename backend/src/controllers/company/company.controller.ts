import { Advantage, PrismaClient } from "@prisma/client";
import CompanyService from "../../services/companyService.ts";
import StudentAdvantagesService from "../../services/studentAdvantagesService.ts";
import { Request, Response } from "express";
import { randomUUID } from "crypto";

class CompanyController {
    private companyService: CompanyService;
    private studentAdvantageService: StudentAdvantagesService;

    constructor(prisma: PrismaClient) {
        this.companyService = new CompanyService(prisma);
        this.studentAdvantageService = new StudentAdvantagesService(prisma);
    }

    public async getCompanies(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const companies = await this.companyService.getCompanies();
            return res.status(200).json(companies);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async loginCompany(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const company = await this.companyService.getCompanyByEmail(email);

            if (!company || company.password !== password) {
                return res.status(400).json({ error: "Senha invalida" });
            }

            return res.status(200).json(company);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async registerCompany(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { email, password, name, cnpj } = req.body;

            if (!email || !password || !name || !cnpj) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const company = await this.companyService.createCompany({
                id: randomUUID(),
                cnpj,
                email,
                name,
                password,
            });

            return res.status(201).json(company);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async getCompanyProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const company = await this.companyService.getCompanyByUUID(id);

            if (!company) {
                return res.status(400).json({ error: "Empresa não encontrada" });
            }

            return res.status(200).json(company);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async updateCompanyProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { id, name, password } = req.body;

            if (!id || !name || !password) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const oldCompany = await this.companyService.getCompanyByUUID(id);

            if (!oldCompany) {
                return res.status(400).json({ error: "Empresa não encontrada" });
            }

            const company = await this.companyService.updateCompany({
                ...oldCompany,
                name,
                password,
            });

            return res.status(201).json(company);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async getCompanyAdvantages(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const company = await this.companyService.getCompanyByUUID(id);

            if (!company) {
                return res.status(400).json({ error: "Empresa não encontrada" });
            }

            return res.status(200).json(company.advantages);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async createCompanyAdvantage(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { companyId, name, price } = req.body;

            if (!companyId || !name || !price) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const advantage = await this.companyService.addAdvantage(companyId, {
                id: randomUUID(),
                name,
                price,
                studentId: null,
            });

            return res.status(201).json(advantage);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async updateCompanyAdvantage(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { companyId, id, name, price } = req.body;

            if (!companyId || !id || !name || !price) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const oldAdvantage = await this.companyService.getAdvantageByUUID(companyId, id);

            const editedAdvantage = oldAdvantage?.advantages
                .filter((advantage) => advantage.id === id)
                .reduce((acc, advantage) => {
                    return {
                        ...advantage,
                        name,
                        price,
                    };
                }, {} as Advantage);

            if (!editedAdvantage) {
                return res.status(400).json({ error: "Vantagem não encontrada" });
            }

            const advantage = await this.companyService.updateAdvantage(editedAdvantage);

            return res.status(201).json(advantage);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async deleteCompanyAdvantage(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { companyId, id } = req.body;

            if (!companyId || !id) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const advantage = await this.companyService.deleteAdvantage(companyId, id);

            return res.status(201).json(advantage);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }

    public async getCompanyStudents(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { advantageId } = req.body;

            if (!advantageId) {
                return res.status(400).json({ error: "Dados insuficientes" });
            }

            const students =
                await this.studentAdvantageService.getStudentAdvantagesByAdvantageId(
                    advantageId
                );

            return res.status(200).json(students);
        } catch (error) {
            const err = error as Error
            return res.status(500).json({ error: err.message });
        }
    }
}

export default CompanyController;